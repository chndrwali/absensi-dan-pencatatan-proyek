"use client";

import { useSession as useBetterAuthSession } from "@/lib/auth-client";

export function useSession() {
  const { data: session, isPending } = useBetterAuthSession();
  return { session, isPending };
}
