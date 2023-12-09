const apiRouter = require('express').Router();
const path = require('path');
const fs = require('fs');
let uuid = require('uuid');



apiRouter.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});


apiRouter.post('/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);


    let userNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid(),
    };


    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);
});


apiRouter.delete('/notes/:id', (req, res) => {

  let db = JSON.parse(fs.readFileSync('db/db.json'))

  let deleteNotes = db.filter(item => item.id !== req.params.id);

  fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
  res.json(deleteNotes);
})

module.exports = apiRouter;