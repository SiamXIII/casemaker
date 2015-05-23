angular.module('casemaker')
    .controller('searchCtrl', function ($scope, $location, Search, ImagesService) {
        $scope.searchString = $location.search().name;

        $scope.wares = [];

        Search.query({name: $scope.searchString}).$promise
            .then(function (data) {
                $scope.wares = data;

                document.title = 'casemaker.by - ' + $scope.searchString;
            });

        $scope.getImageUrl = ImagesService.getImageUrl;
    });
