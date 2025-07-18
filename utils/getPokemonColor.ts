import pokemonTypeColors from "@/constants/PokemonTypeColors";
import { Pokemon } from "@/types/Pokemon";

const getPokemonColor = (pokemon: Pokemon): string => {
  const typeColors = pokemon.types.map(
    (type) => pokemonTypeColors.pokemonTypeColors[type.name]
  );
  const colorsInHex = typeColors.map((color) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return [r, g, b];
  });
  const avgColor = colorsInHex.reduce(
    (acc, color) => {
      return [
        Math.floor((acc[0] + color[0]) / typeColors.length),
        Math.floor((acc[1] + color[1]) / typeColors.length),
        Math.floor((acc[2] + color[2]) / typeColors.length),
      ];
    },
    [0, 0, 0]
  );
  return `rgb(${avgColor[0]}, ${avgColor[1]}, ${avgColor[2]})`;
};

export default getPokemonColor;
