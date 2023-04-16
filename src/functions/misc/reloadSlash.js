module.exports = async bot => {
  /**
  * It's a function that is used to connect the Shard to the database.
  * @param {object} bot The Discord Client Istance 
  */

  bot.reloadSlash = async () => {

    bot.commands.forEach(cmd => {
      cmd.guildId.forEach(guildId => {

        bot.application.commands.create({
          name: cmd.name,
          description: cmd.description,
          options: cmd.options,
        }, guildId);

      });
    });

  };
};