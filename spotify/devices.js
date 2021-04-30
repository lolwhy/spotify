const { spotifyApi } = require('../app.js');

const getDevices = async () => {
  const devices = await spotifyApi.getMyDevices()
    .then((data) => data.body.devices.map((device) => device.id))
    .catch((error) => {
      console.log('Getting devices failed: ', error.body);
    });
  return devices;
};

module.exports = getDevices;
