angular.module('casemaker-admin')
    .controller('extraCtrl', function ($scope, $http) {
        var instagramUrl = 'https://api.instagram.com/v1/tags/graver_by/media/recent?access_token=732051385.674061d.3cab369edb5147adbf8a8285f70c423e&count=60&callback=JSON_CALLBACK';
        $scope.photos = [];

        getNext(instagramUrl);

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

        $scope.gridOptions = {
            data: $scope.photos,
            enableHorizontalScrollbar: 1,
            enableVerticalScrollbar: 1,
            columnDefs: [
                {name: '_id', visible: false},
                {name: 'user.username', enableCellEditOnFocus: false},
                {name: 'caption.created_time', enableCellEditOnFocus: false, cellFilter: 'secondsToDateTime | date:\'yyyy-MM-dd HH:mm\''},
                {name: 'link', enableCellEditOnFocus: false}
            ],
            columnVirtualizationThreshold: 20,
            enableCellEditOnFocus: true,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.cellNav.on.navigate($scope, function (value) {
                    if (value) {
                        $scope.cellSelected = true;
                    }
                })
            }
        }

        $scope.showView = function () {
            $scope.addVisible = true;
        };

        $scope.hideView = function () {
            $scope.addVisible = false;
        };
    }
)
    .filter('secondsToDateTime', [function () {
        return function (seconds) {
            var date = new Date(seconds * 1000);
            return date;
        };
    }]);
/**
 * Created by Siam on 5/28/2015.
 */
/**
 * Created by Siam on 7/29/2015.
 */
/**
 * Created by siamx on 8/18/2015.
 */
