class Sant {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    //this.game.sant = this;

    // spritesheet
    this.animation = [];
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/gunfire.png");

    this.animation[0] = new Animator(
      this.spritesheet,
      18,
      42,
      30,
      49,
      4,
      0.5,
      16,
      true,
      true
    );
    this.animation[1] = new Animator(
      this.spritesheet,
      145,
      122,
      39,
      52,
      3,
      0.5,
      12,
      true,
      true
    );

    this.animation[2] = new Animator(
      this.spritesheet,
      22,
      198,
      37,
      36,
      3,
      0.5,
      25,
      true,
      true
    );
  }

  update() {}

  drawMinimap() {

  }

  draw(ctx) {
    this.animation[0].drawFrame(this.game.clockTick, ctx, 100, 100, 3);
    this.animation[1].drawFrame(this.game.clockTick, ctx, 100, 300, 3);
    this.animation[2].drawFrame(this.game.clockTick, ctx, 100, 500, 3);
  }
}
