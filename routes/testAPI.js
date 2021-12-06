var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("API is working properly");
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

  router.get('/matches', (req, res, next) => {
    // post placeholder
    if (req.body.action) {
      console.log(`Matches Endpoint in TestAPI`);
        Match.create(req.body)
        .then((data) => res.json(data))
        .catch(next);
    } else {
        res.json({
            error: 'The input is empty',
        })
    }
  });

module.exports = router;