var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js',function(req, res){
	res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


function CreateTemplate(data){
	var title=data.title;
	var date=data.date;
	var content=data.content;
    var htmltemplate=`
	    <html>
           <head>
             <title>${title}</title>
	         <link rel="stylesheet" href="/ui/style.css"
           </head>
           <body>
             <div class="container">
               <div>
                 <a href="/">Home</a> 
               </div>
		       <div>
		       Date:${date}
		       </div>
               <div>
		         ${content}
               </div>
	         </div>
           </body>
         </html>`;
		 return htmltemplate;
}

var articles={
	'articleone':{
		title:'Article one | Jagadeeshwaran S',
	    date:'Jan 1,2017',
	    content:`<p>Contents of article one goes here.<br/>
			   We are going add some more content and do some css work.
			   then do some javascripting in server side code-server.js.<br/>
			   We are going add some more content and do some css work.
			   then do some javascripting in server side code-server.js<br/>
			   We are going add some more content and do some css work.
			   then do some javascripting in server side code-server.js
		      </p>
			  <p>Jagadeeshwaran Shanmuganathan</p>`,
	},
	'articletwo':{
		title:'Article Two | Jagadeeshwaran S',
	    date:'Jan 5,2017',
	    content:`<p>Contents of article two goes here.<br/>
			   We are going add some more content and do some css work.
			   then do some javascripting in server side code-server.js.<br/>
			   We are going add some more content and do some css work.
			   then do some javascripting in server side code-server.js<br/>
			   We are going add some more content and do some css work.
			   then do some javascripting in server side code-server.js
		      </p>
			  <p>Jagadeeshwaran Shanmuganathan</p>`,		
	},
};

var counter1 = 0;
app.get('/counter',function(req,res){
	counter1 = counter1+1;
	res.send(counter1,toString());
});



app.get('/:articleName', function (req, res) {
  var articleName=req.params.articleName;
  res.send(CreateTemplate(articles[articleName]));
  //res.sendFile(path.join(__dirname,'ui','articleone.html'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
