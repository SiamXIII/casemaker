angular.module('casemaker')
    .controller('wareDesignCtrl', function ($scope, $location, $routeParams, Wares, ImagesService, CONFIG) {
        $scope.wareKey = $routeParams.ware;
        $scope.order = {};

        Wares.query({params: $scope.wareKey}).$promise
            .then(function (data) {
                $scope.ware = data.ware;

                document.title = 'casemaker.by - ' + $scope.ware.name;

                $scope.wareUrl = ImagesService.getImageUrl($scope.ware.wareUrl);
                $scope.overlayUrl = ImagesService.getImageUrl($scope.ware.overlayUrl);
                $scope.detailsUrl = ImagesService.getImageUrl($scope.ware.detailsUrl);
            });

        $scope.orderVisible = false;
        $scope.serverUrl = CONFIG.serverUrl;
        $scope.imageId = '';

        $scope.showOrderForm = function () {
            $scope.orderVisible = true;
            $scope.designerVisible = false;
        };

        $scope.hideForm = function () {
            $scope.orderVisible = false;
            $scope.designerVisible = false;
        };

        $scope.orderWare = function () {
            var order = new Orders({
                    '_ware': $scope.currentWare._id,
                    'orderDate': (new Date(Date.now())).toISOString(),
                    'phone': $scope.order.phone,
                    'shippingAddress': $scope.order.shippingAddress,
                    'eMail': $scope.order.eMail,
                    'status': 'Submitted',
                    'imageId': $scope.order.imageId,
                    'customImages': $scope.order.customImages,
                    'sellPrice': $scope.currentWare.price
                }
            );

            order.$save(function () {
                alert('ordered');
                $scope.orderVisible = false;
            });
        };

        $scope.designWare = function () {
            $scope.designerProduct = {};
            $scope.order = {};
        };
    });
