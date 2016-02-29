var Office365DemoApp;
(function (Office365DemoApp) {
    var Services;
    (function (Services) {
        'use strict';
        var FileService = (function () {
            function FileService() {
                this.files = [];
            }
            FileService.prototype.getFiles = function () {
                return this.files;
            };
            return FileService;
        })();
        Services.FileService = FileService;
    })(Services = Office365DemoApp.Services || (Office365DemoApp.Services = {}));
})(Office365DemoApp || (Office365DemoApp = {}));
//# sourceMappingURL=fileService.js.map