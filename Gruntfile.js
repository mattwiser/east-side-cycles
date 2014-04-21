
module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({

    copy: {
      build: {
        cwd: 'dev',
        src: [ '**/scripts/**', '**/img/**'],
        dest: 'dist',
        expand: true
      },
    },

    clean: {
      build: {
        src: [ 'dist' ]
      },
    },

     jade: {
      compile: {
        options: {
          data: {}
        },
        files: [{
          expand: true,
          cwd: 'dev/jade',
          src: [ '!_*.jade', '*.jade' ],
          dest: 'dist',
          ext: '.html'
        }]
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dev/sass',
          src: ['**/*.scss', '!**/vendor/**'],
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },

  autoprefixer: {
    build: {
      expand: true,
      cwd: 'dist',
      src: [ '**/*.css' ],
      dest: 'dist'
    }
  },

  watch: {

    stylesheets: {
      files: 'dev/sass/main.scss',
      tasks: [ 'stylesheets' ]
    },
    jade: {
      files: 'dev/**/*.jade',
      tasks: [ 'jade' ]
    },
    copy: {
      files: [ 'dev/**'],
      tasks: [ 'copy' ]
    }
  },

  connect: {
    server: {
      options: {
        port: 9000,
        base: 'dist',
        hostname: 'localhost'
      }
    }
  }

  });


  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // define the tasks

  grunt.registerTask(
    'stylesheets',
    'Compiles the stylesheets.',
    [ 'sass', 'autoprefixer' ]
  );

  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the dist directory.',
    [ 'clean', 'jade', 'stylesheets', 'copy']
  );

  grunt.registerTask(
    'default',
    'Watches the project for changes, automatically builds them and runs a server.',
    [ 'build', 'connect', 'watch' ]
  );
};