Ext.define('PhotoEditor.view.Tutorial', {
	extend: 'Ext.Panel',
	xtype: 'tutorial',
	requires: [
		'Ext.Carousel'
	],
	config: {
		layout: 'fit',
		items: [{
			xtype: 'carousel',

			items: [{
				html : 'Tutorial 1',
				style: 'background-color: #5E99CC'
			}, {
				html : 'Tutorial 2',
				style: 'background-color: #759E60'
			}, {
				xtype: 'panel',
				layout: {
					type: 'vbox',
					align: 'center',
					pack: 'center'
				},
				items: [{
					xtype: 'button',
					text: 'Start'
				}]
			}]
		}]
	}
});