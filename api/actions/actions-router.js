// Write your "actions" router here!
const express = require('express');

const router = express.Router();

const Action = require('./actions-model');

const {
  validateActionId,
  validateAction,
} = require('../middleware/middleware');

// GET all actions
router.get('/', (req, res, next) => {
  Action.get()
    .then((action) => res.status(200).json(action))
    .catch(next);
});

// GET individual action
router.get('/:id', validateActionId, (req, res, next) => {
  const { id } = req.params;
  Action.get(id)
    .then((action) => res.status(200).json(action))
    .catch(next);
});

// POST an action
router.post('/', validateAction, (req, res, next) => {
  const action = req.body;

  Action.insert(action)
    .then((action) => res.status(201).json(action))
    .catch(next);
});

// PUT (update) an action
router.put('/:id', validateAction, (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  Action.update(id, changes)
    .then((updatedAction) => res.status(200).json(updatedAction))
    .catch(next);
});

// DELETE an action
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Action.remove(id)
    .then((deletedAction) => res.status(200).json(deletedAction))
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: 'something went terrible in the actions router',
  });
});

module.exports = router;
