const Action = require('../actions/actions-model');
const Project = require('../projects/projects-model');

const validateActionId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await Action.get(id);
    if (!action) {
      res.status(404).json({ message: 'action not found' });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateProjectId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.get(id);
    if (!project) {
      res.status(404).json({ message: 'project not found' });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
};

function validateAction(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing action data' });
  } else if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({ message: 'missing required field' });
  } else {
    next();
  }
}

function validateProject(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing project data' });
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'missing required field' });
  } else {
    next();
  }
}

module.exports = {
  validateActionId,
  validateAction,
  validateProjectId,
  validateProject,
};
