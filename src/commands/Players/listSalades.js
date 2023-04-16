module.exports = {
  name: "liste-salades",
  description: "Afficher la liste de toutes les salades disponibles !",
  permission: null,
  dev: true,
  guildId: [ "1006326620744855603" ],
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
          content: `**Voici la liste des salades disponibles :**\n${result.map(e => `> - \`${e.salade}\``).join("\n")}${resultAddSalade ? `\n\n➜ Utilisez les commandes \`/ajouter-salade\` et \`/supprimer-salade\` pour ajouter ou supprimer un type de salade !**`: ""}`,
          ephemeral: true,
        });
      });


    })
    
  },
};