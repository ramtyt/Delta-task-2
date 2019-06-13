var canvas=document.getElementById("canvas");
var cxt=canvas.getContext("2d");

var width=600;
var height=600;
var canon_x=width/2-25;
var canon_y=height-50;
var canon_w=50;
var canon_h=50;
var i;
var score=0;


var leftPressed=false;
var rightPressed=false;
var enterPressed=false;

var enemyTotal=100;
var enemies=[];
var enemy_x;
var enemy_y;
var enemyRadius;




var bulletTotal=1;
var bullets=[];
var bullet_x;
var bullet_y;
var bulletRadius=5;


document.addEventListener("keydown",keyDown,false);
document.addEventListener("keyup",keyUp,false);

function keyDown(e){
	if(e.key=="ArrowLeft")
	{
		leftPressed=true;
	}
	if(e.key=="ArrowRight")
	{
		rightPressed=true;
	}
	if(e.key=="Enter" && bullets.length<bulletTotal)
	{
		bullets.push([canon_x+25,canon_y])
	}

}


function keyUp(e){
	if(e.key=="ArrowLeft")
	{
		leftPressed=false;
	}
	if(e.key=="ArrowRight")
	{
		rightPressed=false;
	}
	
}


function Enemie(enemy_x,enemy_y,dx,dy,status){
	this.enemy_x=enemy_x;
	this.enemy_y=enemy_y;
	this.dx=dx;
	this.dy=dy;
	this.status=status;
	this.draw=function(){
		
          cxt.beginPath();
          cxt.arc(this.enemy_x,this.enemy_y,50,0,Math.PI*2);
          cxt.fillStyle="red";
          cxt.fill();
          cxt.closePath();

	}
	this.moveEnemy=function(){
		
        this.enemy_x+=this.dx;
        this.enemy_y+=this.dy;
        if(this.enemy_x+50>canvas.width)
        {
        	this.dx=-this.dx;
        }
        if(this.enemy_y+50>canvas.height)
        {
        	this.dy=-this.dy;
        }
        if(this.enemy_y<0)
        {
        	this.dy=-this.dy;
        }
        if(this.enemy_x==300)
        {
        	this.dy+=11;

        }

        this.draw();
	}

}
	
var enemies=[];
var dx=7;
var dy=4;
var enemy_x=50;
var enemy_y=50;

for(i=0;i<100;i++)
{   
    
    
	enemies.push(new Enemie(enemy_x,enemy_y,dx,dy))
	enemy_x-=400;



}	


function drawBullet(){
	for(i=0;i<bullets.length;i++)
	{
		cxt.beginPath();
		cxt.arc(bullets[i][0],bullets[i][1],bulletRadius,0,Math.PI*2);
		cxt.fillStyle="red";
		cxt.fill();
		cxt.closePath();
	}
}

function fireBullet(){
	for(i=0;i<bullets.length;i++)
	{
		bullets[i][1]-=30;
		if(bullets[i][1]<0)
		{
			bullets.splice(i,1)
		}
	}
}

function collideTest(){
    
	for(i=0;i<bullets.length;i++)
	{
		for(var j=0;j<100;j++){
			
			if(bullets[i][0]>=enemies[j].enemy_x&&bullets[i][0]<=enemies[j].enemy_x+50&&bullets[i][1]>=enemies[j].enemy_y&&bullets[i][1]<=enemies[j].enemy_y+50)
			{   
				score++;
			
				bullets.splice(i,1);
			
			
				enemies.splice(j,1);
                
			}
			
		}
	}
}


function collideCanon(){
	for(var i=0;i<100;i++)
	{
		if(enemies[i].enemy_x+50>canon_x&&enemies[i].enemy_x+50<canon_x+50&&enemies[i].enemy_y+50>canon_y&&enemies[i].enemy_y+50<canon_y+50)
			{
			alert("GAME OVER -->YOU LOSE");
			document.location.reload();
		    clearInterval(interval);
			}
		
  
	}
}







function drawCanon(){
    cxt.beginPath();
	cxt.rect(canon_x,canon_y,canon_w,canon_h);
	cxt.fillStyle="red";
	cxt.fill();
	cxt.closePath();

	if(rightPressed && canon_x<canvas.width-canon_w)
	{
       canon_x+=5;
       for(i=0;i<bullets.length;i++){
       bullets[i][0]+=5;
       }
	}
	if(leftPressed && canon_x>0)
	{
		canon_x-=5;
		for(i=0;i<bullets.length;i++){
       bullets[i][0]-=5;
       }
	}
}
function scoreTotal(){
	
	cxt.font="30px Arial";
	cxt.fillText("score:"+score,450,50);
    
    
}


function game(){
	cxt.clearRect(0,0,canvas.width,canvas.height);
	drawCanon();
	for(i=0;i<enemies.length;i++){
	enemies[i].moveEnemy();
  }
	drawBullet();
	fireBullet();

    collideTest();
    scoreTotal();
	collideCanon();
	
	
		
}

var interval=setInterval(game,25);