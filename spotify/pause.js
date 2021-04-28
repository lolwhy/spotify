const { spotifyApi } = require('../app.js');

async function routes(fastify) {
  fastify.get('/pause', async (request, reply) => {
    spotifyApi.pause().then(
      () => {
        console.log('Playback paused');
      },
      (err) => {
        // if the user making the request is non-premium,
        //  a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      },
    );
    reply.redirect('/');
  });
}

module.exports = routes;
