Spacewar.gameModeState = function(game) {
}

Spacewar.gameModeState.prototype = {

		init : function() {
			if (game.global.DEBUG_MODE) {
				console.log("[DEBUG] Entering **GAMEMODE** state");
			}
		},

		preload : function() {
			var background = game.load.image('background','assets/images/matchmakingWallpaper.jpg');
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
			
			game.add.text(335, 25, 'MODOS DE JUEGO', {
				font : '40px Arial',
				fill : '#000000'
			});
			
			function unirseAClassic () {
				var gameMode = "classic";
				var numPlayers = 3;
				game.state.start('matchmakingState', true, false, gameMode, numPlayers);
				//game.state.start('matchmakingState')
			}
			
			function unirseABattleRoyale () {
				/*
				let gameMode = "battleRoyale";
				let numPlayers = 30;
				game.state.start('matchmakingState', true, false, gameMode, numPlayers); */
			}
		},

		update : function() {
			
		}
}