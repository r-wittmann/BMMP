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
        var playerScript = this.parent.getComponent("KnightScript");

    },
     returnToStandardMode: function(){
             cc.log("DO IT!!");
             this.parent.getComponent("KnightScript").punch = false;
             this.parent.getComponent("KnightScript").shoot = false;
             this.parent.getComponent("KnightScript").playAnimation();
        },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
