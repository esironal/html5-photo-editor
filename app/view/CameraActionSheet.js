Ext.define('PhotoEditor.view.CameraActionSheet', {
	extend: 'Ext.Panel',
	xtype: 'cameraActionSheet',

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
			cls: 'action-sheet-btn take-btn',
			text: 'Take Picture'
		}, {
			xtype: 'spacer'
		}, {
			xtype: 'button',
			cls: 'action-sheet-btn choose-btn',
			text: 'Choose Existing'
		}, {
			xtype: 'spacer'
		}, {
			xtype: 'button',
			cls: 'action-sheet-btn cancel-btn',
			text: 'Cancel'
		}, {
			xtype: 'spacer'
		}]
	}
});