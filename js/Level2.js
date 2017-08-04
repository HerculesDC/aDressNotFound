/**
 * Level2 state.
 */
function Level2() {
	Phaser.State.call(this);
}

/** @type Phaser.State */

var proto = Object.create(Phaser.State.prototype);
Level2.prototype = proto;
Level2.prototype.constructor = Level2;
var scrollSpeed = -250;
var flippedRight, flippedLeft = false; //used to fix player flipping
var responseCounter = 0;
var romanResponseTime = 50; //used to fix enemy flickering / flipping
var arrowCounter = 0;
var arrowResponseTime = 200; //used to reset arrow
//var romanSpeed = -150; //modified to 150
var holdSword = true;
var shooting = false;
var gameStarted = true;
var BGMusic, jumpSound, swordSound,bowSound,deathSound;
var agroRad = 1000;
var toggleCD = 10;
var toggleCounter = 10;


Level2.prototype.preload = function() {
	// TODO: generated method.
	this.load.pack("level", "assets/assets-pack.json");
};

Level2.prototype.create = function() {
	// TODO: generated method.
	
	this.scene = new Scene2(this.game);
	
	// set the physics properties of the collision sprites
	   this.scene.fCollisionLayer.setAll("body.immovable", true);
	   this.scene.fCollisionLayer.setAll("body.allowGravity", false);
	   // hide all objects of the collision layer
	   this.scene.fCollisionLayer.setAll("renderable", false);
	   //adding base scroll speed to platforms
	   this.scene.fCollisionLayer.setAll("body.velocity.x", scrollSpeed);
	   
	   //initializing arrow porperties
	   this.scene.fArrows.setAll("renderable", false);
	   this.scene.fArrows.setAll("body.immovable", true);
	   this.scene.fArrows.setAll("body.allowGravity", false);
	   
	   this.scene.fHazards.setAll("body.immovable", true);
	   this.scene.fHazards.setAll("body.allowGravity", false);
	   this.scene.fHazards.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fH000.setAll("body.immovable", true);
	   this.scene.fH000.setAll("body.allowGravity", false);
	   this.scene.fH000.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fH001.setAll("body.immovable", true);
	   this.scene.fH001.setAll("body.allowGravity", false);
	   this.scene.fH001.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fH002.setAll("body.immovable", true);
	   this.scene.fH002.setAll("body.allowGravity", false);
	   this.scene.fH002.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fH003.setAll("body.immovable", true);
	   this.scene.fH003.setAll("body.allowGravity", false);
	   this.scene.fH003.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fH004.setAll("body.immovable", true);
	   this.scene.fH004.setAll("body.allowGravity", false);
	   this.scene.fH004.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fH005.setAll("body.immovable", true);
	   this.scene.fH005.setAll("body.allowGravity", false);
	   this.scene.fH005.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fH006.setAll("body.immovable", true);
	   this.scene.fH006.setAll("body.allowGravity", false);
	   this.scene.fH006.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fH007.setAll("body.immovable", true);
	   this.scene.fH007.setAll("body.allowGravity", false);
	   this.scene.fH007.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fH008.setAll("body.immovable", true);
	   this.scene.fH008.setAll("body.allowGravity", false);
	   this.scene.fH008.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fH009.setAll("body.immovable", true);
	   this.scene.fH009.setAll("body.allowGravity", false);
	   this.scene.fH009.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fH00A.setAll("body.immovable", true);
	   this.scene.fH00A.setAll("body.allowGravity", false);
	   this.scene.fH00A.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fH00B.setAll("body.immovable", true);
	   this.scene.fH00B.setAll("body.allowGravity", false);
	   this.scene.fH00B.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fH00C.setAll("body.immovable", true);
	   this.scene.fH00C.setAll("body.allowGravity", false);
	   this.scene.fH00C.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fH00D.setAll("body.immovable", true);
	   this.scene.fH00D.setAll("body.allowGravity", false);
	   this.scene.fH00D.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fH00E.setAll("body.immovable", true);
	   this.scene.fH00E.setAll("body.allowGravity", false);
	   this.scene.fH00E.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fH00F.setAll("body.immovable", true);
	   this.scene.fH00F.setAll("body.allowGravity", false);
	   this.scene.fH00F.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fH010.setAll("body.immovable", true);
	   this.scene.fH010.setAll("body.allowGravity", false);
	   this.scene.fH010.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fFIREWALL.setAll("body.immovable", true);
	   this.scene.fFIREWALL.setAll("body.allowGravity", false);
	   this.scene.fFIREWALL.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPlat.setAll("body.immovable", true);
	   this.scene.fPlat.setAll("body.allowGravity", false);
	   this.scene.fPlat.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fGR000.setAll("body.immovable", true);
	   this.scene.fGR000.setAll("body.allowGravity", false);
	   this.scene.fGR000.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fGR001.setAll("body.immovable", true);
	   this.scene.fGR001.setAll("body.allowGravity", false);
	   this.scene.fGR001.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fGR002.setAll("body.immovable", true);
	   this.scene.fGR002.setAll("body.allowGravity", false);
	   this.scene.fGR002.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fGR003.setAll("body.immovable", true);
	   this.scene.fGR003.setAll("body.allowGravity", false);
	   this.scene.fGR003.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fGR004.setAll("body.immovable", true);
	   this.scene.fGR004.setAll("body.allowGravity", false);
	   this.scene.fGR004.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fGR005.setAll("body.immovable", true);
	   this.scene.fGR005.setAll("body.allowGravity", false);
	   this.scene.fGR005.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fGR006.setAll("body.immovable", true);
	   this.scene.fGR006.setAll("body.allowGravity", false);
	   this.scene.fGR006.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fGR007.setAll("body.immovable", true);
	   this.scene.fGR007.setAll("body.allowGravity", false);
	   this.scene.fGR007.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fGR008.setAll("body.immovable", true);
	   this.scene.fGR008.setAll("body.allowGravity", false);
	   this.scene.fGR008.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fGR009.setAll("body.immovable", true);
	   this.scene.fGR009.setAll("body.allowGravity", false);
	   this.scene.fGR009.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fGR00A.setAll("body.immovable", true);
	   this.scene.fGR00A.setAll("body.allowGravity", false);
	   this.scene.fGR00A.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB000.setAll("body.immovable", true);
	   this.scene.fOB000.setAll("body.allowGravity", false);
	   this.scene.fOB000.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB001.setAll("body.immovable", true);
	   this.scene.fOB001.setAll("body.allowGravity", false);
	   this.scene.fOB001.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB002.setAll("body.immovable", true);
	   this.scene.fOB002.setAll("body.allowGravity", false);
	   this.scene.fOB002.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB003.setAll("body.immovable", true);
	   this.scene.fOB003.setAll("body.allowGravity", false);
	   this.scene.fOB003.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fOB004.setAll("body.immovable", true);
	   this.scene.fOB004.setAll("body.allowGravity", false);
	   this.scene.fOB004.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB005.setAll("body.immovable", true);
	   this.scene.fOB005.setAll("body.allowGravity", false);
	   this.scene.fOB005.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB006.setAll("body.immovable", true);
	   this.scene.fOB006.setAll("body.allowGravity", false);
	   this.scene.fOB006.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fOB007.setAll("body.immovable", true);
	   this.scene.fOB007.setAll("body.allowGravity", false);
	   this.scene.fOB007.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fOB008.setAll("body.immovable", true);
	   this.scene.fOB008.setAll("body.allowGravity", false);
	   this.scene.fOB008.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB009.setAll("body.immovable", true);
	   this.scene.fOB009.setAll("body.allowGravity", false);
	   this.scene.fOB009.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB00A.setAll("body.immovable", true);
	   this.scene.fOB00A.setAll("body.allowGravity", false);
	   this.scene.fOB00A.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB00B.setAll("body.immovable", true);
	   this.scene.fOB00B.setAll("body.allowGravity", false);
	   this.scene.fOB00B.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fOB00C.setAll("body.immovable", true);
	   this.scene.fOB00C.setAll("body.allowGravity", false);
	   this.scene.fOB00C.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB00D.setAll("body.immovable", true);
	   this.scene.fOB00D.setAll("body.allowGravity", false);
	   this.scene.fOB00D.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB00E.setAll("body.immovable", true);
	   this.scene.fOB00E.setAll("body.allowGravity", false);
	   this.scene.fOB00E.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB00F.setAll("body.immovable", true);
	   this.scene.fOB00F.setAll("body.allowGravity", false);
	   this.scene.fOB00F.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB010.setAll("body.immovable", true);
	   this.scene.fOB010.setAll("body.allowGravity", false);
	   this.scene.fOB010.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB011.setAll("body.immovable", true);
	   this.scene.fOB011.setAll("body.allowGravity", false);
	   this.scene.fOB011.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fOB012.setAll("body.immovable", true);
	   this.scene.fOB012.setAll("body.allowGravity", false);
	   this.scene.fOB012.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fOB013.setAll("body.immovable", true);
	   this.scene.fOB013.setAll("body.allowGravity", false);
	   this.scene.fOB013.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fOB014.setAll("body.immovable", true);
	   this.scene.fOB014.setAll("body.allowGravity", false);
	   this.scene.fOB014.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fOB015.setAll("body.immovable", true);
	   this.scene.fOB015.setAll("body.allowGravity", false);
	   this.scene.fOB015.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL000.setAll("body.immovable", true);
	   this.scene.fPL000.setAll("body.allowGravity", false);
	   this.scene.fPL000.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL001.setAll("body.immovable", true);
	   this.scene.fPL001.setAll("body.allowGravity", false);
	   this.scene.fPL001.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL002.setAll("body.immovable", true);
	   this.scene.fPL002.setAll("body.allowGravity", false);
	   this.scene.fPL002.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL003.setAll("body.immovable", true);
	   this.scene.fPL003.setAll("body.allowGravity", false);
	   this.scene.fPL003.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL004.setAll("body.immovable", true);
	   this.scene.fPL004.setAll("body.allowGravity", false);
	   this.scene.fPL004.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL005.setAll("body.immovable", true);
	   this.scene.fPL005.setAll("body.allowGravity", false);
	   this.scene.fPL005.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL006.setAll("body.immovable", true);
	   this.scene.fPL006.setAll("body.allowGravity", false);
	   this.scene.fPL006.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL007.setAll("body.immovable", true);
	   this.scene.fPL007.setAll("body.allowGravity", false);
	   this.scene.fPL007.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL008.setAll("body.immovable", true);
	   this.scene.fPL008.setAll("body.allowGravity", false);
	   this.scene.fPL008.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL009.setAll("body.immovable", true);
	   this.scene.fPL009.setAll("body.allowGravity", false);
	   this.scene.fPL009.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL00A.setAll("body.immovable", true);
	   this.scene.fPL00A.setAll("body.allowGravity", false);
	   this.scene.fPL00A.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL00B.setAll("body.immovable", true);
	   this.scene.fPL00B.setAll("body.allowGravity", false);
	   this.scene.fPL00B.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL00C.setAll("body.immovable", true);
	   this.scene.fPL00C.setAll("body.allowGravity", false);
	   this.scene.fPL00C.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL00D.setAll("body.immovable", true);
	   this.scene.fPL00D.setAll("body.allowGravity", false);
	   this.scene.fPL00D.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL00E.setAll("body.immovable", true);
	   this.scene.fPL00E.setAll("body.allowGravity", false);
	   this.scene.fPL00E.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL00F.setAll("body.immovable", true);
	   this.scene.fPL00F.setAll("body.allowGravity", false);
	   this.scene.fPL00F.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL010.setAll("body.immovable", true);
	   this.scene.fPL010.setAll("body.allowGravity", false);
	   this.scene.fPL010.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL011.setAll("body.immovable", true);
	   this.scene.fPL011.setAll("body.allowGravity", false);
	   this.scene.fPL011.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL012.setAll("body.immovable", true);
	   this.scene.fPL012.setAll("body.allowGravity", false);
	   this.scene.fPL012.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL013.setAll("body.immovable", true);
	   this.scene.fPL013.setAll("body.allowGravity", false);
	   this.scene.fPL013.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL014.setAll("body.immovable", true);
	   this.scene.fPL014.setAll("body.allowGravity", false);
	   this.scene.fPL014.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL015.setAll("body.immovable", true);
	   this.scene.fPL015.setAll("body.allowGravity", false);
	   this.scene.fPL015.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL016.setAll("body.immovable", true);
	   this.scene.fPL016.setAll("body.allowGravity", false);
	   this.scene.fPL016.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL017.setAll("body.immovable", true);
	   this.scene.fPL017.setAll("body.allowGravity", false);
	   this.scene.fPL017.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL018.setAll("body.immovable", true);
	   this.scene.fPL018.setAll("body.allowGravity", false);
	   this.scene.fPL018.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL019.setAll("body.immovable", true);
	   this.scene.fPL019.setAll("body.allowGravity", false);
	   this.scene.fPL019.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL01A.setAll("body.immovable", true);
	   this.scene.fPL01A.setAll("body.allowGravity", false);
	   this.scene.fPL01A.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL01B.setAll("body.immovable", true);
	   this.scene.fPL01B.setAll("body.allowGravity", false);
	   this.scene.fPL01B.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL01C.setAll("body.immovable", true);
	   this.scene.fPL01C.setAll("body.allowGravity", false);
	   this.scene.fPL01C.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL01D.setAll("body.immovable", true);
	   this.scene.fPL01D.setAll("body.allowGravity", false);
	   this.scene.fPL01D.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL01E.setAll("body.immovable", true);
	   this.scene.fPL01E.setAll("body.allowGravity", false);
	   this.scene.fPL01E.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fPL01F.setAll("body.immovable", true);
	   this.scene.fPL01F.setAll("body.allowGravity", false);
	   this.scene.fPL01F.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL020.setAll("body.immovable", true);
	   this.scene.fPL020.setAll("body.allowGravity", false);
	   this.scene.fPL020.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL021.setAll("body.immovable", true);
	   this.scene.fPL021.setAll("body.allowGravity", false);
	   this.scene.fPL021.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL022.setAll("body.immovable", true);
	   this.scene.fPL022.setAll("body.allowGravity", false);
	   this.scene.fPL022.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL023.setAll("body.immovable", true);
	   this.scene.fPL023.setAll("body.allowGravity", false);
	   this.scene.fPL023.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fPL024.setAll("body.immovable", true);
	   this.scene.fPL024.setAll("body.allowGravity", false);
	   this.scene.fPL024.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fST000.setAll("body.immovable", true);
	   this.scene.fST000.setAll("body.allowGravity", false);
	   this.scene.fST000.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fST001.setAll("body.immovable", true);
	   this.scene.fST001.setAll("body.allowGravity", false);
	   this.scene.fST001.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fST002.setAll("body.immovable", true);
	   this.scene.fST002.setAll("body.allowGravity", false);
	   this.scene.fST002.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fST003.setAll("body.immovable", true);
	   this.scene.fST003.setAll("body.allowGravity", false);
	   this.scene.fST003.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fST004.setAll("body.immovable", true);
	   this.scene.fST004.setAll("body.allowGravity", false);
	   this.scene.fST004.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fWater.setAll("body.immovable", true);
	   this.scene.fWater.setAll("body.allowGravity", false);
	   this.scene.fWater.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fW000.setAll("body.immovable", true);
	   this.scene.fW000.setAll("body.allowGravity", false);
	   this.scene.fW000.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fW001.setAll("body.immovable", true);
	   this.scene.fW001.setAll("body.allowGravity", false);
	   this.scene.fW001.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fW002.setAll("body.immovable", true);
	   this.scene.fW002.setAll("body.allowGravity", false);
	   this.scene.fW002.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fW003.setAll("body.immovable", true);
	   this.scene.fW003.setAll("body.allowGravity", false);
	   this.scene.fW003.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fW004.setAll("body.immovable", true);
	   this.scene.fW004.setAll("body.allowGravity", false);
	   this.scene.fW004.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fW005.setAll("body.immovable", true);
	   this.scene.fW005.setAll("body.allowGravity", false);
	   this.scene.fW005.setAll("body.velocity.x", scrollSpeed);

	   this.scene.fW006.setAll("body.immovable", true);
	   this.scene.fW006.setAll("body.allowGravity", false);
	   this.scene.fW006.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fGroundBase.setAll("body.immovable", true);
	   this.scene.fGroundBase.setAll("body.allowGravity", false);
	   this.scene.fGroundBase.setAll("body.velocity.x", scrollSpeed);
	   
	   this.scene.fTheDress.setAll("body.immovable", true);
	   this.scene.fTheDress.setAll("body.allowGravity", false);
	   this.scene.fTheDress.setAll("body.velocity.x", scrollSpeed);
	   
	   	   
	   this.scene.fEndScreen.setAll("renderable", false);
	   
	   this.cursors = this.input.keyboard.createCursorKeys();
	   
	   BGMusic = this.add.audio('BGMusic');
	   BGMusic.play();
};

Level2.prototype.init = function () {
	 
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 1500;
};

//collision handlers
Level2.prototype.spikeColl = function(player, hazard) {
    // when the player overlaps with a hazard
    player.kill();
    this.scene.fEndScreen.setAll("renderable", true);
};

Level2.prototype.romanColl = function(player, roman) {
    // when the player overlaps with a roman
	if (this.cursors.ctrl.isDown){
		roman.kill();
	}
	else {
		player.kill();
		this.scene.fEndScreen.setAll("renderable", true);
	}
};


Level2.prototype.arrowColl = function(arrow, roman) {
	//when arrow overlaps with roman
	roman.kill();
		this.scene.fArrows.setAll("renderable", false);
	   this.scene.fArrows.setAll("body.immovable", true);
	   this.scene.fArrows.setAll("body.allowGravity", false);
	shooting = false;
};

Level2.prototype.arrowCollWorld = function(arrow) {
	//when arrow overlaps with roman
	
		this.scene.fArrows.setAll("renderable", false);
	   this.scene.fArrows.setAll("body.immovable", true);
	   this.scene.fArrows.setAll("body.allowGravity", false);
	shooting = false;
};

Level2.prototype.arrowCollGround = function(arrow, plat) {
	//when arrow hits the ground
		this.scene.fArrows.setAll("renderable", false);
	   this.scene.fArrow.body.immovable = true;
	   this.scene.fArrow.body.allowGravity = false;
	   this.scene.fArrow.body.velocity.x = scrollSpeed;
	shooting = false;
};

Level2.prototype.shootArrow = function() {
		shooting = true;
		this.scene.fArrow.body.position.x = this.scene.fPlayer.body.position.x;
		this.scene.fArrow.body.position.y = this.scene.fPlayer.body.position.y;
		this.scene.fArrows.setAll("renderable", true);
	    this.scene.fArrows.setAll("body.immovable", false);
	    this.scene.fArrows.setAll("body.allowGravity", true);
	   //shoot in the right direction
	   if (this.scene.fPlayer.scale.x == 1)
		   {
		   this.scene.fArrow.scale.x == 1;
		   this.scene.fArrow.body.velocity.x = 700;
		   }
	   else
		   {
		   this.scene.fArrow.scale.x == -1;
		   this.scene.fArrow.body.velocity.x = -700;
		   }
	  this.scene.fArrow.body.velocity.y = -500;	
};
	
Level2.prototype.romanChase = function(player, roman) {
		if (gameStarted)
		{
	    	if (responseCounter == romanResponseTime)
	    	{
	    		responseCounter = 0;
	    		if ((player.body.position.x -100) <= roman.body.position.x){
	    			roman.body.velocity.x = romanSpeed;
	    			roman.scale.setTo(-1.0,1.0); // Checks every frame.
	    		}else{
	    			roman.body.velocity.x = -romanSpeed;
	    			roman.scale.setTo(1.0,1.0);  // Checks every frame.
	    		}
	    	}
	    else
	    	{
	    	responseCounter++;
	    	}
		}
	};
	
Level2.prototype.levelEndColl = function() {
		this.game.state.start('Level3');
	};
	
	//TODO: ADD ALL GROUPS IN THIS FUNCTION!!!
Level2.prototype.scrollUpdate = function(speed) {
		this.scene.fCollisionLayer.setAll("body.velocity.x", speed);
		
		//this.scene.fWBC.setAll("body.velocity.x", 100);
		//this.scene.fCWBT.setAll("body.velocity.x", -speed);
		//this.scene.fCWBL.setAll("body.velocity.x", -speed);
		
		this.scene.fHazards.setAll("body.velocity.x", speed);
		this.scene.fH000.setAll("body.velocity.x", speed);
		this.scene.fH001.setAll("body.velocity.x", speed);
		this.scene.fH002.setAll("body.velocity.x", speed);
		this.scene.fH003.setAll("body.velocity.x", speed);
		this.scene.fH004.setAll("body.velocity.x", speed);
		this.scene.fH005.setAll("body.velocity.x", speed);
		this.scene.fH006.setAll("body.velocity.x", speed);
		this.scene.fH007.setAll("body.velocity.x", speed);
		this.scene.fH008.setAll("body.velocity.x", speed);
		this.scene.fH009.setAll("body.velocity.x", speed);
		this.scene.fH00A.setAll("body.velocity.x", speed);
		this.scene.fH00B.setAll("body.velocity.x", speed);
		this.scene.fH00C.setAll("body.velocity.x", speed);
		this.scene.fH00D.setAll("body.velocity.x", speed);
		this.scene.fH00E.setAll("body.velocity.x", speed);
		this.scene.fH00F.setAll("body.velocity.x", speed);
		this.scene.fH010.setAll("body.velocity.x", speed);
		this.scene.fFIREWALL.setAll("body.velocity.x", speed);
		
		this.scene.fPlat.setAll("body.velocity.x", speed);
		this.scene.fGR000.setAll("body.velocity.x", speed);
		this.scene.fGR001.setAll("body.velocity.x", speed);
		this.scene.fGR002.setAll("body.velocity.x", speed);
		this.scene.fGR003.setAll("body.velocity.x", speed);
		this.scene.fGR004.setAll("body.velocity.x", speed);
		this.scene.fGR005.setAll("body.velocity.x", speed);
		this.scene.fGR006.setAll("body.velocity.x", speed);
		this.scene.fGR007.setAll("body.velocity.x", speed);
		this.scene.fGR008.setAll("body.velocity.x", speed);
		this.scene.fGR009.setAll("body.velocity.x", speed);
		this.scene.fGR00A.setAll("body.velocity.x", speed);
		
		this.scene.fOB000.setAll("body.velocity.x", speed);
		this.scene.fOB001.setAll("body.velocity.x", speed);
		this.scene.fOB002.setAll("body.velocity.x", speed);
		this.scene.fOB003.setAll("body.velocity.x", speed);
		this.scene.fOB004.setAll("body.velocity.x", speed);
		this.scene.fOB005.setAll("body.velocity.x", speed);
		this.scene.fOB006.setAll("body.velocity.x", speed);
		this.scene.fOB007.setAll("body.velocity.x", speed);
		this.scene.fOB008.setAll("body.velocity.x", speed);
		this.scene.fOB009.setAll("body.velocity.x", speed);
		this.scene.fOB00A.setAll("body.velocity.x", speed);
		this.scene.fOB00B.setAll("body.velocity.x", speed);
		this.scene.fOB00C.setAll("body.velocity.x", speed);
		this.scene.fOB00D.setAll("body.velocity.x", speed);
		this.scene.fOB00E.setAll("body.velocity.x", speed);
		this.scene.fOB00F.setAll("body.velocity.x", speed);
		this.scene.fOB010.setAll("body.velocity.x", speed);
		this.scene.fOB011.setAll("body.velocity.x", speed);
		this.scene.fOB012.setAll("body.velocity.x", speed);
		this.scene.fOB013.setAll("body.velocity.x", speed);
		this.scene.fOB014.setAll("body.velocity.x", speed);
		this.scene.fOB015.setAll("body.velocity.x", speed);
		
		this.scene.fPL000.setAll("body.velocity.x",speed);
		this.scene.fPL001.setAll("body.velocity.x",speed);
		this.scene.fPL002.setAll("body.velocity.x",speed);
		this.scene.fPL003.setAll("body.velocity.x",speed);
		this.scene.fPL004.setAll("body.velocity.x",speed);
		this.scene.fPL005.setAll("body.velocity.x",speed);
		this.scene.fPL006.setAll("body.velocity.x",speed);
		this.scene.fPL007.setAll("body.velocity.x",speed);
		this.scene.fPL008.setAll("body.velocity.x",speed);
		this.scene.fPL009.setAll("body.velocity.x",speed);
		this.scene.fPL00A.setAll("body.velocity.x",speed);
		this.scene.fPL00B.setAll("body.velocity.x",speed);
		this.scene.fPL00C.setAll("body.velocity.x",speed);
		this.scene.fPL00D.setAll("body.velocity.x",speed);
		this.scene.fPL00E.setAll("body.velocity.x",speed);
		this.scene.fPL00F.setAll("body.velocity.x",speed);
		this.scene.fPL010.setAll("body.velocity.x",speed);
		this.scene.fPL011.setAll("body.velocity.x",speed);
		this.scene.fPL012.setAll("body.velocity.x",speed);
		this.scene.fPL013.setAll("body.velocity.x",speed);
		this.scene.fPL014.setAll("body.velocity.x",speed);
		this.scene.fPL015.setAll("body.velocity.x",speed);
		this.scene.fPL016.setAll("body.velocity.x",speed);
		this.scene.fPL017.setAll("body.velocity.x",speed);
		this.scene.fPL018.setAll("body.velocity.x",speed);
		this.scene.fPL019.setAll("body.velocity.x",speed);
		this.scene.fPL01A.setAll("body.velocity.x",speed);
		this.scene.fPL01B.setAll("body.velocity.x",speed);
		this.scene.fPL01C.setAll("body.velocity.x",speed);
		this.scene.fPL01D.setAll("body.velocity.x",speed);
		this.scene.fPL01E.setAll("body.velocity.x",speed);
		this.scene.fPL01F.setAll("body.velocity.x",speed);
		this.scene.fPL020.setAll("body.velocity.x",speed);
		this.scene.fPL021.setAll("body.velocity.x",speed);
		this.scene.fPL022.setAll("body.velocity.x",speed);
		this.scene.fPL023.setAll("body.velocity.x",speed);
		this.scene.fPL024.setAll("body.velocity.x",speed);
		
		this.scene.fST000.setAll("body.velocity.x", speed);
		this.scene.fST001.setAll("body.velocity.x", speed);
		this.scene.fST002.setAll("body.velocity.x", speed);
		this.scene.fST003.setAll("body.velocity.x", speed);
		this.scene.fST004.setAll("body.velocity.x", speed);
		
		this.scene.fWater.setAll("body.velocity.x", speed);
		this.scene.fW001.setAll("body.velocity.x", speed);
		this.scene.fW002.setAll("body.velocity.x", speed);
		this.scene.fW003.setAll("body.velocity.x", speed);
		this.scene.fW004.setAll("body.velocity.x", speed);
		this.scene.fW005.setAll("body.velocity.x", speed);
		this.scene.fW006.setAll("body.velocity.x", speed);
		
		this.scene.fGroundBase.setAll("body.velocity.x", speed);
		
		this.scene.fTheDress.setAll("body.velocity.x", speed);		
};

Level2.prototype.update = function() {
	// TODO: generated method.
	
	
		
		
	
	// collide the player with the platforms
    this.physics.arcade.collide(this.scene.fPlayer, this.scene.fCollisionLayer);
   //collide the roman with the platforms
    this.physics.arcade.collide(this.scene.fRomans, this.scene.fCollisionLayer);
  //collide the player with the roman
  //this.physics.arcade.collide(this.scene.fPlayer, this.scene.fRoman);
    
    
    //enemy chase
    if (this.scene.fPlayer.position.x - this.scene.fRoman.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman.position.x < agroRad)
    	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman);
    	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman1.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman1.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman1);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman2.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman2.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman2);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman3.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman3.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman3);
    /*
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman4.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman4.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman4);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman5.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman5.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman5);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman6.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman6.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman6);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman7.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman7.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman7);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman8.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman8.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman8);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman9.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman9.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman9);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman10.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman10.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman10);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman11.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman11.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman11);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman12.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman12.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman12);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman13.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman13.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman13);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman14.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman14.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman14);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman15.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman15.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman15);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman16.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman16.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman16);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman17.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman17.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman17);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman18.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman18.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman18);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman19.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman19.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman19);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman20.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman20.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman20);
	}
    if (this.scene.fPlayer.position.x - this.scene.fRoman21.position.x > -agroRad && this.scene.fPlayer.position.x - this.scene.fRoman21.position.x < agroRad)
	{
    this.romanChase(this.scene.fPlayer, this.scene.fRoman21);
	}
	*/
    // a flag to know if the player is (down) touching the platforms
    var touching = this.scene.fPlayer.body.touching.down;
    
 //player movement
    if (this.cursors.left.isDown) {
        // move to the left
        this.scene.fPlayer.body.velocity.x = -100;
        
    } else if (touching && this.cursors.right.isDown) {
        // move to the right
        this.scene.fPlayer.body.velocity.x = 350;
    } else if (!touching && this.cursors.right.isDown) {
        // move to the right
        this.scene.fPlayer.body.velocity.x = 350 + newScroll; //ADDED CONSTANT
    } else {
        // dont move in the horizontal
        this.scene.fPlayer.body.velocity.x = 0;
    }
    if (touching && this.cursors.alt.isDown) {
        // jump if the player is on top of a platform and the alt key is pressed
        this.scene.fPlayer.body.velocity.y = -800;
    }
    
    
  //toggle weapon
    if (toggleCounter < toggleCD)
	{
	toggleCounter++;
	}
    if (this.cursors.shift.isDown && toggleCounter == toggleCD)
	{
	toggleCounter = 0;
		if (holdSword)
			{
			holdSword = false;
			}
		else
			{
			holdSword = true;
			}
	}
    //player attack
    if (this.cursors.ctrl.isDown && holdSword == true){
    	this.scene.fPlayer.play("swordAttack");
    }
    	else if (this.cursors.ctrl.isDown && holdSword == false)
    		{
    	if (shooting == false)
    		{
    			this.shootArrow();
    			this.scene.fPlayer.play("bowAttack");
    		}
    	}
    
    //animations
    if (touching && !this.cursors.ctrl.isDown) {
        if (this.scene.fPlayer.body.velocity.x == 0 && holdSword == true) {
            // if it is not moving horizontally play the idle
            this.scene.fPlayer.play("swordIdle");
        } else if (this.scene.fPlayer.body.velocity.x == 0 && holdSword == false){
            // if it is moving play the walk
            this.scene.fPlayer.play("bowIdle");
        }
        else
        	{
        	if (holdSword == true)
        		{this.scene.fPlayer.play("swordWalk");
        		}
        	else
        		{
        		this.scene.fPlayer.play("bowWalk");
        		}
        	}
    }
 //update the facing of the player
    if (this.cursors.left.isDown) {
        // face left
        this.scene.fPlayer.scale.x = -1;
        if (flippedLeft == false)
        	{
        this.scene.fPlayer.position.x +=100;
        flippedLeft = true;
        flippedRight = false;
        	}
        	
    } else if (this.cursors.right.isDown) {
       // face right
       this.scene.fPlayer.scale.x = 1;
       if (flippedRight == false)
    	   {
       this.scene.fPlayer.position.x -=100;
       flippedLeft = false;
       flippedRight = true;
    	   }
    }

    //reset arrow if no collision
    if (arrowCounter == arrowResponseTime && shooting == true)
    	{
    		arrowCounter = 0;
    		this.scene.fArrows.setAll("renderable", false);
    		   this.scene.fArrows.setAll("body.immovable", true);
    		   this.scene.fArrows.setAll("body.allowGravity", false);
    		shooting = false;
    		this.scene.fArrow.body.position.x = this.scene.fPlayer.body.position.x;
    		this.scene.fArrow.body.position.y = this.scene.fPlayer.body.position.y;
    	}
    else if (shooting)
    	{
    	arrowCounter++;
    	}
    
    //colission with hazard tiles: REQUIRES UPDATING GROUPS!
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH000, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH001, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH002, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH003, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH004, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH005, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH006, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH007, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH008, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH009, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH00A, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH00B, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH00C, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH00D, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH00E, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH00F, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fH010, this.spikeColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fFIREWALL, this.spikeColl, null, this);
    
  //colission with roman
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman1, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman2, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman3, this.romanColl, null, this);
    /*
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman4, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman5, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman6, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman7, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman8, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman9, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman10, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman11, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman12, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman13, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman14, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman15, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman16, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman17, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman18, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman19, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman20, this.romanColl, null, this);
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fRoman21, this.romanColl, null, this)
    */
    
    //arrow collision with enemy
    this.physics.arcade.overlap(this.scene.fArrow, this.scene.fRomans, this.arrowColl, null, this);
    
  //arrow collision with ground: UPDATE COLLISION SPRITES
    this.physics.arcade.overlap(this.scene.fArrow, this.scene.fCollisionLayer, this.arrowCollGround, null, this);
    
    //arrow collision with world bounds
    this.physics.arcade.overlap(this.scene.fArrow, this.scene.WorldBounds, this.arrowCollWorld, null, this);
    
    this.physics.arcade.overlap(this.scene.fPlayer, this.scene.fTheDress, this.levelEndColl, null, this);
	}   
};