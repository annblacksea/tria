export const SectionCard = ({ title, children }) => {
  return (
    <section className="content-card flex-col items-center">
      <h3 className="card-title">{title}</h3>
      {children}
    </section>
  );
};
