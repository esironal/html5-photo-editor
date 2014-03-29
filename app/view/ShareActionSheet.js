Ext.define('PhotoEditor.view.ShareActionSheet', {
	extend: 'Ext.Panel',
	xtype: 'shareActionSheet',

	config: {
		bottom: 0,
		width: '100%',
		height: 150,
		padding: 10,

		modal: true,
		hidden: true,

		style: '-webkit-transform: translate3d(0, 150px, 0)',

		layout: {
			type: 'vbox',
			align: 'center',
			pack: 'center'
		},

		items: [{
			xtype: 'spacer'
		}, {
			xtype: 'button',
			cls: 'share-action-sheet-btn save-btn',
			text: 'Save'
		}, {
			xtype: 'spacer'
		}, {
			xtype: 'button',
			cls: 'share-action-sheet-btn email-btn',
			text: 'Email'
		}, {
			xtype: 'spacer'
		}, {
			xtype: 'button',
			cls: 'share-action-sheet-btn cancel-btn',
			text: 'Cancel'
		}, {
			xtype: 'spacer'
		}]
	}
});