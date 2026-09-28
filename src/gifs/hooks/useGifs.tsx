import { useRef, useState } from 'react';
import { getGifsByQuery } from '../actions/get-gifs-by-query.actions';
import type { Gif } from '../interfaces/gif.interface';

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };

  const handleSearch = async (query: string) => {
    const cleanQuery = query.trim().toLowerCase();
    if (cleanQuery.length === 0) return;
    if (previousTerms.includes(cleanQuery)) return;
    setPreviousTerms([cleanQuery, ...previousTerms].slice(0, 8));
    const gifs = await getGifsByQuery(cleanQuery);
    setGifs(gifs);
    gifsCache.current[query] = gifs;
    console.log(gifsCache);
  };

  return { gifs, previousTerms, handleTermClicked, handleSearch };
};
