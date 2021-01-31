//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localohost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")

//GET all
.get(function(req,res){
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }     
    });
})


//POST
.post(function(req, res){
    const newArticle = Article({
        title: req.body.title,
        content: req.body.content
      });

      newArticle.save(function(err){
        if (!err){
          res.send("Successfully added a new article.");
        } else {
          res.send(err);
        }
      });
})

//DELETE All
.delete(function(req, res){
    Article.deleteMany(function(err){
      if (!err){
        res.send("Successfully deleted all the articles in wikiDB.");
      } else {
        res.send(err);
      }
    });
  })



app.listen(3000, function() {
  console.log("Server started on port 3000");
});






