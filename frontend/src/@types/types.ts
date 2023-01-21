export interface Pokemon {
  id: number;
  entry_number: number;
  name: string;
  types: { slot: number; type: { name: string; url: string } }[];
  sprites: {
    back: string;
    front: string;
    back_shiny: string;
    front_shiny: string;
  };
  description: string;
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];
  favourite: boolean;
}
