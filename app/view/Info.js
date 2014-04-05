Ext.define('PhotoEditor.view.Info', {
	extend: 'Ext.Panel',
	xtype: 'info',

	config: {
		layout: 'fit',
		style: 'background: white;',
		items: [{
			xtype: 'button',
			cls: 'info-back-btn info-btn',
			bottom: 10,
			right: 10
		}]
	}
});