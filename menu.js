var menu_state = {
 create: function() {
  // Call the 'start' function when pressing the spacebar
  //var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  //space_key.onDown.add(this.start, this); 
  themeS = game.add.audio('themeSong');
  themeS.volume = 0.5;
  themeS.play();
  var x = game.world.width / 2,
   y = game.world.height / 2;
  this.bg = this.add.tileSprite(0, 0, 400, 500, 'background');
  this.logo = this.game.add.sprite(x, y - 100, 'logo');
  this.logo.anchor.setTo(0.5, 0.5);
  this.input.onDown.add(this.start, this);
  // Defining variables
  var style = {
   font: "16px Verdana",
   fill: "#ffffff"
  };
  //this.labelSound = game.add.text(25, this.game.world.height - 50, "0", {
  //    font: "14px Verdana",
  //     fill: "green"
  // });
  //this.labelSound.text = "Sound on";
  //this.labelSound.inputEnabled = true;
  //this.labelSound.events.onInputDown.add(this.soundOnOff, this);
  this.timerBg = game.time.events.loop(30, this.moveBackground, this);
  // Adding a text centered on the screen
  var text = this.game.add.text(x, y, "Tap to start", style);
  text.anchor.setTo(0.5, 0.5);

  // If the user already played
  if (score >= 0 && firstPlay == false) {
   // Display its score
   var score_label = this.game.add.text(x, y + 50, "You scored: " + score, style);
   score_label.anchor.setTo(0.5, 0.5);
  }
 },
 moveBackground: function() {
  this.bg.tilePosition.x -= 1;

 },

 soundOnOff: function() {
  if (soundOF == true) {

   soundOF = false;
   themeS.volume = 0;
   this.jumpSound.volume = 0;
   this.goSound.volume = 0;
   this.labelSound.fill = "red";
   this.labelSound.text = "Sound off";
  } else {

   soundOF = true;
   themeS.volume = 0.5;
   this.jumpSound.volume = 0.05;
   this.goSound.volume = 0.05;
   this.labelSound.fill = "green";
   this.labelSound.text = "Sound on";
  }

 },
 // Start the actual game
 start: function() {

  firstPipes = true;
  score = 0;
  firstPlay = false;
  this.game.state.start('live');
 }
};