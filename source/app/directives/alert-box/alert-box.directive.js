(function() {
    'use strict';

    angular
        .module('AppGitHub')
        .directive('alertBox', AlertBox);

    AlertBox.$inject = [];

    /**
    * @param {object} Dependenciais Injetadas
    */
    function AlertBox() {

        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                tipo: '@',
                msg: '@',
                mostrar:'='
            },
            template: '<div class="alert ng-class: tipo;" ng-show="mostrar"> {{msg}} </div>'
        };

        return directive;

        function link(scope, element, attrs) {
        }
    }
})();