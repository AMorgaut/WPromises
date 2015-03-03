(function Scope_P_Component() {
    'use strict';
    
    var WPromises;
    
    function polyfillWakandaComponents(thenify) {

        debugger;
        WAF.loadComponent = thenify(WAF, 'loadComponent');
        
        // TODO: handle the load() method of the component widgets ?

    }
    
    WPromises = WAF.require('WPromises');
    WPromises.addAPI('component', polyfillWakandaComponents, true);
    
}());