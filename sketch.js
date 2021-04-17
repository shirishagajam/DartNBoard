const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var player;
var slingShot,ground;
var daybg,nightbg;
var dart,dartImage,stand;
var board,boardImage,dartboard,score=0;

var backgroundImg;
var bg = "daybg2.jpg";

function preload(){
   boardImage = loadImage("board.png");
   dartImage = loadImage("dart.png");
   player = loadImage("boy.png");
   getBackgroundImg();
}

function setup() {
  createCanvas(1100,700);
  createSprite(400, 200, 50, 50);
  engine = Engine.create();
  world = engine.world;

  board = new Board(150,280);
  dart = new Dart(985,420,150,100,PI/6);
  stand = new Stand(150,480);

  var option={
    isStatic:true
  }
           
  ground = Bodies.rectangle(550,690,1100,20,option);
  World.add(world,ground);

  slingShot = new SlingShot(dart.body,{x:985,y:410}); 
}

function draw() {
  rectMode(CENTER);
  rect(ground.position.x,ground.position.y,1100,20);
  if(backgroundImg)
  background(backgroundImg);  
  Engine.update(engine);

 

  textSize(25);
  fill("white");
  text("Score: "+score,500,30);

  imageMode(CENTER);
  image(player,920,510,160,300);
   
  stand.display();
  board.display();
  dart.display();
  slingShot.display();

  detectcollision(dart,board);

  //console.log(score);
  //drawSprites();
}

function mouseDragged(){
  Matter.Body.setPosition(dart.body,{x:mouseX,y:mouseY})
}

function mouseReleased(){
  slingShot.fly();
}

function keyPressed(){
  if(keyCode === 32){
     Matter.Body.setPosition(dart.body,{x:985,y:410}); 
     slingShot.reattach(dart.body);
  }
}

function detectcollision(dart,board){
  dartBodyPosition=dart.body.position
  boardBodyPosition=board.body.position

 var distance=dist(dart.body.position.x,dart.body.position.y,board.body.position.x,board.body.position.y);
 //console.log(distance);
 /*comparing distance with hlf of the sum of dart and board width and also check the y position of the dart
 so that it does stays only on the board when collision is detected
 Same you can try for x position of the dart*/
 //console.log("before detected: " + dart.body.position.y);
    if(distance<=325/2 && dart.body.position.y>=140 && dart.body.position.y<=350){ 
        //console.log("yes detected: " + dart.body.position.y);
         Matter.Body.setStatic(dart.body,true);
         score++;
    }
}

async function getBackgroundImg(){
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  if(hour>=0600 && hour<=1900){
    bg = "nightbg.jpg";
  }
  else{
    bg = "daybg2.jpg";
  }
  backgroundImg = loadImage(bg);
  //console.log(backgroundImg);
}
