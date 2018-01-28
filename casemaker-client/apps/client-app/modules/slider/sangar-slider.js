angular.module('casemaker')
    .directive('sangarSlider', function () {
        return {
            restrict: 'E',
            templateUrl: '/casemaker-client/apps/client-app/views/sangar-slider.html',
            scope: {
                images: '='
            },
            link: function ($scope, $element) {
                $(document).ready(function () {
                    setTimeout(function () {
                        $('.' + $scope.sliderClass).sangarSlider({
                            fullWidth: true,
                            themeClass: 'default',
                            maxHeight: 500
                        });
                    }, 0);
                });
            },
            controller: function ($scope, ImagesService) {
                $scope.getImageUrl = ImagesService.getImageUrl;
                $scope.sliderClass = 'sangar_' + (new Date()).getTime();
            }
        };
    });


/**
 * Created by Siam on 5/30/2015.
 */

