const five = require("johnny-five");
const board = new five.Board({port: "COM5"});
const { app } = require("./lib/server");
let stepper=undefined;
let pos=5,prePos=5;

function stepIt(ws,p,prP){
   
  //CW-Links CCW-Rechts
  let steps=Math.abs(p-prP);
  if(prP<p){
    stepper.rpm(100).ccw().step(steps,function() {ws.send("done");});
  } else if(prP>p){
    stepper.rpm(100).cw().step(steps,function() {ws.send("done");});
  } else if(prP==p){
    console.log("same");
  }
  
}

app.ws("/", (ws, _req) => {
  console.log("something connected");
  console.log(prePos);
  console.log(pos);
  stepIt(ws,-pos,5);
  pos=5;
  prePos=5;
  ws.on("message", (message) => {
    try {
      const json = JSON.parse(message);
      if (json.hasOwnProperty("x") === true) {
        console.log("json", json);
        prePos=pos;
        pos = json.x;
        stepIt(ws,pos,prePos);
      }
    } catch (error) {
      // could bot parse message as JSON
    }
  });
});

board.on("ready", () => {
  console.log("Board is ready");
  stepper = new five.Stepper({
    type: five.Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 200,
    pins: {
      motor1: 6,
      motor2: 4,
      motor3: 5,
      motor4: 7
    }
  });
});

/**
 *
 */
app.listen(3000, () => {
  console.log(" listening on http://localhost:3000");
});
