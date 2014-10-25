var homeController = (function() {
  var controller = {};

  controller.index = {
    get: function(req, res) {
      res.render('index', {
        title: 'Home'
      });
    }
  }

  return controller;
})();

module.exports = homeController;
