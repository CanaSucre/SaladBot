const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "salade-classement",
  description: "Afficher les 10 salades préférées des streamers !",
  permission: null,
  dev: false,
  guildId: [ "1006326620744855603", "1002902115267657759" ],
  options: [],

  run: async (bot, interaction, options) => {

    interaction.reply(`👀 **Veuillez patienter, nous chargeons la base de données...**`)

    let sql = "SELECT * FROM streamer";

    bot.db.query(sql, async (err, result) => {
      if (err) {
        console.log(err)
        interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true });
        return;
      };

      let listSalads = {};

      await result.forEach(rslt => {
        if (listSalads[rslt.salade]) {
          listSalads[rslt.salade] = listSalads[rslt.salade] + 1;
        } else listSalads[rslt.salade] = 1;
      });

      let liste = [];

      for (const [salad, number] of Object.entries(listSalads)) {
        liste.push({ salad: salad, number: number });
      };

      liste.sort((a, b) => b.number - a.number);

      liste.splice(10);

      let embed = new EmbedBuilder()
        .setThumbnail(bot.user.displayAvatarURL({ format: "png" }))
        .setTitle(`<:salade:1097525024392482917> • Classement des Salades :`)
        .setDescription(`**Voici le classement des 10 salades préférées des streamers !**\n\n👑 ${liste.map(e => `\`${e.salad}\` - \`${e.number} streamers\` | ${(e.number/result.length*100).toFixed(1)}%`).join("\n➜ ")}`)
        .setColor("Green")

      interaction.reply({
        embeds: [embed],
        content: ``,
      });

    });
    
  },
};