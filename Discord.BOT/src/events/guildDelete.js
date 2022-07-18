const CONSTANTS = require('../utils/constants');
const { getAxiosInstanceWithAuth } = require('../utils/axiosUtils');

module.exports.run = async (client, guild) => {
    await getAxiosInstanceWithAuth(client.apiToken).delete(`discord/guilds/${guild.id}`)
    .catch(() => {
        console.error('Impossible d\'enlever la guilde de l\'API');
    });
}

module.exports.infos = CONSTANTS.events.guildDelete