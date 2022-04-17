var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.canvas.width = innerWidth;
ctx.canvas.height = innerHeight;

ctx.font = "25px Monospace";
ctx.fillText("Player 1", innerWidth / 4, innerHeight / 2.5 - 30);

var myUsername;
var opponentUsername;

const sword = new Image();
sword.src = 'https://www.seekpng.com/png/full/29-299682_sword-png.png';

function setNames(usr, enemy) {
	myUsername = usr;
	opponentUsername = enemy;
	redraw();
	sword.onload = () => {
		 ctx.drawImage(sword, innerWidth / 4 + 150, innerHeight / 2.5 +70, 170, 170)
	}
	knife.onload = () => {
		 ctx.drawImage(knife, 3 * (innerWidth / 4) - 70, innerHeight / 4 + 20, 70, 70)
	}
}

function drawWeapons() {
	ctx.drawImage(sword, innerWidth / 4 + 150, innerHeight / 2.5 +70, 170, 170)
	ctx.drawImage(knife, 3 * (innerWidth / 4) - 70, innerHeight / 4 + 20, 70, 70)
}

//fill player
const grass = new Image();
grass.src = 'https://i.imgur.com/ywQBlc0.png';

const cape = new Image();
	cape.src = 'https://static.wikia.nocookie.net/clubpenguin/images/4/49/BlueCape.png';



grass.onload = () => {
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(grass, innerWidth / 4 - 260, innerHeight / 2.5 + 30, 700, 700)
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(innerWidth / 4, innerHeight / 2.5, 180, 350);
	
	cape.onload = () => {
		 ctx.drawImage(cape, innerWidth / 4 - 40, innerHeight / 2.5 +60)
	}
	sword.onload = () => {
		 ctx.drawImage(sword, innerWidth / 4 + 150, innerHeight / 2.5 +70, 170, 170)
	}
}

ctx.font = "25px Monospace";
ctx.fillText("Player 2", 3 * (innerWidth / 4), innerHeight / 4 - 30);

const enemygrass = new Image();
enemygrass.src = 'https://i.imgur.com/ywQBlc0.png';

const mask = new Image();
	mask.src = 'https://i.imgur.com/x0AfrwF.png';

const knife = new Image();
	knife.src = 'https://i.imgur.com/Wcwmr3k.png';

enemygrass.onload = () => {
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(enemygrass, 3 * (innerWidth / 4) - 150, innerHeight / 4, 400, 400)
		//fill enemy
	ctx.fillStyle = "#0000FF";
	ctx.fillRect(3 * (innerWidth / 4), innerHeight / 4, 100, 170);
	
	mask.onload = () => {
		 ctx.drawImage(mask, 3 * (innerWidth / 4), innerHeight / 4 + 20, 130, 39)
	}
	
	knife.onload = () => {
		 ctx.drawImage(knife, 3 * (innerWidth / 4) - 70, innerHeight / 4 + 20, 70, 70)
	}
}

function redraw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";
	ctx.font = "25px Monospace";
	ctx.fillText(myUsername, innerWidth / 4, innerHeight / 2.5 - 30);
	ctx.fillText(opponentUsername, 3 * (innerWidth / 4), innerHeight / 4 - 30);
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(grass, innerWidth / 4 - 260, innerHeight / 2.5 + 30, 700, 700)
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(innerWidth / 4, innerHeight / 2.5, 180, 350);
	ctx.drawImage(cape, innerWidth / 4 - 40, innerHeight / 2.5 +60)
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(enemygrass, 3 * (innerWidth / 4) - 150, innerHeight / 4, 400, 400)
	ctx.fillStyle = "#0000FF";
	ctx.fillRect(3 * (innerWidth / 4), innerHeight / 4, 100, 170);
	ctx.drawImage(mask, 3 * (innerWidth / 4), innerHeight / 4 + 20, 130, 39);
	ctx.drawImage(knife, 3 * (innerWidth / 4) - 70, innerHeight / 4 + 20, 70, 70);
}

var light_slash = new Image();
light_slash.src = 'https://i.imgur.com/1k6Wz2b.png'

var shift = 0;
var frameWidth = 300;
var frameHeight = 300;
var totalFrames = 7;
var currentFrame = 0;

function light_attack_anim() {
  //ctx.clearRect(innerWidth / 4 + 150, innerHeight / 2.5, 430, 700);
 
  //draw each frame + place them in the middle
	redraw();
  ctx.drawImage(light_slash, shift, 0, 32, 32,
                    innerWidth / 4 + 150, innerHeight / 2.5 -100, 500, 500);
  shift += 32 + 1;
 
  /*
    Start at the beginning once you've reached the
    end of your sprite!
  */
  if (currentFrame == totalFrames) {
    shift = 0;
    currentFrame = 0;
		ctx.clearRect(innerWidth / 4 + 150, innerHeight / 2.5, 400, 700);
		redraw();
		ctx.drawImage(sword, innerWidth / 4 + 150, innerHeight / 2.5 +70, 170, 170)
		return false;
  }
 
  currentFrame++;
 	setTimeout(function(){ //throttle requestAnimationFrame to 20fps
        requestAnimationFrame(light_attack_anim)
    }, 1000/48)
}

var heavy_slash = new Image();
heavy_slash.src = 'https://i.imgur.com/0GMKUw6.png'

function heavy_attack_anim() {
	//ctx.clearRect(innerWidth / 4 + 150, innerHeight / 2.5 - 100, 420, 700);
 
  //draw each frame + place them in the middle
	redraw();
  ctx.drawImage(heavy_slash, shift, 0, 32, 32,
                    innerWidth / 4 + 150, innerHeight / 2.5 -100, 500, 500);
  shift += 32 + 1;
 
  /*
    Start at the beginning once you've reached the
    end of your sprite!
  */
  if (currentFrame == totalFrames) {
    shift = 0;
    currentFrame = 0;
		//ctx.clearRect(innerWidth / 4 + 150, innerHeight / 2.5, 420 - 100, 700);
		redraw();
		ctx.drawImage(sword, innerWidth / 4 + 150, innerHeight / 2.5 +70, 170, 170)
		return false;
  }
 
  currentFrame++;
 	setTimeout(function(){ //throttle requestAnimationFrame to 20fps
        requestAnimationFrame(heavy_attack_anim)
    }, 1000/48)
}

var heal = new Image();
heal.src = 'https://i.imgur.com/bOCibSr.png'

function heal_anim() {
	//ctx.clearRect(innerWidth / 4 + 150, innerHeight / 2.5 - 100, 420, 700);
 
  //draw each frame + place them in the middle
	redraw();
  ctx.drawImage(heal, shift, 0, 32, 32,
                    innerWidth / 4 + 150, innerHeight / 2.5 -100, 500, 500);
  shift += 32 + 1;
 
  /*
    Start at the beginning once you've reached the
    end of your sprite!
  */
  if (currentFrame == 12) {
    shift = 0;
    currentFrame = 0;
		//ctx.clearRect(innerWidth / 4 + 150, innerHeight / 2.5, 420 - 100, 700);
		redraw();
		ctx.drawImage(sword, innerWidth / 4 + 150, innerHeight / 2.5 +70, 170, 170)
		return false;
  }
 
  currentFrame++;
 	setTimeout(function(){ //throttle requestAnimationFrame to 20fps
        requestAnimationFrame(heal_anim)
    }, 1000/48)
}

var hit = new Image();
hit.src = 'https://i.imgur.com/63uJfu0.png'

function hitEnemy() {
	//ctx.clearRect(innerWidth / 4 - 100, innerHeight / 2.5 - 100, 500, 400);
 
  //draw each frame + place them in the middle
 	redraw();
	ctx.drawImage(hit, shift, 0, 32, 32,
                    innerWidth / 4 - 30, innerHeight / 2.5 + 40, 250, 250);
  shift += 32;
 
  /*
    Start at the beginning once you've reached the
    end of your sprite!
  */
  if (currentFrame == 9) {
    shift = 0;
    currentFrame = 0;
		//ctx.clearRect(innerWidth / 4 - 100, innerHeight / 2.5 - 100, 400, 400);
		redraw();
		ctx.drawImage(sword, innerWidth / 4 + 150, innerHeight / 2.5 +70, 170, 170)
		return false;
  }
 
  currentFrame++;
 	setTimeout(function(){ //throttle requestAnimationFrame to 20fps
        requestAnimationFrame(hitEnemy)
    }, 1000/48)
}


