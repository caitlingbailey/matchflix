const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/api");
require("dotenv").config();
const util = require("util");
const TextEncoder = new util.TextEncoder();
const Match = require("./models/Match");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to database
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

// Enable CORS
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// ... other imports
const path = require("path");

// ... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")));

app.use(bodyParser.json());

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

// GET REQUESTS
// Get Player 1's genres
app.get("/api/genres/:id", async (req, res) => {
  try {
    console.log("Retrieve genres!");
    const response = await Match.findOne({ _id: req.params.id });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

// Get Player 2's movies
app.get("api/movies/:id", async (req, res) => {
  console.log("Retrieve movies!");
  id = req.params.id;
  Match.findOne({ _id: id }).then((matches) => {
    res.json(matches);
    res.sendStatus(200);
  });
});

// POST requests
// Submit Player 2 genres
app.post("/api/genres/:id", async (req, res) => {
  try {
    console.log(`Submit Player 2's Genres`);
    const genres = req.body.genres_player2;
    const filter = { _id: req.params.id };
    const update = { genres_final: genres };
    await Match.findOneAndUpdate(filter, update);
    res.json({ id: req.params.id});
  } catch (err) {
    console.log(err);
  }
});
// Submit Player 1 genres
app.post("/api/genres", async (req, res) => {
  try {
    const genres = req.body.genres_player1;
    console.log(`Genres: `, genres);
    let response = await Match.create({ genres_player1: genres });
    let id = response._id;
    console.log(id);
    res.json({ id: id });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


// Submit movie list - final depends on if movies exist or not
app.post("/api/movies/:id", async (req, res) => {
  // Find one and update
  try {
    console.log(`Submit Movies`);
    const filter = { _id: req.params.id };
    const movies = req.body.movies;
    let matches = await Match.findOne(filter);
    console.log(`Matches: `, matches);
    let update;
    if (matches.movies_player2.length) {
      // Final movie submission
      update = { movies_final: movies };
      console.log(movies, filter);
    } else {
      // First movie submission
      update = { movies_player2: movies };
      console.log(movies, filter);
    }
    await Match.findOneAndUpdate(filter, update);
    matches = await Match.findOne(filter);
    console.log(matches);
    res.json(matches);
    // res.sendStatus(200)
  } catch (err) {
    console.log(err);
  }
});

// ...

// Accessing the path module
// const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
