'use strict';

describe('Directive: invites', function () {

  // load the directive's module and view
  beforeEach(module('portraitfrancaisApp'));
  beforeEach(module('app/invites/invites.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<invites></invites>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the invites directive');
  }));
});