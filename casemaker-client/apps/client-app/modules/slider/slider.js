angular.module('casemaker')
    .directive('mainSlider', function () {
        return {
            restrict: 'E',
            templateUrl: '/apps/client-app/views/slider.html',
            scope: {},
            controller: function ($scope, Slides, ImagesService) {
                $scope.images = Slides.get();

                $scope.getImageUrl = ImagesService.getImageUrl;

                $scope.setHeight = function () {
                    $('.top-slider').height($('.top-slider').width() / 1920 * 600 + 'px');
                }
            }
        }
    });


/**
 * Created by Siam on 5/30/2015.
 */
