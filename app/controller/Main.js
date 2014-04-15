Ext.define('PhotoEditor.controller.Main', {
	extend: 'Ext.app.Controller',

    requires: [
        'Ext.Anim',
        'Ext.device.Camera'
    ],

	config: {
        refs: {
            // main view
        	mainView: 'main',
            lockOverlayView: 'main panel[cls=lock-overlay overlay-view]',

            // tutorial view
        	tutorialView: 'tutorial',
            tutorialCarouselView: 'tutorial carousel',
            startBtn: 'tutorial panel button',

            // home view
        	homeView: 'home',
            homeRootView: 'home panel[cls=home-root-view]',
            rulerBtn: 'home button[cls=ruler-btn]',
            cameraBtn: 'home button[cls=camera-btn]',
            infoBtn: 'home button[cls=info-btn]',

            // action sheet view
            cameraActionSheetView: 'cameraActionSheet',
            takePictureBtn: 'cameraActionSheet button[cls=action-sheet-btn take-btn]',
            choosePictureBtn: 'cameraActionSheet button[cls=action-sheet-btn choose-btn]',
            cameraCancelBtn: 'cameraActionSheet button[cls=action-sheet-btn cancel-btn]',

            // transform view
            transformView: 'transform',
            transformContainer: 'transform panel[cls=transform-container]',
            navBarCancelBtn: 'transform button[cls=navbar-left-btn navbar-cancel-btn]',
            navBarApplyBtn: 'transform button[cls=navbar-right-btn navbar-apply-btn]',
            cropBtn1: 'transform button[cls=crop-btn crop1]',
            cropBtn2: 'transform button[cls=crop-btn crop2]',
            cropBtn3: 'transform button[cls=crop-btn crop3]',
            cropBtn4: 'transform button[cls=crop-btn crop4]',
            rotateBtn: 'transform button[cls=rotate-btn]',

            // adjustment view
            adjustmentView: 'adjustment',
            adjustmentContainer: 'adjustment panel[cls=transform-container]',
            navBarBackBtn: 'adjustment button[cls=navbar-left-btn navbar-back-btn]',
            navBarGrayscaleBtn: 'adjustment button[cls=navbar-right-btn navbar-grayscale-btn]',
            shareBtn: 'adjustment button[cls=share-btn]',

            // share action sheet
            shareActionSheetView: 'shareActionSheet',
            saveBtn: 'shareActionSheet button[cls=share-action-sheet-btn save-btn]',
            emailBtn: 'shareActionSheet button[cls=share-action-sheet-btn email-btn]',
            shareCancelBtn: 'shareActionSheet button[cls=share-action-sheet-btn cancel-btn]',

            // ruler
            rulerView: 'ruler',
            rulerPopupView: 'rulerPopup',
            rulerAudio: 'ruler audio',
            popupOKBtn: 'rulerPopup button[cls=ruler-popup-btn ok-btn]',
            popupShowAgainBtn: 'rulerPopup button[cls=ruler-popup-btn show-again-btn]',

            // info view
            infoView: 'info',
            instructionsPage: 'info panel[cls=info-page-container instructions-page]',
            infoBackBtn: 'info button[cls=info-back-btn info-btn]',

            // overlay for handling brightness
            overlayView: 'adjustment panel[cls=overlay-view]'
        },
        control: {
            // tutorial view
        	startBtn: {
        		tap: 'onStart'
        	},

            // home view
            cameraBtn: {
                tap: 'onShowCameraActionSheet'
            },
            rulerBtn: {
                tap: 'onShowRuler'
            },
            infoBtn: {
                tap: 'onShowInfo'
            },

            // camera action sheet view
            takePictureBtn: {
                tap: 'onTakePicture'
            },
            choosePictureBtn: {
                tap: 'onChooseExisting'
            },
            cameraCancelBtn: {
                tap: 'onCameraCancel'
            },

            // transform view
            transformView: {
                show: 'onTransformViewShow'
            },
            navBarCancelBtn: {
                tap: 'onNavBarCancel'
            },
            navBarApplyBtn: {
                tap: 'onNavBarApply'
            },
            cropBtn1: {
                tap: 'onCrop1'
            },
            cropBtn2: {
                tap: 'onCrop2'
            },
            cropBtn3: {
                tap: 'onCrop3'
            },
            cropBtn4: {
                tap: 'onCrop4'
            },
            rotateBtn: {
                tap: 'onRotate'
            },

            // adjustment view
            adjustmentView: {
                show: 'onAdjustmentViewShow'
            },
            navBarBackBtn: {
                tap: 'onNavBarBack'
            },
            navBarGrayscaleBtn: {
                tap: 'onGrayscale'
            },
            shareBtn: {
                tap: 'onShowShareActionSheet'
            },

            // share action sheet view
            saveBtn: {
                tap: 'onSave'
            },
            emailBtn: {
                tap: 'onEmail'
            },
            shareCancelBtn: {
                tap: 'onShareCancel'
            },

            // ruler
            rulerView: {
                show: 'onRulerShow'
            },
            popupOKBtn: {
                tap: 'onPopupOK'
            },
            popupShowAgainBtn: {
                tap: 'onPopupShowAgain'
            },

            // info biew
            infoView: {
                show: 'onInfoShow'
            },
            infoBackBtn: {
                tap: 'onInfoBack'
            }
        }
    },

    init: function() {
		this.callParent();

        // set default ruler popup show again or not
        if (!localStorage.showAgain) localStorage.showAgain = "true";

        // set default tutorial page
        if (!localStorage.isFirstTime) localStorage.isFirstTime = "true";

        // inti the sound right away
        this.initSound();
	},

	onStart: function() {
        localStorage.isFirstTime = "false";
		this.getMainView().setActiveItem(1);
	},

    onShowCameraActionSheet: function() {
        this.getCameraActionSheetView().show();
        this.moveActionSheetUp(this.getCameraActionSheetView());
    },

    onShowRuler: function() {
        this.getHomeView().getLayout().setAnimation('slide');
        this.pushView('ruler');
    },

    onShowInfo: function() {
        this.getHomeView().getLayout().setAnimation('flip');
        this.pushView('info');
    },

    onInfoShow: function() {
        this.getInstructionsPage().element.down('.simulate-btn').on({
            scope: this,
            tap: this.onSimulateTap
        });
    },

    onSimulateTap: function() {
        this.getMainView().setActiveItem(0);
        this.getTutorialCarouselView().setActiveItem(0);

        var self = this;
        setTimeout(function() {
            self.getHomeView().pop();
        }, 1000);
    },

    onInfoBack: function(sender) {
        sender.setDisabled(true);
        this.getHomeView().pop();
    },

    onTakePicture: function() {
        this.onPhotoPicker('camera');
    },

    onPhotoPicker: function(source) {
        var destination = 'file';
        if (this.androidVersionGT44) destination = 'data';

        this.onCameraCancel();

        Ext.device.Camera.capture({
            quality: 100,
            source: source,
            destination: destination,
            encoding: 'png',

            success: this.onPickPhotoSuccess,
            failure: this.onPickPhotoFailure,
            scope: this
        });
    },

    onCameraCancel: function() {
        this.moveActionSheetDown(this.getCameraActionSheetView());
    },

    onPickPhotoFailure: function(msg) {},

    onPinchOrMoveStart: function(e) {
        if (!this.isPinching) {
            if (e.touches.length == 2) {
                this.isPinching = true;
            } else {
                this.imageMoveX = e.touch.pageX;
                this.imageMoveY = e.touch.pageY;
            }
        }
    },

    onPinchOrMove: function(e) {
        if (this.isPinching && e.touches.length >= 2) {
            var touch1 = e.touches[0];
                touch2 = e.touches[1],
                dist = this.getDistance({
                    x: touch1.pageX,
                    y: touch1.pageY
                }, {
                    x: touch2.pageX,
                    y: touch2.pageY
                });

            if (!this.lastDist) {
                this.lastDist = dist;
            }

            var scaleRatio = dist / this.lastDist,
                scale = parseFloat(this.transformImage.css('scale'));

            this.transformImage.css({scale: scale*scaleRatio});
            this.lastDist = dist;
        } else {
            var moveX = e.touch.pageX - this.imageMoveX, 
                moveY = e.touch.pageY - this.imageMoveY,
                translate = this.transformImage.css('translate'),
                curX = curY = 0;
            
            this.imageMoveX = e.touch.pageX;
            this.imageMoveY = e.touch.pageY;

            if (translate) {
                translate = translate.split(",");
                curX = parseInt(translate[0], 10);
                curY = parseInt(translate[1], 10);
            }

            this.transformImage.css({
                x: curX + moveX,
                y: curY + moveY
            });
        }
    },

    onPinchOrMoveEnd: function(e) {
        if (this.isPinching) {
            var scale = parseFloat(this.transformImage.css('scale')),
                restrictScale;

            // check scale limit
            if (scale > 2) restrictScale = 2;
            else if (scale < 0.5) restrictScale = 0.5;

            // resvers to limit only
            if (restrictScale) {
                this.transformImage.transition({scale: restrictScale});
            }

            this.lastDist = 0;
            this.isPinching = false;
        }
    },

    onNavBarCancel: function(sender) {
        this.onNavBarBack(sender);

        // free all unused variables
        this.transformImage = null;
        this.realImageEl = null;
        this.overlayLayer = null;
        this.cropZone = null;
        this.isPinching = null;
        this.lastDist = null;
    },

    onNavBarBack: function(sender) {
        sender.setDisabled(true);
        this.getHomeView().pop();
    },

    onNavBarApply: function() {
        this.pushView('adjustment');
    },

    onCrop1: function() {
        this.doCropping(this.calculateCroppingRect(0.22, 0.35));
    },

    onCrop2: function() {
        this.doCropping(this.calculateCroppingRect(0.31, 0.41));
    },

    onCrop3: function() {
        this.doCropping(this.calculateCroppingRect(0.27, 0.54));
    },

    onCrop4: function() {
        this.doCropping(this.calculateCroppingRect(0.76, 0.57));
    },

    onRotate: function() {
        if (!this.isRotating) {
            this.isRotating = true;

            var deg = parseInt(this.transformImage.css('rotate'), 10);
            this.transformImage.transition({
                rotate: (deg + 90) + 'deg'
            }, 250, Ext.bind(this.onRotateFinished, this));
        }
    },

    onRotateFinished: function() {
        var deg = parseInt(this.transformImage.css('rotate'), 10);
        if (deg >= 360) this.transformImage.css({rotate: '0deg'});

        this.isRotating = false;
    },

    onAdjustmentViewShow: function() {
        // get image data from crop zone
        var imageData = this.exportTransformImageData();
        
        if (imageData) {
            // add image to page
            this.imageElement(imageData, function(imageEl) {
                var container = this.getAdjustmentContainer();
                container.setHtml(imageEl);

                // keep image
                this.adjustImage = $(imageEl);
                this.adjustImage.attr('id', 'adjust-image');

                // center image
                var sWidth = container.element.getWidth(),
                    sHeight = container.element.getHeight(),
                    imgWidth = this.adjustImage.width(),
                    imgHeight = this.adjustImage.height();
                this.adjustImage.css({
                    left: (sWidth - imgWidth)/2,
                    top: (sHeight - imgHeight)/2
                });
            });

            // handle brightness adjust
            this.getOverlayView().element.on({
                scope: this,
                drag: this.onAdjustBrightness
            });
        }
    },

    exportTransformImageData: function() {
        var view = this.getTransformContainer().element,
            container = document.createElement('div'),
            canvasWidth = view.getWidth(),
            canvasHeight = view.getHeight(),
            imgWidth = this.transformImage.width(),
            imgHeight = this.transformImage.height(),
            imgScale = parseFloat(this.transformImage.css('scale')),
            imgDeg = parseInt(this.transformImage.css('rotate'), 10),
            translate = this.transformImage.css('translate'),
            imgX = imgY = 0;

        if (translate) {
            translate = translate.split(",");
            imgX = parseInt(translate[0], 10);
            imgY = parseInt(translate[1], 10);
        }

        var stage = new Kinetic.Stage({
            container: container,
            width: canvasWidth,
            height: canvasHeight
        });

        var layer = new Kinetic.Layer();

        var image = new Kinetic.Image({
            width: imgWidth,
            height: imgHeight,
            x: imgWidth/2 + imgX,
            y: imgHeight/2 + imgY,
            image: (this.realImageEl ? this.realImageEl[0] : this.transformImage[0]),
            offset: {
                x: imgWidth/2,
                y: imgHeight/2
            },
            scale: {
                x: imgScale,
                y: imgScale
            }
        });
        image.rotate(imgDeg);

        layer.add(image);
        stage.add(layer);

        // check whether image is inside the crop zone
        var iWidth, iHeight;
        if (imgDeg == 90 || imgDeg == 270) {
            iHeight = image.width()*imgScale;
            iWidth = image.height()*imgScale;
        } else {
            iWidth = image.width()*imgScale;
            iHeight = image.height()*imgScale;
        }
        
        var imageRect = {
            x: image.x() - iWidth/2,
            y: image.y() - iHeight/2,
            width: iWidth,
            height: iHeight
        };

        var cropRect = {
            x: this.cropZone.position().left,
            y: this.cropZone.position().top,
            width: this.cropZone.width(),
            height: this.cropZone.height()
        };

        var intersectingRect = this.intersectingRect(imageRect, cropRect);
        return image.toDataURL(intersectingRect);

        return false;
    },

    intersectingRect: function(r1, r2) {
        var x = Math.max(r1.x, r2.x);
        var y = Math.max(r1.y, r2.y);
        var xx = Math.min(r1.x + r1.width, r2.x + r2.width);
        var yy = Math.min(r1.y + r1.height, r2.y + r2.height);
        return ({
            x: x,
            y: y,
            width: xx - x,
            height: yy - y
        });
    },

    onShowShareActionSheet: function() {
        this.getShareActionSheetView().show();

        var popupWidth = this.getShareActionSheetView().element.getWidth(),
            viewWidth = this.getAdjustmentContainer().element.getWidth();
        this.getShareActionSheetView().setLeft((viewWidth - popupWidth)/2);
    },

    onSave: function() {
        this.onShareCancel();

        var canvas = this.adjustImageToCanvas();
        window.canvas2ImagePlugin.saveImageDataToLibrary(
            function(msg) {
                setTimeout(function() {
                    alert(msg);
                }, 0);
            },
            function() {},
            canvas
        );
    },

    onEmail: function() {
        this.onShareCancel();

        var canvas = this.adjustImageToCanvas(),
            filename = this.makeFilename() + ".png",
            imageData = canvas.toDataURL("image/png").split(",")[1];
        
        window.plugins.emailComposer.showEmailComposerWithCallback(
            function(success) {
                if (success) {
                    setTimeout(function() {
                        alert("Your email has been sent.");
                    }, 0);
                }
            }, 
            "Email Subject", 
            "Email Message",
            "dduy.duong@gmail.com", 
            null, null , true, null, 
            [[filename, imageData]]
        );
    },

    onShareCancel: function() {
        this.getShareActionSheetView().hide();
    },

    onRulerShow: function() {
        if (!window.brightness) 
            window.brightness = cordova.require("cordova.plugin.Brightness.Brightness");

        if (localStorage.showAgain === "true") {
            var popupView = this.getRulerPopupView();

            // show popup
            popupView.show();

            // adjust popup
            var popupWidth = popupView.element.getWidth()
                popupHeight = popupView.element.getHeight(),
                viewWidth = this.getRulerView().element.getWidth(),
                viewHeight = this.getRulerView().element.getHeight();

            popupView.setLeft((viewWidth - popupWidth)/2);
            popupView.setTop((viewHeight - popupHeight)/2);
        }

        // add handler for swipe right
        this.getRulerView().element.on({
            scope: this,
            touchstart: this.onRulerTouchStart,
            touchend: this.onRulerTouchEnd
        });

        // play sound
        this.media.play();

        // screen brightness
        var self = this;
        brightness.getBrightness(function(value) {
            self.currentBrightness = value;
        });
        brightness.setBrightness(1.0);
        // setTimeout(function() {
        //     brightness.setBrightness(1);
        // }, 1000);
    },

    onRulerTouchStart: function(e) {
        this.rulerMoveX = e.pageX;
    },

    onRulerTouchEnd: function(e) {
        if (e.pageX - this.rulerMoveX > 0) {
            this.media.stop();
            brightness.setBrightness(this.currentBrightness);
            this.getHomeView().pop();
        }
    },

    onPopupOK: function() {
        localStorage.showAgain = "false";
        this.getRulerPopupView().hide();
    },

    onPopupShowAgain: function() {
        localStorage.showAgain = "true";
        this.getRulerPopupView().hide();
    },

    /* HELPERS  */
    moveActionSheetUp: function(component) {
        new Ext.Anim({
            autoClear: false,
            to: {
                '-webkit-transform': "translate3d(0, 0, 0)",
            },
            duration: 250,
            easing: 'ease-out'
        }).run(component.element);
    },

    moveActionSheetDown: function(component) {
        var height = this.getCameraActionSheetView().element.getHeight();

        new Ext.Anim({
            autoClear: false,
            to: {
                '-webkit-transform': "translate3d(0, " + height + "px, 0)",
            },
            duration: 250,
            easing: 'ease-out'
        }).run(component.element, {
            after: function() {
                component.hide();
            },
            scope: this
        });
    },

    imageElement: function(dataOrUrl, onComplete) {
        var imageEl = new Image();
        imageEl.src = dataOrUrl;
        imageEl.onload = Ext.bind(onComplete, this, [imageEl]);
    },

    calculateCroppingRect: function(heightRatio, widthRatio) {
        var sWidth = this.getTransformContainer().element.getWidth(),
            sHeight = this.getTransformContainer().element.getHeight(),
            ratioA = sHeight/sWidth,
            ratioB = heightRatio/widthRatio,
            width, height;

        if (ratioA >= ratioB) {
            width = sWidth - 20;
            height = Math.ceil(width * (heightRatio/widthRatio));
        } else {
            height = sHeight - 20;
            width = Math.ceil(height * (widthRatio/heightRatio));
        }

        var left = Math.ceil((sWidth - width)/2),
            top = Math.ceil((sHeight - height)/2);
        
        return {
            top: top,
            left: left,
            width: width,
            height: height
        };
    },

    renderOverlay: function(frame) {
        var view = this.getTransformContainer().element,
            x0 = 0,
            x1 = frame.left,
            x2 = frame.left + frame.width,
            x3 = view.getWidth(),
            y0 = 0,
            y1 = frame.top,
            y2 = frame.top + frame.height,
            y3 = view.getHeight();

        // Upper rect
        var upperRect = this.rectWithId('upperRect');
        upperRect.css({
            top: y0,
            left: x0,
            width: x3 - x0,
            height: y1 - y0
        });

        // Left rect
        var leftRect = this.rectWithId('leftRect');
        leftRect.css({
            top: y1,
            left: x0,
            width: x1 - x0,
            height: y2 - y1
        });

        // Right rect
        var rightRect = this.rectWithId('rightRect');
        rightRect.css({
            top: y1,
            left: x2,
            width: x3 - x2,
            height: y2 - y1
        });

        // Down rect
        var downRect = this.rectWithId('downRect');
        downRect.css({
            top: y2,
            left: x0,
            width: x3 - x0,
            height: y3 - y2
        });
    },

    rectWithId: function(id) {
        var rect = this.overlayLayer.find('#' + id);
        if (!rect.length) {
            rect = $('<div class="overlay-rect" id="' + id + '"></div>');
            this.overlayLayer.append(rect);
        }

        return $(rect);
    },

    renderCropZone: function(frame) {
        if (!this.cropZone) {
            this.cropZone = $('<div class="crop-zone"></div>');

            // add 9 small boxes
            for (var i = 0; i < 3; i++) {
                $('<div class="box-row">\
                    <div class="box"></div>\
                    <div class="box"></div>\
                    <div class="box"></div>\
                </div>').appendTo(this.cropZone);
            }

            // add crop zone to overlay layer
            this.overlayLayer.append(this.cropZone);
        }

        // positioning for crop zone
        this.cropZone.css(frame);
        this.cropZone.find('.box-row .box').height(frame.height/3);
    },

    doCropping: function(frame) {
        if (!this.overlayLayer) {
            var view = this.getTransformContainer().element;

            this.overlayLayer = $('<div class="overlay-layer"></div>');
            this.overlayLayer.css({
                width: view.getWidth(),
                height: view.getHeight()
            });
            $(view.dom).append(this.overlayLayer);
        }

        // render overlay + crop zone
        this.renderOverlay(frame);
        this.renderCropZone(frame);
    },

    getDistance: function(p1, p2) {
        return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    },

    makeFilename: function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    pushView: function(xtype) {
        var lockOverlayView = this.getLockOverlayView();

        // lock the screen from multiple taps
        lockOverlayView.show();

        // push new view
        this.getHomeView().push({
            xtype: xtype
        });

        // hide lock view after a period of time
        setTimeout(function() {
            lockOverlayView.hide();
        }, 1000);
    }
});
























