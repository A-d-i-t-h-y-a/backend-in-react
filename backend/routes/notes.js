const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const multer = require('multer');

const upload = multer();
// ROUTE 1: Get all the notes using GET "api/notes/fetchallnotes". Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new note using POST "api/notes/addnote". Login Required
router.post('/addnote', fetchuser, upload.single('image'), [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Description must be at least 5 characters").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const image = {
            data: req.file.buffer, // Storing binary data
            contentType: req.file.mimetype // MIME type of the image
        };

        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id,
            image
        });

        await note.save();
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Update an existing note using PUT "api/notes/updatenote/". Login Required
router.put('/updatenote/:id', fetchuser, upload.single('image'), async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const image = req.file ? {
            data: req.file.buffer,
            contentType: req.file.mimetype
        } : undefined;

        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        if (image) { newNote.image = image }

        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 4: Delete note using DELETE "api/notes/deletenote". Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
