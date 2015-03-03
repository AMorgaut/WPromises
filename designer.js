(function(WPromises) {

    /* Default width and height of your widget */
    WPromises.setWidth('200');
    WPromises.setHeight('20');

//    /* Define custom event for your widget */
//    WPromises.addEvent('myEvent');

//    /* Customize existing properties */
//    WPromises.customizeProperty('test', {
//        title: 'Test Static Value',
//        description: 'Add a datasource to this property.'
//    });

//    /* Add a Label property */
//    WPromises.addLabel({
//        'defaultValue': '',
//        'position': 'top'
//    });

//    /* Set the Design and Styles panels */
//    WPromises.setPanelStyle({
//        'fClass': true,
//        'text': true,
//        'background': true,
//        'border': true,
//        'sizePosition': true,
//        'label': true,
//        'disabled': ['border-radius']
//    });

    /* Override widget's initialization */
    WPromises.prototype.init = function() {
        this.node.innerHTML = "Promise APIs enabled"; /* Include text inside the widget */
    }

});

// For more information, refer to http://doc.wakanda.org/Wakanda/help/Title/en/page3870.html