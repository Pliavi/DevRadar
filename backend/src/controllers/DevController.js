const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const {
      github_username,
      latitude,
      longitude,
      contact_accounts
    } = request.body;

    const techs = request.body.techs.map(tech => tech.toUpperCase);

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data;

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs,
        contact_accounts,
        location
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techs
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return response.json(dev);
  }
};
