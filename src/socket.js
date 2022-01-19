import { io } from "socket.io-client";

let socket
//let listeners = ['room-joined']

function init(url, options, onConnect) {
    socket = io(url, options)
    socket.on('connect', () => {
        onConnect(socket)
    })
}

function disconnect() {
    if (socket) {
        socket.disconnect()
        socket = null
    }
    else {
        throw 'Socket needs to be initialized first'
    }
}

function emit(key = "", payload, heartbeat = () => { }) {
    if (!socket) {
        throw 'Socket needs to be initialized first'
    }
    socket.emit(key, payload, heartbeat)
}

function listen(listener = "", onMessageReceived = () => { }) {
    if (socket) {
        socket.on(listener, (data) => {
            onMessageReceived(data)
        })
    }
    else {
        throw 'Socket needs to be initialized first'
    }
}

export default { init, emit, disconnect, listen }