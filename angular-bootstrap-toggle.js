(function ($, jQuery) {
    "use strict";

    // Inspired by http://www.bootply.com/92189

    var module = angular.module('angular-bootstrap-toggle', []);

    module.provider('angularBootstrapToggleConfig', function () {
        this.onLabel = 'On';
        this.offLabel = 'Off';
        this.size = '';
        this.offButtonClass = 'primary';
        this.onButtonClass = 'primary';
        this.animation = false;
        this.knobText = '';

        var self = this;

        this.$get = function () {
            return {
                onLabel: self.onLabel,
                offLabel: self.offLabel,
                size: self.size,
                offButtonClass: self.offButtonClass,
                onButtonClass: self.onButtonClass,
                animation: self.animation,
                knobText: self.knobText
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
                animation: '@',
                size: '@',
                offButtonClass: '@',
                onButtonClass: '@',
                toggled: '&',
                knobText: '@'
            },
            // TODO: This could be refactored a bit into the linking function and setting it directly.
            template: '<div class="angular-bootstrap-toggle" ng-class="{\'toggle-animation\': animation, \'custom-knob\': knobText}">' +
            '   <div class="btn-group" ng-class="{\'animation\': animation,\'toggle-on\': model, \'toggle-off\': !model}">' +
            '       <button class="btn" ng-class="{\'disabled\': disabled, \'btn-default\': !model, ' +
            '\'btn-primary\': model && onButtonClass === \'primary\', ' +
            '\'btn-success\': model && onButtonClass === \'success\', ' +
            '\'btn-info\': model && onButtonClass === \'info\', ' +
            '\'btn-warning\': model && onButtonClass === \'warning\', ' +
            '\'btn-danger\': model && onButtonClass === \'danger\', ' +
            '\'btn-lg\': size === \'lg\', \'btn-sm\': size === \'sm\'}">{{onLabel}}</button>' +
            '       <span ng-if="animation || knobText" class="btn btn-default" ng-class="{\'disabled\': disabled, \'btn-lg\': size === \'lg\', \'btn-sm\': size === \'sm\'}">{{knobText || \'&nbsp;\'}}</span>' +
            '       <button class="btn" ng-class="{\'disabled\': disabled, \'btn-default\': model,' +
            '\'btn-primary\': !model && offButtonClass === \'primary\', ' +
            '\'btn-success\': !model && offButtonClass === \'success\', ' +
            '\'btn-info\': !model && offButtonClass === \'info\', ' +
            '\'btn-warning\': !model && offButtonClass === \'warning\', ' +
            '\'btn-danger\': !model && offButtonClass === \'danger\', ' +
            ' \'btn-lg\': size === \'lg\', \'btn-sm\': size === \'sm\'}">{{offLabel}}</button>' +
            '</div></div>',
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

                if (!attrs.onButtonClass) {
                    attrs.onButtonClass = angularBootstrapToggleConfig.onButtonClass;
                }

                if (!attrs.offButtonClass) {
                    attrs.offButtonClass = angularBootstrapToggleConfig.offButtonClass;
                }

                if (!attrs.animation) {
                    attrs.animation = angularBootstrapToggleConfig.animation;
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
