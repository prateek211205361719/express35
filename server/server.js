
var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var { mongoose } =  require('./db/mongoose.js');
var { Todo } = require('./models/todo.js');
var port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/todo', function(req, res){
    Todo.find().then((result) => {
        res.send({
            result
        });
    }, (err) => {
        res.status(200).send(err);
    });
});


app.post('/todo', function(req, res){
     
      var result = _.pick(req.body, ['text', 'completed', 'notCompleted']);
      var obj = new Todo(result);
      obj.save().then((result) => {
        res.send({
            result
        });
      } , (err) => {
          res.status(200).send(err);
      });
});

app.delete('/todo/:id', function(req, res){
    Todo.findByIdAndRemove(req.params.id).then((result) => {
         res.send({
            result
        });
    }, (err) => {
         res.status(200).send(err);
    });
});

app.patch('/todo/:id', function(req, res){
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {$set:body}, {new : true}).then((result) => {
        if(!result){
            return res.status(404).send();
        }
        res.send({result});
    } , (err) => {

    });
});




app.listen(port, function(){
    console.log('-----running----');
});