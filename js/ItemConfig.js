

//spawns items
function ItemManager()
{
	this.decideItem = function()
	{
		var totalP = 0
		var item;

		for(item in items) 
		{
			if (items[item][2])
			{
				totalP += items[item][1]
			}
		}

		var randomSelection = Math.floor(totalP*Math.random())
		var Pcounter = 0

		for(item in items) 
		{
			Pcounter += items[item][1]
			if (Pcounter > randomSelection)
			{
				return [items[item][0], item]
			}
		}
	}
}

// items

var slowMotion = function()
{
	speedMod = 0.5
	slowMotion += 30
}

var shotgun = function()
{
	shotGun += 30
}


var items=
{
	//  Function, probability, active
	"slowMotion": [slowMotion, 5, true],
	"shotgun": [shotgun, 10, true]
}
