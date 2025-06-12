import { faker } from "@faker-js/faker";
import { Miles } from "../../src/protocols";


export function createMiles(): Miles & { id: number } {
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    code: faker.string.alphanumeric(6).toUpperCase(),
    miles: faker.number.int({ min: 500, max: 20000 })
  };
}