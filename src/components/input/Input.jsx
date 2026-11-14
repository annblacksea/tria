import { forwardRef } from 'react';

export const Input = forwardRef(({ ...props }, ref) => {
  return (
    <input
      className="w-full max-w-[70%] rounded-2xl border-2 border-main-text/50 bg-background p-3 text-main-text shadow-inner transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
      {...props}
      ref={ref}
    />
  );
});
