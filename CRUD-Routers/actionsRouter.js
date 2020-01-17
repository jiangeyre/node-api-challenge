const express = require('express');
const router = express.Router();
const db = require('../data/helpers/actionModel');
const mw = require('../middleware/middleware');

router.get('/', (req, res) => {
    db
        .get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({ error: 'We could not retrieve the actions.' });
        });
});

router.get('/:id', mw.validateActionID, (req, res) => {
    res.status(200).json(req.action);
});

router.post('/', mw.validateAction, mw.validateProjectID, (req, res) => {
    db
        .insert(req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => res.status(500).json('Could not get the actions.'))
});

router.put('/:id', mw.validateActionID, mw.validateAction, (req, res) => {
    db
        .update(req.params.id, req.body)
        .then(action => {
            res.status(200).json({ message: `Action ${id} has been updated successfully.` });
        })
        .catch(err => res.status(500).json('Could not update action.'))
});

router.delete('/:id', mw.validateActionID, (req, res) => {
    db
        .remove(req.params.id)
        .then(action => {
            res.status(202).json({ message: `Action ${id} has been removed successfully.` });
        })
        .catch(err => res.status(500).json({ error: 'Could not delete action.' }))
});

module.exports = router;