"use strict";

const axios = require("axios").default;
const getRandomSong = require("./random_song.js");

async function routes(fastify, options) {
  fastify.get("/queue", async (request, reply) => {
    const randomSong = await getRandomSong().then(function (result) {
      return result;
    });
    axios
      .post(
        "https://api.spotify.com/v1/me/player/queue",
        {},
        {
          params: { uri: randomSong.uri },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // handle success
        console.log("Adding track to queue.");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    reply.send(randomSong);
  });
}

module.exports = routes;
