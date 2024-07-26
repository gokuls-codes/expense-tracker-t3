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

const WeeklyExpenses = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Category</TableHead>
          <TableHead className=" flex-1">Description</TableHead>
          <TableHead className=" text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default WeeklyExpenses;
