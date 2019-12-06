const webSocket = new WebSocket("ws://localhost:3000");
let val = undefined;
let prevVal = undefined;
const onButton = document.querySelector("#on");
const offButton = document.querySelector("#off");

webSocket.onopen = () => {
  console.log("connection open");
  onButton.addEventListener("click", () => {
    webSocket.send("on");
  });

  offButton.addEventListener("click", () => {
    webSocket.send("off");
  });
};

function setup() {
  console.log("setup");
  createCanvas(180, 100);
  textAlign(CENTER);
}

function draw() {
  background(255);
  prevVal = val;
  stroke(0);
  val = map(mouseX, 0, width, 0, 180);
  if (val !== undefined && prevVal !== undefined) {
    if (val !== prevVal && webSocket.OPEN === 1) {
      const data = JSON.stringify({ x: Math.floor(val) });
      console.log(data);
      webSocket.send(data);
    }
  }
  const center = height / 2;
  line(0, center, width, center);
  for (let x = 0; x <= width; x += 10) {
    line(x, center - 5, x, center + 5);
  }
  for (let x = 0; x <= width; x += 45) {
    stroke(200);
    line(x, center - 10, x, center + 10);
    if (x % 45 === 0) {
      noStroke();
      text(x, x, center + 25);
    }
  }
  stroke(255, 0, 0);
  line(val, 0, val, height);
}
