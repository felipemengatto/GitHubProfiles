module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        copy: {
          dist: {
            files: [
                {
                    expand: true, //habilita o cwd
                    cwd: 'source/', //relativo à source, mas não a inclui na cópia      
                    src: ['assets/**/*', '!assets/**/*.css', '**/*.html'], 
                    dest: 'deploy/'
                },
                {
                    expand: true, //habilita o cwd
                    cwd: 'node_modules/font-awesome/fonts/',
                    src: ['**/*'], 
                    dest: 'deploy/assets/fonts/'
                }
            ]        
          }
        },

        //limpa pastas
        clean: {
          dist: {
            src: ["deploy", "temp"]
          }
        },

        //concatena arquivos
        concat: {
            dist: {
                src: ['source/assets/css/app-style.css', 
                        'source/app/components/git-user/git-user.css',
                        'node_modules/font-awesome/css/font-awesome.css'],

                dest: './temp/css/concat.css'
            }
        },

        //minifica css concatenado
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
             files: {
                  'deploy/assets/css/main.css': ['./temp/css/concat.css']
               }
            }
        },

        uglify: {
            options: {
              mangle: true
            },

            dist: {
              files: {
                'deploy/assets/js/components.min.js': ['node_modules/angular/angular.js',
                                                        'node_modules/angular-route/angular-route.js',
                                                        'node_modules/angular-http-loader/app/package/js/angular-http-loader.min.js'],
                
                'deploy/assets/js/app.min.js': ['source/app/app.module.js',
                                                    'source/app/app.config.js', 
                                                    'source/app/directives/alert-box/alert-box.directive.js', 
                                                    'source/app/components/git-user/git-user.controller.js', 
                                                    'source/app/components/git-user/git-user.service.js']
              }
            },
        },

        useref: {

                html: ['deploy/*.html'],

                temp: 'deploy'

        },

        //minifica html
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                        {
                            expand: true,     // Enable dynamic expansion.
                            cwd: 'deploy/',      // Src matches are relative to this path.
                            src: ['**/*.html'], // Actual pattern(s) to match.
                            dest: 'deploy/',   // Destination path prefix.
                        },
                      ],
            }
        }


    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('deploy', ['clean', 'concat', 'cssmin', 'uglify', 'copy', 'useref', 'htmlmin'])
}