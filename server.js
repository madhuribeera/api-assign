var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 8080;

var product = [];
var producNextId = 1;

var categeory =[];
var categNextId = 1;

app.use(bodyParser.json());


app.get('/',function(req,res){
	res.send('E-commerce Stuff');
});

//GET /product
app.get('/product',function(req,res){
	res.json(product);
});

//GET /categeory
app.get('/categeory',function(req,res){
	res.json(categeory);
});

//GET /product/:id
app.get('/product/:id',function(req,res){
		var todoId = parseInt(req.params.id);
		var matchedTodo;

	product.forEach(function(todo){
		if(todoId === todo.id){
			matchedTodo = todo;
		}
	});

	if(matchedTodo){
		res.json(matchedTodo);
	 } else {
		res.status(404).send();

	}
});



//GET /categeory/:id
app.get('/categeory/:id',function(req,res){
	var categId = parseInt(req.params.id);
	var matchedcateg;

	categeory.forEach(function(todo){
		if(categId === todo.id){
			matchedcateg = todo;
		}
	});

	if(matchedcateg){
		res.json(matchedcateg);
	} else{
		res.status(404).send();
	}
	});


//Post/product

app.post('/product',function(req,res){

	var body = req.body;

	body.id = producNextId++;
	

	product.push(body);

	res.json(body);
});

//Post/categeory

app.post('/categeory',function(req,res){

	var body = req.body;

	body.id = categNextId++;
	

	categeory.push(body);

	res.json(body);
});




app.listen(PORT,function(){
	console.log('Express listening on port ' + PORT + '!');
});
