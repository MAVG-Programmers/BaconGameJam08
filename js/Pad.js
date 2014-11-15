function Pad()
{
	this.x = center.x
	this.y = center.y
	this.padWidth = 8
	this.padLength = Math.PI/2
	this.rotation = 0
	this.deltaRotation = 0
	this.draw = function()
	{
		//console.trace(this.rotation)
		ctx.strokeStyle = "#0000ff";
		ctx.beginPath();
      	ctx.arc(this.x, this.y, center.radius+this.padWidth*0.5, this.rotation-0.5*this.padLength, this.rotation + 0.5*this.padLength, false);
      	ctx.lineWidth = this.padWidth
		ctx.stroke();
	}
}