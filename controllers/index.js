const dayjs = require("dayjs")
const QuoteNumber = require("../Models/quoteMessage")
const XLSX = require("xlsx");
const jsontoxml = require("jsontoxml");
const workbook = XLSX.readFile("file-example.xlsx");


const romawiConverter=(data)=>{
    const bulan = ["01","02","03","04","05","06","07","08","09","10","11","12"]
    const romawi = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"]
    for(let i = 0; i < bulan.length;i++){
        if(bulan[i]== data){
            return romawi[i]
        }
    }
}
exports.createQuote=async(bot,data,PT,cusName,proDescName,cp,ket)=>{
    
    const idFakhril = 892248157
    const first_name = data.from.first_name
    const last_name = data.from.last_name
    const cari = await QuoteNumber.find({pt:PT})
    const newdata = {
        quoteNumber : `0${cari.length+1}/${romawiConverter(dayjs(new Date).format('MM'))}/SPH/${PT}/${dayjs(new Date).format('YYYY')}`,
        user: first_name + " "+last_name,
        bulan: dayjs(new Date).format('MM'),
        tahun:dayjs(new Date).format('YY'),
        pt:PT,
        time : dayjs(new Date).format("dddd, MMMM D, YYYY h:mm A"),
        cusName:cusName,
        projectName: proDescName,
        ket: ket,
        cp:cp
    }
    const create = await QuoteNumber.create(newdata)
    bot.sendMessage(data.chat.id,create.quoteNumber + `\n\n Nama Customer : ${cusName} \n Nama Project : ${proDescName}`)
}

exports.infoBot=(bot,id)=>{
    const info = "Welcome bot QuoteNumber STT, ODI , MDI \n /get {nama pt} untuk info last quote number \n /create {nama pt} untuk membuat quote number baru \n /report {nama pt} untuk mendapatkan report dalam bentuk MS.Excel"
    const infoAdmin =  "Welcome bot QuoteNumber STT, ODI , MDI \n /get {nama pt} untuk info last quote number \n /create {nama pt} untuk membuat quote number baru \n /report {nama pt} untuk mendapatkan report dalam bentuk MS.Excel \n /accept {no} \n /reject \n /userPending \n /userAccepted"
    if(id == 1314835139){
        bot.sendMessage(id,infoAdmin)
        // bot.sendMessage(id,info)
    }else{
        bot.sendMessage(id,info)
    }
    
}

exports.getQuote=async(bot,data,PT)=>{
    try{
        const first_name = data.from.first_name
        const last_name = data.from.last_name
        const getMount = await QuoteNumber.find({pt:PT})
        let mount = 0
        for(let i = 0;i <getMount.length;i++){

            if(parseInt(getMount[i].bulan)>mount && parseInt(getMount[i].bulan) < parseInt(dayjs(new Date).format('MM')) ){
                mount = getMount[i].bulan
            }
        }
        const CariLastMount = await QuoteNumber.find({bulan:mount,pt:PT})
        const CariNowMount = await QuoteNumber.find({bulan:dayjs(new Date).format('MM'),pt:PT})
        console.log(CariNowMount)
        if(CariLastMount.length < 1){
            bot.sendMessage(data.chat.id,"Belum ada data untuk LAST MONTH "+ dayjs(new Date).format('MM')+"  "+PT)
        }else{
            bot.sendMessage(data.chat.id, `QUOTE NUMBER LAST MONTH ${mount}`+"\n\n"+CariLastMount[0].quoteNumber +`\n\n Nama Customer : ${CariLastMount[0].cusName} \n Nama Project : ${CariLastMount[0].projectName} \n Cp Customer : ${CariLastMount[0].cp} \n Keterangan : ${CariLastMount[0].ket}`)
        }
        if(CariNowMount.length < 1){
            bot.sendMessage(data.chat.id,"Belum ada data untuk NOW MONTH "+ dayjs(new Date).format('MM')+"  "+PT)
        }else{
            bot.sendMessage(data.chat.id,`QUOTE NUMBER NOW MONTH ${dayjs(new Date).format('MM')}`+ "\n\n"+CariNowMount[0].quoteNumber + `\n\n Nama Customer : ${CariNowMount[0].cusName} \n Nama Project : ${CariNowMount[0].projectName} \n Cp Customer : ${CariNowMount[0].cp} \n Keterangan : ${CariNowMount[0].ket}`)
        }
    }catch(err){
        bot.sendMessage(data.chat.id,err.message)
    }
    
}

exports.getReport=async(bot,msg,PT)=>{
    const workbook = XLSX.readFile("file-example.xlsx");
    let worksheets = {};
    for (const sheetName of workbook.SheetNames) {
        worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }

    console.log("xml:\n", jsontoxml({
        worksheets: JSON.parse(JSON.stringify(Object.values(worksheets))).map(worksheet => worksheet.map(data => {
            for (property in data) {
                const newPropertyName = property.replace(/\s/g, "");
                if (property !== newPropertyName) {
                    Object.defineProperty(data, newPropertyName,
                        Object.getOwnPropertyDescriptor(data, property));
                    delete data[property];
                }
            }
            return data;
        }))
    }, {}), "\n\n");
    const Cari = await QuoteNumber.find({pt:PT})
    for(let i  = 0;i<=Cari.length-1;i++){
        console.log(i)
        worksheets.Sheet1.push({
            "NO": i+1,
            "No Penawaran": Cari[i].quoteNumber,
            "TO": Cari[i].cusName,
            "UP": Cari[i].cp,
            "tanggal": Cari[i].time,
            "DESCRIPTION": Cari[i].projectName,
            "Creator": Cari[i].user,
            "Keterangan": Cari[i].ket,
        });
    }
    const newBook = XLSX.utils.book_new();
    const newSheet = XLSX.utils.json_to_sheet(worksheets.Sheet1);
    XLSX.utils.book_append_sheet(newBook, newSheet, "Sheet1");
    XLSX.writeFile(newBook,"Report Qoute Number.xlsx");
    bot.sendDocument(msg.chat.id,"Report Qoute Number.xlsx")
}