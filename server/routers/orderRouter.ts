import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { router, publicProcedure } from '../trpc';

const prisma = new PrismaClient();

export const orderRouter = router({
  // Create a new order
  createOrder: publicProcedure
    .input(
      z.object({
        name: z.string(),
        street: z.string(),
        postalCode: z.string(),
        city: z.string(),
       
      })
    )
    .mutation(async (opts) => {
      const { name, street, postalCode, city} = opts.input;

      const createdOrder = await prisma.order.create({
        data: {
          name,
          street,
          postalCode,
          city,
          
        },
      });

      return createdOrder;
    }),

  // Get order by ID
  getOrderById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (opts) => {
      const { id } = opts.input;

      const order = await prisma.order.findUnique({
        where: {
          id,
        },
      });

      return order;
    }),
});

export type OrderRouter = typeof orderRouter;
