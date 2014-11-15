var queueDistance = 40
function ItemSymbol(effect, type)
{
	this.img = new Image()
	this.img.src = "images/test2.png" // path depending on type

	this.effect = effect

	this.x = canvas.width/2 + itemQueue.queueItems.length * queueDistance
	this.y = canvas.height * 0.8
	this.scale = 1
	this.width = 50
	this.height = 50
	this.vector = [0,0]

	this.motionCounter = 0
	this.motionSpeed = 0

	this.startX = this.x
	this.startY = this.y
	this.startScale = this.scale
	
	this.refX = this.x
	this.refY = this.y
	this.refScale = this.scale

	itemQueue.queueItems[itemQueue.queueItems.length] = this

	this.planMotion = function(toX, toY, toScale)
	{
		this.refX = toX
		this.refY = toY
		this.refScale = toScale

		this.motionSpeed = Math.PI/(2*Math.sqrt((this.x-this.refX)*(this.x-this.refX)+(this.y-this.refY)*(this.y-this.refY)))

		if ((this.y-this.refY) == 0)
		{
			this.vector=[1,0]
		}
		else
		{
			this.vector=[0,1]
		}
	}

	this.update = function()
	{
		this.x = this.startX-2*this.vector[0]*queueDistance*Math.sin(this.motionCounter)
		this.y = this.startY-this.vector[1]*100*Math.sin(this.motionCounter)

		this.motionCounter+= this.motionSpeed
		if (this.motionCounter >= Math.PI/2)
		{
			itemQueue.changingPosition = false
			this.startX = this.x
			this.startY = this.y
			this.motionCounter = 0
		}
	}

	this.draw = function()
	{
		ctx.drawImage(this.img, this.x-this.scale*this.width*0.5, this.y-this.scale*this.height*0.5, this.scale*this.width, this.scale*this.height)
	}
}
