'use strict';

describe('Directive: leftViewer', function () {

  // load the directive's module and view
  beforeEach(module('portraitfrancaisApp'));
  beforeEach(module('app/leftViewer/leftViewer.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<left-viewer></left-viewer>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the leftViewer directive');
  }));
});