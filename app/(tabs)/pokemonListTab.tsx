import PokemonList from "@/components/PokemonList";
import { Pokemon } from "@/types/Pokemon";
import { makePokemonFromData } from "@/utils/makePokemonFromData";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const PokemonListTab = () => {
  const [fetchedPokemon, setFetchedPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextPokemonUrl, setNextPokemonUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=10"
  );

  const fetchPokemon = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(nextPokemonUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const pokemonIds = data.results.map((basicPokemonData: any) => {
        return (
          basicPokemonData.url ||
          `https://pokeapi.co/api/v2/pokemon/${basicPokemonData.name}`
        );
      });

      const pokemonDetails: Pokemon[] = [];
      for (const url of pokemonIds) {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch pokemon data from ${url}`);
        }
        const pokemonData = await response.json();
        pokemonDetails.push(pokemonData);
      }

      setFetchedPokemon((prev) => [
        ...prev,
        ...pokemonDetails.map((pokemon: any) => makePokemonFromData(pokemon)),
      ]);
      setNextPokemonUrl(data.next);
    } catch (error) {
      console.error("Failed to fetch pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (nextPokemonUrl) fetchPokemon();
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <View style={styles.container}>
      <PokemonList
        pokemonToRender={fetchedPokemon}
        loading={loading}
        handleLoadMore={handleLoadMore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 48,
  },
});

export default PokemonListTab;
