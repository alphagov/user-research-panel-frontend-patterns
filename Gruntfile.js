module.exports = function (grunt) {

  grunt.initConfig({

    // Builds Sass
    sass: {
      dev: {
        files: {
          'public/stylesheets/main.css': 'public/sass/main.scss',
          'public/stylesheets/main-ie6.css': 'public/sass/main-ie6.scss',
          'public/stylesheets/main-ie7.css': 'public/sass/main-ie7.scss',
          'public/stylesheets/main-ie8.css': 'public/sass/main-ie8.scss',
          'public/stylesheets/elements-page.css': 'public/sass/elements-page.scss',
          'public/stylesheets/elements-page-ie6.css': 'public/sass/elements-page-ie6.scss',
          'public/stylesheets/elements-page-ie7.css': 'public/sass/elements-page-ie7.scss',
          'public/stylesheets/elements-page-ie8.css': 'public/sass/elements-page-ie8.scss',
          'public/stylesheets/prism.css': 'public/sass/prism.scss',
        },
        options: {
          includePaths: [
            'govuk_modules/govuk_template/assets/stylesheets',
            'govuk_modules/govuk_frontend_toolkit/stylesheets'
          ],
          outputStyle: 'expanded',
          imagePath: '../images'
        }
      }
    },

    // build JS
    directives: {
      files: {
        src: 'public/javascripts/application.js',
        dest: 'public/javascripts/application.min.js'
      },
    },

    // Copies templates and assets from external modules and dirs
    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: 'app/assets/',
          src: ['**/*', '!sass/**'],
          dest: 'public/'
        }]
      },
      govuk: {
        files: [{
          expand: true,
          cwd: 'node_modules/govuk_frontend_toolkit/',
          src: '**',
          dest: 'govuk_modules/govuk_frontend_toolkit/'
        },
        {
          expand: true,
          cwd: 'node_modules/govuk_template_mustache/',
          src: '**',
          dest: 'govuk_modules/govuk_template/'
        }]
      },
    },

    // workaround for libsass
    replace: {
      fixSass: {
        src: ['govuk_modules/public/sass/**/*.scss'],
        overwrite: true,
        replacements: [{
          from: /filter:chroma(.*);/g,
          to: 'filter:unquote("chroma$1");'
        }]
      }
    },

    // Watches styles and specs for changes
    watch: {
      css: {
        files: ['public/sass/**/*.scss'],
        tasks: ['sass'],
        options: { nospawn: true }
      }
    },

    // nodemon watches for changes and restarts app
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          ext: 'html, js'
        }
      }
    },

    concurrent: {
      target: {
        tasks: ['watch', 'nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // Lint scss files
    shell: {
      multiple: {
        command: [
          'bundle',
          'bundle exec govuk-lint-sass public/sass/elements/'
        ].join('&&')
      },
      run_app: {
        command: 'GENERATE_STATIC_SITE=1 node server.js'
      }
    }

  });

  [
    'grunt-contrib-copy',
    'grunt-contrib-watch',
    'grunt-sass',
    'grunt-nodemon',
    'grunt-text-replace',
    'grunt-concurrent',
    'grunt-shell',
    'grunt-sprockets-directives'
  ].forEach(function (task) {
    grunt.loadNpmTasks(task);
  });

  grunt.registerTask(
    'convert_template',
    'Converts the govuk_template to use mustache inheritance',
    function () {
      var script = require(__dirname + '/lib/template-conversion.js');

      script.convert();
      grunt.log.writeln('govuk_template converted');
    }
  );

  grunt.registerTask('default', [
    'copy',
    'convert_template',
    'replace',
    'sass',
    'directives',
    'concurrent:target'
  ]);

  grunt.registerTask(
    'test_default',
    'Test that the default task runs the app',
    [
      'copy',
      'convert_template',
      'replace',
      'sass'
    ]
  );

  grunt.registerTask(
    'generate',
    'Generate the static site',
    [
      'copy',
      'convert_template',
      'replace',
      'sass',
      'shell:run_app'
    ]
  );

  grunt.registerTask(
    'lint',
    'Use govuk-scss-lint to lint the sass files',
    function() {
      grunt.task.run('shell:multiple', 'lint_message');
    }
  );

   grunt.registerTask(
    'lint_message',
    'Output a message once linting is complete',
    function() {
      grunt.log.write("scss lint is complete, without errors.");
    }
  );

  grunt.registerTask(
    'test',
    'Lint the Sass files, then check the app runs',
    function() {
      grunt.task.run('lint', 'test_default', 'test_message');
    }
  );

  grunt.registerTask(
    'test_message',
    'Output a message once the tests are complete',
    function() {
      grunt.log.write("scss lint is complete and the app runs, without errors.");
    }
  );

  grunt.registerTask(
    'generate_static_site',
    'Generate a static version of all the routes',
    function () {
      var phantomjs = require('grunt-lib-phantomjs').init(grunt);

      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
        // Default PhantomJS timeout.
        timeout: 5000,
        // Explicit non-file URLs to test.
        urls: ['http://localhost:3000', 'http://localhost:3000/layout/'],
        force: false
      });

      var urls = options.urls;

      // Built-in error handlers.
      phantomjs.on('fail.load', function(url) {
        phantomjs.halt();
        grunt.log.error('PhantomJS unable to load "' + url + '" URI.');
      });

      phantomjs.on('fail.timeout', function() {
        phantomjs.halt();
        grunt.log.error('PhantomJS timed out.');
      });
      // Pass-through console.log statements.
      phantomjs.on('console', console.log.bind(console));

      urls.forEach(function(url) {
        grunt.verbose.subhead('Testing ' + url + ' ').or.write('Testing ' + url + ' ');
        phantomjs.spawn(url, {
          // Additional PhantomJS options.
          options: options,
          // Do stuff when done.
          done: function(err) {
            grunt.verbose.subhead('Done with ' + url + ' ').or.write('Done with ' + url + ' ');
          },
        });
      });
    }
  );
};
