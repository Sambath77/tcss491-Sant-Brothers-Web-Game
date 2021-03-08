class Fireball {
  constructor(game, x, y, isFacingLeft) {
    Object.assign(this, { game, x, y, isFacingLeft });

    this.spritesheets = [
      ASSET_MANAGER.getAsset('./sprites/sant/sant-left.png'),
      ASSET_MANAGER.getAsset('./sprites/sant/sant-right.png'),
    ];
    //ASSET_MANAGER.playAsset("./soundEffect/fireball.mp3");
    this.initialX = x;
    this.paused = false;
    this.power = 2;
    this.width = 8;
    this.height = 2;
    this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    this.velocity = 8;
    this.isFacingLeft = isFacingLeft;
    this.animations = [
      this.createNewFireballAnimator(0, 104, 204),
      this.createNewFireballAnimator(1, 218, 204),
    ];

    this.updateBoundingBox();
  }

  createNewFireballAnimator(facingDirection, xStart, yStart) {
    return new Animator(
      this.spritesheets[facingDirection],
      xStart,
      yStart,
      16,
      8,
      1,
      0.2,
      0,
      facingDirection === 1,
      true
    );
  }

  update() {
    if (this.x > this.initialX + 500) {
      this.removeFromWorld = true;
      this.updateBoundingBox();
    } else {
      this.x += this.velocity * (this.isFacingLeft ? -1 : 1);
      this.updateBoundingBox();
      const that = this;
      this.game.entities.forEach(function (entity) {});
    }
    if (!this.paused) {
      this.updateBoundingBox();
      const that = this;
      this.game.entities.forEach(function (entity) {
        if (entity.BB && that.BB.collide(entity.BB)) {
          if (
            entity instanceof BlockLevelOne ||
            entity instanceof Block ||
            entity instanceof Brick ||
            entity instanceof BrickLevelOne ||
            entity instanceof Brickmoved
          ) {
            that.removeFromWorld = true;
          }
        }
      });
    }
  }
  updateBoundingBox() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      1 * PARAMS.BLOCKWIDTH,
      0.5 * PARAMS.BLOCKWIDTH
    );
  }

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    this.animations[this.isFacingLeft].drawFrame(
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

class Bullet {
  constructor(game, x, y, isFacingLeft) {
    Object.assign(this, { game, x, y, isFacingLeft });

    this.spritesheets = [
      ASSET_MANAGER.getAsset('./sprites/sant/sant-left.png'),
      ASSET_MANAGER.getAsset('./sprites/sant/sant-right.png'),
    ];
    //ASSET_MANAGER.playAsset("./soundEffect/bullet.mp3");
    this.initialX = x;
    this.power = 1;
    this.width = 8;
    this.height = 2;
    this.paused = false;
    this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    this.velocity = 8;
    this.isFacingLeft = isFacingLeft;
    this.animations = [
      this.createBulletAnimator(0, 37, 204),
      this.createBulletAnimator(1, 293, 204),
    ];
  }

  createBulletAnimator(facingDirection, xStart, yStart) {
    return new Animator(
      this.spritesheets[facingDirection],
      xStart,
      yStart,
      8,
      8,
      1,
      0.2,
      0,
      facingDirection === 1,
      true
    );
  }

  update() {
    this.x += this.velocity * (this.isFacingLeft ? -1 : 1);
    this.updateBoundingBox();
    if (this.x < this.initialX - 500) {
      this.removeFromWorld = true;
      this.updateBoundingBox();
    } else if (this.x > this.initialX + 500) {
      this.removeFromWorld = true;
      this.updateBoundingBox();
    }
    if (!this.paused) {
      this.updateBoundingBox();
      const that = this;
      this.game.entities.forEach(function (entity) {
        if (entity.BB && that.BB.collide(entity.BB)) {
          if (
            entity instanceof BlockLevelOne ||
            entity instanceof Block ||
            entity instanceof Brick ||
            entity instanceof BrickLevelOne ||
            entity instanceof Brickmoved
          ) {
            that.removeFromWorld = true;
          }
        }
      });
    }
  }

  updateBoundingBox() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      0.5 * PARAMS.BLOCKWIDTH,
      0.5 * PARAMS.BLOCKWIDTH
    );
  }

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    this.animations[this.isFacingLeft].drawFrame(
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

class MultileFire {
  constructor(game, x, y, isFacingLeft) {
    Object.assign(this, { game, x, y, isFacingLeft });

    this.spritesheets = [
      ASSET_MANAGER.getAsset('./sprites/sant/fire_left.png'),
      ASSET_MANAGER.getAsset('./sprites/sant/fire_right.png'),
    ];
    //ASSET_MANAGER.playAsset("./soundEffect/multi.mp3");
    this.initialX = x;
    this.power = 4;
    this.width = 8;
    this.height = 2;
    this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    this.velocity = 8;
    this.isFacingLeft = isFacingLeft;
    this.animations = [
      this.createMultileFireAnimator(0, 228, 684),
      this.createMultileFireAnimator(1, 6, 684),
    ];
  }

  createMultileFireAnimator(facingDirection, xStart, yStart) {
    return new Animator(
      this.spritesheets[facingDirection],
      xStart,
      yStart,
      23,
      4,
      1,
      1,
      3,
      facingDirection === 1,
      true
    );
  }

  update() {
    this.x += this.velocity * (this.isFacingLeft ? -1 : 1);
    this.updateBoundingBox();
    if (this.x < this.initialX - 500) {
      this.removeFromWorld = true;
      this.updateBoundingBox();
    } else if (this.x > this.initialX + 500) {
      this.removeFromWorld = true;
      this.updateBoundingBox();
    }
    if (!this.paused) {
      this.updateBoundingBox();
      const that = this;
      this.game.entities.forEach(function (entity) {
        if (entity.BB && that.BB.collide(entity.BB)) {
          if (
            entity instanceof BlockLevelOne ||
            entity instanceof Block ||
            entity instanceof Brick ||
            entity instanceof BrickLevelOne ||
            entity instanceof Brickmoved
          ) {
            that.removeFromWorld = true;
          }
        }
      });
    }
  }
  updateBoundingBox() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      2.7 * PARAMS.BLOCKWIDTH,
      0.47 * PARAMS.BLOCKWIDTH
    );
  }

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    this.animations[this.isFacingLeft].drawFrame(
      this.game.clockTick,
      ctx,
      this.x - this.game.camera.x,
      this.y,
      PARAMS.SCALE * 2
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

class Spray {
  constructor(game, x, y, isFacingLeft) {
    Object.assign(this, { game, x, y, isFacingLeft });

    this.spritesheets = [
      ASSET_MANAGER.getAsset('./sprites/sant/spray_left.png'),
      ASSET_MANAGER.getAsset('./sprites/sant/spray_right.png'),
    ];
    //ASSET_MANAGER.playAsset("./soundEffect/laser.mp3");
    this.initialX = x;
    this.power = 5;
    this.width = 8;
    this.height = 2;
    this.paused = false;
    this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    this.velocity = 8;
    this.isFacingLeft = isFacingLeft;
    this.animations = [
      this.createSprayAnimator(0, 90, 211),
      this.createSprayAnimator(1, 214, 211),
    ];
  }

  createSprayAnimator(facingDirection, xStart, yStart) {
    return new Animator(
      this.spritesheets[facingDirection],
      xStart,
      yStart,
      31,
      5,
      1,
      1,
      0,
      facingDirection === 1,
      true
    );
  }

  update() {
    this.x += this.velocity * (this.isFacingLeft ? -1 : 1);
    this.updateBoundingBox();
    if (this.x < this.initialX - 500) {
      this.removeFromWorld = true;
      this.updateBoundingBox();
    } else if (this.x > this.initialX + 500) {
      this.removeFromWorld = true;
      this.updateBoundingBox();
    }
    if (!this.paused) {
      this.updateBoundingBox();
      const that = this;
      this.game.entities.forEach(function (entity) {
        if (entity.BB && that.BB.collide(entity.BB)) {
          if (
            entity instanceof BlockLevelOne ||
            entity instanceof Block ||
            entity instanceof Brick ||
            entity instanceof BrickLevelOne ||
            entity instanceof Brickmoved
          ) {
            that.removeFromWorld = true;
          }
        }
      });
    }
  }
  updateBoundingBox() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      2 * PARAMS.BLOCKWIDTH,
      0.3 * PARAMS.BLOCKWIDTH
    );
  }

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    this.animations[this.isFacingLeft].drawFrame(
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

class BulletTwo {
  constructor(game, x, y, isFacingLeft) {
    Object.assign(this, { game, x, y, isFacingLeft });

    this.spritesheets = [
      ASSET_MANAGER.getAsset('./sprites/sant/sant-left.png'),
      ASSET_MANAGER.getAsset('./sprites/sant/sant-right.png'),
    ];
    this.initialX = x;
    this.width = 8;
    this.height = 2;
    this.paused = false;
    this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    this.velocity = 8;
    this.isFacingLeft = isFacingLeft;
    this.animations = [
      this.createBulletTwoAnimator(0, 37, 204),
      this.createBulletTwoAnimator(1, 293, 204),
    ];
  }

  createBulletTwoAnimator(facingDirection, xStart, yStart) {
    return new Animator(
      this.spritesheets[facingDirection],
      xStart,
      yStart,
      8,
      8,
      1,
      0.2,
      0,
      facingDirection === 1,
      true
    );
  }

  update() {
    this.x += this.velocity * (this.isFacingLeft ? -1 : 1);
    this.updateBoundingBox();
    if (this.x < this.initialX - 500) {
      this.removeFromWorld = true;
      this.updateBoundingBox();
    } else if (this.x > this.initialX + 500) {
      this.removeFromWorld = true;
      this.updateBoundingBox();
    }
    if (!this.paused) {
      this.updateBoundingBox();
      const that = this;
      this.game.entities.forEach(function (entity) {
        if (entity.BB && that.BB.collide(entity.BB)) {
          if (
            entity instanceof BlockLevelOne ||
            entity instanceof Block ||
            entity instanceof Brick ||
            entity instanceof BrickLevelOne ||
            entity instanceof Brickmoved
          ) {
            that.removeFromWorld = true;
          }
        }
      });
    }
 
    this.updateBoundingBox();
  }

  updateBoundingBox() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      0.5 * PARAMS.BLOCKWIDTH,
      0.5 * PARAMS.BLOCKWIDTH
    );
  }

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    this.animations[this.isFacingLeft].drawFrame(
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

class SprayTwo {
  constructor(game, x, y, isFacingLeft) {
    Object.assign(this, { game, x, y, isFacingLeft });

    this.spritesheets = [
      ASSET_MANAGER.getAsset('./sprites/sant/spray_left.png'),
      ASSET_MANAGER.getAsset('./sprites/sant/spray_right.png'),
    ];
    
    this.initialX = x;
    this.power = 5;
    this.width = 8;
    this.height = 2;
    this.paused = false;
    this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    this.velocity = 8;
    this.isFacingLeft = isFacingLeft;
    this.animations = [
      this.createSprayAnimator(0, 90, 211),
      this.createSprayAnimator(1, 214, 211),
    ];
  }

  createSprayAnimator(facingDirection, xStart, yStart) {
    return new Animator(
      this.spritesheets[facingDirection],
      xStart,
      yStart,
      31,
      5,
      1,
      1,
      0,
      facingDirection === 1,
      true
    );
  }

  update() {
    this.x += this.velocity * (this.isFacingLeft ? -1 : 1);
    this.updateBoundingBox();
    if (this.x < this.initialX - 500) {
      this.removeFromWorld = true;
      this.updateBoundingBox();
    } else if (this.x > this.initialX + 500) {
      this.removeFromWorld = true;
      this.updateBoundingBox();
    }
    if (!this.paused) {
      this.updateBoundingBox();
      const that = this;
      this.game.entities.forEach(function (entity) {
        if (entity.BB && that.BB.collide(entity.BB)) {
          if (
            entity instanceof BlockLevelOne ||
            entity instanceof Block ||
            entity instanceof Brick ||
            entity instanceof BrickLevelOne ||
            entity instanceof Brickmoved
          ) {
            that.removeFromWorld = true;
          }
        }
      });
    }
  }
  updateBoundingBox() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      2 * PARAMS.BLOCKWIDTH,
      0.3 * PARAMS.BLOCKWIDTH
    );
  }

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    this.animations[this.isFacingLeft].drawFrame(
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

class Weapon {
  constructor(game, x, y, isFacingLeft, number = 0) {
    Object.assign(this, { game, x, y, isFacingLeft, number });

    this.gun = [
      new Bullet(game, x, y, isFacingLeft),
      new Fireball(game, x, y, isFacingLeft),
      new MultileFire(game, x, y, isFacingLeft),
      new Spray(game, x, y, isFacingLeft),
    ];
  }
  seletedGun(number) {
    if(number === 0) {
      ASSET_MANAGER.playAsset("./soundEffect/bullet.mp3");
    }
    else if(number === 1){
      ASSET_MANAGER.playAsset("./soundEffect/fireball.mp3");
    }
    else if(number === 2){
      ASSET_MANAGER.playAsset("./soundEffect/multi.mp3");
    }
    else{
      ASSET_MANAGER.playAsset("./soundEffect/laser.mp3");
    }
    return this.gun[number];
  }
}
