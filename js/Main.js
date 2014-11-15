// Create the canvas
//THis is my comment

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

canvas.width = w.innerWidth;
canvas.height = w.innerHeight;
document.body.appendChild(canvas);

// powerUps:

var shotGun = 0

var slowMotion = 0
var speedMod = 1

// store

// LocalStorage --

if (localStorage.getItem("record") == null) {
    var localHighScore = []
} else {
    var localHighScore = localStorage.getItem("record").split(",");

    //console.trace("Local High Scores: ")
    for (var i = 0; i < localHighScore.length; i++) {
        //console.trace(String(i+1) + ". " + String(localHighScore[i]) + " seconds")
    }
}

function compareNumbers(a, b) {
    return a - b;
}

function loseGame() {
    survivedSeconds = String(Math.floor((Date.now() - startTime) / 1000))
    //meOverFunction(Math.floor((Date.now()-startTime)/1000));
    gameOver = true
    ballArray = []
    aoeArray = []
    turnedArray = []
    itemBoxArray = []
    shotArray = []
    fighterArray = []
    explodingArray = []
    center.x = 4000
    center.y = 4000
    center.x = 4000
    center.y = 4000
    center.radius = 200
    pad.x = 4000
    pad.y = 4000

    localHighScore.push(survivedSeconds)
    localHighScore.sort(compareNumbers)
    localStorage.setItem("record", localHighScore);
    document.getElementById("overlay").style.display = "block";
    document.getElementById("score").value = survivedSeconds
}

// Game objects

center = new Center()

var ballArray = []
var itemBoxArray = []
var wasteArray = []
var turnedArray = []
var fighterArray = []
var shotArray = []
var explodingArray = []
var laserArray = []
var aoeArray = []

var rect = canvas.getBoundingClientRect();
var mouseX = 0
var mouseY = 0
var angle = 0

var pad = new Pad()
pad.draw()
var itemQueue = new ItemQueue()


// wasteBall CODE DISABLES RIGHT CLICKING - SHOULD BE ACTIVATED IN THE RELEASED GAME - DEACTIVATED FOR DEBUGGING PURPOSES
document.oncontextmenu = function(e)
{
	itemQueue.queueMovement()
	 //var evt = new Object({keyCode:93}); activate
	 //stopEvent(e); activate
	 //keyboardUp(evt);
}
/*
function stopEvent(event){
 if(event.preventDefault != undefined)
  event.preventDefault();
 if(event.stopPropagation != undefined)
  event.stopPropagation();
}*/

var submittedScore = false
document.getElementById("playagainbtn").addEventListener("click", function(e) {
    location.reload();
    document.getElementById("overlay").style.display = "none";
}, false);

document.getElementById("save").addEventListener("click", function(e) {
    if (submittedScore == false) {
        submitscore(document.getElementById("namefield").value, survivedSeconds);
        submittedScore = true
    }
}, false);

navigator.sayswho = (function() {
    var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) return 'Opera ' + tem[1];
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

var soundType = ""
if (navigator.sayswho.indexOf("Opera") == -1) {
    soundType = ".mp3"
} else {
    soundType = ".wav"
}

function doMouseDown(event) {
    center.firing = true

    //testcode
	var itemSymbol = new ItemSymbol(shotgun, "test")
	itemQueue.queueItems[itemQueue.queueItems.length] = itemSymbol
}

function doMouseUp(event) {
    center.firing = false
}


function getX(event, canvas) {
    if (event.offsetX) {
        return event.offsetX;
    }
    if (event.clientX) {
        return event.clientX - canvas.offsetLeft;
    }
    return null;
}

function getY(event, canvas) {
    if (event.offsetY) { //chrome and IE
        return event.offsetY;
    }
    if (event.clientY) { // FF
        return event.clientY - canvas.offsetTop;
    }
    return null;
}

addEventListener("mousemove", function(e) {

	mouseX = getX(e, canvas);
	mouseY = getY(e, canvas);
	var dx = mouseX - center.x
    var dy = center.y - mouseY

    pad.deltaRotation = Math.atan2(-dy, dx) - angle

    angle = Math.atan2(-dy, dx)

    if (pad.deltaRotation > Math.PI) {
        pad.deltaRotation = 2 * Math.PI - pad.deltaRotation
    }

    pad.rotation = angle

}, false);

var spawnLimit = 0.01
var test = false

var collisionManager = new CollisionManager();
var itemManager = new ItemManager();

var gameOver = false
var survivedSeconds = 0
var bar = new jetBar();

var update = function(modifier) {
    GameOver(modifier);

    updateFighterBar(modifier);

    updateBlast(modifier)

    updateItemBoxes(modifier)

    updateBall(modifier);

    updateLasers(modifier);

    updateShots(modifier);

    updateFighters(modifier);

    itemQueue.update()

};

var render = function(deltaTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#36A8E0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = 'rgba(' + String(a) + ',' + String(b) + ',' + String(c) + ',' + String(0.4) + ')';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (gameOver == true) {
        ctx.fillStyle = "black"
        ctx.font = "20px Tekton Pro";
        ctx.fillText("You survived " + survivedSeconds + " seconds of invading balls. ", canvas.width / 2 - 150, canvas.height / 2 - 25)
        ctx.fillText("Press SPACE to try again.", canvas.width / 2 - 100, canvas.height / 2)
    } else if (gameOver == false) {
        bar.drawLine(fighterBar, deltaTime);

        drawBlast();

        centerColor = "rgb(" + String(center.redCounter) + ", 0, 0)";
        center.redCounter = Math.max(center.redCounter - 1, 0)
        center.gunCounter = Math.max(center.gunCounter - 1, 0)
        drawBall();

        drawExploding();

        drawFighters();

        drawShots();

        drawLasers();

        drawItemBoxes();

        pad.draw()

        center.draw()

		itemQueue.draw()

		drawTurned(deltaTime);
    	drawWaste(deltaTime);

        var Now = Date.now()
        survivedSeconds = Math.floor((Now - startTime) / 1000)
        ctx.fillStyle = "black"
        ctx.font = "60px Arial Black";
        ctx.fillText(String(Math.floor((Now - startTime) / 1000)), canvas.width / 2 - 20, 100)
    }

    //var wind = 0.05*Math.random()+0.5+0.05*Math.sin(0.01*d)-0.03*center.radius+0.2
    //console.trace(wind)
    //ctx.fillStyle = 'rgba('+String(a)+','+String(b)+','+String(c)+','+String(wind)+')';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    screenColorChanger();
};

var startTime = Date.now();
var aCounter = 1
var increasing = "a"
var a = 0
var b = 255
var c = 255
var d = 1

var main = function() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render(delta / 1000);

    then = now;
    requestAnimationFrame(main);
};

var songLength = 15 * 60
if (soundType == ".wav") {
    var music = new Audio("music/Mix3.ogg");
} else {
    var music = new Audio("music/Mix3" + soundType);
}


var then = Date.now();
main();


var comboSounds = [new Audio("sound/Combo/2/1" + soundType), new Audio("sound/Combo/2/2" + soundType), new Audio("sound/Combo/2/3" + soundType)]
var comboThen = 0
var comboStage = 0
var comboHits = 0

addEventListener("mousedown", doMouseDown, false);
addEventListener("mouseup", doMouseUp, false);

addEventListener("keydown", keyboard, true);

var muted = true

if (muted == false) {
    music.play()
}


var fighterBar = 0;
var fighterBarMax = canvas.width;
var fighterBarReloadTime = 1000
var fighterBarSpeed = fighterBarMax / fighterBarReloadTime

function keyboard(e) {
    if (e.keyCode === 87) //32 = space
    {
        // W
        if (center.redCounter < 50) {
            var blast = new AoEBlast();
            blast.spawn(center.x, center.y, center.radius, 300, true);
        } else if (muted == false) {
            // REFUSE BUY
            var refuseSound = new Audio("sound/Reject1" + soundType);
            refuseSound.play()
        }

    } else if (e.keyCode == 69) {
        // E
        if (fighterBar >= fighterBarMax) {
            var fighter = new Fighter();
            fighter.spawn();
            fighterBar = 0;
        }

        if (muted == false) {
            // REFUSE BUY
            var refuseSound = new Audio("sound/Reject1" + soundType);
            refuseSound.play()
        }

    } else if (e.keyCode == 77) {
        // E
        muted = !muted
    } else if (e.keyCode == 32) {
        // SPACE
        if (gameOver == true) {
            location.reload();
        } else //INSTADEATH
        {
            loseGame()
        }
    }
}

function submitscore(name, score) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("POST", "http://waveos.pf-control.de/scores/submitscore.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("username=" + name + "&score=" + score);
}

function GameOver(modifier) {
    if (gameOver == false) {
        if (Math.random() < spawnLimit && gameOver == false) {
            var ball = new Ball();
            ball.spawn(ballSpeed + 10 * spawnLimit);
            spawnLimit += modifier * 0.01

            var nI = new ItemBox()
            nI.spawn()
        }

        if (center.firing && center.gunCounter < gunLimit) {
            if (center.redCounter < 255 - redLimit) {
                if (shotGun == 0) {
                    if (muted == false) {
                        var snd = new Audio("sound/Menu1" + soundType);
                        snd.play()
                    }

                    var laser = new Laser();
                    //laser.spawn((Math.random()-0.5)*accuracy + (Math.random()-0.5)*center.gunCounter*recoil, 1);
                    laser.spawn(0, 1)
                } else {
                    var numLasers = 5
                    var angleError = -0.1
                    if (muted == false) {
                        var snd = new Audio("sound/Menu1.wav");
                        snd.play()
                    }

                    for (l = 0; l < numLasers; l++) {
                        console.trace("Fire")
                        var laser = new Laser();
                        laser.spawn(angleError, 5);
                        angleError += 0.05
                    }
                }
            } else if (muted == false) {
                var refuseSound = new Audio("sound/Reject1" + soundType);
                refuseSound.play()
            }
        }
    }
}

function updateFighterBar(modifier) {
    if (fighterBar <= fighterBarMax) {
        fighterBar += fighterBarSpeed;
    }

    if (center.changing == true) {
        center.radiusChanger(modifier)
    }
}

function drawTurned(modifier) {
    turnedArray.forEach(function(turned) {
        turned.drawTurned(modifier);
    });
}

function updateBlast(modifier) {
    aoeArray.forEach(function(blast) {
        blast.updateBlast(modifier);
    });
}

function drawBlast() {
    aoeArray.forEach(function(blast) {
        blast.drawBlast();
    });
}

function updateItemBoxes() {
    itemBoxArray.forEach(function(itemBox) {
        itemBox.update();
    });
}

function drawItemBoxes() {
    itemBoxArray.forEach(function(itemBox) {
        itemBox.draw();
    });
}

function updateBall(modifier) {
    ballArray.forEach(function(ball) {
        ball.updateBall(modifier);

    });
}

function drawBall() {
    ballArray.forEach(function(ball) {
        ball.draw();
    });
}

function drawWaste(modifier) {
    wasteArray.forEach(function(wasteBall) {
        wasteBall.drawWaste(modifier);
    });
}

function drawExploding() {
    explodingArray.forEach(function(explodingBall) {
        explodingBall.die()
        explodingBall.draw()
    });
}

function updateLasers(modifier) {
    laserArray.forEach(function(laser) {
        laser.updateLaser(modifier);
    });
}

function drawLasers() {
    laserArray.forEach(function(laser) {
        laser.drawLaser();
    });
}

function updateShots(modifier) {
    shotArray.forEach(function(shot) {
		shot.updateShot(modifier);
    });
}

function drawShots() {
    shotArray.forEach(function(shot) {
        shot.drawShot();
    });
}

function updateFighters(modifier) {
    fighterArray.forEach(function(fighter) {
        fighter.updateFighter(modifier);
    });
}

function drawFighters() {
    fighterArray.forEach(function(fighter) {
        fighter.drawFighter()
    });
}

function screenColorChanger() {
    d += 1
    if (increasing == "a") {
        a += 1
        b -= 1
        if (a == 255) {
            increasing = "b"
        }
    } else if (increasing == "b") {
        b += 1
        c -= 1
        if (b == 255) {
            increasing = "c"
        }
    } else {
        c += 1
        a -= 1
        if (c == 255) {
            increasing = "a"
        }
    }
}

window.setInterval(function(){
	if (shotGun > 0)
	{
		shotGun-=1
	}
	if (slowMotion > 0)
	{
		slowMotion -= 1
		if ( slowMotion == 0)
		{
			speedMod = 1
		}
	}
}, 1000);