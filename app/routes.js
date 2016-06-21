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

    // patterns - text fields - single text field with validation
    app.get('/text-field-single-with-validation', function (req, res) {
      var page_name = "Single text field with validation";
      res.render('text-field-single-with-validation', { 'page_name' : page_name });
    });

    // patterns - text fields - multiple text fields 
    app.get('/text-field-multiple', function (req, res) {
      var page_name = "Multiple text fields";
      res.render('text-field-multiple', { 'page_name' : page_name });
    });

    // patterns - text fields - multiple text fields with validation
    app.get('/text-field-multiple-with-validation', function (req, res) {
      var page_name = "Multiple text fields with validation";
      res.render('text-field-multiple-with-validation', { 'page_name' : page_name });
    });

    // patterns - text fields - date text field 
    app.get('/text-field-date', function (req, res) {
      var page_name = "Date field";
      res.render('text-field-date', { 'page_name' : page_name });
    });

    // patterns - text fields - date text field 
    app.get('/text-field-date-with-validation', function (req, res) {
      var page_name = "Date field with validation";
      res.render('text-field-date-with-validation', { 'page_name' : page_name });
    });

    // patterns - radio buttons - radio field with two options 
    app.get('/radio-field-single-two-options', function (req, res) {
      var page_name = "Single field with two radio options";
      res.render('radio-field-single-two-options', { 'page_name' : page_name });
    });

    // patterns - radio buttons - radio field with two options with validation
    app.get('/radio-field-single-two-options-with-validation', function (req, res) {
      var page_name = "Single field with two radio options with validation";
      res.render('radio-field-single-two-options-with-validation', { 'page_name' : page_name });
    });

    // patterns - radio buttons - radio field with multiple options 
    app.get('/radio-field-single-multiple-options', function (req, res) {
      var page_name = "Single field with multiple radio options";
      res.render('radio-field-single-multiple-options', { 'page_name' : page_name });
    });

    // patterns - radio buttons - radio field with multiple options with validation
    app.get('/radio-field-single-multiple-options-with-validation', function (req, res) {
      var page_name = "Single field with multiple radio options with validation";
      res.render('radio-field-single-multiple-options-with-validation', { 'page_name' : page_name });
    });

    // patterns - radio buttons - multiple radio fields with multiple options 
    app.get('/radio-field-multiple-multiple-options', function (req, res) {
      var page_name = "Multiple fields with multiple radio options";
      res.render('radio-field-multiple-multiple-options', { 'page_name' : page_name });
    });

    // patterns - radio buttons - multiple radio fields with multiple options with validation
    app.get('/radio-field-multiple-multiple-options-with-validation', function (req, res) {
      var page_name = "Multiple fields with multiple radio options with validation";
      res.render('radio-field-multiple-multiple-options-with-validation', { 'page_name' : page_name });
    });

    // patterns - checkbox buttons - checkbox field with multiple options 
    app.get('/checkbox-field-single-multiple-options', function (req, res) {
      var page_name = "Single field with multiple checkbox options";
      res.render('checkbox-field-single-multiple-options', { 'page_name' : page_name });
    });

    // patterns - checkbox buttons - checkbox field with multiple options with validation
    app.get('/checkbox-field-single-multiple-options-with-validation', function (req, res) {
      var page_name = "Single field with multiple checkbox options with validation";
      res.render('checkbox-field-single-multiple-options-with-validation', { 'page_name' : page_name });
    });

    // patterns - checkbox buttons - multiple checkbox fields with multiple options 
    app.get('/checkbox-field-multiple-multiple-options', function (req, res) {
      var page_name = "Multiple fields with multiple checkbox options";
      res.render('checkbox-field-multiple-multiple-options', { 'page_name' : page_name });
    });

    // patterns - checkbox buttons - multiple checkbox fields with multiple options with validation
    app.get('/checkbox-field-multiple-multiple-options-with-validation', function (req, res) {
      var page_name = "Multiple fields with multiple checkbox options with validation";
      res.render('checkbox-field-multiple-multiple-options-with-validation', { 'page_name' : page_name });
    });

    // patterns - checkbox buttons - checkbox field with conditional section
    app.get('/checkbox-field-single-multiple-options-conditional-section', function (req, res) {
      var page_name = "Single field with multiple checkbox options and a conditional section";
      res.render('checkbox-field-single-multiple-options-conditional-section', { 'page_name' : page_name });
    });

    // patterns - checkbox buttons - checkbox field with conditional section with validation
    app.get('/checkbox-field-single-multiple-options-conditional-section-with-validation', function (req, res) {
      var page_name = "Single field with multiple checkbox options and a conditional section with validation";
      res.render('checkbox-field-single-multiple-options-conditional-section-with-validation', { 'page_name' : page_name });
    });
  }
};
