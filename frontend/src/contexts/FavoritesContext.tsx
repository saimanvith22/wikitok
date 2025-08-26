import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type FavArticle = {
  id: string | number;       // pageid or fallback to title
  title: string;
  url: string;               // canonical wiki url
  extract?: string;          // short summary/description
  thumbnail?: string;        // optional image
  lang?: string;
};

type FavMap = Record<string, FavArticle>;

type Ctx = {
  favorites: FavArticle[];
  isFavorite: (id: string | number) => boolean;
  add: (a: FavArticle) => void;
  remove: (id: string | number) => void;
  toggle: (a: FavArticle) => void;
  clear: () => void;
};

const FavoritesContext = createContext<Ctx | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [map, setMap] = useLocalStorage<FavMap>("favorites:v1", {});
  const favorites = useMemo(() => Object.values(map), [map]);

  const add = useCallback((a: FavArticle) => {
    const key = String(a.id);
    setMap(prev => ({ ...prev, [key]: a }));
  }, [setMap]);

  const remove = useCallback((id: string | number) => {
    const key = String(id);
    setMap(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, [setMap]);

  const isFavorite = useCallback((id: string | number) => Boolean(map[String(id)]), [map]);

  const toggle = useCallback((a: FavArticle) => {
    const key = String(a.id);
    setMap(prev => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = a;
      return next;
    });
  }, [setMap]);

  const clear = useCallback(() => setMap({}), [setMap]);

  const value: Ctx = { favorites, isFavorite, add, remove, toggle, clear };
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return ctx;
};
