import { ALL_TYPES } from "../../types";
import { faker } from "@faker-js/faker";

export const jsonValidator = (value: string) => {
  JSON.parse(value);
};

export const getFakerValue = (value: ALL_TYPES) => {
  if (value === "number") {
    return faker.number.int();
  }

  if (value === "string") {
    return faker.string.alphanumeric(20);
  }

  if (value === "boolean") {
    return Math.random() < 0.5;
  }

  if (value === "date") {
    return faker.date.anytime();
  }
};
