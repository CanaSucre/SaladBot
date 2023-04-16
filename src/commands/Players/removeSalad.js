const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "supprimer-salade",
  description: "Retirer une salade dans la liste des salades disponibles !",
  permission: "manage_salad",
  dev: true,
  guildId: [ "1006326620744855603" ],
  options: [
    {
      name: "salade",
      description: "Nom de la salade à supprimer",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (bot, interaction, options) => {

    let saladName = options["salade"].value;

    bot.checkSalade(saladName, async function (resultCheckSalade) {
      if (resultCheckSalade == null) {
        interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true });
        return;
      };

      if (!resultCheckSalade) {
        interaction.reply({ content: `❌ **Il n'éxiste aucune salade ayant comme nom \`${saladName}\` dans la base de données !**`, ephemeral: true });
        return;
      };

      let SQL = `DELETE FROM type_salade WHERE salade = "${saladName}"`;

      bot.db.query(SQL, (err) => {
        if (err) {
          interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true });
          return;
        };

        interaction.reply({ content: `✅ **Vous venez de supprimer avec succès la salade \`${saladName}\` de la base de données !**`, ephemeral: true });
      });

    });
    
  },
};