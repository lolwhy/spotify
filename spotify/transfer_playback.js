const { spotifyApi } = require('../app.js');

const transferPlayback = async (availableDevices) => {
  spotifyApi.transferMyPlayback(availableDevices)
    .then(() => {
      console.log(`Transfering playback to ${availableDevices}`);
    }, (err) => {
      console.log('Transfering playback failed: ', err.body);
    });
};

module.exports = transferPlayback;
