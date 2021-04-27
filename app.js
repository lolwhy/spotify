"use strict";

const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri:
    "https://https://spotify-randomizer-research.herokuapp.com/callback",
});

module.exports = { spotifyApi };
