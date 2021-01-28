class Wall {
  constructor(game, x, y, z) {
    Object.assign(this, { game, x, y, z });

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/place.png");
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
