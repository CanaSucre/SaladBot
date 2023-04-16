module.exports = {
  eventName: "interactionCreate",

  run: async (bot, interaction) => {

    if (!interaction.isCommand()) return;

    if (interaction.user.bot) return;
    if (!interaction.guild) return;

    let slashCommand = bot.commands.get(interaction.commandName);

    if (!slashCommand) {
      interaction.reply({
        content: `❌ **Désolé, cette commande est introuvable sur le bot...**`,
        ephemeral: true,
      });
      return;
    };

    if (slashCommand.dev && interaction.user.id != bot.config.DEV_ID) {
      interaction.reply({
        content: `❌ **Désolé, cette commande est uniquement utilisable par Cana_sucre#9999 !**`,
        ephemeral: true,
      });
      return;
    };

    if (slashCommand.permission) {
      let canDoCommand = await bot.checkPerm(interaction.user.id, slashCommand.permission);

      if (!canDoCommand) {
        interaction.reply({
          content: `❌ **Désolé, vous devez avoir la permission \`${slashCommand.permission}\` pour effectuer cette commande !**`,
          ephemeral: true,
        });

        return;
      };
    };

    let cmdOptions = {};

    for (const options of Object.entries(interaction.options._hoistedOptions)) {
      cmdOptions[options[1].name] = {
        type: options[1].type,
        value: options[1].value
      };
    };

    slashCommand.run(bot, interaction, cmdOptions)

  },
};