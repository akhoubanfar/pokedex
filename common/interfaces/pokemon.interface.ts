export interface Pokemon {
  getByName: (pokemonName: string) => Promise<any>;
  getByNameWithTranslation: (pokemonName: string) => Promise<any>;
}
