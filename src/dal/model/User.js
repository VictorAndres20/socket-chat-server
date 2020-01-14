class User{
    constructor(clientID, name){
        this.clientID = clientID,
        this.name = name;
    }
}

const buildClass = (clientID, name) => {
    return new User(clientID, name);
}

module.exports = {buildClass};