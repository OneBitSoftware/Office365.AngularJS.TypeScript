module Office365DemoApp.Directives {

    export class TopMenu implements ng.IDirective {
        templateUrl = 'directives/topMenu.html';
        replace = true;
        public scope = {};

        constructor() {
        }
        
        link = () => {
 
        }

        static factory(): ng.IDirectiveFactory {
            var directive = () => {
                return new TopMenu();
            }
            directive.$inject = [];

            return directive;
        }
    }


}