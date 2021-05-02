const { spotifyApi } = require('../app.js');

const transferPlayback = async (availableDevices) => {
  const availableDevice = Array.from(availableDevices[0]);
  console.log('AVAIL DEVICE', availableDevice);
  spotifyApi.transferMyPlayback(availableDevice).then(
    () => {
      console.log(`Transfering playback to ${availableDevice}`);
    },
    (err) => {
      console.log('Transfering playback failed: ', err.body);
    },
  );
};

module.exports = transferPlayback;
