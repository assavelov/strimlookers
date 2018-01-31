var particles = [];
var timelines = [];

var particlesCount = 20;
var particlesParent = document.body;
createParticles(particlesParent, particlesCount);
createTimelines();

startAllParticlesDisco();

function startAllParticlesDisco() {
    for (var i = 0; i < particles.length; i++)
        startOneParticleDisco(i);
}

function startOneParticleDisco(particleNumber) {
    var position = generateRandomPosition(0, 0, 600, 600);
    var duration = generateRandomDuration(1.0, 3.0);

    timelines[particleNumber].to(particles[particleNumber], duration,
        {x:position[0], y:position[1], ease:Power2.easeOut,
        onComplete: startOneParticleDisco, onCompleteParams: [particleNumber]});
}

function createParticles(parent, count) {
    for (var i = 0; i < count; i++) {
        var part = document.createElement('img');
        part.src = "ball.png";
        part.width = 100;
        part.height = 100;
        part.setAttribute('class', 'particle');
        document.body.appendChild(part);

        particles.push(part);
    }
}

function createTimelines() {
    for (var i = 0; i < particles.length; i++)
        timelines.push(new TimelineMax());
}

function generateRandomPosition(startx, starty, width, height) {
    var position = new Array(2);
    position[0] = Math.random() * width + startx;
    position[1] = Math.random() * height + starty;
    return position;
}

function generateRandomDuration(mintime, maxtime) {
    return Math.random() * (maxtime - mintime) + mintime;
}