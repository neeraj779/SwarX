import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { signIn, signUp } from '@/lib/auth-client';
import { loginSchema, signupSchema } from '@/schemas/auth.schema';
import { FormData } from '@/types/auth.types';
import { AUTH_MODES, AUTH_ROUTES, AUTH_ERRORS } from '@/constants/auth.constants';

interface UseAuthFormProps {
  mode: (typeof AUTH_MODES)[keyof typeof AUTH_MODES];
}

interface AuthError {
  message: string;
  field?: keyof FormData;
  code?: string;
}

type AuthResponse = {
  error?: {
    message: string;
    code?: string;
  };
};

const DEFAULT_VALUES: FormData = {
  email: '',
  password: '',
  confirmPassword: '',
  name: ''
};

export const useAuthForm = ({ mode }: UseAuthFormProps) => {
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const navigate = useNavigate();

  const schema = useMemo(() => (mode === AUTH_MODES.LOGIN ? loginSchema : signupSchema), [mode]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onBlur'
  });

  useEffect(() => {
    const resetForm = () => {
      form.reset(DEFAULT_VALUES);
      setAuthError(null);
    };
    resetForm();
  }, [mode, form]);

  const handleAuthError = useCallback((error: unknown) => {
    const authError: AuthError = {
      message: AUTH_ERRORS.UNKNOWN,
      code: 'UNKNOWN_ERROR'
    };

    if (error instanceof Error) {
      authError.message = error.message;
    }

    setAuthError(authError);
  }, []);

  const authMutation = useMemo(() => {
    const login = async (data: FormData) => {
      return signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: AUTH_ROUTES.CALLBACK,
        rememberMe: true
      });
    };

    const signup = async (data: FormData) => {
      return signUp.email({
        name: data.name!,
        email: data.email,
        password: data.password,
        callbackURL: AUTH_ROUTES.CALLBACK
      });
    };

    return mode === AUTH_MODES.LOGIN ? login : signup;
  }, [mode]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        setAuthError(null);
        const response = await authMutation(data);

        if ((response as AuthResponse).error) {
          throw new Error((response as AuthResponse).error?.message || AUTH_ERRORS.UNKNOWN);
        }

        form.reset();
        toast.success(
          mode === AUTH_MODES.LOGIN ? 'Successfully logged in!' : 'Account created successfully!',
          {
            duration: 3000,
            className: 'bg-background/95 border border-border/50 backdrop-blur'
          }
        );

        if (mode === AUTH_MODES.SIGNUP) {
          navigate(AUTH_ROUTES.LOGIN);
        }
      } catch (err) {
        handleAuthError(err);
      }
    },
    [mode, authMutation, form, navigate, handleAuthError]
  );

  return {
    form,
    authError,
    handleSubmit: form.handleSubmit(handleSubmit),
    isSubmitting: form.formState.isSubmitting,
    isDirty: form.formState.isDirty,
    errors: form.formState.errors,
    reset: () => {
      form.reset(DEFAULT_VALUES);
      setAuthError(null);
    }
  };
};
