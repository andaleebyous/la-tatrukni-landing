import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { createOrder, getOrderStats, listOrders, updateOrderStatus } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";

const orderStatus = z.enum(["pending", "confirmed", "shipped", "completed", "cancelled"]);

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  orders: router({
    create: publicProcedure.input(z.object({
      name: z.string().min(2).max(160),
      phone: z.string().min(8).max(32),
      city: z.string().min(2).max(80),
      planId: z.string().min(1).max(32),
      planName: z.string().min(1).max(100),
      amount: z.number().int().positive(),
    })).mutation(async ({ input }) => {
      const orderNumber = `LT-${Date.now().toString(36).toUpperCase()}`;
      const order = await createOrder({ ...input, orderNumber, status: "pending" });
      return { order, orderNumber };
    }),
    list: adminProcedure.input(z.object({ status: orderStatus.optional() }).optional()).query(({ input }) => listOrders(input?.status)),
    stats: adminProcedure.query(() => getOrderStats()),
    updateStatus: adminProcedure.input(z.object({ id: z.number().int().positive(), status: orderStatus })).mutation(({ input }) => updateOrderStatus(input.id, input.status)),
  }),
});

export type AppRouter = typeof appRouter;
