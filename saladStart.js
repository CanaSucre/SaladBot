const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
let bot = new Client({ intents: 3243773 });

bot.config = require("./config");
bot.commands = new Collection();

bot.login(bot.config.TOKEN);


loadCommands(bot);
loadEvents(bot);
loadScripts(bot);

async function loadCommands(bot, dir = "./src/commands") {
  readdirSync(dir).forEach(categories => {
    const commands = readdirSync(`${dir}/${categories}`).filter(files => files.endsWith(".js"));

    for (const cmd of commands) {
      const getFileName = require(`${dir}/${categories}/${cmd}`);
      bot.commands.set(getFileName.name, getFileName);
    };
  });
};

async function loadEvents(bot, dir = "./src/events") {
  readdirSync(dir).forEach(dirs => {
    const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const event of events) {
      const evt = require(`${dir}/${dirs}/${event}`);
      bot.on(evt.eventName, (...args) => evt.run(bot, ...args));
    };
  });
};

async function loadScripts(bot, dir = "./src/functions") {
  readdirSync(dir).forEach(dirs => {
    const scripts = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const script of scripts) {
      require(`${dir}/${dirs}/${script}`)(bot);
    };
  });
};