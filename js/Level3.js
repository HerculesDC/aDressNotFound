/**
 * Level3 state.
 */
function Level3() {
	Phaser.State.call(this);
}

/** @type Phaser.State */

var proto = Object.create(Phaser.State.prototype);
Level3.prototype = proto;
Level3.prototype.constructor = Level3;

Level3.prototype.preload = function() {
	// TODO: generated method.
	this.load.pack("level", "assets/assets-pack.json");
};

Level3.prototype.create = function() {
	
	this.scene = new Scene3(this.game);
	
};