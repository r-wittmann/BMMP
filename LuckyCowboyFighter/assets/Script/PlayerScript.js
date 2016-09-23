cc.Class({
    extends: cc.Component,

    properties: {
        playerTempo: 0,

        animation:{
        default: null,
        type:cc.Animation,
        },

 
    },

    // use this for initialization
    onLoad: function () {
      this.animation.play("standStillAnim_Cowboy"); 
        //-1:move to right; 0: do not move; 1:move to left
        this.moveBackground = 0;
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.punch = false;
        this.shoot = false;

        this.setInputControl();
        this.playerDirection = 1;
      

    },

    setInputControl: function(){
         var self = this;
        // add keyboard event listener
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // When there is a key being pressed down, judge if it's the designated directional button and set up acceleration in the corresponding direction
            onKeyPressed: function(keyCode, event) {
           

           			if(self.punch == false && self.shoot == false) {
                    switch(keyCode) {					 
                    case cc.KEY.left:
                    	self.moveBackground = 0;
                    	self.right = false;
                    	if(self.left == false){
                    		self.left = true;
                    		self.playAnimation();
                    	}
                        break;
                    case cc.KEY.right:
                    	self.moveBackground = 0;
                    	self.left = false;
                    	if(self.right == false){
                    		self.right = true;
                    		self.playAnimation();
                    	}
                        break;
                    case cc.KEY.up:
						if(self.up == false){                    
	                        self.up = true;
	                        self.playAnimation();
	                    }
                        break;
                    case cc.KEY.down:
                    	if(self.down == false){
                       	 	self.down = true;
                        	self.playAnimation();
                    	}
                        break;
                    case cc.KEY.space:
                    	cc.log("space");
                    	//self.animation.play("punchAnimRight_Cowboy");
                    	this.punch = true;
                    	self.playPunchAnimation();
                    	break;
                    case cc.KEY.x:
                    	cc.log("x");
                    	this.shoot = true;
                    	self.playShootAnimation();
                    	break;

                    }
                   

                }
            },
            // when releasing the button, stop acceleration in this direction
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.left:
                        self.left = false;
                        self.moveBackground = 0;
                        self.playAnimation();
                        break;
                    case cc.KEY.right:
                        self.right = false;
                        self.moveBackground = 0;
                        self.playAnimation();
                        break;
                    case cc.KEY.up:
                        self.up = false;
                        self.playAnimation();
                        break;
                    case cc.KEY.down:                    	
                        self.down = false;
                        self.playAnimation();
                        break;
                    case cc.KEY.space:
                    	//self.punch = false;
                    	cc.log("space up")
                    	//self.playAnimation();
                    	break;
                }
            }
        }, self.node);

    },

    playAnimation: function(){
 
    	this.playerDirection = this.node.getChildByName("PlayerAnimation").scaleX;

    	if(this.left){
    		this.animation.play("runAnimLeft_Cowboy");    		
    	}else if(this.right ){
    		this.animation.play("runAnimRight_Cowboy");     		
    	}else if((this.playerDirection == -1 && (this.up || this.down))){
    		this.animation.play("runAnimLeft_Cowboy"); 
    	}else if((this.playerDirection == 1 && (this.up || this.down))){
    		this.animation.play("runAnimRight_Cowboy"); 
    	}else {
    		this.animation.play("standStillAnim_Cowboy");
    	}

    	
    },

    playPunchAnimation : function(){
    	this.animation.play("punchAnim_Cowboy");
    },

    playShootAnimation: function(){
    	this.animation.play("shootAnim_Cowboy");
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
        
        if(this.left == true){
            if(this.node.x > -400) {
                this.node.x = this.node.x - this.playerTempo * dt;
            } else {
                this.moveBackground = 1;
            }
        } else if(this.right == true){
            if(this.node.x <  400) {
                this.node.x = this.node.x + this.playerTempo * dt;
            } else {
                this.moveBackground =  -1;
            }
        }
        

        if(this.up == true  && this.node.y < -80){
            this.node.y = this.node.y + (this.playerTempo/2) * dt;
        }else if(this.down == true  && this.node.y > -250){
            this.node.y = this.node.y - (this.playerTempo/2) * dt;
        }

        if(this.punch  == true) cc.log("punch = TRUE")

    },
     doOtherStuff: function(){
     	cc.log("JUST DO IT!");
     } 
});
