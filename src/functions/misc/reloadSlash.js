module.exports = async bot => {
  /**
  * It's a function that is used to connect the Shard to the database.
  * @param {object} bot The Discord Client Istance 
  */

  bot.reloadSlash = async () => {

    bot.application.commands.set([])

    bot.guilds.cache.forEach(guild => {
      let listCmds = [];

      bot.commands.forEach(cmd => {
        if (cmd.guildId.includes(guild.id)) {
          listCmds.push({
            name: cmd.name,
            description: cmd.description,
            options: cmd.options,
          });
        };
      });

      guild.commands.set(listCmds);
    });

  };
};