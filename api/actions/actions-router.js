// Write your "actions" router here!

const express = require('express');
const router = express.Router();
// const middleware = require('../middleware/middleware');
const Actions = require('./actions-model');

router.get('/', (req, res) => {
  Actions.get(req.query)
    .then((actions) => {
      res.status(200).json(actions || []);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error retrieving actions' });
    });
});

router.get('/:id', (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'Error action not found' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error getting action' });
    });
});

router.post('/', (req, res) => {
  Actions.insert(req.body, req.params)
    .then((action) => {
      if (!req.body.description || !req.body.notes) {
        res
          .status(400)
          .json({ message: 'Project id, description and notes required' });
      } else {
        res.status(201).json(action);
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error adding action' });
    });
});

router.put('/:id', (req, res) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      if (!req.body.description || !req.body.notes) {
        res.status(400).json({ message: 'Description and notes required' });
      } else {
        res.status(201).json(action);
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error updating action' });
    });
});

router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
    .then((actions) => {
      if (actions) {
        res.status(200).json({ message: 'Action deleted' });
      } else {
        res.status(404).json({ message: 'action not found' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error deleting action' });
    });
});

module.exports = router;
