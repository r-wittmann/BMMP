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
    },
    character2Select: function () {
        this.selectedCharacter = 2;
    },
    character3Select: function () {
        this.selectedCharacter = 3;
    },
    
    //back to menu
    goBackToMenu: function () {
        cc.director.loadScene('01startMenu');
    },
    //start game
    goToGame: function () {
        cc.director.loadScene('Stages/stage01');
        // this.selectedCharacter an nächste Scene übergeben
    },
});
