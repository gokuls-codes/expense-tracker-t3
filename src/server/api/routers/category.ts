import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), color: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call

      return ctx.db.category.create({
        data: {
          name: input.name,
          color: input.color,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  get: protectedProcedure.query(({ ctx }) => {
    // console.log(ctx.session);
    return ctx.db.category.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
});
