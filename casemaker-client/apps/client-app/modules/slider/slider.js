angular.module('casemaker')
    .directive('mainSlider', function () {
        return {
            restrict: 'E',
            templateUrl: '/casemaker-client/apps/client-app/views/slider.html',
            scope: {},
            controller: function ($scope, Slides) {
                $scope.images = Slides.get();
            }
        };
    });


/**
 * Created by Siam on 5/30/2015.
 */
