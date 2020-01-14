const messageUtil = require('../util/MessageUtil');

class ChatBusiness{
    constructor(){
        this.userService = require('./UserSevice').buildClass();
    }

    addUser(clientID, name) {
        if(this.userService.findUserByName(name) != null)
            return messageUtil.buildMessage(false, `Name ${name} is in use`, null);
        else{
            let user = require('../dal/model/User').buildClass(clientID, name);
            let users = this.userService.find();
            users = this.userService.addUser(users, user);
            return messageUtil.buildMessage(true, `User ${name} connected`, {
                user,
                users
            });
        }        
    }

    removeUser(clientID) {
        let users = this.userService.find();
        users = this.userService.removeUserByClientID(users, clientID);
        return messageUtil.buildMessage(true, `User disconnected`, {
            users
        });
    }

    findUsersConnected() {
        return this.userService.find();
    }
}

const buildClass = () => {
    return new ChatBusiness();
}

module.exports = {buildClass};