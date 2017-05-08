'use strict';

describe('Directive: newsletter', function () {

  // load the directive's module and view
  beforeEach(module('portraitfrancaisApp'));
  beforeEach(module('app/newsletter/newsletter.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<newsletter></newsletter>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the newsletter directive');
  }));
});