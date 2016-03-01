///<reference path="../../../typings/browser/ambient/ui-grid/ui-grid.d.ts" />
var Office365DemoApp;
(function (Office365DemoApp) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var FilesController = (function () {
            function FilesController(injectedFilesService) {
                var _this = this;
                this.getFiles = function () {
                    //cal the service to get data
                    _this.files = _this.filesService.getFiles();
                    //data bind the grid to the results
                    _this.gridOptions.data = _this.files;
                };
                this.filesService = injectedFilesService;
                this.gridOptions = {
                    columnDefs: [
                        { field: 'filename' }
                    ]
                };
            }
            FilesController.$inject = ['fileService'];
            return FilesController;
        })();
        Controllers.FilesController = FilesController;
    })(Controllers = Office365DemoApp.Controllers || (Office365DemoApp.Controllers = {}));
})(Office365DemoApp || (Office365DemoApp = {}));
//# sourceMappingURL=filesController.js.map