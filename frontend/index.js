const webSocket = new WebSocket("ws://localhost:3000");
const r=5;
let mX=r,Cy=r
let mXpre=0,hue=0,Lcol=10;
let arr=[],c=0,c1=0,f=true;

webSocket.onopen = () => {
  console.log("connection open");
};

function setup() {
  createCanvas(1000, 600);
  colorMode(HSB,360,100,100,100);
  frameRate(30);
  background(0);
  webSocket.onmessage = function(msg) {
    console.log(msg.data);
    f=false;
    if(c1<=arr.length-1){
      c1+=1;
    } else {
      f=true;
    }
    const data = JSON.stringify({x: arr[c1]});
    webSocket.send(data);
  }
}
//t=(steps/(100*200))*60 zeit für n-steps in sek
function draw() {  
  strokeWeight(2);
  stroke(Lcol);
  line(mXpre,Cy-10,mX,Cy);

  fill(hue,80,80)
  noStroke();
  circle(mX,Cy,r*2);
}

function mouseClicked(){
  mXpre=mX;
  if (mouseX>width){mX=width-r;}else if(mouseX<0){mX=r;} else {mX=mouseX;}
  hue+=6;
  Cy+=10;
  Lcol+=2;
  arr[c]=mX;
  c+=1;
  console.log(f);
  if(f==true){
    const data = JSON.stringify({x: arr[c1]});
    webSocket.send(data);
    c1+=1;
  }
}
