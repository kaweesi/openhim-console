'use strict';

angular.module('openhimConsoleApp')
  .controller('MediatorConfigModalCtrl', function ($rootScope, $scope, $modalInstance, $timeout, Api, Notify, Alerting, mediator) {
    $scope.mediator = Api.Mediators.get({ urn: mediator.urn }, function(){
      if (!$scope.mediator.config) {
        $scope.mediator.config = {};
      }
    });

    var notifyUser = function() {
      Notify.notify('mediatorConfigChanged');
      $modalInstance.close();
    };

    var success = function () {
      Alerting.AlertAddMsg('top', 'success', 'The mediator configuration was updated successfully');
      notifyUser();
    };

    var error = function (err) {
      Alerting.AlertAddMsg('top', 'danger', 'An error has occurred while saving the mediator config: #' + err.status + ' - ' + err.data);
      notifyUser();
    };

    $scope.saveConfig = function () {
      new Api.MediatorConfig($scope.mediator.config).$update({ urn: $scope.mediator.urn }, success, error);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
