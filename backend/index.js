const five = require("johnny-five");
const board = new five.Board({port: "COM5"});
const { app } = require("./lib/server");
let pos=0,prePos=0;
let stepper = undefined;

function stepIt(ws){
 
  //CW-Links CCW-Rechts
  let steps=Math.abs(pos-prePos);
  if(prePos<pos){
    stepper.rpm(100).ccw().step(steps,function() {ws.send("done");});
  } else if(prePos>pos){
    stepper.rpm(100).cw().step(steps,function() {ws.send("done");});
  } else if(prePos==pos){
    console.log("same");
  }
  
}

app.ws("/", (ws, _req) => {
  console.log("something connected");
  ws.on("message", (message) => {
    try {
      const json = JSON.parse(message);
      if (json.hasOwnProperty("x") === true) {
        console.log("json", json);
        prePos=pos;
        pos = json.x;
         if(stepper !== undefined){
        
        stepIt(ws,pos,prePos);
         }
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
      motor1: 4,
      motor2: 6,
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
