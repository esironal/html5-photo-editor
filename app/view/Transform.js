Ext.define('PhotoEditor.view.Transform', {
	extend: 'Ext.Panel',
	xtype: 'transform',

	config: {
		layout: 'fit',

		background: 'white',

		items: [{
			xtype: 'panel',
			docked: 'top',

			cls: 'navbar',

			layout: {
				type: 'hbox',
				align: 'center',
				pack: 'justify'
			},

			items: [{
				xtype: 'button',
				flex: 1,
				cls: 'navbar-left-btn navbar-cancel-btn',
				pressedCls: 'default-button-pressed',
				text: 'Cancel',
				align: 'left'
			}, {
				xtype: 'button',
				flex: 1,
				cls: 'navbar-right-btn navbar-apply-btn',
				pressedCls: 'default-button-pressed',
				text: 'Apply',
				align: 'right'
			}]
		}, {
			xtype: 'panel',
			layout: 'fit',
			cls: 'transform-container',
			background: 'white'
		}, {
			xtype: 'panel',
			docked: 'bottom',

			cls: 'bottom-bar',

			layout: {
				type: 'hbox',
				align: 'center',
				pack: 'justify'
			},

			items: [{
				xtype: 'button',
				flex: 1,
				cls: 'crop-btn crop1',
				pressedCls: 'default-button-pressed',
				text: 'S0'
			}, {
				xtype: 'button',
				flex: 1,
				cls: 'crop-btn crop2',
				pressedCls: 'default-button-pressed',
				text: 'S1'
			}, {
				xtype: 'button',
				flex: 1,
				cls: 'crop-btn crop3',
				pressedCls: 'default-button-pressed',
				text: 'S2'
			}, {
				xtype: 'button',
				flex: 1,
				cls: 'crop-btn crop4',
				pressedCls: 'default-button-pressed',
				text: 'S3'
			}, {
				xtype: 'button',
				flex: 1,
				cls: 'rotate-btn',
				pressedCls: 'default-button-pressed',
			}]
		}]
	}
});