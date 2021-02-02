class Ground {
  constructor(game, x, y, w) {
    Object.assign(this, { game, x, y, w });

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/block3.png");

    this.BB = new BoundingBox(this.x, this.y, this.w, PARAMS.BLOCKWIDTH * 2);
    this.leftBB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 2
    );
    this.rightBB = new BoundingBox(
      this.x + this.w + PARAMS.BLOCKWIDTH * PARAMS.BLOCKWIDTH,
      this.y,
      PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 2
    );
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = "Brown";
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      this.w / PARAMS.BITWIDTH,
      PARAMS.SCALE * 2
    );
  }
  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      1,
      1,
      430,
      14,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH * this.w,
      this.y,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH
    );

    ctx.drawImage(
      this.spritesheet,
      1,
      1,
      430,
      14,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH * this.w,
      this.y + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH
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

class Angel {
  constructor(game, x, y, w) {
    Object.assign(this, { game, x, y, w });

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/panda.png");

    this.BB = new BoundingBox(
      this.x,
      this.y + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 4
    );
    this.leftBB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 2
    );
    this.rightBB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y,
      PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 2
    );
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = "Brown";
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      this.w / PARAMS.BITWIDTH,
      PARAMS.SCALE * 2
    );
  }

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      160,
      36,
      44,
      49,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH * this.w,
      this.y + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 3,
      PARAMS.BLOCKWIDTH * 3
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

class Brick {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/block3.png");

    this.BB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y,
      PARAMS.BLOCKWIDTH * 3,
      PARAMS.BLOCKWIDTH / 2
    );
    this.leftBB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH * 2,
      this.y,
      PARAMS.BLOCKWIDTH * 2,
      PARAMS.BLOCKWIDTH / 2
    );
    this.rightBB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH * 2,
      this.y,
      PARAMS.BLOCKWIDTH * 2,
      PARAMS.BLOCKWIDTH / 2
    );
    this.topBB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y,
      PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH / 2
    );
    this.bottomBB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH / 2
    );
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = "Brown";
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      this.w / PARAMS.BITWIDTH,
      PARAMS.SCALE
    );
  }

  draw(ctx) {
    if (this.x === 0) {
      ctx.drawImage(
        this.spritesheet,
        1,
        75,
        90,
        13,
        2 * PARAMS.BLOCKWIDTH - this.game.camera.x,
        this.y,
        PARAMS.BLOCKWIDTH * 4,
        PARAMS.BLOCKWIDTH
      );
    } else {
      ctx.drawImage(
        this.spritesheet,
        1,
        75,
        90,
        13,
        this.x + PARAMS.BLOCKWIDTH - this.game.camera.x,
        this.y,
        PARAMS.BLOCKWIDTH * 4,
        PARAMS.BLOCKWIDTH
      );
    }
  }
}

class Block {
  constructor(game, x, y, w) {
    Object.assign(this, { game, x, y, w });

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/block4.png");

    this.BB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y,
      this.w + PARAMS.BLOCKWIDTH * 3,
      PARAMS.BLOCKWIDTH
    );
    this.leftBB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y,
      this.w + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH
    );
    this.rightBB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y,
      this.w + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH
    );
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = "Brown";
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      this.w / PARAMS.BITWIDTH,
      PARAMS.SCALE
    );
  }

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      42,
      805,
      27,
      28,
      this.x + PARAMS.BLOCKWIDTH - this.game.camera.x,
      this.y,
      PARAMS.BLOCKWIDTH * 4,
      PARAMS.BLOCKWIDTH * 3
    );
  }
}
