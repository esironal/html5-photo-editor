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
            transformContainer: 'transform panel[cls=transform-container]',
            navBarCancelBtn: 'titlebar button[cls=navbar-cancel-btn]',
            navBarApplyBtn: 'titlebar button[cls=navbar-apply-btn]',
            cropBtn1: 'toolbar button[cls=crop-btn crop1]',
            cropBtn2: 'toolbar button[cls=crop-btn crop2]',
            cropBtn3: 'toolbar button[cls=crop-btn crop3]',
            cropBtn4: 'toolbar button[cls=crop-btn crop4]',
            rotateBtn: 'toolbar button[cls=rotate-btn]',

            // adjustment view
            adjustmentView: 'adjustment',
            adjustmentContainer: 'adjustment panel[cls=transform-container]',
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
        if (!this.transformImage) {
            this.imageElement(this.imgUrl, function(imageEl) {
                this.imgUrl = null;

                // add image to container
                var container = this.getTransformContainer(),
                    sWidth = container.element.getWidth(),
                    sHeight = container.element.getHeight();
                container.setHtml(imageEl);

                // keep track of transform image
                this.transformImage = $(imageEl);

                // resize image to fit the screen
                if (this.transformImage.width() > sWidth ||
                    this.transformImage.height() > sHeight) {
                    var iWidth = this.transformImage.width(),
                        iHeight = this.transformImage.height(),
                        iRatio = iWidth/iHeight,
                        sRatio = sWidth/sHeight;

                    if (sRatio > iRatio) {
                        this.transformImage.width(iWidth*sHeight/iHeight);
                        this.transformImage.height(sHeight);
                    } else {
                        this.transformImage.width(sWidth);
                        this.transformImage.height(iHeight*sWidth/iWidth);
                    }
                }

                // center image
                this.transformImage.css({
                    x: (sWidth - this.transformImage.width())/2,
                    y: (sHeight - this.transformImage.height())/2
                });
            });

            // handle for image zooming + moving
            this.getTransformContainer().element.on({
                scope: this,
                touchstart: this.onPinchOrMoveStart,
                touchmove: this.onPinchOrMove,
                touchend: this.onPinchOrMoveEnd
            });

            // show crop frame as default
            this.onCrop1();
        } else {
            // android has bug on missing image
            // we will add new one
            if (device.platform === "Android") {
                var imageClone = this.transformImage.clone(true);

                // remove old image since it is disappeared
                this.transformImage.remove();
                this.transformImage = null;

                // add new image to container
                var container = this.getTransformContainer();
                container.setHtml(imageClone[0]);

                // keep track of transform image
                this.transformImage = imageClone;
            }
        }
    },

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

    onNavBarCancel: function() {
        this.onNavBarBack();

        // free all unused variables
        this.transformImage = null;
        this.overlayLayer = null;
        this.cropZone = null;
        this.isPinching = null;
        this.lastDist = null;
    },

    onNavBarBack: function() {
        this.getHomeView().pop();
    },

    onNavBarApply: function() {
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

                // center image
                var sWidth = container.element.getWidth(),
                    sHeight = container.element.getHeight(),
                    imgWidth = this.adjustImage.width(),
                    imgHeight = this.adjustImage.height();
                this.adjustImage.css({
                    x: (sWidth - imgWidth)/2,
                    y: (sHeight - imgHeight)/2
                });
            });

            // handle brightness adjust
            this.getOverlayView().element.on({
                scope: this,
                drag: this.onAdjustBrightness
            });
        }

        this.contrast = 100;
        this.brightness = 100;
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
            image: this.transformImage.clone()[0],
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

        console.log(imageRect, cropRect);
        var intersectingRect = this.intersectingRect(imageRect, cropRect);
        console.log(intersectingRect);
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

    onAdjustBrightness: function(e, target, eOpts) {
        var distanceX = e.pageX - e.previousX,
            distanceY = e.pageY - e.previousY;
        
        if (distanceX > 0) {
            this.brightness += 1;
            if (this.brightness >= 200) this.brightness = 200;
        } else {
            this.brightness -= 1;
            if (this.brightness <= 0) this.brightness = 0;
        }

        if (distanceY > 0) {
            this.contrast -= 1;
            if (this.contrast <= 0) this.contrast = 0;
        } else {
            this.contrast += 1;
            if (this.contrast >= 200) this.contrast = 200;
        }

        this.adjustImage.css('-webkit-filter', 'brightness(' + this.brightness + '%) contrast(' + this.contrast + '%)');
        this.getNavBarGrayscaleBtn().setText("Grayscale");
    },

    onGrayscale: function() {
        var text = this.getNavBarGrayscaleBtn().getText(),
            grayscale = 0;

        if (text === "Normal") {
            this.getNavBarGrayscaleBtn().setText("Grayscale");
        } else {
            grayscale = 100;
            this.getNavBarGrayscaleBtn().setText("Normal");
        }

        this.adjustImage.css('-webkit-filter', 'grayscale(' + grayscale + '%)');
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
                    alert(msg);
                }, 0);
            },
            function() {},
            this.adjustImageToCanvas()
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

    adjustImageToCanvas: function() {
        var imgClone = this.adjustImage.clone(),
            container = $('<div style="position: absolute; top: -99999px; left: -99999px;"></div');

        // container for canvas from clone image
        container.append(imgClone);
        $(document.body).append(container);

        // do exactly the same as css
        if (this.getNavBarGrayscaleBtn().getText() === "Normal") {
            Pixastic.process(imgClone[0], "desaturate", {average : false});
        } else {
            Pixastic.process(imgClone[0], "brightness", {brightness: this.brightness - 100, contrast: (this.contrast - 100)/100});
        }

        // canvas to return
        var canvas = container.find('canvas')[0];

        // remove after finishing
        container.remove();

        return canvas;
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
        this.rulerMoveX = e.pageX;
    },

    onRulerTouchEnd: function(e) {
        if (e.pageX - this.rulerMoveX < 0) {
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

        // add overlay layer if no existed
        if (!this.overlayLayer) {
            this.overlayLayer = $('<div class="overlay-layer"></div>');
            this.overlayLayer.css({
                width: view.getWidth(),
                height: view.getHeight()
            });
            $(view.dom).append(this.overlayLayer);
        }

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
























