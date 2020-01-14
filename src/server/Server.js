const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

class Server{
    constructor(){
        this.app = express();
    }

    buildHttpServer() {
        return http.createServer(this.getApp());
    }

    enablePublicContent() {
        this.setMiddleware(express.static(path.join(__dirname,'../../public')));
    }

    enableBodyParser() {
        this.setMiddleware(bodyParser.urlencoded({extended: false}));
        this.setMiddleware(bodyParser.json());
    }

    setRoutes() {
        this.setMiddleware(require('../app/routes'));
    }

    enableViewEngine(engine) {
        //For example if you install hbs, pass parameter 'hbs'
        this.app.set('view engine', engine);
    }

    setMiddleware(middleware) {
        this.app.use(middleware);
    }

    getApp() {
        return this.app;
    }
}

const buildClass = () => {
    return new Server();
}

module.exports = {buildClass}