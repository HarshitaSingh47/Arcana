'use strict';
var GulpConfig = (function (){
    function gulpConfig () {
        this.source = './public/';
        this.sourceApp = this.source = 'app/';
        this.tsOutputPath = this.sourceApp + 'js';
        this.allJavaScript = [this.source + '/js/**/*.js'];
        this.allTypeScript = this.sourceApp + '/**/*.ts';
        
        this.typings = './typings';
        this.libraryTypeScriptDefinitions = './typings/**/*.ts';
    }
    
    return gulpConfig;
}());
module.exports = GulpConfig;