module.exports = {
    commands: {
        help: {
            infos: {
                name: 'help',
                aliases: ['help', 'h'],
                category: 'info',
                desc: '_**%shelp** : Affiche la liste complète des commandes.\n**%shelp <commandName>** : Affiche la description d\'une commande.\n\nAlias: **%sh**\n\nexemple:_```%shelp assos```',
                cooldown: 5,
                needUserToBeAdmin: false,
                needUserToBeSyncWithAPI: false,
                onlyOnGuild: false,
                args: true
            },
            embed: {
                desc: '_**%shelp** : Affiche la liste complète des commandes.\n**%shelp <commandName>** : Affiche la description d\'une commande.\n\nAlias: **%sh**\n\nexemple:_```%shelp assos```\n_Liste des commandes:_'
            }
        },
        assos: {
            infos: {
                name: 'assos',
                aliases: ['assos', 'associations', 'a'],
                category: 'associations',
                desc: '',
                cooldown: 15,
                needUserToBeAdmin: false,
                needUserToBeSyncWithAPI: true,
                onlyOnGuild: false,
                args: false
            }
        },
        events: {
            infos: {
                name: 'events',
                aliases: ['events', 'e'],
                category: 'associations',
                desc: '',
                cooldown: 15,
                needUserToBeAdmin: false,
                needUserToBeSyncWithAPI: true,
                onlyOnGuild: false,
                args: false
            }
        },
        present: {
            infos: {
                name: 'present',
                aliases: ['present', 'p'],
                category: 'associations',
                desc: '',
                cooldown: 5,
                needUserToBeAdmin: false,
                needUserToBeSyncWithAPI: true,
                onlyOnGuild: true,
                args: false
            }
        },
        settings: {
            infos: {
                name: 'settings',
                aliases: ['settings', 's'],
                category: 'admin',
                desc: '_**%ssettings** : Affiche la liste des paramètres du serveur.\n**%ssettings setup** : Met en place les salons de présences sur le serveur.\n\nexemple:_```%ssettings setup```',
                cooldown: 5,
                needUserToBeAdmin: true,
                needUserToBeSyncWithAPI: true,
                onlyOnGuild: true,
                args: true
            },
            embed: {
                desc: '_Channel des présences : **%s**_'
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
        guildCreate: {
            name: 'guildCreate'
        },
        guildDelete: {
            name: 'guildDelete'
        }
    },
    client: {
        options: {
            intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS'],
        },
    }
}