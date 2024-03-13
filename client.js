const net = require("net");
const { exit } = require("process");
const readline = require("readline/promises");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};
const client = net.createConnection({ host: "127.0.0.1", port: 3008 }, () => {
  let clientId = null;
  console.log("Connected to server");
  const ask = async () => {
    const data = await rl.question("Enter your message: ");
    await moveCursor(0, -1);
    await clearLine(0);
    client.write(`client-${clientId} : ${data.toString()}`);
  };
  ask();

  client.on("data", async (data) => {
    console.log();
    await moveCursor(0, -1);
    await clearLine(0);
    if (data.toString().startsWith("id-")) {
      clientId = data.toString().split("-")[1];
      console.log(`Your client id is ${clientId}`);
      ask();
    } else {
      console.log(data.toString());
      ask();
    }
  });
});

client.on("end", () => {
  console.log("Disconnected from server");
  exit();
});
