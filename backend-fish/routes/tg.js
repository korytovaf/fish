const TelegramApi = require('node-telegram-bot-api')

const bot = new TelegramApi(process.env.TG_BOT_TOKEN)

bot.onText(/\/password (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  console.log(msg);

  await bot.sendMessage(chatId, resp);
});

// bot.on('message', msg => {
//   console.log('msg------++++++', msg)
// })

module.exports = bot
