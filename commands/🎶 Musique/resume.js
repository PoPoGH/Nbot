const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "reprise",
  aliases: ["resume",'rsu'],
  category: "🎶 Music",
  permissions: " ",
  description: "Reprendre la musique",
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
          `Veuillez rejoindre le channel vocal pour reprendre la musique ⚠`
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
        msg.delete({timeout : 5000})
    })

    //if they are not in the same channel, return error only check if connected
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.channel.send(
         new MessageEmbed()
                .setColor('#ED4245').setDescription(
          `Veuillez rejoindre le channel vocale ${message.guild.me.voice.channel.name} pour utiliser cette commande ⚠`
        )
      ).then((msg) => {
        msg.delete({timeout : 5000})
    })

    // if already paushed
    if (distube.isPlaying(message))  return message.channel.send(
         new MessageEmbed()
                .setColor('#ED4245')
        .setDescription(`La musique est déja en cours ....`)
    )
    distube.resume(message);

    message.channel.send(
       new MessageEmbed()
                .setColor('#2ECC71').setDescription(
        `Musique relancer par <@${message.author.id}>`
      )
    ).then((msg) => {
        msg.delete({timeout : 10000})
    })
  },
};
