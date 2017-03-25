console.log('Loaded!');

var submit = document.getElementById('submit_btn');
submit.onclick=function(){
    
	//Create an request object
	var request = new XMLHttpRequest(); 
	
	
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			//take some action
			if(request.status == 200){
			    //capture the response and store it in a variable
				alert('logged in successfully');
			}
			else if(request.status == 403){
			    alert('username/password is incorrect');
			}
			else if(request.status == 500){
			    alert('something went wrong');
			}
		}
	};
	
    
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	//console.log(username);
	//console.log(password);
	request.open('POST','http://jagadeeshbuddha09.imad.hasura-app.io/login',true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({'username':username, 'password':password}));
	
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

/*

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
	request.open('GET','http://jagadeeshbuddha09.imad.hasura-app.io/submit-name?name=' + name,true);
	request.send(null);
};	




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
*/