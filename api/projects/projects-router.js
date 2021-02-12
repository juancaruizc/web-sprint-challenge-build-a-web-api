// Write your "projects" router here!

const e = require('express');
const express = require('express');
const router = express.Router();
// const middleware = require('../middleware/middleware');
const Projects = require('./projects-model');

router.get('/', (req, res) => {
  Projects.get(req.query)
    .then((projects) => {
      res.status(200).json(projects || []);
    })
    .catch(() => {
      res.status(500).json({ message: 'error retrieving projects' });
    });
});

router.get('/:id', (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'Error project not found' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'error retrieving the project' });
    });
});

router.post('/', (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'Name and description required' });
      } else {
        res.status(201).json(project);
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error adding project' });
    });
});

router.put('/:id', (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((project) => {
      if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'Name and description required' });
      } else {
        res.status(201).json(project);
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error updating project' });
    });
});

router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json({ message: 'Project deleted' });
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error deleting project' });
    });
});

router.get('/:id/actions', (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: 'action not found' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error retrieving actions' });
    });
});
module.exports = router;
