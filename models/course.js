var mongoose = require('mongoose');

// Mongoose Connection 
mongoose.connect('', { useNewUrlParser: true })
var db = mongoose.connect

var CourseSchema = mongoose.Schema({
    alias: String,
    name: String,
    courseCurriculum: String,
    courseRegistrationStatus: String,
    description: String,
    fees: Number,
    maxsessions: Number,
    minsessions: Number,
    seats: Number,
    startDate: String,
    endDate: String
});

var Course = module.exports = mongoose.model('Course',CourseSchema);
module.exports.createCourse = function(newCourse,callback){
	newCourse.save(callback);
}