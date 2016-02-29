module Office365DemoApp.Services {
    'use strict';

    export class FileService implements Interfaces.IFileService {

        files: File[];

        constructor() {
            this.files = [];

            //Temp data
            let file1 = new File();
            file1.filename = "filename1";
            let file2 = new File();
            file2.filename = "filename2";
            this.files.push(file2);
            let file3 = new File();
            file3.filename = "filename3";
            this.files.push(file3);
        }

        getFiles(): File[] {
            return this.files;
        }
    }
}