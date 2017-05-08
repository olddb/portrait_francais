'use strict';

describe('Directive: middleViewer', function () {

  // load the directive's module and view
  beforeEach(module('portraitfrancaisApp'));
  beforeEach(module('app/middleViewer/middleViewer.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<middle-viewer></middle-viewer>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the middleViewer directive');
  }));
});