const actionModel = require('../data/helpers/actionModel');
const projectModel = require('../data/helpers/projectModel');

function validateProject(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "You are missing a name or description." });
    } else {
        next();
    }
};

function validateProjectID(req, res, next) {
    const id = req.params.id;
    
    projectModel.get(id)
        .then(project => {
            if(project) {
                req.project = project;
                next();
            } else {
                res.status(404).json({ error: `Project ${id} was not found.` });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Cannot retrieve project." });
        });
};

function validateAction(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "You are missing a required field." });
    } else {
        next();
    }
};

function validateActionID(req, res, next) {
    const id = req.params.id;

    actionModel.get(id)
        .then(action => {
            if(action) {
                req.action = action;
                next();
            } else {
                res.status(404).json({ error: `Action ${id} was not found.` });
            }
        })
        .catch(err => {
            res.status(500).json({error: "Cannot retrieve action."});
        });
};

module.exports = { validateAction, validateActionID, validateProject, validateProjectID}