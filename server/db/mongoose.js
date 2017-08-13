
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var url =  'mongodb://prateek211205:sanu211205@ds161262.mlab.com:61262/todoapp';
//mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect(url);
module.exports = { mongoose };
