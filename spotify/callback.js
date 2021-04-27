const { spotifyApi } = require("../app.js");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

async function routes(fastify, options) {
  fastify.get("/callback", options, async function (request, reply) {
    console.log(request.query.code);
    const access_token = request.query.code;

    spotifyApi.authorizationCodeGrant(access_token).then(
      function (data) {
        console.log("The token expires in " + data.body["expires_in"]);
        console.log("The access token is " + data.body["access_token"]);
        console.log("The refresh token is " + data.body["refresh_token"]);

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body["access_token"]);
        localStorage.setItem("access_token", data.body["access_token"]);
        spotifyApi.setRefreshToken(data.body["refresh_token"]);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
    reply.redirect("/");
  });
}

module.exports = routes;
