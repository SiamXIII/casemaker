angular.module('casemaker-admin')
    .controller('promosCtrl', function ($scope, Promos, ImagesService, CONFIG) {
        $scope.data = Promos.get();
        $scope.file = {};

        $scope.getImageUrl = ImagesService.getImageUrl;

        $scope.showAdd = function () {
            $scope.addVisible = true;
            $scope.add = {};
            document.getElementById("editForm").reset();
        };

        $scope.hideAdd = function () {
            $scope.addVisible = false;
        };

        $scope.addItem = function () {
            var item = new Promos($scope.add);

            item.$save(function () {
                $scope.data.push($scope.add);
            });

            $scope.hideAdd();
        };

        $scope.removeItem = function (index) {
            Promos.delete({id: $scope.data[index]._id}, function () {
                $scope.data.splice(index, 1);
            });
        };

        $scope.options = {
            //Called for each selected file
            change: function (file) {
                //file contains info about the uploaded file
                //uploading to server
                $scope.add.imageUrl = file.filename;
                $scope.add.imageType = file._file.type;
                file.$upload(CONFIG.serverUrl + '/api/upload', $scope.file)
                    .catch(function (data) {
                        $scope.add.imageUrl = file.filename;
                        $scope.add.imageType = file._file.type;
                    });
            }
        };
    });