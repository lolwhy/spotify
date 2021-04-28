const { spotifyApi } = require('../app.js');

const getRandomSong = () => {
  spotifyApi.setAccessToken(localStorage.getItem('access_token'));

  spotifyApi.getPlaylist(process.env.PLAYLIST).then(
    (data) => {
      const trackItems = data.body.tracks.items;
      // Get a random track from the playlist
      const { track } = trackItems[Math.floor(Math.random() * trackItems.length)];
      const artistNames = track.artists.map((artist) => artist.name);

      return {
        id: track.id,
        uri: track.uri,
        artists: artistNames,
        track: track.name,
        image: track.album.images[2].url,
      };
    },
    (err) => {
      console.error(err);
    },
  );
};

module.exports = getRandomSong;
