"use server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const signups = await prisma.signup.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(signups);
}

export async function POST(signupBody: {
  name: string;
  song: string;
  artist: string;
}) {
  const signup = await prisma.signup.create({
    data: signupBody,
  });
  return NextResponse.json(signup);
}

export async function PUT(request: NextRequest) {
  const body: { id: string; order: number }[] = await request.json();
  const updatedSignups = await prisma.$transaction(
    body.map((signup) =>
      prisma.signup.update({
        where: { id: signup.id },
        data: { order: signup.order },
      })
    )
  );
  return NextResponse.json(updatedSignups);
}

export async function DELETE(request: NextRequest) {
  const body: { id: string } = await request.json();
  const deletedSignup = await prisma.signup.delete({
    where: { id: body.id },
  });
  return NextResponse.json(deletedSignup);
}
