const mysql = require('mysql');
const q = require('q');
let dboptions;


module.exports = async bot => {
    /**
    * It's a function that is used to connect the Shard to the database.
    * @param {object} bot The Discord Client Istance 
    */

     
    let connection = mysql.createConnection(bot.config.DATABASE)

    dboptions = bot.config.DATABASE;

    connection.connect(function(err){
        var d = q.defer();
        if(err) {
            console.log(err)
            console.log("[SALAD] - BDD - Connexion impossible à la base de donnée... nouvelle tentative....");
            d.reject();
            bot.db = reconnect(connection);
        }else {
            bot.db = connection;
            console.log("[SALAD] - BDD - Connexion établie avec la base de donnée.")
        }
    });

    
  };
  

//- Reconnection function
function reconnect(connection){
    //- Destroy the current connection variable
    if(connection) connection.destroy();

    //- Create a new one
    var connection = mysql.createConnection(dboptions);

    //- Try to reconnect
    connection.connect(function(err){
        if(err) {
            //- Try to connect every 2 seconds.
            console.log("[SALAD] - BDD - Tentative échouée lors de la connexion à la base de données... nouvelle tentative dans 2 secondes.");
            setTimeout(reconnect, 2000);
        }else {
            console.log("[SALAD] - BDD - Nouvelle connexion établie à la base de donnée !")
            return connection;
        }
    });
}