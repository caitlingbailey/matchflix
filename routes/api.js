const express = require('express');
const router = express.Router();
const Match = require('../models/matchflix');

router.get('/matches', (req, res, next) => {
  // get placeholder
  Match.find({}, 'action')
  .then((data) => res.json(data))
  .catch(next);
});

router.post("/addgenres", (req, res) => {
  let myGenres = new Match(req.body);
  console.log(req.body);
  myGenres.save()
    .then(item => {
      res.send("genres saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

router.post('/matches', (req, res, next) => {
  // post placeholder
  if (req.body.action) {
      Match.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
      res.json({
          error: 'The input is empty',
      })
  }
});

router.delete('/matches/:id', (req, res, next) => {
  // delete placeholder
  Match.findOneAndDelete({ _id: req.params.id})
  .then((data) => res.json(data))
  .catch(next);
});

// router.post('/submit-genres', (req, res, next) => {
  
// });

// router.post('/final-genres', (req, rest, next) => {

// });

module.exports = router;