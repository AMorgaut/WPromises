(function Scope_P_DataSource() {
    'use strict';
    
    var 
        WPromises,
        DATASOURCE_SERVER_METHODS,
        DATASOURCE_SERVER_SIMPLE_ATTR_METHODS,
        DATASOURCE_SERVER_RELATED_ATTR_METHODS;
    
    
    /**
     * @private
     * @method polyfillDataSource
     * @param {Function} thenify
     **/
    function polyfillDataSource(promisify) {
        // parse Datasources
        Object.keys(WAF.sources).forEach(function (name) {
            var source, methods;

            source = WAF.sources[name];

            if (source instanceof WAF.DataSourceEm) {

                methods = DATASOURCE_SERVER_METHODS;

            } else if (source instanceof WAF.DataSourceEmSimpleAttribute) {

                //methods = DATASOURCE_SERVER_SIMPLE_ATTR_METHODS;

            } else if (source instanceof WAF.DataSourceEmRelatedAttributeValue) {

                //methods = DATASOURCE_SERVER_RELATED_ATTR_METHODS;

            }
            
            methods.forEach(function (methodName) {
                source[methodName] = promisify(source, methodName);;
            });
        });
    }
    
    DATASOURCE_SERVER_METHODS = [
        'allEntities', 'buildFromSelection', 'callMethod', 'collectionRefresh', 'distinctValues', 'filterQuery',
        'getElements', 'getValues', 'orderBy', 'query', 'removeCurrent', 'removeCurrentReference', 'resolveSource',
        'save', 'setSelection', 'selectByKey', 'setEntityCollection'//, 'toArray'
    ];
    DATASOURCE_SERVER_SIMPLE_ATTR_METHODS = [
        'setValue', 'fire', 'dispatch'
    ];
    DATASOURCE_SERVER_RELATED_ATTR_METHODS = [
        'set', 'load'
    ];
    
    WPromises = WAF.require('WPromises');
    WPromises.addAPI('datasource', polyfillDataSource);
    
}());