module.exports = {
    commands: {
        help: {
            infos: {
                name: 'help',
                aliases: ['help', 'h'],
                category: 'info',
                desc: '_**%shelp** : Affiche la liste complète des commandes.\n**%shelp <commandName>** : Affiche la description d\'une commande.\n\nAlias: **%sh**\n\nexemple:_\`\`\`%shelp api\`\`\`',
                cooldown: 5,
                needUserToBeAdmin: false,
                needUserToBeSyncWithAPI: false,
                onlyOnGuild: false,
                args: true
            },
            embed: {
                desc: '_**%shelp** : Affiche la liste complète des commandes.\n**%shelp <commandName>** : Affiche la description d\'une commande.\n\nAlias: **%sh**\n\nexemple:_\`\`\`%shelp api\`\`\`\n_Liste des commandes:_'
            }
        },
        assos: {
            infos: {
                name: 'assos',
                aliases: ['assos', 'associations', 'a'],
                category: 'associations',
                desc: '',
                cooldown: 5,
                needUserToBeAdmin: false,
                needUserToBeSyncWithAPI: true,
                onlyOnGuild: false,
                args: false
            }
        }
    },
    events: {
        ready: {
            name: 'ready'
        },
        messageCreate: {
            name: 'messageCreate'
        },
    },
    client: {
        options: {
            intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS'],
        },
    }
}