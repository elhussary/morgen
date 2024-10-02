import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { lists } from "~/server/db/schema";

export const listRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, { message: "Please add a list name" }).max(256),
        color: z.string().min(1).max(256),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(lists).values({
        title: input.title,
        color: input.color,
        createdById: ctx.session.user.id,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).max(256).optional(),
        color: z.string().min(1).max(256).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      await ctx.db.update(lists).set(updateData).where(eq(lists.id, id));
    }),

  getlists: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(lists).where(eq(lists.createdById, ctx.session.user.id));
  }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(lists).where(eq(lists.id, input.id));
    }),
});
