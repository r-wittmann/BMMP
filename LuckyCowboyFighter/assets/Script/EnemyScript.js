cc.Class({
    extends: cc.Component,

    properties: {
        attackRadius: 0,
        xSpeed: 0,
        ySpeed: 0,
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

    moveEnemy: function(dt){
        var playerX = this.game.player.getPositionX();
        var playerY = this.game.player.getPositionY();
        var xPos = this.node.x;
        var yPos = this.node.y;

        if(yPos <= playerY){
          this.node.y = yPos + this.ySpeed * dt;
        }else{
          this.node.y = yPos - this.ySpeed * dt;
        }

        if(xPos <= playerX){
          this.node.x = xPos + this.xSpeed * dt;
        }else{
          this.node.x = xPos - this.xSpeed * dt;
        }
    },

    // called every frame
    update: function (dt) {
        if (this.getPlayerDistance() < this.attackRadius) {
            this.attack();
            return;
        }
        this.moveEnemy(dt);
    },
});
