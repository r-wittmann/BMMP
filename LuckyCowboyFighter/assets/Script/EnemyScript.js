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
        //Will be triggered after being hit by player. This is so that a player
        //will only hit the enemy once with each punch.
        this.left = true;
        this.isStanding = false;
        this.animation.play("enemyRunLeftAnim_" + this.enemyType);
    },


    getPlayerDistance: function () {
        var playerPos = this.game.player.getPosition();
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    attack: function () {
        if (this.getPlayerDistance() < this.attackRadius) {
            this.isStanding = true;
            this.animation.play("enemyShootAnim_" + this.enemyType),
            this.node.runAction(
                cc.sequence(
                    cc.delayTime(2),
                    cc.callFunc(() => {
                        if(this.getPlayerDistance() < this.attackRadius) {
                            // this.game.player.getComponent('PlayerScript').health -= this.strength;
                            this.game.currentHealth -= this.strength;
                        }
                        this.isStanding = false;
                    })
                )
            )
        }
    },

    moveEnemy: function (dt){
        var playerX = this.game.player.getPositionX();
        var playerY = this.game.player.getPositionY();
        var xPos = this.node.x;
        var yPos = this.node.y;

        // Bewegung in y-Richtung
        if(yPos <= playerY){
          this.node.y += this.ySpeed * dt;
        }else {
          this.node.y -= this.ySpeed * dt;
        }

        // Bewegung in x-Richtung
        if (xPos <= playerX) {
            this.node.x += this.xSpeed * dt;
            this.left = false;
        } else {
            this.node.x -= this.xSpeed * dt;
            this.left = true;
        }

        var animationName = String(this.animation.currentClip.name);

        if(animationName.contains){
            if (this.left && !animationName.contains("enemyRunLeftAnim")) {
                this.animation.play("enemyRunLeftAnim_" + this.enemyType);
            } else if (!this.left && !animationName.contains("enemyRunRightAnim")) {
                this.animation.play("enemyRunRightAnim_" + this.enemyType);
            }
        } else
        // Animation
      {if (this.left && !animationName.includes("enemyRunLeftAnim")) {
            this.animation.play("enemyRunLeftAnim_" + this.enemyType);

        } else if (!this.left && !animationName.includes("enemyRunRightAnim")) {
            this.animation.play("enemyRunRightAnim_" + this.enemyType);
        }};

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
            }
        }
    },

    // called every frame
    update: function (dt) {
        if (!this.isStanding) this.attack();

        if (!this.isStanding) this.moveEnemy(dt);

        if(this.health <= 0) this.node.destroy();

        this.checkPlayerAttack();
    },
});
