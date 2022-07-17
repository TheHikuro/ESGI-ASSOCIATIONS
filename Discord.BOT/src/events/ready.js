const { Collection } = require('discord.js');
const COLORS = require('../utils/textColor');
const CONSTANTS = require('../utils/constants');
const { getRenewedToken } = require('../utils/axiosUtils');

const renewApiToken = async (client) => {
    const apiToken = await getRenewedToken();

    if(!apiToken)
        throw new Error('Impossible de récupérer le token API');

    client.apiToken = apiToken;
    console.log(`${COLORS.FgGreen}The api token has been renewed !${COLORS.Reset}`);
}

module.exports.run = async (client) => {
    console.log(`${COLORS.FgYellow}-- READY EVENT --${COLORS.Reset}`);
    console.log(`${COLORS.FgCyan}Logged in as ${COLORS.FgMagenta}${client.user.tag}${COLORS.Reset}`);
    console.log(`${COLORS.FgCyan}Present in ${COLORS.FgMagenta}${client.guilds.cache.size} servers${COLORS.Reset}`);
    console.log(`${COLORS.FgCyan}Prefix is ${COLORS.FgMagenta}${client.prefix}${COLORS.Reset}`);
    console.log(`${COLORS.FgYellow}-----------------${COLORS.Reset}`);

    client.user.setActivity(`${client.prefix}help`, {type: 0});
    
    // Set commands cooldown
    client.commands.forEach(command => {
        if(command.infos.cooldown){
            client.cooldowns.set(command.infos.name, new Collection());
        }
    });

    await renewApiToken(client);

    // Renew api token every 30 minutes
    setInterval(async () => {
        await renewApiToken(client);
    }, process.env.API_TOKEN_RENEW_DELAY * 1000);
}

module.exports.infos = CONSTANTS.events.ready