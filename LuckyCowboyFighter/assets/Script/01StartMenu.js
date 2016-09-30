cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        buttonStartGame: {
            default: null,
            type: cc.Button
        },
        buttonImprint: {
            default: null,
            type: cc.Button
        },
        buttonManual: {
            default: null,
            type: cc.Button
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },



    // use this for initialization
    onLoad: function () {
        this.changeScene = require('ChangeSceneScript')
        this.changeScene.fadeIn(cc.director);
    },

    // called every frame
    update: function (dt) {

    },

    // start game function
    startGame: function () {
        this.changeScene.loadScene(cc.director, '02characterSelect');
    },

    // open imprint
    openImprint: function () {
        this.node.getChildByName('Imprint').runAction(cc.moveTo(0.3, 0, 0))
    },
    closeImprint: function () {
        this.node.getChildByName('Imprint').runAction(cc.moveTo(0.3, 0, -700))
    },

    // open manual
    openManual: function () {
        cc.sys.localStorage = {
            selectedCharacter: 1,
            characterHealth: 500,
            currentHealth: 500,
            characterStrength: 20,
            characterExperience: 0,
            characterLevel: 1,
            characterAttackRadius: 50,
            stage: 10
        }
        this.changeScene.loadScene(cc.director, 'Tutorial');
    },
});
