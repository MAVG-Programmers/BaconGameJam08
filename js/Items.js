//spawns items
function itemspawner() {

	/**
	  * The cummulative probability of all items
	  */
	var totalProbability = 0;

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
	};

	/**
	  * Updates all active items, eventually spawns a new itembox
	  *
	  * @method update
	  */
	var update = function()	{

	};
	
	/**
	  * Recalculates the relative probability for every item
	  *
	  * @method recalcRelativeProbabilities
	  */
	var recalcRelativeProbabilities = function() {
		for(var i = 0; i < this.items.length; i++) {
			this.items[i].normProbability = this.items[i].relProbability/this.totalProbability;
		}
	};
}