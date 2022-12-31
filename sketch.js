var PLAY = 1
var END = 0
var gameState = PLAY

var jet,jetImg;
var meteor,meteorImg,meteorGroup;
var sky1,sky1Img;
var sky2;
var sky3;
var sky4;
var collision,collisionImg;
var restart,restartImg;
var score = 0;


function preload(){
    sky1Img = loadImage("sky1.png");
    meteorImg = loadImage("meteor.png");
    jetImg = loadImage("jet.png");
    collisionImg = loadImage("crash.png")
    restartImg = loadImage("reset.png") 
}

function setup() {
    createCanvas(600,300);

    sky1 = createSprite(300,150);
    sky1.addImage("sky1",sky1Img);
    sky1.velocityX = -10;

    sky2 = createSprite(900,150);
    sky2.addImage("sky1",sky1Img);
    sky2.velocityX = -10;

    sky3 = createSprite(1500,150);
    sky3.addImage("sky1",sky1Img);
    sky3.velocityX = -10;

    sky4 = createSprite(2100,150);
    sky4.addImage("sky1",sky1Img);
    sky4.velocityX = -10;

    jet = createSprite(100,150);
    jet.addImage("jet",jetImg);
    jet.scale = 0.15;
    jet.setCollider("rectangle",0,0,jet.width,jet.height);

    collision = createSprite(jet.x,jet.y);
    collision.addImage("crash",collisionImg);
    collision.scale = 0.1;
    collision.visible = false;

    restart = createSprite(300,150);
    restart.addImage("reset",restartImg);
    restart.scale = 0.5;
    restart.visible = false;
 
    invisiblewall1 = createSprite(0,150,1,300);
    invisiblewall2 = createSprite(600,150,1,300);

    meteorGroup = createGroup();

    gameState = PLAY;
}

 function reset(){
    gameState = PLAY
 }


function draw() {
    background(100);

    jet.collide(invisiblewall1);
    jet.collide(invisiblewall2);
    
    //Backgrounds
    if(sky1.x<= -300){
        sky1.x = 300;
    }

    if(sky2.x<= -300){
        sky2.x = 900;
    }

    if(sky3.x<= -300){
        sky3.x = 900;
    }

    if(sky4.x<= -300){
        sky4.x = 900;
    }

    if(keyDown("right_arrow")){
        jet.x = jet.x + 5;
    }

    if(keyDown("left_arrow")){
        jet.x = jet.x - 3;
    }
    
    //Game state: PLAY
    if(gameState === PLAY){
        //Visibility and positions
        jet.velocityX = -1;
        jet.visible = true;
        collision.x = jet.x; 
        collision.visible = false;
        restart.visible = false;

        //Scoring
        score = score + Math.round(frameCount/60);

        //Spawning meteors
        if(frameCount % 35 === 0){
            meteor = createSprite(Math.round(random(100,800)),20);
            meteor.addImage("meteor", meteorImg);
            meteor.scale = 0.1;
            meteor.velocityX = -6;
            meteor.velocityY = 4;
            meteorGroup.add(meteor);
            meteor.depth = jet.depth;
            meteor.setCollider("circle",0,0,50);
            meteor.x >= 300;
            meteor.lifetime = 220;
        } 
        
    }

    

    if(meteorGroup.collide(jet)){
        gameState = END; 
    }

    //Game state: END
    if(gameState === END){
        jet.visible = false;
        collision.visible = true;
        collision.x = collision.x - 10;
        collision.y = collision.y + 8;
        meteorGroup.destroyEach();
        restart.visible = true;
        score = 0;
    }
 
    //Reset
    if (mousePressedOver(restart)){
        reset();
}

    drawSprites();

    text("Score: "+ score,500,50);
}
