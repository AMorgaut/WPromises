(function Scope_P_Test_Dataprovider() {
    'use strict';
    
    var WPromises;
    
    function dataproviderTests() {
        
        var dataclass;
        
        dataclass = WAF.ds[Object.keys(WAF.ds.getDataClasses())[0]];
        
        QUnit.module( "Wakanda Data provider API Promisification" );
        
        QUnit.test( "allEntities({userData: 42}) result Promise API", function( assert ) {
            var promise;
            assert.expect(4);
            promise = dataclass.allEntities({userData: 42});
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
            promise = dataclass.allEntities();
            promise.then(function () { throw true; })['catch'](function () {

                assert.ok(true, 'catch() is invoked');

            });
            return promise;
        });
        
    }
    
    
    QUnit.config.urlConfig.push({
        id: "dataprovider",
        label: "Wakanda Dataprovider API",
        tooltip: "Run Wakanda Dataprovider API Promisification Unit tests"
    });
    
    WPromises = WAF.require('WPromises');
    WPromises.addTESTS('dataprovider', dataproviderTests);
    
}());
