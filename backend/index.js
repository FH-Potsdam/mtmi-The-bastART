const { Board, Led, Servo } = require("johnny-five");
const { app } = require("./lib/server");
var board = new Board({ repl: false });
let led = undefined;
let angle = undefined;
let servo = undefined;

app.ws("/", (ws, _req) => {
  console.log("something connected");
  ws.on("message", (message) => {
    console.log("message", message);
    try {
      const json = JSON.parse(message);
      if (json.hasOwnProperty("x") === true) {
        console.log("json", json);
        angle = json.x;
      }
    } catch (error) {
      // could bot parse message as JSON
    }
    if (message === "on" && led !== undefined) {
      led.on();
    }
    if (message === "off" && led !== undefined) {
      led.off();
    }
    if (servo !== undefined) {
      servo.to(angle);
    }
  });
});

board.on("ready", () => {
  console.log("Board is ready");
  led = new Led(13);
  servo = new Servo(10);
});

/**
 *
 */
app.listen(3000, () => {
  console.log(" listening on http://localhost:3000");
});
