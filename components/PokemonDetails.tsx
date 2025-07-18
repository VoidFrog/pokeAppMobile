import pokemonTypeColors from "@/constants/PokemonTypeColors";
import { Pokemon } from "@/types/Pokemon";
import getPokemonColor from "@/utils/getPokemonColor";
import { StyleSheet, Text, View } from "react-native";
import { useFavorites } from "./FavoritesContext";
import PokemonImage from "./PokemonImage";

const PokemonDetails = (pokemon: Pokemon) => {
  const { favorites } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === pokemon.id);
  console.log("PokemonDetails", isFavorite, pokemon.id, pokemon.name);
  const pokemonColor = getPokemonColor(pokemon);

  return (
    <View style={[styles.container, { backgroundColor: pokemonColor }]}>
      <PokemonImage
        pokemonId={pokemon.id}
        pokemonImageUrl={pokemon.spriteUrl}
        isFavorite={isFavorite}
        pokemonColor={pokemonColor}
      />
      <View style={styles.pokemonBasicInfoContainer}>
        <View style={styles.pokemonNameContainer}>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.id}>
            #{pokemon.id.toString().padStart(3, "0")}
          </Text>
        </View>
        <View style={styles.pokemonTypeContainer}>
          {pokemon.types.map((type, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor:
                    pokemonTypeColors.pokemonTypeColors[type.name],
                  ...styles.pokemonType,
                }}
              >
                <Text style={styles.pokemonTypeName}>{type.name}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.pokemonHWContainer}>
        <Text style={styles.pokemonDetails}>
          Height: {pokemon.height / 10}m
        </Text>
        <Text style={styles.pokemonDetails}>
          Weight: {pokemon.weight / 10}kg
        </Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.name}>Stats:</Text>
        {pokemon.stats.map((stat, index) => (
          <Text key={index} style={styles.pokemonStats}>
            {stat.stat.name}: {stat.base_stat}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  name: {
    fontSize: 40,
    fontFamily: "VT323-Regular",
    color: "#ffffff",
  },
  id: {
    fontSize: 40,
    fontFamily: "VT323-Regular",
    color: "#ccc",
  },
  pokemonNameContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  pokemonTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonType: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 32,
    borderRadius: 16,
    marginTop: 16,
    borderColor: "#fff",
    borderWidth: 1,
  },
  pokemonTypeName: {
    fontSize: 16,
    fontFamily: "VT323-Regular",
    color: "#fff",
  },
  pokemonBasicInfoContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonDetails: {
    fontSize: 24,
    fontFamily: "VT323-Regular",
    color: "#ffffff",
    marginTop: 8,
    marginBottom: 8,
  },
  pokemonHWContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  statContainer: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingLeft: -16,
  },
  pokemonStats: {
    fontSize: 24,
    fontFamily: "VT323-Regular",
    color: "#ffffff",
    marginTop: 8,
    paddingLeft: 16,
  },
});

export default PokemonDetails;
