angular.module('casemaker-admin')
    .controller('slidesCtrl', function ($scope, Slides, ImagesService, CONFIG) {
        $scope.data = Slides.get();
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
            var item = new Slides($scope.add);

            item.$save(function () {
                $scope.data.push($scope.add);
            });

            $scope.hideAdd();
        };

        $scope.removeItem = function (index) {
            Slides.delete({id: $scope.data[index]._id}, function () {
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
/**
 * Created by Siam on 5/28/2015.
 */
/**
 * Created by Siam on 5/30/2015.
 */
