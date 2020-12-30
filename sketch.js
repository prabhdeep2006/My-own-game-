var mario,mario_image; 
var monster,monster_image; 
var ob,ob_image,obGroup;
var princess,princess_img; 
var bg,bg_image,bg2,bg2_img,bg3,bg3_img,bg4,bg4_img;  
var bubble,bubble_image
var chat,chat_image; 
var h1,h2,h3,h1_img,h2_img,h3_img; 
var pipe, pipe_image; 
var ground; 
var start; 
var next; 
var plant,plant_image; 
var count = 0; 
var flag = 0; 
var score =0; 

var gameState= 0 ; 

function preload(){
mario_image = loadAnimation("images/mario 2.png","images/mario.png"); 
bg_image = loadImage("images/bg.png"); 
monster_image = loadImage("images/wario the monster.png"); 
princess_img = loadImage("images/peach crying.png");
bubble_image = loadImage("images/bubble.png"); 
chat_image = loadImage("images/text.png"); 
ob_image = loadImage("images/mushroom is evil.png"); 
h1_img = loadImage("images/heart.png"); 
h2_img = loadImage("images/heart.png"); 
h3_img = loadImage("images/heart.png"); 
pipe_image = loadImage("images/pipe.png"); 
bg2_img = loadImage("images/bg 2.jpg")
bg3_img = loadImage("images/bg 3.png"); 
bg4_img = loadImage("images/bg 4.png"); 
plant_image = loadImage("images/evil.png"); 
}

function setup(){
createCanvas(displayWidth,800); 
 

bg = createSprite(displayWidth/2,300,displayWidth,800); 
bg.addImage(bg_image); 
bg.scale = 3.2; 
bg2 = createSprite(displayWidth/2,300,displayWidth,800); 
bg2.addImage(bg2_img); 
bg3 = createSprite(displayWidth/2,300,displayWidth,800); 
bg3.addImage(bg3_img); 
bg4 = createSprite(displayWidth/2,300,displayWidth,800); 


h1 = createSprite(100,50); 
h2 = createSprite(200,50); 
h3 = createSprite(300,50);

        h1.addImage(h1_img); 
        h2.addImage(h2_img);
        h3.addImage(h3_img); 
        h1.scale = 0.1; 
        h2.scale = 0.1; 
        h3.scale = 0.1;  
 

mario = createSprite(50,630); 
mario.addAnimation("mario running",mario_image); 
mario.scale = 0.2; 

ground = createSprite(displayWidth/2,650,displayWidth+100,10);
ground.visible = false; 

monster = createSprite(350,550); 
princess = createSprite(700,510); 
bubble = createSprite(400,200); 
chat = createSprite(950,250); 



 start= createButton("Start"); 
 next = createButton("Press to move on to next level"); 
 obGroup = new Group(); 
 obGroup2 = new Group(); 
 
 


}



function draw(){
    
    background(0); 
    mario.collide(ground); 
    //monster.collide(ground); 
    //princess.collide(ground); 
    
    bg.velocityX = -5; 
    if(bg.x<100){
        bg.x = displayWidth/2; 
    }
    if(gameState===0){
        bg.velocityX = 0; 
        mario.visible=false; 
        monster.addImage(monster_image); 
        princess.addImage(princess_img); 
        h1.visible = false; 
        h2.visible = false; 
        h3.visible = false; 
        bg2.visible = false; 
        bg3.visible = false; 
        bg4.visible = false; 
        
       
        princess.scale=0.15; 
        monster.scale = 0.15; 
        bubble.scale = 0.8; 
        bubble.addImage(bubble_image); 
        chat.addImage(chat_image); 
        start.position(displayWidth-200,displayHeight/2);         
        start.mousePressed(()=>{
        gameState = 1; 
        }); 


    }
    if(gameState===1){
        monster.visible=false; 
        princess.visible = false; 
        bubble.visible = false; 
        chat.visible = false; 
        start.hide();  
        mario.visible = true;
        score = score+Math.round(frameRate()/30); 
        if(count===0){
            h1.visible = true; 
            h2.visible = true; 
            h3.visible = true; 
        }
        if(count===10){
            h1.visible = false;
        }
        if(count===20){
            h1.visible = false; 
            h2.visible = false; 
        }
        if(count===30){
            h1.visible = false; 
            h2.visible = false; 
            h3.visible = false; 
            
        }
        
        bg.velocityX = -5; 
        obstacles(); 
        pipes(); 
        if(keyDown("space")&& mario.y>590){
            mario.velocityY = -15; 
            

        }
        mario.velocityY = mario.velocityY+0.5; 
        //console.log(mario.y);
        flag = 0; 
    if(obGroup.isTouching(mario)&& flag===0){
        flag = 1; 
        
        console.log(count);  
        
        
        
    }
    if(flag===1){
        flag = 0; 
        count = count+1; 
       
    }
}
if(score===500){
    gameState = 3; 
    if(gameState===3){
        bg.visible = true; 
        bg2.visible = false; 
        bg3.visible = false; 
        bg4.visible = false; 
        h1.visible = false; 
        h2.visible = false; 
        h3.visible = false;
        bg.velocityX = 0; 
        mario.visible = false; 
        ob.visible = false; 
        pipe.visible  = false; 
        text("You've passed the first level, and are one step closer to save the princess",950,250); 
        next.position(displayWidth-200,displayHeight/2); 
        next.mousePressed(()=>{
            gameState = 4; 
        }); 

    }
    if(gameState===4){
        bg.visible = false; 
        bg2.visible = true; 
        bg3.visible = false; 
        bg4.visible = false; 
        mario.visible = true; 
        h1.visible = true; 
        h2.visible = true; 
        h3.visible = true;
        next.hide(); 
        plants(); 
    }
}
    drawSprites(); 
    textSize(25); 
    text("Score "+score,displayWidth-200,50); 
    }
function obstacles(){
    if(frameCount%100===0){
    ob = createSprite(displayWidth+20,670); 
    ob.addImage(ob_image);
    //ob.collide(ground);  
    ob.velocityX = -10;
    ob.scale = 0.3;  
    ob.lifetime = 375;
    obGroup.add(ob);  
    }
}
function pipes(){
    if(frameCount%250===0){
        pipe = createSprite(displayWidth+20,670); 
        pipe.addImage(pipe_image); 
        //pipe.collide(ground); 
        pipe.velocityX = -10; 
        pipe.scale = 0.1; 
        pipe.lifetime = 375; 
        obGroup.add(pipe); 
        console.log(pipe.y); 
    }
}
function plants(){
    if(frameCount%100===0){
    plant = createSprite(displayWidth+200,670); 
    plant.addImage(plant_image); 
    plant.velocityX = -10; 
    plant.scale = 0.2; 
    obGroup2.add(plant); 
    plant.lifetime = 375; 

    }
}

    



    
    
    
