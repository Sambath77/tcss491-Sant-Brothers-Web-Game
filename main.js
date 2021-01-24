
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/gunfire.png");

ASSET_MANAGER.downloadAll(function () {
  var gameEngine = new GameEngine();

  PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");

  PARAMS.CANVAS_WIDTH = canvas.width;

  gameEngine.init(ctx);

  new SceneManager(gameEngine);

  gameEngine.start();

});
