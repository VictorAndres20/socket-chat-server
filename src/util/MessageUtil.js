const buildMessage = (ok, msg, data) => {
    return {
        ok,
        msg,
        data
    }
}

module.exports = {
    buildMessage
}