const { Client, Message, MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json')
module.exports = {
    name: 'invite',
    category: "🔰 Info",
    aliases: ['inv'],
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        message.channel.send(
             new MessageEmbed()
                .setColor(ee.color)
                .setColor('BLUE')
    
                .setTitle("Invitation & Serveur Support!")
                .addField("**Lien d'invitation du bot**", `[Clique ici pour inviter le bot](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`)
                .addField("**Support Server**", `[Clique ici pour rejoindre le serveur de support](https://discord.gg/XrzfCeec9Y)`)
                .setFooter(`Demandé par ${message.author.tag}`, client.user.displayAvatarURL())
                .setTimestamp()


        )

    }
}