// Write your "actions" router here!
const express = require('express');

const router = express.Router();

const Action = require('./actions-model');

router.get('/', (req, res) => {
  Action.get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Error fetching the actions ${err.message}` });
    });
});
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Action.get(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Error getting the action ${err.message}` });
    });
});
router.post('/', (req, res) => {
  const action = req.body;

  Action.insert(action)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      res.status(500).json({ message: `Error adding action ${err.message}` });
    });
});
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Action.update(id, changes)
    .then((updatedAction) => {
      res.status(200).json(updatedAction);
    })
    .catch((err) => {
      res.status(500).json({ message: `Error updating action ${err.message}` });
    });
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Action.remove(id)
    .then((deletedAction) => {
      res.status(200).json(deletedAction);
    })
    .catch((err) => {
      res.status(500).json({ message: `Error deleting action ${err.message}` });
    });
});

module.exports = router;
