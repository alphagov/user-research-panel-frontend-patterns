module.exports = {
  bind : function (app, assetPath) {
    // patterns - index 
    app.get('/', function (req, res) {
      var page_name = "Index";
      res.render('index', { 'page_name' : page_name });
    });
    // patterns - apply
    app.get('/apply', function (req, res) {
      var page_name = "Apply";
      res.render('apply', { 'page_name' : page_name });
    });

    // patterns - text fields - single text field 
    app.get('/text-field-single', function (req, res) {
      var page_name = "Single text field";
      res.render('text-field-single', { 'page_name' : page_name });
    });

    // patterns - text fields - multiple text fields 
    app.get('/text-field-multiple', function (req, res) {
      var page_name = "Multiple text fields";
      res.render('text-field-multiple', { 'page_name' : page_name });
    });

  }
};
