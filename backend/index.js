const app = require("express")();
const http = require('http').Server(app);
const io = require("socket.io")(http);

app.get('/' , (req,res) => {
    res.send("Welcome wally API");
})

io.on("connection",(socket) => {
    console.log("Someone Connected", socket.id);
    //console.log(socket.rooms);
    
    socket.on("new-message", msg => {
        //console.log("msg is : ",msg);

        socket.broadcast.emit("receive-message", msg);
    })


});
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log("Listening on port 3000");
})