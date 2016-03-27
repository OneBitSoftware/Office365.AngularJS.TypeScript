///<reference path="../../../typings/browser/ambient/ui-grid/ui-grid.d.ts" />

module Office365DemoApp.Controllers {
    'use strict';

    export class FilesController {

        public  files:          File[];
        public  gridOptions:    uiGrid.IGridOptions;

        static $inject = ['fileService'];

        constructor(private injectedFilesService: Interfaces.IFileService) {
            this.gridOptions = {
                columnDefs: [
                    { field: 'filename' }
                ]
            }
        }

        getFiles = () => {
            //cal the service to get data
            this.files = this.injectedFilesService.getFiles();

            //data bind the grid to the results
            this.gridOptions.data = this.files;
        }
    }
}