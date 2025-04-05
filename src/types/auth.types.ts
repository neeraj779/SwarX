import { AUTH_PROVIDERS } from "@/constants/auth.constants";

export interface AuthFormProps extends React.ComponentPropsWithoutRef<"div"> {
  mode?: "signin" | "signup";
}

export type AuthProvider = (typeof AUTH_PROVIDERS)[keyof typeof AUTH_PROVIDERS];
