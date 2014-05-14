module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      dist: {
        src: ["build/main-built.js"],
        dest: "public/javascripts/application.js"
      },
      css: {
        src: ["bower_components/bootstrap/bootstrap.css", "assets/stylesheets/application.css"],
        dest: "public/stylesheets/application.css"
      }
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      all: ["Gruntfile.js", "src/js/**/*.js"]
    },
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: "Gruntfile.js",
        tasks: ["jshint:all"]
      },
      sources: {
        files: ["src/**/*.js"],
        tasks: ["compile"]
      }
    },
    availabletasks: {
      tasks: {}
    },
    connect: {
      server: {
        options: {
          livereload: true,
          hostname: "*"
        }
      }
    },
    bower : {
      install: {
        options: {
          targetDir: "bower_components" }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "src/js",
          mainConfigFile: "src/js/main.js",
          include: ["../../bower_components/requirejs/require.js", ],
          name: "main",
          out: "build/main-built.js",
          optimize: "none",
          shim: {
            strophejs: { exports: "Strophe" },
            underscore: { exports: "_" },
            backbone: { deps: ["underscore"], exports: "Backbone" }
          },
          paths: {
            underscore: "../../bower_components/underscore/underscore",
            backbone: "../../bower_components/backbone/backbone",
            strophejs: "../../bower_components/strophejs/strophe",
            jquery: "../../bower_components/jquery/jquery"
          }
        }
      }
    }
  });

  grunt.registerTask("init:dev", ["bower"]);
  grunt.registerTask("compile",  ["jshint:all", "requirejs", "concat:dist", "concat:css"]);
  grunt.registerTask("server",   ["compile", "connect", "watch"]);
  grunt.registerTask("tasks",    ["availabletasks"]);
};
