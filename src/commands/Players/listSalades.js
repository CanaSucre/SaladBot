module.exports = {
  name: "salade-liste-type",
  description: "Afficher la liste de touts les types de salades disponibles !",
  permission: null,
  dev: false,
  guildId: [ "1006326620744855603", "1002902115267657759" ],
  options: [],

  run: async (bot, interaction, options) => {

    let SQL = `SELECT * FROM type_salade`;

    bot.db.query(SQL, async (err, result) => {
      if (err) {
        console.log(err);
        interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true, });
        return;
      };

      bot.checkPerm(interaction.user.id, "manage_salad", function (resultAddSalade) {
        if (resultAddSalade == null) {
          interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true, });
          return;
        };

        interaction.reply({
          content: `**Voici la liste des salades disponibles :**\n${result.map(e => `> - \`${e.salade}\``).join("\n")}\n\n> **Il y a ${result.length} types de salades enregistrés !**${resultAddSalade ? `\n➜ Utilisez les commandes \`/salade-ajouter-type\` et \`/salade-supprimer-type\` pour ajouter ou supprimer un type de salade !`: ""}`,
          ephemeral: true,
        });
      });


    })
    
  },
};