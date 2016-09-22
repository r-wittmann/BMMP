cc.Class({
    extends: cc.Component,

    properties: {
        attackRadius: 0,
        xSpeed: 0,
        ySpeed: 0,
    },

    // use this for initialization
    onLoad: function () {
        //Will be triggered after being hit by player. This is so that a player
        //will only hit the enemy once with each punch. 
        this.isStanding = false;
        this.isAlive = true;
    },


    getPlayerDistance: function () {
        var playerPos = this.game.player.getPosition();
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    attack: function() {
        //this.game.spawnNewStar();
        //this.game.gainScore();
        //this.attackAction = cc.sequence(
        //    cc.spawn(cc.log(this.node.x)),
        //    cc.delayTime(2),
        //    cc.spawn(cc.log(this.isStanding)),
        //    cc.spawn(this.node.x = this.node.x + 50, this.isStanding = false, this.node.destroy())
        //);

        cc.log(this.game.player.x);
        cc.log(this.game.player.playerDirection);
        if(this.game.player.x > this.node.x){
          this.game.player.runAction(cc.moveBy(0.1, 100, 0));
        }else{
          this.game.player.runAction(cc.moveBy(0.1, -100, 0));
        }
        if (this.isAlive){
            this.node.runAction(
                cc.sequence(
                    cc.delayTime(2),
                    cc.sequence(
                        cc.moveBy(0.1, 300, 50),
                        cc.delayTime(1),
                        cc.callFunc(this.node.destroy, this.node)
                    )
                )
            );
            this.isAlive = false;
        }
    },

    moveEnemy: function(dt){
        var playerX = this.game.player.getPositionX();
        var playerY = this.game.player.getPositionY();
        var xPos = this.node.x;
        var yPos = this.node.y;

        if(!this.isStanding){
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
        }
    },

    // called every frame
    update: function (dt) {
        if (this.getPlayerDistance() < this.attackRadius) {
            this.isStanding = true;
            this.attack();
            return;
        }
        this.moveEnemy(dt);
    },
});
