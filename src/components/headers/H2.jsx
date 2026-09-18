export const H2 = ({ children, className = '' }) => {
  return <h2 className={`font-[--header-font] text-center text-3xl ${className}`}>{children}</h2>;
};
