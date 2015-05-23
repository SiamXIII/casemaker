angular.module('casemaker')
    .controller('mainCtrl', function ($scope, $location, Promos, CONFIG) {
        $scope.promos = Promos.get();
    });
