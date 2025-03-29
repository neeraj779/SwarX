export const AUTH_MODES = {
  LOGIN: 'login',
  SIGNUP: 'signup'
} as const;

export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  CALLBACK: '/'
} as const;

export const AUTH_PROVIDERS = {
  GITHUB: 'github',
  GOOGLE: 'google'
} as const;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  NETWORK_ERROR: 'Network error occurred. Please try again.',
  UNKNOWN: 'An unknown error occurred. Please try again.'
} as const;

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in',
  SIGNUP_SUCCESS: 'Account created successfully',
  LOGOUT_SUCCESS: 'Successfully logged out'
} as const;

export const AUTH_LABELS = {
  LOGIN: {
    TITLE: 'Welcome back',
    DESCRIPTION: 'Login with your Github or Google account',
    SUBMIT: 'Login',
    SUBMITTING: 'Signing in...',
    ALTERNATE: "Don't have an account?",
    ALTERNATE_LINK: 'Sign up'
  },
  SIGNUP: {
    TITLE: 'Create an account',
    DESCRIPTION: 'Sign up with your Github or Google account',
    SUBMIT: 'Sign up',
    SUBMITTING: 'Signing up...',
    ALTERNATE: 'Already have an account?',
    ALTERNATE_LINK: 'Login'
  }
} as const;
