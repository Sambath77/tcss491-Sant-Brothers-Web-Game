class Fireball {
  constructor(game, x, y, isFacingLeft) {
    Object.assign(this, { game, x, y });

    this.spritesheets = [
      ASSET_MANAGER.getAsset("./sprites/sant/sant-right.png"),
      ASSET_MANAGER.getAsset("./sprites/sant/sant-left.png"),
    ];

    this.width = 8;
    this.height = 2;
    this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    this.velocity = 8;
    this.isFacingLeft = isFacingLeft;
    this.animations = [
      this.createNewFireballAnimator(1, 158, 142),
      this.createNewFireballAnimator(0, 158, 142),
    ]
  }

  createNewFireballAnimator(facingDirection, xStart, yStart) {
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
