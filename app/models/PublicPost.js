var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  turl: { type: String, lowercase: true },
  title: String,
  avatar: String,
  author: String,
  date: Date,
  editDate: Date,
  body: String,
  comments: []
});

module.exports = mongoose.model('PublicPost', postSchema);
