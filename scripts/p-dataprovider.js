(function Scope_P_DataProvider() {
    'use strict';
    
    var 
        WPromises, 
        DATASTORE_METHODS,
        DATACLASS_METHODS,
        COLLECTION_METHODS,
        ENTITY_METHODS,
        ATTRIBUTE_RELATED_METHODS,
        ATTRIBUTE_RELATED_SET_METHODS;
    
    
    /**
     * @private
     * @method polyfillDataClass
     * @param {Function} thenify
     * @param {WAF.Dataclass} dataclass
     **/
    function polyfillDataClass(thenify, dataclass) {
        
        function polyfillResult(event) {
            var result, methods;
            
            result = event.result || event.entityCollection || event.entity;
            methods = [];
            if (result instanceof WAF.EntityCollection) {

                methods = COLLECTION_METHODS;

            } else if (result instanceof WAF.Entity) {

                methods = ENTITY_METHODS;

            } else if (result instanceof WAF.EntityAttributeRelated) {

                methods = ATTRIBUTE_RELATED_METHODS;

            } else if (result instanceof WAF.EntityAttributeRelatedSet) {

                methods = ATTRIBUTE_RELATED_SET_METHODS;

            }
            methods.forEach(function thenifyDataclassObject(methodName) {

                result[methodName] = thenify(result, methodName, polyfillResult);

            });
        }

        DATACLASS_METHODS.forEach(function thenifyDataclass(methodName) {
            dataclass[methodName] = thenify(dataclass, methodName);//, polyfillResult);
        });
    }
    
    
    /**
     * @private
     * @method polyfillDataProvider
     * @param {Function} thenify
     **/
    function polyfillDataProvider(thenify) {
        
        // parse Dataclasses
        Object.keys(WAF.ds).forEach(function (name) {
            var dataclass;
            dataclass = WAF.ds[name];
            if (dataclass instanceof WAF.DataClass) {

                polyfillDataClass(thenify, dataclass);

            } else if (DATASTORE_METHODS.indexOf(name) > -1) {

                WAF.ds[name] = thenify(dataclass, name, polyfillResult);

            }
        });
        
    }
    
    DATASTORE_METHODS = [
        'addToCatalog'
    ];
    DATACLASS_METHODS = [
        'distinctValues', 'all', 'allEntities', 'query', 'find', 'getEntity', 'callMethod'//, 'toArray'
    ];
    COLLECTION_METHODS = [
        'buildFromSelection', 'callMethod', 'distinctValues', 'findKey', 'forEach', 'getEntity', 'load',
        'orderby', 'query', 'refresh', 'removeAllEntities', 'removeEntity', 'removeEntityReference'//, 'toArray'
    ];
    ENTITY_METHODS = [
        'callMethod', 'save', 'remove', 'serverRefresh'
    ];
    ATTRIBUTE_RELATED_METHODS = [
        'getValue'// load() is an alias to getValue() & setValue() doesn't send to server
    ];
    ATTRIBUTE_RELATED_SET_METHODS = [
        'getValue'//, 'setValue' // /!\ setValue is undefined
    ];

    WPromises = WAF.require('WPromises');
    WPromises.addAPI('dataprovider', polyfillDataProvider, 'thenify');
    
}());