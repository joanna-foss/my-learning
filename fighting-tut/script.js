//SETUP
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0,0, canvas.width, canvas.height);

const gravity = 0.3;

class Sprite {
    //pass in object hack to not require either position nor velocity for constructor to work as intended
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
    }

    draw() {
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }
}

//CHARACTERS
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
});

const enemy = new Sprite({
    position: {
        x: 800,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
});

const keys = {
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}
let last_key;

function animate() {
    window.requestAnimationFrame(animate) //recursively animate forever

    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;

    if(keys.ArrowRight.pressed && last_key == "ArrowRight") {
        player.velocity.x = 1;
    } else if (keys.ArrowLeft.pressed && last_key == "ArrowLeft") {
        player.velocity.x = -1;
    }
}

animate();

window.addEventListener('keydown', (event) => {
    console.log(event.key);
    switch(event.key) {
        case "ArrowRight":
            last_key = "ArrowRight";
            keys.ArrowRight.pressed = true;
            break;
        case "ArrowLeft":
            last_key = "ArrowLeft";
            keys.ArrowLeft.pressed = true;
            break;
        case "ArrowUp":
            player.velocity.y = -10;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    console.log(event.key);
    switch(event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});