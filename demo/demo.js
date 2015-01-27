(function ($, jQuery) {
    "use strict";

    window.app = window.app || {};
    app.module = angular.module('demoApp', ['angular-bootstrap-toggle']);

    /**
     * @param $scope
     * @constructor
     */
    function DemoController($scope) {
        $scope.toggleValue = false;

        $scope.wasToggled = function () {
            console.log('Toggled handler was called');
        }
    }

    app.module.controller('demoController', DemoController);
})();
