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
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    character1Select: function () {
        this.character1animation.play('selectAnim_Cowboy');
        this.character1.getChildByName('Stats').opacity = 255;
        this.character2.getChildByName('Stats').opacity = 0;
        this.character3.getChildByName('Stats').opacity = 0;
        cc.sys.localStorage = {
            selectedCharacter: 1,
            characterHealth: 100,
            currentHealth: 100,
            characterStrength: 20,
            characterExperience: 0,
            characterLevel: 1,
            characterAttackRadius: 50,
            stage: 1
        }
    },
    character2Select: function () {
        this.character2animation.play('selectAnim_Knight');
        this.character1.getChildByName('Stats').opacity = 0;
        this.character2.getChildByName('Stats').opacity = 255;
        this.character3.getChildByName('Stats').opacity = 0;
        cc.sys.localStorage = {
            selectedCharacter: 2,
            characterHealth: 200,
            currentHealth: 200,
            characterStrength: 30,
            characterExperience: 0,
            characterLevel: 1,
            characterAttackRadius: 120,
            stage: 1
        }
    },
    character3Select: function () {
        this.character3animation.play('selectAnim_Ninja');
        this.character1.getChildByName('Stats').opacity = 0;
        this.character2.getChildByName('Stats').opacity = 0;
        this.character3.getChildByName('Stats').opacity = 255;
        cc.sys.localStorage = {
            selectedCharacter: 3,
            characterHealth: 50,
            currentHealth: 50,
            characterStrength: 15,
            characterExperience: 0,
            characterLevel: 1,
            characterAttackRadius: 90,
            stage: 1
        }
    },
    
    //back to menu
    goBackToMenu: function () {
        cc.director.loadScene('01startMenu');
    },
    //start game
    goToGame: function () {
        cc.director.loadScene('Stages/stage01');
    },
});
