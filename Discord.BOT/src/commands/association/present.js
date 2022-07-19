const CONSTANTS = require('../../utils/constants');
const { getAxiosInstanceWithAuth } = require('../../utils/axiosUtils');

module.exports.run = async (client, message, connectedUser) => {
    const validChannels = await getAxiosInstanceWithAuth(client.apiToken).get('discord/presencesChannels', { params: { guildId: message.guild.id } })
        .catch(async (e) => {
            console.error(COLORS.FgRed, e, COLORS.Reset);
            return await message.channel.send(`${message.author} Une erreur est survenue, veuillez réessayer plus tard.`);
        });

    const currentValidChannel = validChannels.data.find(channel => channel.channelId === message.channel.id );

    if (!currentValidChannel)
        return await message.channel.send(`${message.author} Ce channel n'est pas autorisé pour les présences.`);
    
    const presencesChannel = await getAxiosInstanceWithAuth(client.apiToken).get(`discord/presencesChannels/${message.channel.id}`)
        .catch((e) => { return; })
    
    if(!presencesChannel)
        return await message.channel.send(`${message.author} Une erreur est survenue, veuillez réessayer plus tard.`);

    const currentEvent = await getAxiosInstanceWithAuth(client.apiToken).get('events', {
        params: {
            active: true,
            archived: false,
            'association.slug': presencesChannel.data.association.slug,
            'dateStart[before]': (new Date()).toUTCString(),
            'dateEnd[after]': (new Date()).toUTCString()
        }
    })
    .catch((e) => { return; });

    if(!currentEvent)
        return await message.channel.send(`${message.author} Une erreur est survenue, veuillez réessayer plus tard.`);
    
    if(!currentEvent.data[0])
        return await message.channel.send(`${message.author} Aucun évènement n'est en cours pour le moment.`);
    
    if(currentEvent.data[0].participants.find(p => p.id === connectedUser.id))
        return await message.channel.send(`${message.author} Vous participez déjà à cet évènement.`);
    
    const addParticipantResult = await getAxiosInstanceWithAuth(client.apiToken).put(`events/${currentEvent.data[0].id}/add_participant/${connectedUser.id}`)
        .catch((e) => { return; });
    
    if(!addParticipantResult)
        return await message.channel.send(`${message.author} Une erreur est survenue, veuillez réessayer plus tard.`);

    return await message.channel.send(`${message.author} Merci de votre participation.`);
}

module.exports.infos = CONSTANTS.commands.present.infos;