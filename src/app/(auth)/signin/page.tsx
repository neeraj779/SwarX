import { GalleryVerticalEnd } from "lucide-react";

import { AuthForm } from "@/components/auth/auth-form";

export default function SignInPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          SwarX
        </a>
        <AuthForm mode="signin" />
      </div>
    </div>
  );
}
