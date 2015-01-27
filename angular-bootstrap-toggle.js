(function ($, jQuery) {
    "use strict";

    // Inspired by http://www.bootply.com/92189

    var module = angular.module('angular-bootstrap-toggle', []);

    module.provider('angularBootstrapToggleConfig', function () {
        this.onLabel = 'On';
        this.offLabel = 'Off';
        this.size = '';

        var self = this;

        this.$get = function () {
            return {
                onLabel: self.onLabel,
                offLabel: self.offLabel,
                size: self.size
            }
        }
    });

    module.directive('angularBootstrapToggle', function (angularBootstrapToggleConfig) {
        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                disabled: '=',
                onLabel: '@',
                offLabel: '@',
                animate: '@',
                size: '@',
                toggled: '&'
            },
            template: '<div class="btn-group" ng-class="{\'disabled\': disabled}">' +
            '   <button class="btn" ng-class="{\'btn-default\': !model, \'btn-primary\': model, \'btn-lg\': size === \'lg\', \'btn-sm\': size === \'sm\'}">{{onLabel}}</button>' +
            '   <button class="btn" ng-class="{\'btn-default\': model, \'btn-primary\': !model, \'btn-lg\': size === \'lg\', \'btn-sm\': size === \'sm\'}">{{offLabel}}</button>' +
            '</div>',
            compile: function (element, attrs) {
                if (!attrs.onLabel) {
                    attrs.onLabel = angularBootstrapToggleConfig.onLabel;
                }

                if (!attrs.offLabel) {
                    attrs.offLabel = angularBootstrapToggleConfig.offLabel;
                }

                if (!attrs.size) {
                    attrs.size = angularBootstrapToggleConfig.size;
                }

                return this.link;
            },
            link: function (scope, element, attrs, ngModelCtrl) {
                ngModelCtrl.$formatters.push(function (modelValue) {
                    return modelValue;
                });

                ngModelCtrl.$parsers.push(function (viewValue) {
                    return viewValue;
                });

                ngModelCtrl.$render = function () {
                    scope.model = ngModelCtrl.$viewValue;
                };

                element.on('click', function () {
                    scope.$apply(scope.toggle);
                });

                scope.toggle = function () {
                    if (scope.disabled) {
                        return;
                    }

                    scope.model = !scope.model;
                    ngModelCtrl.$setViewValue(scope.model);

                    var toggledHandler = scope.toggled();

                    if (angular.isDefined(toggledHandler)) {
                        toggledHandler();
                    }
                }
            }
        }
    });
})();
