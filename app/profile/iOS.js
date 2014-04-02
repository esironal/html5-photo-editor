Ext.define('PhotoEditor.profile.iOS', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'iOS',
        controllers: ['Main'],
    },

    isActive: function() {
        return (Ext.os.deviceType === "Phone" && Ext.os.is.iOS);
    }
});