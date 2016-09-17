var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
var product = [{
	id: 1,
	name:'Jeans',
	description: 'Womens jeans in all shades ',
	price : 2500-7000,
	quantity : 50,
	categeory  :11,
	completed: false
},{
	id: 2,
	name:'Tops',
	description: 'Womens Tops ',
	price : 500-7000,
	quantity : 60,
	categeory  :12,
	completed: false
},{
	id: 3,
	name:'Jewellery',
	description: 'Womens Jewellery',
	price : 500-7000,
	quantity : 600,
	categeory  :13,
	completed: false


}];

var categeory =[{
	id : 11,
	name : 'Ethnic wear',
	completed : false
},{
	id :12,
	name : 'western wear',
	completed :false
},{
	id :13,
	name :'womens wear',
	completed :false
	
}]


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

app.listen(PORT,function(){
	console.log('Express listening on port ' + PORT + '!');
});
