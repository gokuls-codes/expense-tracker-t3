import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { format } from "date-fns";

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
        createdAt: { gt: startDate, lte: endDate },
      },
      include: { category: true },
    });
  }),

  getMonthExpenses: protectedProcedure.query(({ ctx }) => {
    let tempDate = new Date();
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(0);
    const startDate = new Date(tempDate);
    tempDate.setMonth(tempDate.getMonth() + 2);
    tempDate.setDate(0);
    const endDate = new Date(tempDate);

    return ctx.db.expense.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: { gt: startDate, lte: endDate },
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
        createdAt: { gt: startDate, lte: endDate },
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
        createdAt: { gt: startDate, lte: endDate },
      },
    });
  }),

  getCategoryTotalMonth: protectedProcedure.query(({ ctx }) => {
    let tempDate = new Date();
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(0);
    const startDate = new Date(tempDate);
    tempDate.setMonth(tempDate.getMonth() + 2);
    tempDate.setDate(0);
    const endDate = new Date(tempDate);

    return ctx.db.expense.groupBy({
      by: ["categoryId"],
      _sum: {
        amount: true,
      },
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: { gt: startDate, lte: endDate },
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
        createdAt: { gt: startDate, lte: endDate },
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
        createdAt: { gt: startDate, lte: endDate },
      },
    });
  }),
  getMonthTotal: protectedProcedure.query(({ ctx }) => {
    let tempDate = new Date();
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(0);
    const startDate = new Date(tempDate);
    tempDate.setMonth(tempDate.getMonth() + 2);
    tempDate.setDate(0);
    const endDate = new Date(tempDate);

    return ctx.db.expense.aggregate({
      _sum: { amount: true },
      where: {
        createdBy: { id: ctx.session.user.id },
        createdAt: { gt: startDate, lte: endDate },
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
        createdAt: { gt: startDate, lte: endDate },
      },
    });
  }),

  getReport: protectedProcedure
    .input(
      z.object({
        start: z.date(),
        end: z.date(),
        frequency: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const expenses = await ctx.db.expense.findMany({
        where: {
          createdBy: { id: ctx.session.user.id },
          createdAt: {
            gt: input.start,
            lte: new Date(input.end.getTime() + 24 * 60 * 60 * 1000),
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
        dt <= new Date(input.end.getTime() + 24 * 60 * 60 * 1000);
        dt.setDate(dt.getDate() + 1)
      ) {
        tempChartData.set(format(dt, "dd/MM/yy"), new Map(tempCategoryMap));
      }

      expenses.forEach((expense) => {
        let key = format(expense.createdAt, "dd/MM/yy");
        let curr = tempChartData.get(key);
        if (curr !== undefined) {
          curr.set(
            expense.category.id,
            (curr.get(expense.category.id) as number) + expense.amount,
          );
          tempChartData.set(key, curr);
        }
      });

      const chartData = Array.from(tempChartData.entries()).map(
        ([key, value]) => {
          return {
            date: key,
            ...Object.fromEntries(value.entries()),
          };
        },
      );

      return { chartConfig, chartData };
    }),
});
