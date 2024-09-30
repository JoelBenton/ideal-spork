import { readFileSync } from "fs";
import Handlebars from "handlebars";

const V = (n) => {
  return Handlebars.compile(
    readFileSync(`./src/views/${n}.handlebars`, "utf8")
  );
};

const client = {
  hello: () => {
    return V("hello")();
  },
  item: (item) => {
    return V("item")({ item });
  },
  items: (items) => {
    return V("items")({ items });
  },
  createItem: () => {
    return V("createItem")();
  },
};

export default client;
