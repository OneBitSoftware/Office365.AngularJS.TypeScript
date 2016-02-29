module Office365DemoApp.Controllers {
    'use strict';

    export class FilesController {

        private files: File[];
        private filesService: Interfaces.IFileService;

        static $inject = ['fileService'];

        constructor(injectedFilesService: Interfaces.IFileService) {
            this.filesService = injectedFilesService;
        }

        getFiles = () => {
            this.files = this.filesService.getFiles();
        }
    }
}