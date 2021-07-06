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
      .get(PokemonControllers.getPokemonByNameWithTranslation);

    return this.app;
  }
}
