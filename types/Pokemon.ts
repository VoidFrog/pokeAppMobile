import { PokemonStat } from "./PokemonStat"
import { PokemonType } from "./PokemonType"

type Pokemon = {
    id: number,
    name: string, 
    height: number,
    weight: number, 
    stats: PokemonStat[],
    types: PokemonType[],
    spriteUrl: string,
    isFavorite: boolean, 
}

export { Pokemon }
