import { memo } from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { FormField } from './form-field';
import { PasswordInput } from './password-input';
import { SocialAuthButtons } from './social-auth-buttons';
import { useAuthForm } from '@/hooks/use-auth-form';
import { AUTH_MODES, AUTH_LABELS, AUTH_ROUTES } from '@/constants/auth.constants';
import type { AuthFormProps } from '@/types/auth.types';
import SiteCredits from './site-credits.tsx';

export const AuthForm = memo(({ mode = AUTH_MODES.LOGIN }: AuthFormProps) => {
  const {
    form: { register },
    authError,
    errors,
    isSubmitting,
    handleSubmit
  } = useAuthForm({ mode });

  const labels = mode === AUTH_MODES.LOGIN ? AUTH_LABELS.LOGIN : AUTH_LABELS.SIGNUP;

  return (
    <div className={cn('flex flex-col gap-4 animate-in fade-in-50 duration-500')}>
      <Card className="backdrop-blur-xl bg-card/50 border-border/50 shadow-xl py-3">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            {labels.TITLE}
          </CardTitle>
          <CardDescription className="text-muted-foreground/80">
            {labels.DESCRIPTION}
          </CardDescription>
          {authError?.message && (
            <Alert variant="destructive" className="text-left">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{authError.message}</AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent className="pb-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-3">
                {mode === AUTH_MODES.SIGNUP && (
                  <FormField
                    id="name"
                    label="Name"
                    placeholder="John Doe"
                    register={register}
                    error={errors.name?.message}
                    required
                  />
                )}

                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="name@example.com"
                  register={register}
                  error={errors.email?.message}
                  required
                />

                <PasswordInput
                  id="password"
                  label="Password"
                  register={register}
                  error={errors.password?.message}
                  showForgotPassword={mode === AUTH_MODES.LOGIN}
                />

                {mode === AUTH_MODES.SIGNUP && (
                  <PasswordInput
                    id="confirmPassword"
                    label="Confirm Password"
                    register={register}
                    error={errors.confirmPassword?.message}
                  />
                )}

                <Button
                  type="submit"
                  className="w-full font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? labels.SUBMITTING : labels.SUBMIT}
                </Button>
              </div>

              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background/50 backdrop-blur-sm px-4 text-muted-foreground/70 rounded-full py-1">
                    Or continue with
                  </span>
                </div>
              </div>

              <SocialAuthButtons mode={mode} />

              <div className="text-center text-sm text-muted-foreground/80">
                {labels.ALTERNATE}{' '}
                <Link
                  to={mode === AUTH_MODES.LOGIN ? AUTH_ROUTES.SIGNUP : AUTH_ROUTES.LOGIN}
                  className="underline underline-offset-4 hover:text-primary transition-colors"
                >
                  {labels.ALTERNATE_LINK}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <SiteCredits />
    </div>
  );
});
