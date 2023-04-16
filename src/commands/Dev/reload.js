module.exports = {
  name: "reload",
  description: "Redémarrer le Bot",
  permission: null,
  dev: true,
  guildId: [ "1006326620744855603" ],
  options: [],

  run: async (bot, interaction, options) => {

    await interaction.reply({
      content: `✅ **Le bot va redémarrer...**`,
      ephemeral: true
    });

    process.exit();
  },
};