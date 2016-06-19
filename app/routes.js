module.exports = {
  bind : function (app, assetPath) {
    // patterns - apply 
    app.get('/apply', function (req, res) {
      var page_name = "Apply";
      res.render('apply', { 'page_name' : page_name });
    });

  }
};
