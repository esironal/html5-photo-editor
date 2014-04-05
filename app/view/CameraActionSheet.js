Ext.define('PhotoEditor.view.CameraActionSheet', {
	extend: 'Ext.Panel',
	xtype: 'cameraActionSheet',

	config: {
		bottom: 0,
		width: '100%',
		padding: 10,

		modal: {
			cls: 'modal-view'
		},
		hidden: true,

		cls: 'action-sheet-view overlay-view',

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
			pressedCls: 'default-button-pressed',
			text: 'Take Picture'
		}, {
			xtype: 'spacer'
		}, {
			xtype: 'button',
			cls: 'action-sheet-btn choose-btn',
			pressedCls: 'default-button-pressed',
			text: 'Choose Existing'
		}, {
			xtype: 'spacer'
		}, {
			xtype: 'button',
			cls: 'action-sheet-btn cancel-btn',
			pressedCls: 'default-button-pressed',
			text: 'Cancel'
		}, {
			xtype: 'spacer'
		}]
	}
});