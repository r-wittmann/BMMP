cc.Class({
    extends: cc.Component,

    properties: {
        character1: {
            default: null,
            type: cc.Node
        },
        character2: {
            default: null,
            type: cc.Node
        },
        character3: {
            default: null,
            type: cc.Node
        },
        backToMenu: {
            default: null,
            type: cc.Button
        },
        startGame: {
            default: null,
            type: cc.Button
        },
        character1animation: {
            default: null,
            type: cc.Animation
        },
        character2animation: {
            default: null,
            type: cc.Animation
        },
        character3animation: {
            default: null,
            type: cc.Animation
        }
    },

    // use this for initialization
    onLoad: function () {
        this.selectedCharacter = null;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    character1Select: function () {
        this.selectedCharacter = 1;
        this.character1animation.play('selectAnim_Cowboy');
        this.node.getChildByName('Character2').getChildByName('Profile').scale = 1;
        this.node.getChildByName('Character3').getChildByName('Profile').scale = 1;
    },
    character2Select: function () {
        this.selectedCharacter = 2;
        this.character2animation.play('selectAnim_Knight');
        this.node.getChildByName('Character1').getChildByName('Profile').scale = 1;
        this.node.getChildByName('Character3').getChildByName('Profile').scale = 1;
    },
    character3Select: function () {
        this.selectedCharacter = 3;
        this.character3animation.play('selectAnim_Ninja');
        this.node.getChildByName('Character1').getChildByName('Profile').scale = 1;
        this.node.getChildByName('Character2').getChildByName('Profile').scale = 1;
    },
    
    //back to menu
    goBackToMenu: function () {
        cc.director.loadScene('01startMenu');
    },
    //start game
    goToGame: function () {
        cc.director.loadScene('Stages/stage01');
        cc.sys.localStorage.selectedCharacter = this.selectedCharacter;
    },
});
