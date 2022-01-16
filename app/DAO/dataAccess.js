const superagent = require('superagent');
require('dotenv').config()
const HTMLParser = require('node-html-parser');
const { myCache } = require('../service/cacheController');

const fetchAllData = async (req,res)=>{
    return new Promise(async (resolve, reject) =>{
        try {
            superagent.get(process.env.ENDPOINT_URL).end((err, response) => {
                if (err) { return console.log(err); }
                var root = HTMLParser.parse(response.text)
                var tdata = root.querySelectorAll('table tr')
                var AllCodeData = {}
                for(let data of tdata){
                    const code = data.firstChild.firstChild.rawText
                    const name = data.childNodes[1].firstChild.firstChild.rawText
                    const position = data.childNodes[1].firstChild.childNodes[3].rawText
                    AllCodeData[code]={code,name,position}
                }
                resolve(AllCodeData)
            });
            }catch (error){
                reject(error)
            }
    })
}
const getAllData = async (req, res) => {
    return new Promise(async (resolve, reject) =>{
        try {
            const totalData = await fetchAllData()
            myCache.set('total',totalData)
            res.status(200).json(totalData)

        }catch (error){
            res.status(500).json({msg: "Internal Server Error"})
        }
    })
}
const getCodeData =  async (req, res) => {
    try {
        let totalData  = await fetchAllData()
        myCache.set('total',totalData)
        const code = req.params.CODE

        const codeData = totalData[code]
        if(!codeData){
            res.status(404).json({
               msg: 'Invalid Code'
            })
        }else{
            res.status(200).json(codeData)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: "Internal Server Error"})
    }
}
module.exports = {
    getAllData,
    getCodeData
};