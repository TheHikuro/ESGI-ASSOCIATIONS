const { Collection } = require('discord.js');
const COLORS = require('../utils/textColor');
const CONSTANTS = require('../utils/constants');
const { getRenewedToken, getAxiosInstanceWithAuth } = require('../utils/axiosUtils');

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

    // add new guild to the api
    const registeredGuilds = await getAxiosInstanceWithAuth(client.apiToken).get('discord/guilds')
        .catch(() => {
            throw new Error('Impossible de récupérer les données des guilds');
        });

    // Compare registered guilds with the current guilds and add diff to the api
    await client.guilds.cache.forEach(async (guild) => {
        if(!registeredGuilds.data.find(registeredGuild => registeredGuild.guildId === guild.id)){
            await getAxiosInstanceWithAuth(client.apiToken).post('discord/guilds', {
                guildId: guild.id
            })
            .catch(() => {
                console.error('Impossible d\'ajouter la guilde à l\'API');
            });
        }
    });

    // Renew api token every 30 minutes
    setInterval(async () => {
        await renewApiToken(client);
    }, process.env.API_TOKEN_RENEW_DELAY * 1000);
}

module.exports.infos = CONSTANTS.events.ready