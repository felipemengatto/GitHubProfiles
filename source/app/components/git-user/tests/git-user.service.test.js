describe("module::AppGitHub", function () {
    var data, repos, url, GitUserFactory, $httpBackend;

    beforeEach(function () {
        module("AppGitHub");
    });

    describe("GitUser::service", function () {
        beforeEach(
            inject(function ($injector) {
                // Injeção das dependencias
                $httpBackend = $injector.get("$httpBackend");
                GitUserFactory = $injector.get("GitUserFactory");

                ///Recupera dados falsos
                data = readJSON("app/fixtures/user-data.json"); 
                repos = readJSON("app/fixtures/user-repos.json"); 

                url = "https://api.github.com/users/felipemengatto";
                /* FAKE REQUEST */
                // Quando houver um GET na url, responda os dados falsos
                $httpBackend.whenGET(url).respond(data);
                $httpBackend.whenGET(url+'/repos').respond(repos);
            })
        );

        it("GitUserFactory deve estar definido", function () {
            expect(GitUserFactory).toBeDefined();
        });

        it("O service deve ter GET em 'https://api.github.com/users/felipemengatto'", function () {
            // Espere que aconteça um GET em 'https://api.github.com/users/felipemengatto'
            $httpBackend.expectGET(url);
            GitUserFactory.findUserData('felipemengatto');
            $httpBackend.flush();
        });
    });
});