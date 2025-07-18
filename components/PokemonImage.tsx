import { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PokemonImage(props: {
  pokemonId?: number | string;
  pokemonImageUrl?: string;
  isFavorite?: boolean;
  pokemonColor?: string;
}) {
  const { pokemonId, pokemonImageUrl, pokemonColor, isFavorite } = props;
  const [pokemonImage, setPokemonImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pokemonImageUrl) {
      setPokemonImage(pokemonImageUrl);
      setLoading(false);
      return;
    }

    if (!pokemonId) {
      setError("Please provide a pokemonId or pokemonName");
      return;
    }

    const fetchPokemonImage = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPokemonImage(data.sprites.front_default);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonImage();
  }, [pokemonId, pokemonImageUrl]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isFavorite && pokemonColor ? pokemonColor : "#fff" },
      ]}
    >
      {loading && !error && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      {pokemonImage && (
        <Image
          source={{ uri: pokemonImage } as ImageSourcePropType}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      {!loading && !error && !pokemonImage && (
        <Text>No Pokemon image available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 128,
    width: 128,
    borderRadius: 50,
  },

  image: {
    width: 128,
    height: 128,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ccc",
  },
});
