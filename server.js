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
debugger;


app.get('/',function(req,res){
	res.send('E-commerce Stuff');
});

//GET /product?completed =false&q=work
app.get('/product',function(req,res){
	var queryParams =req.query;
	var filteredTodos = product;


	if(queryParams.hasOwnProperty('completed')&& queryParams.completed ==='true') {
		filteredTodos = _.where(filteredTodos,{completed:true});
	}else if(queryParams.hasOwnProperty('completed')&& queryParams.completed ==='false'){
		filteredTodos = _.where(filteredTodos,{completed:false});
	}


	if(queryParams.hasOwnProperty('q')&& queryParams.q.length > 0) {
		filteredTodos = _.filter(filteredTodos,function(todo){
			return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase())> -1;
	});
	}

	res.json(filteredTodos);
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

	var body = _.pick(req.body, 'id','Name','description', 'price', 'completed');

	if(!_.isBoolean(body.completed) && body.description.trim().length > 0 && body.price != '' &&  body.Name.trim().length > 0)
	{
		return res.status(400).send();
	}

	body.description = body.description.trim();
	body.id = producNextId++;
	//body.Name = body.Name.trim();

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

app.delete('/categeory/:id', function(req,res){
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(categeory,{ id: todoId});

	if(!matchedTodo){
		res.status(404).json({"error": "no todo found with that id"});
	} else {
		categeory = _.without(categeory,matchedTodo);
		res.json(matchedTodo);
	}

});


//PUT /product/:id


	app.put('/product/:id', function(req,res){
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(product,{ id: todoId});
	var body = _.pick(req.body, 'description' , 'completed');
	var validAttributes = {};

	if(!matchedTodo){
		return res.status(404).send();
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed;
	}
   else if(body.hasOwnProperty('completed')){
	return res.status(400).send();
}

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length >0)
	{
		validAttributes.description = body.description;
	}
 else if(body.hasOwnProperty('description')){
	return res.status(400).send();
}
_.extend(matchedTodo,validAttributes);
res.json(matchedTodo);
});



//PUT /categeory/:id

app.put('/categeory/:id', function(req,res){
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(categeory,{ id: todoId});
	var body = _.pick(req.body, 'id','description' , 'completed');
	var validAttributes = {};

	if(!matchedTodo){
		return res.status(404).send();
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed;
	}
   else if(body.hasOwnProperty('completed')){
	return res.status(400).send();
}

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length >0)
	{
		validAttributes.description = body.description;
	}
 else if(body.hasOwnProperty('description')){
	return res.status(400).send();
}
_.extend(matchedTodo,validAttributes);
res.json(matchedTodo);
});






app.listen(PORT,function(){
	console.log('Express listening on port ' + PORT + '!');
});
