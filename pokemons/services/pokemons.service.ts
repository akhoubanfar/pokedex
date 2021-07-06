import axios from "axios";
import { Pokemon } from "../../common/interfaces/pokemon.interface";
import { PokemonDto } from "../models/pokemon.dto";

class PokemonsService implements Pokemon {
  async getByName(pokemonName: string) {
    const baseURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
    const response = await axios.get(baseURL);
    const { name, flavor_text_entries, habitat, is_legendary } = response.data;

    const pokemonDto: PokemonDto = {
      name: name,
      description: flavor_text_entries.find(
        (des: any) => des.language.name === "en"
      ).flavor_text,
      habitat: habitat.name,
      legendary: is_legendary,
    };

    return pokemonDto;
  }

  async getByNameWithTranslation(id: string) {
    return {};
  }
}

export default new PokemonsService();
