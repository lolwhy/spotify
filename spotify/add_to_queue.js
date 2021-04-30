const axios = require('axios').default;
const getRandomSong = require('./random_song.js');

async function routes(fastify) {
  fastify.get('/queue', async (request, reply) => {
    const randomSong = await getRandomSong();
    axios
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
      .then((response) => {
        // handle success
        console.log('Adding track to queue.');
      })
      .catch((err) => {
        // handle error
        console.log(err.response.data.error);
      });
    console.log('Queueing random song');
    reply.send(randomSong);
  });
}

module.exports = routes;
