Ext.define('PhotoEditor.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    config: {
        layout: {
            type: 'card',
            animation: 'fade'
        },
        items: [{
            xtype: 'tutorial'
        }, {
            xtype: 'home'
        }, {
            xtype: 'panel',

            top: 0,

            hidden: true,

            width: '100%',
            height: '100%',

            cls: 'lock-overlay overlay-view'
        }]
    }
});
