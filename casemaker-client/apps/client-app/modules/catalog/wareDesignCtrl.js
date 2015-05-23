angular.module('casemaker')
    .controller('catalogCtrl', function ($scope, $location, Categories, Wares, Orders, ImagesService, CONFIG) {
            var allCategories = Categories.query();
            var catalog = {
                name: 'Catalog',
                categories: Categories.query({parentCategory: '0'}),
                _id: 0
            };

            $scope.categories = Categories.query({parentCategory: '0'});

            $scope.orderVisible = false;
            $scope.serverUrl = CONFIG.serverUrl;
            $scope.imageId = '';

            $scope.backRoute = [];
            $scope.backRoute.push(catalog);

            $scope.getImageUrl = ImagesService.getImageUrl;

            $scope.getItems = function (category) {
                $scope.categories = Categories.query({
                    parentCategory: category._id
                });
                $scope.wares = Wares.query({
                    category: category._id
                });

                $scope.backRoute.push({
                    _id: category._id,
                    name: category.name,
                    wares: $scope.wares,
                    categories: $scope.categories
                });

                $location.search({
                    category: category._id
                });

                $scope.currentCategory = category;
            }

            $scope.showWare = function (ware) {
                $scope.backRoute.push({
                    _id: ware._id,
                    name: ware.name,
                    wares: $scope.wares,
                    categories: $scope.categories
                });

                $scope.currentWare = ware;
                $scope.isWare = true;
                $scope.fullImage = undefined;

                $location.search({ware: ware._id});
            };

            $scope.showOrderForm = function () {
                $scope.orderVisible = true;
                $scope.designerVisible = false;
            };

            $scope.hideForm = function () {
                $scope.orderVisible = false;
                $scope.designerVisible = false;
            }

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

            $scope.designWare = function (ware) {
                $scope.designerVisible = true;
                $scope.designerProduct = {};
                $scope.order = {};
            };

            $scope.goBack = function (_id) {
                while ($scope.backRoute[$scope.backRoute.length - 1]._id != _id) {
                    $scope.backRoute.pop();
                }
                $scope.categories = $scope.backRoute[$scope.backRoute.length - 1].categories;
                $scope.wares = $scope.backRoute[$scope.backRoute.length - 1].wares;

                $scope.isWare = false;
                $scope.hideForm();

                if ($scope.backRoute[$scope.backRoute.length - 1]._id) {
                    $location.search({
                        category: $scope.backRoute[$scope.backRoute.length - 1]._id
                    });
                }
                else {
                    $location.url($location.path());
                };

                $scope.currentCategory = _.findWhere(allCategories, {_id: $scope.backRoute[$scope.backRoute.length - 1]._id}) || catalog;
            };

            $scope.setFullImage = function (image) {
                $scope.fullImage = image;
            }

            $scope.$watch($location, function () {
                if ($location.search()) {
                    buildChain($location.search());
                }
            });

            function buildChain(search) {
                var wareId = search.ware;
                var categoryId = search.category;

                if (wareId) {
                    Wares.get({_id: wareId},
                        function (ware) {
                            if (!ware.length) {
                                return;
                            }

                            var result = [];
                            var chainLink = ware[0];

                            chainLink = _.findWhere(allCategories, {_id: chainLink.category})

                            result.push({
                                _id: chainLink._id,
                                name: chainLink.name,
                                wares: Wares.query({
                                    category: chainLink._id
                                }),
                                categories: _.where(allCategories, {parentCategory: chainLink._id})
                            });

                            while (chainLink.parentCategory && chainLink.parentCategory != 0) {
                                chainLink = _.findWhere(allCategories, {_id: chainLink.parentCategory});

                                result.push({
                                    _id: chainLink._id,
                                    name: chainLink.name,
                                    wares: Wares.query({
                                        category: chainLink._id
                                    }),
                                    categories: _.where(allCategories, {parentCategory: chainLink._id})
                                });
                            }

                            $scope.backRoute = [];

                            $scope.backRoute.push(catalog);

                            angular.forEach(result, function (value, index) {
                                $scope.backRoute.push(result[result.length - index - 1]);
                            })

                            $scope.showWare(ware[0]);
                        });
                }
                ;
                if (categoryId) {
                    Categories.get({_id: categoryId},
                        function (category) {
                            if (!category.length) {
                                return;
                            }

                            var result = [];
                            var chainLink = category[0];
                            var category = chainLink;

                            while (chainLink.parentCategory  && chainLink.parentCategory != 0) {
                                chainLink = _.findWhere(allCategories, {_id: chainLink.parentCategory});

                                result.push({
                                    _id: chainLink._id,
                                    name: chainLink.name,
                                    wares: Categories.query({
                                        category: chainLink._id
                                    }),
                                    categories: _.where(allCategories, {parentCategory: chainLink._id})
                                });
                            }

                            $scope.backRoute = [];

                            $scope.backRoute.push(catalog);

                            angular.forEach(result, function (value, index) {
                                $scope.backRoute.push(result[result.length - index - 1]);
                            })

                            $scope.getItems(category);
                        });
                }
                ;
            };
        }
    );
/**
 * Created by Siam on 5/31/2015.
 */
