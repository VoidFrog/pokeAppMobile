import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Pokemon } from "../types/Pokemon";
import PokemonListItem from "./PokemonListItem";

const PokemonList = (props: {
  pokemonToRender: Pokemon[];
  loading: boolean;
  handleLoadMore: Function;
}) => {
  const { pokemonToRender, loading, handleLoadMore } = props;

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={pokemonToRender}
        renderItem={({ item }) => <PokemonListItem {...item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => handleLoadMore()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="large" color="#4451a1" /> : null
        }
        contentContainerStyle={{ paddingHorizontal: 8 }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: 1,
    width: "100%",
  },
});

export default PokemonList;
