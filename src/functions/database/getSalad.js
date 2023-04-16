module.exports = async bot => {
  /**
  * It's a function that is used to connect the Shard to the database.
  * @param {object} bot The Discord Client Istance 
  */

  bot.getSalad = async (streamer, callback) => {

    let SQL = `SELECT * FROM streamer WHERE streamer = "${streamer}"`;

    bot.db.query(SQL, async (err, result) => {
      if (err) {
        console.log(err);
        callback(false);
      } else if (!result[0]) {
        callback(null);
      } else {
        callback(result[0]);
      };
    });
  };
};