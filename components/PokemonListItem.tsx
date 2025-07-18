import PokemonImage from "@/components/PokemonImage";
import pokemonTypeColors from "@/constants/PokemonTypeColors";
import { Pokemon } from "@/types/Pokemon";
import getPokemonColor from "@/utils/getPokemonColor";
import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { RefObject, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFavorites } from "./FavoritesContext";
import PokemonDetails from "./PokemonDetails";

const PokemonListItem = (pokemon: Pokemon) => {
  const {
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
    favorites: favorites,
  } = useFavorites();
  const [isFavorite, setFavoriteFunction] = useState<boolean>(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { dismissAll: dismissAllModals } = useBottomSheetModal();

  useEffect(() => {
    setFavoriteFunction(favorites.map((p) => p.id).includes(pokemon.id));
  }, [favorites]);

  return (
    <View style={styles.pokemonItem}>
      <TouchableOpacity
        onLongPress={() =>
          handleFavorites(
            pokemon,
            isFavorite,
            setFavoriteFunction,
            removeFavorite,
            addFavorite
          )
        }
        style={styles.pokemonImageContainer}
        onPress={() =>
          handlePresentModalPress(
            pokemon,
            bottomSheetModalRef,
            dismissAllModals
          )
        }
        activeOpacity={0.7}
      >
        <PokemonImage
          pokemonId={pokemon.id}
          pokemonImageUrl={pokemon.spriteUrl}
          isFavorite={isFavorite}
          pokemonColor={getPokemonColor(pokemon)}
        />
      </TouchableOpacity>
      <View style={styles.pokemonInfo}>
        <Text style={styles.pokemonIdText}>
          #{pokemon.id.toString().padStart(3, "0")}
        </Text>
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
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
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={["50%", "75%"]}
        enablePanDownToClose={true}
      >
        <BottomSheetView>
          <PokemonDetails {...pokemon} />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const handlePresentModalPress = (
  pokemon: Pokemon,
  bottomSheetRef: RefObject<BottomSheetModal | null>,
  dismissAllModals: Function
) => {
  console.log(`Opening bottom sheet for ${pokemon.name}`);
  dismissAllModals();
  bottomSheetRef.current?.present();
};

const handleFavorites = (
  pokemon: Pokemon,
  isFavorite: boolean,
  setFavorite: Function,
  removeFavorite: Function,
  addFavorite: Function
) => {
  if (isFavorite) {
    setFavorite(false);
    removeFavorite(pokemon.id);
    console.log(`Removed ${pokemon.name} from favorites`);
  } else {
    setFavorite(true);
    addFavorite(pokemon);
    console.log(`Added ${pokemon.name} to favorites`);
  }
};

const styles = StyleSheet.create({
  pokemonItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#8c8c8c",
    paddingVertical: 8,
  },
  pokemonName: {
    fontSize: 32,
    fontFamily: "VT323-Regular",
  },
  pokemonIdText: {
    fontSize: 32,
    fontFamily: "VT323-Regular",
    color: "#8c8c8c",
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
    marginRight: 8,
    marginTop: 8,
  },
  pokemonTypeName: {
    fontSize: 16,
    fontFamily: "VT323-Regular",
    color: "#fff",
  },
  pokemonInfo: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingVertical: 0,
  },
  pokemonImageContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default PokemonListItem;
