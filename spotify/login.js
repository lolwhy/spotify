"use strict";

const { spotifyApi } = require("../app.js");
require("dotenv").config();

async function routes(fastify, options) {
  fastify.get("/login", async (request, reply) => {
    const scopes = [
        "user-read-private",
        "user-read-email",
        "user-modify-playback-state",
      ],
      state = process.env.STATE;

    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state, true);
    reply.redirect(authorizeURL);
  });
}

module.exports = routes;
