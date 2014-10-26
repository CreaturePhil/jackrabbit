var moment = require('moment');
var PublicPost = require('../models/Post').publicPost;
var PrivatePost = require('../models/Post').privatePost;
var User = require('../models/User');

var postController = (function() {
  var controller = {};

  controller.public = {
    get: function(req, res) {
      res.render('post/public', {
        title: 'New Post'
      });
    },
    
    post: function(req, res) {
      var publicPost = new PublicPost({
        turl: req.body.title.replace(/[^a-z0-9 ]/gi, '').replace(/ /gi, '-'),
        title: req.body.title,
        avatar: req.user.profile.avatar || req.user.gravatar(),
        author: req.user.username,
        date: moment(),
        body: req.body.content
      });

      publicPost.save(function(err, post) {
        if (err) return next(err);
        User.findById(req.user.id, function(err, user) {
          if (err) return next(err);
          user.publicPosts.push(post.id);
          user.save(function(err) {
            if (err) return next(err);
            req.flash('success', { msg: 'Post sucessfully posted!' });
            res.redirect('/');
          });
        });
      });
    }
  };

  controller.private = {
    get: function(req, res) {
      res.render('post/private', {
        title: 'New Entry'
      });
    },

    post: function(req, res) {
      var privatePost = new PrivatePost({
        turl: req.body.title.replace(/[^a-z0-9 ]/gi, '').replace(/ /gi, '-'),
        title: req.body.title,
        avatar: req.user.profile.avatar || req.user.gravatar(),
        author: req.user.username,
        date: moment(),
        body: req.body.content
      });

      privatePost.save(function(err, post) {
        if (err) return next(err);
        User.findById(req.user.id, function(err, user) {
          if (err) return next(err);
          user.privatePosts.push(post.id);
          user.save(function(err) {
            if (err) return next(err);
            req.flash('success', { msg: 'Post sucessfully posted!' });
            res.redirect('/');
          });
        });
      });
    }
  };

  controller.edit = {
    public: {
      get: function(req, res) {
        PublicPost.findById(req.params.hash, function(err, post) {
          if (err) return next(err); 
          if (req.user.uid !== post.author.toLowerCase()) return res.redirect('/');
          res.render('post/edit', {
            title: 'Edit',
            post: post
          });
        }); 
      },

      post: function(req, res) {
        PublicPost.findById(req.params.hash, function(err, post) {
          if (err) return next(err); 
          if (req.user.uid !== post.author.toLowerCase()) return res.redirect('/');

          post.turl = req.body.title.replace(/[^a-z0-9 ]/gi, '').replace(/ /gi, '-');
          post.title = req.body.title;
          post.body = req.body.content;

          post.save(function(err) {
            if (err) return next(err);
            req.flash('success', { msg: 'Post successfully editted.' });
            res.redirect('/');
          });
        }); 
      }
    },

    private: {
      get: function(req, res) {
        PrivatePost.findById(req.params.hash, function(err, post) {
          if (err) return next(err); 
          if (req.user.uid !== post.author.toLowerCase()) return res.redirect('/');
          res.render('post/edit', {
            title: 'Edit',
            post: post
          });
        }); 
      },

      post: function(req, res) {
        PrivatePost.findById(req.params.hash, function(err, post) {
          if (err) return next(err); 
          if (req.user.uid !== post.author.toLowerCase()) return res.redirect('/');

          post.turl = req.body.title.replace(/[^a-z0-9 ]/gi, '').replace(/ /gi, '-');
          post.title = req.body.title;
          post.body = req.body.content;

          post.save(function(err) {
            if (err) return next(err);
            req.flash('success', { msg: 'Entry successfully editted.' });
            res.redirect('/');
          });
        }); 
      }
    }
  };

  return controller;
})();

module.exports = postController;
