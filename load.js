var load_state = {

 preload: function() {
  // Change the background color of the game
  game.stage.backgroundColor = '16AAFF';
  if (dayOrNight == "day") {
   this.load.image('background', 'assets/backDay.png');
   game.load.image('pipe', 'assets/pipe.png');
  } else {
   this.load.image('background', 'assets/backNight.png');
   game.load.image('pipe', 'assets/pipeNight.png');
  }
  // Load the bird sprite
  game.load.image('logo', 'assets/ccLogo.png');

  game.load.image('upPipe', 'assets/pipeUp.png');
  game.load.image('downPipe', 'assets/pipeDown.png');
  game.load.spritesheet('bird', 'assets/bird.png', 712.5, 610, 2);
  game.load.audio('jumpSound', 'assets/boing.wav');
  game.load.audio('themeSong', 'assets/themeSong.mp3');

  game.load.audio('gameOver', 'assets/gameOver.wav');


 },

 create: function() {
  // When all assets are loaded, go to the 'menu' state
  this.game.state.start('menu');
 }
};