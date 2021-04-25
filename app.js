"use strict";

const SpotifyWebApi = require("spotify-web-api-node");

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: "",
  clientSecret: "",
  redirectUri: "http://localhost:8888/callback",
});

module.exports = { spotifyApi };
