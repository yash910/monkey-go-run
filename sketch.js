var sarvivalTime
var monkey , monkey_running
var banana ,bananaImage, obstacles, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0;
var gameState;
var PLAY;
var END;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(470,400);
  
  PLAY =1;
  gameState = PLAY;
  END = 0;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;

  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  
  score=0
}


function draw() {

  background("green");
  
  if(gameState === PLAY) {
  if(ground.x = 0) {
    ground.x = ground.width/2;
  }
 if(keyDown("space")&&monkey.y >= 100){
   monkey.velocityY=-10;
 }
  monkey.velocityY = monkey.velocityY + 0.3;
  monkey.collide(ground);
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+1
  }
  
  ground.velocityX = -7;
  
  drawSprites();
  fill("white");  
  text("score: "+ score, 500,50);
  
  Obstacles();
  spawnFood();
  
    if(monkey.isTouching(obstacleGroup)) {
      gameState = END;
    }
  }  
  
  else if( gameState === END) {
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime: "+survivalTime, 100,50);
}

function Obstacles(){
 if(frameCount % 300 === 5) {
   var obstacle = createSprite(800,350,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacleImage);
   
   obstacle.scale = 0.25;
   
   obstacle.lifetime = 500;
   
   obstacleGroup.add(obstacle)  
 }
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(670,380,10,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.liftime = 300;
    monkey.depth = banana.depth + 1;
    
     monkey.lifetime = 500;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    
    bananaGroup.add(banana);
  }
}

