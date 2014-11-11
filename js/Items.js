var startAngleError = Math.PI/6
var gravity = 1500
var speed =3
function ItemBox() 
{
	this.spawn = function()
	{

		this.radius = 12

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

	this.updateItemBox = function(modifier)
	{
		var dx = this.x-center.x
	 	var dy = center.y-this.y
	 	var distanceSquared = dx*dx+dy*dy

	 	this.a = Math.atan2(dy, dx)

	 	this.a = Math.atan2(dx, dy)
		this.vector[0]-= gravity*Math.sin(this.a)/distanceSquared
		this.vector[1]+= gravity*Math.cos(this.a)/distanceSquared
		this.x += this.vector[0]
		this.y += this.vector[1]
		//console.trace(e, f, g)
	};
	this.draw = function() 
 	{
        //There was an error here where Eivind didn't set this up right!
        //ctx.fillStyle = 'rgba('+String(g)+','+String(e)+','+String(0)+', 1);
        //ctx.beginPath();
        //ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        //ctx.fill();
        //ctx.closePath();
        ctx.fillRect(this.x, this.y, 20, 20);
      
        
    };
}