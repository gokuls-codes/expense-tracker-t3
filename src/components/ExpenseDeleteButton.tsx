"use client";

import React from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

type Props = {
  expenseId: string;
};

const ExpenseDeleteButton = ({ expenseId }: Props) => {
  const router = useRouter();
  const deleteExpense = api.expense.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleClick = () => {
    deleteExpense.mutate(expenseId);
  };

  return (
    <Button size={"icon"} variant={"destructive"} onClick={handleClick}>
      <Trash className=" text-destructive-foreground" />
    </Button>
  );
};

export default ExpenseDeleteButton;
