
const UserConsume = require("../Models/UsersConsume")
const {ControllersCommand} = require("../controllers/exectCommand")
const fs = require('fs');
exports.ValidatingUser=async(bot,msg,users)=>{
    try{
        for(let i =0;i<users.length;i++){
            if (users[i].id == msg.from.id && users[i].status == false){
                let admin = getAdmin(users)
                bot.sendMessage(msg.chat.id,"Please contact admin"+admin+ ", akun anda belom terdaftar di bot ini")
                return false
            }else if (users[i].id == msg.from.id && users[i].status == true){
                // bot.sendMessage(msg.chat.id,"oke anda terdaftar")
                return users[i]
            }
        }
        let admin = getAdmin(users)
        let user = msg.from
        user["type"] = 3
        user["status"] = false
        users.push(user)
        writeUSER(users)
        // return bot.sendMessage(msg.chat.id,"Wellcome to bot parking management system")
        return false
    }catch(err){
        console.log(err)
        return bot.sendMessage(892248157,err)
    }
}

const getAdmin=(users)=>{
    try{
        let text = ""
        for(let i = 0;i<users.length;i++){
            if(users[i].type == 1){
                text+=", @"+users[i].username
            }
        }
        return text
    }catch(err){
        return bot.sendMessage(892248157,err)
    }
}

const writeUSER=async(users)=>{
    let data = JSON.stringify(users, null, 4);
    console.log(data)
    fs.writeFileSync('/etc/bottele/user.json', data,(err) => {
        console.log(data)
        if (err) throw err;
        console.log('Data written to file') 
    })
}

exports.validatingConsumsingUsers=async(bot,msg,user,command)=>{
    try{
        console.log("masuk sini ga",command)
        for(let i =0;i<command.length;i++){
            let mess = msg.text.split(" ")
            if (mess[0]== command[i].command){
                for(let j = 0 ; j < command[i].acceptedrole.length;j++){
                    if (user.role == command[i].acceptedrole[j]){
                        // return bot.sendMessage(msg.chat.id,"manteeeep")
                        return ControllersCommand(bot,msg,user,command[i]["command"])
                    }
                }
                console.log(" ---------------- INI ")
                return bot.sendMessage(msg.chat.id,"protected role")
            }
        }
        return bot.sendMessage(msg.chat.id,"Command not found")
    }catch(err){
        return bot.sendMessage(msg.chat.id,err.toString())
    }
}
// exports.ChangeStatus=async(bot,dataArray)=>{
//     try{
//         const CariPending = await UserConsume.find({status:false})
//         if(CariPending[dataArray-1].status == true){
//             bot.sendMessage(1314835139,"Users has been accepted before")
//         }else{
            
//             await UserConsume.updateOne( 
//                 { idFromBot : CariPending[dataArray-1].idFromBot },
//                 { $set: {status:true}},
//                 { upsert: true }
//             )
//             const validating = await UserConsume.findOne({idFromBot:CariPending[dataArray-1].idFromBot})
//             bot.sendMessage(1314835139,`Accepted User ${validating.firstName} ${validating.lastName} status is ${validating.status}`)
//             bot.sendMessage(parseInt(CariPending[dataArray-1].idFromBot),
//             "Your Account Accepted, ketik /start untuk mendapatkan info penggunaan")
//         }
        
//     }catch(err){
//         await bot.sendMessage(1314835139,err.message)
//     }
    
// }

exports.UserPending=async(bot,msg,users)=>{
    
    try{
        for(let i = 0;i<users.length;i++){
            console.log(users[i])
        }
        await bot.sendMessage(892248157,users)
    }catch(err){
        // await bot.sendMessage(1314835139,err.message)
        console.log(err)
    }
    
}

// exports.UserAccept=async(bot)=>{
//     const CariUser = await UserConsume.find({status:true})
//     try{
//         let dataSend = ""
//         for (let A = CariUser.length-1; A > -1;A--){
//             dataSend += (A+1) + ". " + CariUser[A].firstName+" "+CariUser[A].lastName + "\n"
//         }
//         await bot.sendMessage(1314835139,dataSend)
//     }catch(err){
//         await bot.sendMessage(1314835139,err.message)
//     }
// }

// exports.ChangeStatusAccepted=async(bot,dataArray)=>{
//     try{
//         const CariPending = await UserConsume.find({status:true})
//         console.log(CariPending[dataArray-1])
//         if(CariPending[dataArray-1].status == false){
//             bot.sendMessage(1314835139,"Users has been Blocked before")
//         }else{
            
//             await UserConsume.updateOne( 
//                 { idFromBot : CariPending[dataArray-1].idFromBot },
//                 { $set: {status:false}},
//                 { upsert: true }
//             )
//             const validating = await UserConsume.findOne({idFromBot:CariPending[dataArray-1].idFromBot})
//             bot.sendMessage(1314835139,`Blocked User ${validating.firstName} ${validating.lastName} status is ${validating.status}`)
//             bot.sendMessage(parseInt(CariPending[dataArray-1].idFromBot),
//             "Your Account Blocked, from bot. Please Contact @kevian53")
//         }
        
//     }catch(err){
//         await bot.sendMessage(1314835139,err.message)
//     }
    
// }
