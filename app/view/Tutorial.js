Ext.define('PhotoEditor.view.Tutorial', {
	extend: 'Ext.Panel',
	xtype: 'tutorial',
	requires: [
		'Ext.Carousel'
	],
	config: {
		layout: 'fit',

		style: 'background: #f5f6f6',

		items: [{
			xtype: 'carousel',

			items: [{
				xtype: 'panel',

				cls: 'tutorial-page',

				layout: {
					type: 'vbox',
					align: 'center',
					pack: 'center'
				},

				items: [{
					flex: 1,
					cls: 'tutorial-page-item first-item',
					html: 'Open Pocket X-ray Digitizer on 2 devices:'
				}, {
					flex: 4,
					cls: 'tutorial-page-item',
					html: '<div class="tutorial-step">\
						<div class="step-num">1.</div>\
						<div class="step-info">\
							<div class="step-desc">\
								1st device: Select viewbox icon --&gt; \
								place your film on the white screen\
							</div>\
							<div class="step-img step-img-1"></div>\
						</div>\
					</div>'
				}, {
					flex: 4,
					cls: 'tutorial-page-item',
					html: '<div class="tutorial-step">\
						<div class="step-num">2.</div>\
						<div class="step-info">\
							<div class="step-desc">\
								2nd device: Select camera icon --&gt; \
								capture image of the radiograph\
							</div>\
							<div class="step-img step-img-2"></div>\
						</div>\
					</div>'
				}]
			}, {
				xtype: 'panel',

				cls: 'tutorial-page',

				layout: {
					type: 'vbox',
					align: 'center',
					pack: 'center'
				},

				items: [{
					cls: 'tutorial-page-item',
					html: '<div class="tutorial-step">\
						<div class="step-num">3.</div>\
						<div class="step-info">\
							<div class="step-desc">\
								Select file size (size 0-3) for appropriate \
								aspect ratio\
							</div>\
							<div class="step-img step-img-3"></div>\
						</div>\
					</div>'
				}, {
					margin: '30px 0 0',
					cls: 'tutorial-page-item',
					html: '<div class="tutorial-step">\
						<div class="step-num">4.</div>\
						<div class="step-info">\
							<div class="step-desc">\
								Pinch to zoom and crop radiograph\
							</div>\
							<div class="step-img step-img-4"></div>\
						</div>\
					</div>'
				}]
			}, {
				xtype: 'panel',

				cls: 'tutorial-page',

				layout: {
					type: 'vbox',
					align: 'center',
					pack: 'center'
				},

				items: [{
					cls: 'tutorial-page-item',
					html: '<div class="tutorial-step">\
						<div class="step-num">5.</div>\
						<div class="step-info">\
							<div class="step-desc">\
								Slide your finger on the image to adjust \
								brightness and contrast\
							</div>\
							<div class="step-img step-img-5"></div>\
						</div>\
					</div>'
				}]
			}, {
				xtype: 'panel',

				cls: 'tutorial-page',

				layout: {
					type: 'vbox',
					align: 'center',
					pack: 'center'
				},

				items: [{
					cls: 'tutorial-page-item',
					html: '<div class="tutorial-step center-layout">\
						<div class="center-layout-content">\
							<div class="step-num">6.</div>\
							<div class="step-desc">\
								Save or email your image.\
							</div>\
						</div>\
						<div class="step-img step-img-6"></div>\
					</div>'
				}, {
					xtype: 'button',
					margin: '30px 0 0',
					cls: 'start-btn',
					pressedCls: 'default-button-pressed',
					text: 'Start',
				}]
			}]
		}]
	}
});