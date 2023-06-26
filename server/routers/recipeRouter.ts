import { z } from 'zod';
import { PrismaClient } from '@prisma/client'
 const prisma = new PrismaClient()
import { router, publicProcedure } from '../trpc';

export const recipeRouter = router({


    //create

createRecipe: publicProcedure
.input(
  z.object({
    name: z.string(),
    description: z.string(),
    cookingInstructions: z.string(),
    customerId: z.number(),
  })
)
.mutation(async (opts) => {
  const { name, description, cookingInstructions, customerId } = opts.input;

  const createdRecipe = await prisma.recipe.create({
    data: {
      name,
      description,
      cookingInstructions,
      customer: {
        connect: { id: customerId },
      },
    },
  });

  return createdRecipe;
}),


    //recipelist

    recipeList: publicProcedure
    .query(async () => {
      const recipeList = await prisma.recipe.findMany();
      return recipeList;
    }),


    //getbyid
    getRecipeById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (opts) => {
      const { id } = opts.input;

      const recipe = await prisma.recipe.findUnique({
        where: {
          id,
        },
      });

      return recipe;
    }),


//delete
    deleteRecipe: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { id } = opts.input;

      const deletedRecipe = await prisma.recipe.delete({
        where: {
          id,
        },
      });

      return deletedRecipe;
    }),



//update

updateRecipe: publicProcedure
  .input(
    z.object({
      id: z.number(),
      name: z.string().optional(),
      description: z.string().optional(),
      cookingInstructions: z.string().optional(),
      customerId: z.number().optional(),
    })
  )
  .mutation(async (opts) => {
    const { id, name, description, cookingInstructions, customerId } = opts.input;

    const existingRecipe = await prisma.recipe.findUnique({ where: { id } });

    if (!existingRecipe) {
      throw new Error('Recipe not found');
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        name: name || existingRecipe.name,
        description: description || existingRecipe.description,
        cookingInstructions: cookingInstructions || existingRecipe.cookingInstructions,
        customer: customerId ? { connect: { id: customerId } } : undefined,
      },
    });

    return updatedRecipe;
  }),




    
});

export type RecipeRouter = typeof recipeRouter;