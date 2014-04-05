Ext.define('PhotoEditor.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    config: {
        layout: {
            type: 'card',
            animation: 'fade'
        },
        items: [{
            xtype: 'home'
        }]
        // items: [{
        //     xtype: 'tutorial'
        // }, {
        //     xtype: 'home'
        // }]
    }
});
