'use strict';
/* global moment:false */

angular.module('openhimConsoleApp')
  .directive('metricsDateTypeSelector', function () {
    return {
      restrict:'EA',
      templateUrl:'views/partials/metrics-date-type-selector.html',
      scope: {
        selectedDateType: '=',
        onChange: '=?'
      },
      link: function(scope){
        scope.optionsEnabled = {
          minute: true,
          hour: true,
          day: true,
          week: true,
          month: true,
          year: true
        };

        if (!scope.onChange) {
          scope.onChange = function(){};
        }

        function processOptions() {
          var from = moment(scope.selectedDateType.from);
          var until = moment(scope.selectedDateType.until);

          var diff = function(unit) {
            return Math.abs(from.diff(until, unit));
          };

          var maxBreakdown = 120;

          if (from.isAfter(until)) {
            scope.selectedDateType.from = scope.selectedDateType.until;
          }

          scope.optionsEnabled.minute = true;
          scope.optionsEnabled.hour = true;
          scope.optionsEnabled.day = true;
          scope.optionsEnabled.week = true;
          scope.optionsEnabled.month = true;
          scope.optionsEnabled.year = true;

          if (diff('minutes') > maxBreakdown) {
            scope.optionsEnabled.minute = false;
            if (scope.selectedDateType.type === 'minute') {
              scope.selectedDateType.type = 'hour';
            }
          }
          if (diff('hours') > maxBreakdown) {
            scope.optionsEnabled.hour = false;
            if (scope.selectedDateType.type === 'hour') {
              scope.selectedDateType.type = 'day';
            }
          }
          if (diff('days') > maxBreakdown) {
            scope.optionsEnabled.day = false;
            if (scope.selectedDateType.type === 'day') {
              scope.selectedDateType.type = 'week';
            }
          }
          if (diff('weeks') > maxBreakdown) {
            scope.optionsEnabled.week = false;
            if (scope.selectedDateType.type === 'week') {
              scope.selectedDateType.type = 'month';
            }
          }
          if (diff('months') > maxBreakdown) {
            scope.optionsEnabled.month = false;
            if (scope.selectedDateType.type === 'month') {
              scope.selectedDateType.type = 'year';
            }
          }
        }

        scope.customDateBreakdownChange = function() {
          processOptions();
          scope.onChange();
        };

        // process for initial values
        processOptions();
      }
    };
  });
