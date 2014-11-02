
function itemBox() 
{
	this.spawn = function()
	{

	}

	this.move = function()
	{
		
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