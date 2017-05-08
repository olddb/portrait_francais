'use strict';

describe('Directive: ngElevateZoom', function () {

  // load the directive's module
  beforeEach(module('portraitfrancaisApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-elevate-zoom></ng-elevate-zoom>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngElevateZoom directive');
  }));
});