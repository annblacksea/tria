import { useEffect, useState } from 'react';
import { SectionCard } from '../components/section-card/SectionCard';
import { useServerRequest } from '../hooks';
import { Link } from 'react-router-dom';
import { Pagination, SketchCard } from '../components';

export const Main = () => {
  const requestServer = useServerRequest();
  const [sketchesList, setSketchesList] = useState([]);

  useEffect(() => {
    const loadSketches = async () => {
      try {
        const loadSketches = await requestServer('fetchSketches');
        setSketchesList(loadSketches.res);
      } catch (error) {
        console.error('Не удалось загрузить sketches:', error);
      }
    };

    loadSketches();
  }, [requestServer]);

  return (
    <SectionCard title={'Главная страница'}>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sketchesList.map(({ id, title, images }) => {
          return (
            <li key={id}>
              <Link
                className="block transform transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1"
                to={`sketch/${id}`}
              >
                <SketchCard title={title} img={images[0].link} />
              </Link>
            </li>
          );
        })}
      </ul>
      <Pagination />
    </SectionCard>
  );
};
