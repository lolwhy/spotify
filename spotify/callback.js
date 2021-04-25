const { spotifyApi } = require("../app.js");

async function routes(fastify, options) {
  fastify.get("/callback", options, async function (request, reply) {
    // reply.send({ hello: 'world' })
    console.log(options);
    console.log("request:" + request.params);
    console.log("reply:" + reply.body);

    // spotifyApi.authorizationCodeGrant(code).then(
    //   function (data) {
    //     console.log("The token expires in " + data.body["expires_in"]);
    //     console.log("The access token is " + data.body["access_token"]);
    //     console.log("The refresh token is " + data.body["refresh_token"]);
    //     // Set the access token on the API object to use it in later calls
    //     spotifyApi.setAccessToken(data.body["access_token"]);
    //     spotifyApi.setRefreshToken(data.body["refresh_token"]);
    //   },
    //   function (err) {
    //     console.log("Something went wrong!", err);
    //   }
    // );
  });
}

module.exports = routes;
