class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.game.mapMaxDistance = 8000;
    this.game.isFightingBoss = false;
    this.game.isBulletCapacityVisible = false;

    this.game.currentLevel = level;
    this.game.show = false;

    this.x = 0;
    this.score = 0;
    this.coins = 0;
    this.lives = 3;

    this.coinAnimation = new Animator(
      ASSET_MANAGER.getAsset('./sprites/coins.png'),
      0,
      160,
      8,
      8,
      4,
      0.2,
      0,
      false,
      true
    );

    this.minimap = new Minimap(
      this.game,
      1.5 * PARAMS.BLOCKWIDTH,
      3.5 * PARAMS.BLOCKWIDTH,
      224 * PARAMS.SCALE
    );

    this.sant = new Sant(
      this.game,
      2.5 * PARAMS.BLOCKWIDTH,
      0 * PARAMS.BLOCKWIDTH
    );

    this.loadLevelOne(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
  }

  addCoin() {
    if (this.coins++ === 100) {
      this.coins = 0;
      this.lives++;
    }
  }

  loadLevel(x, y, level) {
    if (level === 1) {
      this.loadLevelOne(x, y);
    }
    else if (level === 2) {
      this.loadLevelTwo(x, y);
    }
    else if (level === 3) {
      this.loadLevelThree(x, y);
    }
  }

  loadLevelOne(x, y) {
    this.game.currentLevel = 1;
    this.game.entities = [];
    this.x = 0;
    this.game.show = false;

    let background = new WallLevelOne(this.game, 0, PARAMS.BLOCKWIDTH, 0);
    this.game.addEntity(background);

    for (let i = 0; i < PARAMS.BLOCKWIDTH; i++) {
      background = new WallLevelOne(
        this.game,
        PARAMS.BLOCKWIDTH * 25 * i,
        PARAMS.BLOCKWIDTH,
        25
      );
      this.game.addEntity(background);
    }

    let ground = new GroundLevelOne(this.game, 0, 14 * PARAMS.BLOCKWIDTH, 0);
    this.game.addEntity(ground);
    for (
      let i = 0;
      PARAMS.BLOCKWIDTH * i < this.game.mapMaxDistance + PARAMS.SCREEN_WIDTH;
      i++
    ) {
      background = new GroundLevelOne(
        this.game,
        PARAMS.BLOCKWIDTH * i,
        14 * PARAMS.BLOCKWIDTH,
        25
      );
      this.game.addEntity(background);
    }

    let brick = new BrickLevelOne(
      this.game,
      10 * 0 * PARAMS.BLOCKWIDTH + 400,
      10 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(brick);

    for (
      let i = 1;
      10 * i * PARAMS.BLOCKWIDTH + 400 < this.game.mapMaxDistance;
      i = i + 3
    ) {
      brick = new BrickLevelOne(
        this.game,
        10 * i * PARAMS.BLOCKWIDTH + 400,
        10 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(brick);
    }

    //flying eyes
    let flyingEye = new FlyingEye(
      this.game,
      13 * PARAMS.BLOCKWIDTH,
      10 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(flyingEye);

    for (
      let i = 0;
      10 * i * PARAMS.BLOCKWIDTH + 1200 < this.game.mapMaxDistance;
      i = i + 3
    ) {
      brick = new BrickLevelOne(
        this.game,
        10 * i * PARAMS.BLOCKWIDTH + 1200,
        9 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(brick);
    }

    for (
      let i = 0;
      10 * i * PARAMS.BLOCKWIDTH + 2000 < this.game.mapMaxDistance;
      i = i + 6
    ) {
      brick = new BlockLevelOne(
        this.game,
        5 * i * PARAMS.BLOCKWIDTH + 2000,
        11 * PARAMS.BLOCKWIDTH,
        PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(brick);
    }

    for (
      let i = 0;
      6 * i * PARAMS.BLOCKWIDTH + 1600 < this.game.mapMaxDistance;
      i = i + 11
    ) {
      brick = new Angel(
        this.game,
        6 * i * PARAMS.BLOCKWIDTH + 1550,
        10 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(brick);
    }

    brick = new BrickLevelOne(
      this.game,
      this.game.mapMaxDistance,
      PARAMS.BLOCKWIDTH * 10,
      PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(brick);
    brick = new BrickLevelOne(
      this.game,
      this.game.mapMaxDistance + 300,
      PARAMS.BLOCKWIDTH * 9,
      PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(brick);

    let skeleton = new Skeleton(
      this.game,
      10 * PARAMS.BLOCKWIDTH,
      10.85 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(skeleton);

    skeleton = new Skeleton(
      this.game,
      this.game.mapMaxDistance + 200,
      PARAMS.BLOCKWIDTH * 10.85
    );
    this.game.addEntity(skeleton);

    skeleton = new Skeleton(
      this.game,
      this.game.mapMaxDistance + 400,
      PARAMS.BLOCKWIDTH * 10.85
    );
    this.game.addEntity(skeleton);

    for (
      let i = 0;
      (17 + i) * PARAMS.BLOCKWIDTH < this.game.mapMaxDistance;
      i = i + 60
    ) {
      skeleton = new Skeleton(
        this.game,
        (17 + i) * PARAMS.BLOCKWIDTH,
        10.85 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(skeleton);
    }

    //Zombie - Tung
    let zombie = new Zombie(
      this.game,
      15 * PARAMS.BLOCKWIDTH,
      11.5 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(zombie);

    //Terrorists
    let terrorists = new Terrorists(
      this.game,
      30 * PARAMS.BLOCKWIDTH,
      11.2 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(terrorists);

    for (
      let i = 0;
      (37 + i) * PARAMS.BLOCKWIDTH < this.game.mapMaxDistance;
      i = i + 30
    ) {
      terrorists = new Terrorists(
        this.game,
        (37 + i) * PARAMS.BLOCKWIDTH,
        11.2 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(terrorists);
    }

    // for (
    //   let i = 0;
    //   (37 + i) * PARAMS.BLOCKWIDTH < this.game.mapMaxDistance;
    //   i = i + 30
    // ) {
    //   zombie = new Zombie(
    //     this.game,
    //     (38 + i) * PARAMS.BLOCKWIDTH,
    //     11.5 * PARAMS.BLOCKWIDTH
    //   );
    //   this.game.addEntity(zombie);
    // }
    // terrorists = new Terrorists(
    //   this.game,
    //   60 * PARAMS.BLOCKWIDTH,
    //   11.2 * PARAMS.BLOCKWIDTH
    // );
    // this.game.addEntity(terrorists);

    // for (let i = 0; i < 30; i += 2) {
    //   terrorists = new Terrorists(
    //     this.game,
    //     this.game.mapMaxDistance,
    //     PARAMS.BLOCKWIDTH * 11.2
    //   );
    //   this.game.addEntity(terrorists);
    // }

    terrorists = new Terrorists(
      this.game,
      this.game.mapMaxDistance + 800,
      11.2 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(terrorists);

    //Mafia
    let mafia = new Mafia(
      this.game,
      this.game.mapMaxDistance + 600,
      10.5 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(mafia);

    this.sant.x = x;
    this.sant.y = this.sant.size ? y - PARAMS.BLOCKWIDTH : y;
    this.game.addEntity(this.sant);
  }

  loadLevelTwo(x, y) {
    this.game.isFightingBoss = false;
    this.game.currentLevel = 2;
    this.game.show = true;
    this.game.entities = [];
    this.x = 0;

    let background = new WallLevelTwo(this.game, 0, PARAMS.BLOCKWIDTH, 0);
    this.game.addEntity(background);

    for (let i = 0; i < PARAMS.BLOCKWIDTH; i++) {
      background = new WallLevelTwo(
        this.game,
        PARAMS.BLOCKWIDTH * 25 * i,
        PARAMS.BLOCKWIDTH,
        25
      );
      this.game.addEntity(background);
    }

    let ground = new Ground(this.game, 0, 14 * PARAMS.BLOCKWIDTH, 0);
    this.game.addEntity(ground);
    for (
      let i = 0;
      PARAMS.BLOCKWIDTH * i < this.game.mapMaxDistance + PARAMS.SCREEN_WIDTH;
      i++
    ) {
      background = new Ground(
        this.game,
        PARAMS.BLOCKWIDTH * i,
        14 * PARAMS.BLOCKWIDTH,
        25
      );
      this.game.addEntity(background);
    }

    let brick = new Brick(
      this.game,
      10 * 0 * PARAMS.BLOCKWIDTH + 400,
      10 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(brick);

    for (
      let i = 1;
      10 * i * PARAMS.BLOCKWIDTH + 400 < this.game.mapMaxDistance;
      i = i + 3
    ) {
      brick = new Brick(
        this.game,
        10 * i * PARAMS.BLOCKWIDTH + 400,
        10 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(brick);
    }

    //flying eyes
    let flyingEye = new FlyingEye(
      this.game,
      13 * PARAMS.BLOCKWIDTH,
      10 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(flyingEye);

    for (
      let i = 0;
      10 * i * PARAMS.BLOCKWIDTH + 1200 < this.game.mapMaxDistance;
      i += 3
    ) {
      flyingEye = new FlyingEye(
        this.game,
        10 * i * PARAMS.BLOCKWIDTH + 1200,
        7 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(flyingEye);
    }

    for (
      let i = 0;
      10 * i * PARAMS.BLOCKWIDTH + 1200 < this.game.mapMaxDistance;
      i += 3
    ) {
      flyingEye = new FlyingEye(
        this.game,
        11 * i * PARAMS.BLOCKWIDTH + 1500,
        5 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(flyingEye);
    }

    for (
      let i = 0;
      10 * i * PARAMS.BLOCKWIDTH + 1200 < this.game.mapMaxDistance;
      i = i + 3
    ) {
      brick = new Brick(
        this.game,
        10 * i * PARAMS.BLOCKWIDTH + 1200,
        9 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(brick);
    }

    for (
      let i = 0;
      10 * i * PARAMS.BLOCKWIDTH + 2000 < this.game.mapMaxDistance;
      i = i + 6
    ) {
      brick = new Block(
        this.game,
        5 * i * PARAMS.BLOCKWIDTH + 2000,
        11 * PARAMS.BLOCKWIDTH,
        PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(brick);
    }

    for (
      let i = 0;
      6 * i * PARAMS.BLOCKWIDTH + 1600 < this.game.mapMaxDistance;
      i = i + 11
    ) {
      brick = new Angel(
        this.game,
        6 * i * PARAMS.BLOCKWIDTH + 1600,
        10 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(brick);
    }
    for (
      let i = 0;
      PARAMS.BLOCKWIDTH * 10 * i + 1000 < this.game.mapMaxDistance;
      i = i + 7
    ) {
      brick = new Brickmoved(
        this.game,
        PARAMS.BLOCKWIDTH * 10 * i + 1000,
        PARAMS.BLOCKWIDTH * 10
      );
      this.game.addEntity(brick);
    }

    for (
      let i = 0;
      PARAMS.BLOCKWIDTH * 10 * i + 1000 < this.game.mapMaxDistance;
      i = i + 7
    ) {
      brick = new Brickmoved(
        this.game,
        PARAMS.BLOCKWIDTH * 11 * i + 1500,
        PARAMS.BLOCKWIDTH * 8
      );
      this.game.addEntity(brick);
    }

    brick = new Brick(
      this.game,
      this.game.mapMaxDistance,
      PARAMS.BLOCKWIDTH * 10,
      PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(brick);
    brick = new Brick(
      this.game,
      this.game.mapMaxDistance + 300,
      PARAMS.BLOCKWIDTH * 9,
      PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(brick);

    let skeleton = new Skeleton(
      this.game,
      10 * PARAMS.BLOCKWIDTH,
      10.85 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(skeleton);

    skeleton = new Skeleton(
      this.game,
      this.game.mapMaxDistance + 200,
      PARAMS.BLOCKWIDTH * 10.85
    );
    this.game.addEntity(skeleton);

    skeleton = new Skeleton(
      this.game,
      this.game.mapMaxDistance + 400,
      PARAMS.BLOCKWIDTH * 10.85
    );
    this.game.addEntity(skeleton);

    for (
      let i = 0;
      (17 + i) * PARAMS.BLOCKWIDTH < this.game.mapMaxDistance;
      i = i + 60
    ) {
      skeleton = new Skeleton(
        this.game,
        (17 + i) * PARAMS.BLOCKWIDTH,
        10.85 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(skeleton);
    }

    //Zombie - Tung
    let zombie = new Zombie(
      this.game,
      15 * PARAMS.BLOCKWIDTH,
      11.5 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(zombie);

    //Terrorists
    let terrorists = new Terrorists(
      this.game,
      30 * PARAMS.BLOCKWIDTH,
      11.2 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(terrorists);

    for (
      let i = 0;
      (37 + i) * PARAMS.BLOCKWIDTH < this.game.mapMaxDistance;
      i = i + 30
    ) {
      terrorists = new Zombie(
        this.game,
        (37 + i) * PARAMS.BLOCKWIDTH,
        11.5 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(terrorists);
    }

    terrorists = new Terrorists(
      this.game,
      60 * PARAMS.BLOCKWIDTH,
      11.2 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(terrorists);

    for (let i = 0; i < 30; i += 2) {
      terrorists = new Terrorists(
        this.game,
        this.game.mapMaxDistance,
        PARAMS.BLOCKWIDTH * 11.2
      );
      this.game.addEntity(terrorists);
    }

    //Mafia
    let mafia = new Mafia(
      this.game,
      this.game.mapMaxDistance + 600,
      10.5 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(mafia);

    terrorists = new Terrorists(
      this.game,
      this.game.mapMaxDistance + 800,
      11.2 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(terrorists);

    this.sant.x = x;
    this.sant.y = this.sant.size ? y - PARAMS.BLOCKWIDTH : y;
    this.game.addEntity(this.sant);
  }

  loadLevelThree(x, y) {
    this.game.isFightingBoss = false;
    this.game.currentLevel = 3;
    this.game.entities = [];
    this.x = 0;

    let background = new WallLevelTwo(this.game, 0, PARAMS.BLOCKWIDTH, 0);
    this.game.addEntity(background);

    for (let i = 0; i < PARAMS.BLOCKWIDTH; i++) {
      background = new WallLevelTwo(
        this.game,
        PARAMS.BLOCKWIDTH * 25 * i,
        PARAMS.BLOCKWIDTH,
        25
      );
      this.game.addEntity(background);
    }

    let ground = new Ground(this.game, 0, 14 * PARAMS.BLOCKWIDTH, 0);
    this.game.addEntity(ground);
    for (
      let i = 0;
      PARAMS.BLOCKWIDTH * i < this.game.mapMaxDistance + PARAMS.SCREEN_WIDTH;
      i++
    ) {
      background = new Ground(
        this.game,
        PARAMS.BLOCKWIDTH * i,
        14 * PARAMS.BLOCKWIDTH,
        25
      );
      this.game.addEntity(background);
    }

    let brick = new Brick(
      this.game,
      10 * 0 * PARAMS.BLOCKWIDTH + 400,
      10 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(brick);

    for (
      let i = 1;
      10 * i * PARAMS.BLOCKWIDTH + 400 < this.game.mapMaxDistance;
      i = i + 3
    ) {
      brick = new Brick(
        this.game,
        10 * i * PARAMS.BLOCKWIDTH + 400,
        10 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(brick);
    }

    //flying eyes
    let flyingEye = new FlyingEye(
      this.game,
      13 * PARAMS.BLOCKWIDTH,
      10 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(flyingEye);

    for (
      let i = 0;
      10 * i * PARAMS.BLOCKWIDTH + 1200 < this.game.mapMaxDistance;
      i += 3
    ) {
      flyingEye = new FlyingEye(
        this.game,
        10 * i * PARAMS.BLOCKWIDTH + 1200,
        7 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(flyingEye);
    }

    for (
      let i = 0;
      10 * i * PARAMS.BLOCKWIDTH + 1200 < this.game.mapMaxDistance;
      i += 3
    ) {
      flyingEye = new FlyingEye(
        this.game,
        11 * i * PARAMS.BLOCKWIDTH + 1500,
        5 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(flyingEye);
    }

    for (
      let i = 0;
      10 * i * PARAMS.BLOCKWIDTH + 1200 < this.game.mapMaxDistance;
      i = i + 3
    ) {
      brick = new Brick(
        this.game,
        10 * i * PARAMS.BLOCKWIDTH + 1200,
        9 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(brick);
    }

    for (
      let i = 0;
      10 * i * PARAMS.BLOCKWIDTH + 2000 < this.game.mapMaxDistance;
      i = i + 6
    ) {
      brick = new Block(
        this.game,
        5 * i * PARAMS.BLOCKWIDTH + 2000,
        11 * PARAMS.BLOCKWIDTH,
        PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(brick);
    }

    for (
      let i = 0;
      6 * i * PARAMS.BLOCKWIDTH + 1600 < this.game.mapMaxDistance;
      i = i + 11
    ) {
      brick = new Angel(
        this.game,
        6 * i * PARAMS.BLOCKWIDTH + 1600,
        10 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(brick);
    }
    for (
      let i = 0;
      PARAMS.BLOCKWIDTH * 10 * i + 1000 < this.game.mapMaxDistance;
      i = i + 7
    ) {
      brick = new Brickmoved(
        this.game,
        PARAMS.BLOCKWIDTH * 10 * i + 1000,
        PARAMS.BLOCKWIDTH * 10
      );
      this.game.addEntity(brick);
    }

    for (
      let i = 0;
      PARAMS.BLOCKWIDTH * 10 * i + 1000 < this.game.mapMaxDistance;
      i = i + 7
    ) {
      brick = new Brickmoved(
        this.game,
        PARAMS.BLOCKWIDTH * 11 * i + 1500,
        PARAMS.BLOCKWIDTH * 8
      );
      this.game.addEntity(brick);
    }

    brick = new Brick(
      this.game,
      this.game.mapMaxDistance,
      PARAMS.BLOCKWIDTH * 10,
      PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(brick);
    brick = new Brick(
      this.game,
      this.game.mapMaxDistance + 300,
      PARAMS.BLOCKWIDTH * 9,
      PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(brick);

    let skeleton = new Skeleton(
      this.game,
      10 * PARAMS.BLOCKWIDTH,
      10.85 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(skeleton);

    skeleton = new Skeleton(
      this.game,
      this.game.mapMaxDistance + 200,
      PARAMS.BLOCKWIDTH * 10.85
    );
    this.game.addEntity(skeleton);

    skeleton = new Skeleton(
      this.game,
      this.game.mapMaxDistance + 400,
      PARAMS.BLOCKWIDTH * 10.85
    );
    this.game.addEntity(skeleton);

    for (
      let i = 0;
      (17 + i) * PARAMS.BLOCKWIDTH < this.game.mapMaxDistance;
      i = i + 60
    ) {
      skeleton = new Skeleton(
        this.game,
        (17 + i) * PARAMS.BLOCKWIDTH,
        10.85 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(skeleton);
    }

    //Zombie - Tung
    let zombie = new Zombie(
      this.game,
      15 * PARAMS.BLOCKWIDTH,
      11.5 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(zombie);

    //Terrorists
    let terrorists = new Terrorists(
      this.game,
      30 * PARAMS.BLOCKWIDTH,
      11.2 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(terrorists);

    for (
      let i = 0;
      (37 + i) * PARAMS.BLOCKWIDTH < this.game.mapMaxDistance;
      i = i + 30
    ) {
      terrorists = new Terrorists(
        this.game,
        (37 + i) * PARAMS.BLOCKWIDTH,
        11.2 * PARAMS.BLOCKWIDTH
      );
      this.game.addEntity(terrorists);
    }

    terrorists = new Terrorists(
      this.game,
      60 * PARAMS.BLOCKWIDTH,
      11.2 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(terrorists);

    for (let i = 0; i < 30; i += 2) {
      terrorists = new Terrorists(
        this.game,
        this.game.mapMaxDistance,
        PARAMS.BLOCKWIDTH * 11.2
      );
      this.game.addEntity(terrorists);
    }

    //Mafia
    let mafia = new Mafia(
      this.game,
      this.game.mapMaxDistance + 600,
      10.5 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(mafia);

    terrorists = new Terrorists(
      this.game,
      this.game.mapMaxDistance + 800,
      11.2 * PARAMS.BLOCKWIDTH
    );
    this.game.addEntity(terrorists);

    this.sant.x = x;
    this.sant.y = this.sant.size ? y - PARAMS.BLOCKWIDTH : y;
    this.game.addEntity(this.sant);
  }

  update() {
    PARAMS.DEBUG = document.getElementById('debug').checked;

    let midpoint = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;

    if (this.x < this.sant.x - midpoint) this.x = this.sant.x - midpoint;

    if (this.x >= this.game.mapMaxDistance) {
      this.x = this.game.mapMaxDistance;
    }
    // if (this.sant.dead && this.sant.y > PARAMS.BLOCKWIDTH * 16) {
    //   this.sant.dead = false;
    //   this.loadLevelOne(2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
    // }
  }

  draw(ctx) {
    ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';
    ctx.fillStyle = 'White';
    ctx.fillText('SANT', 1.5 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
    ctx.fillText(
      (this.score + '').padStart(8, '0'),
      1.5 * PARAMS.BLOCKWIDTH,
      1.5 * PARAMS.BLOCKWIDTH
    );
    ctx.fillText(
      'health: ' + this.sant.getHealth(),
      6.5 * PARAMS.BLOCKWIDTH,
      1.5 * PARAMS.BLOCKWIDTH
    );
    if (this.game.isBulletCapacityVisible) {
      ctx.fillText(
        'capacity: ' + this.sant.capacity,
        6.5 * PARAMS.BLOCKWIDTH,
        2.3 * PARAMS.BLOCKWIDTH
      );
    }
    // ctx.fillText("WORLD", 9 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
    // ctx.fillText("1-1", 9.5 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);
    ctx.fillText(
      `Level ${this.game.currentLevel}`,
      12 * PARAMS.BLOCKWIDTH,
      1 * PARAMS.BLOCKWIDTH
    );

    // this.coinAnimation.drawFrame(
    //   this.game.clockTick,
    //   ctx,
    //   6 * PARAMS.BLOCKWIDTH,
    //   1 * PARAMS.BLOCKWIDTH,
    //   3
    // );

    if (PARAMS.DEBUG) {
      let xV = 'xV=' + Math.floor(this.game.mario.velocity.x);
      let yV = 'yV=' + Math.floor(this.game.mario.velocity.y);
      ctx.fillText(xV, 1.5 * PARAMS.BLOCKWIDTH, 2.5 * PARAMS.BLOCKWIDTH);
      ctx.fillText(yV, 1.5 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);

      ctx.translate(0, -10); // hack to move elements up by 10 pixels instead of adding -10 to all y coordinates below
      ctx.strokeStyle = 'White';
      ctx.lineWidth = 2;
      ctx.strokeStyle = this.game.left ? 'White' : 'Grey';
      ctx.fillStyle = ctx.strokeStyle;
      ctx.strokeRect(
        6 * PARAMS.BLOCKWIDTH - 2,
        2.5 * PARAMS.BLOCKWIDTH - 2,
        0.5 * PARAMS.BLOCKWIDTH + 2,
        0.5 * PARAMS.BLOCKWIDTH + 2
      );
      ctx.fillText('L', 6 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);
      ctx.strokeStyle = this.game.down ? 'White' : 'Grey';
      ctx.fillStyle = ctx.strokeStyle;
      ctx.strokeRect(
        6.5 * PARAMS.BLOCKWIDTH,
        3 * PARAMS.BLOCKWIDTH,
        0.5 * PARAMS.BLOCKWIDTH + 2,
        0.5 * PARAMS.BLOCKWIDTH + 2
      );
      ctx.fillText(
        'D',
        6.5 * PARAMS.BLOCKWIDTH + 2,
        3.5 * PARAMS.BLOCKWIDTH + 2
      );
      ctx.strokeStyle = this.game.up ? 'White' : 'Grey';
      ctx.fillStyle = ctx.strokeStyle;
      ctx.strokeRect(
        6.5 * PARAMS.BLOCKWIDTH,
        2 * PARAMS.BLOCKWIDTH - 4,
        0.5 * PARAMS.BLOCKWIDTH + 2,
        0.5 * PARAMS.BLOCKWIDTH + 2
      );
      ctx.fillText(
        'U',
        6.5 * PARAMS.BLOCKWIDTH + 2,
        2.5 * PARAMS.BLOCKWIDTH - 2
      );
      ctx.strokeStyle = this.game.right ? 'White' : 'Grey';
      ctx.fillStyle = ctx.strokeStyle;
      ctx.strokeRect(
        7 * PARAMS.BLOCKWIDTH + 2,
        2.5 * PARAMS.BLOCKWIDTH - 2,
        0.5 * PARAMS.BLOCKWIDTH + 2,
        0.5 * PARAMS.BLOCKWIDTH + 2
      );
      ctx.fillText('R', 7 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);

      ctx.strokeStyle = this.game.A ? 'White' : 'Grey';
      ctx.fillStyle = ctx.strokeStyle;
      ctx.beginPath();
      ctx.arc(
        8.25 * PARAMS.BLOCKWIDTH + 2,
        2.75 * PARAMS.BLOCKWIDTH,
        0.25 * PARAMS.BLOCKWIDTH + 4,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.fillText('A', 8 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);
      ctx.strokeStyle = this.game.B ? 'White' : 'Grey';
      ctx.fillStyle = ctx.strokeStyle;
      ctx.beginPath();
      ctx.arc(
        9 * PARAMS.BLOCKWIDTH + 2,
        2.75 * PARAMS.BLOCKWIDTH,
        0.25 * PARAMS.BLOCKWIDTH + 4,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.fillText('B', 8.75 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);

      ctx.translate(0, 10);
      ctx.strokeStyle = 'White';
      ctx.fillStyle = ctx.strokeStyle;

      this.minimap.draw(ctx);
    }
  }
}

class Minimap {
  constructor(game, x, y, w) {
    Object.assign(this, { game, x, y, w });
  }

  update() {}

  draw(ctx) {
    ctx.strokeStyle = 'Black';
    ctx.strokeRect(this.x, this.y, this.w, PARAMS.BLOCKWIDTH);
    for (var i = 0; i < this.game.entities.length; i++) {
      this.game.entities[i].drawMinimap(ctx, this.x, this.y);
    }
  }
}
