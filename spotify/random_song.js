const { spotifyApi } = require('../app.js');

const getRandomSong = async () => {
  spotifyApi.setAccessToken(localStorage.getItem('access_token'));

  const randomSong = await spotifyApi.getPlaylist(process.env.PLAYLIST).then(
    (data) => {
      const trackItems = data.body.tracks.items;
      // Get a random track from the playlist
      const { track } = trackItems[Math.floor(Math.random() * trackItems.length)];
      const artistNames = track.artists.map((artist) => artist.name);

      const payload = {
        id: track.id,
        uri: track.uri,
        artists: artistNames,
        track: track.name,
        image: track.album.images[2].url,
      };
      return payload;
    },
    (err) => {
      console.error(err.response.data.error);
    },
  );
  console.log('Getting random song:', randomSong.track);
  return randomSong;
};

module.exports = getRandomSong;
