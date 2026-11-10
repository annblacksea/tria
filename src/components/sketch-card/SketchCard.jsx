export const SketchCard = ({ img, title }) => {
  return (
    <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col p-3 gap-3 border border-gray-100 h-full">
      <img src={img} alt="Обложка статьи" className="w-full h-48 object-cover rounded-xl" />
      <h3 className="text-lg font-semibold line-clamp-1 px-1">{title}</h3>
    </article>
  );
};
