angular.module('casemaker')
    .controller('categoryCtrl', function ($scope, $location, $routeParams, Categories, Wares, Orders, ImagesService) {
            $scope.categoryKey = $routeParams.category;

            $scope.wares = [];

            Categories.query({params: $scope.categoryKey}).$promise
                .then(function (data) {
                    $scope.category = data.category;
                    $scope.wares = data.wares;

                    document.title = 'casemaker.by - ' + $scope.category.name;
                });

            $scope.getImageUrl = ImagesService.getImageUrl;
        }
    );
/**
 * Created by Siam on 5/31/2015.
 */
