var exec = require('child_process').exec,
    express = require('express'),
    bodyParser = require('body-parser'),
    routes = require(__dirname + '/app/routes.js'),
    app = express(),
    port = (process.env.PORT || 3000),
    writer = require('express-writer');

// Application settings
app.engine('html', require(__dirname + '/lib/template-engine.js').__express);
app.set('view engine', 'html');
app.set('vendorViews', __dirname + '/govuk_modules/govuk_template/views/layouts');
app.set('views', __dirname + '/app/views');

// Middleware to serve static assets
app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/govuk_modules/public'));
app.use('/public', express.static(__dirname + '/govuk_modules/govuk_template/assets'));
app.use('/public', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit'));

// Support for parsing data in POSTs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// send assetPath to all views
app.use(function (req, res, next) {
  res.locals.assetPath="/public/";
  next();
});

// set up for all requests to result in static responses

if (process.env.GENERATE_STATIC_SITE) {
  app.use(writer.watch);
  writer.setWriteDirectory('./static_site');
}

// routes (found in routes.js)

routes.bind(app, '/public/');

// start the app

var server = app.listen(port);
console.log('');
console.log('Listening on port ' + port);
console.log('');

if (process.env.GENERATE_STATIC_SITE) {
  var appRoutes = app._router.stack.filter(function (item) {
    if (typeof item.route !== 'undefined') {
      return item.route.path;
    }
    return false;
  }).map(function (item) { return item.route.path; });
  exec('grunt generate_static_site:' + appRoutes.join(':'), function (err, stdout, stderr) {
    console.log(stdout);
    server.close();
  });
}
