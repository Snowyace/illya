// Gruntfile.js
var path = require("path");
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here
     // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      src: ['Gruntfile.js', 'makise/public/**/*.js']
      //only need source key destination for jshint and no destination key
    },

    watch: {
      options:{
        livereload: true
      },
      css:{
        files: ['makise/public/css/*.css']
      }
    },
    
    express: {
      myServer: {
        options:{
          script: path.resolve('./makise', 'town.js'),
          livereload: true
        }
      }
    }
    

   
   

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

// ============= // CREATE TASKS ========== //
  grunt.registerTask('myServer', ['express:myServer','watch']);
  grunt.registerTask('default', ['jshint', 'watch']); 
};