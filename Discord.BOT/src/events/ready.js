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

    // Init lastCheckEvents collection
    client.guilds.cache.forEach(guild => {
        client.lastCheckEvents.set(guild.id, new Collection());
    });

    await renewApiToken(client);

    // add new guild to the api
    const registeredGuilds = await getAxiosInstanceWithAuth(client.apiToken).get('discord/guilds')
        .catch(() => {
            throw new Error('Impossible de récupérer les données des guilds');
        });

    // Compare registered guilds with the current guilds and add diff to the api
    await client.guilds.cache.forEach(async (guild) => {
        const currentGuild = registeredGuilds.data.find(registeredGuild => registeredGuild.guildId === guild.id);

        if(!currentGuild){
            await getAxiosInstanceWithAuth(client.apiToken).post('discord/guilds', {
                guildId: guild.id
            })
            .catch(() => { return; });
            return;
        }

        currentGuild.presencesChannels.forEach(async (channel) => {
            if(!guild.channels.cache.has(channel.channelId)) {
                await getAxiosInstanceWithAuth(client.apiToken).delete(`discord/presencesChannels/${channel.channelId}`)
                .catch(() => { return; });
            }
        });
    });

    // Renew api token every 30 minutes
    setInterval(async () => {
        await renewApiToken(client);
    }, process.env.API_TOKEN_RENEW_DELAY * 1000);

    // Check events every 2 minutes
    setInterval(async () => {
        const events = await getAxiosInstanceWithAuth(client.apiToken).get('events', {
            params: {
                active: true,
                archived: false,
                'dateStart[before]': (new Date()).toUTCString(),
                'dateEnd[after]': (new Date(new Date().getTime() - 4 * 60 * 1000)).toUTCString()
            }
        })
        .catch((e) => { return; });

        if(!events)
            console.error(COLORS.FgRed, 'Impossible de récupérer les events actifs', COLORS.Reset);

        // Clean lastCheckEvents collection
        // client.lastCheckEvents.forEach((lastCheckEvent, guildId) => {
        // });

        events.data.forEach(async (event) => {
            const currentChannel = await getAxiosInstanceWithAuth(client.apiToken).get('discord/presencesChannels', {
                params: {
                    'association.id': event.association.id
                }
            })
            .catch(() => { return; });

            if(!currentChannel)
                return;
            
            const currentEvent = client.lastCheckEvents.get(currentChannel.data[0].guild.guildId).get(event.id);

            if(!currentEvent){
                client.lastCheckEvents.get(currentChannel.data[0].guild.guildId).set(event.id, {status: 'STARTED', channelId: currentChannel.data[0].channelId});
                return await client.guilds.cache.get(currentChannel.data[0].guild.guildId).channels.cache.get(currentChannel.data[0].channelId).send(`📆 L'évènement **${event.name}** a débuté !`);
            }

            if(currentEvent.status === 'ENDED')
                return;

            if((new Date()).getTime() > (new Date(event.dateEnd)).getTime()){
                client.lastCheckEvents.get(currentChannel.data[0].guild.guildId).set(event.id, {status: 'ENDED'});
                return await client.guilds.cache.get(currentChannel.data[0].guild.guildId).channels.cache.get(currentChannel.data[0].channelId).send(`📆 L'évènement **${event.name}** vient de se terminer !`);
            }
        });
    }, process.env.API_EVENTS_CHECK_DELAY * 100);
}

module.exports.infos = CONSTANTS.events.ready