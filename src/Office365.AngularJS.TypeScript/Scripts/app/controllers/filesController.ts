///<reference path="../../../typings/browser/ambient/ui-grid/ui-grid.d.ts" />

module Office365DemoApp.Controllers {
    'use strict';

    export class FilesController {

        public  files:          File[];
        private filesService:   Interfaces.IFileService;
        public  gridOptions:    uiGrid.IGridOptions;

        static $inject = ['fileService'];

        constructor(injectedFilesService: Interfaces.IFileService) {
            this.filesService = injectedFilesService;
            this.gridOptions = {
                columnDefs: [
                    { field: 'filename' }
                ]
            }
        }

        getFiles = () => {
            //cal the service to get data
            this.files = this.filesService.getFiles();

            //data bind the grid to the results
            this.gridOptions.data = this.files;
        }
    }
}