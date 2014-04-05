Ext.define('PhotoEditor.view.ShareActionSheet', {
	extend: 'Ext.Panel',
	xtype: 'shareActionSheet',

	config: {
		left: 0,

		modal: {
			cls: 'modal-view'
		},
		hidden: true,
		hideOnMaskTap: true,

		cls: 'share-action-sheet-view',

		layout: {
			type: 'vbox',
			align: 'center',
			pack: 'center'
		},

		showAnimation: 'fadeIn',
		hideAnimation: 'fadeOut',

		items: [{
			xtype: 'button',
			flex: 1,
			cls: 'share-action-sheet-btn save-btn',
			pressedCls: 'default-button-pressed',
			text: 'Save'
		}, {
			xtype: 'button',
			flex: 1,
			cls: 'share-action-sheet-btn email-btn',
			pressedCls: 'default-button-pressed',
			text: 'Email'
		}, {
			xtype: 'button',
			flex: 1,
			cls: 'share-action-sheet-btn cancel-btn',
			pressedCls: 'default-button-pressed',
			text: 'Cancel'
		}]
	}
});