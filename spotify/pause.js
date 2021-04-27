"use strict";

const { spotifyApi } = require("../app.js");

async function routes(fastify, options) {
  fastify.get("/pause", async (request, reply) => {
    spotifyApi.pause().then(
      function () {
        console.log("Playback paused");
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log("Something went wrong!", err);
      }
    );
    reply.redirect("/");
  });
}

module.exports = routes;
