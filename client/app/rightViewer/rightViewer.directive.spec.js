'use strict';

describe('Directive: rightViewer', function () {

  // load the directive's module and view
  beforeEach(module('portraitfrancaisApp'));
  beforeEach(module('app/rightViewer/rightViewer.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<right-viewer></right-viewer>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the rightViewer directive');
  }));
});