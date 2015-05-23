angular.module('casemaker')
    .controller('catalogCtrl', function ($scope, $location, Categories, ImagesService) {
            $scope.categories = Categories.get();

            $scope.getImageUrl = ImagesService.getImageUrl;

            document.title = 'casemaker.by - Каталог';
        }
    );
/**
 * Created by Siam on 5/31/2015.
 */
