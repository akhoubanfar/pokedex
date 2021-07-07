import request from "supertest";
import { app } from "../../app";

it("returns a 404 if the pokemon is not found", async () => {
  const name = "mewtwo1";
  await request(app).get(`/pokemons/${name}`).send().expect(404);
});

it("returns the pokemon if the pokemon is found", async () => {
  const name = "mewtwo";

  const response = await request(app)
    .get(`/pokemons/${name}`)
    .send()
    .expect(200);

  expect(response.body.name).toEqual(name);
});

it("returns the yoda translation if the pokemon is found and its legendary", async () => {
  const name = "mewtwo";

  const response = await request(app)
    .get(`/pokemons/translated/${name}`)
    .send()
    .expect(200);

  expect(response.body.description).toContain("yoda");
  expect(response.body.legendary).toEqual(true);
});

it("returns the shakespeare translation if the pokemon is found and its not legendary", async () => {
  const name = "charmander";

  const response = await request(app)
    .get(`/pokemons/translated/${name}`)
    .send()
    .expect(200);

  expect(response.body.description).toContain("shakespeare");
  expect(response.body.legendary).toEqual(false);
});
