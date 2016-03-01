var Office365DemoApp;
(function (Office365DemoApp) {
    var Services;
    (function (Services) {
        'use strict';
        var FileService = (function () {
            function FileService() {
                this.files = [];
                //Temp data
                var file1 = new Office365DemoApp.File();
                file1.filename = "filename1";
                var file2 = new Office365DemoApp.File();
                file2.filename = "filename2";
                this.files.push(file2);
                var file3 = new Office365DemoApp.File();
                file3.filename = "filename3";
                this.files.push(file3);
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