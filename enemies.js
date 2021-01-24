class Skeleton {
    constructor(game) {
        Object.assign(this, {game});
       
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/skeleton.png");
        

        this.animation = new Animator(this.spritesheet, 85, 135, 20, 60, 6, 0.2, 44, false, true);
        this.animation2 = new Animator(this.spritesheet, 15, 197, 30, 60, 9, 0.25, 34, false, true);
        this.animation3 = new Animator(this.spritesheet, 463, 143, 50, 50, 2, 1.0, 10, false, true);
        
    };


    update() {

    };

 
    draw(ctx) {

        this.animation.drawFrame(this.game.clockTick, ctx, 50, 50, 2);
        this.animation2.drawFrame(this.game.clockTick, ctx, 50, 200, 2);
        this.animation3.drawFrame(this.game.clockTick, ctx, 50, 350, 2);


    };
};

class Koopa {
    constructor(game, x, y, facing) {
        Object.assign(this, { game, x, y, facing });
        this.velocity = { x: Math.pow(-1, this.facing)*PARAMS.BITWIDTH, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemies.png");
        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 210, 0, 16, 24, 2, 0.2, 14, false, true));
        this.animations.push(new Animator(this.spritesheet, 150, 0, 16, 24, 2, 0.2, 14, false, true));
        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, (1 + 7/16) * PARAMS.BLOCKWIDTH);
    };

    update() {
        const FALL_ACC = 1800;

        if (this.dead) {
            if (this.deadCounter === 0) this.game.addEntity(new Score(this.game, this.x, this.y, 100));
            this.deadCounter += this.game.clockTick;
            if (this.deadCounter > 0.5) this.removeFromWorld = true;  // flicker for half a second
        }
        if (this.paused && this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH) {
            this.paused = false;
        }
        if (!this.paused && !this.dead) {
            this.velocity.y += FALL_ACC * this.game.clockTick;
            this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
            this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;
            this.updateBB();

            var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (entity instanceof Mario) {

                    } else if ((entity instanceof Ground || entity instanceof Brick || entity instanceof Block || entity instanceof Tube)
                        && (that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE) <= entity.BB.top) {
                        that.y = entity.BB.top - PARAMS.BLOCKWIDTH * (1 + 7 / 16);
                        that.velocity.y = 0;
                        that.updateBB();
                    } else if (entity !== that) {
                        that.velocity.x = -that.velocity.x;
                        that.facing = (that.facing + 1) % 2;
                    }
                };
            });
        }
    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "LightGreen";
        ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, PARAMS.SCALE, PARAMS.SCALE * 1.5);
    };

    draw(ctx) {
        if (this.dead) {
            
        } else {
            this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE)
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            }
        }
    };
};