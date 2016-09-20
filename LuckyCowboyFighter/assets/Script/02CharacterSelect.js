cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        character1: {
            default: null,
            type: cc.Button
        },
        character2: {
            default: null,
            type: cc.Button
        },
        character3: {
            default: null,
            type: cc.Button
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

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    character1Select: function () {
        this.characterSelect(0);
    },
    character2Select: function () {
        this.characterSelect(1);
    },
    character3Select: function () {
        this.characterSelect(2);
    },
    
    //back to menu
    goBackToMenu: function () {
        cc.director.loadScene('01startMenu');
    },
    //start game
    goToGame: function () {
        cc.director.loadScene('Stages/stage01');
    },
    //character select
    characterSelect: function (character) {
        cc.log('Selected Character: ' + character);
    },
});
