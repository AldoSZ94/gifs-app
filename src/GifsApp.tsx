import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';

import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';

import { useGifs } from './gifs/hooks/useGifs';

export const GifsApp = () => {
  const { gifs, previousTerms, handleSearch, handleTermClicked } = useGifs();
  // const [gifs, setGifs] = useState<Gif[]>([]);
  // const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  // const handleTermClicked = (term: string) => {
  //   console.log(term);
  // };

  // const handleSearch = async (query: string) => {
  //   const cleanQuery = query.trim().toLowerCase();
  //   if (cleanQuery.length === 0) return;
  //   if (previousTerms.includes(cleanQuery)) return;
  //   setPreviousTerms([cleanQuery, ...previousTerms].slice(0, 8));
  //   const gifs = await getGifsByQuery(cleanQuery);
  //   setGifs(gifs);
  // };

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto"
      />

      {/* Search */}
      <SearchBar placeholder="Buscar Gif" onQuery={handleSearch} />

      {/* Previoues searches */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      {/* Gifs */}
      <GifList gifs={gifs} />
    </>
  );
};
