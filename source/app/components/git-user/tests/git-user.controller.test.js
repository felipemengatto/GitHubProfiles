describe("module::AppGitHub", function () {
    var data, ctrl, repos, scope, url, $httpBackend, $rootScope;

    beforeEach(function () {
        module("AppGitHub");
    });

    describe("GitUser::controller", function () {
        beforeEach(
            inject(function ($injector) {
                // Injeção das dependencias
                $httpBackend = $injector.get("$httpBackend");
                $rootScope = $injector.get("$rootScope");
                $controller = $injector.get("$controller");

                //Recupera dados falsos
                data = readJSON("app/fixtures/user-data.json"); 
                repos = readJSON("app/fixtures/user-repos.json"); 

                scope = $rootScope.$new();
                ctrl = $controller("GitUserController", { "$scope": scope });

                url = "https://api.github.com/users/felipemengatto";
                /* FAKE REQUEST */
                // Quando houver um GET na url, responda os dados falsos
                $httpBackend.whenGET(url).respond(data);
                $httpBackend.whenGET(url+'/repos').respond(repos);
            })
        );

        it("GitUserController deve estar definido", function () {
            expect(ctrl).toBeDefined();
        });

        it("O controller deve ter GET em 'https://api.github.com/users/felipemengatto'", function () {
            // Espere que aconteça um GET em 'https://api.github.com/users/felipemengatto'
            $httpBackend.expectGET(url);
            $httpBackend.expectGET(url+'/repos');
            ctrl.findUserData('felipemengatto');
            $httpBackend.flush();
        });
    });
});