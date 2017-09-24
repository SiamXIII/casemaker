angular.module('casemaker')
    .directive('newsItem', function () {
        return {
            restrict: 'E',
            templateUrl: '/casemaker-client/apps/client-app/modules/news/news-item.html',
            scope: {
                promo: '='
            },
            replace: true,
            controller: function ($scope, ImagesService) {
                $scope.getImageUrl = ImagesService.getImageUrl;

                $scope.infoVisible = false;

                $scope.toggleInfo = function () {
                    $scope.infoVisible = !$scope.infoVisible;
                }
            }
        };
    });
