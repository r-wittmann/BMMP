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
        this.label.string = this.text;
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
        cc.log('openImprint');
    },

    // open manual
    openManual: function () {
        cc.log('openManual');
    },
});
