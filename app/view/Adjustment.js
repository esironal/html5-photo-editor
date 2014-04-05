Ext.define('PhotoEditor.view.Adjustment', {
	extend: 'Ext.Panel',
	xtype: 'adjustment',

	config: {
		layout: 'fit',
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
				cls: 'navbar-left-btn navbar-back-btn',
				pressedCls: 'default-button-pressed',
				text: 'Back',
			}, {
				xtype: 'button',
				flex: 1,
				cls: 'navbar-right-btn navbar-grayscale-btn',
				pressedCls: 'default-button-pressed',
				text: 'Grayscale',
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
			xtype: 'panel',
			docked: 'bottom',

			cls: 'bottom-bar',

			layout: {
				type: 'hbox',
				align: 'center',
				pack: 'center'
			},

			items: [{
				xtype: 'button',
				cls: 'share-btn',
				pressedCls: 'default-button-pressed',
			}]
		}]
	}
});