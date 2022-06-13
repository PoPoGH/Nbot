const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const moment = require('moment');


module.exports = {
    name: 'channelinfo',
    aliases: ['chinfo'],
    category: '🔰 Info',
    memberpermissions: [],
    cooldown: 5,
    description: "Affiche les informations d'un channel",
    usage: "channelinfo <@CHANNEL>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            var role = message.mentions.channels.first()

            if (!role) return message.channel.send(
                 new MessageEmbed()
                 .setColor('#ED4245')
                    .setDescription(`Channel introuvable ⚠`)
            )

            //create the EMBED
            const embeduserinfo =  new MessageEmbed()
            .setColor('#2ECC71')
            embeduserinfo.setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
            embeduserinfo.setAuthor("informations:   " + role.name, message.guild.iconURL({ dynamic: true }), "https://discord.gg/FQGXbypRf8")
            embeduserinfo.addField('**❱ Nom:**', `\`${role.name}\``, true)
            embeduserinfo.addField('**❱ ID:**', `\`${role.id}\``, true)
            embeduserinfo.addField('**❱ Date de création:**', "\`" + moment(role.createdAt).format("DD/MM/YYYY") + "\`\n" + "`" + moment(role.createdAt).format("hh:mm:ss") + "\`", true)
            embeduserinfo.addField('**❱ Position:**', `\`${role.rawPosition}\``, true)
            embeduserinfo.addField('**❱ Nombre de membres:**', `\`${role.members.size} Membre actuellement\``, true)
            embeduserinfo.addField('**❱ Managable:**', `\`${role.manageable ? "✔️" : "❌"}\``, true)
            embeduserinfo.setFooter(ee.footertext, ee.footericon)
            //send the EMBED
            message.channel.send(embeduserinfo)
        } catch (e) {
            message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(e)
            )

        }
    }
}