const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;




var app = express();
hbs.registerPartials(__dirname +'/views/partials');
hbs.registerHelper('getCurrentYear' , ()=>{
	return new Date().getFullYear();
});
app.use((req, res, next)=>{
	var now = new Date().toString();
	var log = `${now} : ${req.method} : ${req.url}` ;
	console.log(log);
	fs.appendFile('server.log' , log +'\n', (err) => {
		if (err) {
			connsole.log("Unable to write in file ")	;	
		}
	});
	//console.log(`${now}`);
	next();
});

// app.use((req , res , next) =>{
// 	res.render('maintenance.hbs');
// } );
app.set('view_engine','hbs');
app.use(express.static(__dirname +'/public'));
app.get('/', (req, res)=>{
	//res.send('<h1>Hello Express!</h1>');
	//console.log('Test ');
	res.send({
		name: 'Faisal Hassan',
		likes:[
		'bike', 
		'cycle'
		]
	});
});


app.get('/about',(req,res)=>{
	res.render('about.hbs' , {
		pageTitle:'About Page'
	});
});

app.get('/bad' , (req, res)=> {

	res.send({errorMessage:'bad Request'});
});
app.listen(port , ()=> {
	console.log(`Server is up on port ${port}`);
});