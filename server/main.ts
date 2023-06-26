import { customerRouter } from './routers/customerRouter';
 import { ingredientRouter } from './routers/ingredientRouter';
import { recipeRouter } from "./routers/recipeRouter"
import { router } from './trpc';

export const appRouter = router({
  customer: customerRouter, 
  ingredients: ingredientRouter,
  recipe:recipeRouter 
});
 

 
export type AppRouter = typeof appRouter;