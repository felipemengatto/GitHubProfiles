// Bloco de testes do modulo
describe('module::AppGitHub', function (){
    var $route, $rootScope, $location, $httpBackend;
    
    beforeEach(function () {
        // Define o nome do modulo que o teste vai trabalhar
        module('AppGitHub'); 
    });

    // A sintaxe abaixo define um escopo de teste, um bloco se preferir
    describe('routing::config', function () {
        beforeEach(function () {
            inject(function ($injector) { // Carrega as dependencias
                $route = $injector.get('$route');
                $rootScope = $injector.get('$rootScope');
                $location = $injector.get('$location');
                //Simula requests na hora dos testes
                $httpBackend = $injector.get('$httpBackend');
            });
        });

        // Este bloco testa a navegação para a raiz
        it('deve navegar ate a raiz', function () {
            //Se houver um GET na url, ele responde o caminho da rota
            $httpBackend.when('GET', './app/components/git-user/git-user.html').respond('main');

            // Beleza código, vá para a rota '/'
            $rootScope.$apply(function () { $location.path('/'); });

            // Quando isso acontecer, espere que:
            // O caminho seja '/'
            expect($location.path()).toBe('/'); 
            // O template seja './app/git-user/git-user.html'
            expect($route.current.templateUrl).toBe('./app/components/git-user/git-user.html');
            // O controller seja 'GitUserController'
            expect($route.current.controller).toBe('GitUserController');
        });

        // Este bloco testa o redirecionamento para a raiz quando a url for inválida
        it('deve redirecionar urls nao registradas para a raiz', function () {
            $httpBackend.when('GET', './app/components/git-user/git-user.html').respond('main');

            // Beleza código, vá para a rota '/other'
            $rootScope.$apply(function () {
                $location.path('/other');
            });

            // Quando isso acontecer, espere que:
            // O caminho seja '/'
            expect($location.path()).toBe('/'); 
            // O template seja './app/git-user/git-user.html'
            expect($route.current.templateUrl).toBe('./app/components/git-user/git-user.html');
            // O controller seja 'GitUserController'
            expect($route.current.controller).toBe('GitUserController');
        });
    });
});