var mongoose = require('mongoose');

// Mongoose Connection 
mongoose.connect('', { useNewUrlParser: true })
var db = mongoose.connect

var StudentSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    whatsappNo: String,
    courseAlias: String
});


var Student = module.exports = mongoose.model('Student',StudentSchema);
module.exports.createStudent = function(newStudent,callback){
    newStudent.save(callback);
}