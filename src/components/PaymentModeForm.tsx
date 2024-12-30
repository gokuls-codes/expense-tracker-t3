"use client";

import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

const formSchema = z.object({
  name: z.string().min(1),
});

const PaymentModeForm = ({ closeDialog }: { closeDialog: () => void }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const createPaymentMode = api.paymentMode.create.useMutation({
    onSuccess: (data) => {
      form.reset();
      // toast(`Payment Mode ${data.name} created.`);
      router.refresh();
      closeDialog();
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createPaymentMode.mutate({
      name: values.name,
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-4 flex flex-1 flex-col items-start justify-around gap-4 "
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

          <Button type="submit" className=" mt-4">
            Add
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PaymentModeForm;
