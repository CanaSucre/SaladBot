const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "salade-supprimer-type",
  description: "Retirer une salade dans la liste des salades disponibles !",
  permission: "manage_salad",
  dev: false,
  guildId: [ "1006326620744855603", "1002902115267657759" ],
  options: [
    {
      name: "type",
      description: "Nom du type de salade à supprimers",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (bot, interaction, options) => {

    let saladName = options["type"].value;

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

        interaction.reply({ content: `✅ **Vous venez de supprimer avec succès la salade \`${saladName}\` de la base de données !**`, ephemeral: true  });
      });

    });
    
  },
};