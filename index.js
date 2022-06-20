const TelegramBot = require('node-telegram-bot-api');
const { infoBot, createQuote, getQuote, getReport } = require('./controllers');
const token = '1887633229:AAFHJkadxtXWqd7NJqksxZP7Nf8IwQQxLOc';
const {ValidatingUser, UserPending, ChangeStatus, UserAccept, ChangeStatusAccepted} = require("./controllers/ValidatingUser")
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

bot.sendMessage(1314835139,"BOT STARTED")

bot.on('message', async(msg) => {
  const chatId = msg.chat.id;
  const onMessage = msg.text
  const Message = onMessage.split(" ")
    if(await ValidatingUser(bot,msg) == true){
        if (msg.text == "/start"){
            infoBot(bot,chatId)
        }else if(Message[0]=="/get"){
              /////ROUTE GET
              if(Message.length < 2){
                  bot.sendMessage(chatId,
                      "contoh \n /get ODI"
                  )
              }else if(Message.length == 2){
                  getQuote(bot,msg,Message[1])
              }

        }else if(Message[0]=="/create"){
              ///ROUTE CREATE

              let cus = []
              var cusName = ""
              var projeactDesc = ""
              var ket = ""
              var cp = ""
              for(let A = 0 ;A <= Message.length-1 ;A++){
                if (Message[A] == "-u" || Message[A] == "-d" || Message[A] == "-c" ||Message[A] == "-k" ){
                    cus.push(A)
                }
              }
              for(let A = cus[0]+1;A <= cus[1]-1;A++){
                cusName = cusName + Message[A] + " "
              }
              for(let A = cus[1]+1;A <= cus[2]-1;A++){
                projeactDesc = projeactDesc + Message[A] + " "
              }
              for(let A = cus[2]+1;A <= cus[3]-1;A++){
                cp = cp + Message[A] + " "
              }
              for(let A = cus[3]+1;A <= Message.length-1;A++){
                ket = ket + Message[A] + " "
              }
              if(Message.length < 2){
                  bot.sendMessage(chatId,
                      "contoh \n /create ODI"
                  )
              }
              if(Message.length >= 2){
                  if(cus.length != 4){
                    bot.sendMessage(chatId,"jangan lupa tambahkan -u{spasi} dan -d{spasi} -c{spasi} -k{spasi}")
                  }else{
                    createQuote(bot,msg,Message[1],cusName,projeactDesc,cp,ket)
                  }
                  
              }
        }else if(Message[0] == "/report"){
          ///ROUTE REPORT

              if(Message.length < 2){
                bot.sendMessage(chatId,
                    "contoh \n /report ODI"
                )
              }
              else if(Message.length >= 2){
                getReport(bot,msg,Message[1])

              }
        }else if(Message[0] == "/accept"){
          if(chatId!=1314835139){
            bot.sendMessage(chatId,"Only Kevian can use this route")
          }else{
            await ChangeStatus(bot,Message[1])
          }
        }else if(Message[0] == "/userPending"){
          if(chatId!=1314835139){
            bot.sendMessage(chatId,"Only Kevian can use this route")
          }else{
             await UserPending(bot)
          } 
        }else if(Message[0] == "/reject"){
          if(chatId!=1314835139){
            bot.sendMessage(chatId,"Only Kevian can use this route")
          }else{
            await ChangeStatusAccepted(bot,Message[1])
          }
        }else if(Message[0] == "/userAccepted"){
          if(chatId!=1314835139){
            bot.sendMessage(chatId,"Only Kevian can use this route")
          }else{
             await UserAccept(bot)
          } 
        }
    }
});
