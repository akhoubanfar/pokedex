import debug from "debug";
import express from "express";
import PokemonsService from "../services/pokemons.service";

const log: debug.IDebugger = debug("app:pokemons-controller");
class PokemonsController {
  async getPokemonByName(req: express.Request, res: express.Response) {
    const pokemon = await PokemonsService.getByName(req.params.pokemonName);
    if (!pokemon) {
      res.status(404).send({ error: `${req.params.pokemonName} not found` });
    }
    res.status(200).send(pokemon);
  }

  async getPokemonByNameWithTranslation(
    req: express.Request,
    res: express.Response
  ) {
    const pokemon = await PokemonsService.getByNameWithTranslation(
      req.params.pokemonName
    );
    if (!pokemon) {
      res
        .status(404)
        .send({ error: `translatio for ${req.params.pokemonName} not found` });
    }
    res.status(200).send(pokemon);
  }
}

export default new PokemonsController();
