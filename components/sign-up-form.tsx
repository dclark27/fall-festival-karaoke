"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MicIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSignup } from "@/app/actions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  singerAlias: z.string().min(1, {
    message: "Required",
  }),
  song: z.string().min(1, {
    message: "Required",
  }),
  artist: z.string().min(1, {
    message: "Required",
  }),
});

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      singerAlias: "",
      artist: "",
      song: "",
    },
  });

  const onSubmit = async ({
    singerAlias,
    song,
    artist,
  }: z.infer<typeof formSchema>) => {
    const newSignup = {
      name: singerAlias,
      song,
      artist,
    };
    const response = await createSignup(newSignup);

    if (response) {
      form.reset();
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="singerAlias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-md">Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="song"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-md">Song Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Song" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-md">
                    Artist Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Artist" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-bold text-lg" disabled>
              <MicIcon className="size-6 mr-2" /> Sign Ups have closed for the
              night!
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
