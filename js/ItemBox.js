var startAngleError = Math.PI/6
var gravity = 1500
var speed =3
function ItemBox() 
{
	this.spawn = function()
	{

		this.radius = 10

		var rNumber = Math.random()
		this.x = center.x + spawnDistance*Math.cos(rNumber* 2 * Math.PI)
	 	this.y = center.y + spawnDistance*Math.sin(rNumber * 2 * Math.PI)
	 	var dx = center.x-this.x
	 	var dy = center.y-this.y

	 	this.a = Math.atan2(dy, dx)

	 	var rn = Math.random()-0.5

	 	this.a += Math.abs(rn)/rn * startAngleError

	 	this.vector = [speed*Math.cos(this.a), speed*Math.sin(this.a)]

	 	itemBoxArray[itemBoxArray.length] = this
	}

	this.update = function(modifier)
	{
		var dx = this.x-center.x
	 	var dy = center.y-this.y
	 	var distanceSquared = dx*dx+dy*dy

	 	this.a = Math.atan2(dx, dy)
		this.vector[0]-= gravity*Math.sin(this.a)/distanceSquared
		this.vector[1]+= gravity*Math.cos(this.a)/distanceSquared
		this.x += this.vector[0]
		this.y += this.vector[1]
	};
	this.draw = function() 
 	{
 		ctx.fillStyle = 'rgba('+String(c)+','+String(b)+','+String(a)+','+String(1)+')';
 		ctx.fillRect(this.x, this.y, 2*this.radius, 2*this.radius)
    };
}
var ItemList = [SloMo];

var SloMo = function(speed){
 	function SloEffect(speedMod){ // Why do you have a function inside a function?
 		// Why is speedMod an input when it is not being used in the function?
 		if(SloMo === true){ // You just declared SloMo to be a function, why are you testing if it is a boolean?
 			{ // Two brackets, syntax error
 			Ball.spawn(speed, .5); // You can use this function on an instance of the class Ball, not on the clasw itself. It's a huge difference. You can climb A mountain, but you cannot climb the concept "mountain". Get it?
 			Ball.update(true); // Same. Btw, I don't think the update function of Ball has a parameter that should be "true" and the update function in ball is called "updateBall"
 			ItemBox.update(true); // Same
 			console.log("slomo is true")
 			setTimeout(function() { // This is supposed to delay the function? For 5 seconds?
			
 				var SloMo = false; // Why are you declaring the function to be equal to false?


 			}, 5000);

 			var NormalEyz = function(speedMod){  // Why another function inside another function? Why is SloMo a function???
			// Why is speedMod an input when it is not being used in the function?
 				do setTimeout(function() { // You cannot use "do" like this. I don't think there is any other usage of do than "do while", which is the same as a while loop except for that it has to run at least once. I understood that you thought you could use while 5 lines below do, and that the program would understand the magic link. It won't.
 			Ball.spawn(speed, 1) // Same as above. And even if this was valid code, why the hell would you want to spawn a ball in a slow motion function?
 			Ball.update(true); // Same as above. And there is no point in updating a ball once, even if this was valid code. That has to be done all the time, which it is automatically with balls.
 			console.log("NormalEyz")
				
 			}, 5000);
 				while(NormalEyz === true) // Again, how can you possibly test if a FUNCTION IS EQUAL TO A BOOLEAN???? A function can return a boolean, but it cannot BE a boolean itself.
 				} // 
 			} // Why are there three similar brackets in a row? This is probably a syntax error.
 				}else{ // Else? Else what? There is no if.
 					NormalEyz === true; // Point 1: NormalEyz is supposed to be a function. It's not normal to declare a function to be true. Point 2: You declare variables with just one equal sign.
 					console.log("DO IT!");
 						}
 		var SloMo = true; // You set a function to be true again, why? And SloMo is already declared, so you don't need the "var" part.
 }
 } // And why is the intendation probably the worst I've ever seen?
 // And I have no idea of what you're trying to achieve here.
 // Slow motion can be implemented just by using a Number variable slowMotion on which the ball movement depends.
 // So, in conclusion, this is both worthless and a piece of crap
 // ;)

