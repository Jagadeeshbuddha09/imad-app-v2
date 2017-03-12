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
	request.open('GET','http://jagadeeshbuddha09.imad.hasura-app.io/counter',true);
	request.send(null);
};


//send name to the server



//render all the names(all names sent so far) returned by the server
var submit = document.getElementById('submit_btn');
submit.onclick=function(){
   //Create an request object
	var request = new XMLHttpRequest(); 
	//capture the response and store it in a variable
	var nameliststring='';
	var name = document.getElementById('inputbox').value;
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			//take some action
			if(request.status == 200){
				var displayarea = document.getElementById('namelist');
				console.log(request);
				var names = request.responseText;
				console.log(names);
				names = JSON.parse(names);
				
				for(var i=0;i<names.length;i++){
					nameliststring = nameliststring + names[i] +'<br/>';
				}
				displayarea.innerHTML = nameliststring;
			}
		}
	}
	request.open('GET','http://localhost:8080/submit-name?name=' + name,true);
	request.send(null);
};	


var submit_cmt=document.getElementById('submit_cmt');
var comment=document.getElementById('comment');
console.log('jagadeesh'+comment);
submit_cmt.onclick=function()
{
	console.log(comment);
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