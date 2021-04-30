const { spotifyApi } = require('../app.js');

async function routes(fastify) {
  fastify.get('/play', async () => {
    spotifyApi.setAccessToken(localStorage.getItem('access_token'));

    spotifyApi.play().then(
      () => {
        console.log('Playback resumed');
      },
      (err) => {
        // if the user making the request is non-premium,
        // a 403 FORBIDDEN response code will be returned
        // console.log('Something went wrong!', err);
        console.error(err.response.data.error);
      },
    );
  });
}

module.exports = routes;
