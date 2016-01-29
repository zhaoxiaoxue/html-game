function game(){
 this.clientw=document.documentElement.clientWidth;
 this.clienth=document.documentElement.clientHeight;
 this.letterArr=["A","B","C","D","E","F","G","H","I","J","K"];
 this.letterLen=5;
 this.speed=3;
 this.spans=[];
 this.currArr=[];
 this.currPosArr=[];
 this.die=10;
 this.sore=0;
 this.soreEle=document.getElementsByClassName("sore")[0].getElementsByTagName("span")[1];
 this.dieEle=document.getElementsByClassName("die")[0].getElementsByTagName("span")[1];
 this.aa=1;
 this.currSore=0;
  this.num=10;
}
game.prototype={
   play:function(){
       //将字母显示到body里面 
       this.getLetter(this.letterLen);
       this.move();
       this.key();
   },
    key:function(){

        var that=this;
      document.onkeydown=function(e){
          var ev=e||window.event;
          var code=String.fromCharCode(ev.keyCode);
          for(var i=0;i<that.spans.length;i++){
              if(that.spans[i].innerHTML==code){
                  document.body.removeChild(that.spans[i]);
                  that.spans.splice(i,1);                 
                  that.currArr.splice(i,1);
                  that.currPosArr.splice(i,1);
                  that.getLetter(1);
                  that.sore++;
                  that.currSore++;
                  that.soreEle.innerHTML=that.sore;
                  if(that.currSore%that.num==0){
                      that.aa++;                     
                      // alert("第"+that.aa+"关");
                      clearInterval(this.t);
                      $('.plane .start').css({display:'block'});
                      $('.plane .start').html("第"+that.aa+"关!!!继续游戏");
                      $('.die,.sore').css({display:'none'});
                      that.next();
                  }
                  break;
              }
              
          }
      }
    },

    next:function(){
      var that=this;
      // clearInterval(this.t);
      for(var i=0;i<this.spans.length;i++){
         document.body.removeChild(this.spans[i]);
      }
        this.spans=[];
        this.currArr=[];
        this.currPosArr=[];
        this.speed++;
        this.letterLen++;
        this.currSore=0;
        this.num+=10;
        $('.plane').click(function(){
          $('.plane .start').css({display:'none'});
          $('.die,.sore').css({display:'block'});
          $('.die').html('<span>生命：</span><span>'+that.die+'</span>');
          $('.sore').html('<span>分数：</span><span>'+that.sore+'</span>');
          this.play();
        });
    },
    move:function(){
       var that=this;
       this.t=setInterval(function(){
         for(var i=0;i<that.spans.length;i++){
             var top=that.spans[i].offsetTop+that.speed;
             that.spans[i].style.top=top+"px";
             if(top>that.clienth){
                 document.body.removeChild(that.spans[i]);
                 that.spans.splice(i,1);
                 that.currPosArr.splice(i,1);
                  that.currArr.splice(i,1);
                 that.getLetter(1);
                 that.die--;
                 that.dieEle.innerHTML=that.die;
                 if(that.die==0){
                      clearInterval(this.t);
                      $('.plane .start').css({display:'block'});
                      $('.plane .start').html("游戏失败！！！");
                      $('.die,.sore').css({display:'none'});
                      // that.audio.pause();
                      that.next();
                     //that.restart();
                 }


             }
         }

       },60)
    },
    restart:function(){
      clearInterval(this.t);
      for(var i=0;i<this.spans.length;i++){
         document.body.removeChild(this.spans[i]);
      }
        this.spans=[];
        this.currArr=[];
        this.currPosArr=[];
        this.speed=1;
        this.letterLen=5;
        this.currSore=0;
        this.num=10;

        this.play();


    },


    getLetter:function(num){
        //先获取到指定的字母
        var arr=this.getRand(num);
        var posArr=[];
        var eleArr=[];
        for(var i=0;i<arr.length;i++){
            var span=document.createElement("span");
            span.innerHTML=arr[i];


            var x=(100+(this.clientw-200)*Math.random());
            var y=(100*Math.random());
            var width=87;
            while (this.check1(posArr,x,width)){
                x=(100+(this.clientw-200)*Math.random());
            }
             posArr.push({minx:x,maxx:x+width});
             this.currPosArr.push({minx:x,maxx:x+width});
            span.style.cssText="width:87px;height:108px;background:url(./images/1.png);position:absolute;left:"+x+"px;top:"+y+"px;color:black;font-size:30px;";
            span.style.textAlign="center";
            span.style.lineHeight="180px";
            document.body.appendChild(span);
           // eleArr.push(span);
        
            this.spans.push(span);
        }
       // return eleArr;

    },
    check1:function(arr,x,width){
        for(var i=0;i<arr.length;i++){
            if(!(x+width<arr[i].minx||arr[i].maxx+width<x)){
                return true;
            }
        }
        return false;
    },
    getRand:function(num){
       var arr=[];
       for(var i=0;i<num;i++) {
           var rand = Math.floor(this.letterArr.length * Math.random());
           while(this.check(this.currArr,this.letterArr[rand])){
               rand = Math.floor(this.letterArr.length * Math.random());
           }
           arr.push(this.letterArr[rand]);
           this.currArr.push(this.letterArr[rand]);
       }
               return arr;

    },
    check:function(arr,val){
       for(var i=0;i<arr.length;i++){
           if(arr[i]==val){
               return true;
           }
       }
        return false;
    }

}