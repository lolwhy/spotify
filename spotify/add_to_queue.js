const axios = require('axios').default;
const getRandomSong = require('./random_song.js');
const getDevices = require('./devices.js');
const transferPlayback = require('./transfer_playback.js');

async function routes(fastify) {
  fastify.get('/queue', async (request, reply) => {
    const randomSong = await getRandomSong();
    const queueStatus = await axios
      .post(
        'https://api.spotify.com/v1/me/player/queue',
        {},
        {
          params: { uri: randomSong.uri },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => {
        // handle success
        console.log('Adding track to queue.');
        return true;
      })
      .catch(() => false);

    if (randomSong) {
      if (queueStatus) {
        console.log('queue status:', queueStatus);
        console.log('Queueing random song: ', randomSong);
        reply.send(randomSong);
      } else {
        transferPlayback(await getDevices());
        reply.send(randomSong);
      }
    }
  });
}

module.exports = routes;
