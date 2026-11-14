export const H2 = ({ children, className = '' }) => {
  return (
    <h2 className={`text-center font-[family-name:var(--font-header)] text-3xl text-main-text ${className}`}>
      {children}
    </h2>
  );
};
