module.exports = async bot => {
  /**
  * It's a function that is used to connect the Shard to the database.
  * @param {object} bot The Discord Client Istance 
  */

  bot.shuffleArray = async (array) => {

    return new Promise(resolve => {
      let currentIndex = array.length,  randomIndex;

      while (currentIndex != 0) {
    
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      };
    
      resolve(array);
    });

  };
};