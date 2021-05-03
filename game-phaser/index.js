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
            create: create
        }
    };

var game = new Phaser.Game(config);

function preload ()
{
	this.load.crossOrigin = "anonymous";
	
	this.load.setBaseURL("https://hiukong-dan.com/game-phaser");

	this.load.image('cactus', 'assets/cactuses_big_1.png');
	this.load.image('dino', 'assets/dino-idle.png');
	this.load.image('cloud', 'assets/cloud.png');

	this.scale.autoCenter = Phaser.Scale.CENTER_HORIZONTALLY;
}

function create ()
{
	this.add.image(400, 300, 'cactus');

	var particles = this.add.particles('cloud');

	var emitter = particles.createEmitter({
		speed: 100,
		scale: { start: 1, end: 0 },
		blendMode: 'ADD'
	});

	var dino = this.physics.add.image(400, 100, 'dino');

	dino.setVelocity(100, 200);
	dino.setBounce(1, 1);
	dino.setCollideWorldBounds(true);

	emitter.startFollow(dino);
}