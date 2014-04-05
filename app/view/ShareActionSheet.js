Ext.define('PhotoEditor.view.ShareActionSheet', {
	extend: 'Ext.Panel',
	xtype: 'shareActionSheet',

	config: {
		left: 0,
		width: '100%',
		padding: 10,

		modal: {
			cls: 'share-action-sheet-modal-view'
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
			xtype: 'spacer'
		}, {
			xtype: 'button',
			cls: 'share-action-sheet-btn save-btn',
			pressedCls: 'default-button-pressed',
			text: 'Save'
		}, {
			xtype: 'spacer'
		}, {
			xtype: 'button',
			cls: 'share-action-sheet-btn email-btn',
			pressedCls: 'default-button-pressed',
			text: 'Email'
		}, {
			xtype: 'spacer'
		}, {
			xtype: 'button',
			cls: 'share-action-sheet-btn cancel-btn',
			pressedCls: 'default-button-pressed',
			text: 'Cancel'
		}, {
			xtype: 'spacer'
		}]
	}
});