require('./config/config');
//Some Other Configuration imports,
//for example socket.io, DataBase ORM or View Engine HBS
//const hbs = require('./hbs');

class Startup{
    constructor(server){
        this.server = server;
    }

    /** MAIN NETRY to call in index.js main file */
    async main() {
        
        //May be call some other function Configs, 
        //for example to init socket.io, DataBase ORM or View Engine

        //hbs.registerPartials();
        //hbs.registerHelpers();

        this.configureServer();
        let server = this.buildServer();
        require('./config/Socket').buildClass(server).connect();
        let start = await this.startServer(server);
        console.log(start);
    }

    startServer(server) {
        let port = process.env.PORT;
        return new Promise((resolve, reject) => {
            server.listen(port, (err) => {
                if(err) reject(err);

                resolve(`Server stated at port ${port}`);
            });
        });
    }

    configureServer() {
        this.server.enablePublicContent();
        this.server.enableBodyParser();
        //this.server.enableViewEngine('hbs');
        this.server.setRoutes();
        return this.server;
    }

    buildServer() {
        return this.server.buildHttpServer();
    }
}

const buildClass = (server) => {
    return new Startup(server);
}

module.exports = {buildClass}