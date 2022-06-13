const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'quentin',
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
        try {
            var user = message.mentions.users.first() || message.author;

        const images = ["https://media.discordapp.net/attachments/949275018083315713/949319761060307014/IMG_20220304_155630.jpg"];
        const image = images[Math.floor(Math.random() * images.length)];

        message.channel.send( new MessageEmbed()
        .setColor('#2ECC71')
            .setTitle(`Quentin 🐵`)
            .setFooter(ee.footertext, ee.footericon)
            .setImage(image)
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