module.exports = {
  name: "salade",
  description: "Retrouver la salade prononcée par un streamer par son pseudo !",
  permission: null,
  dev: true,
  guildId: [""],
  options: [
    {
      name: "streamer",
      description: "Pseudo du streamer recherché",
      type: "STRING",
      required: true,
    },
  ],

  run: async (bot, interaction, options) => {

    let streamer = options["streamer"].value;

    bot.getSalad(streamer, async function (result) {
      if (result == false) {
        interaction.reply({
          content: `⚠️ **Une erreur est survenue avec la base de données !**`,
          ephemeral: true,
        });
        return;
      };
      
      if (result == null) {
        interaction.reply({
          content: `😭 **\`${streamer}\` n'est actuellement pas enregistré dans la base de données !`,
          ephemeral: true,
        });
        return;
      };

      interaction.reply({
        content: `🥗 **La salade préférée de \`${result.streamer}\` est la salade : \`${result.salade}\` !
> **Enregistré par :** <@${result.saisie}>
${result.last_edit ? `> **Dernière modification par :** <@${result.last_edit}>`: ""}
        `,
        ephemeral: true,
      });

    });
    
  },
};