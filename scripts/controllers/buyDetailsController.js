(function () {
    'use strict';
    angular
        .module('makeFriends')
        .controller('buyDetailsControl', buyDetailsControl)

    buyDetailsControl.$inject = ['$scope', '$rootScope', '$state','$timeout', '$window', '$location','$http'];

    function buyDetailsControl($scope, $rootScope, $state, $timeout, $window, $location, $http) {
        $rootScope.title = $state.$current.data.pageTitle;




    }


})();