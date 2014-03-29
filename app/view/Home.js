Ext.define('PhotoEditor.view.Home', {
	extend: 'Ext.navigation.View',
	xtype: 'home',
	config: {
		items: [{
			xtype: 'panel',

			cls: 'home-root-view',

			layout: {
				type: 'hbox',
				align: 'center',
				pack: 'center'
			},

			style: 'background: gray;',
			
			items: [{
				xtype: 'spacer'
			}, {
				xtype: 'button',
				cls: 'ruler-btn',
				text: 'Ruler'
			}, {
				xtype: 'spacer'
			}, {
				xtype: 'button',
				cls: 'camera-btn',
				text: 'Camera'
			}, {
				xtype: 'spacer'
			}, {
				xtype: 'button',
				cls: 'info-btn',
				text: 'Info',
				bottom: 10,
				right: 10
			}]
		}, {
			xtype: 'cameraActionSheet'
		}, {
			xtype: 'shareActionSheet'
		}]
	},

	initialize: function() {
		this.callParent();

		// hide default navigation bar
		this.getNavigationBar().element.setStyle('display', 'none');
	}
});