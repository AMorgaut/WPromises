(function Scope_P_Test_Datasource() {
    'use strict';
    
    var WPromises;
    
    function datasourceTests() {
        
        var source;
        
        source = WAF.sources[Object.keys(WAF.sources)[0]];
        
        QUnit.module( "Wakanda Datasource Promisification" );
        
        QUnit.test( "allEntities({userData: 42}) result Promise API", function( assert ) {
            var promise;
            assert.expect(4);
            promise = source.allEntities({userData: 42});
            assert.ok(typeof promise.then === 'function', "then() exists" );
            assert.ok(typeof promise['catch'] === 'function', "catch() exists" );
            promise.then(function (event) {
                assert.ok(true, 'then() is invoked');
                assert.ok(event.userData === 42, 'userData is valid');
            });
            return promise;
        });
        
        QUnit.test( "allEntities() - catch then() callback error", function( assert ) {
            var promise;
            assert.expect(1);
            promise = hello.helloWorld();
            promise.then(function () { throw true; })['catch'](function () {

                assert.ok(true, 'catch() is invoked');

            });
            return promise;
        });
        
        /*
        QUnit.test( "Selections", function( assert ) {
            var promise, selection, done;
            assert.expect(4);
            done = assert.async();
            source.addListener('onSelectionChange', function () {
                done();
            });
            selection = new WAF.Selection("multiple");
            selection.setSelectedRows([1]);
            promise = source.setSelection(selection, {userData: 42});
            assert.ok(typeof promise.then === 'function', "then() exists" );
            assert.ok(typeof promise['catch'] === 'function', "catch() exists" );
            promise.then(function (event) {
                assert.ok(true, 'then() is invoked');
                assert.ok(event.userData === 42, 'userData is valid');
            });
            return promise;
        });
        */
        
    }
    
    
    QUnit.config.urlConfig.push({
        id: "datasource",
        label: "Wakanda Datasource API",
        tooltip: "Run Wakanda Datasource API Promisification Unit tests"
    });
    
    WPromises = WAF.require('WPromises');
    WPromises.addTESTS('datasource', datasourceTests);
    
}());