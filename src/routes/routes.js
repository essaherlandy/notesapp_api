const express = require('express');
const router = express.Router();
const Note = require('../models/notes');

router.get('/list/:userid',async function (req, res) {
    var notes = await Note.find({userid: req.params.userid});
   res.json(notes); 
});

router.post('/add', async function (req, res) {
   const newNote = new Note({
        id: req.body.id,
        userid: req.body.userid,
        title: req.body.title,
        content: req.body.content
   }); 
   await newNote.save();
   const response = {
    message: `New note created with id : ${req.body.id}`
   }

    res.json(response);
});

router.put('/update', async function (req, res) {
    var updateNote = await Note.findOneAndUpdate(
        {id: req.body.id},
        {
            title: req.body.title,
            content: req.body.content
        },
        {new:true}
    );
    const response = {
        message: ` Note has been update with id: ${req.body.id}`,
        note: updateNote
    }

    res.json(response);
});

router.delete('/delete', async function (req, res) {
    var deleteNote = await Note.deleteOne({id:req.body.id});

    var response = {
        message: `Note has been deleted with id: ${req.body.id}`,
        note:deleteNote
    }

    res.json(response);
});

module.exports = router;