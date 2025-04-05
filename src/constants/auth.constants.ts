export const AUTH_MODES = {
  SIGNIN: "signin",
  SIGNUP: "signup",
} as const;

export const AUTH_ROUTES = {
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  CALLBACK: "/",
} as const;

export const AUTH_PROVIDERS = {
  GITHUB: "github",
  GOOGLE: "google",
} as const;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Invalid email or password",
  NETWORK_ERROR: "Network error occurred. Please try again.",
  UNKNOWN: "An unknown error occurred. Please try again.",
} as const;

export const AUTH_MESSAGES = {
  SIGNIN_SUCCESS: "Successfully signed in",
  SIGNUP_SUCCESS: "Account created successfully",
  LOGOUT_SUCCESS: "Successfully logged out",
} as const;
