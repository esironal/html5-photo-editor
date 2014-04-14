Ext.define('PhotoEditor.view.Info', {
	extend: 'Ext.Panel',
	xtype: 'info',

	config: {
		layout: 'fit',

		style: 'background: #f5f6f6',

		items: [{
			xtype: 'button',
			cls: 'info-back-btn info-btn',
			pressedCls: 'default-button-pressed',
			bottom: 10,
			right: 10
		}, {
			xtype: 'carousel',

			items: [{
				scrollable: {
					direction: 'vertical',
					directionLock: true,
					scrollbar: false,
				},
				html: '<div class="info-page">\
					<div class="title" style="margin-bottom: 10px;">\
						Pocket X-ray Digitizer\
					</div>\
					<div class="title">\
						Designed by Dr. Andrei Lonescu\
					</div>\
					<div class="message">\
						<div class="message-para">\
							Thank you for downloading Pocket X-ray Digitizer. \
							This app allows clinicians and their staff to acquire \
							digital images of plain film x-rays using two of \
							their existing electronic devices.\
						</div>\
						<div class="message-para">\
							The idea for this app came out of necessity. \
							Practicing dentistry I often come across situations \
							in which I have to call upon a colleague for a \
							second opinion or a consult. This often required \
							sharing diagnostic images such as plain film \
							radiographs. This app provides additional \
							functionality to my previous app Ligthbox 2go \
							including the ability to acquire, crop, adjust \
							brightness and contrast and email images.\
						</div>\
						<div class="message-para">\
							Currently I am a second year resident in \
							Endodontics at the University of Toronto where we \
							have the luxury of digital radiography in our clinic. \
							This app still proves useful when incorporating \
							older x-rays into PowerPoint presentations. I hope \
							you find this app useful in your practice.\
						</div>\
						<div class="message-para">\
							Sincerely,\
						</div>\
						<div class="message-para">\
							Andrei Lonescu BSc DMD.\
						</div>\
					</div>\
				</div>'
			}, {
				scrollable: {
					direction: 'vertical',
					directionLock: true,
					scrollbar: false,
				},
				html: '<div class="info-page">\
					<div class="title">\
						Description and Functionality\
					</div>\
					<div class="message">\
						<div class="message-para">\
							<div class="message-para-title">\
								This app allows users to:\
							</div>\
							<div class="para-step">\
								<div class="num">1.</div>\
								<div class="desc">\
									Use the bright LED screen of your device as a \
									light source.\
								</div>\
							</div>\
							<div class="para-step">\
								<div class="num">2.</div>\
								<div class="desc">\
									Capture, crop and rotate image of an x-ray to \
									predefined ISO film sizes.\
								</div>\
							</div>\
							<div class="para-step">\
								<div class="num">3.</div>\
								<div class="desc">\
									Adjust the brightness and the contrast of the \
									film and convert the image to grayscale.\
								</div>\
							</div>\
							<div class="para-step">\
								<div class="num">4.</div>\
								<div class="desc">\
									Save and email the file as .jpg\
								</div>\
							</div>\
						</div>\
						<div class="message-para">\
							<div class="message-para-title">\
								Possible uses of this app include:\
							</div>\
							<div class="para-step">\
								<div class="num">1.</div>\
								<div class="desc">\
									Scanning copies of x-rays you\'ve received \
									from referring practitioners to upload to a patient\'s \
									files.\
								</div>\
							</div>\
							<div class="para-step">\
								<div class="num">2.</div>\
								<div class="desc">\
									Digitizing your existing x-ray films for backup.\
								</div>\
							</div>\
							<div class="para-step">\
								<div class="num">3.</div>\
								<div class="desc">\
									Scan and email an x-ray film to patients, \
									colleagues and insurance companies for opinions, \
									consultations or predeterminations.\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>'
			}, {
				scrollable: {
					direction: 'vertical',
					directionLock: true,
					scrollbar: false,
				},
				html: '<div class="info-page">\
					<div class="title">\
						Instructions\
					</div>\
					<div class="simulate-btn"><span>Simulate</span></div>\
					<div class="message">\
						<div class="message-para">\
							<div class="para-step">\
								<div class="num">1.</div>\
								<div class="desc">\
									Open the app on both devices.\
								</div>\
							</div>\
							<div class="para-step">\
								<div class="num">2.</div>\
								<div class="desc">\
									Select and viewbox icon on first device and \
									place your film on the white screen. Toggle the \
									ruler by tapping on it.\
								</div>\
							</div>\
							<div class="para-step">\
								<div class="num">3.</div>\
								<div class="desc">\
									Select the camera icon on the second device, \
									focus on the radiograph by tapping the screen \
									and capture the image.\
								</div>\
							</div>\
							<div class="para-step">\
								<div class="num">4.</div>\
								<div class="desc">\
									Select file size (size 0-3) for appropriate \
									aspect ratio.\
								</div>\
							</div>\
							<div class="para-step">\
								<div class="num">5.</div>\
								<div class="desc">\
									Pinch to zoom and crop radiograph.\
								</div>\
							</div>\
							<div class="para-step">\
								<div class="num">6.</div>\
								<div class="desc">\
									Slide your finger on the image to adjust \
									brightness and contrast.\
								</div>\
							</div>\
							<div class="para-step">\
								<div class="num">7.</div>\
								<div class="desc">\
									Save or email your image.\
								</div>\
							</div>\
						</div>\
						<div class="message-para">\
							That\'s it, very simple, yet very useful. Take \
							advantage of the high-resolution camera and \
							bright LCD display on your phone or tablet to \
							capture crisp images of plain file x-rays.\
						</div>\
					</div>\
				</div>'
			}, {
				scrollable: {
					direction: 'vertical',
					directionLock: true,
					scrollbar: false,
				},
				html: '<div class="info-page">\
					<div class="message">\
						<div class="message-para">\
							As you know, taking picture of an x-ray on a \
							conventional light box is very difficult. if not \
							impossible, due to horizontal bands caused by \
							the flicker of the neon bulbs. Fluorescent bulbs \
							produce pulsating light at a frequency of 60 Hz in \
							North America and 50 Hz in Europe. All cameras \
							with shutter speeds faster than these values will \
							produce dark bands over your image. Your mobile phone \
							camera will also struggle with this (see below).\
							<div class="message-para-img">\
								<div class="x-ray-film1"></div>\
							</div>\
						</div>\
						<div class="message-para">\
							Sample images digitized with Pocket X-ray Digitizer:\
							<div class="message-para-img">\
								<div class="x-ray-film2"></div>\
								<div class="x-ray-film3"></div>\
							</div>\
						</div>\
						<div class="message-para">\
							To provide feedback and suggestions or view \
							more sample images digitized with this method, \
							please visit http://www.forestcity.ca.\
						</div>\
					</div>\
					<div class="title">\
						Copyright &copy; 2014 Andrei Lonescu BSc DMD\
					</div>\
				</div>'
			}]
		}]
	}
});