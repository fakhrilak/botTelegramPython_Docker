
const UserConsume = require("../Models/UsersConsume")

exports.ValidatingUser=async(bot,msg)=>{

    const first_name = msg.from.first_name
    const last_name = msg.from.last_name
    const Chat_Id = msg.chat.id
    console.log(msg.from)
    const panjangNama = first_name + last_name
    if(panjangNama< 6){
        bot.sendMessage(Chat_Id, "Please, change your user name min 6 karakter");
        return false
    }else{
        const CariUser = await UserConsume.findOne({idFromBot:msg.chat.id})
        if(!CariUser){
            const data = {
                firstName : first_name,
                lastName : last_name,
                idFromBot : Chat_Id,
                status:false
            }
            await UserConsume.create(data)
            bot.sendMessage(Chat_Id,"Please Contact @kevian53 to approve your account")
            return false
        }else{
            if (CariUser.status == false){
                bot.sendMessage(Chat_Id,"Please Contact @kevian53 to approve your akun, because your status is blocked")
                return false
            }else{
                console.log("hello")
                return true
            }
        }
             
    }
}

exports.ChangeStatus=async(bot,dataArray)=>{
    try{
        const CariPending = await UserConsume.find({status:false})
        if(CariPending[dataArray-1].status == true){
            bot.sendMessage(1314835139,"Users has been accepted before")
        }else{
            
            await UserConsume.updateOne( 
                { idFromBot : CariPending[dataArray-1].idFromBot },
                { $set: {status:true}},
                { upsert: true }
            )
            const validating = await UserConsume.findOne({idFromBot:CariPending[dataArray-1].idFromBot})
            bot.sendMessage(1314835139,`Accepted User ${validating.firstName} ${validating.lastName} status is ${validating.status}`)
            bot.sendMessage(parseInt(CariPending[dataArray-1].idFromBot),
            "Your Account Accepted, ketik /start untuk mendapatkan info penggunaan")
        }
        
    }catch(err){
        await bot.sendMessage(1314835139,err.message)
    }
    
}

exports.UserPending=async(bot)=>{
    const CariUser = await UserConsume.find({status:false})
    try{
        let dataSend = ""
        for (let A = CariUser.length-1; A > -1;A--){
            dataSend += (A+1) + ". " + CariUser[A].firstName+" "+CariUser[A].lastName + "\n"
        }
        await bot.sendMessage(1314835139,dataSend)
    }catch(err){
        await bot.sendMessage(1314835139,err.message)
    }
    
}

exports.UserAccept=async(bot)=>{
    const CariUser = await UserConsume.find({status:true})
    try{
        let dataSend = ""
        for (let A = CariUser.length-1; A > -1;A--){
            dataSend += (A+1) + ". " + CariUser[A].firstName+" "+CariUser[A].lastName + "\n"
        }
        await bot.sendMessage(1314835139,dataSend)
    }catch(err){
        await bot.sendMessage(1314835139,err.message)
    }
}

exports.ChangeStatusAccepted=async(bot,dataArray)=>{
    try{
        const CariPending = await UserConsume.find({status:true})
        console.log(CariPending[dataArray-1])
        if(CariPending[dataArray-1].status == false){
            bot.sendMessage(1314835139,"Users has been Blocked before")
        }else{
            
            await UserConsume.updateOne( 
                { idFromBot : CariPending[dataArray-1].idFromBot },
                { $set: {status:false}},
                { upsert: true }
            )
            const validating = await UserConsume.findOne({idFromBot:CariPending[dataArray-1].idFromBot})
            bot.sendMessage(1314835139,`Blocked User ${validating.firstName} ${validating.lastName} status is ${validating.status}`)
            bot.sendMessage(parseInt(CariPending[dataArray-1].idFromBot),
            "Your Account Blocked, from bot. Please Contact @kevian53")
        }
        
    }catch(err){
        await bot.sendMessage(1314835139,err.message)
    }
    
}
