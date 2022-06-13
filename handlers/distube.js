const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix, config } = require("..");
const distube = require("../utils/distubeClient");
const ee = require('../config/embed.json')
/**
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports = async (client, message, args) => {
  const status = (queue) =>
    `Volume: ${queue.volume}% | Filtre : ${queue.filter || " ❌ Off"} | Répétition: ${
    queue.repeatMode
      ? queue.repeatMode == 2
        ? "Toute la files d'attente"
        : " ✅ Cette musique"
      : "Off"
    } | Autoplay: ${queue.autoplay ? " ✅ On" : " ❌ Off"}`;

  // play song
  distube.on("playSong", (message, queue, song) => {
    message.channel
      .send(
        new MessageEmbed()
          .setColor('#1F8B4C')
          .setTitle(`Lecture en cours`)
          .setDescription(`Musique: [\`${song.name}\`](${song.url})`)
          .addField("Ajouter par:", `>>> ${song.user}`, true)
          .addField(
            "Durée:",
            `>>> \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``,
            true
          )
          .setThumbnail(song.thumbnail)
          .setFooter(status(queue))
      )
      .then(async (msg) => {
        await msg.react("⏭");
        await msg.react("⏯");
        await msg.react("🔉");
        await msg.react("🔊");
        await msg.react("🔁");

        const filter = (reaction, user) =>
          ["⏭", "⏯", "🔉", "🔊", "🔁", "⏹"].includes(
            reaction.emoji.id || reaction.emoji.name
          ) && user.id !== message.client.user.id;
        var collector = await msg.createReactionCollector(filter, {
          time: song.duration > 0 ? song.duration * 1000 : 600000,
        });

        collector.on("collect", async (reaction, user) => {
          //return if no queue available
          if (!queue) return;

          //create member out of the user
          const member = reaction.message.guild.member(user);

          //remoe the reaction
          reaction.users.remove(user);

          if (
            !member.voice.channel ||
            member.voice.channel.id !== member.guild.me.voice.channel.id
          )
            return message.channel.send(
              new MessageEmbed()
                .setColor('#ED4245').setDescription(
                  " Veuillez rejoindre un channel vocal ⚠"
                )
            );

          switch (reaction.emoji.id || reaction.emoji.name) {
            // skip reaction
            case "⏭":
              queue.playing = true;
              reaction.users.remove(user).catch(console.error);
              queue.connection.dispatcher.end();
              message.channel
                .send(
                  new MessageEmbed()
                    .setColor(ee.color).setDescription(
                      `\`Musique Skip\` Par ${message.author.username}`
                    )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 5000,
                  });
                });
              collector.stop();
              break;

            // pause and resume reaction

            case "⏯":
              reaction.users.remove(user).catch(console.error);
              if (queue.playing) {
                queue.playing = !queue.playing;
                distube.pause(message);
                message.channel
                  .send(
                    new MessageEmbed()
                      .setColor(ee.color).setDescription(
                        `⏸ La musique à été mis en pause par <@${message.author.id}>`
                      )
                  )
                  .then((msg) => {
                    msg.delete({
                      timeout: 5000,
                    });
                  });
              } else {
                queue.playing = !queue.playing;
                distube.resume(message);
                message.channel
                  .send(
                    new MessageEmbed()
                      .setColor(ee.color).setDescription(
                        `▶ La musique a été rétablie par <@${message.author.id}>`
                      )
                  )
                  .then((msg) => {
                    msg.delete({
                      timeout: 5000,
                    });
                  });
              }
              break;

            // decrease Volume
            case "🔉":
              reaction.users.remove(user).catch(console.error);
              if (queue.volume - 10 <= 0) queue.volume = 0;
              else queue.volume = queue.volume - 10;
              queue.connection.dispatcher.setVolumeLogarithmic(
                queue.volume / 100
              );
              queue.textChannel;
              message.channel
                .send(
                  new MessageEmbed()
                    .setColor('#ED4245').setDescription(
                      `🔉 Le volume est maintenant à ${queue.volume}%`
                    )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 5000,
                  });
                });
              break;

            // increase Volume
            case "🔊":
              reaction.users.remove(user).catch(console.error);
              if (queue.volume + 10 >= 1000) queue.volume = 100;
              else queue.volume = queue.volume + 10;
              queue.connection.dispatcher.setVolumeLogarithmic(
                queue.volume / 100
              );
              message.channel
                .send(
                  new MessageEmbed()
                    .setColor('#2ECC71').setDescription(
                      `🔊 Le volume est maintenant à ${queue.volume}%`
                    )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 5000,
                  });
                });
              break;

            // Loop reaction
            case "🔁":
              reaction.users.remove(user).catch(console.error);
              queue.loop = !queue.loop;
              message.channel
                .send(
                  new MessageEmbed()
                    .setColor('#2ECC71').setDescription(
                      `Mode Répétition : ${queue.loop ? "**✅ On**" : "**❌ Off**"}`
                    )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 5000,
                  });
                });
              break;

            // Stop reaction
            case "⏹":
              reaction.users.remove(user).catch(console.error);
              queue.songs = [];
              message.channel
                .send(
                  new MessageEmbed()
                    .setColor('#ED4245').setDescription(
                      `⏹ Musique arreté par <@${message.author.id}>`
                    )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 5000,
                  });
                });
              try {
                queue.connection.dispatcher.end();
              } catch (error) {
                console.error(error);
                queue.connection.disconnect();
              }
              collector.stop();
              break;

            default:
              reaction.users.remove(user).catch(console.error);
              break;
          }
        });
        collector.on("end", () => {
          msg.reactions.removeAll();
          msg.delete({
            timeout: 10000,
          });
        });
      });
  });

  // add song
  distube.on("addSong", (message, queue, song) => {
    message.channel
      .send(
        new MessageEmbed()
          .setColor('#2ECC71')
          .setTitle("🎶 Musique ajoutée!")
          .setDescription(
            `>>> Musique: [\`${song.name}\`](${song.url}) \n Durée 🎱 \`${song.formattedDuration}\``
          )
          .setFooter(`Ajoutée par : <@${message.author.id}>\n${status(queue)}}`)
      )
      .then((msg) => {
        msg.delete({ timeout: 10000 });
      });
  });

  // add list
  distube.on("addList", (message, queue, playlist) => {
    message.channel
      .send(
        new MessageEmbed()
        .setColor('#2ECC71')
          .setTitle("🎶 Playlist ajouté!")
          .setDescription(
            `>>> Playlist: [\`${playlist.name}\`](${
            playlist.url
            }) \n Durée 🎱 \`${
            playlist.formattedDuration
            }\` \n Nombre de musique : ${playlist.songs.length} \n${status(
              queue
            )}`
          )
          .setFooter(`Ajouté par: ${message.author.tag}\n${status(queue)}}`)
      )
      .then((msg) => {
        msg.delete({ timeout: 10000 });
      });
  });

  // add playlist
  distube.on("playList", (message, queue, playlist) => {
    message.channel
      .send(
        new MessageEmbed()
        .setColor('#2ECC71')
          .setTitle("🎶 PlayList ajouté!")
          .setDescription(
            `>>> PlayList: [\`${playlist.name}\`](${playlist.url}) \n Durée 🎱 \`${playlist.formattedDuration}\` \` \n Nombre de musique : ${playlist.songs.length} \n \n Ajouté par ${playlist.user}`
          )
          .setFooter(`Ajouté par: ${message.author.tag}\n${status(queue)}}`)
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });

  // search result
  distube.on("searchResult", (message, result) => {
    let i = 0;
    message.channel.send(
      new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`Your Search Result >>> ${result.length}`)
        .addField(
          `**Choose an option from below**\n${result
            .map(
              (song) =>
                `**${++i}**. ${song.name} - \`${song.formattedDuration}\``
            )
            .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`,
          true
        )
        .setFooter(
          `Requested by: ${
          message.author.tag
          } , ${message.author.displayAvatarURL({ dynamic: true })}}}`
        )
    );
  });

  // search cancel
  distube.on("searchCancel", () => {
    message.channel
      .send(new MessageEmbed()
        .setColor(ee.color).setDescription(`Your Search Canceled`))
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });
  distube.on("error", (message, e) => {
    console.log(e);
  });

  distube.on("initQueue", (queue) => {
    queue.autoplay = false;
    queue.volume = 75;
    queue.repeatMode = false;
  });

  distube.on("finish", (message) => {
    message.channel
      .send(
        new MessageEmbed()
        .setColor('#ED4245').setTitle(
            `La musique est terminée 🚩`
          )
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });

  distube.on("empty", (message) => {
    message.channel
      .send(
        new MessageEmbed()
          .setColor(ee.color).setDescription(
            `Nothing Playing \n i am in VC \nThanks to My Owner`
          )
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });
};
