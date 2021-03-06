Spacewar.matchmakingState = function(game) {
	var modoJuego;
	var nP;
}

Spacewar.matchmakingState.prototype = {
    init: function(n, nP) {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **MATCHMAKING** state");
			console.log("Modo de juego elegido: " + name);
		}
		modoJuego = n;
		numJugadores = nP;
	},

	preload : function() {
		var background = game.load.image('background','assets/images/matchmakingWallpaper.jpg');
		game.load.image('buttonCrear','assets/images/crear.png');
		game.load.image('buttonUnirse','assets/images/unirse.png');
		
	},

	create : function() {
		background = game.add.tileSprite(0, 0, 1200, 800, 'background');
		background.scale.setTo(1.7, 1.5);
		
		var buttonCrear = game.add.button(game.world.centerX - 280, 200, 'buttonCrear', crearSala, this, 2, 1, 0);
		var buttonUnirse = game.add.button(game.world.centerX +10, 200, 'buttonUnirse', unirseASala, this, 2, 1, 0);
	
		buttonCrear.scale.setTo(0.4, 0.4);
		buttonUnirse.scale.setTo(0.4, 0.4);
		
		if (modoJuego === 'classic') {
			game.add.text(450, 80, 'Classic Mode', {
				font : '18px Arial',
				fill : '#000000'
			});
		}
		
		if (modoJuego == "battleRoyale") {
			game.add.text(420, 80, 'Battle Royale Mode', {
				font : '18px Arial',
				fill : '#000000'
			});
		}
		
		game.add.text(355, 25, 'MATCHMAKING', {
			font : '40px Arial',
			fill : '#000000'
		});
		
		function crearSala () {
			game.state.start('gameState')
		}
		
		function unirseASala () {
			//LOGICA DEL MATCHMAKING
		}

	},

	update : function() {
		
	}
}