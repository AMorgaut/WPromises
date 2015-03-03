(function Scope_P_RPC() {
    'use strict';
    
    var WPromises;
    
    function polyfillRPC(promisify) {
        WAF.config.loadRPC.forEach(function (name) {
            var module, baseName;
            module = name.split('namespace=')[1];
            module = window[module];
            Object.keys(module).forEach(function (name) {
                var position;
                position = name.indexOf('Async');
                if (position !== - 1) {
                    baseName = name.substr(0, position);
                    // Synchronous RPC Method
                    module[baseName + 'Sync'] = module[baseName];
                    // Asynchronous RPC Method
                    module[baseName] = promisify(module, name);
                }
            });
        });
    }
    
    WPromises = WAF.require('WPromises');
    WPromises.addAPI('rpc', polyfillRPC);
    
}());