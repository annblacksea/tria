export const SketchCard = ({ img, title }) => {
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-border-light bg-card-bg p-3 text-main-text shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      <img src={img} alt="Обложка статьи" className="w-full h-48 object-cover rounded-xl" />
      <h3 className="text-lg font-semibold line-clamp-1 px-1">{title}</h3>
    </article>
  );
};
