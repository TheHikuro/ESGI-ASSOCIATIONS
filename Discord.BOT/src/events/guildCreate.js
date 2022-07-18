const CONSTANTS = require('../utils/constants');
const { getAxiosInstanceWithAuth } = require('../utils/axiosUtils');

module.exports.run = async (client, guild) => {
    await getAxiosInstanceWithAuth(client.apiToken).post('discord/guilds', {
        guildId: guild.id
    })
    .catch(() => {
        console.error('Impossible d\'ajouter la guilde à l\'API');
    });
}

module.exports.infos = CONSTANTS.events.guildCreate