import { useEffect, useMemo, useState } from 'react';
import { SectionCard } from '../components/section-card/SectionCard';
import { useServerRequest } from '../hooks';
import { Link } from 'react-router-dom';
import { Input, Pagination, SketchCard } from '../components';
import { PAGINATION_LIMIT } from '../constants';
import { debounce } from '../utils/debounce';

export const Main = () => {
  const requestServer = useServerRequest();
  const [sketchesList, setSketchesList] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  useEffect(() => {
    const loadSketches = async () => {
      try {
        const loadSketches = await requestServer(
          'fetchSketches',
          page,
          PAGINATION_LIMIT,
          searchPhrase
        );
        setSketchesList(loadSketches.res.sketches);
        const lastPageLink = loadSketches.res.links.match(
          /_page=(\d{1,4})&_limit=\d{1,3}\>; rel="last"/
        );
        setLastPage(lastPageLink ? +lastPageLink[1] : 1);
      } catch (error) {
        console.error('Не удалось загрузить sketches:', error);
      }
    };

    loadSketches();
  }, [requestServer, page, shouldSearch]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };

  return (
    <SectionCard title={'Главная страница'}>
      <div className="flex justify-center w-150 m-auto py-3">
        <Input onChange={onSearch} value={searchPhrase} placeholder="Искать..." />
      </div>
      {sketchesList.length ? (
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
      ) : (
        <p className="font-semibold text-center">Нет этюдов по вашему запросу</p>
      )}

      {lastPage > 1 && <Pagination setPage={setPage} currentPage={page} lastPage={lastPage} />}
    </SectionCard>
  );
};
