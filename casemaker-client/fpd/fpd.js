angular.module('casemaker')
    .directive('fpd', function () {
        return {
            restrict: "E",
            templateUrl: "fpd/fpd.html",
            scope: {
                ware: '@',
                overlay: '@',
                details: '@',
                hideForm: '&',
                serverUrl: '@',
                showOrderForm: '&',
                order: '='
            },
            link: function ($scope, $http) {

                jQuery(document).ready(function () {
                    var width = $('#designer').width();

                    var yourDesigner = $('#case-designer').fancyProductDesigner({
                        templatesDirectory: 'fpd/templates/',
                        width: width,
                        fonts: ['Arial', 'Fearless', 'Helvetica', 'Times New Roman', 'Verdana', 'Geneva', 'Gorditas'],
                        customTextParameters: {
                            colors: false,
                            removable: true,
                            resizable: true,
                            draggable: true,
                            rotatable: true,
                            autoCenter: true,
                            boundingBox: "Base"
                        },
                        customImageParameters: {
                            draggable: true,
                            removable: true,
                            resizable: true,
                            colors: '#000',
                            autoCenter: true,
                            boundingBox: "Base",
                            boundingBoxClipping: true,
                            zChangeable: true,
                            autoSelect: true
                        }
                    }).data('fancy-product-designer');

                    $scope.save = function () {
                        var url = $scope.serverUrl + '/api/uploadImage';
                        var id = guid();

                        $scope.order.imageId = id;
                        $scope.order.customImages = [];

                        var customImages = [];
                        angular.forEach(yourDesigner.getCustomElements(), function (item) {
                            $scope.order.customImages.push(id + '_' + item.element.title);

                            customImages.push({
                                title: id + '_' + item.element.title,
                                source: item.element.source
                            });
                        });

                        $.ajax({
                            type: 'POST',
                            url: url,
                            data: {
                                base64_image: {
                                    title: id + '.png',
                                    source: yourDesigner.getProductDataURL()
                                },
                                custom_images: customImages
                            },
                            crossDomain: true,
                            success: function (responseData, textStatus, jqXHR) {
                                var value = responseData.someKey;
                            },
                            error: function (responseData, textStatus, errorThrown) {
                                alert('POST failed.');
                            }
                        });
                    };

                    $scope.orderProduct = function () {
                        $scope.save();
                        $scope.showOrderForm();
                    };

                    //upload image
                    document.getElementById('design-upload').onchange = function (e) {
                        if (window.FileReader) {
                            var reader = new FileReader();
                            reader.readAsDataURL(e.target.files[0]);
                            reader.onload = function (e) {

                                var image = new Image;
                                image.src = e.target.result;
                                image.onload = function () {
                                    var maxH = 400,
                                        maxW = 300,
                                        imageH = this.height,
                                        imageW = this.width,
                                        scaling = 1;

                                    if (imageW > imageH) {
                                        if (imageW > maxW) {
                                            scaling = maxW / imageW;
                                        }
                                    }
                                    else {
                                        if (imageH > maxH) {
                                            scaling = maxH / imageH;
                                        }
                                    }

                                    yourDesigner.addElement('image', e.target.result, 'my custom design', {
                                        colors: $('#colorizable').is(':checked') ? '#000000' : false,
                                        zChangeable: true,
                                        removable: true,
                                        draggable: true,
                                        resizable: true,
                                        rotatable: true,
                                        autoCenter: true,
                                        boundingBox: "Base",
                                        boundingBoxClipping: true,
                                        scale: scaling
                                    });
                                };
                            };
                        }
                        else {
                            alert('FileReader API is not supported in your browser, please use Firefox, Safari, Chrome or IE10!')
                        }
                    };
                });
            }
        }

        function guid() {
            function _p8(s) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }

            return _p8() + _p8(true) + _p8(true) + _p8();
        }
    });
/**
 * Created by Siam on 6/28/2015.
 */
