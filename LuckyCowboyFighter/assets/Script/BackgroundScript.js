cc.Class({
    extends: cc.Component,

    properties: {
        secondBackground: {
            default: null,
            type: cc.Sprite
        },
        firstBackground: {
            default: null,
            type: cc.Sprite
        },
        floor: {
            default: null,
            type: cc.Sprite
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    moveBackgroundChildren: function (direction, dt) {
        cc.log('moveBackgroundChildren');
        cc.log("direction" + direction);
        cc.log("dt" + dt);
        cc.log(this.floor.x);
        //this.floor.x = this.floor.x + 200 * dt * direction;
        var floor = this.node.getChildByName("Floor");
        var firstBackground = this.node.getChildByName("FirstBackground");
        var secondBackground = this.node.getChildByName("SecondBackground");

        floor.x = floor.x + 200 * dt * direction;
        firstBackground.x = firstBackground.x + 100 * dt * direction;
        secondBackground.x = secondBackground.x + 3 * dt * direction;
    }
});
