const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Note = require('./models/notes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://herlandy06:6bdHMTcIyMhol4aR@cluster0.wb3hdo5.mongodb.net/notesdb').then(function () {
    app.get('/', function (req, res) {
        res.json({
            message: "API is Working !"
        });
    });

    const noteRouter = require('./routes/routes');
    app.use('/notes', noteRouter);
});

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log("Server running in PORT: " + PORT);
});