class Fireball {
  constructor(game, x, y, isFacingLeft) {
    Object.assign(this, { game, x, y });

    this.spritesheets = [
      ASSET_MANAGER.getAsset("./sprites/sant/sant-left.png"),
      ASSET_MANAGER.getAsset("./sprites/sant/sant-right.png"),
    ];

    this.width = 8;
    this.height = 2;
    this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    this.velocity = 8;
    this.isFacingLeft = isFacingLeft;
    this.animations = [
      this.createNewFireballAnimator(0, 104, 204),
      this.createNewFireballAnimator(1, 218, 204),
    ]
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
    this.x += this.velocity * (this.isFacingLeft ? -1 : 1);
    this.updateBoundingBox();
    const that = this;
    this.game.entities.forEach(function (entity) {
      if (entity.BB && that.BB.collide(entity.BB)) {
        if(entity instanceof Skeleton || entity instanceof Zombie
          || entity instanceof FlyingEye || entity instanceof Terrorists) {
            if(entity.currentMode == "death") {
              that.removeFromWorld = true;

            }
        }
      }
    });
      
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
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }
  }
}




class Bullet {
  constructor(game, x, y, isFacingLeft) {
    Object.assign(this, { game, x, y });

    this.spritesheets = [
      ASSET_MANAGER.getAsset("./sprites/sant/sant-left.png"),
      ASSET_MANAGER.getAsset("./sprites/sant/sant-right.png"),
    ];

    this.width = 8;
    this.height = 2;
    this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    this.velocity = 8;
    this.isFacingLeft = isFacingLeft;
    this.animations = [
      this.createBulletAnimator(0, 180, 204),
      this.createBulletAnimator(1, 293, 204),
    ]
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
      ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }
  }
}
