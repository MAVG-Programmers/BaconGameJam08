//manages the items
function itemmanager() {

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
	  */
	var update = function()	{

	};

	/**
	  * Draws all active items
	  */
	var draw = function() {

	};

	/**
	  * Recalculates the relative probability for every item
	  */
	var recalcRelativeProbabilities = function() {
		for(var i = 0; i < this.items.length; i++) {
			this.items[i].normProbability = this.items[i].relProbability/this.totalProbability;
		}
	};
}