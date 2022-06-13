const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'avatar',
    aliases: ['av', 'pfp'],
    category: '🔰 Info',
    memberpermissions: [],
    cooldown: 5,
    description: "Affiche l'avatar d'un utilisateur",
    usage: 'avatar [@USER] [global]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            var user = message.mentions.users.first() || message.author;

            message.channel.send( new MessageEmbed()
            .setColor('#2ECC71')
                .setTitle(`Avatar de : ${user.tag}`, user.displayAvatarURL({ dynamic: true }))
                .addField("❱ PNG", `[\`LIEN\`](${user.displayAvatarURL({ format: "png" })})`, true)
                .addField("❱ JPEG", `[\`LIEN\`](${user.displayAvatarURL({ format: "jpg" })})`, true)
                .addField("❱ WEBP", `[\`LIEN\`](${user.displayAvatarURL({ format: "webp" })})`, true)
                .setFooter(ee.footertext, ee.footericon)
                .setImage(user.displayAvatarURL({
                    dynamic: true, size: 512,
                }))
            );

        } catch (e) {
            message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(e)
            )
        }
    }
}