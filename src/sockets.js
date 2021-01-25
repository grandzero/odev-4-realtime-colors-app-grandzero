import io from "socket.io-client";

let socket;

export const initSocket = () => {
    socket = io("https://wallybackend.herokuapp.com/", {
        transports: ["websocket"]
    })

    console.log("connecting");
    socket.on("connect", (socket) => console.log("socket connected", socket));
}

export const disconnectSocket = () => {
    console.log("Socket disconneting...");
    if(socket) socket.disconnect();
}
export const sendMessage = (message) => {
    if(!socket) return true;
    socket.emit("new-message", message);
}
export const subscribeToWall = (cb) => {
    if(!socket) return true;
    socket.on("receive-message", data => {
        //console.log(data);
        cb(data);
    })
}