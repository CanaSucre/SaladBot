module.exports = {
  eventName: "ready",

  run: async (bot) => {

    bot.logger("connection", `Bot connecté avec succès en tant que ${bot.user.username} | ${bot.user.id} !`);

    bot.reloadSlash();
  },
};