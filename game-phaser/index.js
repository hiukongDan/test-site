var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
		
        scene: {
            preload: preload,
            create: create,
			update: update
        }
    };

var game = new Phaser.Game(config);


function preload()
{
	this.load.crossOrigin = "anonymous";
	
	this.load.path = "./";

	this.load.image('cactus', 'assets/cactuses_big_1.png');
	this.load.image('dino', 'assets/dino-idle.png');
	this.load.image('cloud', 'assets/cloud.png');

	this.scale.autoCenter = Phaser.Scale.CENTER_HORIZONTALLY;
}

function create()
{
	this.add.image(400, 300, 'cactus');

	var particles = this.add.particles('cloud');

	var emitter = particles.createEmitter({
		speed: 100,
		scale: { start: 1, end: 0 },
		blendMode: 'ADD'
	});

	this.dino = this.physics.add.image(400, 100, 'dino');

	this.dino.setVelocity(100, 200);
	this.dino.setBounce(1, 1);
	this.dino.setCollideWorldBounds(true);

	emitter.startFollow(this.dino);
	
	this.acceleration = 1;
	this.terminalSpeed = [100, 300];
	this.accDirection = 1;
}

function update(time, delta)
{
	var vel = this.dino.body.velocity;
	
	if(vel.x > this.terminalSpeed[1]){
		this.accDirection = -1;
	}
	else if(vel.x < this.terminalSpeed[0]){
		this.accDirection = 1;
	}
	var increment =  delta * this.acceleration * this.accDirection;
	vel.x += (vel.x>0?1:-1)*increment;
	vel.y += (vel.y>0?1:-1)*increment*2;
	
	this.dino.setVelocity(vel.x, vel.y);
	
	//console.debug(this.dino.body.velocity);
}