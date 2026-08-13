export const SectionCard = ({ title, children }) => {
  return (
    <section className="content-card">
      <h2 className="card-title">{title}</h2>
      {children}
    </section>
  );
};
