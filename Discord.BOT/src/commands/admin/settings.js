const { MessageEmbed } = require('discord.js');
const CONSTANTS = require('../../utils/constants');

module.exports.run = async (client, message, args) => {
    if(args.length == 0)
    {
        const embed = new MessageEmbed()
            .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
            .setDescription(CONSTANTS.commands.settings.embed.desc.replace(/%s/g, () => client.prefix));
        
        await message.channel.send({ embeds: [embed] });
    }
}

module.exports.infos = CONSTANTS.commands.settings.infos