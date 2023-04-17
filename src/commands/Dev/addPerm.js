const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "permission-add",
  description: "Ajouter une permission à un utilisateur !",
  permission: null,
  dev: true,
  guildId: [ "1006326620744855603" ],
  options: [
    {
      name: "user",
      description: "Identifiant de l'utilisateur",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "permission",
      description: "Permission à ajouter",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "Ajouter un Streamer",
          value: "add_streamer",
        },
        {
          name: "Modifier un Streamer",
          value: "edit_streamer",
        },
        {
          name: "Supprimer un Streamer",
          value: "remove_streamer",
        },
        {
          name: "Gérer les Salades",
          value: "manage_salad",
        },
      ]
    },
  ],

  run: async (bot, interaction, options) => {

    let userId = options["user"].value;
    let permission = options["permission"].value;

    let SQL1 = `SELECT * FROM list_users WHERE id = "${userId}"`;    
    
    bot.db.query(SQL1, (err, result) => {
      if (err) {
        console.log(err);
        interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true });
        return;
      };

      if (result[0]) {
        let SQL2 = `UPDATE list_users SET ${permission} = "1" WHERE id = "${userId}"`;
        
        bot.db.query(SQL2, (err, result) => {
          if (err) {
            console.log(err);
            interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true });
            return;
          };

          interaction.reply({ content: `✅ **Vous venez d'ajouter la permission \`${permission}\` à l'utilisateur <@${userId}> !**`, ephemeral: true });
        });
      } else {
        let post = {
          id: userId,
          add_streamer: permission == "add_streamer" ? true: false,
          edit_streamer: permission == "edit_streamer" ? true: false,
          remove_streamer: permission == "remove_streamer" ? true: false,
          manade_salad: permission == "manade_salad" ? true: false,
        };

        let SQL2 = `INSERT INTO list_users SET ?`;
        
        bot.db.query(SQL2, post, (err, result) => {
          if (err) {
            console.log(err);
            interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true });
            return;
          };

          interaction.reply({ content: `✅ **Vous venez d'ajouter la permission \`${permission}\` à l'utilisateur <@${userId}> !**`, ephemeral: true });
        });
      };
    });
  },
};