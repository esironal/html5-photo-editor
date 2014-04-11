Ext.define('PhotoEditor.view.Ruler', {
	extend: 'Ext.Panel',
	xtype: 'ruler',

	requires: [
		'Ext.Audio'
	],

	config: {
		layout: 'fit',
		style: 'background: white;',

		items: [{
			xtype: 'rulerPopup'
		}, {
			xtype: 'audio',
			top: -9999,
			url: 'resources/images/crash.mp3'
		}]

		// items: [{
		// 	xtype: 'rulerPopup'
		// }, {
		// 	xtype: 'button',
		// 	bottom: 10,
		// 	left: 10,
		// 	cls: 'ruler-tri-btn'
		// }]
	}
});

Ext.define('PhotoEditor.view.RulerPopup', {
	extend: 'Ext.Panel',
	xtype: 'rulerPopup',

	config: {
		left: 0,

		modal: {
			cls: 'modal-view'
		},
		hidden: true,

		cls: 'ruler-popup-view',

		layout: {
			type: 'vbox',
			align: 'center',
			pack: 'center'
		},

		showAnimation: 'fadeIn',
		hideAnimation: 'fadeOut',

		items: [{
			xtype: 'panel',
			html: 'Slide to the right to return.'
		}, {
			xtype: 'panel',
			margin: '10px 0 0 0',
			html: '<div class="slide-to-left-icon"></div>'
		}, {
			xtype: 'spacer'
		}, {
			xtype: 'button',
			flex: 1,
			cls: 'ruler-popup-btn ok-btn',
			pressedCls: 'default-button-pressed',
			text: 'OK'
		}, {
			xtype: 'button',
			flex: 1,
			cls: 'ruler-popup-btn show-again-btn',
			pressedCls: 'default-button-pressed',
			text: 'Show again next time'
		}]
	}
});











