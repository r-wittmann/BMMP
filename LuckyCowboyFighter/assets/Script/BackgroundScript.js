cc.Class({
    extends: cc.Component,

    properties: {
        secondBackground: {
            default: null,
            type: cc.Node
        },
        firstBackground: {
            default: null,
            type: cc.Node
        },
        floor: {
            default: null,
            type: cc.Node
        },
        rainAnimation: {
            default: null,
            type: cc.Animation
        } 
    },

    // use this for initialization
    onLoad: function () {
        this.rainAnimation && this.rainAnimation.play('rainAnim')
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    moveBackgroundChildren: function (direction, dt) {
        //this.floor.x = this.floor.x + 200 * dt * direction;
        var floor = this.node.getChildByName("Floor");
        var firstBackground = this.node.getChildByName("FirstBackground");
        var secondBackground = this.node.getChildByName("SecondBackground");

        this.moveSprites(floor.getChildByName('FloorSprite1'), floor.getChildByName('FloorSprite2'), 200, direction, dt);
        this.moveSprites(firstBackground.getChildByName('FirstBackgroundSprite1'), firstBackground.getChildByName('FirstBackgroundSprite2'), 100, direction, dt);
        this.moveSprites(secondBackground.getChildByName('SecondBackgroundSprite1'), secondBackground.getChildByName('SecondBackgroundSprite2'), 10, direction, dt);

    },
    moveSprites: function (sprite1, sprite2, speed, direction, dt) {
        sprite1.x = sprite1.x + speed * dt * direction;
        sprite2.x = sprite2.x + speed * dt * direction;

        let sprite1Width = sprite1.getBoundingBox().size.width;
        let sprite2Width = sprite2.getBoundingBox().size.width;

        if (sprite1.x < -sprite1Width) {
            sprite1.x += sprite1Width * 2;
        } 
        if (sprite2.x < -sprite2Width) {
            sprite2.x += sprite2Width * 2;
        }

        if (sprite1.x > sprite1Width) {
            sprite1.x -= sprite1Width * 2;
        } else if (sprite2.x > sprite2Width) {
            sprite2.x -= sprite2Width * 2;
        }
    }
});
