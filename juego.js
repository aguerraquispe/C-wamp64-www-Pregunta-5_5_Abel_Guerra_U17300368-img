var balas;
var tiempo=0;
var tiempoEntreBalas=400;
var nave;
var timer;
var malos;
var puntos;
var txtPuntos;
var vidas;
var txtVidas;
var txtNombre;

var cursores;

var Juego={
	preload: function () {
		juego.load.image('nave','img/nave3.png');
		juego.load.image('laser','img/laser.png');
		juego.load.image('malo','img/alien.png');
		juego.load.image('bg','img/space2.jpg');
	},

	create: function(){
		juego.add.tileSprite(0,0,400,540,'bg');
		juego.physics.startSystem(Phaser.Physics.ARCADE);

		nave = juego.add.sprite(juego.width/2,485,'nave');
		juego.physics.arcade.enable(nave,true);
		nave.anchor.setTo(0.5);

		
		//cursores de juego
		cursores = juego.input.keyboard.createCursorKeys();

		balas = juego.add.group();
		balas.enableBody=true;
		balas.setBodyType=Phaser.Physics.ARCADE;
		balas.createMultiple(50,'laser');
		balas.setAll('anchor.x',0.5);
		balas.setAll('anchor.y',0.5);
		balas.setAll('checkWorldBounds',true);
		balas.setAll('outOfBoundsKill',true);

		malos = juego.add.group();
		malos.enableBody=true;
		malos.setBodyType=Phaser.Physics.ARCADE;
		malos.createMultiple(50,'malo');
		malos.setAll('anchor.x',0.5);
		malos.setAll('anchor.y',0.5);
		malos.setAll('checkWorldBounds',true);
		malos.setAll('outOfBoundsKill',true);

		timer=juego.time.events.loop(2000,this.createEnemigo,this);

		//creando los puntos
		puntos = 0;
		juego.add.text(20,20,"Puntos: ",{font:"14px Arial", fill:"#FFF"});
		txtPuntos=juego.add.text(80,20,"0",{font:"14px Arial",fill:"#FFF"});

		//creando contador de vida
		vidas = 3;
		juego.add.text(310,20,"Vidas: ",{font:"14px Arial", fill:"#FFF"});
		txtVidas=juego.add.text(360,20,"3",{font:"14px Arial",fill:"#FFF"});

		//creando contador de vida
		juego.add.text(110,520," - Hecho por Abel Guerra - ",{font:"14px Arial", fill:"#0F0"});
		//txtVidas=juego.add.text(60,320,"3",{font:"14px Arial",fill:"#FFF"});

	},
	update: function(){
		nave.rotation=juego.physics.arcade.angleToPointer(nave)+Math.PI/2;
	
		if (juego.input.activePointer.isDown){
			this.disparar();
		}

	//Add colission
		juego.physics.arcade.overlap(balas,malos,this.colision,null,this);
		//Definiendo el contador de vidas
		malos.forEachAlive(function(m){
			if(m.position.y > 520 && m.position.y < 521){
				vidas -=1;
				txtVidas.text = vidas;
			}
		});

		if(vidas ==0 )
		{
			juego.state.start('Terminado');
		}


		//mover nave a izquierda y derecha
		if (cursores.right.isDown) {
			nave.position.x += 3;
		}
		else if (cursores.left.isDown) {
			nave.position.x -= 3;
		}

	},

	disparar: function(){
		if(juego.time.now>tiempo && balas.countDead()>0){

			tiempo=juego.time.now+tiempoEntreBalas;
			var bala= balas.getFirstDead();
			bala.anchor.setTo(0.5);
			bala.reset(nave.x,nave.y);
			bala.rotation=juego.physics.arcade.angleToPointer(bala)+Math.PI/2;
			juego.physics.arcade.moveToPointer(bala,200);
		}

	},
	createEnemigo: function(){
		var enem = malos.getFirstDead();
		var num = Math.floor(Math.random()*10+1);
		enem.reset(num*38,0);
		enem.anchor.setTo(0.5);
		enem.body.velocity.y = 100;
		enem.chekWorldBounds = true;
		enem.outOfBoundsKill = true;

	},

	colision: function (b,m){
		b.kill();
		m.kill();
		puntos++;
		txtPuntos.text = puntos;
	}

};