import { useState } from "react";

import { AuthFormSchema } from "@/schemas/auth-form-schema.ts";
import { toast } from "sonner";

import { signIn, signUp } from "@/lib/auth-client";

import {
  AUTH_MESSAGES,
  AUTH_ERRORS,
  AUTH_ROUTES,
} from "@/constants/auth.constants";

/**
 * Custom hook for handling email authentication operations
 * @param isSignIn - Boolean flag to determine if the operation is sign-in or sign-up
 * @returns Object containing authenticate function and loading state
 */
export function useEmailAuth(isSignIn: boolean) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Authenticates a user by either signing in or signing up via email
   * @param values - Authentication form values
   * @returns Authentication data or undefined on error
   */
  const authenticate = async (values: AuthFormSchema) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      let result;

      if (isSignIn) {
        result = await signIn.email({
          email: values.email,
          password: values.password,
          callbackURL: AUTH_ROUTES.CALLBACK,
          rememberMe: true,
        });
      } else {
        result = await signUp.email({
          name: values.name!,
          email: values.email,
          password: values.password,
          callbackURL: AUTH_ROUTES.CALLBACK,
        });
      }

      const { data, error } = result;

      if (error) {
        const errorMessage =
          error.message ||
          (isSignIn ? AUTH_ERRORS.INVALID_CREDENTIALS : AUTH_ERRORS.UNKNOWN);
        toast.error(errorMessage);
      }

      const successMessage = isSignIn
        ? AUTH_MESSAGES.SIGNIN_SUCCESS
        : AUTH_MESSAGES.SIGNUP_SUCCESS;
      toast.success(successMessage);

      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : AUTH_ERRORS.UNKNOWN;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    authenticate,
    isLoading,
  };
}
