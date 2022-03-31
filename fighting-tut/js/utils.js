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
    shop.update();
    player.update();
    // enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //player movement
    player.switchSprite("idle");
    if(keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 5;
        player.switchSprite("run");
    } else if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5;
        player.switchSprite("run");
    }

    if(player.velocity.y < 0) {
        player.switchSprite("down");
    } else if (player.velocity.y > 0) {
        player.switchSprite("up");
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
