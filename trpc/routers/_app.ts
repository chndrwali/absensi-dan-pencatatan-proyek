import { createTRPCRouter } from "@/trpc/init";
import { sheetRouter } from "@/modules/public/server/router";

export const appRouter = createTRPCRouter({
  sheet: sheetRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
