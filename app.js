var express = require("express");
var bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var app = express();

var uri = "mongodb://localhost:27017/blog_app";
mongoose.connect(uri, { useUnifiedTopology: true , useNewUrlParser:true });
mongoose.set('useFindAndModify', false);

app.use(express.static("public"));
app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//SCHEMA
var blogSchema = new mongoose.Schema({
	title:String,
	img:String,
	body:String,
	created:{type: Date, default:Date.now},
}); 
var Blog = mongoose.model("Blog",blogSchema);


//RESTful routing

//INDEX
app.get('/',function(req,res){
	res.redirect('/blogs');
});

app.get('/blogs',function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log("Something went wrong");
			console.log(err);
		}else{
			res.render("index",{blogs:blogs});
		}
	});
});

//NEW
app.get('/blogs/new',function(req,res){
	res.render("new");
});

//CREATE
app.post("/blogs",function(req,res){
	req.body.blog.body = sanitize(req.body.blog.body);
	Blog.create(req.body.blog,function(err,blog){
		if(err){
			console.log(err);
		}else{
			res.redirect('/blogs');
		}
	});
});

//SHOW
app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id,function(err,foundblog){
		if(err){
			res.redirect('/blogs');
		}else{
			res.render("show",{blog:foundblog});
		}
	});
});


//EDIT
app.get('/blogs/:id/edit',function(req,res){
	Blog.findById(req.params.id,function(err,foundblog){
		if(err){
			res.redirect('/blogs');
		}else{
			res.render("edit",{blog:foundblog});
		}
	});
});

//UPDATE
app.put('/blogs/:id',function(req,res){
	req.body.blog.body = sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
		if(err){
			res.redirect('/blogs');
		}else{
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

//DESTORY
app.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect('/blogs');
		}else{
			res.redirect('/blogs');
		}
	});
});

app.listen(3000,function(){
	console.log("Blog app with restful api convension has started");
});