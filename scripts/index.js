function game(){
    this.clientw=document.documentElement.clientWidth;
    this.clienth=document.documentElement.clientHeigt;
    this.letterArr=['A','B','C'];
    this.letterLen=5;
    this.speed=5;
    this.spans=[];
    this.play();
}
game.prototype={
    play:function(){
        this.getLetter(this.letterLen);//将字母显示到body中
        this.move();
    },
    getLetter:function(num){
        //先获取到指定的字母
        var arr=this.getRand(num);
        var posArr=[];
        for(var i=0;i<arr.length;i++){
            var span=document.documentElement('span');
            span.innerHTML=arr[i];
            var x=100+Math.floor(Math.random()*this.clientX-40);
            var y=100+Math.floor(Math.random()*this.clientY-40);
            span.style.cssText='width:30px;height:30px;color:#fff;position:absolute;left:"+x+"px;top:"+y+"';
            document.body.appendChild(span);
            this.spans.push(span);

        }
    },
    getRand:function(num){
        var arr=[];
        for(var i=0;i<num;i++){
            var rand=Math.floor(this.letterArr.length*Math.random());
            while(this.check(arr,rand)){
                rand=Math.floor(this.letterArr.length*Math.random());
            }
            arr.push(this.letterArr[rand]);
        }
        return arr;
        
    },
    check:function(arr,val){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==val){
                return true;
            }else{
                return false;
            }
        }
    }
};