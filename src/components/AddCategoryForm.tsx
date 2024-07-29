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
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1),
  color: z.string(),
});

type Category = {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  userId: string;
};

type Props = {
  categories: Category[];
};

const AddCategoryForm = ({ categories }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "#FFFFFF",
    },
  });

  const createCategory = api.category.create.useMutation({
    onSuccess: () => {
      form.reset();
      router.refresh();
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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
        <Button
          type="submit"
          className=" w-1/3 gap-2"
          disabled={createCategory.isPending}
        >
          {createCategory.isPending ? (
            <>
              <LoaderCircle size={16} />
              Creating...
            </>
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
