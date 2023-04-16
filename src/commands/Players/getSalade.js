const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "salade",
  description: "Retrouver la salade préférée d'un streamer grâce à son pseudo !",
  permission: null,
  dev: false,
  guildId: [ "1006326620744855603" ],
  options: [
    {
      name: "streamer",
      description: "Pseudo du streamer recherché",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (bot, interaction, options) => {

    let streamer = options["streamer"].value;

    bot.getSalad(streamer, async function (result) {
      if (result == false) {
        interaction.reply({ content: `⚠️ **Une erreur est survenue avec la base de données !**`, ephemeral: true });
        return;
      };
      
      if (result == null) {
        interaction.reply({
          content: `😭 **\`${streamer}\` n'est actuellement pas enregistré dans la base de données !**`,
          ephemeral: true,
        });
        return;
        
      };

      interaction.reply({
        content: `🥗 La salade préférée de \`${result.streamer}\` est la salade \`${result.salade}\` !\n\n> **Enregistré par :** <@${result.saisie}>${result.last_edit ? `\n> **Dernière modification par :** <@${result.last_edit}>`: ""}`,
        ephemeral: true,
      });

    });
    
  },
};