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
                {name: 'ware', field: '_ware.name', enableCellEditOnFocus: false, displayName: 'Товар'},
                {name: 'orderDate', enableCellEditOnFocus: false, cellFilter: 'date:\'yyyy-MM-dd HH:mm\'', displayName: 'Дата заказа'},
                {name: 'orderNum', enableCellEditOnFocus: false, displayName: 'Номер заказа'},
                {name: 'shippingAddress', enableCellEditOnFocus: false, displayName: 'Адрес доставки'},
                {name: 'eMail', enableCellEditOnFocus: false, displayName: 'e-mail'},
                {name: 'phone', enableCellEditOnFocus: false, displayName: 'Телефон'},
                {name: 'status', enableCellEditOnFocus: false, displayName: 'Статус'}
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