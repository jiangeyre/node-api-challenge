const router = require('express').Router();
const db = require('../data/helpers/projectModel');
const mw = require('../middleware/middleware');

router.get('/', (req, res) => {
    db
        .get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not retrieve projects.' })
        })
});

router.get('/:id', mw.validateProjectID, (req, res) => {
    res.status(200).json(req.project)
});

router.post('/', (req, res) => {
    db
        .insert(req.body)
        .then(newProj => {
            res.send(201).json(newProj)
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not add at this time.' })
        })
});

router.put('/:id', mw.validateProject, (req, res) => {
    db
        .update(req.params.id, req.body)
        .then(update => {
            if(update) {
                res.status(200).json(update)
            } else {
                res.status(404).json({ message: "The project could not be updated at this time." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not be updated.' })
        })
});

router.delete('/:id', mw.validateProjectID, (req, res) => {
    db
        .remove(req.params.id)
        .then(del => {
            if(del) {
                res.status(200).json({ message: 'Successfully deleted project.' })
            } else {
                res.status(404).json({ message: 'Please use an existing ID.' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not be deleted at this time.' })
        })
});

module.exports = router;