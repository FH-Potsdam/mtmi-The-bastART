const webSocket = new WebSocket("ws://localhost:3000");
const r=5;
let mX=r,Cy=r
let mXpre=0,hue=0,Lcol=10;
let arr=[],c=1  ,c1=0;
let txt=["Fish", "Boat", "House", "Dog", "Cat", "Human", "Head", "Hand", "Camera","Instrument","Bicycle", "Car", "Train"];
let Ctxt;

webSocket.onopen = () => {
  console.log("connection open");
};

function setup() {
  Ctxt=Math.round(random(txt.length));
  createCanvas(1000, 600);
  colorMode(HSB,360,100,100,100);
  frameRate(30);
  background(0);
  stroke(255);
  fill(255);
  textSize(32);
  textAlign(RIGHT, TOP);
  text(txt[Ctxt], 995, 5);

  arr[0]=0;

  webSocket.onmessage = function(msg) {
    setTimeout(stepping,500);
  }
}

function stepping(){
  if(c1<arr.length){
    c1+=1;
    const data = JSON.stringify({pos: arr[c1], prePos: arr[c1-1]});
    webSocket.send(data);
  }
}

function draw() {  
  strokeWeight(2);
  stroke(Lcol);
  line(mXpre,Cy-10,mX,Cy);

  fill(hue,80,80)
  noStroke();
  circle(mX,Cy,r*2);
}

function mouseClicked(){
  if(Cy<595){
    mXpre=mX;
    if (mouseX>width){
      mX=width-r;
    } else if(mouseX<0){
      mX=r;
    } else {
      mX=mouseX;
    }
    arr[c]=mX;
    c+=1;
    hue+=6;
    Cy+=10;
    Lcol+=2;
  } else {
    stepping();
    //saveCanvas(canvas, "sketch_"+txt[Ctxt], "png");
  }
}
