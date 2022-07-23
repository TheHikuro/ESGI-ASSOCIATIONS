module.exports = {
    commands: {
        help: {
            infos: {
                name: 'help',
                aliases: ['help', 'h'],
                category: 'info',
                desc: '_**%shelp** : Affiche la liste complète des commandes.\n**%shelp <commandName>** : Affiche la description d\'une commande.\n\nAlias: **%sh**\n\nexemple:_```%shelp present```',
                cooldown: 5,
                needUserToBeAdmin: false,
                needUserToBeSyncWithAPI: false,
                onlyOnGuild: false,
                args: true
            },
            embed: {
                desc: '_**%shelp** : Affiche la liste complète des commandes.\n**%shelp <commandName>** : Affiche la description d\'une commande.\n\nAlias: **%sh**\n\nexemple:_```%shelp present```\n_Liste des commandes:_'
            }
        },
        present: {
            infos: {
                name: 'present',
                aliases: ['present', 'p'],
                category: 'association',
                desc: '_**%spresent** : Permet d\'ajouter sa présence à un évènement. Cette commande ne peut être exécuté que dans les salons de présences l\'hors d\'évènements.\n\nAlias: **%sp**\n\nexemple:_```%spresent```',
                cooldown: 5,
                needUserToBeAdmin: false,
                needUserToBeSyncWithAPI: true,
                onlyOnGuild: true,
                args: false
            }
        },
        setup: {
            infos: {
                name: 'setup',
                aliases: ['setup', 's'],
                category: 'admin',
                desc: '_**%ssetup association list** : Affiche la liste des associations disponibles.\n**%ssetup channel list** : Affiche la liste des salons de présences.\n**%ssetup channel add <idChannel> <associationSlug>** : Ajoute un salon de présences.\n**%ssetup channel remove <idChannel>** : Supprime un salon de présences.\n\nAlias: **%ss**\n\nexemple:_```%ssetup add #presence-minecraft minecraft```',
                cooldown: 5,
                needUserToBeAdmin: true,
                needUserToBeSyncWithAPI: true,
                onlyOnGuild: true,
                args: true
            },
            embed: {
                associations: {
                    desc: '_Liste des associations disponibles :\n**%s**_',
                },
                channels: {
                    desc: '_Liste des salons de présences :\n**%s**_',
                }
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
        },
        channelDelete: {
            name: 'channelDelete'
        },
    },
    client: {
        options: {
            intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS'],
        },
    }
}