import debug from "debug";
import express from "express";
import * as expressWinston from "express-winston";
import * as http from "http";
import * as winston from "winston";
import { BaseRoutesConfig } from "./common/base.routes.config";
import { PokemonsRoutes } from "./pokemons/pokemons.routes.config";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 5000;
const routes: Array<BaseRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

app.use(express.json());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new PokemonsRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

server.listen(port, () => {
  routes.forEach((route: BaseRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });

  console.log(runningMessage);
});

export { app };
