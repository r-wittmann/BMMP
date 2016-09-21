cc.Class({
    extends: cc.Component,

    properties: {
    	player: {
    		default: null,
    		type: cc.Node
    	},

    	background: {
    		default: null,
    		type: cc.Node
    	},
        winLoseLabel: {
            default: null,
            type: cc.Label
        },
        winDistance: 0,
        loseTimeout: 0
    },

    // use this for initialization
    onLoad: function () {
        // won and loseFlag are set to 0 by default. Once the player has won or lost, the flag will be set to 1. 
        // Once the winGame or loseGame function is called, the respective flag will be set to 2
        this.wonFlag = 0;
        this.loseFlag = 0;
        this.wonPositionX = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
    	let moveBackground = this.player.getComponent('PlayerScript').moveBackground;
        if (moveBackground !== 0) {
            this.background.getComponent('BackgroundScript').moveBackgroundChildren(moveBackground, dt);
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

        if (floor.x > 500 && this.loseFlag === 0) {
            this.loseFlag = 1;
            this.writeMessage('You lost. You will be returned to the Main Menu')
        } else if (this.loseFlag === 1) {
            this.loseFlag = 2;
            // player is returned to main menu after loseTimeout seconds
            this.scheduleOnce(() => this.loseGame(), this.loseTimeout);
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
        cc.director.loadScene('01startMenu');
    }
});
