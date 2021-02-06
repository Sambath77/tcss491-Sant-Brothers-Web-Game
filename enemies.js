class Skeleton {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.velocity = { x: -PARAMS.BITWIDTH, y: 0 }; // pixels per second
    this.animationModes = ["walk", "attack", "death"];
    this.currentMode = this.animationModes[0];
    this.assetsMap = this.constructAssetMap();
    this.animations = this.animationModes.map((mode) =>
      this.createSkeletonAnimator(mode)
    );
    this.paused = true;
    this.deadCounter = 0;
    this.attackCounter = 0;
    this.updateBoundingBox();

    // this.spritesheet = ASSET_MANAGER.getAsset("./sprites/skeleton.png");

    // this.animation = new Animator(this.spritesheet, 85, 135, 20, 60, 6, 0.2, 44, false, true);
    // this.animation2 = new Animator(this.spritesheet, 15, 197, 30, 60, 9, 0.25, 34, false, true);
    // this.animation3 = new Animator(this.spritesheet, 463, 143, 50, 50, 2, 1.0, 10, false, true);
  }

  constructAssetMap() {
    const assetMap = new Map();
    this.animationModes.forEach((mode) =>
      assetMap.set(mode, ASSET_MANAGER.getAsset(`./sprites/skeleton.png`))
    );
    return assetMap;
  }

  createSkeletonAnimator(mode) {
    if (mode == "walk") {
      return new Animator(
        this.assetsMap.get(mode) ?? "walk",
        85,
        135,
        20,
        50,
        6,
        0.2,
        44,
        true,
        mode !== "death"
      );
    } else if (mode == "attack") {
      return new Animator(
        this.assetsMap.get(mode) ?? "walk",
        15,
        197,
        30,
        50,
        9,
        0.1,
        34,
        true,
        mode !== "death"
      );
    } else if (mode == "death") {
      return new Animator(
        this.assetsMap.get(mode) ?? "walk",
        463,
        125,
        50,
        50,
        2,
        2.0,
        10,
        true,
        mode == "death"
      );
    }
  }
  updateBoundingBox() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      1.2 * PARAMS.BLOCKWIDTH,
      3.1 * PARAMS.BLOCKWIDTH
    );
  }

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
          if(entity instanceof Bullet || entity instanceof Spray || 
            entity instanceof MultileFire || entity instanceof Fireball) {
            that.currentMode = "death";
            entity.removeFromWorld = true;
          } else if(entity instanceof Sant) {
            that.currentMode = "attack";

          } else if (
            (entity instanceof Ground ||
              entity instanceof Brick ||
              entity instanceof Block) &&
            that.lastBB.bottom <= entity.BB.top
          ) {
            that.y = entity.BB.top - PARAMS.BLOCKWIDTH;
            that.updateBoundingBox();
          } //else if (entity !== that) {
          //   that.velocity.x = -that.velocity.x;
          // } 
        }
      });
    }
  }

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = "Tan";
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      PARAMS.SCALE,
      PARAMS.SCALE
    );
  }

  draw(ctx) {
    this.animations[this.animationModes.indexOf(this.currentMode)].drawFrame(
      this.game.clockTick,
      ctx,
      this.x - this.game.camera.x,
      this.y,
      PARAMS.SCALE
    );
    if (PARAMS.DEBUG) {
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }
  }
}

//enemies
class Zombie {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.velocity = { x: -PARAMS.BITWIDTH * 2, y: 0 }; // pixels per second
    this.animationModes = ["running", "attack", "death"];
    this.currentMode = this.animationModes[0];
    this.assetsMap = this.constructAssetMap();
    this.animations = this.animationModes.map((mode) =>
      this.createZombieAnimator(mode)
    );
    this.paused = true;
    this.deadCounter = 0;
    this.attackCounter = 0;
    this.updateBoundingBox();
    //Zombie idling
    //this.animation = [];
    //idle
    //this.animation[0]= new Animator(this.spritesheet, 146, 15, 35, 40 , 5, 0.33, 60, false, true);
    //running
    // this.animation[1]= new Animator(this.spritesheet, 146, 71, 35, 40 , 5, 0.1, 60, false, true);
    //hurting
    //this.animation[2] = new Animator(this.spritesheet, 146, 122, 35, 40 , 5, 0.1, 60, false, true);
    //Attacking
    //this.animation[2] = new Animator(this.spritesheet, 146, 296, 35, 40 , 5, 0.33, 60, false, true);
  }

  constructAssetMap() {
    const assetMap = new Map();
    this.animationModes.forEach((mode) =>
      assetMap.set(mode, ASSET_MANAGER.getAsset('./sprites/zombies_left.png'))
    );
    return assetMap;
  }

  createZombieAnimator(mode) {
    // if (mode == "running"){
    //     return new Animator(
    //         this.assetsMap.get(mode) ?? "running",
    //         146,
    //         71,
    //         35,
    //         40,
    //         5,
    //         0.1,
    //         60,
    //         true,
    //         mode !== "death"
    //       );
    // } else if (mode == "attack") {
    //     return new Animator(
    //         this.assetsMap.get(mode) ?? "running",
    //         146,
    //         122,
    //         35,
    //         40,
    //         5,
    //         0.1,
    //         60,
    //         true,
    //         mode !== "death"
    //       );
    //
    // }
    if (mode == "running") {
      return new Animator(
        this.assetsMap.get(mode) ?? "running",
        58,
        68,
        35,
        40,
        5,
        0.1,
        58,
        true,
        mode !== "death"
      );
    } else if (mode == "attack") {
      return new Animator(
        this.assetsMap.get(mode) ?? "running",
        //58,
        //122,
        //35,
        //40,
        //5,
        //0.5,
        //58,
        58, 
        240,
        35,
        40,
        5,
        0.1,
        58,
        false,
        mode !== "death"
      );
    }
    else if (mode == "death" ){
      return new Animator(
        this.assetsMap.get(mode) ?? "running",
        37,
        363,
        59,
        40,
        5,
        1,
        0,
        false,
        mode == "death"
      )
    }
  }

  updateBoundingBox() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      2.2 * PARAMS.BLOCKWIDTH,
      2.5 * PARAMS.BLOCKWIDTH
    );
  }

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
        this.currentMode = "running";
        this.attackCounter = 0.0;
      }
    }
    if (this.isDead()) {
      if (this.deadCounter === 0) {
        this.game.addEntity(new Score(this.game, this.x, this.y, 50));
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
          if(entity instanceof Bullet || entity instanceof Spray || 
            entity instanceof MultileFire || entity instanceof Fireball) {
              entity.removeFromWorld = true;
            that.currentMode = "death";
          } else if (entity instanceof Sant) {
            that.currentMode = "attack";
          } else if (
            (entity instanceof Ground ||
              entity instanceof Brick ||
              entity instanceof Block) &&
            that.lastBB.bottom <= entity.BB.top
          ) {
            that.y = entity.BB.top - PARAMS.BLOCKWIDTH;
            that.updateBoundingBox();
          // } else if (entity !== that) {
          //   that.velocity.x = -that.velocity.x;
          }
        }
      });
    }
  }

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = "Tan";
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      PARAMS.SCALE,
      PARAMS.SCALE
    );
  }

  draw(ctx) {
    this.animations[this.animationModes.indexOf(this.currentMode)].drawFrame(
      this.game.clockTick,
      ctx,
      this.x - this.game.camera.x,
      this.y,
      PARAMS.SCALE
    );
    if (PARAMS.DEBUG) {
      ctx.strokeStyle = "Red";
      ctx.strokeRect(
        this.BB.x - this.game.camera.x,
        this.BB.y,
        this.BB.width,
        this.BB.height
      );
    }
  }
}

class FlyingEye {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.velocity = { x: -PARAMS.BITWIDTH, y: 0 }; // pixels per second
    this.animationModes = ["walk", "attack", "death"];
    this.currentMode = this.animationModes[0];
    this.assetsMap = this.constructAssetMap();
    this.animations = this.animationModes.map((mode) =>
      this.createFlyingEyeAnimator(mode)
    );
    this.paused = true;
    this.deadCounter = 0;
    this.attackCounter = 0;
    this.updateBoundingBox();
  }

  constructAssetMap() {
    const assetMap = new Map();
    this.animationModes.forEach((mode) =>
      assetMap.set(
        mode,
        ASSET_MANAGER.getAsset(`./sprites/flying-eye/${mode}.png`)
      )
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
      0.05,
      108,
      true,
      mode !== "death"
    );
  }

  updateBoundingBox() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      2.6 * PARAMS.BLOCKWIDTH,
      2.6 * PARAMS.BLOCKWIDTH
    );
  }

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
          if(entity instanceof Bullet || entity instanceof Spray || 
            entity instanceof MultileFire || entity instanceof Fireball) {
            that.currentMode = "death";
            entity.removeFromWorld = true;
          } else if (entity instanceof Sant) {
            that.currentMode = "attack";
          } else if (
            (entity instanceof Ground ||
              entity instanceof Brick ||
              entity instanceof Block) &&
            that.lastBB.bottom <= entity.BB.top
          ) {
            that.y = entity.BB.top - PARAMS.BLOCKWIDTH;
            that.updateBoundingBox();
          } else if (entity !== that) {
            that.velocity.x = -that.velocity.x;
          }
        }
      });
    }
  }

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = "Tan";
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      PARAMS.SCALE,
      PARAMS.SCALE
    );
  }

  draw(ctx) {
    this.animations[this.animationModes.indexOf(this.currentMode)].drawFrame(
      this.game.clockTick,
      ctx,
      this.x - this.game.camera.x,
      this.y,
      PARAMS.SCALE
    );
    if (PARAMS.DEBUG) {
      ctx.strokeStyle = "Red";
      ctx.strokeRect(
        this.BB.x - this.game.camera.x,
        this.BB.y,
        this.BB.width,
        this.BB.height
      );
    }
  }
}

class Terrorists {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.velocity = { x: -PARAMS.BITWIDTH, y: 0 }; // pixels per second
    this.animationModes = ["walk", "attack", "death"];
    this.currentMode = this.animationModes[0];
    this.assetsMap = this.constructAssetMap();
    this.animations = this.animationModes.map((mode) =>
      this.createTerroristsAnimator(mode)
    );
    this.health = 5;
    this.paused = true;
    this.deadCounter = 0;
    this.attackCounter = 0;
    this.updateBoundingBox();
    this.isFacingLeft = 0;

    // this.spritesheet = ASSET_MANAGER.getAsset("./sprites/skeleton.png");

    // this.animation = new Animator(this.spritesheet, 85, 135, 20, 60, 6, 0.2, 44, false, true);
    // this.animation2 = new Animator(this.spritesheet, 15, 197, 30, 60, 9, 0.25, 34, false, true);
    // this.animation3 = new Animator(this.spritesheet, 463, 143, 50, 50, 2, 1.0, 10, false, true);
  }

  constructAssetMap() {
    const assetMap = new Map();
    this.animationModes.forEach((mode) =>
      assetMap.set(mode, ASSET_MANAGER.getAsset(`./sprites/terrorists.png`))
    );
    return assetMap;
  }

  createTerroristsAnimator(mode) {
    if (mode == "walk") {
      return new Animator(
        this.assetsMap.get(mode) ?? "walk", 283, 149, 41, 45, 6, 0.1, 0, true, mode !== "death");
    } else if (mode == "attack") {
      return new Animator(
        this.assetsMap.get(mode) ?? "walk", 336, 45, 48, 45, 4, 0.2, 0, true, mode !== "death");
    } else if (mode == "death") {
      return new Animator(
        this.assetsMap.get(mode) ?? "walk", 311, 353, 57, 50, 1, 1, 0.1, true, mode == "death");

    }
  }
  updateBoundingBox() {
    if (this.currentMode == "attack") {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(
        this.x,
        this.y,
        3.0 * PARAMS.BLOCKWIDTH,
        2.8 * PARAMS.BLOCKWIDTH
      );
    } else if (this.currentMode == "walk") {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(
      this.x,
      this.y,
      2.6 * PARAMS.BLOCKWIDTH,
      2.8 * PARAMS.BLOCKWIDTH
    );

    } 
  }
  isWalking() {
    return this.currentMode === "walk";
  }

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

      // attack counter is for restricting attack speed

      this.velocity.x = 0;
      //console.log(this.attackCounter);
          // attack counter is for restricting attack speed
      if (this.attackCounter > 0.5) {
        const bulletX = this.x - 20;
        const bulletY = this.y + 37;
        this.game.addEntity(new BulletTwo(this.game, bulletX, bulletY, 1));
        this.attackCounter = 0.0;
      }
      if (this.attackCounter > 1.6) {
        this.currentMode = "walk";
        this.attackCounter = 0.0;
      }
    } else {
      this.velocity = { x: -PARAMS.BITWIDTH, y: 0 };
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
        if (entity instanceof Sant && entity.x < that.x) {
          that.currentMode = "attack";
        } else if (entity instanceof Sant && entity.x > that.x) {
          that.currentMode = "walk";
        }
        if (entity.BB && that.BB.collide(entity.BB)) {
          if(entity instanceof Bullet || entity instanceof Spray || 
            entity instanceof MultileFire || entity instanceof Fireball) {
            if(that.health > 0) {
              that.health -= entity.power;
              entity.removeFromWorld = true;
              if (that.health <= 0) {
                that.currentMode = "death";
              }
            } 
          } else if (entity instanceof Sant) {
            that.currentMode = "attack";
          } else if (
            (entity instanceof Ground ||
              entity instanceof Brick ||
              entity instanceof Block) &&
            that.lastBB.bottom <= entity.BB.top
          ) {
            that.y = entity.BB.top - PARAMS.BLOCKWIDTH;
            that.updateBoundingBox();
          // } else if (entity !== that) {
          //   that.velocity.x = -that.velocity.x;
          }
        }
      });
    }
  }

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = "Tan";
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      PARAMS.SCALE,
      PARAMS.SCALE
    );
  }

  draw(ctx) {
    this.animations[this.animationModes.indexOf(this.currentMode)].drawFrame(
      this.game.clockTick,
      ctx,
      this.x - this.game.camera.x,
      this.y,
      PARAMS.SCALE
    );
    if (PARAMS.DEBUG) {
      ctx.strokeStyle = "Red";
      ctx.strokeRect(
        this.BB.x - this.game.camera.x,
        this.BB.y,
        this.BB.width,
        this.BB.height
      );
    }
  }
}
