const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "stop",
  aliases: ["s"],
  category: "🎶 Music",
  permissions: " ",
  description: "Arrête de jouer la musique",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { channel } = message.member.voice;

    //if member not connected return error
    if (!channel)
      return message.channel.send(
         new MessageEmbed()
                 .setColor('#ED4245').setDescription(
          `Veuillez rejoindre un canal vocal pour jouer une musique ⚠`
        )
      ).then((msg) => {
        msg.delete({timeout : 5000})
    })

    //If Bot not connected, return error
    if (!message.guild.me.voice.channel)
      return message.channel.send(
         new MessageEmbed()
                .setColor('#ED4245').setDescription(`Rien n'est jouer pour le moment ⚠`)
      ).then((msg) => {
        message.guild.me.voice.channel.leave()
        msg.delete({timeout : 5000})
    })

    //if they are not in the same channel, return error only check if connected
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.channel.send(
         new MessageEmbed()
                .setColor(ee.color).setDescription(
          `Veuillez rejoindre le channel vocale ${message.guild.me.voice.channel.name} pour utiliser cette commande`
        )
      ).then((msg) => {
        message.guild.me.voice.channel.leave()
        msg.delete({timeout : 10000})
    })

    distube.stop(message);

    message.channel.send(
       new MessageEmbed()
                .setColor(ee.color).setDescription(
        `La musique à étais arreté par <@${message.author.id}>`
      )
    ).then((msg) => {
        message.guild.me.voice.channel.leave()
        msg.delete({timeout : 5000})
    })
  },
};
