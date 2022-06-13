const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "suivante",
  aliases: ["skip"],
  category: "🎶 Music",
  permissions: " ",
  description: "Met la musique suivante",
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
          `Veuillez rejoindre un channel vocal pour jouer une musique ⚠`
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

    distube.skip(message);

    message.channel.send(
       new MessageEmbed()
                .setColor('#2ECC71').setDescription(
        `<@${message.author.id}> à mis la musique suivante`
      )
    ).then((msg) => {
        msg.delete({timeout : 10000})
    })
  },
};
