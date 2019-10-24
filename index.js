const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

//Middlewares
function checkIdExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(project => project.id === id);
  if (!project) {
    return res.status(400).json({ error: "ID does not exists" });
  }
  return next();
}

function countRequisitions(req, res, next) {
  console.count("Requisições");
  return next();
}

//GET
server.get("/projects", countRequisitions, (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", countRequisitions, checkIdExists, (req, res) => {
  const { id } = req.params;
  const project = projects.find(project => project.id === id);

  return res.json(project);
});

//POST
server.post("/projects", countRequisitions, (req, res) => {
  const { id, tittle, tasks } = req.body;
  projects.push({ id, tittle, tasks });

  return res.json(projects);
});

server.post(
  "/projects/:id/tasks",
  countRequisitions,
  checkIdExists,
  (req, res) => {
    const { id } = req.params;
    const { tasks } = req.body;
    const project = projects.find(project => project.id === id);
    project.tasks.push(tasks);
    return res.json(project);
  }
);

//PUT
server.put("/projects/:id", countRequisitions, checkIdExists, (req, res) => {
  const { id } = req.params;
  const { tittle } = req.body;
  const project = projects.find(project => project.id === id);
  project.tittle = tittle;

  return res.json(project);
});

//DELETE
server.delete("/projects/:id", countRequisitions, checkIdExists, (req, res) => {
  const { id } = req.params;
  const project = projects.findIndex(project => project.id === id);
  projects.splice(project, 1);
  return res.send();
});

server.listen(3000);
