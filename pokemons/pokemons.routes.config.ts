import express from "express";
import { BaseRoutesConfig } from "../common/base.routes.config";
import PokemonControllers from "./controllers/pokemons.controllers";

export class PokemonsRoutes extends BaseRoutesConfig {
  constructor(app: express.Application) {
    super(app, "PokemonsRoutes");
  }

  configureRoutes() {
    this.app
      .route("/pokemons/:pokemonName")
      .get(PokemonControllers.getPokemonByName);

    this.app
      .route(`/pokemons/translated/:pokemonName`)

      .get((req: express.Request, res: express.Response) => {
        res
          .status(200)
          .send(`GET request with translation for ${req.params.pokemonName}`);
      });

    return this.app;
  }
}
