import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export const expenseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        categoryId: z.string(),
        amount: z.number(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.expense.create({
        data: {
          category: {
            connect: {
              id: input.categoryId,
            },
          },
          amount: input.amount,
          description: input.description,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.expense.delete({
        where: { id: input },
      });
    }),

  get: protectedProcedure.query(({ ctx }) => {
    return ctx.db.expense.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
      include: { category: true },
    });
  }),

  getWeekExpenses: protectedProcedure.query(({ ctx }) => {
    let tempDate = new Date();
    tempDate.setHours(0, 0, 0, 0);
    const startDate = new Date(
      tempDate.getTime() - tempDate.getDay() * 24 * 60 * 60 * 1000,
    );
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    return ctx.db.expense.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: { gte: startDate, lt: endDate },
      },
      include: { category: true },
    });
  }),

  getMonthExpenses: protectedProcedure.query(({ ctx }) => {
    let tempDate = new Date();
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(1);
    const startDate = new Date(tempDate);
    tempDate.setMonth(tempDate.getMonth() + 1);
    tempDate.setDate(1);
    const endDate = new Date(tempDate);

    return ctx.db.expense.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: { gte: startDate, lt: endDate },
      },
      include: { category: true },
    });
  }),

  getYearExpenses: protectedProcedure.query(({ ctx }) => {
    let tempDate = new Date();
    const startDate = new Date(tempDate.getFullYear(), 0, 1);
    const endDate = new Date(tempDate.getFullYear() + 1, 0, 1);

    return ctx.db.expense.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: { gte: startDate, lt: endDate },
      },
      include: { category: true },
    });
  }),

  getCategoryTotalWeek: protectedProcedure.query(({ ctx }) => {
    let tempDate = new Date();
    tempDate.setHours(0, 0, 0, 0);
    const startDate = new Date(
      tempDate.getTime() - tempDate.getDay() * 24 * 60 * 60 * 1000,
    );
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    return ctx.db.expense.groupBy({
      by: ["categoryId"],
      _sum: {
        amount: true,
      },
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: { gte: startDate, lt: endDate },
      },
    });
  }),

  getCategoryTotalMonth: protectedProcedure.query(({ ctx }) => {
    let tempDate = new Date();
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(1);
    const startDate = new Date(tempDate);
    tempDate.setMonth(tempDate.getMonth() + 1);
    tempDate.setDate(1);
    const endDate = new Date(tempDate);

    return ctx.db.expense.groupBy({
      by: ["categoryId"],
      _sum: {
        amount: true,
      },
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: { gte: startDate, lt: endDate },
      },
    });
  }),

  getCategoryTotalYear: protectedProcedure.query(({ ctx }) => {
    let tempDate = new Date();
    const startDate = new Date(tempDate.getFullYear(), 0, 1);
    const endDate = new Date(tempDate.getFullYear() + 1, 0, 1);

    return ctx.db.expense.groupBy({
      by: ["categoryId"],
      _sum: {
        amount: true,
      },
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: { gte: startDate, lt: endDate },
      },
    });
  }),

  getWeekTotal: protectedProcedure.query(({ ctx }) => {
    let tempDate = new Date();
    tempDate.setHours(0, 0, 0, 0);
    const startDate = new Date(
      tempDate.getTime() - tempDate.getDay() * 24 * 60 * 60 * 1000,
    );
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    return ctx.db.expense.aggregate({
      _sum: { amount: true },
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: { gte: startDate, lt: endDate },
      },
    });
  }),
  getMonthTotal: protectedProcedure.query(({ ctx }) => {
    let tempDate = new Date();
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(1);
    const startDate = new Date(tempDate);
    tempDate.setMonth(tempDate.getMonth() + 1);
    tempDate.setDate(1);
    const endDate = new Date(tempDate);

    return ctx.db.expense.aggregate({
      _sum: { amount: true },
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: { gte: startDate, lt: endDate },
      },
    });
  }),
  getYearTotal: protectedProcedure.query(({ ctx }) => {
    let tempDate = new Date();
    const startDate = new Date(tempDate.getFullYear(), 0, 1);
    const endDate = new Date(tempDate.getFullYear() + 1, 0, 1);

    return ctx.db.expense.aggregate({
      _sum: { amount: true },
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: { gte: startDate, lt: endDate },
      },
    });
  }),

  getReport: protectedProcedure
    .input(
      z.object({
        start: z.date(),
        end: z.date(),
        frequency: z.string(),
        categories: z.set(z.string()),
      }),
    )
    .query(async ({ ctx, input }) => {
      let keyFormat = "";
      if (input.frequency === "day") keyFormat = "dd/MM/yy";
      else if (input.frequency === "month") keyFormat = "MM/yy";
      else keyFormat = "yyyy";

      input.categories.delete("");

      const expenses = await ctx.db.expense.findMany({
        where: {
          createdBy: { id: ctx.session.user.id },
          categoryId: input.categories.size
            ? { in: Array.from(input.categories) }
            : {},
          createdAt: {
            gt: input.start,
            lt: new Date(input.end.getTime() + 24 * 60 * 60 * 1000),
          },
        },
        include: {
          category: true,
        },
      });

      const categories = await ctx.db.category.findMany({
        where: { createdBy: { id: ctx.session.user.id } },
      });

      const chartConfig = categories.reduce((acc, category) => {
        return {
          ...acc,
          [category.id]: {
            label: category.name,
            color: category.color,
          },
        };
      }, {});

      const tempCategoryMap = new Map<string, number>();
      categories.forEach((category) => {
        tempCategoryMap.set(category.id, 0);
      });

      let tempChartData = new Map<string, typeof tempCategoryMap>();
      for (
        const dt = new Date(input.start);
        dt < new Date(input.end.getTime() + 24 * 60 * 60 * 1000);
        dt.setDate(dt.getDate() + 1)
      ) {
        tempChartData.set(
          formatInTimeZone(dt, "Asia/Kolkata", keyFormat),
          new Map(tempCategoryMap),
        );
      }

      expenses.forEach((expense) => {
        let key = formatInTimeZone(
          expense.createdAt,
          "Asia/Kolkata",
          keyFormat,
        );
        let curr = tempChartData.get(key);
        if (curr !== undefined) {
          curr.set(
            expense.category.id,
            curr.get(expense.category.id)! + expense.amount,
          );
          tempChartData.set(key, curr);
        }
      });

      const chartData = Array.from(tempChartData.entries()).map(
        ([key, value]) => {
          return {
            date: key,
            ...Object.fromEntries(
              new Map([...value].filter(([k, v]) => v > 0)).entries(),
            ),
          };
        },
      );

      return { chartConfig, chartData, expenses };
    }),
});
