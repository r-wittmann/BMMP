cc.Class({
    extends: cc.Component,

    properties: {
        attackRadius: 0,
        xSpeed: 0,
        ySpeed: 0,
        animation:{
        default: null,
        type:cc.Animation,
        },
        strength: 0,
        health: 0,
    },

    // use this for initialization
    onLoad: function () {
        //Will be triggered after being hit by player. This is so that a player
        //will only hit the enemy once with each punch.
        this.isStanding = false;
        this.isAttacking = false;
    },


    getPlayerDistance: function () {
        var playerPos = this.game.player.getPosition();
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    attack: function () {
        // triggerAnimation
        this.isAttacking = true;
        this.node.runAction(
            cc.sequence(
                cc.delayTime(5),
                cc.callFunc(() => {
                    if (Math.abs(this.node.x - this.game.player.x) < this.attackRadius) {
                        this.game.player.getComponent('PlayerScript').health -= this.strength;
                    }
                    this.isAttacking = false;
                    this.isStanding = false;
                    cc.log(this.game.player.getComponent('PlayerScript').health)
                })
            )
        )
        
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

    checkPlayerAttack: function () {
        let playerDirection = this.game.player.getChildByName('PlayerAnimation').scaleX;
        let playerX = this.game.player.getPositionX();
        let playerY = this.game.player.getPositionY();
        let playerStrength = this.game.player.getComponent('PlayerScript').strength;
        let enemyX = this.node.x;
        let enemyY = this.node.y;
        let playerPunch = this.game.player.getComponent('PlayerScript').punch;
        //let playerAttackRadius = this.game.player.getComponent('PlayerScript').attackRadius;
        let playerAttackRadius = 100;

        if(((enemyX - playerX <= 0 && playerDirection <= 0) || (enemyX - playerX >= 0 && playerDirection >= 0)) && playerPunch) {
            if(Math.abs(enemyY - playerY) <= 100 && playerAttackRadius >= Math.abs(enemyX - playerX)){
                this.health -= playerStrength;
                cc.warn('playerx: ', playerX, 'playerY: ', playerY);
                cc.warn('enemyX: ', enemyX, 'enemyY: ', enemyY);
            }
        }
    },

    // called every frame
    update: function (dt) {
        if (this.getPlayerDistance() < this.attackRadius) {
            this.isStanding = true;
            if (!this.isAttacking) {
                this.attack();
            }
            return;
        }
        this.moveEnemy(dt);

        this.checkPlayerAttack();

        if(this.health <= 0) {
            this.node.destroy();
        }
    },
});
