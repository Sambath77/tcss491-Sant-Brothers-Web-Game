class Mafia {

  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.velocity = { x: -PARAMS.BITWIDTH, y: 0 }; // pixels per second
    this.animationModes = [
      'walkleft',
      'walkright',
      'attackleft',
      'attackright',
      'deathleft',
      'deathright',
    ];
    this.currentMode = this.animationModes[0];
    this.assetsMapLeft = this.constructAssetMapLeft();
    this.assetsMapRight = this.constructAssetMapRight();
    this.animations = this.animationModes.map((mode) =>
      this.createMafiaAnimator(mode)
    );
    this.health = 70
    this.paused = true;
    this.deadCounter = 0;
    this.attackCounter = 0;
    this.updateBoundingBox();
    this.isFacingLeft = true;
    this.spritesheet = ASSET_MANAGER.getAsset('./sprites/finish.png');
    this.isFirstTimeTriggered = true;
  }

  constructAssetMapLeft() {
    const assetMapLeft = new Map();
    this.animationModes.forEach((mode) =>
      assetMapLeft.set(mode, ASSET_MANAGER.getAsset(`./sprites/boss-left.png`))
    );
    return assetMapLeft;
  }

  constructAssetMapRight() {
    const assetMapRight = new Map();
    this.animationModes.forEach((mode) =>
      assetMapRight.set(
        mode,
        ASSET_MANAGER.getAsset(`./sprites/boss-right.png`)
      )
    );
    return assetMapRight;
  }

  createMafiaAnimator(mode) {
    if (mode == 'walkleft') {
      return new Animator(
        this.assetsMapLeft.get(mode) ?? 'walkleft',
        185,
        158,
        50,
        70,
        4,
        0.1,
        7,
        true,
        mode !== 'death'
      );
    } else if (mode == 'attackleft') {
      return new Animator(
        this.assetsMapLeft.get(mode) ?? 'attackleft',
        158,
        0,
        54,
        71,
        4,
        0.2,
        10,
        true,
        mode !== 'death'
      );
    } else if (mode == 'deathleft') {
      return new Animator(
        this.assetsMapLeft.get(mode) ?? 'deathleft',
        72,
        463,
        74,
        85,
        1,
        1,
        0.1,
        true,
        mode == 'death'
      );
    } else if (mode == 'walkright') {
      return new Animator(
        this.assetsMapRight.get(mode) ?? 'walkright',
        58,
        157,
        48,
        70,
        4,
        0.1,
        9,
        true,
        mode !== 'death'
      );
    } else if (mode == 'attackright') {
      return new Animator(
        this.assetsMapRight.get(mode) ?? 'attackright',
        58,
        0,
        54,
        71,
        4,
        0.2,
        10,
        true,
        mode !== 'death'
      );
    } else if (mode == 'deathright') {
      return new Animator(
        this.assetsMapRight.get(mode) ?? 'deathright',
        316,
        463,
        74,
        85,
        1,
        1,
        0.1,
        true,
        mode == 'death'
      );
    }
  }
  updateBoundingBox() {
    if (this.currentMode == 'attackleft' || this.currentMode == 'attackright') {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(
        this.x,
        this.y,
        2.7 * PARAMS.BLOCKWIDTH,
        3.5 * PARAMS.BLOCKWIDTH
      );
    } else if (
      this.currentMode == 'walkleft' ||
      this.currentMode == 'walkright'
    ) {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(
        this.x,
        this.y,
        2.2 * PARAMS.BLOCKWIDTH,
        3.5 * PARAMS.BLOCKWIDTH
      );
    }
  }
  isWalking() {
    return this.currentMode === 'walkleft' || this.currentMode === 'walkright';
  }

  isAttacking() {
    return (
      this.currentMode === 'attackleft' || this.currentMode === 'attackright'
    );
  }

  isDead() {
    return (
      this.currentMode === 'deathleft' || this.currentMode === 'deathright'
    );
  }

  isInCameraView() {
    return this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH;
  }

  update() {
    if (this.isAttacking()) {
      this.attackCounter += this.game.clockTick;

      // attack counter is for restricting attack speed

      this.velocity.x = 0;
      //console.log(this.attackCounter);
      // attack counter is for restricting attack speed
      if (this.attackCounter > 0.7 && this.isFacingLeft) {
        const bulletX = this.x + (1 ? -48 : 120);
        const bulletY = this.y + 53;
        this.game.addEntity(new BulletTwo(this.game, bulletX, bulletY, 1));
        this.attackCounter = 0.0;
      } else if (this.attackCounter > 0.5 && !this.isFacingLeft) {
        const bulletX = this.x + (0 ? -48 : 120);
        const bulletY = this.y + 53;
        this.game.addEntity(new BulletTwo(this.game, bulletX, bulletY, 0));
        this.attackCounter = 0.0;
      }
      if (this.attackCounter > 1.6) {
        if (this.isFacingLeft) {
          this.currentMode = 'walkleft';
          this.attackCounter = 0.0;
        } else {
          this.currentMode = 'walkright';
          this.attackCounter = 0.0;
        }
      }
    } else {
      this.velocity = { x: -PARAMS.BITWIDTH, y: 0 };
    }
    if (this.isDead()) {
      if (this.deadCounter === 0) {
        this.game.addEntity(new Score(this.game, this.x, this.y, 100));
      }
      this.deadCounter += this.game.clockTick;
      if (this.deadCounter > 0.5) {
        this.removeFromWorld = true;
      }
    }
    if (this.paused && this.isInCameraView()) {
      this.paused = false;
    }

    if (!this.paused && !this.isDead()) {
      if (this.isFacingLeft) {
        this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
      } else {
        this.x += this.game.clockTick * -this.velocity.x * PARAMS.SCALE;
      }
      this.updateBoundingBox();
      const that = this;
      if (that.x <= that.game.mapMaxDistance) {
        that.currentMode = 'walkright';
        that.isFacingLeft = false;
      }
      if (
        that.x >=
        that.game.mapMaxDistance + PARAMS.SCREEN_WIDTH - that.BB.width
      ) {
        that.currentMode = 'walkleft';
        that.isFacingLeft = true;
      }
      this.game.entities.forEach(function (entity) {
        if (entity instanceof Sant && entity.y > that.y) {
          if (entity.x < that.x) {
            that.currentMode = 'attackleft';
            that.isFacingLeft = true;
          } else {
            that.currentMode = 'attackright';
            that.isFacingLeft = false;
          }
        } else if (entity instanceof Sant && entity.y < that.y) {
          if (that.isFacingLeft) {
            that.currentMode = 'walkleft';
          } else {
            that.currentMode = 'walkright';
          }
        }
        if (entity.BB && that.BB.collide(entity.BB)) {
          if (
            entity instanceof Bullet ||
            entity instanceof Spray ||
            entity instanceof MultileFire ||
            entity instanceof Fireball
          ) {
            if (that.health > 0) {
              that.health -= entity.power;
              entity.removeFromWorld = true;
              if (that.health <= 0) {
                if (that.isFacingLeft) {
                  that.currentMode = 'deathleft';
                } else {
                  that.currentMode = 'deathright';
                }
              }
            }
          } else if (entity instanceof Sant) {
            that.currentMode = 'attackleft';
          } else if (
            (entity instanceof Ground ||
              entity instanceof Brick ||
              entity instanceof Block) &&
            that.lastBB.bottom <= entity.BB.top
          ) {
            that.y = entity.BB.top - PARAMS.BLOCKWIDTH;
            that.updateBoundingBox();
          } else if (entity !== that) {
            that.velocity.x = -that.velocity.x;
          }
        }
      });
    }
  }

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = 'Tan';
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      PARAMS.SCALE,
      PARAMS.SCALE
    );
  }

  draw(ctx) {
    this.animations[this.animationModes.indexOf(this.currentMode)].drawFrame(
      this.game.clockTick,
      ctx,
      this.x - this.game.camera.x,
      this.y,
      2.4
    );
    if (
      (this.currentMode == 'deathright' || this.currentMode == 'deathleft') &&
      this.isFirstTimeTriggered
    ) {
      this.game.addEntity(new Finish(this.game));
      this.game.isMagazine = false;
      this.game.isBulletCapacityVisible = false;
      var that = this;
      this.isFirstTimeTriggered = false;
      setTimeout(function () {
        that.game.camera.loadWinningPage();
      }, 3000);
    }
    var object1 = {
      x: 60,
      y: 170,
      width: 400,
      height: 20,
    };
    ctx.fillStyle = 'white';
    if (this.game.isFightingBoss) {

      ctx.fillText("Boss's health: ", 60, 150);
      var maxHealth = 70;
      var percent = this.health / maxHealth;
      if (percent >= 0.7) {
        ctx.fillStyle = 'green';
      } else if (percent < 0.7 && percent >= 0.4) {
        ctx.fillStyle = 'yellow';
      } else {
        ctx.fillStyle = 'red';
      }
      ctx.strokeStyle = 'grey';
      ctx.strokeRect(object1.x, object1.y, object1.width, object1.height);
      ctx.fillRect(
        object1.x,
        object1.y,
        object1.width * percent,
        object1.height
      );

        ctx.fillText(
            "Boss's health: ",
            60,
            150
        );
        var maxHealth = 70
        var percent = this.health / maxHealth;
        if(percent >= 0.7) {
            ctx.fillStyle = "green";
        } else if (percent < 0.7 && percent >= 0.4) {
            ctx.fillStyle = "yellow";
        } else  {
            ctx.fillStyle = "red";
        }
        ctx.strokeStyle = "grey";
        ctx.strokeRect(object1.x, object1.y, object1.width, object1.height);
        ctx.fillRect(object1.x, object1.y, object1.width * percent, object1.height);

    }

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
