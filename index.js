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
    wall.items = []

	for(let i = 0; i < 4; i++) {
    	wall.items.push(new Item({
			container: app.stage,
			x: 250 * i + 500,
			y: 200
    	}))
	}

	for(let i = 0; i < 7; i++) {
		wall.items.push(new Item({
			container: app.stage,
			x: 250 * i,
			y: 400
		}))
	}

	for(let i = 0; i < 7; i++) {
		wall.items.push(new Item({
			container: app.stage,
			x: 250 * i,
			y: 600
		}))
	}

	addButton()
}

function addButton() {
	button = PIXI.Sprite.fromImage('button.png');
	app.stage.addChild(button);
	button.interactive = true;
	button.buttonMode = true;
	button.x = 1200;
	button.on('click', () => wall.items.forEach(item => item.hide()));
	wall.button = button
}

class Item extends PIXI.Container{
    constructor({x = 0, y = 0,container}) {
        super();
        this.x = x;
        this.y = y;
        container.addChild(this);

        this.in = this.addSprite('in')
        this.out = this.addSprite('out')
		this.emitter = this.addEmitter()

        this.out.interactive = true

		this.out.on('click', this.hide, this)
    }

    show() {
		this.tween(1)
	}

	hide() {
		this.tween(0)
	}

	tween(alpha) {
		TweenMax.to(this.out, 2, {
			alpha: alpha,
			onStart: () => this.emitter.emit = true,
			onComplete: () => this.emitter.emit = false,
			ease: Power0.easeNone
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