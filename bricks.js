class Ground {
  constructor(game, x, y, w) {
    Object.assign(this, { game, x, y, w });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/block3.png');

    this.BB = new BoundingBox(
      this.x,
      this.y,
      this.w * 25 * PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 2
    );
    this.leftBB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH * 2
    );
    this.rightBB = new BoundingBox(
      this.x + this.w + PARAMS.BLOCKWIDTH * 25,
      this.y,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH * 2
    );
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = 'Brown';
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

class GroundLevelOne {
  constructor(game, x, y, w) {
    Object.assign(this, { game, x, y, w });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/block3.png');

    this.BB = new BoundingBox(
      this.x,
      this.y,
      this.w * 25 * PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 2
    );
    this.leftBB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH * 2
    );
    this.rightBB = new BoundingBox(
      this.x + this.w + PARAMS.BLOCKWIDTH * 25,
      this.y,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH * 2
    );
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = 'Brown';
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
      107,
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
      107,
      430,
      14,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH * this.w,
      this.y + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH
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

class Panda {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/panda.png');

    this.BB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 3,
      PARAMS.BLOCKWIDTH * 3
    );
    this.leftBB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 2
    );
    this.rightBB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH / 2,
      PARAMS.BLOCKWIDTH * 2
    );
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = 'Brown';
    ctx.fillRect(
      mmX + this.x + PARAMS.BLOCKWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      PARAMS.BITWIDTH,
      PARAMS.SCALE
    );
  }

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      160,
      36,
      44,
      49,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH,
      this.y + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 3,
      PARAMS.BLOCKWIDTH * 3
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

class Angel {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/angel.png');

    this.BB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 3,
      PARAMS.BLOCKWIDTH * 3
    );
    this.leftBB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 2
    );
    this.rightBB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH / 2,
      PARAMS.BLOCKWIDTH * 2
    );
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = 'Brown';
    ctx.fillRect(
      mmX + this.x + PARAMS.BLOCKWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      PARAMS.BITWIDTH,
      PARAMS.SCALE
    );
  }

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      509,
      3,
      100,
      155,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH,
      this.y + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH * 3,
      PARAMS.BLOCKWIDTH * 3
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

class Brick {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/block3.png');

    this.BB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y,
      PARAMS.BLOCKWIDTH * 4,
      PARAMS.BLOCKWIDTH
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
    ctx.fillStyle = 'Brown';
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      PARAMS.BITWIDTH,
      PARAMS.SCALE
    );
  }

  draw(ctx) {
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
class BrickLevelOne {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/block3.png');

    this.BB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y,
      PARAMS.BLOCKWIDTH * 4,
      PARAMS.BLOCKWIDTH
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
    ctx.fillStyle = 'Brown';
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      PARAMS.BITWIDTH,
      PARAMS.SCALE
    );
  }

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      92,
      90,
      90,
      13,
      this.x + PARAMS.BLOCKWIDTH - this.game.camera.x,
      this.y,
      PARAMS.BLOCKWIDTH * 4,
      PARAMS.BLOCKWIDTH
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
class Block {
  constructor(game, x, y, w) {
    Object.assign(this, { game, x, y, w });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/block4.png');

    this.BB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y,
      this.w + PARAMS.BLOCKWIDTH * 3,
      PARAMS.BLOCKWIDTH * 3
    );
    this.leftBB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y,
      this.w + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH
    );
    this.rightBB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH * 3,
      this.y + PARAMS.BLOCKWIDTH * 3,
      this.w + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH
    );
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = 'Brown';
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      PARAMS.BITWIDTH,
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

class BlockLevelOne {
  constructor(game, x, y, w) {
    Object.assign(this, { game, x, y, w });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/block4.png');

    this.BB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y,
      this.w + PARAMS.BLOCKWIDTH * 3,
      PARAMS.BLOCKWIDTH * 3
    );
    this.leftBB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH,
      this.y,
      this.w + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH
    );
    this.rightBB = new BoundingBox(
      this.x + PARAMS.BLOCKWIDTH * 3,
      this.y + PARAMS.BLOCKWIDTH * 3,
      this.w + PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKWIDTH
    );
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = 'Brown';
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      PARAMS.BITWIDTH,
      PARAMS.SCALE
    );
  }

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      731,
      51,
      31,
      46,
      this.x + PARAMS.BLOCKWIDTH - this.game.camera.x,
      this.y,
      PARAMS.BLOCKWIDTH * 4,
      PARAMS.BLOCKWIDTH * 3
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

class Brickmoved {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.velocity = { x: PARAMS.BITWIDTH, y: 0 }; // pixels per second
    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/block3.png');
    this.animation = new Animator(
      this.spritesheet,
      2,
      38,
      90,
      13,
      1,
      0.5,
      30,
      true,
      true
    );
    this.paused = false;
    this.time = 0;
    this.updateBB();
  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH * 5.6,
      PARAMS.BLOCKWIDTH / 1.2
    );
  }

  update() {
    if (!this.paused) {
      if (this.x > this.time) {
        this.velocity = { x: -PARAMS.BITWIDTH, y: 0 };
      } else if (this.x < 5) {
        this.velocity = { x: PARAMS.BITWIDTH, y: 0 };
      }
      this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
      this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;
      this.updateBB();
    }
  }

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = 'Brown';
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      PARAMS.BITWIDTH,
      PARAMS.SCALE
    );
  }

  draw(ctx) {
    this.animation.drawFrame(
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
