/*
 * angular-currency v1.0.6
 * (c) 2015-2016 Brandon Krueger <brandon.c.krueger@gmail.com>
 * License: MIT
 */


angular.module('bckrueger.angular-currency', [])
.directive('angularCurrency', [function () {
	'use strict';
	
	return {
		'require': '?ngModel',
		'restrict': 'A',
		'scope': {
			angularCurrency: '=',
			variableOptions: '='
		},
		'compile': compile
	};
	
	function compile(tElem, tAttrs) {
		var isInputText = tElem.is('input:text');
		
		return function(scope, elem, attrs, controller) {
			
			var autoElem = new AutoNumeric(elem[0], scope.angularCurrency);
			
			var updateElement = function (newVal) {
				if (!isNaN(parseFloat(newVal)) && isFinite(newVal)) {
					autoElem.set(newVal);
				}
			};
			
			if (scope.variableOptions === true) {
				scope.$watch('angularCurrency', function(newValue) {
					autoElem.update(newValue);
				});
			}

			if (controller && isInputText) {
				scope.$watch(tAttrs.ngModel, function () {
					controller.$render();
				});

				controller.$render = function () {
					updateElement(controller.$viewValue);
				};

				elem.on('keyup', function () {
					scope.$applyAsync(function () {
						controller.$setViewValue(autoElem.getNumericString());
					});
				});
				elem.on('change', function () {
					scope.$applyAsync(function () {
						controller.$setViewValue(autoElem.getNumericString());
					});
				});
			} else {
				if (isInputText) {
					attrs.$observe('value', function (val) {
						updateElement(val);
					});
				}
			}
		};
	}
}]);
module.exports='bckrueger.angular-currency';
