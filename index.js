const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
    polling: true
});


const sendChat =process.env.group_id;
bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(sendChat, `${JSON.stringify(msg)}`);
    console.log(msg);
});
bot.on('message', msg => {
    const chatId = msg.chat.id;
    if (chatId === sendChat) {
        const sentUser = JSON.parse(msg.reply_to_message.text).id;
        bot.sendMessage(sentUser, msg.text);
    } else {
        bot.sendMessage(sendChat, `${JSON.stringify(
            {
                id: msg.chat.id,
                name: msg.chat.first_name + ' ' + msg.chat.last_name,
            }
        )}`);
        bot.sendMessage(sendChat, msg.text);
    }
});