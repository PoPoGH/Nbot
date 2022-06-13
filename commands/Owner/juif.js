const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'president',
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

        const images = ["https://c.tenor.com/ErLfR9QlfVkAAAAd/macron-guerre.gif", "https://media4.giphy.com/media/YTXGNnbSxDmjnspx8G/200.gif", "https://c.tenor.com/vG9JRCKSWgEAAAAd/joe-biden.gif", "https://c.tenor.com/t-LFiq203l8AAAAd/kim-jongun-hi.gif", "http://31.media.tumblr.com/e098fc9362660b0d6fb094ff217fa2b8/tumblr_n853lnM2P31txy0q2o1_400.gif"];
        const image = images[Math.floor(Math.random() * images.length)];

        message.channel.send( new MessageEmbed()
        .setColor('#2ECC71')
            .setTitle(`President 😎`)
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