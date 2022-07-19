const { MessageEmbed } = require('discord.js');
const CONSTANTS = require('../../utils/constants');
const { getAxiosInstanceWithAuth } = require('../../utils/axiosUtils');
const { stringFormat } = require('../../utils/tools');

module.exports.run = async (client, message, _, args) => {
    // Display associations list
    if(args[0] == 'association' && args[1] == 'list') {
        const assosInfos = await getAxiosInstanceWithAuth(client.apiToken).get('associations')
            .catch(async (e) => {
                console.error(COLORS.FgRed, e, COLORS.Reset);
                return await message.channel.send(`${message.author} Une erreur est survenue, veuillez réessayer plus tard.`);
            });
        
        const assosEmbed = new MessageEmbed()
            .setColor('#354768')
            .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
        
        if(assosInfos.data.length == 0)
            assosEmbed.setDescription(stringFormat(CONSTANTS.commands.setup.embed.associations.desc, 'aucune associations'));
        else
            assosEmbed.setDescription(stringFormat(CONSTANTS.commands.setup.embed.associations.desc, assosInfos.data.map((a) => { return a.slug }).join('\n')));
        
        return await message.channel.send({ embeds: [assosEmbed] });
    }

    // Display presences Channels list
    if(args[0] == 'channel' && args[1] == 'list') {
        const guildInfos = await getAxiosInstanceWithAuth(client.apiToken).get(`/discord/guilds/${message.guild.id}`)
            .catch(async (e) => {
                console.error(COLORS.FgRed, e, COLORS.Reset);
                return await message.channel.send(`${message.author} Une erreur est survenue, veuillez réessayer plus tard.`);
            });
        
        const channelsEmbed = new MessageEmbed()
            .setColor('#354768')
            .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })

        if(guildInfos.data.presencesChannels.length == 0)
            channelsEmbed.setDescription(stringFormat(CONSTANTS.commands.setup.embed.channels.desc, 'aucun salon'));
        else
            channelsEmbed.setDescription(stringFormat(CONSTANTS.commands.setup.embed.channels.desc, guildInfos.data.presencesChannels.map((c) => { return `<#${c.channelId}> -> ${c.association.slug}`; }).join('\n')));
        
        return await message.channel.send({ embeds: [channelsEmbed] });
    }

    // Add presences channel to Api
    if(args[0] == 'channel' && args[1] == 'add') {        
        const presencesChannel = client.channels.cache.get(args[2].replace(/\D/g,''));

        if(!presencesChannel || presencesChannel.guild.id != message.guild.id)
            return await message.channel.send(`${message.author} Veuillez indiquer un channel valide.`);

        const association = await getAxiosInstanceWithAuth(client.apiToken).get('/associations', { params: { slug: args[3] } })
            .catch((e) => { return null; });

        if(!association)
            return await message.channel.send(`${message.author} Veuillez indiquer une association valide.`);

        const addChannelResponse = await getAxiosInstanceWithAuth(client.apiToken).post('/discord/presencesChannels', {
                guild: `api/discord/guilds/${message.guild.id}`,
                association: `api/associations/${association.data[0].id}`,
                channelId: presencesChannel.id
            })
            .catch((e) => { return null; });

        if(!addChannelResponse)
            return await message.channel.send(`${message.author} Impossible d'ajouter l'association ${association.data[0].name} au channel <#${presencesChannel.id}>.`);
        
        return await message.channel.send(`${message.author} L'association ${association.data[0].name} a été attribuée au salon <#${presencesChannel.id}>.`)
    }    

    // Remove presences channel from Api
    if(args[0] == 'channel' && args[1] == 'remove') {
        const presencesChannel = client.channels.cache.get(args[2].replace(/\D/g,''));

        if(!presencesChannel || presencesChannel.guild.id != message.guild.id)
            return await message.channel.send(`${message.author} Veuillez indiquer un channel valide.`);
        
        const removeChannelResponse = await getAxiosInstanceWithAuth(client.apiToken).delete(`/discord/presencesChannels/${presencesChannel.id}`)
            .catch((e) => { return null; });
        
        if(!removeChannelResponse)
            return await message.channel.send(`${message.author} Il est impossible de dissocier l'association, du salon <#${presencesChannel.id}>.`);

        return await message.channel.send(`${message.author} Le salon <#${presencesChannel.id}> a été dissocié de son association.`);
    }

    return await message.channel.send(`${message.author} La commande est invalide. ${client.prefix}help setup pour plus d'informations.`)
}

module.exports.infos = CONSTANTS.commands.setup.infos