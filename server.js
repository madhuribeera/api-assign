var express = require('express');
var bodyParser = require('body-parser');
var _=require('underscore'); 

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
		var matchedTodo = _.findWhere(product ,{id: todoId });

	

	if(matchedTodo){
		res.json(matchedTodo);
	 } else {
		res.status(404).send();

	}
});



//GET /categeory/:id
app.get('/categeory/:id',function(req,res){
	var categId = parseInt(req.params.id);
	var matchedcateg = _.findWhere(categeory ,{id: categId});


	

	if(matchedcateg){
		res.json(matchedcateg);
	} else{
		res.status(404).send();
	}
	});


//Post/product

app.post('/product',function(req,res){

	var body = _.pick(req.body, 'description' , 'completed');

	if(!_.isBoolean(body.completed) || body.description.trim().length === 0){
		return res.status(400).send();
	}

	body.description = body.description.trim();
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


//DELETE /product/:id
app.delete('/product/:id', function(req,res){
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(product,{ id: todoId});

	if(!matchedTodo){
		res.status(404).json({"error": "no todo found with that id"});
	} else {
		product = _.without(product,matchedTodo);
		res.json(matchedTodo);
	}
});





//DELETE /categeory/:id


app.listen(PORT,function(){
	console.log('Express listening on port ' + PORT + '!');
});
