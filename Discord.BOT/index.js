const { Client, Collection } = require('discord.js');
const { loadCommands, loadEvents } = require('./src/utils/loader');
const COLORS = require('./src/utils/textColor');
const CONSTANTS = require('./src/utils/constants');

const client = new Client(CONSTANTS.client.options);
client.prefix = process.env.BOT_PREFIX;
['commands', 'cooldowns', 'lastCheckEvents'].forEach((x) => client[x] = new Collection());

loadCommands(client, `${__dirname}/src/commands`);
loadEvents(client, `${__dirname}/src/events`);

client.login(process.env.BOT_TOKEN).catch((e) => {
    console.error(COLORS.FgRed, e, COLORS.Reset);
});