import { envClient } from "@/config/env.client";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: envClient.NEXT_PUBLIC_APP_URL,
  plugins: [adminClient()],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
