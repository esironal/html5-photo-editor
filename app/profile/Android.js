Ext.define('PhotoEditor.profile.Android', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Android',
        controllers: ['Main'],
    },

    isActive: function() {
        return (Ext.os.deviceType === "Phone" && Ext.os.is.Android);
    }
});