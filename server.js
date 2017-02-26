var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;
var config = {
    user:'jagadeeshbuddha09',
    database:'jagadeeshbuddha09',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD,
};

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


var pool = new Pool(config);

app.get('/test-db', function(req,res){
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM test',function(err,result){
       if (err){
           res.status(500).send(err.toString());
       }
       else{
           res.send(JSON.stringify(result.rows));
       }
    });
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
	res.send(counter1.toString());
});

var names = [];
app.get('/submit-name?:name',function(req,res){
	//get the name from the request
	var name = req.query.name;
	names.push(name);
	//JSON - javascript object notation
	res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req, res) {
  var articleName=req.params.articleName;
  
  var articleData = '';
  pool.query('SELECT * FROM article WHERE title = articleone',function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }   
    else{
        if(result.rows.length === 0){
            res.status(404).send('Article not found');
        }
        else{
            articleData = result.rows[0];
            console.log(articleData);
        }
    }
  });
  //res.send(CreateTemplate(articleData));
  //res.sendFile(path.join(__dirname,'ui','articleone.html'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
