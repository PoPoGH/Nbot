const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config/config.json");

module.exports = {
    name: 'nombremembre',
    category: "🔰 Info",
    aliases: ['members'],
    cooldown: 5,
    description: 'Affiche tout les membres',
    usage: 'nombremembre',
    memberpermissions: [" "],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        message.channel.send(
             new MessageEmbed()
             .setColor('#2ECC71').setDescription(`** 🔰  Nombre total de membres** :- \`\`${message.guild.memberCount}\`\` \n ** ✨ Total Bots** :- \`\`${message.guild.members.cache.filter(member => member.user.bot).size}\`\``))
    }
}