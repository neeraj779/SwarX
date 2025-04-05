import { useState } from "react";

import { toast } from "sonner";

import { signIn } from "@/lib/auth-client";

import { AUTH_ERRORS, AUTH_ROUTES } from "@/constants/auth.constants";

import { AuthProvider } from "@/types/auth.types";

/**
 * Custom hook for handling social authentication
 * @returns Object containing social authentication function and loading state
 */
export function useSocialAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<AuthProvider | null>(null);

  /**
   * Authenticates a user with a social provider
   * @param authProvider - Social authentication provider (github, google, etc)
   * @returns Authentication result or undefined on error
   */
  const authenticate = async (authProvider: AuthProvider) => {
    if (isLoading) return;

    setIsLoading(true);
    setProvider(authProvider);

    try {
      const result = await signIn.social({
        provider: authProvider,
        callbackURL: AUTH_ROUTES.CALLBACK,
      });

      return result;
    } catch (error) {
      console.error("Social auth error:", error);
      const errorMessage =
        error instanceof Error ? error.message : AUTH_ERRORS.UNKNOWN;

      toast.error(errorMessage);
      return undefined;
    } finally {
      setIsLoading(false);
      setProvider(null);
    }
  };

  return {
    authenticate,
    isLoading,
    provider,
  };
}
