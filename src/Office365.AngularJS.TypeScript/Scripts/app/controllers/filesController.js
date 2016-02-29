var Office365DemoApp;
(function (Office365DemoApp) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var FilesController = (function () {
            function FilesController() {
                alert('got file222s!');
                var file1 = new Office365DemoApp.File();
                file1.filename = "filename1";
                var file2 = new Office365DemoApp.File();
                file2.filename = "filename2";
                this.files.push(file2);
            }
            FilesController.prototype.getFiles = function () {
                return this.files;
            };
            return FilesController;
        })();
        Controllers.FilesController = FilesController;
    })(Controllers = Office365DemoApp.Controllers || (Office365DemoApp.Controllers = {}));
})(Office365DemoApp || (Office365DemoApp = {}));
//# sourceMappingURL=filesController.js.map