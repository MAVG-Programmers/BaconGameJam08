//spawns items
function itemspawner() {

	/**
	  * The cummulative probability of all items
	  */
	var totalProbability = 0;

	/**
	  * The spawn rate of the items. Higher spawnRate causes more itemboxes to spawn.
	  */
	var spawnRate = 0.1;

	/**
	  * The items that can be spawned
	  */
	var items = [];

	/**
	  * Adds an Item to the itemarray. The item spawner is biased according to the item's probability.
	  * 
	  * @method addItem
	  * @param {item} The item that will be added
	  * @param {float} The relative probability of the item
	  */
	var addItem = function(item, probability) {
		this.totalProbability += probability;
		this.recalcRelativeProbabilities();
		this.items.push(item);
		this.items[this.items.length-1];
	};

	/**
	  * Checks whether a new item needs to be spawned and eventually spawns one.
	  *
	  * @method update
	  */
	var update = function()	{
		if(Math.random() < spawnRate) {
			var iBox = new itemBox();
			var rnd = Math.random();
			for (var i = 0; i < this.items.length; i++) {
				if(rnd > this.items[i].probStart && rnd < (this.items[i].probStart + this.items[i].normProbability)) {
					iBox.itemType = this.items[i];
				}
			}
		}
	};
	
	/**
	  * Recalculates the relative probability for every item
	  *
	  * @method recalcRelativeProbabilities
	  */
	var recalcRelativeProbabilities = function() {
		for(var i = 0; i < this.items.length; i++) {
			this.items[i].probStart = 0;
			for(var j = 0; j < i; j++) {
				this.items[i].probStart += this.items[j].normProbability;
			}
			this.items[i].normProbability = this.items[i].relProbability/this.totalProbability;
		}
	};
}