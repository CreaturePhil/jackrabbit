var mongoose = require('mongoose');

var publicPostSchema = new mongoose.Schema({
  turl: { type: String, lowercase: true },
  type: { type: String, default: 'Public' },
  title: String,
  avatar: String,
  author: String,
  date: Date,
  editDate: Date,
  body: String,
  comments: []
});

var privatePostSchema = new mongoose.Schema({
  turl: { type: String, lowercase: true },
  type: { type: String, default: 'Journal' },
  title: String,
  avatar: String,
  author: String,
  date: Date,
  editDate: Date,
  body: String,
  comments: []
});

exports.publicPost = mongoose.model('PublicPost', publicPostSchema);
exports.privatePost = mongoose.model('PrivatePost', privatePostSchema);
