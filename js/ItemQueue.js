
function ItemQueue()
{
	this.queueItems = []
	this.changingPosition = false

	/*this.addItem = function(effect, image)
	{
		var itemSymbol = new itemSymbol(effect, image)
		this.queueItems[this.queueItems.length] = itemSymbol
	}*/

	this.queueMovement = function()
	{
		this.changingPosition = true;
		for (var n = 0; n < this.queueItems.length; n++)
		{
			console.trace(n)
			var queueItem = this.queueItems[n]
			if (n == 0)
			{
				queueItem.planMotion(queueItem.x pad.y, 1)
				queueItem.effect()
			}
			else if (n == 1)
			{
				queueItem.planMotion(queueItem.x-2*queueDistance, queueItem.y, 2)
			}
			else
			{
				queueItem.planMotion(queueItem.x-2*queueDistance, queueItem.y, 1)
			}
		}
	}

	this.update = function()
	{
		if (this.changingPosition)
		{
			this.queueItems.forEach(function(item) 
			{
	        	item.update()
	    	});
		}
	}

	this.draw = function()
	{
		this.queueItems.forEach(function(item) 
		{
        	item.draw()
    	});
	}
}
