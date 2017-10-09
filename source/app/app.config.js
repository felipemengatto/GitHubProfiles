(function() {
    'use strict';

    angular
        .module('AppGitHub')
        .config(Config);

    /* Injeção de depencias */
    Config.$inject = ['$routeProvider', 'httpMethodInterceptorProvider'];

    function Config($routeProvider, httpMethodInterceptorProvider) {

        /**
        * CONFIG LOADING
        */
        httpMethodInterceptorProvider.whitelistDomain('github.com');

        /**
        * CONFIG ROUTERS
        */
        $routeProvider
            .when('/', {
                templateUrl: './app/components/git-user/git-user.html',
                controller: 'GitUserController',
                controllerAs: 'gitUserCtrl'
            }).

            otherwise({redirectTo: '/'});
    }

})();