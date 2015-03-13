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
     * Manually run the test suites
     *
     * @method runTestSuites
     * @param {Array|string} modules List of test suites to run
     **/
    WPromises.prototype.runTestSuites = function runTestSuites(modules) {
        var widget = this;
        if (!this.active()) {
            return;
        }
        if (typeof modules === 'string') {
            modules = [modules];
        }
        WPromises.TESTS.forEach(function runTests(testSuite) {
            if (modules && modules.indexOf(testSuite.name) === -1) {
                return;
            }
            if (!widget[testSuite.enabled] || !widget[testSuite.enabled]()) {
                return;
            }
            QUnit.module(testSuite.name);
            testSuite.run();
        });
    };
    
    
    /**
     * Add a Wakanda WPromise Polyfill API
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
    
    
    /**
     * Add a Wakanda WPromise test suite
     *
     * @static
     * @method addTESTS
     * @param {string} name test suite module name
     * @param {string} enabled name of widget property to check 
     * @param {Function} run function executing the test suite
     **/
    WPromises.addTESTS = function addTestSuite(name, enabled, run) {
        WPromises.TESTS.push({
            name: name,
            enabled: enabled,
            run: run
        });
    };
    
}());

