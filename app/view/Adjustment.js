Ext.define('PhotoEditor.view.Adjustment', {
	extend: 'Ext.Panel',
	xtype: 'adjustment',

	config: {
		layout: 'fit',
		items: [{
			xtype: 'titlebar',
			docked: 'top',
			items: [{
				xtype: 'button',
				cls: 'navbar-back-btn',
				text: 'Back',
				align: 'left'
			}, {
				xtype: 'button',
				cls: 'navbar-grayscale-btn',
				text: 'Grayscale',
				align: 'right'
			}]
		}, {
			xtype: 'panel',
			layout: 'fit',
			cls: 'transform-container',
		}, {
			xtype: 'panel',
			top: 0,
			width: '100%',
			height: '100%',
			cls: 'overlay-view'
		}, {
			xtype: 'toolbar',
			layout: {
				pack: 'center'
			},
			docked: 'bottom',
			items: [{
				xtype: 'button',
				cls: 'share-btn',
				text: 'Share'
			}]
		}]
	}
});