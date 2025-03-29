import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormRegister } from 'react-hook-form';
import { FormData } from '@/types/auth.types';

interface FormFieldProps {
  id: keyof FormData;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FormData>;
  error?: string;
  required?: boolean;
}

export const FormField = ({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  error,
  required = false
}: FormFieldProps) => {
  return (
    <div className="grid gap-2 group">
      <Label
        htmlFor={id}
        className="text-sm font-medium text-muted-foreground/90 group-focus-within:text-primary transition-colors"
      >
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, { required })}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-200 placeholder:text-muted-foreground/50"
      />
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
