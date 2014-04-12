Ext.define('PhotoEditor.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    config: {
        layout: {
            type: 'card',
            animation: 'fade'
        }
    },

    initialize: function() {
        this.callParent();

        if (!localStorage.isFirstTime || localStorage.isFirstTime === "true") {
            this.add({
                xtype: 'tutorial'
            });
        }

        this.add([{
            xtype: 'home'
        }, {
            xtype: 'panel',

            top: 0,

            hidden: true,

            width: '100%',
            height: '100%',

            cls: 'lock-overlay overlay-view'
        }]);
    }
});
