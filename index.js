const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server,{
  cors:{
    origin:"*",
  }
});
const port = 2255 ;

io.on('connection',(client)=>{
  console.log("connection establish");
  /* console.log(client) */
  client.on("fromclient",(data)=>{
    
    client.broadcast.emit('toclient',{msg:data['fromclient'],InOut: "incoming common"});
  })
})

server.listen(port,()=>{
  console.log(`listing on port ${port}`)
})