const axios = require('axios').default;
const getRandomSong = require('./random_song.js');

async function routes(fastify) {
  fastify.get('/queue', async (request, reply) => {
    console.log('ACCESS TOKEN QUEUE: ', localStorage.getItem('access_token'));
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
      .catch((error) => {
        // handle error
        console.log(error);
      });
    reply.send(randomSong);
  });
}

module.exports = routes;
