const quoteNumber = require("./Models/quoteMessage")

const Data = [
    {
      "quoteNumber": "001/I/SPH/STT/2021",
      "user": "",
      "bulan": "01",
      "tahun": 21,
      "pt": "STT",
      "time": "",
      "cusName": "MNC",
      "projectName": "Licensi",
      "ket": ""
    },
    {
      "quoteNumber": "002/I/SPH/STT/2021",
      "user": "",
      "bulan": "01",
      "tahun": 21,
      "pt": "STT",
      "time": "",
      "cusName": "MNC",
      "projectName": "Licensi",
      "ket": ""
    },
    {
      "quoteNumber": "003/I/SPH/STT/2021",
      "user": "",
      "bulan": "01",
      "tahun": 21,
      "pt": "STT",
      "time": "",
      "cusName": "MNC",
      "projectName": "Licensi",
      "ket": ""
    },
    {
      "quoteNumber": "004/I/SPH/STT/2021",
      "user": "",
      "bulan": "01",
      "tahun": 21,
      "pt": "STT",
      "time": "",
      "cusName": "MNC",
      "projectName": "Licensi",
      "ket": ""
    },
    {
      "quoteNumber": "005/I/SPH/STT/2021",
      "user": "",
      "bulan": "01",
      "tahun": 21,
      "pt": "STT",
      "time": "",
      "cusName": "SEKOLAH ISLAM ABU DZAR",
      "projectName": "JIBAS ENHANCEMENT",
      "ket": ""
    },
    {
      "quoteNumber": "006/IV/SPH/STT/2021",
      "user": "Unggul",
      "bulan": "04",
      "tahun": 21,
      "pt": "STT",
      "time": "",
      "cusName": "Gunung Selamet",
      "projectName": "",
      "ket": ""
    },
    {
      "quoteNumber": "006/I/SPH/STT/2021",
      "user": "",
      "bulan": "01",
      "tahun": 21,
      "pt": "STT",
      "time": "",
      "cusName": "EMC",
      "projectName": "Server Maintenance Services RS. EMC Sentul",
      "ket": "Ada Revisi sampai 4 x"
    },
    {
      "quoteNumber": "007/I/SPH/STT/2021",
      "user": "",
      "bulan": "01",
      "tahun": 21,
      "pt": "STT",
      "time": "",
      "cusName": "Compnet",
      "projectName": "Jasa Pemeraliharaan HW Oracle",
      "ket": ""
    },
    {
      "quoteNumber": "008/I/SPH/STT/2021",
      "user": "",
      "bulan": "01",
      "tahun": 21,
      "pt": "STT",
      "time": "",
      "cusName": "Sisindokom",
      "projectName": "ORACLE DATABASE MAINTENANCE SERVICES",
      "ket": ""
    },
    {
      "quoteNumber": "009/I/SPH/STT/2021",
      "user": "",
      "bulan": "01",
      "tahun": 21,
      "pt": "STT",
      "time": "",
      "cusName": "Virtus",
      "projectName": "IDPA INSTALLATION SERVICES",
      "ket": ""
    },
    {
      "quoteNumber": "010/II/SPH/STT/2021",
      "user": "",
      "bulan": "02",
      "tahun": 21,
      "pt": "STT",
      "time": "",
      "cusName": "Radinka anugra",
      "projectName": "Pengadaan Network",
      "ket": ""
    },
    {
      "quoteNumber": "011/II/SPH/STT/2021",
      "user": "",
      "bulan": "02",
      "tahun": 21,
      "pt": "STT",
      "time": "",
      "cusName": "BC",
      "projectName": "Jasa Pemeliharaan Perangkat Server PPDDP",
      "ket": ""
    },
    {
        "quoteNumber": "001/IV/SPH/ODI/2021",
        "user": "",
        "bulan": "04",
        "tahun": 21,
        "pt": "ODI",
        "time": "",
        "cusName": "PRO SISTIMATIKA AUTOMASI",
        "projectName": "BIG DATA INSTALLATATION AND MIGRATION",
        "ket": ""
    },
    {
      "quoteNumber": "002/IV/SPH/ODI/2021",
      "user": "",
      "bulan": "04",
      "tahun": 21,
      "pt": "ODI",
      "time": "",
      "cusName": "SATU ANUGRAH SOLUSINDO",
      "projectName": "BIG DATA SERVER AND STORAGE MIGRATION SERVICES",
      "ket": ""
    },
    
    {
      "quoteNumber": "001/I/SPH/MDI/2021",
      "user": "",
      "bulan": "01",
      "tahun": 21,
      "pt": "MDI",
      "time": "",
      "cusName": "PT. SOLUSI TRANSFORMA TEKNOLOGI",
      "projectName": "Pembuatan perangkat lunak National Logistik Ecosistem NLE",
      "ket": ""
    },
    {
      "quoteNumber": "002/I/SPH/MDI/2021",
      "user": "",
      "bulan": "01",
      "tahun": 21,
      "pt": "MDI",
      "time": "",
      "cusName": "PT. PRATAMA DATA MAKSIMA",
      "projectName": "NLE",
      "ket": ""
    },
    {
      "quoteNumber": "003/I/SPH/MDI/2021",
      "user": "",
      "bulan": "01",
      "tahun": 21,
      "pt": "MDI",
      "time": "",
      "cusName": "PT. KEMALA INTI SOLUSI",
      "projectName": "NLE",
      "ket": ""
    },
    {
      "quoteNumber": "004/I/SPH/MDI/2021",
      "user": "",
      "bulan": "01",
      "tahun": 21,
      "pt": "MDI",
      "time": "",
      "cusName": "PT. BERCA",
      "projectName": "Pembuatal Aplikasi TUFOL Create Ticket online",
      "ket": ""
    }
  ]

  for (let A = 19;A >0;A--){
      quoteNumber.create(Data[A])
  }