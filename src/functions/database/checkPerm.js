module.exports = async bot => {
  /**
  * It's a function that is used to connect the Shard to the database.
  * @param {object} bot The Discord Client Istance 
  */

  bot.checkPerm = async (userId, permission, callback) => {

    let SQL = `SELECT * FROM list_users WHERE id = "${userId}"`;

    bot.db.query(SQL, async (err, results) => {
      if (err) {
        console.log(err);
        callback(null);
      } else if (!results[0]) {
        callback(false);
      } else {
        let result = results[0];

        if (result[permission] == 1) callback(true);
        else callback(false);
      };
    });

  };
};