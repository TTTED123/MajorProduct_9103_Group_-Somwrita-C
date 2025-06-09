let stripes = [];
let currentStripe = 0;
let rangeX;
let rangeY;
let rangeLength;

let mode = 0; // 0: 多角度线条, 1: 单角度线条

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  
  background(240, 240, 225);
  rangeX = windowWidth * 0.3;
  rangeY = windowHeight * 0.3;
  rangeLength = windowWidth * 0.5;
  
  let baseAngles;
  if(mode == 0){
    baseAngles = [0, 90, -90]; //角度设定
  }else if(mode == 1){
    baseAngles = [0];
  }

  for (let i = 0; i < 100; i++) {
    stripes.push(new LineStripe(
    random(-rangeX, rangeX),        // x
    random(-rangeY, rangeY),        // y
      random(20, rangeLength),         // 长度
      random(0.1, 8),         // 间距
      floor(random(6, 50)),    // 线数量
      random(baseAngles),       // 角度
      random(0.1, 1)          // 线粗
    ));
  }
}

function draw() {
  //background(240, 240, 225);
  translate(width / 2, height / 2);  
  
  //透过循环生成线组
  if (currentStripe < stripes.length) {
    stripes[currentStripe].displayStep();
    if (stripes[currentStripe].done) {
      currentStripe++;
    }
  } else {
    noLoop(); // 停止循环
  }
}


function windowResized(){
  setCanvas();
}

function setCanvas(){
  resizeCanvas(windowWidth, windowHeight);
  background(240, 240, 225);
  
  rangeX = windowWidth * 0.8;
  rangeY = windowHeight * 0.5;
  rangeLength = windowWidth * 1.5;
  
  let baseAngles;
  if(mode == 0){
    baseAngles = [0, 90, -90]; //角度设定
  }else if(mode == 1){
    baseAngles = [0];
  }

  for (let i = 0; i < 100; i++) {
    stripes.push(new LineStripe(
      random(-rangeX, rangeX),        // x
      random(-rangeY, rangeY),        // y
      random(100, rangeLength),         // 长度
      random(0.1, 5),         // 间距
      floor(random(6, 50)),    // 线数量
      random(baseAngles),       // 角度
      random(0.3, 3)          // 线粗
    ));
  }
}

//线组class
class LineStripe {
  constructor(x, y, len, spacing, count, angle, baseWeight) {
    this.x = x;
    this.y = y;
    this.len = len;
    this.spacing = spacing;
    this.count = count;
    this.angle = angle;
    this.baseWeight = baseWeight;
    this.lines = [];
    this.index = 0;
    this.done = false;
    this.currentLen = 0;
    this.gray = random(10,200);

    for (let i = 0; i < this.count; i++) {
      let offsetY = i * this.spacing;
      let opacity = random(2, 100);
      let weight = this.baseWeight + random(-0.1, 0.5);
      let m = round(random(3));
      this.lines.push({ offsetY, opacity, weight, m});
    }
  }
  
  //绘制线组function
  displayStep() {
        
    push();
    translate(this.x, this.y);
    rotate(-this.angle);
    
    for(let i = 0; i < this.lines.length; i++){
      let l = this.lines[i];
      stroke(this.gray, l.opacity); // 色彩透明度改变
      strokeWeight(l.weight); //线段粗度改变
      
      if(l.m == 0){
        line(0+l.offsetY, l.offsetY, this.currentLen+l.offsetY, l.offsetY); //生成线段    
      }else{
         line(this.len+l.offsetY, l.offsetY, this.len-this.currentLen+l.offsetY, l.offsetY); //生成线段    
      }
    }
    
    if(this.currentLen < this.len){
      this.currentLen += 10;
    }else{
       this.done = true;
    }
    pop();
  }
}