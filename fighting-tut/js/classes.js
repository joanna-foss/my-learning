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
    constructor({position, img_src, width, height, scale = 1, frames = 1, offset = {x: 0, y: 0}}) {
        this.position = position;
        this.height = height;
        this.width = width;
        this.img = new Image();
        this.img.src = img_src;
        this.scale = scale;
        this.frames = frames;
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 6;
        this.offset = offset;
    }

    draw() {
        context.drawImage(
            this.img,
            this.frameCurrent * (this.img.width / this.frames),
            0,
            this.img.width / this.frames,
            this.img.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.img.width / this.frames) * this.scale,
            this.img.height * this.scale
        )
    }

    animateFrames() {
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < this.frames - 1) {
                this.frameCurrent++;
            } else {
                this.frameCurrent = 0;
            }
        }
    }

    update() {
        this.draw();
        this.animateFrames();
    }
}

class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        color = 'white',
        img_src,
        width,
        height,
        scale = 1,
        frames = 1,
        offset = {x: 0, y: 0},
        sprites
    }) {
            super({
                position,
                img_src,
                scale,
                frames, 
                offset
            });

            this.position = position;
            this.velocity = velocity;
            this.lastKey;
            this.height = height;
            this.width = width;
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
            
            this.frameCurrent = 0;
            this.framesElapsed = 0;
            this.framesHold = 5;
            this.sprites = sprites;

            for(const sprite in this.sprites) {
                sprites[sprite].img = new Image();
                sprites[sprite].img.src = sprite.img_src;
            }
    }

    update() {
        this.draw();
        this.animateFrames();

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

    switchSprite(sprite) {
        switch (sprite) {
            case "idle": 
                if(this.img.src !== this.sprites.idle.img_src) {
                    this.img.src = player.sprites.idle.img_src;
                    this.frames = player.sprites.idle.frames;
                }
                break;
            case "run":
                if(this.img.src !== this.sprites.run.img_src) {
                    this.img.src = player.sprites.run.img_src;
                    this.frames = player.sprites.run.frames;
                }
                break;
            case "up":
                if(this.img.src !== this.sprites.up.img_src) {
                    this.img.src = player.sprites.up.img_src;
                    this.frames = player.sprites.up.frames;
                }
                break;
            case "down":
                if(this.img.src !== this.sprites.down.img_src) {
                    this.img.src = player.sprites.down.img_src;
                    this.frames = player.sprites.down.frames;
                }
                break;
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 200)
    }
}