var PLAY=1;
var END=0;
var gameState=PLAY;
var roadImg;
var mainRacerImg1, mainRacerImg2;
var oppPink1Img, oppPink2Img;
var oppyellow1Img, oppYellow2Img;
var oppRed1Img, oppRed2Img;
var cycleBell;
var gameOverImg, gameOver;
var road;
var distance=0;
var racer;
var pinkOpponentGroup;
var yellowOpponentGroup;
var redOpponentGroup;
var obstacle1Group;
var obstacle2Group;
var obstacle3Group;

function preload()
{
    roadImg = loadImage("images/Road.png");
  
    mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
    mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
    oppPink1Img= loadAnimation("images/opponentPink1.png","images/opponentPink2.png");
    oppPink2Img= loadAnimation("images/opponentPink3.png");
  
    oppyellow1Img=loadAnimation("images/opponentYellow1.png","images/opponentYellow2.png");
    oppyellow2Img=loadAnimation("images/opponentYellow3.png");
   
    oppRed1Img= loadAnimation("images/opponentRed1.png","images/opponentRed2.png");
    oppRed2Img= loadAnimation("images/opponentRed3.png");
  
    cycleBell= loadSound("sound/bell.mp3");
    gameOverImg= loadImage("images/gameOver.png"); 
    
    obstacle1Image=loadAnimation("images/obstacle1.png")
    obstacle2Image=loadAnimation("images/obstacle2.png")
    obstacle3Image=loadAnimation("images/obstacle3.png")
}

function setup()
{
    createCanvas(600,400);
    road=createSprite(300,200);
    road.addImage(roadImg);
    road.velocityX=-7;
    road.x=road.width/2;
    road.velocityX = -(6 + 3*distance/100);
  
    racer=createSprite(60,100);
    racer.addAnimation("racer",mainRacerImg1)
    racer.scale=0.07
    racer.debug = false;
    racer.setCollider("rectangle",racer.x,racer.y,racer.width-400,racer.height-450)
  
    gameOver=createSprite(300,200);
    gameOver.addImage(gameOverImg);
    gameOver.scale=0.6;
    gameOver.visible=false;
  
    pinkOpponentGroup=new Group()
    yellowOpponentGroup=new Group()
    redOpponentGroup=new Group()
    obstacle1Group=new Group()
    obstacle2Group=new Group()
    obstacle3Group=new Group()
}

function draw()
{
    background("grey");
    drawSprites();
    
    textSize(18)
    fill("skyBlue")
    text("Distance: "+distance,430,50);
  
    if (gameState===PLAY)
    {
        distance=distance+Math.round(getFrameRate()/50)
        road.velocityX=-(6+2*distance/150)
      
        if (road.x<0)
        {
            road.x=width/2;
        } 
        if(keyDown("up") && gameState===PLAY) 
        {
          racer.y=racer.y-10; 
        }
        if(keyDown("down") && gameState===PLAY) 
        {
          racer.y=racer.y+10; 
        }
        if(keyDown("space"))
        {
          cycleBell.play()
        }    
      
        edges=createEdgeSprites()
        racer.collide(edges[3]);
        racer.collide(edges[2]);

        if(pinkOpponentGroup.isTouching(racer))
        {
          gameState=END
          racer.changeAnimation("racer",mainRacerImg2);
          opponentPink.addAnimation("opponentPink",oppPink2Img)
          opponentPink.velocityY=0
          obstacle1Group.setVelocityXEach(0)
          obstacle2Group.setVelocityXEach(0)
          obstacle3Group.setVelocityXEach(0)
        }
        if(yellowOpponentGroup.isTouching(racer))
        {
          gameState=END
          racer.changeAnimation("racer",mainRacerImg2);    
          opponentYellow.addAnimation("opponentYellow",oppyellow2Img)
          opponentYellow.velocityY=0
          obstacle1Group.setVelocityXEach(0)
          obstacle2Group.setVelocityXEach(0)
          obstacle3Group.setVelocityXEach(0)
        }
        if(redOpponentGroup.isTouching(racer))
        {
          gameState=END
          racer.changeAnimation("racer",mainRacerImg2);    
          opponentRed.addAnimation("opponentRed",oppRed2Img)
          opponentRed.velocityX=0
          obstacle1Group.setVelocityXEach(0)
          obstacle2Group.setVelocityXEach(0)
          obstacle3Group.setVelocityXEach(0)
        }
        if(racer.isTouching(obstacle1Group))
        {
          gameState=END
          racer.addAnimation("racer",mainRacerImg2)
          obstacle1.velocityX=0
        }
        if(racer.isTouching(obstacle2Group))
        {
          gameState=END
          racer.addAnimation("racer",mainRacerImg2)
          obstacle2.velocityX=0
        }
        if(racer.isTouching(obstacle3Group))
        {
          gameState=END
          racer.addAnimation("racer",mainRacerImg2)
          obstacle3.velocityX=0 
        }      
      
        var select_opponentCycles=Math.round(random(1,3))
  
        if(World.frameCount%100==0)
        {
          if(select_opponentCycles==1)
          {
            pinkCyclists();
          }else if (select_opponentCycles==2)
          {
            yellowCyclists();
          }else
          {
            redCyclists();
          }
        }
        
      var select_obstcles=Math.round(random(1,3))  
  
      if(World.frameCount%150==0)
      {
        if(select_obstcles==1)
        {
          spawnObstcle1()
        }else if (select_obstcles==2)
        {
          spawnObstcle2()
        }else
        {
          spawnObstcle3()
        }
      }
    }
    else if(gameState===END)
    {
      textSize(18)
      fill("skyBlue")
      text("Total Distance: "+distance,387,50);   
      textSize(20);
      text("PRESS UP ARROW TO RESTART THE GAME",100,250);
      racer.addAnimation("racer",mainRacerImg2)
      racer.velocityX=0;road.velocityX=0
    
      gameOver.visible=true
      
      if(keyDown("UP_ARROW"))
      {
        reset()
      }  
  
      pinkOpponentGroup.setLifetimeEach(-1)
      yellowOpponentGroup.setLifetimeEach(-1)
      redOpponentGroup.setLifetimeEach(-1)

      pinkOpponentGroup.setVelocityXEach(0)
      yellowOpponentGroup.setVelocityXEach(0)
      redOpponentGroup.setVelocityXEach(0)

      obstacle1Group.setVelocityXEach(0)
      obstacle2Group.setVelocityXEach(0)
      obstacle3Group.setVelocityXEach(0)

      obstacle1Group.setLifetimeEach(-1)
      obstacle2Group.setLifetimeEach(-1)
      obstacle3Group.setLifetimeEach(-1)
    }
}

function pinkCyclists()
{
  opponentPink=createSprite(600,Math.round(random(50,250),10,10));
  opponentPink.addAnimation("opponentPink",oppPink1Img)
  opponentPink.velocityX=-(6+2*distance/150)
  opponentPink.scale=0.07
  opponentPink.setLifetime=150
  pinkOpponentGroup.add(opponentPink)
}

function yellowCyclists()
{
  opponentYellow=createSprite(600,Math.round(random(50,250),10,10));
  opponentYellow.addAnimation("opponentYellow",oppyellow1Img)
  opponentYellow.velocityX=-(6+2*distance/150)
  opponentYellow.scale =0.07
  opponentYellow.setLifetime=120
  yellowOpponentGroup.add(opponentYellow)
}

function redCyclists()
{
  opponentRed=createSprite(600,Math.round(random(50,250),10,10));
  opponentRed.addAnimation("OpponentRed",oppRed1Img);
  opponentRed.velocityX=-(6+2*distance/150) 
  opponentRed.scale=0.07
  opponentRed.setLifetime=100
  redOpponentGroup.add(opponentRed)
}

function spawnObstcle1()
{
  obstacle1=createSprite(600,Math.round(random(50,250),10,10))
  obstacle1.addAnimation("obstacle1",obstacle1Image)
  obstacle1.velocityX=-(4+2*distance/120)
  obstacle1.scale=0.1
  obstacle1.setLifetime=150
  obstacle1Group.add(obstacle1)
}

function spawnObstcle2(){
  obstacle2=createSprite(600,Math.round(random(50,250),10,10))
  obstacle2.addAnimation("obstacle2",obstacle2Image)
  obstacle2.velocityX=-(4+2*distance/120)
  obstacle2.scale=0.1
  obstacle2.setLifetime=150
  obstacle2Group.add(obstacle2)
}

function spawnObstcle3(){
  obstacle3=createSprite(600,Math.round(random(50,250),10,10))
  obstacle3.addAnimation("distance",obstacle3Image)
  obstacle3.velocityX=-(4+2*distance/120)
  obstacle3.scale=0.04
  obstacle3.setLifetime=150
  obstacle3Group.add(obstacle3)
}

function reset(){
  
  gameState=PLAY

  racer.addAnimation("racer",mainRacerImg1)
  
  gameOver.visible=false

  pinkOpponentGroup.destroyEach()
  yellowOpponentGroup.destroyEach()
  redOpponentGroup.destroyEach()

  obstacle1Group.destroyEach()
  obstacle2Group.destroyEach()
  obstacle3Group.destroyEach()

  distance=0
}