import React, { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

export interface AuthProps {
  children: any;
}

export function Auth({ children }: AuthProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    if (!firstLoading && !profile?.id) router.push("/enter");
  }, [router, profile, firstLoading]);

  if (!profile?.id) return <p>Loading...</p>;

  return <div>{children}</div>;
}
