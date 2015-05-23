angular.module('casemaker-admin')
    .service('ImagesService', function (CONFIG) {
        this.getImageUrl = function (url, type) {
            return CONFIG.serverUrl + '/api/images?imageUrl=' + url + '&imageType=' + type;
        };
    });
