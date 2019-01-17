var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var using = false
var lastPoint = {
    x: undefined,
    y: undefined
}




//设置宽高
autoSetCanvasSize(canvas)

//监听鼠标
listenToUser(canvas)

//监听橡皮
var eraserEnable = false
eraser.onclick = function(){
    eraserEnable = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
pen.onclick = function(){
    eraserEnable = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}

//监听颜色
black.onclick = function(){
    context.strokeStyle = 'black'
    black.classList.add('active')
    crimson.classList.remove('active')
    dodgerBlue.classList.remove('active')
    mediumSpringGreen.classList.remove('active')
}
crimson.onclick = function(){
    context.strokeStyle = '#DC143C'
    black.classList.remove('active')
    crimson.classList.add('active')
    dodgerBlue.classList.remove('active')
    mediumSpringGreen.classList.remove('active')
}
dodgerBlue.onclick = function(){
    context.strokeStyle = '#1E90FF'
    black.classList.remove('active')
    crimson.classList.remove('active')
    dodgerBlue.classList.add('active')
    mediumSpringGreen.classList.remove('active')
}
mediumSpringGreen.onclick = function(){
    context.strokeStyle = '#00FA9A'
    black.classList.remove('active')
    crimson.classList.remove('active')
    dodgerBlue.classList.remove('active')
    mediumSpringGreen.classList.add('active')
}

/*-----------------函数----------------*/
function listenToUser(canvas){
    //特性检测
    if(document.body.ontouchstart !== undefined){
        //触屏设备
        canvas.ontouchstart = function(start){
            var x = start.touches[0].clientX
            var y = start.touches[0].clientY
            using = true;
            if(eraserEnable){
                context.clearRect(x-4, y-4, 8, 8)
            }else{
                //所得到的x,y是相对于窗口的，但是画的时候是相对于canvas的
                lastPoint = {x:x,y:y}
            }
            console.log('kaishi')
        }

        canvas.ontouchmove = function(move){ 
            var x = move.touches[0].clientX
            var y = move.touches[0].clientY
            if(!using){return}
            if(eraserEnable){
                    context.clearRect(x-4, y-4, 8, 8)
            }else{
                    var newPoint = {x: x,y: y}
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    //更新最后一个点
                    lastPoint = newPoint
                }
        }

        canvas.ontouchend = function(end){
            using = false
        }
    
    }else{
        //PC
        //按下鼠标
        canvas.onmousedown = function(down){        
            var x = down.clientX
            var y = down.clientY
            using = true;
            if(eraserEnable){
                context.clearRect(x-4, y-4, 8, 8)
            }else{
                //所得到的x,y是相对于窗口的，但是画的时候是相对于canvas的
                lastPoint = {x:x,y:y}
            }
        }
    
        //移动鼠标
        canvas.onmousemove = function(move){
            var x = move.clientX
            var y = move.clientY
            if(!using){return}
            if(eraserEnable){
                    context.clearRect(x-4, y-4, 8, 8)
            }else{
                    var newPoint = {x: x,y: y}
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    //更新最后一个点
                    lastPoint = newPoint
                }
            }
    
        //松开鼠标
        canvas.onmouseup = function(up){
            using = false
            }
    }
    
}

//PC窗口的宽高
function autoSetCanvasSize(canvas){
    setCanvasSize()
    window.onresize = function(){
        setCanvasSize()
    }

    function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
    }
}

//画一个圆
function drawCircle(x, y, radius){
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI*2)
    context.fill()

}

//画一根线
function drawLine(x1, y1, x2, y2){
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = 3
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
    }