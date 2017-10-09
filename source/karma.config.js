/**
 * Arquivo do test runner
 *
 *  Dependencias:
 *  npm install -g karma
 *  npm install -g karma-jasmine
 *  npm install -g karma-junit-reporter
 *  npm install -g karma-chrome-launcher
 *  npm install -g karma-firefox-launcher
 *  npm install -g karma-phantomjs-launcher
 *  npm install -g karma-read-json
 */
module.exports = function(config) {
    config.set({
        basePath: './',

        files: [ // Arquivos incluidos no teste
            "../node_modules/angular/angular.js",
            "../node_modules/angular-route/angular-route.js",
            "../node_modules/angular-http-loader/app/package/js/angular-http-loader.js",
            "../node_modules/angular-mocks/angular-mocks.js",
            "../node_modules/karma-read-json/karma-read-json.js",
            /* Aplicação */
            'app/*.module.js',
            'app/*.config.js',
            'app/**/*.js',
            /* Testes */
            'app/tests/*.js', // Testes da aplicação e configurações
            'app/**/tests/*.js', // Testes dos "componentes"
            { // Habilita carregamento de dados falsos
                pattern:  'app/fixtures/*.json',
                watched:  true,
                served:   true,
                included: false
            }
        ],

        exclude: [ // Padrão de arquivos que vão ser excluidos da inclusão
            'app/*.example.js',
            'app/**/*.example.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-read-json',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    })
}
