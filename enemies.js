class Skeleton {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.velocity = { x: -PARAMS.BITWIDTH, y: 0 }; // pixels per second
    this.animationModes = [
      'walk',
      'attack',
      'death',
      'backward',
      'attack_right',
    ];
    this.currentMode = this.animationModes[0];
    this.assetsMap = this.constructAssetMap();

    this.animations = this.animationModes.map((mode) =>
      this.createSkeletonAnimator(mode)
    );
    this.paused = true;
    this.deadCounter = 0;
    this.attackCounter = 0;
    this.count = 0;
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
    if (mode == 'walk') {
      return new Animator(
        this.assetsMap.get(mode) ?? 'walk',
        85,
        135,
        20,
        50,
        6,
        0.2,
        44,
        true,
        mode !== 'death'
      );
    } else if (mode == 'attack') {
      return new Animator(
        this.assetsMap.get(mode) ?? 'walk',
        15,
        197,
        30,
        50,
        9,
        0.1,
        34,
        true,
        mode !== 'death'
      );
    } else if (mode == 'death') {
      return new Animator(
        this.assetsMap.get(mode) ?? 'walk',
        463,
        125,
        50,
        50,
        2,
        2.0,
        10,
        true,
        mode == 'death'
      );
    } else if (mode == 'backward') {
      return new Animator(
        this.assetsMap.get(mode) ?? 'walk',
        22,
        453,
        22,
        50,
        3,
        2.0,
        41,
        true,
        mode != 'death'
      );
    } else if (mode == 'attack_right') {
      return new Animator(
        this.assetsMap.get(mode) ?? 'walk',
        466,
        454,
        44,
        50,
        2,
        2.0,
        34,
        true,
        mode != 'death'
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
    return this.currentMode === 'attack' || this.currentMode === 'attack_right';
  }

  isDead() {
    return this.currentMode === 'death';
  }

  isInCameraView() {
    return this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH;
  }

  update() {
    if (this.isAttacking()) {
      this.attackCounter += this.game.clockTick;
      if (this.attackCounter > 1.6) {
        this.currentMode = 'walk';
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
          if (
            entity instanceof Bullet ||
            entity instanceof Spray ||
            entity instanceof MultileFire ||
            entity instanceof Fireball
          ) {
            that.currentMode = 'death';
            entity.removeFromWorld = true;
            that.count++;
            if (
              that.currentMode === 'death' &&
              that.count % 2 === 0 &&
              that.count !== 0
            ) {
              that.game.addEntity(
                new Skeleton(that.game, that.x + 1000, that.y)
              );
            }
            that.updateBoundingBox();
          } else if (entity instanceof Sant) {
            // that.currentMode = 'attack';
            //that.updateBoundingBox();
            if (entity.x < that.x) {
              that.currentMode = 'attack';
              that.isFacingLeft = false;
            } else {
              that.currentMode = 'attack_rigt';
              that.isFacingLeft = true;
            }

            if (that.isFacingLeft) {
              that.currentMode = 'walk';
            } else {
              that.currentMode = 'backward';
            }
            that.updateBoundingBox();
          } else if (
            (entity instanceof Ground ||
              entity instanceof Brick ||
              entity instanceof BrickLevelOne) &&
            that.lastBB.bottom <= entity.BB.top
          ) {
            that.y = entity.BB.top - PARAMS.BLOCKWIDTH;
            that.updateBoundingBox();
          } else if (
            entity instanceof BlockLevelOne ||
            (entity instanceof Block && that.BB.bottom > entity.BB.top)
          ) {
            if (that.BB.collide(entity.leftBB)) {
              that.x = entity.BB.left - that.BB.width;
              that.currentMode = 'walk';
              that.isFacingLeft = false;
              console.log('Skelton left');

              if (that.velocity.x > 0) {
                that.velocity.x = -that.velocity.x;
              }
            } else {
              that.x = entity.BB.right;
              console.log('Skeleton right');

              if (that.velocity.x < 0) {
                that.currentMode = 'backward';

                that.velocity.x = -that.velocity.x;
                console.log('skeleton walk backward');
              }
              that.updateBoundingBox();
            }

            that.updateBoundingBox();
          }
        }
      });
    }
  }

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = 'Tan';
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
      ctx.strokeRect(
        this.BB.x - this.game.camera.x,
        this.BB.y,
        this.BB.width,
        this.BB.height
      );
    }
  }
}

//enemies
class Zombie {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.velocity = { x: -PARAMS.BITWIDTH * 2, y: 0 }; // pixels per second
    this.animationModes = [
      'running',
      'attack',
      'death',
      'runningRight',
      'attackRight',
    ];
    this.currentMode = this.animationModes[0];
    this.assetsMap = this.constructAssetMap();
    this.assetsMapRight = this.constructAssetMapRight();
    this.animations = this.animationModes.map((mode) =>
      this.createZombieAnimator(mode)
    );
    this.paused = true;
    this.deadCounter = 0;
    this.attackCounter = 0;
    this.game.show = false;
    this.updateBoundingBox();
  }

  constructAssetMap() {
    const assetMap = new Map();
    this.animationModes.forEach((mode) =>
      assetMap.set(mode, ASSET_MANAGER.getAsset('./sprites/zombies_left.png'))
    );
    return assetMap;
  }

  constructAssetMapRight() {
    const assetMapRight = new Map();
    this.animationModes.forEach((mode) =>
      assetMapRight.set(mode, ASSET_MANAGER.getAsset('./sprites/zombies.png'))
    );
    return assetMapRight;
  }
  createZombieAnimator(mode) {
    if (mode == 'running') {
      return new Animator(
        this.assetsMap.get(mode) ?? 'running',
        58,
        68,
        35,
        40,
        5,
        0.1,
        58,
        true,
        mode !== 'death'
      );
    } else if (mode == 'attack') {
      return new Animator(
        this.assetsMap.get(mode) ?? 'running',
        58,
        240,
        35,
        40,
        5,
        0.1,
        58,
        false,
        mode !== 'death'
      );
    } else if (mode == 'runningRight') {
      return new Animator(
        this.assetsMapRight.get(mode) ?? 'running',
        143,
        120,
        41,
        40,
        5,
        0.1,
        53,
        false,
        mode !== 'death'
      );
    } else if (mode == 'attackRight') {
      return new Animator(
        this.assetsMapRight.get(mode) ?? 'running',
        147,
        139,
        30,
        38,
        5,
        0.1,
        65,
        false,
        mode !== 'death'
      );
    } else if (mode == 'death') {
      return new Animator(
        this.assetsMap.get(mode) ?? 'running',
        37,
        363,
        59,
        40,
        5,
        1,
        0,
        false,
        mode == 'death'
      );
    }
  }

  updateBoundingBox() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      2.2 * PARAMS.BLOCKWIDTH,
      3 * PARAMS.BLOCKWIDTH
    );
  }

  isAttacking() {
    return this.currentMode === 'attack' || this.currentMode === 'attackRIght';
  }

  isDead() {
    return this.currentMode === 'death';
  }

  isInCameraView() {
    return this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH;
  }

  update() {
    if (this.isAttacking()) {
      this.attackCounter += this.game.clockTick;
      if (this.attackCounter > 1.6) {
        this.currentMode = 'running';
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
          if (
            entity instanceof Bullet ||
            entity instanceof Spray ||
            entity instanceof MultileFire ||
            entity instanceof Fireball
          ) {
            entity.removeFromWorld = true;
            that.currentMode = 'death';
            that.updateBoundingBox();
            if (that.currentMode == 'death' && that.game.currentLevel === 2) {
              that.game.addEntity(new Zombie(that.game, that.x + 600, that.y));
            } else if (
              that.currentMode == 'death' &&
              that.game.currentLevel === 3
            ) {
              that.game.addEntity(new Zombie(that.game, that.x + 500, that.y));
            }
          } else if (entity instanceof Sant) {
            //that.currentMode = 'attack';

            if (entity.x <= that.x) {
              that.currentMode = 'attack';
              that.isFacingLeft = false;
            } else {
              that.currentMode = 'attackRight';
              that.isFacingLeft = true;
            }

            if (that.isFacingLeft) {
              that.currentMode = 'running';
            } else {
              that.currentMode = 'runningRight';
            }
            that.updateBoundingBox();
          } else if (
            entity instanceof Ground &&
            that.lastBB.bottom <= entity.BB.top
          ) {
            that.y = entity.BB.top - PARAMS.BLOCKWIDTH;
            that.updateBoundingBox();
            // } else if (entity !== that) {
            //   that.velocity.x = -that.velocity.x;
          } else if (
            entity instanceof BlockLevelOne ||
            (entity instanceof Block && that.BB.bottom > entity.BB.top)
          ) {
            if (that.BB.collide(entity.leftBB)) {
              that.x = entity.BB.left - that.BB.width;
              //that.currentMode = 'running';
              that.isFacingLeft = true;

              if (that.velocity.x > 0) {
                that.velocity.x = -that.velocity.x;
                that.currentMode = 'running';
              }
            } else {
              that.x = entity.BB.right;

              that.currentMode = 'runningRight';
              that.isFacingLeft = false;

              if (that.velocity.x < 0) {
                that.velocity.x = -that.velocity.x;

                console.log(that.velocity.x + ' changed to right');
              }
              that.updateBoundingBox();
            }

            that.updateBoundingBox();
          }
        }
      });
    }
  }

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = 'Tan';
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
    this.animationModes = ['walk', 'attack', 'death'];
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
      this.assetsMap.get(mode) ?? 'walk',
      52,
      60,
      42,
      42,
      8,
      0.05,
      108,
      true,
      mode !== 'death'
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
    return this.currentMode === 'attack';
  }

  isDead() {
    return this.currentMode === 'death';
  }

  isInCameraView() {
    return this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH;
  }

  update() {
    if (this.isAttacking()) {
      this.attackCounter += this.game.clockTick;
      if (this.attackCounter > 1.6) {
        this.currentMode = 'walk';
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
          if (
            entity instanceof Bullet ||
            entity instanceof Spray ||
            entity instanceof MultileFire ||
            entity instanceof Fireball
          ) {
            that.currentMode = 'death';
            entity.removeFromWorld = true;
          } else if (entity instanceof Sant) {
            that.currentMode = 'attack';
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
    ctx.fillStyle = 'Tan';
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
    this.animationModes = [
      'walk',
      'attack',
      'death',
      'deathRight',
      'attackRight',
      'walkRight',
    ];
    this.currentMode = this.animationModes[0];
    this.assetsMap = this.constructAssetMap();
    this.assetsMapRight = this.constructAssetMapRight();
    this.animations = this.animationModes.map((mode) =>
      this.createTerroristsAnimator(mode)
    );
    this.health = 5;
    this.paused = true;
    this.deadCounter = 0;
    this.attackCounter = 0;
    this.count = 0;
    //this.game.show = false;
    this.updateBoundingBox();
    this.isFacingLeft = 1;
    this.isLeft = false;

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

  constructAssetMapRight() {
    const assetMapRight = new Map();
    this.animationModes.forEach((mode) =>
      assetMapRight.set(
        mode,
        ASSET_MANAGER.getAsset(`./sprites/terrorists_right.png`)
      )
    );
    return assetMapRight;
  }

  createTerroristsAnimator(mode) {
    if (mode == 'walk') {
      return new Animator(
        this.assetsMap.get(mode) ?? 'walk',
        283,
        149,
        41,
        45,
        6,
        0.1,
        0,
        true,
        mode !== 'death'
      );
    } else if (mode == 'attack') {
      return new Animator(
        this.assetsMap.get(mode) ?? 'walk',
        336,
        45,
        48,
        45,
        4,
        0.2,
        0,
        true,
        mode !== 'death'
      );
    } else if (mode == 'attackRight') {
      return new Animator(
        this.assetsMapRight.get(mode) ?? 'walk',
        36,
        150,
        32,
        42,
        3,
        0.2,
        3,
        true,
        mode !== 'death'
      );
    } else if (mode == 'walkRight') {
      return new Animator(
        this.assetsMapRight.get(mode) ?? 'walk',
        80,
        46,
        34,
        43,
        2,
        0.2,
        15,
        true,
        mode !== 'death'
      );
    } else if (mode == 'death') {
      return new Animator(
        this.assetsMap.get(mode) ?? 'walk',
        311,
        353,
        57,
        50,
        1,
        1,
        0.1,
        true,
        mode == 'death'
      );
    }
  }
  updateBoundingBox() {
    if (this.currentMode == 'attack' || this.currentMode == 'attackRight') {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(
        this.x,
        this.y,
        3.0 * PARAMS.BLOCKWIDTH,
        2.8 * PARAMS.BLOCKWIDTH
      );
    } else if (this.currentMode == 'walk' || this.currentMode == 'walkRight') {
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
    return this.currentMode === 'walk' || this.currentMode === 'walkRight';
  }

  isAttacking() {
    return this.currentMode === 'attack' || this.currentMode === 'attackRight';
  }

  isDead() {
    return this.currentMode === 'death';
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
        this.game.addEntity(
          new BulletTwo(this.game, bulletX, bulletY, this.isFacingLeft)
        );
        this.attackCounter = 0.0;
      }
      // if (this.attackCounter > 1.6) {
      //   if (this.isFacingLeft) {
      //     this.currentMode = 'walk';
      //     this.attackCounter = 0.0;
      //   } else {
      //     this.currentMode = 'walkRight';
      //     this.attackCounter = 0.0;
      //   }
      // }
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
        if (
          entity instanceof Sant &&
          entity.x < that.x &&
          entity.y > that.y - 13
        ) {
          //that.currentMode = 'attack';
          if (entity.x > that.x) {
            that.currentMode = 'attackRight';
            that.isFacingLeft = 0;
            that.isLeft = false;
            console.log('Attack Right');
          } else {
            that.currentMode = 'attack';
            that.isFacingLeft = 1;
            that.isLeft = true;
            console.log('attack left');
          }

          // if (that.isLeft) {
          //   that.currentMode = 'walk';
          // } else {
          //   that.currentMode = 'walkRight';
          // }
          that.updateBoundingBox();
        } else if (
          entity instanceof Sant &&
          (entity.x > that.x || entity.y < that.y - 13)
        ) {
          that.currentMode = 'walk';
        }
        if (entity.BB && that.BB.collide(entity.BB)) {
          if (
            entity instanceof Bullet ||
            entity instanceof Spray ||
            entity instanceof MultileFire ||
            entity instanceof Fireball
          ) {
            if (that.health > 0) {
              that.health -= entity.power;
              entity.removeFromWorld = true;
              if (that.health <= 0) {
                that.currentMode = 'death';
              }
              if (
                that.currentMode === 'death' &&
                that.game.currentLevel === 2
              ) {
                console.log('add new terrorist');
                that.game.addEntity(
                  new Terrorists(that.game, that.x + 600, that.y)
                );
              } else if (
                that.currentMode === 'death' &&
                that.game.currentLevel === 3
              ) {
                console.log('add new terrorist');
                that.game.addEntity(
                  new Terrorists(that.game, that.x + 500, that.y)
                );
              }
            }
          } else if (entity instanceof Sant) {
            that.currentMode = 'attack';
          } else if (
            entity instanceof Ground &&
            that.lastBB.bottom <= entity.BB.top
          ) {
            that.y = entity.BB.top - PARAMS.BLOCKWIDTH;
            that.updateBoundingBox();
          } else if (
            entity instanceof BlockLevelOne ||
            (entity instanceof Block && that.BB.bottom > entity.BB.top)
          ) {
            if (that.BB.collide(entity.leftBB)) {
              that.x = entity.BB.left - that.BB.width;
              that.currentMode = 'walk';
              that.isFacingLeft = 1;
              if (that.velocity.x > 0) {
                that.velocity.x = -that.velocity.x;
                that.currentMode = 'walk';
              }
            } else {
              that.x = entity.BB.right;
              that.currentMode = 'walkRight';
              that.isFacingLeft = 0;

              if (that.velocity.x < 0) {
                that.velocity.x = -that.velocity.x;
                console.log(that.velocity.x + ' terrorist changed to right');
              }
              that.updateBoundingBox();
            }

            that.updateBoundingBox();
          }
        }
      });
    }
  }

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = 'Tan';
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
      ctx.strokeRect(
        this.BB.x - this.game.camera.x,
        this.BB.y,
        this.BB.width,
        this.BB.height
      );
    }
  }
}



class Gunner {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.velocity = { x: -PARAMS.BITWIDTH, y: 0 }; // pixels per second
    this.animationModes = ["walkleft", "walkright", "attackleft", "attackright", "deathleft", "deathright"];
    this.currentMode = this.animationModes[0];
    this.assetsMapLeft = this.constructAssetMapLeft();
    this.assetsMapRight = this.constructAssetMapRight();
    this.animations = this.animationModes.map((mode) =>
      this.createGunnerAnimator(mode)
    );
    this.health = 1;
    this.paused = true;
    this.deadCounter = 0;
    this.attackCounter = 0;
    this.updateBoundingBox();
    this.isFacingLeft = true;
    this.isFirstTimeTriggered = true;
  }

  constructAssetMapLeft() {
    const assetMapLeft = new Map();
    this.animationModes.forEach((mode) =>
      assetMapLeft.set(mode, ASSET_MANAGER.getAsset(`./sprites/gunners-left.png`))
    );
    return assetMapLeft;
  }

  constructAssetMapRight() {
      const assetMapRight = new Map();
      this.animationModes.forEach((mode) =>
        assetMapRight.set(mode, ASSET_MANAGER.getAsset(`./sprites/gunners-right.png`))
      );
      return assetMapRight;
  }

  createGunnerAnimator(mode) {
      if (mode == "walkleft") {
          return new Animator(
              this.assetsMapLeft.get(mode) ?? "walkleft", 5, 4, 41, 48, 3, 0.2, 10, true, mode !== "death");
      } else if (mode == "attackleft") {
          return new Animator(
              this.assetsMapLeft.get(mode) ?? "attackleft", 56, 4, 39, 48, 1, 0.2, 2, true, mode !== "death");
      } else if (mode == "deathleft") {
          return new Animator(
              this.assetsMapLeft.get(mode) ?? "deathleft", 174, 205, 63, 65, 1, 1, 0.1, true, mode == "death");
      } else if (mode == "walkright") {
          return new Animator(
              this.assetsMapRight.get(mode) ?? "walkright", 324, 4, 41, 48, 3, 0.2, 10, true, mode !== "death");
      } else if (mode == "attackright") {
          return new Animator(
              this.assetsMapRight.get(mode) ?? "attackright", 378, 4, 38, 48, 1, 0.2, 2, true, mode !== "death");
      } else if (mode == "deathright") {
          return new Animator(
              this.assetsMapRight.get(mode) ?? "deathright", 232, 205, 63, 65, 1, 1, 0.1, true, mode == "death");
      
      } 
      

  }
  updateBoundingBox() {
    if (this.currentMode == "attackleft" || this.currentMode == "attackright") {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(
        this.x,
        this.y,
        2 * PARAMS.BLOCKWIDTH,
        2.4 * PARAMS.BLOCKWIDTH
      );
    } else if (this.currentMode == "walkleft" || this.currentMode == "walkright") {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(
      this.x,
      this.y,
      2.2 * PARAMS.BLOCKWIDTH,
      2.4 * PARAMS.BLOCKWIDTH
    );

    } 
  }
  isWalking() {
    return (this.currentMode === "walkleft" || this.currentMode === "walkright");
  }

  isAttacking() {
    return (this.currentMode === "attackleft" || this.currentMode === "attackright");
  }

  isDead() {
    return (this.currentMode === "deathleft" || this.currentMode === "deathright");
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
          if (this.attackCounter > 0.5 && this.isFacingLeft) {
              const bulletX = this.x + (1 ? -80 : 70);
              const bulletY = this.y + 30;
              this.game.addEntity(new SprayTwo(this.game, bulletX, bulletY, 1));
              this.attackCounter = 0.0;
          } else if (this.attackCounter > 0.5 && !this.isFacingLeft) {
              const bulletX = this.x + (0 ? -80 : 70);
              const bulletY = this.y + 30;
              this.game.addEntity(new SprayTwo(this.game, bulletX, bulletY, 0));
              this.attackCounter = 0.0;
          }
          if (this.attackCounter > 1.6) {
              if(this.isFacingLeft) {
                  this.currentMode = "walkleft";
                  this.attackCounter = 0.0;
                  
              }else {
                  this.currentMode = "walkright";
                  this.attackCounter = 0.0;
              }

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
          if(this.isFacingLeft) {
              this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
          } else {
              this.x += this.game.clockTick * (-this.velocity.x) * PARAMS.SCALE;

          }
          this.updateBoundingBox();
          const that = this;
          
          this.game.entities.forEach(function (entity) {
          if (entity instanceof Sant && entity.y > that.y - 50) {
              if(entity.x < that.x) {
                  that.currentMode = "attackleft";
                  that.isFacingLeft = true;
              } else {
                  that.currentMode = "attackright";
                  that.isFacingLeft = false;
              }
          } else if (entity instanceof Sant && entity.y < that.y) {
              if(that.isFacingLeft) {
                  that.currentMode = "walkleft";
              } else {
                  that.currentMode = "walkright";
              }
          }
          if (entity.BB && that.BB.collide(entity.BB)) {
            if (entity instanceof BlockLevelOne || (entity instanceof Block && that.BB.bottom > entity.BB.top)
            ) {
              if (that.BB.collide(entity.leftBB)) {
                that.currentMode = "walkleft";
                that.isFacingLeft = true;
              } else {
                that.currenMode = "walkright";
                that.isFacingLeft = false;
              }
            }
              if(entity instanceof Bullet || entity instanceof Spray || 
                entity instanceof MultileFire || entity instanceof Fireball) {
              if(that.health > 0) {
                  that.health -= entity.power;
                  entity.removeFromWorld = true;
                  if (that.health <= 0) {
                      if(that.isFacingLeft) {
                          that.currentMode = "deathleft";
                      } else {
                          that.currentMode = "deathright";
                      }
                  }
              } 
              } else if (entity instanceof Sant) {
              that.currentMode = "attackleft";
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
      2.4
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
