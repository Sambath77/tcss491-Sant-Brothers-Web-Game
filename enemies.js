class Goomba {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.velocity = { x: -PARAMS.BITWIDTH, y: 0 }; // pixels per second
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemies.png");
        this.animation = new Animator(this.spritesheet, 0, 4, 16, 16, 2, 0.2, 14, false, true);
        this.paused = true;
        this.dead = false;
        this.deadCounter = 0;
        this.flickerFlag = true;
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
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
                    if (entity instanceof Mario || entity instanceof Mushroom) {

                    } else if ((entity instanceof Ground || entity instanceof Brick || entity instanceof Block || entity instanceof Tube)
                        && that.lastBB.bottom <= entity.BB.top) {
                        that.y = entity.BB.top - PARAMS.BLOCKWIDTH;
                        that.velocity.y = 0;
                        that.updateBB();
                    } else if (entity !== that) {
                        that.velocity.x = -that.velocity.x;
                    }
                };
            });
       }
     };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Tan";
        ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, PARAMS.SCALE, PARAMS.SCALE);
    };

    draw(ctx) {
        if (this.dead) {
            if (this.flickerFlag) {
                ctx.drawImage(this.spritesheet,
                    0, 4, //source from sheet
                    16, 16,
                    this.x - this.game.camera.x, this.y + PARAMS.BLOCKWIDTH * 3 / 4,
                    PARAMS.BLOCKWIDTH,
                    PARAMS.BLOCKWIDTH / 4);
            }
            this.flickerFlag = !this.flickerFlag;
        } else {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE)
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            }
       }
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
