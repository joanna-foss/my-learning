//SETUP
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0,0, canvas.width, canvas.height);

const gravity = 0.6;

//ENVIRONMENT
const background1 = new Background({
    position: {
        x: 0,
        y: 0
    },
    img_src: "./img/background_layer_1.png"
})
const background2 = new Background({
    position: {
        x: 0,
        y: 0
    },
    img_src: "./img/background_layer_2.png"
})
const background3 = new Background({
    position: {
        x: 0,
        y: 0
    },
    img_src: "./img/background_layer_3.png"
})

const shop = new Sprite({
    position: {
        x: 680,
        y: 222
    },
    width: 50,
    height: 150,
    img_src: "./img/shop_anim.png",
    scale: 2.75,
    frames: 6
})

//CHARACTERS
const player = new Fighter({
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
    },
    height: 200,
    width: 50,
    img_src: "./img/heroSprite/Idle.png",
    scale: 3,
    frames: 10,
    offset: {
        x: 62,
        y: 50
    },
    sprites: {
        idle: {
            img_src: "./img/heroSprite/Idle.png",
            frames: 10
        },
        run: {
            img_src: "./img/heroSprite/Run.png",
            frames: 8
        },
        up: {
            img_src: "./img/heroSprite/Going_Up.png",
            frames: 3
        },
        down: {
            img_src: "./img/heroSprite/Going_Down.png",
            frames: 3
        }
    }
});

const enemy = new Fighter({
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

let timer = 5;
let timerID;

decrementTimer();

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
            if(player.velocity.y === 0) {
                player.velocity.y = -20;
            }
            
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
            if(enemy.velocity.y === 0) {
                enemy.velocity.y = -20;
            }
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