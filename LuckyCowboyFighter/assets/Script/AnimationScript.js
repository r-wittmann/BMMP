cc.Class({
    extends: cc.Component,

    properties: {

      parent: {
        default: null,
        type:cc.Node,
      },
      stepAudio:{
        default: null,
        url: cc.AudioClip
      },
      punchAudio:{
        default: null,
        url: cc.AudioClip
      },
      shootAudio:{
        default: null,
        url: cc.AudioClip
      },

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

    triggerBullet: function(){
      this.parent.getComponent("PlayerScript").forwardBulletAttackToStage();
    },

    playFootstepSound: function(){   
        cc.audioEngine.playEffect(this.stepAudio, false);
    },
    playPunchSound: function(){
        cc.audioEngine.playEffect(this.punchAudio, false);
    },
    playShootSound: function(){
        cc.audioEngine.playEffect(this.shootAudio, false);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
