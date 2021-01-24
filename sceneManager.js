class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.x = 0;
    this.loadLevelOne();
  }

  loadLevelOne() {
    this.game.entities = [];

    let sant = new Sant(this.game, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    this.game.addEntity(sant);
  }

  draw() {}
}
