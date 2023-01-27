export interface PokemonType {
  id: number,
  name: string;
  sprites: {
    back_default: string;
    front_default: string;
  };
  stats: ItemStat[];
}

export interface ItemStat {
  base_stat: string;
  stat: {
    name: string;
  };
}
