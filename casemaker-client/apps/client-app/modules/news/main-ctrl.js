angular.module('casemaker')
    .controller('mainCtrl', function ($scope, $location, Services, Promos, ImagesService, CONFIG) {
        $scope.promos = Promos.get();
        $scope.services = Services.get();

        $scope.getImageUrl = ImagesService.getImageUrl;
    });
