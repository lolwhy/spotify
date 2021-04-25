const { spotifyApi } = require("../app.js");

async function routes(fastify, options) {
  fastify.get("/login", async (request, reply) => {
    const scopes = [
        "user-read-private",
        "user-read-email",
        "user-modify-playback-state",
      ],
      state = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state, true);
    console.log("Auth url: " + authorizeURL);
    reply.redirect(authorizeURL);
    reply.send(authorizeURL);
  });
}

module.exports = routes;
