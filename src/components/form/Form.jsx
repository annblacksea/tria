export const Form = ({ children, onSubmit }) => {
  return (
    <form
      className="flex w-full m-auto p-7 flex-col justify-center items-center gap-7"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};
