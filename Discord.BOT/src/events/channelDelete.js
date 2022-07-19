const CONSTANTS = require('../utils/constants');
const { getAxiosInstanceWithAuth } = require('../utils/axiosUtils');

module.exports.run = async (client, channel) => {
    await getAxiosInstanceWithAuth(client.apiToken).delete(`discord/presencesChannels/${channel.id}`)
        .catch(() => { return; });
}

module.exports.infos = CONSTANTS.events.channelDelete