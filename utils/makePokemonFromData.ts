import { Pokemon } from "@/types/Pokemon";
import { PokemonStat } from "@/types/PokemonStat";
import { PokemonType } from "@/types/PokemonType";
import { PokemonTypeName } from "@/types/PokemonTypeName";

export const makePokemonFromData = (data: any): Pokemon => {
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    stats: makePokemonStatsFromData(data.stats),
    types: makePokemonTypeFromData(data.types),
    spriteUrl: data.sprites.front_default,
    isFavorite: false,
  };
};

const makePokemonStatsFromData = (stats: any[]): PokemonStat[] => {
  return stats.map((stat) => ({
    base_stat: stat.base_stat,
    effort: stat.effort,
    stat: {
      name: stat.stat.name,
      url: stat.stat.url,
    },
  }));
};

const makePokemonTypeFromData = (types: any[]): PokemonType[] => {
  return types.map((type) => ({
    name: type.type.name as PokemonTypeName,
    url: type.type.url,
  }));
};
