const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "salade-streamer-aléatoire",
  description: "Afficher les salades préférées de 10 streamers aléatoires dans la base de données !",
  permission: null,
  dev: false,
  guildId: [ "1006326620744855603", "1002902115267657759" ],
  options: [],

  run: async (bot, interaction, options) => {

    let sql = "SELECT * FROM streamer";

    bot.db.query(sql, async (err, result) => {
      if (err) {
        console.log(err)
        interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true });
        return;
      };

      await bot.shuffleArray(result)
        .then(shuffled => {
          shuffled.splice(10);

          let embed = new EmbedBuilder()
            .setThumbnail(bot.user.displayAvatarURL({ format: "png" }))
            .setTitle(`<:salade:1097525024392482917> • Salades préférées :`)
            .setDescription(`**Voici la salade préférée de 10 streamers choisis aléatoirement dans la base de données !**\n\n${shuffled.map(e => `> ➜ \`${e.streamer}\` - \`${e.salade}\``).join("\n")}`)
            .setColor("Green")
  
        interaction.reply({
          embeds: [embed],
          content: ``,
        });
        });

    });
    
  },
};