import { useState } from 'react';
import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { mockGifs } from './mock-data/gifs.mock';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(['dragon ball z', 'Gokú']);

  const handleTermClicked = (term: string) => {
    console.log(term);
  };

  const handleSearch = (query: string) => {
    const cleanQuery = query.trim().toLowerCase();
    if (cleanQuery.length === 0) return;
    if (previousTerms.includes(cleanQuery)) return;
    setPreviousTerms([cleanQuery, ...previousTerms].slice(0, 8));
  };

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
      <GifList gifs={mockGifs} />
    </>
  );
};
