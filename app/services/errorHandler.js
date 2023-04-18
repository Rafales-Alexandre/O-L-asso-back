const APIError = require("./APIError");
const debug = require("debug")("error");
const path = require("path");
const fs = require('fs').promises;
const createWriteStream = require('fs').createWriteStream;

const errorModule = {
    async manage(err, req, res, next){
        errorModule.log(err, req.url);

        switch(err.code){
            case 400:
                res.status(400).json("Bad request");
                break;
            case 404: 
                res.status(404).json("Not found");
                 break;
            /* case 418;
                res.status(418).json("I'm a tea pot, leave me alone");
                break
            */
           default:
                res.status(err.code).json("Internal Server Error");
              break; 
        }
    }, 
    _404(_, __, next ){
        next(new APIError('Not found', 404))
    },
    async log(err, context){
        debug(err);
        const fileName = new Date().toISOString().slice(0,10)+".log";

        const filePath= path.resolve(__dirname, "../../../log") + "/" + fileName;
        console.log(filePath)
        const fileBody = `${new Date().toISOString()};${context};${err.message}\n`;
        console.log(fileBody)
        const isFileExist = await fileExists(filePath);
        
        try{
            if (!isFileExist){
                await fs.appendFile(filePath, "date;context;message\n");
            }
            let file = await fs.open(filePath, "a");
            await file.appendFile(fileBody);
            file.close();
        }catch(error){
            console.log(error)
        }
    }
};

module.exports = errorModule;

async function fileExists (path){
    try{
        await fs.access(path)
        return true
    }catch(error){
        return false
    }
};