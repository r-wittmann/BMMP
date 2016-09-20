cc.Class({
    extends: cc.Component,

    properties: {
        playerTempo: 0,
 
    },

    // use this for initialization
    onLoad: function () {
        //-1:move to right; 0: do not move; 1:move to left
        this.moveBackground = 0;
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        this.setInputControl();

    },

    setInputControl: function(){
         var self = this;
        // add keyboard event listener
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // When there is a key being pressed down, judge if it's the designated directional button and set up acceleration in the corresponding direction
            onKeyPressed: function(keyCode, event) {
           
                    switch(keyCode) {
                    case cc.KEY.left:
                        self.left = true;
                        break;
                    case cc.KEY.right:
                        self.right = true;
                        break;
                    case cc.KEY.up:
                        self.up = true;
                        break;
                    case cc.KEY.down:
                        self.down = true;
                        break;
                }
            },
            // when releasing the button, stop acceleration in this direction
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.left:
                        self.left = false;
                        self.moveBackground = 0;
                        break;
                    case cc.KEY.right:
                        self.right = false;
                        self.moveBackground = 0;
                        break;
                    case cc.KEY.up:
                        self.up = false;
                        break;
                    case cc.KEY.down:
                        self.down = false;
                        break;
                }
            }
        }, self.node);

    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
        
        if(this.left == true){
            if(this.node.x > -400) {
                this.node.x = this.node.x - this.playerTempo * dt
            } else {
                this.moveBackground = -1
            }
        } else if(this.right == true){
            if(this.node.x <  400) {
                this.node.x = this.node.x + this.playerTempo * dt
            } else {
                this.moveBackground =  1
            }
        }
        

        if(this.up == true  && this.node.y < 50){
            this.node.y = this.node.y + this.playerTempo * dt;
        }else if(this.down == true  && this.node.y > -180){
            this.node.y = this.node.y - this.playerTempo * dt;
        }

    },
});
