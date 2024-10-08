import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import ExpenseDeleteButton from "./ExpenseDeleteButton";

type Category = {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  userId: string;
};

type Expense = {
  id: string;
  description: string;
  createdAt: Date;
  userId: string;
  amount: number;
  category: Category;
};

type Props = {
  expenses: Expense[];
};

const WeeklyExpenses = ({ expenses }: Props) => {
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="">Category</TableHead>
          <TableHead className=" flex-1">Description</TableHead>
          <TableHead className=" text-right">Amount</TableHead>
          <TableHead className=" w-28 ">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {expenses.length === 0 && (
          <TableRow suppressHydrationWarning>
            <TableCell colSpan={4} className="h-24 text-center">
              No records.
            </TableCell>
          </TableRow>
        )}
        {expenses.map((expense) => (
          <TableRow className=" " key={expense.id}>
            <TableCell className="  font-medium">
              <div className=" flex h-full items-center gap-2">
                <div
                  className=" size-4 rounded-full"
                  style={{ backgroundColor: expense.category.color }}
                ></div>
                {expense.category.name}
              </div>
            </TableCell>
            <TableCell className=" ">{expense.description}</TableCell>
            <TableCell className="text-right">
              {"\u20B9"}
              {expense.amount}
            </TableCell>
            <TableCell className=" w-28 px-0">
              <ExpenseDeleteButton expenseId={expense.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WeeklyExpenses;
