angular.module('casemaker')
    .controller('mainCtrl', function ($scope, $location, Services, Promos, ImagesService, CONFIG) {
        var pageSize = 4,
            pagesCount;

        Promos.get().$promise
            .then(function (promos) {
                $scope.promos = promos;
                $scope.updatePromosPageArray();
                pagesCount = parseInt(promos.length / pageSize);
            });

        $scope.promosPage = 0;

        $scope.services = Services.get();

        $scope.getImageUrl = ImagesService.getImageUrl;

        $scope.updatePromosPageArray = function () {
            $scope.promosPageArray = $scope.promos.slice($scope.promosPage * pageSize, ($scope.promosPage + 1) * pageSize);
        };

        $scope.promosPrevPage = function () {
            $scope.promosPage = ($scope.promosPage + pageSize - 1) % pagesCount;
        };

        $scope.promosNextPage = function () {
            $scope.promosPage = ++$scope.promosPage % pagesCount;
        };

        $scope.$watch('promosPage', function (newValue, oldValue) {
            if (oldValue === newValue || !$scope.promos.length) {
                return;
            }

            $scope.updatePromosPageArray();
        });
    });
