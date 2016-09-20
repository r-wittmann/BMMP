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
    	}
 
    },

    // use this for initialization
    onLoad: function () {


    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
    	let moveBackground = this.player.getComponent('PlayerScript').moveBackground;
    	moveBackground !== 0 && this.background.getComponent('BackgroundScript').moveBackgroundChildren(moveBackground, dt);
    },
});
