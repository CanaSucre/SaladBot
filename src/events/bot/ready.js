module.exports = {
  eventName: "ready",

  run: async (bot) => {

    bot.log("connection", `Bot connecté avec succès en tant que ${bot.user.username} | ${bot.user.id} !`);

  },
};