cc.Class({
    extends: cc.Component,

    properties: {
        stepAudio:{
        default: null,
        url: cc.AudioClip
      },
      punchAudio:{
        default: null,
        url: cc.AudioClip
      },
    },

    // use this for initialization
    onLoad: function () {

    },

    playFootstepSound: function(){
        cc.audioEngine.playEffect(this.stepAudio, false);
    },
    playPunchSound: function(){
        cc.audioEngine.playEffect(this.punchAudio, false);

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
