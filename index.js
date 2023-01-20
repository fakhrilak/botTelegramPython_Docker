require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express')
const app = express()
const { infoBot, createQuote, getQuote, getReport } = require('./controllers');
// const token = '5530814554:AAGd6iw3g2io91DBGMhaFRcCLHFULZycMJ4';
const token = "1766012588:AAEuu_ElH-4CeIBFxup18I59wIKAYdaypnE"
const {ValidatingUser,validatingConsumsingUsers} = require("./controllers/ValidatingUser")
const bot = new TelegramBot(token, {polling: true});
const fs = require('fs');
const port = 5050
const cors = require("cors");

app.use(cors());
app.use(express.json());

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

// bot.sendMessage(1314835139,"BOT STARTED")

bot.on('message', async(msg) => {
  const chatId = msg.chat.id;
  const onMessage = msg.text
  const Message = onMessage.split(" ")
  let rawdata = fs.readFileSync('/etc/bottele/user.json');
  let user = JSON.parse(rawdata);
  let rawdatacommand = fs.readFileSync('dataCommand.json')
  let command = JSON.parse(rawdatacommand)
  console.log(command," ============= ini")
  const userOne = await ValidatingUser(bot,msg,user)
  await validatingConsumsingUsers(bot,msg,userOne,command)
  // bot.sendMessage(892248157,userOne)
});

app.get('/api/v1/notifbot', (req, res) => {
  bot.sendMessage(892248157,"test")
  return res.send('Hello World!')
})

app.post('/api/v1/dev/notif', (req, res) => {
  console.log(req.body)
  
  let text = ""
  for (key in req.body) {
    (key,req.body[key])
    text += (key.toString()+" = "+req.body[key].toString()+"\n")
  }

  bot.sendMessage(892248157,text)
  return res.send({
    message : "Success",
    text : text
  })
})

app.post('/api/v1/setlement', (req, res) => {
  console.log(req.body)
  
  let text = ""
  for (key in req.body) {
    (key,req.body[key])
    text += (key.toString()+" = "+req.body[key].toString()+"\n")
  }

  bot.sendMessage(-614923967,text)
  return res.send({
    message : "Success",
    text : text
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
