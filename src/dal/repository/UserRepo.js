class UserRepo{
    constructor(){
        this.fileHandler = require('../FileHandler').buildClass('users.json');
    }

    save(data) {
        this.fileHandler.writeFileSync(JSON.stringify(data));
        return data;
    }

    find() {
        return JSON.parse(this.fileHandler.readFileSync());
    }
}

const buildClass = () => {
    return new UserRepo();
}

module.exports = {buildClass};