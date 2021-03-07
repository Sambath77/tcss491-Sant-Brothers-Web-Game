const ASSET_MANAGER = new AssetManager();

//imagine
ASSET_MANAGER.queueDownload('./sprites/luigi.png');
ASSET_MANAGER.queueDownload('./sprites/enemies.png');
ASSET_MANAGER.queueDownload('./sprites/tiles.png');
ASSET_MANAGER.queueDownload('./sprites/ground.png');
ASSET_MANAGER.queueDownload('./sprites/bricks.png');
ASSET_MANAGER.queueDownload('./sprites/items.png');
ASSET_MANAGER.queueDownload('./sprites/coins.png');
ASSET_MANAGER.queueDownload('./sprites/flying-eye/attack.png');
ASSET_MANAGER.queueDownload('./sprites/flying-eye/death.png');
ASSET_MANAGER.queueDownload('./sprites/flying-eye/walk.png');
ASSET_MANAGER.queueDownload('./sprites/skeleton.png');
ASSET_MANAGER.queueDownload('./sprites/sant/sant-left.png');
ASSET_MANAGER.queueDownload('./sprites/sant/sant-right.png');
ASSET_MANAGER.queueDownload('./sprites/zombies.png');
ASSET_MANAGER.queueDownload('./sprites/zombies_left.png');
ASSET_MANAGER.queueDownload('./sprites/background.png');
ASSET_MANAGER.queueDownload('./sprites/place.png');
ASSET_MANAGER.queueDownload('./sprites/block1.png');
ASSET_MANAGER.queueDownload('./sprites/block3.png');
ASSET_MANAGER.queueDownload('./sprites/block4.png');
ASSET_MANAGER.queueDownload('./sprites/flag.png');
ASSET_MANAGER.queueDownload('./sprites/panda.png');
ASSET_MANAGER.queueDownload('./sprites/terrorists.png');
ASSET_MANAGER.queueDownload('./sprites/sant/fire_left.png');
ASSET_MANAGER.queueDownload('./sprites/sant/fire_right.png');
ASSET_MANAGER.queueDownload('./sprites/sant/spray_right.png');
ASSET_MANAGER.queueDownload('./sprites/sant/spray_left.png');
ASSET_MANAGER.queueDownload('./sprites/boss-left.png');
ASSET_MANAGER.queueDownload('./sprites/boss-right.png');
ASSET_MANAGER.queueDownload('./sprites/finish.png');
ASSET_MANAGER.queueDownload('./sprites/angel.png');
ASSET_MANAGER.queueDownload('./sprites/terrorists_right.png');
ASSET_MANAGER.queueDownload('./sprites/zombies.png');
ASSET_MANAGER.queueDownload('./sprites/gunners-left.png');
ASSET_MANAGER.queueDownload('./sprites/gunners-right.png');
ASSET_MANAGER.queueDownload('./sprites/new_background.png');
ASSET_MANAGER.queueDownload('./sprites/my_wall.png');
ASSET_MANAGER.queueDownload('./sprites/my_ground.png');

//music
ASSET_MANAGER.queueDownload('./music/Revolution - AShamaluevMusic.mp3');

//sound effect
ASSET_MANAGER.queueDownload('./soundEffect/jumping.mp3');
ASSET_MANAGER.queueDownload('./soundEffect/laser.mp3');
ASSET_MANAGER.queueDownload('./soundEffect/multi.mp3');
ASSET_MANAGER.queueDownload('./soundEffect/fireball.mp3');
ASSET_MANAGER.queueDownload('./soundEffect/bullet.mp3');
function loadGame(level) {
  ASSET_MANAGER.autoRepeat('./music/Revolution - AShamaluevMusic.mp3');
  var gameEngine = new GameEngine();

  PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

  const canvas = document.getElementById('gameWorld');
  const ctx = canvas.getContext('2d');

  PARAMS.CANVAS_WIDTH = canvas.width;

  gameEngine.init(ctx);

  new SceneManager(gameEngine, level);

  gameEngine.start();
}

ASSET_MANAGER.downloadAll(function () {
  loadGame(0);
});
