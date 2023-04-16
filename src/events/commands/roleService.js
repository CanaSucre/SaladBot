module.exports = {
  eventName: "interactionCreate",

  run: async (bot, interaction) => {

    if (interaction.isButton() && interaction.customId == "buttonRoleService") {
      let serviceRole = await interaction.guild.roles.cache.get("1006332823956885664");
  
      if (!interaction.member.roles.cache.has(serviceRole.id)) {
        interaction.member.roles.add(serviceRole);
        interaction.reply({ content: `✅ **Vous venez de rejoindre le rôle ${serviceRole} !**`, ephemeral: true});  
      } else {
        interaction.member.roles.remove(serviceRole);
        interaction.reply({ content: `😭 **Vous venez de quitter le rôle ${serviceRole} ! La team salade te remercie de ton service et te souhaite une bonne pause :)**`, ephemeral: true});
      };
    };

  },
};