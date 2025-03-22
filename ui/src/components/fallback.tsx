export const Fallback = ({ error }: { error: Error }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p>Something went wrong:</p>
      <pre className="text-red-500 font-mono">{error.message}</pre>
    </div>
  );
};
