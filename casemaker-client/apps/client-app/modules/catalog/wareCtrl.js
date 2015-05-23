angular.module('casemaker')
    .controller('wareCtrl', function ($scope, $location, $routeParams, Categories, Wares, Orders, ImagesService) {
            $scope.wareKey = $routeParams.ware;

            Wares.query({params: $scope.wareKey}).$promise
                .then(function(data){
                    $scope.ware = data.ware;
                    $scope.category = data.category;
                    
                    document.title = 'casemaker.by - ' + $scope.ware.name;
                });

            $scope.getImageUrl = ImagesService.getImageUrl;

            $scope.setFullImage = function (image) {
                $scope.fullImage = image;
            };
        }
    );
/**
 * Created by Siam on 5/31/2015.
 */
