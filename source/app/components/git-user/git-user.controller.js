(function() {
    'use strict';

    angular
        .module('AppGitHub')
        .controller('GitUserController', GitUser);

    /* Injeção de depencias */
    GitUser.$inject = ['GitUserFactory'];

    /**
    * Função de gerenciamento do Controller
    * @param {object} Dependenciais Injetadas
    */
    function GitUser(GitUserFactory) {

        var self = this;

        /**
        *VARS
        */
        self.findUserData   = findUserData;
        var userDefault     = 'felipemengatto'; // valor setado como default
        self.userListData   = [];
        self.userListRepo   = [];

        /**
        *Init Controller And Activate Fuctions
        */
        active();

        /**
        * Funções do Controller
        */

        //Função que é buscada sempre na inicialização do controller
        function active(){
            self.findUserData(userDefault);
        }

        //Busca Usuario
        //@param {string}
        function findUserData(userDefault) {

            var getNameUser = userDefault;
            
            GitUserFactory.findUserData(getNameUser).then(
                function(response){
                    self.userListData = response.data;

                    //SE EXISTIR NOME
                    //BUSCA REPOSITORIOS
                    if (typeof self.userListData.name !== "undefined") {
                        //GET REPOS
                        findUserRepo(getNameUser);
                    }
                }
            );

        }

        //Busca  Repositorios do Usuario
        //@param {string}
        function findUserRepo(userDefault) {
            
            GitUserFactory.findUserRepo(userDefault).then(
                function(response){
                    self.userListRepo = response.data;
                }
            );

        }

    }
    
})();