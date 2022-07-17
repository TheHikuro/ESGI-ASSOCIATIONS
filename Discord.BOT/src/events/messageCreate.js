const CONSTANTS = require('../utils/constants');
const { getUserInfosById } = require('../utils/axiosUtils');

module.exports.run = async (client, message) => {
    if (!(message.content.startsWith(client.prefix) || message.content.startsWith(`<@${client.user.id}>`)) || message.author.bot) return;

    let args;

    if(message.content.startsWith(client.prefix))
        args = message.content.slice(client.prefix.length).trim().split(/ +/);
    else if(message.content.startsWith(`<@${client.user.id}>`))
        args = message.content.slice(`<@${client.user.id}>`.length).trim().split(/ +/);

    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.infos.aliases && cmd.infos.aliases.includes(commandName));

    if (!command) return;

    // Check if command can be executed on mp
    if(!message.guild)
        if(command.infos.onlyForGuild)
            return message.channel.send(`${message.author} cette commande ne peut être exécuté que sur serveur.`);

    // Need admin permissions on specific commands
    if (command.infos.needUserToBeAdmin && !message.member.permissions.has('ADMINISTRATOR'))
        return await message.channel.send(`${message.author} seul un administrateur peut exécuter cette commande.`);

    // Need user to be sync with website to run this command
    if(command.infos.needUserToBeSyncWithAPI) {
        const connectedUser = await getUserInfosById(client.apiToken, message.author.id);

        if(!connectedUser)
            return await message.channel.send(`${message.author} tu dois connecter ton compte discord au site de l'ESGI-Gaming pour pouvoir exécuter cette commande.`);
    }

    // Commande arguments permisions
    if (command.infos.args === false) args = null;

    // Command cooldown
    if(command.infos.cooldown)
        if(client.cooldowns.get(command.infos.name).has(message.author.id) && client.cooldowns.get(command.infos.name).get(message.author.id) > Date.now())
            return message.channel.send(`${message.author} tu dois attendre **${Math.floor((client.cooldowns.get(command.infos.name).get(message.author.id) - Date.now()) / 1000)} secondes** avant de pouvoir exécuter cette commande.`);
        else
            client.cooldowns.get(command.infos.name).set(message.author.id, Date.now() + command.infos.cooldown * 1000);

    command.run(client, message, args);
}

module.exports.infos = CONSTANTS.events.messageCreate