const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const moment = require("moment")

const flags = {
    DISCORD_EMPLOYEE: 'Discord Employee',
    DISCORD_PARTNER: 'Discord Partner',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
function trimArray(arr, maxLen = 25) {
    if (arr.array().length > maxLen) {
        const len = arr.array().length - maxLen;
        arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
        arr.map(role => `<@&${role.id}>`)
        arr.push(`${len} more...`);
    }
    return arr.join(", ");
}
const statuses = {
    "online": "🟢",
    "idle": "🟠",
    "dnd": "🔴",
    "offline": "⚫️",
}


module.exports = {
    name: 'botinfo',
    aliases: ['binfo'],
    category: '🔰 Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Affiche les information du bot',
    usage: 'botinfo [@bot] [global]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            var bot = message.mentions.users.first() || message.author.bot;

            if (!bot || bot == null || bot.id == null || !bot.id) return message.reply("Merci de mentionner un bot");

            const member = message.guild.members.cache.get(bot.id);
            //create the EMBED
            const embedbotinfo =  new MessageEmbed()
            .setColor('#2ECC71')
            embedbotinfo.setThumbnail(bot.displayAvatarURL({ dynamic: true, size: 512 }))
            embedbotinfo.setAuthor("Des informations sur:   " + bot.username + "#" + bot.discriminator ,bot.displayAvatarURL({ dynamic: true }))
            embedbotinfo.addField('**❱ Nom du bot:**', `<@${bot.username}>\n\`${bot.tag}\``, true)
            embedbotinfo.addField('**❱ ID:**', `\`${bot.id}\``, true)
            embedbotinfo.addField('**❱ Avatar:**', `[\`Lien vers l'avatar\`](${bot.displayAvatarURL({ format: "png" })})`, true)
            embedbotinfo.addField('**❱ Date de création:**', "\`" + moment(bot.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(bot.createdTimestamp).format("hh:mm:ss") + "\`", true)
            embedbotinfo.addField('**❱ Robot:**', `\`${bot.bot ? "✔️" : "❌"}\``, true)
            embedbotinfo.setFooter(ee.footertext, ee.footericon)
            //send the EMBED
            message.channel.send(embedbotinfo)
        } catch (e) {
            message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(e)
            )
        }
    }
}