(function Scope_Promisify() {
    
    var
        WPromises, 
        isOption, 
        noop, 
        some, 
        push,
        PROMISE_API;

    
    /**
     * Inspect the Wakanda native method parameters to detect the "options" parameter
     * that will be used to resolve or reject the Promise
     *
     * @private
     * @method initParams
     * @param {Object} params Wakanda native method parameters
     **/
    function initParams(params) {
        var result;
        
        function testOptionParam(param) {
            if (isOption(param)) {
                result.options = param;
                return true;
            }
        }
        
        result = {
            params: params,
            options: {}
        };
        
        if (!some.call(result.params, testOptionParam)) {
            push.call(result.params, result.options);
        }
        
        return result;
    }
    
    
    /**
     * Bind Promise callbacks to the Wakanda async method result callbacks
     *
     * @private
     * @method bindCallbacks
     * @param {Object} options Object holding success & error callbacks
     * @param {Function} resolve Promise resolve callback
     * @param {Function} reject Promise reject callback
     * @param {Function} [resultHook] result post-processing hook (mostly to promisify/thenify the result)
     **/
    function bindCallbacks(options, resolve, reject, resultHook) {
        var userOnSuccess, userOnError;
        
        userOnSuccess = options.onSuccess;
        userOnError = options.onError;
        options.onSuccess = function onSuccess(event) {
            if (resultHook) {
                event.result = resultHook(event.result);
            }
            if (userOnSuccess) {
                userOnSuccess(event);
            }
            resolve(event);
        };
        options.onError = function onError(event) {
            if (userOnError) {
                userOnError(event);
            }
            reject(event);
        };
    }
    
    
    WPromises = WAF.require('WPromises');
    isOption = WAF.tools.isOptionParam;
    noop = Function.prototype;
    some = Array.prototype.some;
    push = Array.prototype.push;
    PROMISE_API = ['then', 'catch'];
    
    
    /**
     * Replace a method by one that will return a standard ECMAScript Promise
     *
     * @method thenify
     * @param {Object} context Object to which belongs the method to promisify
     * @param {Object} wMethodName Name of the method to promisify
     * @param {Function} [resultHook] result post-processing hook (mostly to promisify the result)
     * @return Function
     **/
    WPromises.prototype.promisify = function promisify(context, wMethodName, resultHook) {
        var method, newMethod;
        
        method = context[wMethodName].bind(context);
        if (method._thenified || method._promisified) {
            return;
        }
        newMethod = (function asyncPromiseMethod() {
            var params, options;
            
            params = initParams(arguments);
            options = params.options;
            params = params.params;
            
            return new Promise(function promiseResolver(resolve, reject) {

                bindCallbacks(options, resolve, reject, resultHook)
                method.apply(context, params);

            });
        });
        try {
            Object.defineProperty(newMethod, 'name', {value: wMethodName + 'Promise'});
        } catch (e) {}
        newMethod._promisified = true;
        return newMethod;
    };
    
    
    /**
     * Replace a method by one that will return the same result as expected but with
     * an internal standard ECMAScript Promise which then() & catch() method will be
     * added on the original method result. This approach is a bit less optimized but
     * is way safer
     *
     * @method thenify
     * @param {Object} context Object to which belongs the method to thenify
     * @param {Object} wMethodName Name of the method to thenify
     * @param {Function} [resultHook] result post-processing hook (mostly to thenify the result)
     * @return Function
     **/
    WPromises.prototype.thenify = function thenify(context, wMethodName, resultHook) {
        var method, newMethod;
        
        method = context[wMethodName];
        if (method._thenified || method._promisified) {
            return;
        }
        newMethod = (function asyncMethod() {
            var params, options, result;
            
            params = initParams(arguments);
            options = params.options;
            params = params.params;
            
            promise = new Promise(function promiseResolver(resolve, reject) {
                
                bindCallbacks(options, resolve, reject, resultHook)
                result = method.apply(context, params);                
                PROMISE_API.forEach(function applyPromiseMethod(pMethodName) {

                    result[pMethodName] = function promiseMethod() {
                        return promise[pMethodName].apply(promise, arguments);
                    };

                });
            });
            return result;
        });
        try {
            Object.defineProperty(newMethod, 'name', {value: wMethodName + 'Then'});
        } catch (e) {}
        newMethod._thenified = true;
        return newMethod;
    };

}());
