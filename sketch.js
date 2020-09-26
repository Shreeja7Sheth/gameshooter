var astro, bg,  bg2 ;
  
  var score = 0;
  
  var speed = 1;

  var timer = 100;
  
  var speed2 = 1;

  var gamestate = "play";

  var time=1;

  var j = 0;

  function preload() {
    astroIMG = loadImage("astro.png");
    bgIMG = loadImage("bg.png");
    bgIMG2 = loadImage("bg2.png");
    enemyIMG = loadImage("enemy.png");
    bulletIMG = loadImage("bullet.png");
    bullet2IMG = loadImage("bullet2.png");
    playerIMG = loadImage("player.png")
  }

function setup(){

  createCanvas(500, 400);

  bg2 = createSprite(250, 250, 500, 400);
  bg2.addImage(bgIMG2);
  bg2.velocityY = 2;
  bg2.scale = 3;
  
  bg = createSprite(250, -250, 500, 400);
  bg.addImage(bgIMG2);
  bg.velocityY = 2;
  bg.scale = 3;
  
  bullet = [] ;

  bullet2 = createSprite(300, -100, 1, 1);
  bullet2.addImage(bullet2IMG);
  bullet2.velocityY = 20; 
  bullet2.scale = 0.1;
  
  bullet3 = createSprite(100, -50, 1, 1);
  bullet3.addImage(bullet2IMG);
  bullet3.velocityY = 20;
  bullet3.scale = 0.1;
  
  bullet4 = createSprite(200, 0, 1, 1);
  bullet4.addImage(bullet2IMG);
  bullet4.velocityY = 20;
  bullet4.scale = 0.1;
  
     enemy = createSprite(300, -100, 5, 5);
  enemy.addImage(enemyIMG);
  enemy.scale = 0.25;
  enemy.velocityY = 10;
  
     enemy2 = createSprite(100, -50, 5, 5);
  enemy2.addImage(enemyIMG);
  enemy2.scale = 0.25;
  enemy2.velocityY = 10;
  
  enemy3 = createSprite(200, 0, 5, 5);
  enemy3.addImage(enemyIMG);
  enemy3.scale = 0.25;
  enemy3.velocityY = 10;
  
  shooter = createSprite(250, 360, 25, 25);
  shooter.addImage(playerIMG);
  shooter.scale = 0.25;
  
  for (i = 0; i < 400; i++) {
    bullet[i] = createSprite(600, 200, 20, 20);
    bullet[i].addImage(bulletIMG);
    bullet[i].scale = 0.5;
    }
  }
  
    function draw() {
      
      background("white");
      fill("yellow");
      
       if (bg.y > 600) {
        bg.y = -200;
      }
      
      if (bg2.y > 600) {
        bg2.y = -200;
      }
      
      if(gamestate === "play") {
  
           score = score + speed;  
  
          if(World.frameCount%15 === 0) {
            timer = timer - speed2;
          }
          
          if(bullet2.y > 400){
            bullet2.x = enemy.x;
            bullet2.y = enemy.y;
          }
        
          if(bullet3.y > 400) {  
          bullet3.x = enemy2.x;
          bullet3.y = enemy2.y;
          }
          
            if(bullet4.y > 400) {  
          bullet4.x = enemy3.x;
          bullet4.y = enemy3.y;
          }

          if (keyDown("right")) {
            shooter.velocityY = 0;
            shooter.x = shooter.x + 3;
          }
          
          if (keyDown("left")) {
            shooter.velocityY = 0;
            shooter.x = shooter.x - 3;
          }
          
          if (keyWentDown("space")) {
          bullet[j].x = shooter.x;
          bullet[j].y = shooter.y;
          bullet[j].velocityY = -20;
          j = j + 10;
          gamestate = "play";
            if (j > 399) {
            j = 0;
            }
          }
      
            if(bullet2.isTouching(shooter)){
            bullet2.x = enemy.x;
            bullet2.y = enemy.y;
            score = score - 10;
              }
            
              if(bullet3.isTouching(shooter)) {  
              bullet3.x = enemy2.x;
              bullet3.x = enemy2.x;
              score = score - 10;
              }
              
                if(bullet4.isTouching(shooter)) {  
              bullet4.x = enemy3.x;
              bullet4.x = enemy3.x;
              score = score - 10;
              
              }
              
            
            for (var i = 0; i < 400; i++) {
              if (bullet[i].isTouching(enemy)) {
              enemy.x = random(0, 400);
              enemy.y = random(-50, 0);
            }
              if (bullet[i].isTouching(enemy2)) {
              enemy2.x = random(0, 400);
              enemy2.y = random(-50, 0);    
            }
            if (bullet[i].isTouching(enemy3)) {
            enemy3.x = random(0, 400);
            enemy3.y = random(-50, 0);    
            }
            }
            createEdgeSprites();
          // shooter.bounceOff(edges);
            
            if(score >= 1000){
              
                  textSize(20);
                  text("You win", 130, 130);
                  
                  enemy.x = 500;
                  enemy2.x = 500;
                  enemy3.x = 500;
                  
                  bullet2.x = 500;
                  bullet3.x = 500;
                  bullet4.x = 500;
                  
                  speed = 0;
                
                  if (keyDown("enter")) {
                    reset();
                    score = 0;
                  }
            }
  }
    
          if(gamestate === "serve") {
            enemy.x = 600;
            enemy2.x = 600;
            enemy3.x = 600;
            //gamestate="play";
          }
    
    if (keyDown ("enter") &&((gamestate === "serve")||(gamestate === "win")||(gamestate === "lost"))) {
        reset();
        score = 0;
      }
      
      if((score >= 1000)&&(timer >= 0)){
        gamestate = "win";
      }
      
      if((score < 1000)&&(timer === 0)){
        gamestate = "lost";
      }
      
      if(score === 0){
        gamestate = "lost";
      }
    
      spawnenemies();
      spawnasteroids();
      drawSprites();
  
    
    
    if(gamestate === "win"){
      speed = 0;
      textSize(20);
      text("You win", 130, 130);
      text("Long press Enter to continue", 100, 200);
    }
    
    
    if (time===1) {
      fill("yellow");
      
      textSize(18);
      text("DESTROY ENEMIES !!", 100, 20);
      
      fill("yellow");
      textSize(14);
      
      text("Read the following game instructions:-", 10, 50);
      
      text("PRESS SPACE TO SHOOT AND ENTER START THE GAME", 10, 100);
      
      text("don't let them escape or score will deduct by 10", 100, 125);
      
      text("don't let them shoot you or score will deduct by 10", 100, 150);
      
      text("make a score of thousand to WIN !!", 100, 175);
      time=2;
     }
    
    
     text ("score = " + score, 300, 20);
     text("timer = " + timer, 300, 60);
    //score =  Math.round(World.frameCount/4);
    }
    
  function spawnenemies () {
    if (enemy.y > 400) {
      enemy.y =  random(-100, 0);
      enemy.x = random(20, 480);
      score - 10;
    }
    if (enemy2.y > 400) {
      enemy2.y =  random(-400, 0);
      enemy2.x = random(20, 480);
      score - 10;
    }
     if (enemy3.y > 400) {
      enemy3.y =  random(-700, 0);
      enemy3.x = random(20, 480);
      score - 10;
    }
    }
  
    function reset() {
      if (keyWentDown ("enter")) {
        
      bullet2.velocityY = 20;
      
      bullet3.velocityY = 20;
      
      bullet4.velocityY = 20;
      
      enemy.velocityY = 10;
      
      enemy2.velocityY = 10;
      
      enemy3.velocityY = 10;
      
      bullet2.x = 300;
      
      bullet3.x = 100;
      
      bullet4.x = 200;
      
      enemy.x = 300;
      
      enemy2.x = 100;  
      
      enemy3.x = 200;
      
      bullet2.y = -100;
     
      bullet3.y = -50;
    
      bullet4.y = 0;
    
      enemy.y = -100;
    
      enemy2.y = -50;  
    
      enemy3.y = 0;
    
      speed = 1;
    
      gamestate = "play";
        
      }
      
    }
  
  
  function spawnasteroids() {
     
      if (World.frameCount % 100 === 0) {
        astro = createSprite(random(50, 350), random(-100, 0), 10, 10);
        astro.velocityY = 13;
        astro.addImage(astroIMG);
        astro.scale = 0.3;
        console.log(astro.y);
        astro.depth = shooter.depth;
        shooter.depth = shooter.depth + 1; 
        astro.depth = enemy.depth;
        enemy.depth = enemy.depth + 1; 
        astro.depth = enemy2.depth;
        enemy2.depth = enemy2.depth + 1;
        astro.depth = enemy3.depth;
        enemy3.depth = enemy3.depth + 1;
      }
    }
  