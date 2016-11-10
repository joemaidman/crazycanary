var live_state = {


  create: function () {
    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.jumpSound = game.add.audio('jumpSound');
    this.jumpSound.volume = config.volume;




    this.goSound = game.add.audio('gameOver');
    this.goSound.volume = config.volume;
    // Display the bird on the screen
    this.bg = this.add.tileSprite(0, 0, 400, 500, 'background');


    this.bird = this.game.add.sprite(100, 245, 'bird');
    this.bird.scale.setTo(config.playerScale, config.playerScale);

    this.bird.animations.add('fly');

    this.bird.animations.play('fly', 7, true);
    // Add gravity to the bird to make it fall
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;

    this.pipes = game.add.group(); // Create a group
    this.upPipes = game.add.group(); // Create a group  
    this.downPipes = game.add.group(); // Create a group    
    this.pipes.enableBody = true; // Add physics to the group
    this.upPipes.enableBody = true; // Add physics to the group  
    this.downPipes.enableBody = true; // Add physics to the group  
    this.pipes.createMultiple(20, 'pipe'); // Create 20 pipes
    this.upPipes.createMultiple(20, 'upPipe'); // Create 20 pipes 
    this.downPipes.createMultiple(20, 'downPipe'); // Create 20 pipes  
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
    this.timerBg = game.time.events.loop(30, this.moveBackground, this);
    // Call the 'jump' function when the spacekey is hit

    this.input.onDown.add(this.jump, this);
    //var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //spaceKey.onDown.add(this.jump, this);



    this.labelScore = game.add.text(this.game.world.width - 50, this.game.world.height - 50, "0", {
      font: "30px Verdana",
      fill: "red"
    });

    this.bird.anchor.setTo(0.5, 0.5);
  },


  update: function () {

    if (this.bird.angle < 20)
      this.bird.angle += 1;
    // If the bird is out of the world (too high or too low), call the 'restartGame' function
    if (this.bird.inWorld === false)

      this.restartGame();

    game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
    game.physics.arcade.overlap(this.bird, this.upPipes, this.hitPipe, null, this);
    game.physics.arcade.overlap(this.bird, this.downPipes, this.hitPipe, null, this);
  },

  render: function () {
    if (config.debug) {
      game.debug.body(this.bird);
    }
  },

  hitPipe: function () {
    // If the bird has already hit a pipe, we have nothing to do
    if (this.bird.alive === false)
      return;
    themeS.stop();

    this.goSound.play();
    // Set the alive property of the bird to false
    this.bird.alive = false;

    // Prevent new pipes from appearing
    game.time.events.remove(this.timer);
    game.time.events.remove(this.timerBg);

    // Go through all the pipes, and stop their movement
    this.pipes.forEachAlive(function (p) {
      p.body.velocity.x = 0;
    }, this);

    this.upPipes.forEachAlive(function (p) {
      p.body.velocity.x = 0;
    }, this);

    this.downPipes.forEachAlive(function (p) {
      p.body.velocity.x = 0;
    }, this);

  },

  moveBackground: function () {
    this.bg.tilePosition.x -= 1;

  },

  // Make the bird jump 
  jump: function () {

    if (this.bird.alive === false)
      return;
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -config.flapPower;
    this.jumpSound.play();
    // Create an animation on the bird
    var animation = game.add.tween(this.bird);

    // Set the animation to change the angle of the sprite to -20° in 100 milliseconds
    animation.to({
      angle: -20
    }, 100);

    // And start the animation
    animation.start();
  },

  // Restart the game
  restartGame: function () {
    // Start the 'main' state, which restarts the game
    themeS.stop();
    game.state.start('menu');
  },

  addOnePipe: function (x, y, pipeType) {
    // Get the first dead pipe of our group
    var pipe;

    if (pipeType === 0) {
      pipe = this.pipes.getFirstDead();

    } else if (pipeType === 1) {

      pipe = this.downPipes.getFirstDead();
    } else {

      pipe = this.upPipes.getFirstDead();
    }
    // Set the new position of the pipe
    pipe.reset(x, y);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200;

    // Kill the pipe when it's no longer visible 
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;

  },

  addRowOfPipes: function () {
    // Pick where the hole will be

    var hole = Math.floor(Math.random() * 7) + 1;
    var hole2 = hole + 1;
    var downHolePipe = hole - 1;
    var upHolePipe = hole2 + 1;
    var pType;
    // Add the 6 pipes 
    for (var i = 0; i < 10; i++) {

      if (i != hole && i != hole2) {


        if (i == downHolePipe) {

          pType = 1;
        } else if (i == upHolePipe) {
          pType = 2;
        } else {

          pType = 0;
        }

        this.addOnePipe(400, i * 50, pType);

      }
    }
    if (firstPipes === false) {
      score += 1;
      this.labelScore.text = score;
    }

    if (firstPipes === true) {
      firstPipes = false;
    }
  },

};