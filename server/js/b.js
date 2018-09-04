document.querySelector('h1').style.backgroundColor = 'blue'
document.querySelector('img').style.width ='200px'
document.querySelector('img').style.height ='200px'
function $(node){
    return document.querySelector(node)
}
$('.box input').onclick = function(){
   var script =  document.createElement('script')
   script.src = 'http://localhost:8080/getNews?callback=show'
   this.appendChild(script)
  this.removeChild(script)
/*
  
  
*/
} 
        var cstr = '0123456789abcdef'
        function getColor(){
            var color = '#'
            for(var i=0;i<6;i++){
                color +=cstr[Math.floor(Math.random()*17)]
            }
            return color
        }
        function setHtml(data){
            for(var i=0;i<data.length;i++){
                var li = document.createElement('li')
                li.innerText = data[i]
                
                li.style.color = getColor()
                console.log(li.style.color)
                $('.box').appendChild(li)
            } 
        }
function show(data){
    console.log(data)
    setHtml(data)
    
}
var xhr = new XMLHttpRequest()
xhr.open('GET','http://localhost:8080/getWeather',true)
xhr.send() 
xhr.onload = function(){
    if(xhr.status >=200 && xhr.status <300 || xhr.status === 304){
        console.log(121,xhr)
        var data = JSON.parse(xhr.responseText)
        console.log(data)
        setHtml(data)
     
    }else{
        console.log('404 not found')
    }
}