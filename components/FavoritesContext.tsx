import { Pokemon } from "@/types/Pokemon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "favoritePokemon";

const FavoritesContext = createContext({
  favorites: [] as Pokemon[],
  addFavorite: (pokemon: Pokemon) => {},
  removeFavorite: (pokemonId: number) => {},
});

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setFavorites(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemon: Pokemon) => {
    setFavorites((prev) =>
      prev.map((p) => p.id).includes(pokemon.id) ? prev : [...prev, pokemon]
    );
  };

  const removeFavorite = (pokemonId: number) => {
    setFavorites((prev) => prev.filter((pokemon) => pokemon.id !== pokemonId));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: favorites,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
