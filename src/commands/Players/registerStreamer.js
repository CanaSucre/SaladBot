const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "enregistrer",
  description: "Enregistrer la salade préférée d'un streamer !",
  permission: "add_streamer",
  dev: true,
  guildId: [ "1006326620744855603" ],
  options: [
    {
      name: "streamer",
      description: "Pseudo du streamer",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "salade",
      description: "Salade préférée du streamer",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (bot, interaction, options) => {

    let streamer = options["streamer"].value;
    let salade = options["salade"].value;

    bot.getSalad(streamer, async function (result) {
      if (result == false) {
        interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true });
        return;
      };
      
      if (result != null) {
        bot.checkPerm(interaction.user.id, "edit_streamer", async function (permEdit) {
          if (permEdit == null) {
            interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true, });
            return;
          };
          if (!permEdit) {
            interaction.reply({ content: `❌ **Ce streamer est déjà enregistrer dans la base de donnée et vous n'avez pas la permission \`edit_streamer\` !**`, ephemeral: true, });
            return;
          };
  
          bot.checkSalade(salade, async function (salad) {
            if (!salad) {
              interaction.reply({ content: `🥗 **La salade que vous venez d'indiquer est invalide !**\n\n> Utilisez la commande \`/liste-salades\` pour afficher la liste des salades disponibles !`, ephemeral: true, });
              return;
            };
    
            let SQL = `UPDATE streamer SET salade = "${salade}" WHERE streamer = "${streamer}"`;
    
            bot.db.query(SQL, (err, result2) => {
              if (err) {
                console.log(err);
                interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true, });
                return;
              }
    
              let SQL2 = `UPDATE streamer SET last_edit = "${interaction.user.id}" WHERE streamer = "${streamer}"`;
              bot.db.query(SQL2, (err, result3) => {
                if (err) {
                  console.log(err);
                  interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true, });
                  return;
                };
    
                interaction.reply({ content: `✅ **Vous venez de changer la salade préférée de \`${streamer}\` de la salade \`${result.salade}\` à \`${salade}\` !**`, ephemeral: true, });
              });
            });
          });
        });
      } else {
        let post = {
          streamer: streamer,
          salade: salade,
          saisie: interaction.user.id
        };

        let SQL = `INSERT INTO streamer SET ?`

        bot.db.query(SQL, post, (err, result2) => {
          if (err) {
            console.log(err);
            interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true, });
            return;
          }

          interaction.reply({ content: `✅ **Vous venez de définir la salade préférée de \`${streamer}\` sur la salade \`${salade}\` !**`, ephemeral: true, });
        });
      };

    });
  },
};