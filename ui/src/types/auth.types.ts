import { z } from 'zod';
import { loginSchema, signupSchema } from '@/schemas/auth.schema';
import { UseFormRegister } from 'react-hook-form';
import { AUTH_PROVIDERS } from '@/constants/auth.constants';

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type FormData = LoginFormData & Partial<SignupFormData>;

export interface PasswordInputProps {
  id: string;
  label: string;
  register: UseFormRegister<FormData>;
  error?: string;
  showForgotPassword?: boolean;
}

export interface AuthFormProps {
  mode: 'login' | 'signup';
}

export type AuthProvider = (typeof AUTH_PROVIDERS)[keyof typeof AUTH_PROVIDERS];
