import { z } from 'zod';
import { PrismaClient } from '@prisma/client'
 const prisma = new PrismaClient()
import { router, publicProcedure } from '../trpc';

export const ingredientRouter = router({


    //createIngredient
    createIngredient: publicProcedure
    .input(
      z.object({
        name: z.string(),
        quantity: z.number(),
        unit: z.string(),
        recipeId: z.number().optional(),
      })
    )
    .mutation(async (opts) => {
      const { name, quantity, unit, recipeId } = opts.input;

      const createIngredient = await prisma.ingredient.create({
        data: {
          name,
          quantity,
          unit,
          recipeId,
        },
      });

      return createIngredient;
    }),

  //getIngredientList
    ingredientList: publicProcedure
    .query(async () => {
      const ingredientList = await prisma.ingredient.findMany();
      return ingredientList;
    }),

  //updateIngredient
    updateIngredient: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        quantity: z.number().optional(),
        unit: z.string().optional(),
        recipeId: z.number().optional(),
      })
    )
    .mutation(async (opts) => {
      const { id, name, quantity, unit, recipeId } = opts.input;

      const updatedIngredient = await prisma.ingredient.update({
        where: {
          id,
        },
        data: {
          name,
          quantity,
          unit,
          recipeId,
        },
      });

      return updatedIngredient;
    }),


    //deleteIngredient
    deleteIngredient: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { id } = opts.input;

      const deletedIngredient = await prisma.ingredient.delete({
        where: {
          id,
        },
      });

      return deletedIngredient;
    }),


    // //
    // createRecipe: publicProcedure
    // .input(
    //   z.object({
    //     name: z.string(),
    //     description: z.string(),
    //     cookingInstructions: z.string(),
    //     customerId: z.number(),
    //   })
    // )
    // .mutation(async (opts) => {
    //   const { name, description, cookingInstructions, customerId } = opts.input;
  
    //   const createRecipe = await prisma.recipe.create({
    //     data: {
    //       name,
    //       description,
    //       cookingInstructions,
    //       customer: {
    //         connect: {
    //           id: customerId,
    //         },
    //       },
    //     },
    //   });
  
    //   return createRecipe;
    // }),

    // Inside the ingredientRouter

//getIngredientById
getIngredientById: publicProcedure
.input(
  z.object({
    id: z.number(),
  })
)
.query(async (opts) => {
  const { id } = opts.input;

  const ingredient = await prisma.ingredient.findUnique({
    where: {
      id,
    },
  });

  return ingredient;
}),



  

  
});

export type IngredientRouter = typeof ingredientRouter;