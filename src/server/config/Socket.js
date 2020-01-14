const SocketIO = require('socket.io');
/** socket.io Message IDs */
const CONN_MESSAGE_ID = 'connection';
const DISCONNECT_MESSAGE_ID = 'disconnect';

/** Custom Message IDs */
const USERS_MESSAGE_ID = 'connUsers';
const PRIVATE_MESSAGE_ID = 'privateMessage';

class Socket{
    constructor(httpServer){
        this.socket = SocketIO(httpServer);
        this.chatBusiness = require('../../service/ChatBusiness').buildClass();
    }

    connect() {
        this.socket.on(CONN_MESSAGE_ID, (client) => {
            console.log(`Client connected`);

            this.listenAndResponseSameBroadcast(client, 'conn', (data) => {
                return this.connectionHandler(client, data);
            }, USERS_MESSAGE_ID);

            this.listen(client, DISCONNECT_MESSAGE_ID, (data) => {
                console.log(`Client disconnected`);
                let dataBroadcast = this.disconnectionHandler(client, data);
                console.log(`Broadcast: ${JSON.stringify(dataBroadcast)}`);
                this.broadcast(client, USERS_MESSAGE_ID, dataBroadcast);
            });
            
            this.listenAndResponse(client, PRIVATE_MESSAGE_ID, (data) => {
                data.id = client.id;
                this.sendPrivateMessage(client, data);
                console.log(`SENDED: ${JSON.stringify(data)}`);
                return data;
            });

        });
    }

    connectionHandler(client, data) {
        let id = client.id;
        let {name} = data;
        return this.chatBusiness.addUser(id,name);
    }

    disconnectionHandler(client, data) {
        let id = client.id;
        return this.chatBusiness.removeUser(id);
    }

    sendPrivateMessage(client, data) {
        let {userID} = data;
        return this.broadcastTo(client, userID, PRIVATE_MESSAGE_ID, data);
    }

    listenAndResponseAndBroadcast(client, messageID, resCallback , messageIDBroadcast, broadcastCallback) {
        this.listenAndResponseAndAction(client, messageID, resCallback, (client, data) =>{
            this.broadcast(client, messageIDBroadcast, broadcastCallback(data));
        });
    }

    listenAndResponseSameBroadcast(client, messageID, resCallback, messageIDBroadcast) {
        this.listenAndResponseSameAction(client, messageID, resCallback, (client, res) => {
            this.broadcast(client, messageIDBroadcast, res);
        });
    }

    joinRoom(client, room) {
        client.join(room);
    }

    send(client, messageID, data) {
        return client.emit(messageID, data);
    }

    broadcast(client, messageID, data) {
        return client.broadcast.emit(messageID, data);
    }

    broadcastTo(client, clientId, messageID, data) {
        return client.broadcast.to(clientId).emit(messageID, data);
    }

    listen(client, messageID, callback) {
        client.on(messageID, (data) => {
            callback(data);
        });
    }

    listenAndResponse(client, messageID, resCallback) {
        client.on(messageID, (data, response) => {
            response(resCallback(data));
        });
    }

    listenAndResponseAndAction(client, messageID, resCallback , action) {
        client.on(messageID, (data, response) => {
            response(resCallback(data));
            action(client, data);
        });
    }

    listenAndResponseSameAction(client, messageID, resCallback , action) {
        client.on(messageID, (data, response) => {
            let res = resCallback(data);
            response(res);
            action(client, res);
        });
    }
}

const buildClass = (httpServer) => {
    return new Socket(httpServer);
}

module.exports = {buildClass};