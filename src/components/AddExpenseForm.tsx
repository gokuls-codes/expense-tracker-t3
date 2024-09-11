"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  description: z.string().min(1),
  amount: z.coerce.number().min(1),
  category: z.string(),
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

const AddExpenseForm = ({ categories }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: 0,
    },
  });

  const createExpense = api.expense.create.useMutation({
    onSuccess: (data) => {
      form.reset();
      toast(`Expense ${data.description} created.`);

      router.refresh();
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createExpense.mutate({
      description: values.description,
      amount: values.amount,
      categoryId: values.category,
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
            name="category"
            render={({ field }) => (
              <FormItem className=" flex w-full flex-col">
                <FormLabel>Category</FormLabel>
                <Popover open={open} onOpenChange={(o) => setOpen(o)}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          " w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          <div className=" flex items-center gap-2">
                            <div
                              className="  size-4 rounded-full "
                              style={{
                                backgroundColor: categories.find(
                                  (category) => category.id === field.value,
                                )?.color,
                              }}
                            ></div>
                            <p>
                              {
                                categories.find(
                                  (category) => category.id === field.value,
                                )?.name
                              }
                            </p>
                          </div>
                        ) : (
                          "Select category"
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              value={category.name}
                              key={category.id}
                              onSelect={() => {
                                form.setValue("category", category.id);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  category.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              <div
                                className=" mr-2 size-4 rounded-full "
                                style={{ background: category.color }}
                              ></div>
                              {category.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className=" w-full  flex-1 grow-0">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className=" w-full flex-1 grow-0">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className=" w-1/3 gap-2"
            disabled={createExpense.isPending}
          >
            {createExpense.isPending ? (
              <>
                <LoaderCircle size={16} />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddExpenseForm;
