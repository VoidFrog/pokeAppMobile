import PokemonImage from "@/components/PokemonImage";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [fontsLoaded] = useFonts({
    "VT323-Regular": require("../assets/fonts/VT323-Regular.ttf"),
  });
  const [randomPokemonId, setRandomPokemonId] = useState(
    Math.round(Math.random() * 200) + 1
  );

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textLarge}>Welcome to the Pokémon App!</Text>
      <Pressable onPress={() => router.push("/pokemonListTab")}>
        <PokemonImage pokemonId={randomPokemonId} />
      </Pressable>
      <Text>Tap the pokemon above to view the Pokemon List!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    fontFamily: "VT323-Regular",
    padding: 20,
  },
  textLarge: {
    fontSize: 32,
    fontFamily: "VT323-Regular",
    textAlign: "center",
    marginVertical: 10,
  },
});
