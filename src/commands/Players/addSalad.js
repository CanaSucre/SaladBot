const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "salade-ajouter-type",
  description: "Ajouter une salade dans la liste des salades disponibles !",
  permission: "manage_salad",
  dev: false,
  guildId: [ "1006326620744855603" ],
  options: [
    {
      name: "type",
      description: "Nom du type de salade à ajouter",
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

      if (resultCheckSalade) {
        interaction.reply({ content: `❌ **Il éxiste déjà la salade \`${saladName}\` dans la base de données !**`, ephemeral: true });
        return;
      };

      let post = {
        salade: saladName
      };
  
      let SQL = "INSERT INTO type_salade SET ?";
  
      bot.db.query(SQL, post, async (err, result) => {
        if (err) {
          interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true });
          return;
        };
  
        interaction.reply({ content: `✅ **Vous venez d'ajouter la salade \`${saladName}\` dans la base de données avec succès !**`, ephemeral: true  })
      });
    });
    
  },
};