var Office365DemoApp;
(function (Office365DemoApp) {
    var Directives;
    (function (Directives) {
        var TopMenu = (function () {
            function TopMenu() {
                this.templateUrl = 'directives/topMenu.html';
                this.replace = true;
                this.scope = {};
                this.link = function () {
                };
            }
            TopMenu.factory = function () {
                var directive = function () {
                    return new TopMenu();
                };
                directive.$inject = [];
                return directive;
            };
            return TopMenu;
        })();
        Directives.TopMenu = TopMenu;
    })(Directives = Office365DemoApp.Directives || (Office365DemoApp.Directives = {}));
})(Office365DemoApp || (Office365DemoApp = {}));
//# sourceMappingURL=topMenu.js.map