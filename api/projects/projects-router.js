// Write your "projects" router here!
const express = require('express');

const router = express.Router();

const Project = require('./projects-model');

const {
  validateProjectId,
  validateProject,
} = require('../middleware/middleware');

// GET all projects
router.get('/', (req, res, next) => {
  Project.get()
    .then((projects) => res.status(200).json(projects))
    .catch(next);
});

// GET an individual project
router.get('/:id', validateProjectId, (req, res, next) => {
  const { id } = req.params;
  Project.get(id)
    .then((project) => res.status(200).json(project))
    .catch(next);
});

// POST a project
router.post('/', validateProject, (req, res, next) => {
  const project = req.body;
  Project.insert(project)
    .then((newProject) => res.status(201).json(newProject))
    .catch(next);
});

// PUT (update) a project
router.put('/:id', validateProject, (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  Project.update(id, changes)
    .then((updatedProject) => res.status(200).json(updatedProject))
    .catch(next);
});

// DELETE a project
router.delete('/:id', validateProjectId, (req, res, next) => {
  const { id } = req.params;
  Project.remove(id)
    .then((deletedProject) => res.status(200).json(deletedProject))
    .catch(next);
});

// GET a projects actions
router.get('/:id/actions', (req, res, next) => {
  const { id } = req.params;
  Project.getProjectActions(id)
    .then((id) => res.status(200).json(id))
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: 'something went terrible in the projects router',
  });
});

module.exports = router;
