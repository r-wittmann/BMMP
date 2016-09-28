cc.Class({
    extends: cc.Component,

    properties: {
        attackRadius: 0,
        xSpeed: 0,
        ySpeed: 0,
        animation: {
            default: null,
            type: cc.Animation,
        },
        strength: 0,
        health: 0,
        enemyType: 'dummy',
        
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
