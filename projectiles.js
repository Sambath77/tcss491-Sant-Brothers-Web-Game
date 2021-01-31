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
