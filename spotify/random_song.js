"use strict";

const { spotifyApi } = require("../app.js");

const getRandomSong = () => {
  return spotifyApi.getPlaylist(process.env.PLAYLIST).then(
    function (data) {
      const trackItems = data.body.tracks.items;
      // Get a random track from the playlist
      const track =
        trackItems[Math.floor(Math.random() * trackItems.length)].track;
      const artistNames = track.artists.map((artist) => artist.name);

      return {
        id: track.id,
        uri: track.uri,
        artists: artistNames,
        track: track.name,
        image: track.album.images[2].url,
      };
    },
    function (err) {
      console.error(err);
    }
  );
};

module.exports = getRandomSong;
