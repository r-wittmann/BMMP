cc.Class({
    extends: cc.Component,

    properties: {
        attackRadius: 0
    },

    // use this for initialization
    onLoad: function () {
    },


    getPlayerDistance: function () {
        var playerPos = this.game.player.getPosition();
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    attack: function() {
        //this.game.spawnNewStar();
        //this.game.gainScore();
        this.node.destroy();
    },

    // called every frame
    update: function (dt) {
        if (this.getPlayerDistance() < this.attackRadius) {
            this.attack();
            return;
        }
    },
});
