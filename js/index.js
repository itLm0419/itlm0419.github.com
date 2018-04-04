//弧度转角度
function a2d(n){
    return n*180/Math.PI;
}
//判断移入的位置
function hoverDir(ev,obj){
    var a = ev.clientX-obj.offsetLeft-obj.offsetWidth/2;
    var b = obj.offsetTop+obj.offsetHeight/2-ev.clientY;

    //求出    以坐标求出度数  Math.atan2(b,a) 正切  a2d(Math.atan2(b,a)) 角度换弧度
    return Math.round((a2d(Math.atan2(b,a))+180)/90)%4;//返回的是 左0 下1 右2 上3
}
function through(obj){
    var oSpan = obj.children[1];
    //这里onmouseover 有bug
    obj.onmouseenter = function(ev){
        var oEvent = ev||event;
        var dir = hoverDir(oEvent,obj);//返回的是代表方向的值
        //没移动之前 先让span到进入的位置
        console.log(dir);
        switch(dir){
            case 0:
                //左
                oSpan.style.left = '-150px';
                oSpan.style.top = 0;
                break;
            case 1:
                //下
                oSpan.style.left = 0;
                oSpan.style.top = '150px';
                break;
            case 2:
                //右
                oSpan.style.left = '150px';
                oSpan.style.top = 0;
                break;
            case 3:
                //上
                oSpan.style.left = 0;
                oSpan.style.top = '-150px';
                break;
        }
        move(oSpan,{left:0,top:0});//最终的停止位置都是(0,0)点
    };
    obj.onmouseleave = function(ev){
        var oEvent = ev||event;
        var dir = hoverDir(oEvent,obj);
        //回到进入之前的位置
        switch(dir){
            case 0:
                move(oSpan,{left:-150,top:0});
                break;
            case 1:
                move(oSpan,{left:0,top:150});
                break;
            case 2:
                move(oSpan,{left:150,top:0});
                break;
            case 3:
                move(oSpan,{left:0,top:-150});
                break;
        }
    };
}
window.onload = function(){
    var oLinkMe=document.getElementById('linkMe');
    var aLi = oLinkMe.getElementsByTagName('li');
    for(var i=0;i<aLi.length;i++){
        through(aLi[i]);
    }
    var oLink=document.getElementById('link');
    var lock=true;
    var timer=null;
    /*oLink.onclick=function(){
        if(lock){
            oLinkMe.style.display='block';
            for(var i=0;i<aLi.length;i++){
                ;(function(index){
                    timer=setTimeout(function(){
                        aLi[index].style.opacity= 1;
                    },i*200);
                })(i);
            }
        }else{
            oLinkMe.style.display='none';
            clearTimeout(timer);
            for(var i=0;i<aLi.length;i++){
                aLi[i].style.opacity= 0;
            }
        }
       lock=!lock;
    }*/
};