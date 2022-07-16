const { Collection } = require('discord.js');
const COLORS = require('../utils/textColor');
const CONSTANTS = require('../utils/constants');

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
}

module.exports.infos = CONSTANTS.events.ready