Ext.define('PhotoEditor.view.Ruler', {
	extend: 'Ext.Panel',
	xtype: 'ruler',

	config: {
		layout: 'fit',
		style: 'background: white;',
		items: [{
			xtype: 'rulerPopup'
		}, {
			xtype: 'button',
			bottom: 10,
			left: 10,
			cls: 'ruler-tri-btn'
		}]
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
			html: 'Slide to the left'
		}, {
			xtype: 'panel',
			html: '<div class="slide_to_left_icon"></div>'
		}, {
			xtype: 'spacer'
		}, {
			xtype: 'button',
			flex: 1,
			cls: 'ruler_popup_btn ok_btn',
			pressedCls: 'default-button-pressed',
			text: 'OK'
		}, {
			xtype: 'button',
			flex: 1,
			cls: 'ruler_popup_btn show_again_btn',
			pressedCls: 'default-button-pressed',
			text: 'Show again next time'
		}]
	}
});











