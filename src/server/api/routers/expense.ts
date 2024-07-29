import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

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
    // console.log(ctx.session);
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
});
