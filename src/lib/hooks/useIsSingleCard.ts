'use client';

import { useEffect, useState } from 'react';

const DESKTOP_CAROUSEL_QUERY = '(max-width: 1279px)';

export function useIsSingleCard(): boolean {
  const [singleCard, setSingleCard] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_CAROUSEL_QUERY);
    const update = () => setSingleCard(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return singleCard;
}
