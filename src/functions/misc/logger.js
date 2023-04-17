module.exports = async bot => {
  /**
  * It's a function that is used to connect the Shard to the database.
  * @param {object} bot The Discord Client Istance 
  */

  bot.logger = async (type, text) => {

    if (!type || !text) {
      bot.logger("ERROR", "Un bot.logger() ne contient pas de type ou de text !")
    };

    type = type.toUpperCase();

    console.log(`[SALAD] - ${type} - ${text}`);
  };
};