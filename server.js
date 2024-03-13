const net = require("net");
const server = net.createServer();
// contains all the client socket connections
const clients = [];

server.on("connection", (socket) => {
  console.log("New client connected", {
    clientIp: socket.remoteAddress,
    clientPort: socket.remotePort,
  });
  const clientId = clients.length + 1;
  clients.map((client) => {
    client.socket.write(`Client with id : ${clientId} connected`);
  });
  //sending client its clientId
  socket.write(`id-${clientId}`);
  socket.on("data", (data) => {
    clients.map(({ clientId, socket }) => {
      socket.write(data);
    });
  });
  socket.on("end", () => {
    console.log("Client disconnected", {
      clientIp: socket.remoteAddress,
      clientPort: socket.remotePort,
    });
    clients.map((client) => {
      client.socket.write(`Client with id : ${clientId} disconnected`);
    });
  });
  clients.push({ clientId, socket });
});

server.listen(3008, () => {
  console.log("Server is running at port ", server.address());
});
