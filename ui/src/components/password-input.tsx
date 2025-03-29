import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData, PasswordInputProps } from '@/types/auth.types';

export const PasswordInput = ({
  id,
  label,
  register,
  error,
  showForgotPassword = false
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid gap-2 group">
      <div className="flex items-center">
        <Label
          htmlFor={id}
          className="text-sm font-medium text-muted-foreground/90 group-focus-within:text-primary transition-colors"
        >
          {label}
        </Label>
        {showForgotPassword && (
          <a
            href="#"
            className="ml-auto text-sm text-muted-foreground/80 hover:text-primary underline-offset-4 hover:underline transition-colors"
          >
            Forgot your password?
          </a>
        )}
      </div>
      <div className="relative">
        <Input
          id={id}
          {...register(id as keyof FormData)}
          type={showPassword ? 'text' : 'password'}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-200 placeholder:text-muted-foreground/50"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-primary/10 transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      {error && (
        <p
          className="text-sm font-medium text-red-500/90 py-1 px-2 rounded-md animate-in fade-in-50 slide-in-from-top-1"
          id={`${id}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
