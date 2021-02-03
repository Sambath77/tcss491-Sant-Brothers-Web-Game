class Fireball {
  constructor(game, x, y, isFacingLeft) {
    Object.assign(this, { game, x, y, isFacingLeft });

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
    ];
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
  }
}

class Bullet {
  constructor(game, x, y, isFacingLeft) {
    Object.assign(this, { game, x, y, isFacingLeft });

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
  }
}

class MultileFire {
  constructor(game, x, y, isFacingLeft) {
    Object.assign(this, { game, x, y, isFacingLeft });

    this.spritesheets = [
      ASSET_MANAGER.getAsset("./sprites/sant/fire_left.png"),
      ASSET_MANAGER.getAsset("./sprites/sant/fire_right.png"),
    ];

    this.width = 8;
    this.height = 2;
    this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    this.velocity = 8;
    this.isFacingLeft = isFacingLeft;
    this.animations = [
      this.createBulletAnimator(0, 228, 684),
      this.createBulletAnimator(1, 6, 684),
    ];
  }

  createBulletAnimator(facingDirection, xStart, yStart) {
    return new Animator(
      this.spritesheets[facingDirection],
      xStart,
      yStart,
      22,
      3,
      1,
      1,
      3,
      facingDirection === 1,
      true
    );
  }

  update() {
    this.x += this.velocity * (this.isFacingLeft ? -1 : 1);
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
  }
}

class Spray {
  constructor(game, x, y, isFacingLeft) {
    Object.assign(this, { game, x, y, isFacingLeft });

    this.spritesheets = [
      ASSET_MANAGER.getAsset("./sprites/sant/spray_right.png"),
      ASSET_MANAGER.getAsset("./sprites/sant/spray_left.png"),
    ];

    this.width = 8;
    this.height = 2;
    this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    this.velocity = 8;
    this.isFacingLeft = isFacingLeft;
    this.animations = [
      this.createBulletAnimator(0, 90, 211),
      this.createBulletAnimator(1, 214, 211),
    ];
  }

  createBulletAnimator(facingDirection, xStart, yStart) {
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
  }
}

class Weapon {
  constructor(game, x, y, isFacingLeft, number = 0) {
    Object.assign(this, { game, x, y, isFacingLeft, number });

    this.gun = [
      new Fireball(game, x, y, isFacingLeft),
      new Bullet(game, x, y, isFacingLeft),
      new MultileFire(game, x, y, isFacingLeft),
      new Spray(game, x, y, isFacingLeft),
    ];
  }
  seletedGun(number) {
    return this.gun[number];
  }
}
