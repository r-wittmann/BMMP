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
        var playerScript = this.parent.getComponent("PlayerScript");

    },
     returnToStandardMode: function(){
             this.parent.getComponent("PlayerScript").punch = false;
             this.parent.getComponent("PlayerScript").shoot = false;
             this.parent.getComponent("PlayerScript").playAnimation();
    },
    triggerAttackFromAnimation: function(){
        this.parent.getComponent("PlayerScript").forwardAttackToStage();
        
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
