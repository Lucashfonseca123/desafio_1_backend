const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');

// const { uuid } = require("uuidv4");

/* Problema

Minha url: https://github.com/Lucashfonseca123

POST /repositories: A rota deve receber title, url e techs dentro do corpo da requisição,
 sendo a URL o link para o github desse repositório. Ao cadastrar um novo projeto, ele 
 deve ser armazenado dentro de um objeto no seguinte 
 formato: { id: "uuid", title: 'Desafio Node.js', url: 'http://github.com/...', 
 techs: ["Node.js", "..."], likes: 0 }; Certifique-se que o ID seja um UUID, 
 e de sempre iniciar os likes como 0.

GET /repositories: Rota que lista todos os repositórios;

PUT /repositories/:id: A rota deve alterar apenas o título, a url e as techs do repositório 
que possua o id igual ao id presente nos parâmetros da rota;

DELETE /repositories/:id: A rota deve deletar o repositório com o id presente nos parâmetros da rota;

POST /repositories/:id/like: A rota deve aumentar o número de likes do repositório 
específico escolhido através do id presente nos parâmetros da rota, a cada chamada 
dessa rota, o número de likes deve ser aumentado em 1;

*/

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const repo = request.query;
  console.log(repo);

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const objectRepositores = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(objectRepositores);
  return response.json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  const sameId = repositories.findIndex(repo => repo.id === id);

  if (sameId < 0) {
    return response.json({
      error: "Repositories not found"
    })
  }

  const repo = { id, title, url, techs, likes };
  repositories[sameId] = repo;

  return response.json(repo);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const sameId = repositories.findIndex(repo => repo.id === id);

  if (sameId < 0) {
    return res.status(400).json({
      error: "Repositories not found"
    })
  }

  repositories.splice(sameId, 1);
  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const sameId = repositories.findIndex(repo => repo.id === id);

  if (sameId < 0) {
    return response.json({
      error: "Repositories not found"
    })
  }

  let { title, url, techs, likes } = repositories[sameId];
  likes++;

  let repo = {
    id, title, url, techs, likes
  };

  repositories[sameId] = repo;

  console.log(repositories);
  return response.json(repositories);
});

module.exports = app;
