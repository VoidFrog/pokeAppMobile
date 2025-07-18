import { Stat } from "./Stat";

type PokemonStat = {
  stat: Stat;
  effort: number; //EV points
  base_stat: number;
};

export { PokemonStat };
