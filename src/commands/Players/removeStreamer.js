const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "salade-supprimer-streamer",
  description: "Retirer un streamer de la base de données !",
  permission: "remove_streamer",
  dev: false,
  guildId: [ "1006326620744855603" ],
  options: [
    {
      name: "streamer",
      description: "Nom du streamer à supprimer",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (bot, interaction, options) => {

    let streamer = options["streamer"].value;

    bot.getSalad(streamer, function (result) {
      if (!result) {
        interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true });
        return;
      };

      if (result == null) {
        interaction.reply({ content: `❌ **Le streamer \`${streamer}\` n'est actuellement pas enregistré dans la base de données !**`, ephemeral: true });
        return;
      };

      let SQL = `DELETE FROM streamer WHERE streamer = "${streamer}"`;

      bot.db.query(SQL, (err) => {
        if (err) {
          interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true });
          return;
        };

        interaction.reply({ content: `✅ **Vous venez de supprimer le streamer \`${streamer}\` de la base de données !** Il avait sélectionné la salade : \`${result.salade}\`.`, ephemeral: true });
      });
    });
  },
};