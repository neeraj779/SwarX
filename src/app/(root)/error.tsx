"use client";

import { useEffect } from "react";

import { ErrorPage } from "@/components/error/error-page";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <ErrorPage
      title="Failed to load data"
      message="We couldn't load your music data. Please try again later."
      reset={reset}
    />
  );
}
