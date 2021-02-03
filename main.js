const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/luigi.png");
ASSET_MANAGER.queueDownload("./sprites/enemies.png");
ASSET_MANAGER.queueDownload("./sprites/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/ground.png");
ASSET_MANAGER.queueDownload("./sprites/bricks.png");
ASSET_MANAGER.queueDownload("./sprites/items.png");
ASSET_MANAGER.queueDownload("./sprites/coins.png");
ASSET_MANAGER.queueDownload("./sprites/flying-eye/attack.png");
ASSET_MANAGER.queueDownload("./sprites/flying-eye/death.png");
ASSET_MANAGER.queueDownload("./sprites/flying-eye/walk.png");
ASSET_MANAGER.queueDownload("./sprites/skeleton.png");
ASSET_MANAGER.queueDownload("./sprites/sant/sant-left.png");
ASSET_MANAGER.queueDownload("./sprites/sant/sant-right.png");
ASSET_MANAGER.queueDownload("./sprites/zombies.png");
ASSET_MANAGER.queueDownload("./sprites/zombies_left.png");
ASSET_MANAGER.queueDownload("./sprites/background.png");
ASSET_MANAGER.queueDownload("./sprites/place.png");
ASSET_MANAGER.queueDownload("./sprites/block1.png");
ASSET_MANAGER.queueDownload("./sprites/block3.png");
ASSET_MANAGER.queueDownload("./sprites/block4.png");
ASSET_MANAGER.queueDownload("./sprites/panda.png");
ASSET_MANAGER.queueDownload("./sprites/terrorists.png");
ASSET_MANAGER.queueDownload("./sprites/sant/fire_left.png");
ASSET_MANAGER.queueDownload("./sprites/sant/fire_right.png");
ASSET_MANAGER.queueDownload("./sprites/sant/spray_right.png");
ASSET_MANAGER.queueDownload("./sprites/sant/spray_left.png");

ASSET_MANAGER.downloadAll(function () {
  var gameEngine = new GameEngine();

  PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

  const canvas = document.getElementById("gameWorld");
  const ctx = canvas.getContext("2d");

  PARAMS.CANVAS_WIDTH = canvas.width;

  gameEngine.init(ctx);

  new SceneManager(gameEngine);

  gameEngine.start();
});
