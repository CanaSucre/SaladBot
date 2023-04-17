const { ChannelType } = require("discord.js");

module.exports = {
  eventName: "interactionCreate",

  run: async (bot, interaction) => {

    if (!interaction.isCommand()) return;

    if (interaction.user.bot) return;
    if (!interaction.guild) return;

    let authorizedChannel = true;

    if (interaction.guild.id == "1002902115267657759") {
      authorizedChannel = false;
      if (interaction.channel.type != ChannelType.GuildText && interaction.channel.type != ChannelType.PublicThread && interaction.channel.type != ChannelType.PrivateThread) {
        interaction.reply({ content: "❌ **Vous devez être dans un salon textuel ou dans un thread pour utiliser le bot !**", ephemeral: true })
        return;
      }

      if (interaction.channel.type == ChannelType.GuildText && interaction.channel.id == "1004857335669346424") {
        authorizedChannel = true;
      };

      if ((interaction.channel.type == ChannelType.PublicThread || interaction.channel.type == ChannelType.PrivateThread) && interaction.channel.parent == "1004857335669346424") {
        authorizedChannel = true;
      };
    };

    if (!authorizedChannel) {
      interaction.reply({ content: "❌ **Vous devez être dans le salon <#1004857335669346424> ou l'un de ses threads pour utiliser le bot !**", ephemeral: true })
      return;
    };

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

      bot.checkPerm(interaction.user.id, slashCommand.permission, function (result) {
        if (result == null) {
          interaction.reply({
            content: `⚠️ **Une erreur est survenue avec la base de données !**`,
            ephemeral: true,
          });
          return;
        };
  
        if (!result) {
          interaction.reply({
            content: `❌ **Désolé, vous devez avoir la permission \`${slashCommand.permission}\` pour effectuer cette commande !**\n\n> Contactez \`Cana_sucre#9999\` pour récupérer cette permission.`,
            ephemeral: true,
          });
          return;
        };

        endStart();
      });
    } else endStart();


    function endStart() {
      let cmdOptions = {};

      for (const options of Object.entries(interaction.options._hoistedOptions)) {
        cmdOptions[options[1].name] = {
          type: options[1].type,
          value: options[1].value
        };
      };
  
      slashCommand.run(bot, interaction, cmdOptions);
    }

  },
};