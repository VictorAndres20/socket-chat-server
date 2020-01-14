const server = require('./src/server/Server').buildClass();
const startup = require('./src/server/Startup').buildClass(server);

startup.main()
.catch((err) => {
    console.log(err.message);
    process.exit();
});