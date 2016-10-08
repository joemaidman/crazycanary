// Initialize Phaser
var game = new Phaser.Game(400, 500, Phaser.CANVAS, 'gamediv');
var soundOF = true;
// Our 'score' global variable
var dayOrNight;
var themeS;
var ran = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
console.log(ran);
if (ran == 0) {

 dayOrNight = "day";
} else {

 dayOrNight = "night";
}
var score = 0;
var firstPipes = true;
var firstPlay = true;
// Define all the states
game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('live', live_state);

// Start with the 'load' state
game.state.start('load');