//SETUP
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0,0, canvas.width, canvas.height);

const gravity = 0.6;

class Sprite {
    //pass in object hack to not require either position nor velocity for constructor to work as intended
    constructor({position, velocity, color = 'white', offset}) {
        this.position = position;
        this.velocity = velocity;
        this.lastKey;
        this.height = 150;
        this.width = 50;
        this.weapon = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 30
        };
        this.color = color;
        this.isAttacking
    }

    draw() {
        //characters
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);

        //weapons
        if(this.isAttacking) {
            context.fillStyle = "green";
            context.fillRect(
                this.weapon.position.x,
                this.weapon.position.y,
                this.weapon.width,
                this.weapon.height
            )
        }
    }

    update() {
        this.draw();
        this.weapon.position.x = this.position.x + this.weapon.offset.x; 
        this.weapon.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 200)
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
    },
    color: "blue",
    offset: {
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
    },
    color: "red",
    offset: {
        x: -50,
        y: 0
    }
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
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

function weaponCollision({character1,character2}) {
    return (
        character1.weapon.position.x + character1.weapon.width >= character2.position.x &&
        character1.weapon.position.x <= character2.position.x + character2.width &&
        character1.weapon.position.y + character1.weapon.height >= character2.position.y &&
        character1.weapon.position.y <= character2.position.y + character2.height
    )
}

function animate() {
    window.requestAnimationFrame(animate) //recursively animate forever

    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //player movement
    if(keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 5;
    } else if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5;
    }

    //enemy movement
    if(keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
        enemy.velocity.x = 5;
    } else if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
        enemy.velocity.x = -5;
    }

    //detect hit
    if(
        weaponCollision({character1: player, character2: enemy}) &&
        player.isAttacking) {
            player.isAttacking = false;
            console.log("player hit enemy!");
    } 
    if(
        weaponCollision({character1: enemy, character2: player}) &&
        enemy.isAttacking) {
            enemy.isAttacking = false;
            console.log("enemy hit player!");
    } 
}

animate();

window.addEventListener('keydown', (event) => {
    console.log(event.key);
    switch(event.key) {
        case "d":
            player.lastKey = "d";
            keys.d.pressed = true;
            break;
        case "a":
            player.lastKey = "a";
            keys.a.pressed = true;
            break;
        case "w":
            player.velocity.y = -20;
            break;
        case " ":
            player.attack();
            break;
        //enemy keys
        case "ArrowRight":
            keys.ArrowRight.pressed = true;
            enemy.lastKey = "ArrowRight";
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = "ArrowLeft";
            break;
        case "ArrowUp":
            enemy.lastKey = "ArrowUp";
            enemy.velocity.y = -20;
            break;
        case "ArrowDown":
            enemy.attack();
            break;
    }
});

window.addEventListener('keyup', (event) => {
    console.log(event.key);
    switch(event.key) {
        case "d":
            keys.d.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = false;
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            break;
    }
});