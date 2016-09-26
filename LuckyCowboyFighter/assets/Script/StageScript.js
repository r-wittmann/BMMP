cc.Class({
    extends: cc.Component,

    properties: {
        prefabEnemy: {
            default: null,
            type: cc.Prefab
        },
        cowboy:{
            default: null,
            type: cc.Prefab
        },
        ninja:{
            default: null,
            type: cc.Prefab
        },
        knight:{
            default: null,
            type: cc.Prefab
        },
        maximumEnemies: 0,

    	background: {
    		default: null,
    		type: cc.Node
    	},
        winLoseLabel: {
            default: null,
            type: cc.Label
        },
        winDistance: 0,
        loseTimeout: 0,
        selectedCharacter: 0,
    },

    spawnNewEnemy: function (){
      var newEnemy = cc.instantiate(this.prefabEnemy);
      this.node.addChild(newEnemy);
      newEnemy.setPosition(this.getNewEnemyPosition());
      newEnemy.getComponent('EnemyScript').game = this;
    },

    getNewEnemyPosition: function () {
        var randomX = (cc.random0To1() * 500)+100;
        var randomY = (cc.random0To1() * -200)-100;
        return cc.p(randomX, randomY);
    },

    // use this for initialization
    onLoad: function () {
        // won and loseFlag are set to 0 by default. Once the player has won or lost, the flag will be set to 1.
        // Once the winGame or loseGame function is called, the respective flag will be set to 2
        this.wonFlag = 0;
        this.loseFlag = 0;
        this.wonPositionX = 0;
        this.currentEnemies = 0;
        this.selectedCharacter = cc.sys.localStorage.selectedCharacter  || 1;
        //this.selectedCharacter = 1;
        //this.player = cc.instantiate(this.cowboy);

        this.player = null;

        switch(this.selectedCharacter){
            case 1:
            this.player = cc.instantiate(this.cowboy);
            break;
            case 2:
            this.player = cc.instantiate(this.ninja);
            break;
            case 3:
            this.player = cc.instantiate(this.knight)
            break;

        }

        this.node.addChild(this.player);
        this.player.setPosition(cc.p(0,0));


    },

    // when player walks out of screen, players will be moved so they are "stuck"
    // to the ground
    moveEnemiesOnScreen: function (speed, direction, dt){
      //get all children and check if they are enemies
      var allChildren = this.node.getChildren();
      for (var i = 0; i < allChildren.length; i++){
        if(allChildren[i].getComponent('EnemyScript')){
          cc.log("AAAAHHHH " + allChildren[i].getComponent('EnemyScript').enemyType + " Nr. " + i);
          allChildren[i].x +=  direction * speed * dt;
        }
      }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
      if(this.currentEnemies < this.maximumEnemies){
        this.spawnNewEnemy();
        this.currentEnemies++;
      }


      //moves background and enemies when player walks to edges of the screen
    	let moveBackground = this.player.getComponent('PlayerScript').moveBackground;
        if (moveBackground !== 0) {
            this.background.getComponent('BackgroundScript').moveBackgroundChildren(moveBackground, dt);
            this.moveEnemiesOnScreen(this.player.getComponent('PlayerScript').playerTempo, moveBackground, dt);
        }

        let floor = this.background.getChildByName('Floor')

        // player wins and looses game, once he reaches a certain point in the world
        // this has to be replaced with the acutal win and lose criteria
        if (floor.x < -500 && this.wonFlag === 0) {
            this.wonFlag = 1;
            this.wonPositionX = floor.x;
            this.writeMessage('You Won! Continue to the right for the next Stage >>>');
        } else if (this.wonFlag === 1) {
            this.winGame(floor.x, this.wonPositionX)
        }

        if (this.player.getComponent('PlayerScript').health <= 0 && this.loseFlag === 0) {
            this.loseFlag = 1;
        } else if (this.loseFlag === 1) {
            this.loseFlag = 2;
            this.loseGame();
        }
    },

    writeMessage: function (message) {
        this.winLoseLabel.string = message;
    },
    winGame: function (floorX, wonPositionX) {
        // next stage is loaded after the player has continued to run the winDistance to the right
        if (floorX < wonPositionX - this.winDistance) {
            this.wonFlag = 2;
            // this loadScene has to load the next stage
            cc.director.loadScene('01startMenu');
        }
    },
    loseGame: function () {
        this.writeMessage('You lost. You will be returned to the Main Menu');
        // this.scheduleOnce(() => cc.director.loadScene('01startMenu'), this.loseTimeout);
        this.node.runAction(
            cc.sequence(
                cc.delayTime(this.loseTimeout),
                cc.callFunc(() => {
                    cc.director.loadScene('01startMenu')
                })
            )
        )
    }
});
