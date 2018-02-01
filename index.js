var app = new PIXI.Application(1920, 1080, {backgroundColor : 0x000000});
document.body.appendChild(app.view);

var bg = PIXI.Sprite.fromImage('wall.jpg')
app.stage.addChild(bg)

var title = PIXI.Sprite.fromImage('title.png')
title.x = 200;
title.y = 30
app.stage.addChild(title)

var arrow = PIXI.Sprite.fromImage('arrow.png')
arrow.x = 1790;
arrow.y = 419
arrow.scale.set(-0.7, 0.7)
arrow.rotation = 1.8
app.stage.addChild(arrow)

let loadArr = []

for(let i = 1; i <= 18; i++) {
    loadArr.push({name: `${i}_in`, url: `letters/${i}_in.png`});
    loadArr.push({name: `${i}_out`, url: `letters/${i}_out.png`});
}

PIXI.loader
    .add(loadArr)
    .load(start)

let coords = [
	[],
	{x: 289, y: 182, scale: 0.3},
	{x: 653, y: 210, scale: 0.9},
	{x: 912, y: 224, scale: 0.7},
	{x: 1289, y: 206, scale: 0.7},

	{x: 17, y: 400, scale: 1},
	{x: 259, y: 473, scale: 0.7},
	{x: 579, y: 490, scale: 1},
	{x: 819, y: 522, scale: 0.5},
	{x: 1072, y: 483, scale: 1},
	{x: 1389, y: 489, scale: 1},
	{x: 1655, y: 505, scale: 0.7},

    {x: 34, y: 755, scale: 1},
    {x: 296, y: 750, scale: 0.6},
    {x: 589, y: 789, scale: 1},
    {x: 813, y: 740, scale: 0.8},
    {x: 1050, y: 755, scale: 0.6},
    {x: 1329, y: 781, scale: 0.5},
    {x: 1607, y: 803, scale: 0.8},
	]
window.wall ={}

function start(loader, res) {
    wall.res = res
    wall.items = []

	for(let i = 1; i <= 18; i++) {
    	wall.items.push(new Item({
			container: app.stage,
			x: coords[i].x,
			y: coords[i].y,
			scale: coords[i].scale,
			id: i
    	}))
	}

	addButton()
}

function addButton() {
	button = PIXI.Sprite.fromImage('button.png');
	app.stage.addChild(button);
	button.interactive = true;
	button.buttonMode = true;
	button.x = 1750;
	button.y = 50;
	let counter = 0;
	button.on('click', () => {
		wall.items.forEach(item => {
            item.tween(counter % 2)
        })
        counter++
    });
	wall.button = button
}

class Item extends PIXI.Container{
    constructor({x = 0, y = 0,container, scale, id}) {
        super();
        this.x = x;
        this.y = y;
		this.name = id;
		this.picScale = scale;
        container.addChild(this);

        this.in = this.addSprite(`${id}_out`);
        this.out = this.addSprite(`${id}_in`);
		this.emitter = this.addEmitter();
        this.out.interactive = true;

		this.out.on('click', () => {
			let alpha = this.out.alpha ? 0 : 1
			this.tween(alpha)
		})
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
        sprite.scale.set(this.picScale);
        // sprite.anchor.set(0.5)
        this.addChild(sprite);

        return sprite
    }

    addEmitter() {
		let emitter = new pixiParticles.Emitter(
			this,
			[PIXI.Texture.fromImage('particle.png')],
			{
				"alpha": {
					"start": 1,
					"end": 1
				},
				"scale": {
					"start": 0.8,
					"end": 0.8,
					"minimumScaleMultiplier": 0.5
				},
				"color": {
					"start": "#fafa73",
					"end": "#dfff8f"
				},
				"speed": {
					"start": 60,
					"end": 60,
					"minimumSpeedMultiplier": 2
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
				"blendMode": "add",
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