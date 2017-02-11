console.log('Loaded!');

var button = document.getElementById('counter');
button.onclick=function(){
   //Create an request object
	var request = new XMLHttpRequest(); 
	//capture the response and store it in a variable
	console.log(request);
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			//take some action
			if(request.status == 200){
				console.log(request.response.Text);
				var counter = request.responseText;
				var span=document.getElementById('count');
				span.innerHTML = counter.toString();			
			}
		}
		
	}
	//make the request
	request.open('GET','https://jagadeeshbuddha09.imad.hasura-app.io/counter',true);
	request.send(null);
};

























/*var element = document.getElementById('maintext');
//element.innerHTML = 'New Value';

var img= document.getElementById('img1');
var curmargin = 0;
function moveRight(){
  curmargin = curmargin + 10;
  img1.style.marginLeft = curmargin+'px';
}

img1.onclick = function(){
	  var interval = setInterval(moveRight,100);
}*/