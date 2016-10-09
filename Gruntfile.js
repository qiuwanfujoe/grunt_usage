module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['index*.js','!Gruntfile.js'],
        dest: 'dist/<%= pkg.name %>.concat.js'
      }
    },
    babel: {
        options: {
            sourceMap: true,
            presets: ['babel-preset-es2015']
        },
        dist: {
          src: ['<%= concat.dist.dest %>'],
          dest: 'babel_src/babel_result.js'
        },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/bundle.js': ['<%= babel.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['index*.js','Gruntfile.js'],
      options: {
        //这里是覆盖JSHint默认配置的选项
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    },
    clean: ["dist/", "babel_src/"],
    webpack: {
      someName: {
        // webpack options
        entry: 'dist/<%= pkg.name %>.min.js',
        output: {
            path: "dist/",
            filename: "resut.js",
        },
    }
  }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.registerTask('default', ['clean','concat','babel','uglify']);

};
