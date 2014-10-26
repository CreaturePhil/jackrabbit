var PublicPost = require('../models/Post').publicPost;
var PrivatePost = require('../models/Post').privatePost;
var User = require('../models/User');

var homeController = (function() {
  var controller = {};

  controller.index = {
    get: function(req, res) {
      if (!req.isAuthenticated()) {
        res.render('index', {
          title: 'Home'
        });
      } else {
        User.findOne(req.user.id, function(req, user) {
          PublicPost.find({
            '_id': {
              $in: user.publicPosts
            }
          }, function(err, publicPosts) {
            if (err) throw err;
            PrivatePost.find({
              '_id': {
                $in: user.privatePosts
              }
            }, function(err, privatePosts) {
              if (err) throw err;
              var posts = publicPosts.concat(privatePosts); 
              posts.sort(function(a, b) {
                return b.date - a.date;
              });
              res.render('dashboard', {
                title: 'Home',
                posts: posts,
              });
            });
          });         
        });
      }
    }
  };

  controller.about = {
    get: function(req, res) {
      res.render('about', { title: 'About' });
    } 
  };

  controller.explore = {
    get: function(req, res) {
      PublicPost.find({}, function(err, posts) {
        posts.sort(function(a, b) {
          return b.date - a.date;
        });
        if (err) throw err;
        res.render('explore', {
          title: 'Explore',
          posts: posts
        })
      });
    } 
  };

  return controller;
})();

module.exports = homeController;
