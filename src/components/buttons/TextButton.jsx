export const TextButton = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`block rounded-xl bg-accent px-8 py-2 text-lg text-white
        transition-all duration-300 enabled:hover:scale-103 enabled:hover:brightness-110
        enabled:hover:shadow-md disabled:bg-transparent disabled:text-main-text/50
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
