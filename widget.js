WAF.define('WPromises', ['waf-core/widget'], function(widget) {
	
    var WPromises = widget.create('WPromises', {

        /* INIT */
        init: function() {
            var test
            
            if (!this.active()) {
                return;
            }

            this.polyfill();

            test = this.testsOutput && this.testsOutput();
            if (test) {
                this.runTests(WAF.widgets[test]);
            }
        },
        
        /* PROPERTIES */

        active: widget.property({
            type: 'boolean',
            defaultValue: true,
            bindable: false
        }),
        
        rpc: widget.property({
            type: 'boolean',
            defaultValue: true,
            bindable: false
        }),
        
        dataprovider: widget.property({
            type: 'boolean',
            defaultValue: true,
            bindable: false
        }),
        
        datasource: widget.property({
            type: 'boolean',
            defaultValue: true,
            bindable: false
        })
        
        /*
        component: widget.property({
            type: 'boolean',
            defaultValue: true,
            bindable: false
        }),
        */
        
        /*
        testsOutput: widget.property({
            type: 'string',
            defaultValue: '',
            bindable: false
        })
        */
        
    });

    return WPromises;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda/help/Title/en/page3871.html */