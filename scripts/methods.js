(function Scope_WPromise_methods() {
    'use strict';

    var WPromises = WAF.require('WPromises');
    
    WPromises.APIS = [];
    WPromises.TESTS = [];
    
    
    /**
     * Apply the selected polyfills 
     *
     * @method polyfill
     **/
    WPromises.prototype.polyfill = function WPromisesPolyfill() {
        var that;
        that = this;
        if (!this.active()) {
            return;
        }
        WPromises.APIS.forEach(function applyWPromisesAPI(api) {
            if (api && that[api.name] && that[api.name]()) {
                api.init(api.thenify ? that.thenify : that.promisify);
            }
        });
    };
    
    
    /**
     * @experimental
     * @method runTests
     **/
    WPromises.prototype.runTests = function runWPromisesTests() {
        var that;
        that = this;
        if (!this.active()) {
            return;
        }
        WPromises.TESTS.forEach(function (api) {
            // TODO
        });
    };
    
    
    /**
     * Add a Wakanda Promise Polyfill API
     *
     * @static
     * @method addAPI
     * @param {string} name
     * @param {Function} init
     * @param {boolean} thenify
     **/
    WPromises.addAPI = function addWPromisesAPI(name, init, thenify) {
        WPromises.APIS.push({
            name: name, 
            init: init,
            thenify: thenify
        });
    };
    
}());

