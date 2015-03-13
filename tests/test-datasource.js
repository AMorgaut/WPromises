WAF.require('WPromises').addTESTS('DATASOURCES', 'datasource', function datasourcesTests() {

    'use strict';
    
    var source;
    
    source = WAF.sources[Object.keys(WAF.sources)[0]];
    
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
        promise = source.allEntities();
        promise.then(function () { throw true; })['catch'](function () {

            assert.ok(true, 'catch() is invoked');

        });
        return promise;
    });
    
    QUnit.test( "filterQuery('ID > 1')", function( assert ) {
        var done;
        assert.expect(1);
        done = assert.async();
        source.filterQuery('ID > 1').then(function (event) {
            assert.ok(true, 'then() is invoked');
            done();
        });
    });
    /*
    QUnit.test( "chained filterQuery('ID > 1')", function( assert ) {
        var done;
        assert.expect(1);
        done = assert.async();
        source.allEntities().then(function () {
            return source.filterQuery('ID > 1');
        }).then(function (event) {
            assert.ok(true, 'then() is invoked');
            done();
        });
    });
    */
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
    
    QUnit.test( "query('ID > 1') result Promise API", function( assert ) {
        var promise;
        assert.expect(3);
        promise = source.query('ID > 1');
        assert.ok(typeof promise.then === 'function', "then() exists" );
        assert.ok(typeof promise['catch'] === 'function', "catch() exists" );
        promise.then(function (event) {
            assert.ok(true, 'then() is invoked');
        });
        return promise;
    });
    
    QUnit.test( "query('ID > :1', {params:[1]}) result Promise API", function( assert ) {
        var promise;
        assert.expect(3);
        promise = source.query('ID > :1', {params:[1]});
        assert.ok(typeof promise.then === 'function', "then() exists" );
        assert.ok(typeof promise['catch'] === 'function', "catch() exists" );
        promise.then(function (event) {
            assert.ok(true, 'then() is invoked');
        });
        return promise;
    });
    
    QUnit.test( "distinctValues('ID') result Promise API", function( assert ) {
        var promise;
        assert.expect(4);
        promise = source.distinctValues('ID');
        assert.ok(typeof promise.then === 'function', "then() exists" );
        assert.ok(typeof promise['catch'] === 'function', "catch() exists" );
        promise.then(function (event) {
            assert.ok(true, 'then() is invoked');
            assert.ok(Array.isArray(event.result), 'result is an Array');
        });
        return promise;
    });
    
    QUnit.test( "orderBy('ID desc') result Promise API", function( assert ) {
        var promise;
        assert.expect(3);
        promise = source.orderBy('ID desc');
        assert.ok(typeof promise.then === 'function', "then() exists" );
        assert.ok(typeof promise['catch'] === 'function', "catch() exists" );
        promise.then(function (event) {
            assert.ok(true, 'then() is invoked');
        });
        return promise;
    });
    
    QUnit.test( "collectionRefresh({userData: 42}) result Promise API", function( assert ) {
        var promise;
        assert.expect(4);
        promise = source.collectionRefresh({userData: 42});
        assert.ok(typeof promise.then === 'function', "then() exists" );
        assert.ok(typeof promise['catch'] === 'function', "catch() exists" );
        promise.then(function (event) {
            assert.ok(true, 'then() is invoked');
            assert.ok(event.userData === 42, 'userData is valid');
        });
        return promise;
    });

//        'buildFromSelection', 'callMethod', 'filterQuery',
//        'getElements', 'getValues', 'removeCurrent', 'removeCurrentReference', 'resolveSource',
//        'save', 'setSelection', 'selectByKey', 'setEntityCollection'//, 'toArray'

    
});