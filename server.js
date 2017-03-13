var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyparser = require('body-parser');
var session = require('express-session');

var config = {
     user:'jagadeeshbuddha09',	
     database:'jagadeeshbuddha09',
     host:'db.imad.hasura-app.io',
      port:'5432',
     password: process.env.DB_PASSWORD,
  };

var pool = new Pool(config);

var app = express();
app.use(morgan('combined'));
app.use(bodyparser.json());
app.use(session({
    secret:'someRandomSecretValue',
    cookie:{maxAge:1000*60*60*24*30}
}));

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

function hash(input,salt)
{
	var hashed = crypto.pbkdf2Sync(input, salt,100,512,'sha512');
	return ["pbkdf2Sync","100",salt,hashed.toString('hex')].join('$');
}

app.post('/create-user',function(req,res){
	var salt = crypto.randomBytes(128).toString('hex');
	var password = req.body.password;
	var username = req.body.username;
	var dbString = hash(password,salt);
	pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
       if (err){
           res.status(500).send(err.toString());
       }
       else{
		   res.send('User successfully created'+username);
       }
    });
}
);

app.post('/login',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	pool.query('SELECT * FROM "user" WHERE username=$1',[username],function(err,result){
       if (err){
           res.status(500).send(err.toString());
       }
       else{
           if(result.rows.length === 0)
           {
               res.send(403).send('username/password is invalid');
           }
           else{
               console.log(req);
               console.log(result.rows[0]);
               var dbString  = result.rows[0].password;
               var salt = dbString.split('$')[2];
               var hashedstring = hash(password,salt);
               if (dbString === hashedstring)
               {
                   //set the session
                   req.session.auth={userId:result.rows[0].id};
                   console.log('req.session.auth');
                   console.log(req.session.auth);
                   res.send('user credentials correct!');
               }
               else
               {
                   res.send('username/password is invalid')
               }
           }
       }
    });
});

app.get('/check-login',function(req,res){
    if(req.session && req.session.auth && req.session.auth.userId){
        res.send('User logged in'+req.session.auth.userid.toString());
    }
    else{
        res.send('User not logged in');
    }
});

app.get('/:articleName', function (req, res) {
  var articleName=req.params.articleName;
  pool.query('SELECT * FROM article WHERE title=$1;',[articleName],function(err,result){
       if (err){
           res.status(500).send(err.toString());
       }
       else{
		   var articleData = result.rows[0];
		   res.send(CreateTemplate(articleData));
       }
    });
  });

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});


/*
var names = [];
app.get('/submit-name?:name',function(req,res){
	//get the name from the request
	var name = req.query.name;
	names.push(name);
	//JSON - javascript object notation
	res.send(JSON.stringify(names));
});
*/




/*

app.get('/hash/:input',function(req,res){
  var hashedstring = hash(req.params.input,'this-is-some-random-string');
  res.send(hashedstring);
  
}
);
*/


/*
var counter1 = 0;
app.get('/counter',function(req,res){
	counter1 = counter1+1;
	res.send(counter1.toString());
});
*/

/*
app.get('/test-db', function(req,res){
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM article',function(err,result){
       if (err){
           res.status(500).send(err.toString());
       }
       else{
           res.send(JSON.stringify(result));
       }
    });
});
*/




/*
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
*/