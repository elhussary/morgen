import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { tasks } from "~/server/db/schema";

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(256),
        notes: z.string().optional(),
        priority: z.string().default("No priority"),
        estimate: z.string().max(50).optional(),
        duedate: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tasks).values({
        title: input.title,
        notes: input.notes,
        priority: input.priority,
        estimate: input.estimate,
        duedate: input.duedate,
        createdById: ctx.session.user.id,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).max(256).optional(),
        notes: z.string().optional(),
        priority: z.string().default("No priority"),
        estimate: z.string().max(50).optional(),
        duedate: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      await ctx.db.update(tasks).set(updateData).where(eq(tasks.id, id));
    }),

  getTasks: protectedProcedure.query(async ({ ctx }) => {
    const userTasks = await ctx.db.select().from(tasks).where(eq(tasks.createdById, ctx.session.user.id));
    return userTasks;
  }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(tasks).where(eq(tasks.id, input.id));
    }),
});
