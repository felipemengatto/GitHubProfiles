(function() {
    'use strict';

    angular
        .module('AppGitHub')
        .factory('GitUserFactory', GitUserFactory);

    GitUserFactory.$inject = ['$http'];

    /**
    * Função de gerenciamento do Service
    * @param {object} Dependenciais Injetadas
    */
    function GitUserFactory($http) {
        var service = {
            findUserData: findUserData,
            findUserRepo: findUserRepo
        };
        return service;

        /**
        * Funções do Service
        * @return {object} findUserData
        * @return {object} findUserRepo
        */

        function findUserData(data) {

            return $http.get('https://api.github.com/users/' + data)
                .then(findUserComplete)
                .catch(findUserFailed);

            function findUserComplete(response) {
                return response;
            }

            function findUserFailed(error) {
                return error;
            }

        }

        function findUserRepo(data) {

            return $http.get('https://api.github.com/users/' + data + '/repos')
                .then(findUserRepoComplete)
                .catch(findUserRepoFailed);

            function findUserRepoComplete(response) {
                return response;
            }

            function findUserRepoFailed(error) {
                console.log('Error Get User Repo API' + error.data);
            }

        }
    }
})();