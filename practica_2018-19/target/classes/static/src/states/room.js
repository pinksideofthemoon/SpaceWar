Spacewar.roomState = function(game) {

}

Spacewar.roomState.prototype = {
	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **ROOM** state");
		}
	},

	preload : function() {
		var background = game.load.image('background','assets/images/roomWallpaper.jpg');
		game.load.image('buttonClassic','assets/images/estrellaClassic.png');
		game.load.image('buttonBattleRoyale', 'assets/images/estrellaBattleRoyale.png');
	},

	create : function() {
		background = game.add.tileSprite(0, 0, 1200, 800, 'background');
		background.scale.setTo(1.7, 1.5);
		var buttonClassic = game.add.button(game.world.centerX - 300, 200, 'buttonClassic', unirseAClassic, this, 2, 1, 0);
		var buttonBattleRoyale = game.add.button(game.world.centerX - 15, 200, 'buttonBattleRoyale', unirseABattleRoyale, this, 2, 1, 0);
		buttonClassic.scale.setTo(0.44, 0.44);
		buttonBattleRoyale.scale.setTo(0.44, 0.44);
		
		function unirseAClassic () {
			game.state.start('gameState')
		}
		
		function unirseABattleRoyale () {

		}
	},

	update : function() {
		
	}
}