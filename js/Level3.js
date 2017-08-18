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

var proto = Object.create(Phaser.State.prototype);
var flippedRight, flippedLeft = false; //used to fix player flipping
var responseCounter = 0;
var romanResponseTime = 50; //used to fix enemy flickering / flipping
var arrowCounter = 0;
var arrowResponseTime = 200; //used to reset arrow
var scrollSpeed = 0;
const newScroll3 = -300;
const romanSpeed3 = -150; //modified to 150
//Level.prototype = proto;
//Level.prototype.constructor = Level;
var holdSword = true;
var shooting = false;
var gameStarted = false;
var BGMusic, jumpSound, swordSound,bowSound,deathSound;
var agroRad = 1000;
var toggleCD = 10;
var toggleCounter = 10;
var health = 3;
var damageCD = 500;
var damageCounter = 500;

Level3.prototype.preload = function() {
	// TODO: generated method.
	this.load.pack("level", "assets/assets-pack.json");
};

Level3.prototype.create = function() {
	
	this.scene = new Scene3(this.game);
	
	// set the physics properties of the collision sprites
	   this.scene.fCollisionLayer.setAll("body.immovable", true);
	   this.scene.fCollisionLayer.setAll("body.allowGravity", false);
	   // hide all objects of the collision layer
	   this.scene.fCollisionLayer.setAll("renderable", false);
	   //adding base scroll speed to platforms
	   this.scene.fCollisionLayer.setAll("body.velocity.x", newScroll3);
	   
	 //initializing arrow porperties
	   this.scene.fArrows.setAll("renderable", false);
	   this.scene.fArrows.setAll("body.immovable", true);
	   this.scene.fArrows.setAll("body.allowGravity", false);
	   
	   this.scene.fHazards.setAll("body.immovable", true);
	   this.scene.fHazards.setAll("body.allowGravity", false);
	   this.scene.fHazards.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fH000.setAll("body.immovable", true);
	   this.scene.fH000.setAll("body.allowGravity", false);
	   this.scene.fH000.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fH001.setAll("body.immovable", true);
	   this.scene.fH001.setAll("body.allowGravity", false);
	   this.scene.fH001.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fH002.setAll("body.immovable", true);
	   this.scene.fH002.setAll("body.allowGravity", false);
	   this.scene.fH002.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fH003.setAll("body.immovable", true);
	   this.scene.fH003.setAll("body.allowGravity", false);
	   this.scene.fH003.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fH004.setAll("body.immovable", true);
	   this.scene.fH004.setAll("body.allowGravity", false);
	   this.scene.fH004.setAll("body.velocity.x", newScroll3);

	   this.scene.fH005.setAll("body.immovable", true);
	   this.scene.fH005.setAll("body.allowGravity", false);
	   this.scene.fH005.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fH006.setAll("body.immovable", true);
	   this.scene.fH006.setAll("body.allowGravity", false);
	   this.scene.fH006.setAll("body.velocity.x", newScroll3);

	   this.scene.fH007.setAll("body.immovable", true);
	   this.scene.fH007.setAll("body.allowGravity", false);
	   this.scene.fH007.setAll("body.velocity.x", newScroll3);

	   this.scene.fH008.setAll("body.immovable", true);
	   this.scene.fH008.setAll("body.allowGravity", false);
	   this.scene.fH008.setAll("body.velocity.x", newScroll3);

	   this.scene.fH009.setAll("body.immovable", true);
	   this.scene.fH009.setAll("body.allowGravity", false);
	   this.scene.fH009.setAll("body.velocity.x", newScroll3);

	   this.scene.fH00A.setAll("body.immovable", true);
	   this.scene.fH00A.setAll("body.allowGravity", false);
	   this.scene.fH00A.setAll("body.velocity.x", newScroll3);

	   this.scene.fH00B.setAll("body.immovable", true);
	   this.scene.fH00B.setAll("body.allowGravity", false);
	   this.scene.fH00B.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fH00C.setAll("body.immovable", true);
	   this.scene.fH00C.setAll("body.allowGravity", false);
	   this.scene.fH00C.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fH00D.setAll("body.immovable", true);
	   this.scene.fH00D.setAll("body.allowGravity", false);
	   this.scene.fH00D.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fH00E.setAll("body.immovable", true);
	   this.scene.fH00E.setAll("body.allowGravity", false);
	   this.scene.fH00E.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fH00F.setAll("body.immovable", true);
	   this.scene.fH00F.setAll("body.allowGravity", false);
	   this.scene.fH00F.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fH010.setAll("body.immovable", true);
	   this.scene.fH010.setAll("body.allowGravity", false);
	   this.scene.fH010.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fFIREWALL.setAll("body.immovable", true);
	   this.scene.fFIREWALL.setAll("body.allowGravity", false);
	   this.scene.fFIREWALL.setAll("body.velocity.x", newScroll3);

	   this.scene.fPlat.setAll("body.immovable", true);
	   this.scene.fPlat.setAll("body.allowGravity", false);
	   this.scene.fPlat.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fGR000.setAll("body.immovable", true);
	   this.scene.fGR000.setAll("body.allowGravity", false);
	   this.scene.fGR000.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fGR001.setAll("body.immovable", true);
	   this.scene.fGR001.setAll("body.allowGravity", false);
	   this.scene.fGR001.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fGR002.setAll("body.immovable", true);
	   this.scene.fGR002.setAll("body.allowGravity", false);
	   this.scene.fGR002.setAll("body.velocity.x", newScroll3);

	   this.scene.fGR003.setAll("body.immovable", true);
	   this.scene.fGR003.setAll("body.allowGravity", false);
	   this.scene.fGR003.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fGR004.setAll("body.immovable", true);
	   this.scene.fGR004.setAll("body.allowGravity", false);
	   this.scene.fGR004.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fGR005.setAll("body.immovable", true);
	   this.scene.fGR005.setAll("body.allowGravity", false);
	   this.scene.fGR005.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fGR006.setAll("body.immovable", true);
	   this.scene.fGR006.setAll("body.allowGravity", false);
	   this.scene.fGR006.setAll("body.velocity.x", newScroll3);

	   this.scene.fGR007.setAll("body.immovable", true);
	   this.scene.fGR007.setAll("body.allowGravity", false);
	   this.scene.fGR007.setAll("body.velocity.x", newScroll3);

	   this.scene.fGR008.setAll("body.immovable", true);
	   this.scene.fGR008.setAll("body.allowGravity", false);
	   this.scene.fGR008.setAll("body.velocity.x", newScroll3);

	   this.scene.fGR009.setAll("body.immovable", true);
	   this.scene.fGR009.setAll("body.allowGravity", false);
	   this.scene.fGR009.setAll("body.velocity.x", newScroll3);

	   this.scene.fGR00A.setAll("body.immovable", true);
	   this.scene.fGR00A.setAll("body.allowGravity", false);
	   this.scene.fGR00A.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB000.setAll("body.immovable", true);
	   this.scene.fOB000.setAll("body.allowGravity", false);
	   this.scene.fOB000.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB001.setAll("body.immovable", true);
	   this.scene.fOB001.setAll("body.allowGravity", false);
	   this.scene.fOB001.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB002.setAll("body.immovable", true);
	   this.scene.fOB002.setAll("body.allowGravity", false);
	   this.scene.fOB002.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB003.setAll("body.immovable", true);
	   this.scene.fOB003.setAll("body.allowGravity", false);
	   this.scene.fOB003.setAll("body.velocity.x", newScroll3);

	   this.scene.fOB004.setAll("body.immovable", true);
	   this.scene.fOB004.setAll("body.allowGravity", false);
	   this.scene.fOB004.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB005.setAll("body.immovable", true);
	   this.scene.fOB005.setAll("body.allowGravity", false);
	   this.scene.fOB005.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB006.setAll("body.immovable", true);
	   this.scene.fOB006.setAll("body.allowGravity", false);
	   this.scene.fOB006.setAll("body.velocity.x", newScroll3);

	   this.scene.fOB007.setAll("body.immovable", true);
	   this.scene.fOB007.setAll("body.allowGravity", false);
	   this.scene.fOB007.setAll("body.velocity.x", newScroll3);

	   this.scene.fOB008.setAll("body.immovable", true);
	   this.scene.fOB008.setAll("body.allowGravity", false);
	   this.scene.fOB008.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB009.setAll("body.immovable", true);
	   this.scene.fOB009.setAll("body.allowGravity", false);
	   this.scene.fOB009.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB00A.setAll("body.immovable", true);
	   this.scene.fOB00A.setAll("body.allowGravity", false);
	   this.scene.fOB00A.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB00B.setAll("body.immovable", true);
	   this.scene.fOB00B.setAll("body.allowGravity", false);
	   this.scene.fOB00B.setAll("body.velocity.x", newScroll3);

	   this.scene.fOB00C.setAll("body.immovable", true);
	   this.scene.fOB00C.setAll("body.allowGravity", false);
	   this.scene.fOB00C.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB00D.setAll("body.immovable", true);
	   this.scene.fOB00D.setAll("body.allowGravity", false);
	   this.scene.fOB00D.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB00E.setAll("body.immovable", true);
	   this.scene.fOB00E.setAll("body.allowGravity", false);
	   this.scene.fOB00E.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB00F.setAll("body.immovable", true);
	   this.scene.fOB00F.setAll("body.allowGravity", false);
	   this.scene.fOB00F.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB010.setAll("body.immovable", true);
	   this.scene.fOB010.setAll("body.allowGravity", false);
	   this.scene.fOB010.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB011.setAll("body.immovable", true);
	   this.scene.fOB011.setAll("body.allowGravity", false);
	   this.scene.fOB011.setAll("body.velocity.x", newScroll3);

	   this.scene.fOB012.setAll("body.immovable", true);
	   this.scene.fOB012.setAll("body.allowGravity", false);
	   this.scene.fOB012.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fOB013.setAll("body.immovable", true);
	   this.scene.fOB013.setAll("body.allowGravity", false);
	   this.scene.fOB013.setAll("body.velocity.x", newScroll3);

	   this.scene.fOB014.setAll("body.immovable", true);
	   this.scene.fOB014.setAll("body.allowGravity", false);
	   this.scene.fOB014.setAll("body.velocity.x", newScroll3);

	   this.scene.fOB015.setAll("body.immovable", true);
	   this.scene.fOB015.setAll("body.allowGravity", false);
	   this.scene.fOB015.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL000.setAll("body.immovable", true);
	   this.scene.fPL000.setAll("body.allowGravity", false);
	   this.scene.fPL000.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL001.setAll("body.immovable", true);
	   this.scene.fPL001.setAll("body.allowGravity", false);
	   this.scene.fPL001.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL002.setAll("body.immovable", true);
	   this.scene.fPL002.setAll("body.allowGravity", false);
	   this.scene.fPL002.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL003.setAll("body.immovable", true);
	   this.scene.fPL003.setAll("body.allowGravity", false);
	   this.scene.fPL003.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL004.setAll("body.immovable", true);
	   this.scene.fPL004.setAll("body.allowGravity", false);
	   this.scene.fPL004.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL005.setAll("body.immovable", true);
	   this.scene.fPL005.setAll("body.allowGravity", false);
	   this.scene.fPL005.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL006.setAll("body.immovable", true);
	   this.scene.fPL006.setAll("body.allowGravity", false);
	   this.scene.fPL006.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL007.setAll("body.immovable", true);
	   this.scene.fPL007.setAll("body.allowGravity", false);
	   this.scene.fPL007.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL008.setAll("body.immovable", true);
	   this.scene.fPL008.setAll("body.allowGravity", false);
	   this.scene.fPL008.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL009.setAll("body.immovable", true);
	   this.scene.fPL009.setAll("body.allowGravity", false);
	   this.scene.fPL009.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL00A.setAll("body.immovable", true);
	   this.scene.fPL00A.setAll("body.allowGravity", false);
	   this.scene.fPL00A.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL00B.setAll("body.immovable", true);
	   this.scene.fPL00B.setAll("body.allowGravity", false);
	   this.scene.fPL00B.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL00C.setAll("body.immovable", true);
	   this.scene.fPL00C.setAll("body.allowGravity", false);
	   this.scene.fPL00C.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL00D.setAll("body.immovable", true);
	   this.scene.fPL00D.setAll("body.allowGravity", false);
	   this.scene.fPL00D.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL00E.setAll("body.immovable", true);
	   this.scene.fPL00E.setAll("body.allowGravity", false);
	   this.scene.fPL00E.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL00F.setAll("body.immovable", true);
	   this.scene.fPL00F.setAll("body.allowGravity", false);
	   this.scene.fPL00F.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL010.setAll("body.immovable", true);
	   this.scene.fPL010.setAll("body.allowGravity", false);
	   this.scene.fPL010.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL011.setAll("body.immovable", true);
	   this.scene.fPL011.setAll("body.allowGravity", false);
	   this.scene.fPL011.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL012.setAll("body.immovable", true);
	   this.scene.fPL012.setAll("body.allowGravity", false);
	   this.scene.fPL012.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL013.setAll("body.immovable", true);
	   this.scene.fPL013.setAll("body.allowGravity", false);
	   this.scene.fPL013.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL014.setAll("body.immovable", true);
	   this.scene.fPL014.setAll("body.allowGravity", false);
	   this.scene.fPL014.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL015.setAll("body.immovable", true);
	   this.scene.fPL015.setAll("body.allowGravity", false);
	   this.scene.fPL015.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL016.setAll("body.immovable", true);
	   this.scene.fPL016.setAll("body.allowGravity", false);
	   this.scene.fPL016.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL017.setAll("body.immovable", true);
	   this.scene.fPL017.setAll("body.allowGravity", false);
	   this.scene.fPL017.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL018.setAll("body.immovable", true);
	   this.scene.fPL018.setAll("body.allowGravity", false);
	   this.scene.fPL018.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL019.setAll("body.immovable", true);
	   this.scene.fPL019.setAll("body.allowGravity", false);
	   this.scene.fPL019.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL01A.setAll("body.immovable", true);
	   this.scene.fPL01A.setAll("body.allowGravity", false);
	   this.scene.fPL01A.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL01B.setAll("body.immovable", true);
	   this.scene.fPL01B.setAll("body.allowGravity", false);
	   this.scene.fPL01B.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL01C.setAll("body.immovable", true);
	   this.scene.fPL01C.setAll("body.allowGravity", false);
	   this.scene.fPL01C.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL01D.setAll("body.immovable", true);
	   this.scene.fPL01D.setAll("body.allowGravity", false);
	   this.scene.fPL01D.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL01E.setAll("body.immovable", true);
	   this.scene.fPL01E.setAll("body.allowGravity", false);
	   this.scene.fPL01E.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPL01F.setAll("body.immovable", true);
	   this.scene.fPL01F.setAll("body.allowGravity", false);
	   this.scene.fPL01F.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL020.setAll("body.immovable", true);
	   this.scene.fPL020.setAll("body.allowGravity", false);
	   this.scene.fPL020.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL021.setAll("body.immovable", true);
	   this.scene.fPL021.setAll("body.allowGravity", false);
	   this.scene.fPL021.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL022.setAll("body.immovable", true);
	   this.scene.fPL022.setAll("body.allowGravity", false);
	   this.scene.fPL022.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL023.setAll("body.immovable", true);
	   this.scene.fPL023.setAll("body.allowGravity", false);
	   this.scene.fPL023.setAll("body.velocity.x", newScroll3);

	   this.scene.fPL024.setAll("body.immovable", true);
	   this.scene.fPL024.setAll("body.allowGravity", false);
	   this.scene.fPL024.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fST000.setAll("body.immovable", true);
	   this.scene.fST000.setAll("body.allowGravity", false);
	   this.scene.fST000.setAll("body.velocity.x", newScroll3);

	   this.scene.fST001.setAll("body.immovable", true);
	   this.scene.fST001.setAll("body.allowGravity", false);
	   this.scene.fST001.setAll("body.velocity.x", newScroll3);

	   this.scene.fST002.setAll("body.immovable", true);
	   this.scene.fST002.setAll("body.allowGravity", false);
	   this.scene.fST002.setAll("body.velocity.x", newScroll3);

	   this.scene.fST003.setAll("body.immovable", true);
	   this.scene.fST003.setAll("body.allowGravity", false);
	   this.scene.fST003.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fST004.setAll("body.immovable", true);
	   this.scene.fST004.setAll("body.allowGravity", false);
	   this.scene.fST004.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fWater.setAll("body.immovable", true);
	   this.scene.fWater.setAll("body.allowGravity", false);
	   this.scene.fWater.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fW000.setAll("body.immovable", true);
	   this.scene.fW000.setAll("body.allowGravity", false);
	   this.scene.fW000.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fW001.setAll("body.immovable", true);
	   this.scene.fW001.setAll("body.allowGravity", false);
	   this.scene.fW001.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fW002.setAll("body.immovable", true);
	   this.scene.fW002.setAll("body.allowGravity", false);
	   this.scene.fW002.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fW003.setAll("body.immovable", true);
	   this.scene.fW003.setAll("body.allowGravity", false);
	   this.scene.fW003.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fW004.setAll("body.immovable", true);
	   this.scene.fW004.setAll("body.allowGravity", false);
	   this.scene.fW004.setAll("body.velocity.x", newScroll3);

	   this.scene.fW005.setAll("body.immovable", true);
	   this.scene.fW005.setAll("body.allowGravity", false);
	   this.scene.fW005.setAll("body.velocity.x", newScroll3);

	   this.scene.fW006.setAll("body.immovable", true);
	   this.scene.fW006.setAll("body.allowGravity", false);
	   this.scene.fW006.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fGroundBase.setAll("body.immovable", true);
	   this.scene.fGroundBase.setAll("body.allowGravity", false);
	   this.scene.fGroundBase.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fPrompts.setAll("body.immovable", true);
	   this.scene.fPrompts.setAll("body.allowGravity", false);
	   this.scene.fPrompts.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fRomans.setAll("body.immovable", true);
	   this.scene.fRomans.setAll("body.allowGravity", false);
	   this.scene.fRomans.setAll("body.velocity.x", newScroll3);
	   
	   this.scene.fTheDress.setAll("body.immovable", true);
	   this.scene.fTheDress.setAll("body.allowGravity", false);
	   this.scene.fTheDress.setAll("body.velocity.x", newScroll3);
	   
	   this.cursors = this.input.keyboard.createCursorKeys();
	
};

Level3.prototype.init = function () {
	 
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 1500;
    
};

Level3.prototype.update = function () {
	var touching = true; //CHECK!

	// collide the player with the platforms
    this.physics.arcade.collide(this.scene.fPlayer, this.scene.fCollisionLayer);
   //collide the roman with the platforms
    this.physics.arcade.collide(this.scene.fRomans, this.scene.fCollisionLayer);
    
    if (this.cursors.left.isDown) {
        // move to the left
        this.scene.fPlayer.body.velocity.x = -100;
        } 
    	else if (touching && this.cursors.right.isDown) {
        // move to the right
        this.scene.fPlayer.body.velocity.x = 350;
        } 
    	else if (!touching && this.cursors.right.isDown) {
        // move to the right
        this.scene.fPlayer.body.velocity.x = 350 + newSscroll3; //ADDED CONSTANT
    	} 
    	else {
        // dont move in the horizontal
        this.scene.fPlayer.body.velocity.x = 0;
    	}
    if (touching && this.cursors.alt.isDown) {
        // jump if the player is on top of a platform and the alt key is pressed
        this.scene.fPlayer.body.velocity.y = -800;
        jumpSound.play();
    }
};
