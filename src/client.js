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
  chirps_list: ( chirps ) => {
    return V("chirps_list")({ chirps });
  },
  CreateChrip: () => {
    return V("createChirp")();
  },
  ViewChirp: (chirp) => {
    return V("chirp")({ chirp })
  },
  ChirpsAuthorList: (chirpsList, author_name) => {
    return V('chripAuthorList')({ chirpsList, author_name })
  }

};

export default client;
