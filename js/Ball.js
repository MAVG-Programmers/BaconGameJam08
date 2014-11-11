var ballSpeed = 100
var spawnDistance = 700

function Ball() 
{
	this.spawn = function(speed, SpeedMod)
	{
		this.crashing = false
		this.destroyed = false;
		this.expectedToCrash = true
		this.beingTargeted = false
		this.friendly = false
		this.radius = 7
		this.color = ballColor
		var rNumber = Math.random()
		if (test == true)
		{
			this.x = 0
			this.y = 0
		}
		else
		{
			this.x = center.x + spawnDistance*Math.cos(rNumber* 2 * Math.PI)
	 		this.y = center.y + spawnDistance*Math.sin(rNumber * 2 * Math.PI)
		}
		
	 	this.spawnX = this.x
	 	this.spawnY = this.y
	 	this.speed = speed * 0.8
	    ballArray[ballArray.length] = this
		this.giveDirection((center.x), (center.y), true)
	}

	this.giveDirection = function(toX, toY, expectedToCrash)
	{
		this.flightCounterSpeed = 1
		this.flightCounter = 0;
		this.expectedToCrash = expectedToCrash
	 	this.startX = this.x
	 	this.startY = this.y
		   
	   	var dx = this.x - toX
	   	var dy = toY  - this.y

	   	this.a = dy/dx
	    this.b = this.y - this.a*this.x

	    this.absvector = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
		this.vector = [-this.speed * dx / this.absvector,-this.speed * dy / this.absvector];

		if (expectedToCrash == true)
		{
			var circleHit = center.radius + 10
			var sx = this.x - center.x
		   	var sy = center.y  - this.y
		   	
			//this.crashTime = -(Math.sqrt(-4*(this.vector[0]*this.vector[0]+this.vector[1]*this.vector[1])*(-(this.radius + circleHit)*(this.radius + circleHit)+sx*sx+sy*sy) + (2*sx*this.vector[0]+2*sy*this.vector[1])*(2*sx*this.vector[0]+2*sy*this.vector[1]))+2*sx*this.vector[0]+2*sy*this.vector[1])/(2*this.vector[0]*this.vector[0]+2*this.vector[1]*this.vector[1])
			//this.crashTime = Number(this.crashTime.toFixed(2))
			this.crashTime = (spawnDistance-center.radius-this.radius-10)/(this.speed*100)
			var distance = Math.sqrt(dx * dx + dy * dy)

			this.crashAngle = -Math.atan2(dy, dx)
			this.testCrashAngle = 180 + 180 * -this.crashAngle / Math.PI
		}
	}

	this.turn = function()
	{
		this.destroyed = true;
		if (muted == false)
		{
			var snd = new Audio("sound/Interface1"+soundType);
			snd.play()
		}
		
		ballArray.splice(ballArray.indexOf(this), 1)
		turnedArray[turnedArray.length] = this
		this.friendly = true
		this.color = "#0000ff"

		if (Math.abs(deltaRotation) > 0)
		{
			var angleChange = 10*deltaRotation
			angleChange = Math.max(angleChange, -Math.PI/3)
			angleChange = Math.min(angleChange, Math.PI/3)
			this.crashAngle += angleChange
		}
		

		this.circleCounter = 0
		
		this.orbitRadius = Math.min(2*center.radius + 2*Math.random()*center.radius + 0.5*deltaMouse*deltaMouse, 4*canvas.height)

		this.circleSpeed = this.speed*100/Math.pow(this.orbitRadius,2)
		/*this.orbitX = Math.cos(this.crashAngle)
		this.orbitX = Math.max(0.5, this.orbitX)

		this.orbitY = Math.sin(this.crashAngle)
		this.orbitY = Math.max(0.5, this.orbitY)*/

		this.expectedToCrash = false
		this.errorSpeedX = 0
		this.errorSpeedY = 0
	}

	this.moveIntoOrbit = function()
	{
		var refX = center.x + this.orbitRadius*Math.cos(this.circleCounter + this.crashAngle)
		var refY = center.y + this.orbitRadius*Math.sin(this.circleCounter + this.crashAngle)

		this.errorSpeedX = refX-this.x
		this.errorSpeedY = refY-this.y
	}

	this.updateBall = function(ball, modifier)
	{
		ball.flightCounter += 0.01;
		console.trace(ball.vector[0]);

		ball.x+=ball.vector[0]
		ball.y-=ball.vector[1]
		/*ball.x = ball.startX + ball.vector[0] * ball.flightCounter;
		ball.y = ball.startY - ball.vector[1] * ball.flightCounter;*/
         
        if (ball.flightCounter >= ball.crashTime && ball.flightCounter < ball.crashTime +8/(ball.speed*100))
        {
        	var Dangle = Math.abs(ball.crashAngle-pad.rotation)
			 
			if(Dangle > Math.PI) 
			{
				Dangle = 2*Math.PI - Dangle
			}				
			var ComboThen = comboThen
			var now = survivedSeconds
	       	if (Dangle < Math.PI/4 + Math.min(Math.PI/6,Math.abs(4*deltaRotation)))
	        {
	       		ball.turn()
	        		
				if (survivedSeconds-ComboThen <= 1)
	       		{
	       			comboThen = now
	       			
	       			if (comboStage >= 1)
        			{	        				
        				try
	        			{
        				if (muted == false)
       					{
        						comboSounds[comboStage-1].play()
        					}
        					
        				}
        				catch (e)
        				{
        					console.trace("-")
        				}
        			}
        			comboStage += 1
        			comboHits += 1  
        			
					if(comboStage == 4)
        			{
        				if(center.radius <= 50)
        				{
        					center.handleRadiusChange(comboHits*5)
        				}
        			}
        		}
        		else
        		{
        			comboThen = now
        			comboHits = 1
        			comboStage = 1
        		}
        	}
       	}
 		
        else if (ball.flightCounter > ball.crashTime + 20/(ball.speed*100) && ball.crashing==false)
        {
        	center.redCounter = Math.min(center.redCounter+30, 255)
        	comboHits = 0
        	comboStage = 0
        	
        	ball.crashing=true
        	center.handleRadiusChange(-5)
        	if (muted == false)
        	{
   				var haakon = new Audio("sound/LoseHealth"+soundType);
				haakon.play()
        	}
        	
        	ballArray.splice(ballArray.indexOf(ball),1)
        	pad.draw()
        }
        //console.trace(ball.flightCounter, ball.crashTime, ball.speed, ball.crashing)
	}

 	this.draw = function() 
 	{
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fill();
        ctx.closePath();
    };
}