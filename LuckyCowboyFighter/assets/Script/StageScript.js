cc.Class({
    extends: cc.Component,

    properties: {
    	player: {
    		default: null,
    		type: cc.Sprite
    	},

    	background: {
    		default: null,
    		type: cc.Node
    	},
        winLoseLabel: {
            default: null,
            type: cc.Label
        },
        winDistance: 0
    },

    // use this for initialization
    onLoad: function () {
        this.wonFlag = false;
        this.wonPositionX = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
    	let moveBackground = this.player.getComponent('PlayerScript').moveBackground;
        if (moveBackground !== 0) {
            this.background.getComponent('BackgroundScript').moveBackgroundChildren(moveBackground, dt);
        }
        
        let floor = this.background.getChildByName('Floor')
        // winGameMessage is, at the moment, called, when the player reaches a certain point in the world
        // this, of course, has to be replaced by a better way to check, whether the player has won (all enemies dead for example)
        if (floor.x < -500 && !this.wonFlag) {
            this.wonFlag = true;
            this.wonPositionX = floor.x;
            this.winGameMessage();
        } else if (this.wonFlag) {
            this.winGame(floor.x, this.wonPositionX)
        }
    },

    winGameMessage: function () {
        this.winLoseLabel.string = 'You Won! Continue to the right for the next Stage >>>';
    },
    winGame: function (floorX, wonPositionX) {
        if (floorX < wonPositionX - this.winDistance) {
            this.wonFlag = false;
            // this loadScene has to load the next stage
            cc.director.loadScene('01startMenu')
        }
    }
});
