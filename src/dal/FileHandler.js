const fs = require('fs');
const path = require('path');

class FileHandler{
    constructor(fileName){
        this.filePath = path.join(__dirname, '../../data', fileName);
    }

    writeFileSync(data) {
        fs.writeFileSync(this.filePath, data);
    }
    
    readFileSync() {
        return fs.readFileSync(this.filePath, 'utf8');
        //return require(pathFile); // This has cache or something
    }
}

const buildClass = (fileName) => {
    return new FileHandler(fileName);
}

module.exports = {buildClass};