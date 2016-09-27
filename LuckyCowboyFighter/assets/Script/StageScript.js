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
        attackWaves: 0,
        enemyStrengthFactor: 0,
    	background: {
    		default: null,
    		type: cc.Node
    	},
        winLoseLabel: {
            default: null,
            type: cc.Label
        },
        profile: {
            default: null,
            type: cc.Node
        },
        experienceBar : {
            default: null,
            type: cc.Node
        },
        healthBar : {
            default: null,
            type: cc.Node
        },
        strengthLabel: {
            default: null,
            type: cc.Label
        },
        winDistance: 0,
        loseTimeout: 0,
        selectedCharacter: 0,

    },

    spawnNewEnemy: function (){
        // if(this.currentEnemies < this.maximumEnemies){
        //     this.spawnNewEnemy();
        //     this.currentEnemies++;
        //   }
        let distanceFactor = -1;
        for (let currentEnemies = 0; currentEnemies < this.maximumEnemies; currentEnemies++) {
            if (currentEnemies % (this.maximumEnemies / this.attackWaves) === 0) {
                distanceFactor++
            }

            var newEnemy = cc.instantiate(this.prefabEnemy);
            this.node.addChild(newEnemy);
            newEnemy.getComponent('EnemyScript').game = this;
            newEnemy.getComponent('EnemyScript').health *= this.enemyStrengthFactor;
            newEnemy.getComponent('EnemyScript').strength *= this.enemyStrengthFactor;
            newEnemy.setPosition(this.getNewEnemyPosition(distanceFactor))
        }
    },

    getNewEnemyPosition: function (factor) {
        var randomX = ((cc.random0To1() * 500 * (factor + 1)) + 100) + (factor * 2000);
        var randomY = (cc.random0To1() * -200) - 100;
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


        if (!cc.sys.localStorage.selectedCharacter) {
            cc.sys.localStorage = {
                selectedCharacter: 1,
                characterHealth: 100,
                currentHealth: 100,
                characterStrength: 20,
                characterExperience: 0,
                characterLevel: 1,
                stage: 1
            }
        }

        
        this.localStorageObject = cc.sys.localStorage

        this.selectedCharacter = parseInt(this.localStorageObject.selectedCharacter)
        this.currentHealth = parseInt(this.localStorageObject.currentHealth)
        this.characterExperience = parseInt(this.localStorageObject.characterExperience)

        this.profile._children[this.selectedCharacter - 1].opacity = 255
        this.healthBar.getChildByName('ProgressBar')._components[1].progress = this.currentHealth / parseInt(this.localStorageObject.characterHealth)
        this.experienceBar.getChildByName('ProgressBar')._components[1].progress = (this.characterExperience % 100) / 100
        this.strengthLabel.string = this.localStorageObject.characterStrength

        this.player;

        switch(this.selectedCharacter){
            case 1:
            this.player = cc.instantiate(this.cowboy);
            break;
            case 2:
            this.player = cc.instantiate(this.knight);
            break;
            case 3:
            this.player = cc.instantiate(this.ninja)
            break;

        }

        this.node.addChild(this.player);
        this.player.setPosition(cc.p(-300,-200));

        this.spawnNewEnemy();

    },

    // when player walks out of screen, players will be moved so they are "stuck"
    // to the ground
    moveEnemiesOnScreen: function (speed, direction, dt){
      //get all children and check if they are enemies
      var allChildren = this.node.getChildren();
      for (var i = 0; i < allChildren.length; i++){
        if(allChildren[i].getComponent('EnemyScript')){
          allChildren[i].x +=  direction * speed * dt;
        }
      }
    },

    updateBars: function () {
        this.healthBar.getChildByName('ProgressBar')._components[1].progress = this.currentHealth / parseInt(this.localStorageObject.characterHealth)
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

      //moves background and enemies when player walks to edges of the screen
    	let moveBackground = this.player.getComponent('PlayerScript').moveBackground;
        if (moveBackground !== 0) {
            this.background.getComponent('BackgroundScript').moveBackgroundChildren(moveBackground, dt);
            this.moveEnemiesOnScreen(this.player.getComponent('PlayerScript').playerTempo, moveBackground, dt);
        }

        let remainingEnemies = []
        //for (let child of this.node.getChildren()) {
        for( var i = 0; i < this.node.getChildren().length; i++ ){
            var child = this.node.getChildren()[i];
            if (child.getComponent('EnemyScript') && child.active) {
                remainingEnemies.push(child);
            }   
        }

        if (remainingEnemies.length === 0 && this.wonFlag === 0) {
            this.wonFlag = 1;
            this.wonPositionX = this.background.getChildByName('SecondBackground').getChildByName('SecondBackgroundSprite1').x
            this.writeMessage('You Won! Continue to the right for the next Stage >>>');

            cc.sys.localStorage.currentHealth = this.currentHealth;
            cc.sys.localStorage.stage = parseInt(cc.sys.localStorage.stage) + 1;

        } else if (this.wonFlag === 1) {
            
            this.winGame(this.background.getChildByName('SecondBackground').getChildByName('SecondBackgroundSprite1').x, this.wonPositionX)
        }

        if (this.currentHealth <= 0 && this.loseFlag === 0) {
            this.loseFlag = 1;
        } else if (this.loseFlag === 1) {
            this.loseFlag = 2;
            this.loseGame();
        }

        this.updateBars()
    },

    writeMessage: function (message) {
        this.winLoseLabel.string = message;
    },
    winGame: function (currentPosition, wonPositionX) {
        // next stage is loaded after the player has continued to run the winDistance to the right
        if (currentPosition < wonPositionX - this.winDistance) {
            this.wonFlag = 2;
            // this loadScene has to load the next stage
            if (parseInt(cc.sys.localStorage.stage) <= 6) {
                cc.director.loadScene('Stages/stage0' + cc.sys.localStorage.stage);
            } else {
                cc.director.loadScene('01startMenu');
            }
        }
    },
    loseGame: function () {
        this.writeMessage('You lost. You will be returned to the Main Menu');
        this.player.getComponent('PlayerScript').loseGame();

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
