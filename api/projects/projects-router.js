// Write your "projects" router here!
const express = require('express');

const router = express.Router();

const Project = require('./projects-model');

router.get('/', (req, res) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Error getting projects ${err.message}` });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Project.get(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Error getting projects ${err.message}` });
    });
});

router.post('/', (req, res) => {
  const project = req.body;
  Project.insert(project)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch((err) => {
      res.status(500).json({ message: `Error adding projects ${err.message}` });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Project.update(id, changes)
    .then((updatedProject) => {
      res.status(200).json(updatedProject);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Error updating projects ${err.message}` });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Project.remove(id)
    .then((deletedProject) => {
      res.status(200).json(deletedProject);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Error deleting projects ${err.message}` });
    });
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params;
  Project.getProjectActions(id)
    .then((id) => {
      res.status(200).json(id);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Error getting projects actions ${err.message}` });
    });
});

module.exports = router;
