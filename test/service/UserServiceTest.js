const UserService = require('../../src/service/UserSevice').buildClass();

const removeBussiness = () => {
    let users = UserService.find();
    console.log(users);
    users = UserService.removeUserByClientID(users, "hole");
    console.log(users);
    console.log(UserService.find());
}

removeBussiness();