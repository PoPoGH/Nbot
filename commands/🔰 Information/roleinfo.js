const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const moment = require('moment');


module.exports = {
    name: 'roleinfo',
    aliases: ['rinfo'],
    category: '🔰 Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Show Info Of a Role',
    usage: "roleinfo <@ROLE>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            var role = message.mentions.roles.first();
            if (!role) return message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(`Role Not Found`)
            )

            //create the EMBED
            const embeduserinfo =  new MessageEmbed()
            .setColor('#2ECC71')
            embeduserinfo.setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
            embeduserinfo.setAuthor("Information sur:   " + role.name, message.guild.iconURL({ dynamic: true }),)
            embeduserinfo.addField('**❱ Nom:**', `\`${role.name}\``, true)
            embeduserinfo.addField('**❱ ID:**', `\`${role.id}\``, true)
            embeduserinfo.addField('**❱ Couleur:**', `\`${role.hexColor}\``, true)
            embeduserinfo.addField('**❱ Date de création:**', "\`" + moment(role.createdAt).format("DD/MM/YYYY") + "\`\n" + "`" + moment(role.createdAt).format("hh:mm:ss") + "\`", true)
            embeduserinfo.addField('**❱ Position:**', `\`${role.rawPosition}\``, true)
            embeduserinfo.addField('**❱ Nombre de membres:**', `\`${role.members.size} \``, true)
            embeduserinfo.addField('**❱ Mentionable:**', `\`${role.mentionable ? "✔️" : "❌"}\``, true)
            embeduserinfo.addField('**❱ Permissions:**', `${role.permissions.toArray().map(p => `\`${p}\``).join(", ")}`)
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