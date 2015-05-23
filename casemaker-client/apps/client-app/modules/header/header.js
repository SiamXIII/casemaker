angular.module('casemaker')
    .directive('mainHeader', function () {
        return {
            restrict: 'E',
            templateUrl: '/apps/client-app/views/header.html',
            controller: function ($scope, $location, $route) {
                $scope.doSearch = function () {
                    $location.url('/search');
                    $location.search({name: $scope.searchString});
                };

                $scope.processKeypress = function (event) {
                    if (event.keyCode == 13) {
                        $scope.doSearch();
                    }
                }
            }
        }
    });
