"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

const formSchema = z.object({
  name: z.string().min(1),
  color: z.string(),
});

type Category = {
  id: String;
  name: String;
  color: String;
  createdAt: Date;
  userId: String;
};

type Props = {
  categories: Category[];
};

const AddCategoryForm = ({ categories }: Props) => {
  const router = useRouter();

  const createCategory = api.category.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "#FFFFFF",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    createCategory.mutate({
      name: values.name,
      color: values.color,
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-4 flex flex-col items-start justify-around  gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="  w-full  flex-1 grow-0">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className=" w-20 flex-1 grow-0">
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input {...field} type="color" className=" p-0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className=" mt-4">
          Create
        </Button>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
