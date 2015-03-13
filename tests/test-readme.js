WAF.require('WPromises').addTESTS('README', 'active', function readmeTests() {
        
    QUnit.test( "hello.helloWorld() rpc", function( assert ) {
        assert.expect(1);
        
        return hello.helloWorld().then(function (result) {
            assert.ok(result === 'Hello world', 'rpc result is ok');
        });
    });
      
    QUnit.test( "WAF.sources.employee.query('salary > 50000') datasource", function( assert ) {
        assert.expect(1);
    
        return WAF.sources.employee.query('salary > 50000').then(function success(event) {
        	assert.ok(event.dataSource instanceof WAF.DataSourceEm, 'query result provides a Server Datasource');
        });
    });
      
    QUnit.test( "wPromise1.thenify(ds.Employee, 'query') datasource", function( assert ) {
        assert.expect(1);
        var polyfill = WAF.widgets.wPromises1;
    	var empQuery = polyfill.thenify(ds.Employee, 'query');
    	// you can now do
        return empQuery('age > :1', {params: [25]}).then(function success(event) {
        	assert.ok(event.result instanceof WAF.EntityCollection, 'query result provides an EntityCollection');
        })['catch'](function (error) {
        	assert.ok(false, 'query fail the Promise');
    	});
    
    });
    
    

});