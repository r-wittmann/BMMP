cc.Class({
    extends: cc.Component,

    properties: {
      
      parent: {
        default: null,
        type:cc.Node,
      }
    },

    // use this for initialization
    onLoad: function () {
        var playerScript = this.parent.getComponent("NinjaScript");

    },
     returnToStandardMode: function(){
             cc.log("DO IT!!");
             this.parent.getComponent("NinjaScript").punch = false;
             this.parent.getComponent("NinjaScript").shoot = false;
             this.parent.getComponent("NinjaScript").playAnimation();
        },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
