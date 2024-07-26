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

  get: protectedProcedure.query(({ ctx }) => {
    // console.log(ctx.session);
    return ctx.db.expense.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getCategoryTotal: protectedProcedure.query(({ ctx }) => {
    return ctx.db.expense.groupBy({
      by: ["categoryId"],
      _sum: {
        amount: true,
      },
    });
  }),
});
