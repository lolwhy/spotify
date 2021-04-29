const { spotifyApi } = require('../app.js');

async function routes(fastify) {
  if (localStorage.getItem('access_token')) {
    fastify.get('/info', async (request, reply) => {
      const playbackInfo = spotifyApi.getMyCurrentPlaybackState().then(
        (data) => ({ is_playing: data.body.is_playing, is_active: data.body.device.is_active }),
        (err) => {
          // if the user making the request is non-premium,
          //  a 403 FORBIDDEN response code will be returned
          console.error(err.response.data.error);
        },
      );
      console.log('playbackinfo:', await playbackInfo);
      reply.send(await playbackInfo); // want to send back data through here
    });
  }
}

module.exports = routes;
