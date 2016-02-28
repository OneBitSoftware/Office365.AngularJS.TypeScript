var Office365DemoApp;
(function (Office365DemoApp) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var FilesController = (function () {
            function FilesController() {
                alert('got file222s!');
            }
            FilesController.prototype.GetFiles = function () {
                alert('got files!');
            };
            return FilesController;
        })();
        Controllers.FilesController = FilesController;
    })(Controllers = Office365DemoApp.Controllers || (Office365DemoApp.Controllers = {}));
})(Office365DemoApp || (Office365DemoApp = {}));
//# sourceMappingURL=filesController.js.map