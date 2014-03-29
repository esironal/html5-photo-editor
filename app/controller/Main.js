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

            // tutorial view
        	tutorialView: 'tutorial',
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
            transformCanvasView: 'transform panel[cls=canvas-container]',
            navBarCancelBtn: 'titlebar button[cls=navbar-cancel-btn]',
            navBarApplyBtn: 'titlebar button[cls=navbar-apply-btn]',
            cropBtn1: 'toolbar button[cls=crop-btn crop1]',
            cropBtn2: 'toolbar button[cls=crop-btn crop2]',
            cropBtn3: 'toolbar button[cls=crop-btn crop3]',
            cropBtn4: 'toolbar button[cls=crop-btn crop4]',
            rotateBtn: 'toolbar button[cls=rotate-btn]',

            // adjustment view
            adjustmentView: 'adjustment',
            adjustmentCanvasView: 'adjustment panel[cls=canvas-container]',
            navBarBackBtn: 'titlebar button[cls=navbar-back-btn]',
            navBarGrayscaleBtn: 'titlebar button[cls=navbar-grayscale-btn]',
            shareBtn: 'toolbar button[cls=share-btn]',

            // share action sheet
            shareActionSheetView: 'shareActionSheet',
            saveBtn: 'shareActionSheet button[cls=share-action-sheet-btn save-btn]',
            emailBtn: 'shareActionSheet button[cls=share-action-sheet-btn email-btn]',
            shareCancelBtn: 'shareActionSheet button[cls=share-action-sheet-btn cancel-btn]',

            // ruler
            rulerView: 'ruler',

            // info view
            infoView: 'info',
            infoBackBtn: 'info button[cls=info-back-btn]',

            // overlay for handling brightness
            overlayView: 'adjustment panel[cls=overlay-view]'
        },
        control: {
            // tutorial view
        	startBtn: {
        		tap: 'onStart'
        	},

            // home view
            homeView: {
                show: 'onHomeViewShow'
            },
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

            // info biew
            infoBackBtn: {
                tap: 'onInfoBack'
            }
        }
    },

    init: function() {
		this.callParent();
	},

	onStart: function() {
		this.getMainView().setActiveItem(1);
	},

    onHomeViewShow: function() {
        this.androidVersionGT44 = false;
        if (device && device.platform === "Android") {
            var splits = device.version.split(".");
            if (splits.length >= 2) {
                if (parseInt(splits[0]) >= 4 && parseInt(splits[1]) >= 4) {
                    this.androidVersionGT44 = true;
                }
            }
        }
    },

    onShowCameraActionSheet: function() {
        this.getCameraActionSheetView().show();
        this.moveActionSheetUp(this.getCameraActionSheetView());
    },

    onShowRuler: function() {
        this.getHomeView().getLayout().setAnimation('slide');
        this.getHomeView().push({
            xtype: 'ruler'
        });
    },

    onShowInfo: function() {
        this.getHomeView().getLayout().setAnimation('flip');
        this.getHomeView().push({
            xtype: 'info'
        });
    },

    onInfoBack: function() {
        this.getHomeView().pop();
    },

    onTakePicture: function() {
        this.onPhotoPicker('camera');
    },

    onChooseExisting: function() {
        // for iPad
        if (device.model.indexOf('iPad') >= 0) {
            var successHandler = Ext.bind(this.onPickPhotoSuccess, this);
            window.imagePicker.getPictures(successHandler, null, {maximumImagesCount: 1});
            this.onCameraCancel();
        } else {
            this.onPhotoPicker('library');
        }
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

    // photo picker callback
    onPickPhotoSuccess: function(imgUrl) {
        if (imgUrl !== "Canceled") {
            this.getHomeView().getLayout().setAnimation('slide');

            // save the img from picker
            if (this.androidVersionGT44)
                this.imgUrl = "data:image/png;base64," + imgUrl;
            else
                this.imgUrl = imgUrl;

            // push transform view
            this.getHomeView().push({
                xtype: 'transform'
            });
        }
    },

    onPickPhotoFailure: function(msg) {},

    onTransformViewShow: function() {
        if (!this.getTransformCanvasView().element.down('canvas')) {
            this.imageElement(this.imgUrl, this.renderTransformCanvas);
        }
    },

    renderTransformCanvas: function(imageEl) {
        var canvasContainer = document.createElement("div");
        this.getTransformCanvasView().setHtml(canvasContainer);

        var canvasWidth = this.getTransformCanvasView().element.getWidth(),
            canvasHeight = this.getTransformCanvasView().element.getHeight();

        // create stage and layer
        this.transformingStage = new Kinetic.Stage({
            container: canvasContainer,
            width: canvasWidth,
            height: canvasHeight
        });
        this.transformingLayer = new Kinetic.Layer();

        // create processing image
        this.processingImg = new Kinetic.Image({
            x: 0,
            y: 0,
            image: imageEl,
            draggable: true,
            // dragBoundFunc: Ext.bind(this.onImageMoving, this)
        });

        // if image width or height > canvas width or height
        // we will scale down to fit the canvas
        if (this.processingImg.width() > canvasWidth ||
            this.processingImg.height() > canvasHeight) {
            var iWidth = this.processingImg.width(),
                iHeight = this.processingImg.height(),
                iRatio = iWidth/iHeight,
                sRatio = canvasWidth/canvasHeight;

            if (sRatio > iRatio) {
                this.processingImg.width(iWidth*canvasHeight/iHeight);
                this.processingImg.height(canvasHeight);
            } else {
                this.processingImg.width(canvasWidth);
                this.processingImg.height(iHeight*canvasWidth/iWidth);
            }
        }

        // center the image
        this.processingImg.setAttrs({
            x: canvasWidth/2,
            y: canvasHeight/2,
            // offset for rotating
            offset: {
                x: this.processingImg.width()/2,
                y: this.processingImg.height()/2
            }
        });

        // add the shape to the layer
        this.transformingLayer.add(this.processingImg);

        // add the layer to the stage
        this.transformingStage.add(this.transformingLayer);

        // handle pinch
        this.lastDist = 0;

        var stageContent = this.transformingStage.getContent();
        stageContent.addEventListener('touchmove', Ext.bind(this.onPinch, this), false);
        stageContent.addEventListener('touchend', Ext.bind(this.onPinchEnd, this), false);
    },

    onPinch: function(e) {
        var touch1 = e.touches[0];
        var touch2 = e.touches[1];
        
        if (touch1 && touch2) {
            var dist = this.getDistance({
                x: touch1.clientX,
                y: touch1.clientY
            }, {
                x: touch2.clientX,
                y: touch2.clientY
            });

            if (!this.lastDist) {
                this.lastDist = dist;
            }

            var scaleRatio = dist / this.lastDist;

            this.processingImg.scale({
                x: this.processingImg.scaleX() * scaleRatio,
                y: this.processingImg.scaleY() * scaleRatio
            });
            this.transformingStage.draw();
            this.lastDist = dist;
        }
    },

    onPinchEnd: function() {
        var restrictScale;
        if (this.processingImg.scaleX() > 2) {
            restrictScale = 2;
        } else if (this.processingImg.scaleX() < 0.5) {
            restrictScale = 0.5;
        }

        if (restrictScale) {
            var tween = new Kinetic.Tween({
                node: this.processingImg, 
                duration: 0.25,
                scaleX: restrictScale,
                scaleY: restrictScale
            });

            tween.play();
        }

        this.lastDist = 0;
    },

    onImageMoving: function(pos) {
        var w = this.processingImg.width(), h = this.processingImg.height();
        var newX = pos.x, newY = pos.y;
        var maxX = this.transformingStage.width() - w/2;
        var maxY = this.transformingStage.height() - h/2;

        if (newX - w/2 < 0) newX = w/2;
        if (newY - h/2 < 0) newY = h/2;
        if (newX > maxX) newX = maxX;
        if (newY > maxY) newY = maxY;

        return {
            x: newX,
            y: newY
        };
    },

    onNavBarCancel: function() {
        // free all unused variables
        this.transformingStage = null;
        this.transformingLayer = null;
        this.processingImg = null;
        this.cropZone = null;
        this.overlayLayer = null;
        this.isRotating = null;

        this.onNavBarBack();
    },

    onNavBarBack: function() {
        this.getHomeView().pop();
    },

    onNavBarApply: function() {
        // push adjustment view
        this.getHomeView().push({
            xtype: 'adjustment'
        });
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

            var tween = new Kinetic.Tween({
                node: this.processingImg, 
                duration: 0.25,
                rotation: this.processingImg.rotation() + 90,
                easing: Kinetic.Easings.EaseInOut,
                onFinish: Ext.bind(this.onRotateFinished, this)
            });

            tween.play();
        }
    },

    onRotateFinished: function() {
        if (this.processingImg.rotation() >= 360)
            this.processingImg.rotation(0);

        this.isRotating = false;
    },

    onAdjustmentViewShow: function() {
        // get image data from crop zone
        var imageData = null;
        if (this.cropZone && this.cropZone.isVisible()) {
            imageData = this.processingImg.toDataURL({
                x: this.cropZone.x(),
                y: this.cropZone.y(),
                width: this.cropZone.width(),
                height: this.cropZone.height()
            });
        } else {
            var w = this.processingImg.width() * this.processingImg.scaleX(),
                h = this.processingImg.height() * this.processingImg.scaleY();

            imageData = this.processingImg.toDataURL({
                x: this.processingImg.x() - w/2,
                y: this.processingImg.y() - h/2,
                width: w,
                height: h
            });
        }

        // add image to page
        this.imageElement(imageData, this.renderAdjustmentCanvas);

        // handle brightness adjust
        this.getOverlayView().element.on({
            scope: this,
            drag: this.onAdjustBrightness
        });

        this.contrast = 0;
        this.brightness = 0;
    },

    renderAdjustmentCanvas: function(imageEl) {
        imageEl.setAttribute('id', 'adjustment-image');
        this.getAdjustmentCanvasView().setHtml(imageEl);

        Pixastic.process(imageEl, "brightness", {brightness: 0, contrast: 0});
    },

    onAdjustBrightness: function(e, target, eOpts) {
        var distanceX = e.pageX - e.previousX,
            distanceY = e.pageY - e.previousY;
        
        if (distanceX > 0) {
            this.brightness += 1;
            if (this.brightness >= 100) this.brightness = 100;
        } else {
            this.brightness -= 1;
            if (this.brightness <= -100) this.brightness = -100;
        }

        if (distanceY > 0) {
            this.contrast -= 0.05;
            if (this.contrast <= -1) this.contrast = -1;
        } else {
            this.contrast += 0.05;
            if (this.contrast >= 1) this.contrast = 1;
        }

        Pixastic.revert(document.getElementById('adjustment-image'));
        Pixastic.process(document.getElementById('adjustment-image'), "brightness", {brightness: this.brightness, contrast: this.contrast});

        this.getNavBarGrayscaleBtn().setText("Grayscale");
    },

    onGrayscale: function() {
        var canvas = document.getElementById('adjustment-image');

        if (this.getNavBarGrayscaleBtn().getText() === "Normal") {
            this.getNavBarGrayscaleBtn().setText("Grayscale");
            Pixastic.revert(canvas);
        } else {
            this.getNavBarGrayscaleBtn().setText("Normal");
            Pixastic.process(canvas, "desaturate", {average : false});
        }
    },

    onShowShareActionSheet: function() {
        this.getShareActionSheetView().show();
        this.moveActionSheetUp(this.getShareActionSheetView());
    },

    onSave: function() {
        this.onShareCancel();

        window.canvas2ImagePlugin.saveImageDataToLibrary(
            function(msg) {
                setTimeout(function() {
                    alert('Your image has been saved!');
                }, 0);
            },
            function() {},
            document.getElementById('adjustment-image')
        );
    },

    onEmail: function() {
        this.onShareCancel();

        var filename = this.makeFilename() + ".png",
            canvas = document.getElementById('adjustment-image'),
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
        this.moveActionSheetDown(this.getShareActionSheetView());
    },

    onRulerShow: function() {
        this.getRulerView().element.on({
            scope: this,
            touchstart: this.onRulerTouchStart,
            touchend: this.onRulerTouchEnd
        });
    },

    onRulerTouchStart: function(e) {
        this.startX = e.pageX;

        this.rulerDragDirection = true;
        var distanceX = e.pageX - e.previousX;
        this.rulerDragDirection = (distanceX > 0);
    },

    onRulerTouchEnd: function(e) {
        if (e.pageX - this.startX < 0) {
            this.getHomeView().pop();
        }
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
        new Ext.Anim({
            autoClear: false,
            to: {
                '-webkit-transform': "translate3d(0, 150px, 0)",
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

    calculateCroppingRect: function(widthRatio, heightRatio) {
        var imgWidth = this.processingImg.width(),
            imgHeight = this.processingImg.height(),
            width = imgWidth - (imgWidth*widthRatio),
            height = imgHeight - (imgHeight*heightRatio),
            x = (this.transformingStage.width() - width)/2,
            y = (this.transformingStage.height() - height)/2;

        return {
            x: x,
            y: y,
            width: width,
            height: height
        };
    },

    renderOverlay: function(frame) {
        var stage = this.transformingStage,
            x0 = 0,
            x1 = frame.x,
            x2 = frame.x + frame.width,
            x3 = stage.width(),
            y0 = 0,
            y1 = frame.y,
            y2 = frame.y + frame.height,
            y3 = stage.height();
        
        // add new crop zone layer
        if (!this.overlayLayer) {
            this.overlayLayer = new Kinetic.Layer();
            this.transformingStage.add(this.overlayLayer);

            this.overlayLayer.on('touchstart', Ext.bind(this.onOverlayLayerTouchStart, this));
            this.overlayLayer.on('touchmove', Ext.bind(this.onOverlayLayerTouchMove, this));
            this.overlayLayer.on('touchend', Ext.bind(this.onOverlayLayerTouchEnd, this));
        }

        // Upper rect
        var upperRect = this.rectWithId('upperRect');
        upperRect.setAttrs({
            x: x0,
            y: y0,
            width: x3 - x0,
            height: y1 - y0
        });

        // Left rect
        var leftRect = this.rectWithId('leftRect');
        leftRect.setAttrs({
            x: x0,
            y: y1,
            width: x1 - x0,
            height: y2 - y1
        });

        // Right rect
        var rightRect = this.rectWithId('rightRect');
        rightRect.setAttrs({
            x: x2,
            y: y1,
            width: x3 - x2,
            height: y2 - y1
        });

        // Down rect
        var downRect = this.rectWithId('downRect');
        downRect.setAttrs({
            x: x0,
            y: y2,
            width: x3 - x0,
            height: y3 - y2
        });

        if (this.overlayLayer) {
            if (!this.overlayLayer.isVisible()) this.overlayLayer.show();
            this.overlayLayer.batchDraw();
        } else stage.draw();
    },

    onOverlayLayerTouchStart: function() {
        this.isTouchMoving = false;
    },

    onOverlayLayerTouchMove: function() {
        this.isTouchMoving = true;
    },

    onOverlayLayerTouchEnd: function() {
        if (!this.isTouchMoving) {
            this.cropZone.hide();
            this.overlayLayer.hide();

            this.transformingLayer.moveToTop();
        }
    },

    rectWithId: function(id) {
        var rect = this.overlayLayer.find('#' + id);
        if (!rect.length) {
            rect = new Kinetic.Rect({
                fill: 'rgba(0, 0, 0, 0.5)',
                id: id
            });

            this.overlayLayer.add(rect);
        } else rect = rect[0];

        return rect;
    },

    renderCropZone: function(frame) {
        if (!this.cropZone) {
            this.cropZone = new Kinetic.Rect({
                x: frame.x,
                y: frame.y,
                width: frame.width,
                height: frame.height,
                fill: 'transparent',
                draggable: true,
                dragBoundFunc: Ext.bind(this.onCropZoneMoving, this)
            });

            var layer = new Kinetic.Layer();
            this.transformingStage.add(layer.add(this.cropZone));
        } else {
            if (!this.cropZone.isVisible()) {
                this.cropZone.show();
                this.transformingLayer.moveToBottom();
            }

            this.cropZone.setAttrs(frame);
        }

        this.transformingStage.draw();
    },

    onCropZoneMoving: function(pos) {
        var newX = pos.x, newY = pos.y;
        var w = this.cropZone.width(), h = this.cropZone.height();
        var maxX = this.transformingStage.width() - w;
        var maxY = this.transformingStage.height() - h;

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX > maxX) newX = maxX;
        if (newY > maxY) newY = maxY;

        // render all overlays
        this.renderOverlay({
            x: newX,
            y: newY,
            width: w,
            height: h
        });

        return {
            x: newX,
            y: newY
        };
    },

    doCropping: function(frame) {
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
    }
});
























