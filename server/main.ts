import { customerRouter } from './routers/customerRouter';
 import { ingredientRouter } from './routers/ingredientRouter';
import { orderRouter } from './routers/orderRouter';
import { recipeRouter } from "./routers/recipeRouter"
import { router } from './trpc';

export const appRouter = router({
  customer: customerRouter, 
  ingredients: ingredientRouter,
  recipe:recipeRouter,
  order:orderRouter,
});
 

 
export type AppRouter = typeof appRouter;