const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

init1 = {
  protocol: {
    version: "2",
    command: 'header[HeaderKey.command.name] ?? "message"',
    subCommand: 'header[HeaderKey.subCommand.name] ?? ""',
    invoke: "bufferInvoke ?? coreBaseOption.invokeId",
    qos: "header[HeaderKey.qos.name] ?? PROTOCOL_QOS.normal.name",
    topic: "asdadsads",
    token: "adb2cToken['loginToken']",
    service: "coreNetwork",
    locationInfo: "CoreAnalytic().getCurrentLocation()",
    networkInfo: "CoreAnalytic().getNetworkInfo()",
    deviceInfo: "CoreAnalytic().getDeviceInfo()",
    diagMessage: "",
  },
  header: {
    version: "2.0",
    timestamp: " CoreUtils().getIsoFormatDateTimeNow()",
    orgService: '"header[HeaderKey.orgService.name] ?? """',
    from: "ODA",
    channel: "myais2.0",
    broker: 'deeplinkQueryString ?? "none"',
    useCase: 'coreBaseOption.useCase ?? "none"',
    useCaseStep: 'coreBaseOption.useCaseStep ?? "none"',
    useCaseAge: 0,
    session: "coreBaseOption.invokeId",
    // "session": coreBaseOption.session,
    transaction: "coreBaseOption.invokeId",
    communication: "unicast",
    groupTags: [],
    identity: {
      device: "[key]",
      public: "public",
      user: "adb2cToken['myid']",
    },
    tmfSpec: ' header[HeaderKey.tmfSpec.name] ?? "none"',
    baseApiVersion: 'header[HeaderKey.baseApiVersion.name] ?? "none"',
    schemaVersion: "schemaVersion.toString()",
    // "tid": tid,
    // "lastTid": tid,
  },
  body: "coreBaseOption.body",
};

io.on("connection", (socket) => {
  // socket.on('chat message', (msg) => {
  //   console.log('message before dis: ' + msg);
  //   socket.disconnect();
  // });

  console.log("a user connected : ", socket.id); 
  console.log("transport : ",socket.conn.transport.name);
  // console.log("a user hand shank : ", socket.handshake);
  // console.log("a user hand shank : ", socket.nsp);
  // console.log("a user req : ", socket.client.request);



  // socket.disconnect;

  //   setTimeout(() => {
  //     socket.disconnect();
  //   }, 5000);
  socket.on("disconnect", () => {
    console.log("user disconnected : " + socket.id);
  });

  // setTimeout(() => {
  //   // console.log("send data : ", init1);
  //   // socket.emit("event", init1);
  //   // socket._onclose;
  //   // a = 5
  //   // a = "adsadsada";
  //   socket.disconnect();
  //   // io.close();
  // }, 3000);

  socket.on("command", (msg) => {
    // console.log(msg);
    // ms = msg.protocol
    // console.log(ms);
    if (msg.protocol["subCommand"] == "init1") {
      init1.protocol.topic = msg.protocol["topic"] + "Ready";
      // init1.protocol.topic = "mfaf.init2Streamed";
      init1.protocol.invoke = msg.protocol.invoke;
      // init1.protocol.invoke = "123131312";

      // msg.ack
      // setTimeout(() => {
      //   console.log("send data : ", init1);
      //   socket.emit("event", init1);
      // }, 15000);
      // console.log("send data : ", init1);
      socket.emit("event", init1);

      init2 = init1;
      // init2
      init2.protocol.topic = "mfaf.init2Streamed";
      // init1.protocol.invoke = msg.protocol.invoke;
      // init2.protocol.invoke = msg.protocol.invoke;
      init1.protocol.invoke = "123131312";
      // init2.protocol.invoke = "123131312";


      // msg.ack
      // setTimeout(() => {
      //   console.log("send data : ", init1);
      //   socket.emit("event", init1);
      // }, 15000);
      // console.log("send data : ", init1);
      // socket.emit("event", init1);
      socket.emit("event", init2);
    }
    if (msg.protocol["subCommand"] == "init2") {
      init1.protocol.topic = msg.protocol["topic"] + "Ready";
      init2 = init1;
      // init2
      init2.protocol.topic = "mfaf.init2Streamed";
      init1.protocol.invoke = msg.protocol.invoke;
      // init2.protocol.invoke = msg.protocol.invoke;
      // init1.protocol.invoke = "123131312";
      // init2.protocol.invoke = "123131312";


      // msg.ack
      
      // console.log("send data : ", init1);
      // socket.emit("event", init1);
      socket.emit("event", init2);
    }
   
  });
  // while(true){
  //   setTimeout(()=>{
  //     // socket.broadcast("event",'------------------------------------')
  //     // socket.broadcast.emit('event','-----------------------------')
  //     // io.to(socket.id).emit('event','emit with socket id ------------------------------------------------' + socket.id);
  //     io.emit('event','io emit ------------------------------------------------');
  //     socket.emit("event", ["hello world "]);
  //       // socket.disconnect();
  //       console.log("broadcast--------------------data--------------------");
  //       // console.log("disconnected");
  //   },10000);
  // }
});
app.get('/i', (req, res) => {
  res.send('hello world')
})
server.listen(3000, () => {
  console.log("listening on *:3000");
});
