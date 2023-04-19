const path = require("path");
const fs = require('fs').promises;
const createWriteStream = require('fs').createWriteStream;

const errorModule = {
    fileExists (path){
        try{
            await fs.access(path)
            return true
        }catch(error){
            return false
        }
    },
    log(err, context){
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
    },


    }

}

module.exports = errorModule;
