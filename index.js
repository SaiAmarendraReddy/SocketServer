const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server,{
  cors:{
    origin:"*",
  }
});
const port = 2255 ;
const onlineUser = [];

io.on('connection',(client)=>{
  console.log("connection establish",client.id);

  /* online user */
  client.on('onlineActive',(online)=>{
    /* push the user to the array */
    onlineUser.push(online);
    /* send online user list to the client */
    client.broadcast.emit('activeUser',onlineUser);

    console.log(client.id,online);
  })

  /* console.log(client) */
  client.on("fromclient",(data)=>{
    
    client.broadcast.emit('toclient',{msg:data['fromclient'],InOut: "incoming common"});
  })

  /* disconnect*/
  client.on("disconnect", (reason) => {
    console.log(client.id+"dsic")
  });
})

server.listen(port,()=>{
  console.log(`listing on port ${port}`)
})