import axios from "axios";
import { Pokemon } from "../../common/interfaces/pokemon.interface";
import { PokemonDto } from "../models/pokemon.dto";

class PokemonsService implements Pokemon {
  async getByName(pokemonName: string) {
    try {
      const baseURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
      const response = await axios.get(baseURL);

      const { name, flavor_text_entries, habitat, is_legendary } =
        response!.data;

      const pokemonDto: PokemonDto = {
        name: name,
        description: flavor_text_entries.find(
          (des: any) => des.language.name === "en"
        ).flavor_text,
        habitat: habitat.name,
        legendary: is_legendary,
      };

      return pokemonDto;
    } catch (err) {
      return;
    }
  }

  async getByNameWithTranslation(pokemonName: string) {
    try {
      const pokemonDto = await this.getByName(pokemonName);
      const baseURL = "https://api.funtranslations.com/translate";

      var translation: any;

      if (
        pokemonDto!.legendary ||
        pokemonDto!.habitat?.toLowerCase() === "cave"
      ) {
        translation = await axios.post(`${baseURL}/yoda`, {
          text: pokemonDto!.description,
        });
      } else {
        translation = await axios.post(`${baseURL}/shakespeare`, {
          text: pokemonDto!.description,
        });
      }

      pokemonDto!.description =
        translation.data.contents.translation +
        "::" +
        translation.data.contents.translated;

      return pokemonDto;
    } catch (err) {
      return;
    }
  }
}

export default new PokemonsService();
