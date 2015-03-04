(function Scope_P_Test_Rpc() {
    'use strict';
    
    var WPromises;
    
    function rpcTests() {
        
        QUnit.module( "Wakanda RPC Promisification" );
        
        QUnit.test( "module API", function( assert ) {
            assert.expect(3);
            assert.ok( hello.hasOwnProperty('helloWorldSync'), "helloWorldSync() exists" );
            assert.ok( hello.hasOwnProperty('helloWorld'), "helloWorld() exists" );
            assert.ok( hello.hasOwnProperty('helloWorldAsync'), "helloWorldAsync() exists" );
        });
        
        QUnit.test( "method result Promise API", function( assert ) {
            var promise;
            assert.expect(3);
            promise = hello.helloWorld();
            assert.ok(typeof promise.then === 'function', "then() exists" );
            assert.ok(typeof promise['catch'] === 'function', "catch() exists" );
            promise.then(function () {
                assert.ok(true, 'then() is invoked');
            });
            return promise;
        });
        
        QUnit.test( "catch() SSJS error", function( assert ) {
            var done;
            assert.expect(1);
            done = assert.async();
            hello.fail().then(function () { 
            
                assert.ok(false, 'then() is invoked');   
                done();         
            
            })['catch'](function () {

                assert.ok(true, 'catch() is invoked');
                done();

            });
        });
        
        QUnit.test( "catch then() callback error", function( assert ) {
            var promise;
            assert.expect(1);
            promise = hello.helloWorld();
            promise.then(function () { throw true; })['catch'](function () {

                assert.ok(true, 'catch() is invoked');

            });
            return promise;
        });
        
    }
    
    
    QUnit.config.urlConfig.push({
        id: "rpc",
        label: "Wakanda RPC API",
        tooltip: "Run Wakanda RPC API Promisification Unit tests"
    });
    
    WPromises = WAF.require('WPromises');
    WPromises.addTESTS('rpc', rpcTests);
    
}());