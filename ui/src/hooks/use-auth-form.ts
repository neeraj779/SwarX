import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
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
}

export const useAuthForm = ({ mode }: UseAuthFormProps) => {
  const [error, setError] = useState<AuthError | null>(null);
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(mode === AUTH_MODES.LOGIN ? loginSchema : signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    }
  });

  const handleSubmit = async (data: FormData) => {
    try {
      setError(null);
      const { error: authError } = await (mode === AUTH_MODES.LOGIN
        ? signIn.email({
            email: data.email,
            password: data.password,
            callbackURL: AUTH_ROUTES.CALLBACK,
            rememberMe: true
          })
        : signUp.email({
            name: data.name!,
            email: data.email,
            password: data.password,
            callbackURL: AUTH_ROUTES.CALLBACK
          }));

      if (authError) {
        throw new Error(authError.message || AUTH_ERRORS.UNKNOWN);
      }

      form.reset();

      if (mode === AUTH_MODES.SIGNUP) {
        navigate(AUTH_ROUTES.LOGIN);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError({
        message: err instanceof Error ? err.message : AUTH_ERRORS.UNKNOWN
      });
    }
  };

  const resetError = () => setError(null);

  useEffect(() => {
    form.reset();
    setError(null);
  }, [mode, form]);

  return {
    form,
    error,
    resetError,
    handleSubmit: form.handleSubmit(handleSubmit),
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors
  };
};
