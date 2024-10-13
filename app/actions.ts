"use server";

import { PrismaClient, Signup } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getSignups = async () => {
  const signups = await prisma.signup.findMany({
    orderBy: { order: "asc" },
  });

  return signups;
};

export const createSignup = async (newSignup: {
  name: string;
  song: string;
  artist: string;
}) => {
  const signup = await prisma.signup.create({
    data: newSignup,
  });

  revalidatePath("/");
  revalidatePath("/admin");

  return signup;
};

export const updateSignup = async (id: string, updatedSignup: Signup) => {
  const signup = await prisma.signup.update({
    where: { id },
    data: updatedSignup,
  });

  revalidatePath("/");
  revalidatePath("/admin");

  return signup;
};

export const updateAllSignups = async (updatedSignups: Array<Signup>) => {
  const updateSignupPromises = updatedSignups.map((signup) =>
    updateSignup(signup.id, signup)
  );
  await Promise.all(updateSignupPromises);

  revalidatePath("/");
  revalidatePath("/admin");

  return await prisma.signup.findMany({
    orderBy: { order: "asc" },
  });
};

export const deleteSignup = async (id: string) => {
  const deletedSignup = await prisma.signup.delete({
    where: { id },
  });
  revalidatePath("/");
  revalidatePath("/admin");

  return deletedSignup;
};
