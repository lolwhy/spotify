const { spotifyApi } = require('../app.js');

async function routes(fastify) {
  fastify.get('/info', async (request, reply) => {
    console.log('Getting INFO!!!!!!!!!!!');
    const playbackInfo = spotifyApi.getMyCurrentPlaybackState().then(
      (data) => ({ is_playing: data.body.is_playing, is_active: data.body.device.is_active }),
      (err) => {
        console.error(err.response.data.error);
      },
    );
    console.log('playbackinfo:', await playbackInfo);
    reply.send(await playbackInfo); // want to send back data through here
  });
}

module.exports = routes;
