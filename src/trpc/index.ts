import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  // anyApiRouter: publicProcedure.query(() => {
  //   return "hello";
  // }),
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
