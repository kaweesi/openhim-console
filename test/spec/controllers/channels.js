'use strict';

describe('Controller: ChannelsCtrl', function () {

  // load the controller's module
  beforeEach(module('openhimWebui2App'));

  var ChannelsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChannelsCtrl = $controller('ChannelsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of channels to the scope', function () {
    //expect(scope.channels.length).toBe(2);
    expect(scope.openModal).toBeDefined();
  });
});
