class UserService{
    constructor(){
        this.userRepo = require('../dal/repository/UserRepo').buildClass();
    }

    addUser(users, user) {
        users.push(user);
        return this.save(users);
    }

    removeUserByClientID(users, clientID) {
        users.map((user, key) => {
            if(user.clientID === clientID){
                users.splice(key, 1);
            }
        });
        return this.save(users);
    }

    findUserByName(name) {
        let users = this.find();
        let usersFinded = users.filter((user) => user.name === name);
        return usersFinded[0];
    }

    save(users) {
        return this.userRepo.save(users);
    }

    find() {
        return this.userRepo.find();
    }
}

const buildClass = () => {
    return new UserService();
}

module.exports = {buildClass};