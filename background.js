class WallLevelTwo {
  constructor(game, x, y, z) {
    Object.assign(this, { game, x, y, z });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/place.png');
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      527,
      341,
      479,
      322,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH * this.z,
      this.y - 280,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH * 25
    );
  }
}

class WallLevelOne {
  constructor(game, x, y, z) {
    Object.assign(this, { game, x, y, z });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/place.png');
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      24,
      316,
      480,
      356,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH * this.z,
      this.y - 280,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH * 25
    );
  }
}

class WallLevelThree {
  constructor(game, x, y, z) {
    Object.assign(this, { game, x, y, z });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/new_background.png');
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      5,
      564,
      320,
      142,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH * this.z,
      this.y - 280,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH * 25
    );
  }
}

class WallLevelFourth {
  constructor(game, x, y, z) {
    Object.assign(this, { game, x, y, z });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/new_background.png');
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      331,
      564,
      479,
      142,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH * this.z,
      this.y - 280,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH * 25
    );
  }
}

class WallLevelFifth {
  constructor(game, x, y, z) {
    Object.assign(this, { game, x, y, z });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/new_background.png');
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      814,
      564,
      320,
      142,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH * this.z,
      this.y - 280,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH * 25
    );
  }
}

class WallLevelSix {
  constructor(game, x, y, z) {
    Object.assign(this, { game, x, y, z });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/my_wall.png');
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      641,
      723,
      637,
      239,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH * this.z,
      this.y - 280,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH * 25
    );
  }
}

class WallLevelSeventh {
  constructor(game, x, y, z) {
    Object.assign(this, { game, x, y, z });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/my_wall.png');
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      1,
      964,
      637,
      235,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH * this.z,
      this.y - 280,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH * 25
    );
  }
}

class WallLevelEight {
  constructor(game, x, y, z) {
    Object.assign(this, { game, x, y, z });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/my_wall.png');
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      641,
      1,
      637,
      235,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH * this.z,
      this.y - 280,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH * 25
    );
  }
}

class WallLevelNine {
  constructor(game, x, y, z) {
    Object.assign(this, { game, x, y, z });

    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/my_wall.png');
  }

  update() {}

  drawMinimap(ctx, mmX, mmY) {}

  draw(ctx) {
    ctx.drawImage(
      this.spritesheet,
      1,
      722,
      637,
      235,
      this.x - this.game.camera.x + PARAMS.BLOCKWIDTH * this.z,
      this.y - 280,
      PARAMS.BLOCKWIDTH * 25,
      PARAMS.BLOCKWIDTH * 25
    );
  }
}

class Wall {
  constructor(game, x, y, z, number) {
    Object.assign(this, { game, x, y, z, number });

    this.wall = [
      new WallLevelSix(game, x, y, z),
      new WallLevelSeventh(game, x, y, z),
      new WallLevelEight(game, x, y, z),
      new WallLevelNine(game, x, y, z),
      new WallLevelSix(game, x, y, z),
      new WallLevelSeventh(game, x, y, z),
      new WallLevelEight(game, x, y, z),
      new WallLevelNine(game, x, y, z),
    ];
  }

  getWall(number) {
    return this.wall[number];
  }
}
