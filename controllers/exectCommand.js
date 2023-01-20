const fs = require('fs');
const GetUserPerding=async(bot,msg,user,command)=>{
    try{
        let rawdata = fs.readFileSync('/etc/bottele/user.json');
        let users = JSON.parse(rawdata);
        let falseUser = ""
        let count = 0
        for(let i=0;i<users.length;i++){
            if(users[i].status == false){
                falseUser+=`${count}. ${users[i]["first_name"]} ${users[i]["last_name"]} \n`
                count+=1
            }
        }
        console.log(falseUser)
        return bot.sendMessage(msg.chat.id,falseUser)
    }catch(err){
        return bot.sendMessage(msg.chat.id,err.toString())
    }
}
const GetUserApprove=async(bot,msg,user,command)=>{
    try{
        let rawdata = fs.readFileSync('/etc/bottele/user.json');
        let users = JSON.parse(rawdata);
        let falseUser = ""
        let count = 0
        for(let i=0;i<users.length;i++){
            if(users[i].status == true){
                falseUser+=`${count}. ${users[i]["first_name"]} ${users[i]["last_name"]} \n`
                count+=1
            }
        }
        console.log(falseUser)
        return bot.sendMessage(msg.chat.id,falseUser)
    }catch(err){
        return bot.sendMessage(msg.chat.id,err.toString())
    }
}
const InfoIP=async(bot,msg,user,command)=>{
    try{
        let rawdata = fs.readFileSync('/etc/bottele/area.json');
        let allHost = JSON.parse(rawdata)
        let splited = msg.text.split(" ")
        if(splited.length == 1){
            return bot.sendMessage(msg.chat.id,JSON.stringify(allHost, null, 2))
        }else{
            let area = splited[1]
            allHost.map((data,index)=>{
                if(data["area_name"] == area){
                    // return bot.sendMessage(msg.chat.id,"oke ada")
                    let allHostStringed = " "
                    data["gate"].map((gate,index)=>{
                        allHostStringed+=" Nama Gate    = "+gate["gate_name"]+" \n"
                        allHostStringed+=" IP RASPBERRY = "+gate["ip_raspi"]+" \n"
                        allHostStringed+=" IP CAM PLAT  = "+gate["ip_cam_plat"]+" \n"
                        allHostStringed+=" IP CAM WAJAH = "+gate["ip_cam_wajah"]+" \n\n"
                    })
                    return bot.sendMessage(msg.chat.id,allHostStringed)
                }
            })
        }
     // return bot.sendMessage(msg.chat.id,"not found area name \n\n format like \n/infoip center")
    }catch(err){
        return bot.sendMessage(msg.chat.id,err.toString())
    }
}
const ApproveUser=async(bot,msg,user,command)=>{
    try{
        let rawdata = fs.readFileSync('/etc/bottele/user.json');
        let users = JSON.parse(rawdata);
        let falseUser = []
        let count = 0
        let splited = msg.text.split(" ")
        if(splited.length <=1){
            return bot.sendMessage(msg.chat.id,"Please insert parameter from command /userpending , example /approveuser 0")
        }
        for(let i=0;i<users.length;i++){
            if(users[i].status == false){
                falseUser.push(users[i])
                count+=1
            }
        }
        let id = parseInt(splited[1])
        let update = falseUser[id]
        update["status"] = true
        users.map((data,index)=>{
            if(data["id"] == update["id"]){
                users[index] = update
            }
        })
        let data = JSON.stringify(users, null, 4);
        fs.writeFileSync('/etc/bottele/user.json', data,(err) => {
            if (err) throw err;
            console.log('Data written to file') 
        })
        return bot.sendMessage(msg.chat.id,`Congratulation @${update["username"]} now you can command in this bot`)
    }catch(err){
        return bot.sendMessage(msg.chat.id,err.toString())
    }
}
const DeletUser=async(bot,msg,user,command)=>{
    try{
        let rawdata = fs.readFileSync('/etc/bottele/user.json');
        let users = JSON.parse(rawdata);
        let falseUser = []
        let count = 0
        let splited = msg.text.split(" ")
        if(splited.length <=1){
            return bot.sendMessage(msg.chat.id,"Please insert parameter from command /userapprove , example /deletuser 0")
        }
        for(let i=0;i<users.length;i++){
            if(users[i].status == true){
                falseUser.push(users[i])
                count+=1
            }
        }
        if(falseUser.length > 1){
            let id = parseInt(splited[1])
            let update = falseUser[id]
            update["status"] = false
            users.map((data,index)=>{
                if(data["id"] == update["id"]){
                    users[index] = update
                }
            })
            let data = JSON.stringify(users, null, 4);
            fs.writeFileSync('/etc/bottele/user.json', data,(err) => {
                if (err) throw err;
                console.log('Data written to file') 
            })
            return bot.sendMessage(msg.chat.id,`maap :( @${update["username"]}`)
        }else{
            return bot.sendMessage(msg.chat.id,`Cant delet last User`)
        }
    }catch(err){
        return bot.sendMessage(msg.chat.id,err.toString())
    }
}
const INFO=async(bot,msg,user,command)=>{
    try{
        let ket = "HELLO IAM SAFEPARKING ROBOT, USE ME : \
        \n\n \
        /userpending \
        \n        command ini digunakan untuk mengetahui user yang statusnya false \n\n\
        /approveuser \
        \n        command ini memiliki parameter, parameter diambil dari angka hasil /userpending\n\n\
        /infoip \
        \n         - command ini tanpa menggunakan param akan memberikan hasil fulljson seluruh area safeparking\n\
        \n         - command ini dengan nama lokasi akan memberikan info semua gate pada area tersebut\n\n\
        /userapprove \
        \n         command ini digunakan untuk melihat user dengan status true\n\n\
        /deletuser \
        \n         command ini digunakan untuk mengganti status user true menjadi false, dengan ada tambahan parameter angka /deletuser 0 \n\n\
        "
        return bot.sendMessage(msg.chat.id,ket)
    }catch(err){
        return bot.sendMessage(msg.chat.id,err.toString())
    }
}
const mapping = [
    {
        "route" : "/userpending",
        "func"  : GetUserPerding
    },
    {
        "route" : "/infoip",
        "func"  : InfoIP
    },
    {
        "route" : "/approveuser",
        "func"  : ApproveUser
    },
    {
        "route" : "/userapprove",
        "func"  : GetUserApprove
    },
    {
        "route" : "/deletuser",
        "func"  : DeletUser
    },
    {
        "route" : "/info",
        "func"  : INFO 
    }
]
exports.ControllersCommand=async(bot,msg,user,command)=>{
    mapping.map((data,index)=>{
        if(data["route"] == command){
            console.log(index)
            return data.func(bot,msg,user,command)
        }
    })
}