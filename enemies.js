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

    drawMinimap() {

    }
};

//enemies
class zombie {
    constructor(game, x, y) {
        Object.assign(this,{game, x, y});
        //spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/zombies.png");

        // zombie state variable
        this.facing = 0; // 0 = right, 1 == left
        this.state = 0; //0 = idle, 1 = walking, 2 = running, 3= attacking, 4 = die
        this.dead = false;
        //zombie idling
        this.animation = [];
        //idle
        this.animation[0]= new Animator(this.spritesheet, 146, 15, 35, 40 , 5, 0.33, 60, false, true);
        //running
        this.animation[1]= new Animator(this.spritesheet, 146, 71, 35, 40 , 5, 0.1, 60, false, true);
        //hurting
        this.animation[2] = new Animator(this.spritesheet, 146, 296, 35, 40 , 5, 0.33, 60, false, true);


    };

    draw(ctx) {
        //console.log("hello");
        //ctx.drawImage(this.spritesheet, 0, 0);
        this.animation[0].drawFrame(this.game.clockTick, ctx, 0, 0, 2);
        this.animation[1].drawFrame(this.game.clockTick, ctx, 0, 150, 2);
        this.animation[2].drawFrame(this.game.clockTick, ctx, 0, 300, 2);
    };
    
    update() {    
    }

};

class FlyingEye {

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.velocity = { x: -PARAMS.BITWIDTH, y: 0 }; // pixels per second
        this.animationModes = ["walk", "attack", "death"];
        this.currentMode = this.animationModes[0];
        this.assetsMap = this.constructAssetMap();
        this.animations = this.animationModes.map((mode) => this.createFlyingEyeAnimator(mode));
        this.paused = true;
        this.deadCounter = 0;
        this.attackCounter = 0;
        this.updateBoundingBox();
        console.log(this.currentMode, this.assetsMap, this.animations);
    };

    constructAssetMap() {
        const assetMap = new Map();
        this.animationModes.forEach((mode) =>
          assetMap.set(mode, ASSET_MANAGER.getAsset(`./sprites/flying-eye/${mode}.png`))
        );
        return assetMap;
    }

    createFlyingEyeAnimator(mode) {
        return new Animator(
          this.assetsMap.get(mode) ?? "walk",
          52,
          60,
          42,
          42,
          8,
          0.2,
          108,
          true,
          mode !== "death"
        );
    }

    updateBoundingBox() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 2.6 * PARAMS.BLOCKWIDTH, 2.6 * PARAMS.BLOCKWIDTH);
    };

    isAttacking() {
        return this.currentMode === "attack";
    }

    isDead() {
        return this.currentMode === "death";
    }

    isInCameraView() {
        return this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH;
    }

    update() {
        if (this.isAttacking()) {
            this.attackCounter += this.game.clockTick;
            if (this.attackCounter > 1.6) {
                this.currentMode = "walk";
                this.attackCounter = 0.0;
            }
        }
        if (this.isDead()) {
            if (this.deadCounter === 0) {
                this.game.addEntity(new Score(this.game, this.x, this.y, 100));
            }
            this.deadCounter += this.game.clockTick;
            if (this.deadCounter > 0.5) {
                this.removeFromWorld = true;
            }
        }
        if (this.paused && this.isInCameraView()) {
            this.paused = false;
        }
        if (!this.paused && !this.isDead()) {
            this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
            this.updateBoundingBox();
            const that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (entity instanceof Mario) {
                        that.currentMode = "attack";
                    } else if ((entity instanceof Ground || entity instanceof Brick || entity instanceof Block || entity instanceof Tube)
                      && that.lastBB.bottom <= entity.BB.top) {
                        that.y = entity.BB.top - PARAMS.BLOCKWIDTH;
                        that.updateBoundingBox();
                    } else if (entity !== that) {
                        that.velocity.x = -that.velocity.x;
                    }
                }
            });
        }
    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Tan";
        ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, PARAMS.SCALE, PARAMS.SCALE);
    };

    draw(ctx) {
        this.animations[this.animationModes.indexOf(this.currentMode)]
          .drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE)
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
}
