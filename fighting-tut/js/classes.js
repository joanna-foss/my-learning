class Background {
    constructor({position, img_src}) {
        this.position = position;
        this.img = new Image();
        this.img.src = img_src;
    }

    createBackground() {
        context.drawImage(this.img, this.position.x, this.position.y, 1024, 576);
    }
}

class Sprite {
    constructor({position, img_src}) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.img = new Image();
        this.img.src = img_src;
    }

    draw() {
        context.drawImage(this.img, this.position.x, this.position.y);
    }

    update() {
        this.draw();
    }
}

class Fighter {
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
        this.isAttacking;
        this.health = 100;
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