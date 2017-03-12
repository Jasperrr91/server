'use strict';

/**
 * @ngdoc function
 * @name picastApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the picastApp
 */
angular.module('picastApp')
    .controller('MainCtrl', ['$scope', 'PiCastService', '$rootScope', '$interval', 'notify', 'SocketFactory',
        function ($scope, PiCastService, $rootScope, $interval, notify, SocketFactory) {
            PiCastService.getStatus();
            $interval(PiCastService.getStatus, 1000);
            SocketFactory.on('connected', function (data) {
                SocketFactory.emit('connected');
            });

            SocketFactory.on('player_status_update', function (data) {
                console.log('player_status_update', data)
            });


            $rootScope.$on('error', function (evt, message) {
                notify.closeAll();
                notify(message)
            });

            $rootScope.$on('player_status_update', function (evt, status) {
                $scope.player_status = status;
                $rootScope.$broadcast('rzSliderForceRender');
            });
        }]);