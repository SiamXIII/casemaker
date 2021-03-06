angular.module('casemaker-admin')
    .controller('categoriesCtrl', function ($scope, Categories, CONFIG, ImagesService) {
        $scope.data = Categories.get();

        $scope.file = {};

        $scope.getImageUrl = ImagesService.getImageUrl;

        $scope.gridOptions = {
            data: $scope.data,
            enableHorizontalScrollbar: 1,
            enableVerticalScrollbar: 1,
            columnDefs: [
                {name: '_id', visible: false},
                {name: 'name', enableCellEditOnFocus: false, displayName: 'Название'},
                {name: 'key', enableCellEditOnFocus: false, displayName: 'Ключ'},
                {name: 'description', enableCellEditOnFocus: false, displayName: 'Описание'}
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

        $scope.showAdd = function () {
            $scope.addVisible = true;
            $scope.add = {};
            $scope.addMode = true;
            document.getElementById("editForm").reset();
        };

        $scope.showEdit = function () {
            var rowCol = $scope.gridApi.cellNav.getFocusedCell();

            $scope.add = rowCol.row.entity;
            $scope.addMode = false;
            $scope.addVisible = true;
        };

        $scope.clearParent = function () {
            $scope.add.parentCategory = '';
        };

        $scope.hideAdd = function () {
            $scope.addVisible = false;
        };

        $scope.saveItem = function () {
            if (!$scope.add.parentCategory) {
                $scope.add.parentCategory = 0;
            }

            if ($scope.addMode) {
                $scope.data.push($scope.add);
            }

            var item = new Categories($scope.add);
            item.$save();
            $scope.hideAdd();
        };

        $scope.deleteItem = function () {
            var rowCol = $scope.gridApi.cellNav.getFocusedCell();
            var id = rowCol.row.entity._id;

            Categories.delete({id: id}, function () {
                $scope.data.splice($scope.data.indexOf(rowCol.row.entity), 1);
                $scope.cellSelected = false;
            });
        }

        $scope.options = {
            //Called for each selected file
            change: function (file) {
                //file contains info about the uploaded file
                //uploading to server
                file.$upload(CONFIG.serverUrl + '/api/upload', $scope.file)
                    .catch(function (data) {
                        $scope.add.imageUrl = file.filename;
                        $scope.add.imageType = file._file.type;
                    });
            }
        };
    }
)
;
/**
 * Created by Siam on 5/28/2015.
 */
