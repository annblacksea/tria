export const SectionCard = ({ title, children }) => {
  return (
    <section className="m-auto container content-card flex-col items-center">
      <h2 className="card-title">{title}</h2>
      {children}
    </section>
  );
};
