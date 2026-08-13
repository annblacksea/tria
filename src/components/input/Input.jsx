import { forwardRef } from 'react';

export const Input = forwardRef(({ ...props }, ref) => {
  return <input className="w-full max-w-[70%] p-3 rounded-2xl bg-[#f9f5f5]" {...props} ref={ref} />;
});
