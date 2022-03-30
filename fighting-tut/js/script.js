//SETUP
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0,0, canvas.width, canvas.height);

const gravity = 0.6;
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
function decrementTimer() {
    document.querySelector("#timer").innerHTML = timer;

    if(timer === 0) {
        determineWinner({player, enemy, timerID});
    }

    if(timer > 0) {
        timerID = setTimeout(decrementTimer, 1000);
        timer--;
    }
}

function determineWinner({player, enemy, timerID}) {
    clearTimeout(timerID);
    let winner_div = document.querySelector("#winner");
    winner_div.style.display = "flex";
    if(player.health === enemy.health) {
        winner_div.innerHTML = "It's a tie!";
    } else if (player.health > enemy.health) {
        winner_div.innerHTML = "Player wins!";
    } else if (player.health < enemy.health) {
        winner_div.innerHTML = "Enemy wins!";
    }
}

decrementTimer();

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
    background1.createBackground();
    background2.createBackground();
    background3.createBackground();
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
            enemy.health -= 10;
            let enemy_health = document.querySelector("#enemy-life-bar");
            enemy_health.style.width = enemy.health + "%";
    } 
    if(
        weaponCollision({character1: enemy, character2: player}) &&
        enemy.isAttacking) {
            enemy.isAttacking = false;
            console.log("enemy hit player!");
            player.health -= 10;
            let player_health = document.querySelector("#player-life-bar");
            player_health.style.width = player.health + "%";
    } 

    if(player.health <= 0 || enemy.health <= 0) {
        determineWinner({player, enemy, timerID});
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