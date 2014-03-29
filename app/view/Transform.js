Ext.define('PhotoEditor.view.Transform', {
	extend: 'Ext.Panel',
	xtype: 'transform',

	config: {
		layout: 'fit',
		items: [{
			xtype: 'titlebar',
			docked: 'top',
			items: [{
				xtype: 'button',
				cls: 'navbar-cancel-btn',
				text: 'Cancel',
				align: 'left'
			}, {
				xtype: 'button',
				cls: 'navbar-apply-btn',
				text: 'Apply',
				align: 'right'
			}]
		}, {
			xtype: 'panel',
			layout: 'fit',
			cls: 'canvas-container',
		}, {
			xtype: 'toolbar',
			layout: {
				pack: 'center'
			},
			docked: 'bottom',
			items: [{
				xtype: 'button',
				cls: 'crop-btn crop1',
				text: 'S0'
			}, {
				xtype: 'button',
				cls: 'crop-btn crop2',
				text: 'S1'
			}, {
				xtype: 'button',
				cls: 'crop-btn crop3',
				text: 'S2'
			}, {
				xtype: 'button',
				cls: 'crop-btn crop4',
				text: 'S3'
			}, {
				xtype: 'button',
				cls: 'rotate-btn',
				text: 'Rotate'
			}]
		}]
	}
});