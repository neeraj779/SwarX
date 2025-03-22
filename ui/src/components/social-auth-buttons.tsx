import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth-client';
import { GitHubLogoIcon, GoogleLogoIcon } from './social-icons';
import { AuthFormProps, AuthProvider } from '@/types/auth.types';
import { AUTH_MODES, AUTH_PROVIDERS, AUTH_ROUTES } from '@/constants/auth.constants';

export const SocialAuthButtons = ({ mode }: AuthFormProps) => {
  const handleSocialAuth = async (provider: AuthProvider) => {
    try {
      await signIn.social({
        provider,
        callbackURL: AUTH_ROUTES.CALLBACK
      });
    } catch (error) {
      console.error('Social auth error:', error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        type="button"
        variant="outline"
        className="w-full relative overflow-hidden group border-border/50 hover:border-border/80 transition-colors bg-background/50 backdrop-blur-sm"
        onClick={() => handleSocialAuth(AUTH_PROVIDERS.GITHUB)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-500/10 to-zinc-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <GitHubLogoIcon />
        <span className="ml-3 font-medium">
          {mode === AUTH_MODES.LOGIN ? 'Login with GitHub' : 'Sign up with GitHub'}
        </span>
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full relative overflow-hidden group border-border/50 hover:border-border/80 transition-colors bg-background/50 backdrop-blur-sm"
        onClick={() => handleSocialAuth(AUTH_PROVIDERS.GOOGLE)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <GoogleLogoIcon />
        <span className="ml-3 font-medium">
          {mode === AUTH_MODES.LOGIN ? 'Login with Google' : 'Sign up with Google'}
        </span>
      </Button>
    </div>
  );
};
