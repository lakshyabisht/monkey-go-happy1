//creating objects;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,survivalTime;

var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  //loading images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400);
  
  
  // making groups
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  TimeGroup=createGroup();
  
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  //creating ground
  ground1=createSprite(400,350,900,10);
  ground1.velocityX=-4;
  ground1.x=ground1.width/2;
  
  
  score=0;
  survivalTime=0;
}


function draw() {
//background  
background("white");

  stroke("white");
  fill("blue");
  textSize(20);
  text("survivalTime:"+score,200,50);
  
  
  monkey.collide(ground1);
  

  
  if(gameState===PLAY){
monkey.changeAnimation("running",monkey_running);
survivalTime=Math.ceil(frameCount/frameRate());
score = score + Math.round(frameCount/100);}

if(ground1.x){
ground1.x=ground1.width/2;
}
   
  //monkey jumps when space is pressed
  if(keyDown("space")&& monkey.y>225)
  {
  monkey.velocityY = -7;
  } 
    
   if(FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
    score = score+5;
    }
   
  //making gravity
  monkey.velocityY = monkey.velocityY + 0.9;
  
  //groups lifetime
  obstacleGroup.setLifetimeEach(-1);
  
 
  food();
  obstacles();
    
  
  if(obstacleGroup.isTouching(monkey)){
  gameState = END;
  }
  
  //end state
   if (gameState === END) {
   obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.visible = false;

     
     stroke("blue");
     fill("red");
     textSize(22);
     text("Game Over", 150, 150);
     
   
   }
 
  
  
 

drawSprites();
  
}

//Banana group
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(350,250,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(200,250));
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}

//Obstacles group
function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }
}