export const TextButton = ({ children, ...props }) => {
  return (
    <button
      className="px-8 py-2 text-lg text-[#2c3e3e] rounded-xl]
                  transition-all duration-300
                  hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.3)]
                  hover:scale-103
                  disabled:hover:shadow-none disabled:hover:scale-100 disabled:text-[#7a8c8c]"
      {...props}
    >
      {children}
    </button>
  );
};
