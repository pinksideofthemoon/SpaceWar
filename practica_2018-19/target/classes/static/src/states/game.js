Spacewar.gameState = function(game) {
	this.bulletTime
	this.fireBullet
	this.numStars = 100 // Should be canvas size dependant
	this.maxProjectiles = 800 // 8 per player
}

Spacewar.gameState.prototype = {

	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG JS] Entering **GAME** state");
		}
	},

	preload : function() {
		// We create a procedural starfield background
		for (var i = 0; i < this.numStars; i++) {
			let sprite = game.add.sprite(game.world.randomX,
					game.world.randomY, 'spacewar', 'staralpha.png');
			let random = game.rnd.realInRange(0, 0.6);
			sprite.scale.setTo(random, random)
		}

		// We preload the bullets pool
		game.global.proyectiles = new Array(this.maxProjectiles)
		for (var i = 0; i < this.maxProjectiles; i++) {
			game.global.projectiles[i] = {
				image : game.add.sprite(0, 0, 'spacewar', 'projectile.png')
			}
			game.global.projectiles[i].image.anchor.setTo(0.5, 0.5)
			game.global.projectiles[i].image.visible = false
	        
		}

		// we load a random ship
		let random = [ 'blue', 'darkgrey', 'green', 'metalic', 'orange',
				'purple', 'red' ]
		let randomImage = random[Math.floor(Math.random() * random.length)]
				+ '_0' + (Math.floor(Math.random() * 6) + 1) + '.png'
		game.global.myPlayer.image = game.add.sprite(0, 0, 'spacewar',
				game.global.myPlayer.shipType)
		game.global.myPlayer.image.anchor.setTo(0.5, 0.5)
	},

	create : function() {
		
		/* funciones ejemplo para modificar 
		
	    onPlusClick: function(){
	        this.healthValue = this.healthValue + 10;
	        if(this.healthValue > 100) this.healthValue = 100;
	        this.myHealthBar.setPercent(this.healthValue);
	      },
	      onMinusClick: function(){
	        this.healthValue = this.healthValue - 10;
	        if(this.healthValue < 0) this.healthValue = 0;
	        this.myHealthBar.setPercent(this.healthValue);
	      },
	      
	     */
		
			////healthbar
			var barConfig = {x: 200, y: 100 };
			this.myHealthBar = new HealthBar(this.game, barConfig);
			this.healthValue = 100;

		
			//////
			////propulsor
			var barConfig = {x: 200, y: 200};
			this.myPropBar = new HealthBar(this.game, barConfig);
		
			//////
			
			////ammo
			
		    var barConfig = {x: 200, y: 300};
			this.ammo = new HealthBar(this.game, barConfig);
			this.text = game.add.text(this.ammo.x-50, this.ammo.y-20, this.maxProjectiles, { font: "30px Arial", fill: "#000000", align: "center" });
			
		
			//////
			
		this.bulletTime = 0
		this.tempBullets= this.maxProjectiles;
		this.fireBullet = function() {
			if (game.time.now > this.bulletTime) {
				this.bulletTime = game.time.now + 250;
				// this.weapon.fire()
				
				
				//bar ammo update
				this.tempBullets= this.tempBullets - 1;
		        this.healthValue = this.healthValue - (100/800);
		        if(this.healthValue < 0) this.healthValue = 0;
		        this.ammo.setPercent(this.healthValue);
		        this.text.text = this.tempBullets;
		        
				return true
			} else {
				return false
			}
		}

		this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		// Añadir Q como botón para salir del juego
	
	
		// Stop the following keys from propagating up to the browser
		game.input.keyboard.addKeyCapture([ Phaser.Keyboard.W,
				Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D,
				Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.Q ]);

		game.camera.follow(game.global.myPlayer.image);
		
		// Informacion in-Game (esquina superior izquierda)
		var usuarioText = 'Usuario ' + game.global.myPlayer.id;
		this.name = game.add.text(5, 5, usuarioText, {
			font : '18px Arial',
			fill : '#0095DD'
		});
		this.healthPoints = game.add.text(5, 25, 'Vida: 100', {
			font : '18px Arial',
			fill : '#0095DD'
		});
		this.ammoPoints = game.add.text(5, 45, 'Munición: 0', {
			font : '18px Arial',
			fill : '#0095DD'
		});
		this.propellerPoints = game.add.text(5, 65, 'Propulsor: 0', {
			font : '18px Arial',
			fill : '#0095DD'
		});
		
		//SI TOCAMOS LA Q, SALIMOS DE LA SALA
		game.input.keyboard.onUpCallback = function(key){
		    if(key.keyCode === Phaser.KeyCode.Q){
		    	//myPlayer.state.start('menuState')
				//myPlayer.room = null;
				msgExit = new Object()
				if (game.global.DEBUG_MODE) {
					console.log("[DEBUG JS] Sending REMOVE PLAYER message to server")
				}
				msgExit.event = "REMOVE PLAYER";
				
				game.global.socket.send(JSON.stringify(msgExit))
				
				game.state.start('menuState')
		    }
		}
	},

	update : function() {
		let msg = new Object()
		msg.event = 'UPDATE MOVEMENT'

		msg.movement = {
			thrust : false,
			brake : false,
			rotLeft : false,
			rotRight : false
		}

		msg.bullet = false

		
		
		if (this.wKey.isDown)
			msg.movement.thrust = true;
		if (this.sKey.isDown)
			msg.movement.brake = true;
		if (this.aKey.isDown)
			msg.movement.rotLeft = true;
		if (this.dKey.isDown)
			msg.movement.rotRight = true;
		if (this.spaceKey.isDown) {
			msg.bullet = this.fireBullet()
		}

		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG JS] Sending UPDATE MOVEMENT message to server")
		}
		game.global.socket.send(JSON.stringify(msg))
	},
	
}
