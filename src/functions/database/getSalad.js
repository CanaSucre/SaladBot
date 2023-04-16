module.exports = async bot => {
  /**
  * It's a function that is used to connect the Shard to the database.
  * @param {object} bot The Discord Client Istance 
  */

  bot.getSalad = async (streamer, callbak) => {

    let SQL = `SELECT * FROM streamer WHERE streamer = ${streamer}`;

    bot.db.querry(SQL, async (err, result) => {
      if (err) {
        callbak(false);
      } else if (!result[0]) {
        callbak(null);
      } else {
        callbak(result[0]);
      };
    });
  };
};