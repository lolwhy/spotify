const { spotifyApi } = require('../app.js');

if (typeof localStorage === 'undefined' || localStorage === null) {
  const { LocalStorage } = require('node-localstorage');
  localStorage = new LocalStorage('./scratch');
}

async function routes(fastify, options) {
  fastify.get('/callback', options, async (request, reply) => {
    console.log(request.query.code);
    const accessToken = request.query.code;

    spotifyApi.authorizationCodeGrant(accessToken).then(
      (data) => {
        console.log(`The token expires in ${data.body.expires_in}`);
        console.log(`The access token is ${data.body.access_token}`);
        console.log(`The refresh token is ${data.body.refresh_token}`);

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body.access_token);
        localStorage.setItem('access_token', data.body.access_token);
        spotifyApi.setRefreshToken(data.body.refresh_token);
      },
      (err) => {
        console.error(err.response.data.error);
      },
    );
    reply.redirect('/main');
  });
}

module.exports = routes;
