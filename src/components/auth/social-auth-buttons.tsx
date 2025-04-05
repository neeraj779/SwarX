"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useSocialAuth } from "@/hooks/use-social-auth";

import { AUTH_MODES, AUTH_PROVIDERS } from "@/constants/auth.constants";

import { AuthFormProps } from "@/types/auth.types";

import { GitHubLogoIcon, GoogleLogoIcon } from "../social-icons";

const providers = [
  {
    key: AUTH_PROVIDERS.GITHUB,
    label: "GitHub",
    icon: GitHubLogoIcon,
    gradient: "from-zinc-500/10 to-zinc-500/20",
  },
  {
    key: AUTH_PROVIDERS.GOOGLE,
    label: "Google",
    icon: GoogleLogoIcon,
    gradient: "from-blue-500/10 to-red-500/10",
  },
];

export const SocialAuthButtons = ({ mode }: AuthFormProps) => {
  const { authenticate, isLoading, provider } = useSocialAuth();
  const isSignIn = mode === AUTH_MODES.SIGNIN;

  return (
    <div className="flex flex-col gap-3">
      {providers.map(({ key, label, icon: Icon, gradient }) => (
        <Button
          key={key}
          type="button"
          variant="outline"
          className="group border-border/50 hover:border-border/80 bg-background/50 relative w-full overflow-hidden backdrop-blur-sm transition-colors"
          onClick={() => authenticate(key)}
          disabled={isLoading}>
          <div
            className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 transition-opacity group-hover:opacity-100`}
          />
          {isLoading && provider === key ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Icon />
          )}
          <span className="ml-3 font-medium">
            {isSignIn ? `Sign in with ${label}` : `Sign up with ${label}`}
          </span>
        </Button>
      ))}
    </div>
  );
};
