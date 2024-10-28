import express from "express";
import client from "./client.js";
import bodyParser from "body-parser";

const app = express();

let chirps = [{
  id: 0,
  author_name: "Author1",
  content: "Content1",
  created_at: "2024-10-07T09:49:01.988Z",
},
{
  id: 1,
  author_name: "Author1",
  content: "Content2",
  created_at: "2024-10-07T09:49:01.988Z",
},
{
  id: 2,
  author_name: "Author2",
  content: "Content3",
  created_at: "2024-10-07T09:49:01.988Z",
}];

// Use bodyParser to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

const handleMainPage = (request, response) => {
  return response.send(client.hello());
};

const handleListChirps = (request, response) => {
  return response.send(client.chirps_list(chirps));
}

const handleCreateChirp = (request, response) => {
  return response.send(client.CreateChrip());
};

let idCounter = 100;

const handleSubmitChirp = (request, response) => {
  let {author_name, content} = request.body;

  const created_at = new Date()

  const chirp = {id: String(idCounter++), author_name, content, created_at }

  chirps.push(chirp)

  console.log(chirps)

  return response.status(200).send(client.chirps_list(chirps));
};

const handleChirpPage = (request, response) => {
  const chirp = chirps.find((entry) => String(entry.id) === String(request.params.id));

  if (!chirp) {
    return response.status(400).send('Chirp not found');
  }
  return response.send(client.ViewChirp(chirp));
};

const handleDeleteChirp = (request, response) => {
  const chirpIndex = chirps.findIndex((entry) => String(entry.id) === String(request.params.id));
  if (chirpIndex === -1) {
    return response.status(400).send('chirp not found');
  }
  chirps.splice(chirpIndex, 1);
  return response.status(200).send('chirp deleted');
};

const handleAuthorNameSearch = (request, response) => {

  const author_name = String(request.params.author_name);
  const authorChirps = [];

  for (let i = 0; i < chirps.length; i++) {
    if (String(chirps[i].author_name) === author_name) {
      authorChirps.push(chirps[i]);
    }
  }

  return response.status(200).send(client.ChirpsAuthorList(authorChirps, author_name));
}

const handleAuthorDelete = (request, response) => {
  const author_name = String(request.params.author_name);

  chirps = chirps.filter(chirp => !(chirp.author_name = author_name));

  return response.status(200).send('chirps deleted')
}

app.get('/', handleMainPage);
app.post('/chirps', handleSubmitChirp)
app.get('/chirps', handleListChirps);
app.get('/chirps/create', handleCreateChirp);
app.get('/chirp/:id', handleChirpPage);
app.get('/author/:author_name', handleAuthorNameSearch)
app.delete('/chirp/:id', handleDeleteChirp);
app.delete('/author/:author_name', handleAuthorDelete);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});