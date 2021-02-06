class Sant {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });

    this.game.mario = this;

    // spritesheets
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/sant.png");
    this.spritesheets = [
      ASSET_MANAGER.getAsset("./sprites/sant/sant-right.png"),
      ASSET_MANAGER.getAsset("./sprites/sant/sant-left.png"),
    ];
    // if (luigi) this.spritesheets = ASSET_MANAGER.getAsset("./sprites/luigi.png");

    // sant's state variables
    this.size = 0; // 0 = little, 1 = big, 2 = super, 3 = little invincible, 4 = big invincible, 5 = super invincible
    this.isFacingLeft = 0; // 0 = right, 1 = left
    this.state = 0; // 0 = walking, 1 = walking, 2 = walking, 3 = attacking, 4 = jumping/falling, 5 = ducking
    this.dead = false;

    this.velocity = { x: 0, y: 0 };
    this.fallAcc = 562.5;

    this.hurtCounter = 0;
    this.isEnabledHurtCooldown = false;
    this.hurtCooldownCounter = 0;

    this.attackCounter = 0;

    this.changeGun = false;
    this.health = 5;

    // sant's animations
    this.animations = [];
    this.random = 0;
    //this.weapon = WEAPON.selectedGun(0);

    // this.gun = [
    //   new Bullet(this.game, this.x, this.y, this.isFacingLeft),
    //   new Fireball(this.game, this.x, this.y, this.isFacingLeft),
    //   new MultileFire(this.game, this.x, this.y, this.isFacingLeft),
    //   new Spray(this.game, this.x, this.y, this.isFacingLeft),
    // ];
    this.loadAnimations();
    this.updateBB();
  }

  getHealth() {
    return this.health;
  }

  loadAnimations() {
    for (let i = 0; i < 8; i++) {
      // six states
      this.animations.push([]);
      for (let j = 0; j < 3; j++) {
        // three sizes (star-power not implemented yet)
        this.animations[i].push([]);
        for (let k = 0; k < 2; k++) {
          // two directions
          this.animations[i][j].push([]);
        }
      }
    }
    for (let i = 0; i < 3; i++) {
      this.loadIdleAnimation(i);
      this.loadWalkAnimation(i);
      this.loadRunAnimation(i);
      this.loadSkidAnimation(i);
      this.loadJumpAnimation(i);
      this.loadDuckAnimation(i);
      this.loadAttackAnimation(i);
      this.loadHurtAnimation(i);
    }
    this.deadAnim = [
      this.createNewSantAnimator({
        facingDirection: 0,
        xStart: 158,
        yStart: 268,
        frameCount: 1,
        width: 58,
      }),
      this.createNewSantAnimator({
        facingDirection: 1,
        xStart: 122,
        yStart: 268,
        frameCount: 1,
        width: 58,
      }),
    ];
  }

  loadIdleAnimation(i) {
    this.animations[0][i][0] = this.createNewSantAnimator({
      facingDirection: 0,
      xStart: 28,
      yStart: 38,
      frameCount: 1,
    });
    this.animations[0][i][1] = this.createNewSantAnimator({
      facingDirection: 1,
      xStart: 276,
      yStart: 38,
      frameCount: 1,
    });
  }

  loadWalkAnimation(i) {
    this.animations[1][i][0] = this.createNewSantAnimator({
      facingDirection: 0,
      xStart: 28,
      yStart: 38,
      frameCount: 4,
    });
    this.animations[1][i][1] = this.createNewSantAnimator({
      facingDirection: 1,
      xStart: 150,
      yStart: 38,
      frameCount: 4,
    });
  }

  loadRunAnimation(i) {
    this.animations[2][i][0] = this.createNewSantAnimator({
      facingDirection: 0,
      xStart: 28,
      yStart: 38,
      frameCount: 4,
    });
    this.animations[2][i][1] = this.createNewSantAnimator({
      facingDirection: 1,
      xStart: 150,
      yStart: 38,
      frameCount: 4,
    });
  }

  loadSkidAnimation(i) {
    this.animations[3][i][0] = this.createNewSantAnimator({
      facingDirection: 0,
      xStart: 28,
      yStart: 38,
      frameCount: 4,
    });
    this.animations[3][i][1] = this.createNewSantAnimator({
      facingDirection: 1,
      xStart: 150,
      yStart: 38,
      frameCount: 4,
    });
  }

  loadJumpAnimation(i) {
    this.animations[4][i][0] = this.createNewSantAnimator({
      facingDirection: 0,
      xStart: 158,
      yStart: 122,
      frameCount: 1,
      width: 34,
    });
    this.animations[4][i][1] = this.createNewSantAnimator({
      facingDirection: 1,
      xStart: 144,
      yStart: 122,
      frameCount: 1,
      width: 34,
    });
  }

  loadDuckAnimation(i) {
    this.animations[5][i][0] = this.createNewSantAnimator({
      facingDirection: 0,
      xStart: 28,
      yStart: 38,
      frameCount: 1,
    });
    this.animations[5][i][1] = this.createNewSantAnimator({
      facingDirection: 1,
      xStart: 276,
      yStart: 38,
      frameCount: 1,
    });
  }

  loadAttackAnimation(i) {
    this.animations[6][i][0] = this.createNewSantAnimator({
      facingDirection: 0,
      xStart: 28,
      yStart: 118,
      frameCount: 2,
      width: 42,
      padding: 16,
    });
    this.animations[6][i][1] = this.createNewSantAnimator({
      facingDirection: 1,
      xStart: 208,
      yStart: 118,
      frameCount: 2,
      width: 42,
      padding: 16,
    });
  }

  loadHurtAnimation(i) {
    this.animations[7][i][0] = this.createNewSantAnimator({
      facingDirection: 0,
      xStart: 114,
      yStart: 268,
      frameCount: 1,
      width: 38,
    });
    this.animations[7][i][1] = this.createNewSantAnimator({
      facingDirection: 1,
      xStart: 184,
      yStart: 268,
      frameCount: 1,
      width: 38,
    });
  }

  createNewSantAnimator({
    facingDirection,
    xStart,
    yStart,
    frameCount,
    width = 32,
    padding = 10,
    loop = true,
  }) {
    return new Animator(
      this.spritesheets[facingDirection],
      xStart,
      yStart,
      width,
      49,
      frameCount,
      0.2,
      padding,
      facingDirection === 1,
      loop
    );
  }

  updateBB() {
    this.lastBB = this.BB;

    const currentSantWidth = this.animations[this.state][0][this.isFacingLeft]
      .width;
    const currentSantHeight = this.animations[this.state][0][this.isFacingLeft]
      .height;

    if (this.size === 0 || this.size === 3) {
      this.BB = new BoundingBox(
        this.x,
        this.y,
        currentSantWidth * PARAMS.SCALE,
        currentSantHeight * PARAMS.SCALE
      );
    } else {
      this.BB = new BoundingBox(
        this.x,
        this.y,
        currentSantWidth * PARAMS.SCALE,
        currentSantHeight * PARAMS.SCALE
      );
    }
  }

  die() {
    this.velocity.y = -640;
    this.dead = true;
  }

  update() {
    const TICK = this.game.clockTick;

    // I used this page to approximate my constants
    // https://web.archive.org/web/20130807122227/http://i276.photobucket.com/albums/kk21/jdaster64/smb_playerphysics.png
    // I converted these values from hex and into units of pixels and seconds.

    const MIN_WALK = 4.453125;
    const MAX_WALK = 93.75;
    const MAX_RUN = 153.75;
    const ACC_WALK = 133.59375;
    const ACC_RUN = 200.390625;
    const DEC_REL = 182.8125;
    const DEC_SKID = 365.625;
    const MIN_SKID = 33.75;

    const STOP_FALL = 1575;
    const WALK_FALL = 1800;
    const RUN_FALL = 2025;
    const STOP_FALL_A = 450;
    const WALK_FALL_A = 421.875;
    const RUN_FALL_A = 562.5;

    const MAX_FALL = 270;

    if (this.dead) {
      // this.velocity.y += RUN_FALL * TICK;
      // this.y += this.velocity.y * TICK * PARAMS.SCALE;
    } else {
      // update velocity

      if (this.state !== 4) {
        // not jumping
        // ground physics
        if (Math.abs(this.velocity.x) < MIN_WALK) {
          // slower than a walk // starting, stopping or turning around
          this.velocity.x = 0;
          this.state = 0;
          if (this.game.left) {
            this.velocity.x -= MIN_WALK;
          }
          if (this.game.right) {
            this.velocity.x += MIN_WALK;
          }
        } else if (Math.abs(this.velocity.x) >= MIN_WALK) {
          // faster than a walk // accelerating or decelerating
          if (this.isFacingLeft === 0) {
            if (this.game.right && !this.game.left) {
              if (this.game.B) {
                this.velocity.x += ACC_RUN * TICK;
              } else this.velocity.x += ACC_WALK * TICK;
            } else if (this.game.left && !this.game.right) {
              this.velocity.x -= DEC_SKID * TICK;
              this.state = 3;
            } else {
              this.velocity.x -= DEC_REL * TICK;
            }
          }
          if (this.isFacingLeft === 1) {
            if (this.game.left && !this.game.right) {
              if (this.game.B) {
                this.velocity.x -= ACC_RUN * TICK;
              } else this.velocity.x -= ACC_WALK * TICK;
            } else if (this.game.right && !this.game.left) {
              this.velocity.x += DEC_SKID * TICK;
              this.state = 3;
            } else {
              this.velocity.x += DEC_REL * TICK;
            }
          }
        }

        this.velocity.y += this.fallAcc * TICK;

        if (this.game.A) {
          // jump
          if (Math.abs(this.velocity.x) < 16) {
            this.velocity.y = -240;
            this.fallAcc = STOP_FALL;
          } else if (Math.abs(this.velocity.x) < 40) {
            this.velocity.y = -240;
            this.fallAcc = WALK_FALL;
          } else {
            this.velocity.y = -300;
            this.fallAcc = RUN_FALL;
          }
          this.state = 4;
        }
        if (this.game.attack) {
          if (this.state !== 4) {
            this.state = 6;
          }
        }
        // else if the sant is not in attack mode and jump mode, change it to walk mode 
        else if (!this.game.A) {
          this.state = 1;
        }
      } else {
        // air physics
        // vertical physics
        if (this.velocity.y < 0 && this.game.A) {
          // holding A while jumping jumps higher
          if (this.fallAcc === STOP_FALL)
            this.velocity.y -= (STOP_FALL - STOP_FALL_A) * TICK;
          if (this.fallAcc === WALK_FALL)
            this.velocity.y -= (WALK_FALL - WALK_FALL_A) * TICK;
          if (this.fallAcc === RUN_FALL)
            this.velocity.y -= (RUN_FALL - RUN_FALL_A) * TICK;
        }
        this.velocity.y += this.fallAcc * TICK;

        // horizontal physics
        if (this.game.right && !this.game.left) {
          if (Math.abs(this.velocity.x) > MAX_WALK) {
            this.velocity.x += ACC_RUN * TICK;
          } else this.velocity.x += ACC_WALK * TICK;
        } else if (this.game.left && !this.game.right) {
          if (Math.abs(this.velocity.x) > MAX_WALK) {
            this.velocity.x -= ACC_RUN * TICK;
          } else this.velocity.x -= ACC_WALK * TICK;
        } else {
          // do nothing
        }
      }

      // max speed calculation
      if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
      if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

      if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
      if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;
      if (this.velocity.x >= MAX_WALK && !this.game.B)
        this.velocity.x = MAX_WALK;
      if (this.velocity.x <= -MAX_WALK && !this.game.B)
        this.velocity.x = -MAX_WALK;

      // update position
      this.x += this.velocity.x * TICK * PARAMS.SCALE;
      this.y += this.velocity.y * TICK * PARAMS.SCALE;
      this.updateBB();

      // if sant fell of the map he's dead
      if (this.y > PARAMS.BLOCKWIDTH * 16) this.die();

      // collision
      var that = this;
      this.game.entities.forEach(function (entity) {
        if (entity.BB && that.BB.collide(entity.BB)) {
          if (that.velocity.y > 0) {
            // falling
            if (
              (entity instanceof Ground ||
                entity instanceof Brick ||
                entity instanceof Block ||
                entity instanceof Angel ||
                entity instanceof Brickmoved) && // landin
              that.lastBB.bottom <= entity.BB.top
            ) {
              // was above last tick
              entity.time += 5;
              if (that.size === 0 || that.size === 3) {
                // small
                that.y = entity.BB.top - that.BB.height;
              } else {
                // big
                that.y = entity.BB.top - that.BB.height;
              }
              that.velocity.y === 0;

              if (that.state === 4) that.state = 0; // set state to idle
              that.updateBB();

              // if (entity instanceof Tube && entity.destination && that.game.down) {
              //     that.game.camera.loadBonusLevelOne();
              // }
            }
            if (
              (entity instanceof Skeleton ||
                entity instanceof Zombie ||
                entity instanceof FlyingEye ||
                entity instanceof Terrorists ||
                entity instanceof BulletTwo) && // squish skeleton
              // && (that.lastBB.bottom) <= entity.BB.top // was above last tick
              !entity.dead
            ) {
              // can't squish an already squished skeleton
              // that.dead = true;
              console.log(that.isEnabledHurtCooldown);
              if (that.state !== 7 && !that.isEnabledHurtCooldown) {
                // that.velocity.y = -20; // bounce
                // that.velocity.x += (that.isFacingLeft === 0 ? 1 : -1) * 1;
                that.velocity.x = 0;
                that.state = 7;
              }
            }
          }
          if (that.velocity.y < 0) {
            // jumping
            if (
              entity instanceof Brick && // hit ceiling
              that.lastBB.top >= entity.BB.bottom && // was below last tick
              that.BB.collide(entity.leftBB) &&
              that.BB.collide(entity.rightBB)
            ) {
              // collide with the center point of the brick
              entity.bounce = true;
              that.velocity.y = 0;
            }
          }
          if (
            entity instanceof Brick &&
            entity instanceof Angel &&
            entity.type && // hit a visible brick
            that.BB.collide(entity.topBB) &&
            that.BB.collide(entity.bottomBB)
          ) {
            // hit the side
            if (that.BB.collide(entity.leftBB)) {
              that.x = entity.BB.left - that.BB.width;
              if (that.velocity.x > 0) that.velocity.x = 0;
            } else if (that.BB.collide(entity.rightBB)) {
              that.x = entity.BB.right;
              if (that.velocity.x < 0) that.velocity.x = 0;
            }
            that.updateBB();
          }
          if (
            (entity instanceof Block || entity instanceof Ground) &&
            that.BB.bottom > entity.BB.top
          ) {
            if (that.BB.collide(entity.leftBB)) {
              that.x = entity.BB.left - that.BB.width;
              if (that.velocity.x > 0) that.velocity.x = 0;
              // if (entity instanceof SideTube && that.game.right)
              //     that.game.camera.loadLevelOne(162.5 * PARAMS.BLOCKWIDTH, 11 * PARAMS.BLOCKWIDTH)
            } else {
              that.x = entity.BB.right;
              if (that.velocity.x < 0) that.velocity.x = 0;
            }
            that.updateBB();
          }

          // Auto upgrade the gun
          if (entity instanceof Angel) {
            entity.removeFromWorld = true;

            if (
              that.BB.collide(entity.leftBB) ||
              that.BB.collide(entity.rightBB)
            ) {
              that.random = Math.floor(Math.random() * 4);
              that.changeGun = true;
            }

            that.updateBB();
          }

          // if (entity instanceof Mushroom && !entity.emerging) {
          //   entity.removeFromWorld = true;
          //   if (entity.type === "Growth") {
          //     that.y -= that.BB.height;
          //     that.size = 1;
          //     that.game.addEntity(new Score(that.game, that.x, that.y, 1000));
          //   } else {
          //     that.game.camera.lives++;
          //   }
          // }
          // if (entity instanceof Coin) {
          //   entity.removeFromWorld = true;
          //   that.game.camera.score += 200;
          //   that.game.camera.addCoin();
          // }
        }
      });

      if (this.state === 7) {
        if (this.hurtCounter === 0) {
          this.health -= 1;
        }
        this.hurtCounter += this.game.clockTick;
        if (this.hurtCounter > 1) {
          if (this.health <= 0) {
            this.dead = true;
          }
          this.state = 0;
          this.hurtCounter = 0.0;
          this.isEnabledHurtCooldown = true;
        }
      }

      if (this.isEnabledHurtCooldown) {
        this.hurtCooldownCounter += this.game.clockTick;
        if (this.hurtCooldownCounter > 1) {
          this.hurtCooldownCounter = 0.0;
          this.isEnabledHurtCooldown = false;
        }
      }
      if (this.changeGun == false || this.changeGun == true) {
        if (this.state === 6) {
          this.attackCounter += this.game.clockTick;
          // attack counter is for restricting attack speed
          if (this.attackCounter > 0.2) {
            const fireballX = this.x + (this.isFacingLeft ? -48 : 120);
            const fireballY = this.y + 54;
            this.game.addEntity(
              // change this
              //new Fireball(this.game, fireballX, fireballY, this.isFacingLeft)
              new Weapon(
                this.game,
                fireballX,
                fireballY,
                this.isFacingLeft,
                this.random
              ).seletedGun(this.random)
            );
            //console.log(this.game.removeEntity());
            this.attackCounter = 0.0;
          }
        }
      }
      // } else {
      //   if (this.state === 6) {
      //     this.attackCounter += this.game.clockTick;
      //     // attack counter is for restricting attack speed
      //     if (this.attackCounter > 0.2) {
      //       const fireballX = this.x + (this.isFacingLeft ? -48 : 120);
      //       const fireballY = this.y + 54;

      //       this.game.addEntity(
      //         // change this
      //         //new Fireball(this.game, fireballX, fireballY, this.isFacingLeft)
      //         new Weapon(
      //           this.game,
      //           fireballX,
      //           fireballY,
      //           this.isFacingLeft,
      //           this.random
      //         ).seletedGun(this.random)
      //       );
      //       //console.log(this.game.removeEntity());
      //       this.attackCounter = 0.0;
      //     }
      //   }
      // }
      // update state
      if (this.state !== 4 && this.state !== 6 && this.state !== 7) {
        // if (this.game.down) this.state = 5;
        if (Math.abs(this.velocity.x) > MAX_WALK) this.state = 2;
        else if (Math.abs(this.velocity.x) >= MIN_WALK) this.state = 1;
        else this.state = 0;
      } else {
      }

      // update direction
      if (this.velocity.x < 0) this.isFacingLeft = this.state !== 7 ? 1 : 0;
      if (this.velocity.x > 0) this.isFacingLeft = this.state !== 7 ? 0 : 1;
    }
  }

  drawMinimap(ctx, mmX, mmY) {
    ctx.fillStyle = "Red";
    ctx.fillRect(
      mmX + this.x / PARAMS.BITWIDTH,
      mmY + this.y / PARAMS.BITWIDTH,
      PARAMS.SCALE,
      PARAMS.SCALE * Math.min(this.size + 1, 2)
    );
  }

  draw(ctx) {
    if (this.dead) {
      this.deadAnim[this.isFacingLeft].drawFrame(
        this.game.clockTick,
        ctx,
        this.x - this.game.camera.x,
        this.y,
        PARAMS.SCALE
      );
    } else {
      this.animations[this.state][this.size][this.isFacingLeft].drawFrame(
        this.game.clockTick,
        ctx,
        this.x - this.game.camera.x,
        this.y,
        PARAMS.SCALE
      );
    }
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
