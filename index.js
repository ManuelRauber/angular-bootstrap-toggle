(function ($, jQuery) {
    "use strict";

    window.app = window.app || {};
    app.module = angular.module('demoApp', ['angular-bootstrap-toggle']);

    /**
     * @param $scope
     * @constructor
     */
    function DemoController($scope) {
        $scope.wasToggled = function () {
            console.log('Toggled handler was called');
        };

        $scope.toggleTrue = true;
        $scope.toggleFalse = false;
    }

    app.module.controller('demoController', DemoController);
})();
