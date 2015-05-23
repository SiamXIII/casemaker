angular.module('casemaker-admin')
    .controller('waresCtrl', function ($scope, Wares, Categories, CONFIG, ImagesService) {
        $scope.data = Wares.get();

        $scope.categories = Categories.get();
        $scope.file = {};

        $scope.getImageUrl = ImagesService.getImageUrl;

        $scope.gridOptions = {
            data: $scope.data,
            enableHorizontalScrollbar: 1,
            enableVerticalScrollbar: 1,
            columnDefs: [
                {name: '_id', visible: false},
                {name: 'name', enableCellEditOnFocus: false},
                {name: 'category', enableCellEditOnFocus: false},
                {name: 'description', enableCellEditOnFocus: false},
                {name: 'price', enableCellEditOnFocus: false}
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
            $scope.add = {
                design: {},
                additionalImages: []
            };

            $scope.addMode = true;
            initializeAdditional();
            document.getElementById("editForm").reset();
        };

        $scope.showEdit = function () {
            var rowCol = $scope.gridApi.cellNav.getFocusedCell();

            $scope.add = rowCol.row.entity;
            $scope.addMode = false;
            $scope.addVisible = true;
            initializeAdditional();
        };

        $scope.hideAdd = function () {
            $scope.addVisible = false;
        };

        $scope.saveItem = function () {
            if ($scope.addMode) {
                $scope.data.push($scope.add);
            }

            var item = new Wares($scope.add);
            item.$save();
            $scope.hideAdd();
        };

        $scope.deleteItem = function () {
            var rowCol = $scope.gridApi.cellNav.getFocusedCell();
            var id = rowCol.row.entity._id;

            Wares.delete({id: id}, function () {
                $scope.data.splice($scope.data.indexOf(rowCol.row.entity), 1);
                $scope.cellSelected = false;
            });
        }

        $scope.wareImageFile = {
            //Called for each selected file
            change: function (file) {
                //file contains info about the uploaded file
                //uploading to server
                file.$upload(CONFIG.serverUrl + '/api/upload', $scope.file)
                    .catch(function (data) {
                        $scope.add.imageUrl = data.item.filename;
                        $scope.add.imageType = file._file.type;
                    });
            }
        };

        $scope.wareFile = {
            //Called for each selected file
            change: function (file) {
                //file contains info about the uploaded file
                //uploading to server
                file.$upload(CONFIG.serverUrl + '/api/upload', $scope.file)
                    .catch(function (data) {
                        $scope.add.wareUrl = data.item.filename;
                        $scope.add.wareImageType = file._file.type;
                    });
            }
        };

        $scope.overlayFile = {
            //Called for each selected file
            change: function (file) {
                //file contains info about the uploaded file
                //uploading to server
                file.$upload(CONFIG.serverUrl + '/api/upload', $scope.file)
                    .catch(function (data) {
                        $scope.add.overlayUrl = data.item.filename;
                        $scope.add.overlayImageType = file._file.type;
                    });
            }
        };

        $scope.detailsFile = {
            //Called for each selected file
            change: function (file) {
                //file contains info about the uploaded file
                //uploading to server
                file.$upload(CONFIG.serverUrl + '/api/upload', $scope.file)
                    .catch(function (data) {
                        $scope.add.detailsUrl = data.item.filename;
                        $scope.add.detailsImageType = file._file.type;
                    });
            }
        };


        $scope.addImage = function () {
            $scope.add.additionalImages.push({});

            $scope.additionalImages.push({
                //Called for each selected file
                change: function (file) {
                    //file contains info about the uploaded file
                    //uploading to server
                    file.$upload(CONFIG.serverUrl + '/api/upload', $scope.file)
                        .catch(function (data) {
                            $scope.add.additionalImages[$scope.additionalImages.length - 1].imageUrl = data.item.filename;
                            $scope.add.additionalImages[$scope.additionalImages.length - 1].imageType = file._file.type;
                        });
                }
            });
        };

        function initializeAdditional() {
            $scope.additionalImages = [];

            angular.forEach($scope.add.additionalImages, function (image, index) {
                $scope.additionalImages.push({
                    //Called for each selected file
                    change: function (file) {
                        //file contains info about the uploaded file
                        //uploading to server
                        file.$upload(CONFIG.serverUrl + '/api/upload', $scope.file)
                            .catch(function (data) {
                                $scope.add.additionalImages[$scope.additionalImages[index]].imageUrl = data.item.filename;
                                $scope.add.additionalImages[$scope.additionalImages[index]].imageType = file._file.type;
                            });
                    }
                });
            });
        };
    });