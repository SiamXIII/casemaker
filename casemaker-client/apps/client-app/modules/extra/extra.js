angular.module('casemaker')
    .controller('extraCtrl', function ($scope, $http, ngDialog) {
        var instagramUrl = 'https://api.instagram.com/v1/tags/graver_by/media/recent?access_token=732051385.674061d.3cab369edb5147adbf8a8285f70c423e&count=60&callback=JSON_CALLBACK';
        $scope.photos = [];

        getNext(instagramUrl);

        $scope.showFull = function (image) {
            ngDialog.open({
                template: '/casemaker-client/apps/client-app/templates/popup.html',
                data: image
            });
        }

        function getNext(instaUrl) {
            $http.jsonp(instaUrl)
                .success(function (data) {
                    if (data) {
                        angular.forEach(data.data, function (value) {
                            $scope.photos.push(value);
                        });

                        if (data.pagination.next_url) {
                            getNext(data.pagination.next_url);
                        }
                    }
                });
        }
    });
/**
 * Created by siamx on 8/17/2015.
 */
