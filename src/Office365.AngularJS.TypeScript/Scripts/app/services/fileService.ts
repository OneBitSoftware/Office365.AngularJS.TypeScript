module Office365DemoApp.Services {
    'use strict';

    export interface IHttpDataResponse extends ng.IHttpPromiseCallbackArg<any> {
        data: any;
    }

    export class FileService implements Interfaces.IFileService {

        files: File[];

        static $inject = ['$http','$q', 'adalSettings'];
        getOptions = {
            headers: {
                'Accept': 'application/json'
            }
        };

        constructor(
            private $http: angular.IHttpService,
            private $q: angular.IQService,
            private adalSettings: Interfaces.IAdalSettings)
        {
            this.files = [];
        }

        getFiles(): File[] {
            
            var endpoint = 'https://onebit101-my.sharepoint.com/_api/v1.0/me/files/root/children';

            this.$http.get(endpoint).then((result: IHttpDataResponse) => {
                var resultItems = result.data.value;

                for (let i in resultItems) {
                    let newFile = new File();
                    newFile.filename = resultItems[i].name;
                    this.files.push(newFile);
                }

            }, function(error) {
                console.log(error);
                alert(error);
            });

            return this.files;
        }
    }
}