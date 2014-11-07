function Pad()
{
	this.padWidth = 10
	this.width = Math.PI/2
	this.draw = function()
	{
		ctx.strokeStyle = "#0000ff";
		ctx.beginPath();
      	ctx.arc(pad.x, pad.y, center.radius+this.padWidth*0.5, pad.visualRotation - this.width*0.5, pad.visualRotation + this.width*0.5, false);
      	ctx.lineWidth = this.padWidth
		ctx.stroke();
	}
}