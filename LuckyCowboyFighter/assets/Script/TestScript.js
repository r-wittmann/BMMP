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

    },
     doSomething: function(){
             cc.log("DO IT!!");
             this.parent.getComponent("PlayerScript").doOtherStuff();
             cc.log(this.parent.getComponent("PlayerScript").punch );
             this.parent.getComponent("PlayerScript").punch = false;
             cc.log(this.parent.getComponent("PlayerScript").punch );
             this.parent.getComponent("PlayerScript").playAnimation();
                  },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
