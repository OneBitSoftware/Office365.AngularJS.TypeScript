'use strict';
var GulpConfig = (function () {
    function gulpConfig(webroot) {
        this.typscriptAppFolder = 'Scripts/app/';
        this.stylesFolder = 'Styles/';
        this.paths = {
            dest: {
                src: "./" + webroot + "/src/",
                styles: "./" + webroot + "/styles/",
                externalJS: "./" + webroot + "/src/external/",
                externalCSS: "./" + webroot + "/styles/external/",
                root: "./" + webroot
            },
            source: {
                typscriptApp: this.typscriptAppFolder,
                appTypeScriptReferences: this.typscriptAppFolder + '_all.ts',
                angularTsFiles: [this.typscriptAppFolder + '**/*.ts', '!' + this.typscriptAppFolder + '_all.ts'],
                angularHtmlFiles: [this.typscriptAppFolder + '**/*.html'],
                styles: this.stylesFolder + '**/*.less',
                baseLessFile: this.stylesFolder + 'base.less'
            }
        }

        // Holds information about the hosting environment.
        // This only works if you set up your custom windows system variable
        // VS has issues with setting up environment variables atm
        //TODO: Make it work properly
        this.environment = {
            // The names of the different environments.
            development: "Development",
            staging: "Staging",
            production: "Production",
            // Gets the current hosting environment the application is running under. This comes from the environment variables.
            current: function () {
                return process.env.ASPNET_ENV || this.development;
            },
            // Are we running under the development environment.
            isDevelopment: function () {
                return this.current() === this.development;
                //return true; //remove when fixed
            },
            // Are we running under the staging environment.
            isStaging: function () {
                return this.current() === this.staging;
            },
            // Are we running under the production environment.
            isProduction: function () {
                return this.current() === this.production;
            }
        };
    }
    return gulpConfig;
})();
module.exports = GulpConfig;