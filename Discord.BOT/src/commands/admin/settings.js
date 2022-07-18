const { MessageEmbed } = require('discord.js');
const CONSTANTS = require('../../utils/constants');
const { getAxiosInstanceWithAuth } = require('../../utils/axiosUtils');
const { stringFormat } = require('../../utils/tools');

module.exports.run = async (client, message, args) => {
    if(args.length == 0)
    {
        try {
            const guildInfos = await getAxiosInstanceWithAuth(client.apiToken).get('/discord/guilds',
            {
                params: {
                    guildId: message.guild.id
                }
            })
        } catch (e) {
            console.error(COLORS.FgRed, e, COLORS.Reset);
            return await message.channel.send(`${message.author} Une erreur est survenue, veuillez réessayer plus tard.`);
        }

        const embed = new MessageEmbed()
            .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })

        if(guildInfos.length == 0)
            embed.setDescription(stringFormat(CONSTANTS.commands.settings.embed.desc, 'aucune'));
        else
            embed.setDescription(stringFormat(CONSTANTS.commands.settings.embed.desc, `<#${guildInfos[0].presencesChannelId}>`));
        
        await message.channel.send({ embeds: [embed] });
    }

    if(args[0] == 'setup'){

    }
}

module.exports.infos = CONSTANTS.commands.settings.infos