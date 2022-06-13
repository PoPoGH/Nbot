const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'quitterserveur',
    aliases: [''],
    category: ' ',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const owner = ["185827598436139008"];
        if (owner.includes(message.author.id) === false) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor('#ED4245')
                    .setDescription("**Vous n'avez pas les autorisations pour utiliser cette commande!**")
                    .setFooter(ee.footertext)
            ).then((msg => {
                msg.delete({ timeout: 10000 })
            }))
        }

        const guildId = args[0];

        if (!guildId) return message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription("**Entre l'ID du serveur à quitter **")
                .setFooter(ee.footertext)
        ).then((msg => {
            msg.delete({ timeout: 10000 })
        }))

        const guild = client.guilds.cache.find((g) => g.id === guildId)

        if (!guild) return message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription("** Ce serveur n'existe pas .. **")
                .setFooter(ee.footertext)
        ).then((msg => {
            msg.delete({ timeout: 10000 })
        }))
        let leaved = await guild.leave()
        if (leaved) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Le serveur à quitté avec succès: **${guild.name}**`)
                    .setFooter(ee.footertext)
            )
        } else {
            message.channel.send('i cant do....')
        }
    }
}