var Office365DemoApp;
(function (Office365DemoApp) {
    var Services;
    (function (Services) {
        'use strict';
        var FileService = (function () {
            function FileService($http, $q, adalSettings) {
                this.$http = $http;
                this.$q = $q;
                this.adalSettings = adalSettings;
                this.getOptions = {
                    headers: {
                        'Accept': 'application/json'
                    }
                };
                this.files = [];
            }
            FileService.prototype.getFiles = function () {
                var _this = this;
                var endpoint = 'https://onebit101-my.sharepoint.com/_api/v1.0/me/files/root/children';
                this.$http.get(endpoint).then(function (result) {
                    var resultItems = result.data.value;
                    for (var i in resultItems) {
                        var newFile = new Office365DemoApp.File();
                        newFile.filename = resultItems[i].name;
                        _this.files.push(newFile);
                    }
                }, function (error) {
                    console.log(error);
                    alert(error);
                });
                return this.files;
            };
            FileService.$inject = ['$http', '$q', 'adalSettings'];
            return FileService;
        })();
        Services.FileService = FileService;
    })(Services = Office365DemoApp.Services || (Office365DemoApp.Services = {}));
})(Office365DemoApp || (Office365DemoApp = {}));
//# sourceMappingURL=fileService.js.map