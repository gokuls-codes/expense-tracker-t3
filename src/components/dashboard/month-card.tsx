import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toIndianFormat } from "@/lib/utils";
import { Category } from "@prisma/client";

type Props = {
  monthTotal: number | null;
  topCategories: Category[];
};

const MonthCard = ({ monthTotal, topCategories }: Props) => {
  return (
    <Card className=" flex-1">
      <CardHeader>
        <CardTitle className=" text-lg font-light text-muted-foreground">
          Monthly expenses
        </CardTitle>
        <CardDescription className=" text-3xl font-semibold text-foreground">
          {monthTotal ? toIndianFormat(monthTotal) : ""}
        </CardDescription>
      </CardHeader>
      <CardFooter className=" ">
        <div className=" flex">
          {topCategories?.map((category, index) => (
            <div
              style={{
                backgroundColor: category.color,
                left: -6 * index,
              }}
              key={category.id}
              className=" relative size-6 rounded-full border-2 border-card "
            />
          ))}
        </div>
        <p className=" text-sm font-light">
          {topCategories?.map((category) => category.name).join(", ")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default MonthCard;
