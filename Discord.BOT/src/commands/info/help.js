const { MessageEmbed } = require('discord.js');
const CONSTANTS = require('../../utils/constants');

module.exports.run = async (client, message, args) => {
    const embed = new MessageEmbed()
        .setColor('#354768')
        .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() });

    // If use help on a command
    if(args.length > 0){
        // Check if command have an alias
        const cmd = client.commands.get(args[0]) || client.commands.find(cmd => cmd.infos.aliases && cmd.infos.aliases.includes(args[0]));
        if(!cmd) return message.channel.send('La commande n\'existe pas.');
        embed.setDescription(cmd.infos.desc.replace(/%s/g, () => client.prefix));
    }
    else{
        // Get all commands in categories and display in embed
        const category = client.commands.map(c => c.infos.category).filter((val, index, self) => self.indexOf(val) === index).sort();
        embed.setDescription(CONSTANTS.commands.help.embed.desc.replace(/%s/g, () => client.prefix));
        for (c in category) {
            const cmdsInCateg = client.commands.filter(self => self.infos.category === category[c]).map(x => x.infos.name).sort();
            embed.addField(category[c], cmdsInCateg.join('\n'), true)
        }
    }
    
    await message.channel.send({ embeds: [embed] });
}

module.exports.infos = CONSTANTS.commands.help.infos;