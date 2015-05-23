angular.module('casemaker-admin')
    .controller('ordersCtrl', function ($scope, Orders, ImagesService) {
        $scope.data = $scope.data = Orders.get();

        $scope.getImageUrl = ImagesService.getImageUrl;

        $scope.gridOptions = {
            data: $scope.data,
            enableHorizontalScrollbar: 1,
            enableVerticalScrollbar: 1,
            columnDefs: [
                {name: '_id', visible: false},
                {name: 'ware', field: '_ware.name', enableCellEditOnFocus: false},
                {name: 'orderDate', enableCellEditOnFocus: false, cellFilter: 'date:\'yyyy-MM-dd HH:mm\''},
                {name: 'orderNum', enableCellEditOnFocus: false},
                {name: 'shippingAddress', enableCellEditOnFocus: false},
                {name: 'eMail', enableCellEditOnFocus: false},
                {name: 'phone', enableCellEditOnFocus: false},
                {name: 'status', enableCellEditOnFocus: false}
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

        $scope.showEdit = function () {
            var rowCol = $scope.gridApi.cellNav.getFocusedCell();

            $scope.add = rowCol.row.entity;
            $scope.addVisible = true;
        };

        $scope.hideAdd = function () {
            $scope.addVisible = false;
        };
    });