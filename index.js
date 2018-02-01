var app = new PIXI.Application(1920, 1080, {backgroundColor : 0x000000});
document.body.appendChild(app.view);

var bg = PIXI.Sprite.fromImage('wall.jpg')
app.stage.addChild(bg)

PIXI.loader
    .add('in', 'in.jpg')
    .add('out', 'out.jpg')
    .load(start)

window.wall ={}

function start(loader, res) {
    wall.res = res
    wall.items = new Item()
}

class Item extends PIXI.Container{
    constructor() {
        super()
        app.stage.addChild(this)
        this.in = this.addSprite('in')
        this.out = this.addSprite('out')

        this.out.interactive = true

		this.emitter = this.addEmitter()

		this.out.on('click', () => {
			let a = this.out.alpha ? 0 : 1

			TweenMax.to(this.out, 3, {
			    alpha: a,
                onStart: () => this.emitter.emit = true,
                onComplete: () => this.emitter.emit = false,
                ease: Power0.easeNone
            })
		})

    }

    addSprite(name) {
        let sprite = new PIXI.Sprite(PIXI.utils.TextureCache[name]);
        sprite.scale.set(0.15);
        this.addChild(sprite);

        return sprite
    }

    addEmitter() {
		let emitter = new pixiParticles.Emitter(
			this,
			[PIXI.Texture.fromImage('particle.png')],
			{
				"alpha": {
					"start": 0.47,
					"end": 0.24
				},
				"scale": {
					"start": 0.5,
					"end": 0.5,
					"minimumScaleMultiplier": 1
				},
				"color": {
					"start": "#fafa73",
					"end": "#dfff8f"
				},
				"speed": {
					"start": 20,
					"end": 50,
					"minimumSpeedMultiplier": 1
				},
				"acceleration": {
					"x": 11,
					"y": 0
				},
				"maxSpeed": 0,
				"startRotation": {
					"min": 0,
					"max": 360
				},
				"noRotation": false,
				"rotationSpeed": {
					"min": 0,
					"max": 0
				},
				"lifetime": {
					"min": 1,
					"max": 1
				},
				"blendMode": "normal",
				"frequency": 0.01,
				"emitterLifetime": -1,
				"maxParticles": 500,
				"pos": {
					"x": 0,
					"y": 0
				},
				"addAtBack": false,
				"spawnType": "circle",
				"spawnCircle": {
					"x": this.out.width / 2,
					"y": this.out.height / 2,
					"r": 50
				}
			}
		);

		emitter.autoUpdate = true;
		emitter.emit = false;

        return emitter
    }
}