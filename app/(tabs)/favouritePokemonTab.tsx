import { useFavorites } from "@/components/FavoritesContext";
import PokemonList from "@/components/PokemonList";
import { StyleSheet, Text, View } from "react-native";

const FavouritePokemonTab = () => {
  const { favorites: favourites } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favourite Pokemon Tab</Text>
      <PokemonList
        pokemonToRender={favourites}
        loading={false}
        handleLoadMore={() => {
          console.log(":3r");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 32,
  },
  text: {
    marginTop: 16,
    fontSize: 32,
    fontFamily: "VT323-Regular",
  },
});

export default FavouritePokemonTab;
