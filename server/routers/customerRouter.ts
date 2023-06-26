import { z } from 'zod';
import { PrismaClient } from '@prisma/client'
 const prisma = new PrismaClient()
import { router, publicProcedure } from '../trpc';

export const customerRouter = router({


  //create
  customerCreate: publicProcedure
  .input(z.object({
    name: z.string(),
    email: z.string(),
    address: z.string(),
    phoneNumber: z.string(),
  }))
  .mutation(async (opts) => {
    const { name, email, address, phoneNumber } = opts.input;

    const existingCustomer = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (existingCustomer) {
      throw new Error("A customer with the same email already exists.");
    }

    const createCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        address,
        phoneNumber,
      },
    });

    return createCustomer;
  }),


//getCustomerList

  customerList: publicProcedure
  .query(async () => {
    const customerList = await prisma.customer.findMany();
    return customerList;
  }),


  getCustomerById: publicProcedure
  .input(z.number())
  .query(async (opts) => {
    const { input } = opts;
    const customer = await prisma.customer.findMany({
      where: {
        id: input
      },
      select: {
        name: true,
        email: true,
        address:true,
        phoneNumber:true

      },
    });
    return customer;
  }),
  
  
});

export type CustomerRouter = typeof customerRouter;