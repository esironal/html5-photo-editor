Ext.define('PhotoEditor.controller.ios.Main', {
	extend: 'PhotoEditor.controller.Main',

	config: {
        refs: {},
        control: {}
    },

    init: function() {
		this.callParent();

        // device ios version for brightness and contrast
        var version = device.version,
            major = parseInt(version.split(".")[0], 10);
        
        this.iOS7 = (major >= 7);
	},

    onTakePicture: function() {
        this.onPhotoPicker(Camera.PictureSourceType.CAMERA);
    },

    onChooseExisting: function() {
        // for iPad
        if (device.model.indexOf('iPad') >= 0) {
            var successHandler = Ext.bind(this.onPickPhotoSuccess, this);
            window.imagePicker.getPictures(successHandler, null, {maximumImagesCount: 1});
            this.onCameraCancel();
        } else {
            this.onPhotoPicker(Camera.PictureSourceType.PHOTOLIBRARY);
        }
    },

    onPhotoPicker: function(source) {
        var destination = Camera.DestinationType.FILE_URI;//'file';
        if (this.androidVersionGT44) destination = Camera.DestinationType.DATA_URL;//'data';

        this.onCameraCancel();

        navigator.camera.getPicture(
            Ext.bind(this.onPickPhotoSuccess, this), 
            Ext.bind(this.onPickPhotoFailure, this), 
            {
                quality: 100,
                sourceType : source,
                encodingType: Camera.EncodingType.PNG,
                destinationType: destination,
                correctOrientation: true,
            }
        );
    },

    onPickPhotoSuccess: function(imgUrl) {
        if (imgUrl !== "Canceled") {
            this.getHomeView().getLayout().setAnimation('slide');

            // save the img from picker
            this.imgUrl = imgUrl;

            // push transform view
            this.getHomeView().push({
                xtype: 'transform'
            });
        }
    },

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
        }

        this.resetBrightnessContrast();
    },

    onAdjustBrightness: function(e, target, eOpts) {
        var distanceX = e.pageX - e.previousX,
            distanceY = e.pageY - e.previousY,
            bMax = this.iOS7 ? 200 : 30,
            bMin = this.iOS7 ? 0 : -100,
            cMax = this.iOS7 ? 200 : 150,
            increase = 2;
        
        if (distanceX > 0) {
            this.brightness += increase;
            if (this.brightness >= bMax) this.brightness = bMax;
        } else {
            this.brightness -= increase;
            if (this.brightness <= bMin) this.brightness = bMin;
        }

        if (distanceY > 0) {
            this.contrast -= increase;
            if (this.contrast <= 0) this.contrast = 0;
        } else {
            this.contrast += increase;
            if (this.contrast >= cMax) this.contrast = cMax;
        }
        console.log(this.brightness, this.contrast);
        $('#adjust-image').css('-webkit-filter', 'brightness(' + this.brightness + '%) contrast(' + this.contrast + '%)');
        this.getNavBarGrayscaleBtn().setText("Grayscale");
    },

    onGrayscale: function() {
        var text = this.getNavBarGrayscaleBtn().getText();
        if (text === "Normal") {
            this.getNavBarGrayscaleBtn().setText("Grayscale");
            this.adjustImage.css('-webkit-filter', 'grayscale(0%)');

            this.resetBrightnessContrast();
        } else {
            this.getNavBarGrayscaleBtn().setText("Normal");
            this.adjustImage.css('-webkit-filter', 'grayscale(100%)');
        }
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
            var brightness = this.iOS7 ? this.brightness - 100 : (this.brightness > 0 ? this.brightness + 70 : this.brightness),
                contrast = this.iOS7 ? (this.contrast - 100)/100 : (this.contrast > 100 ? (this.contrast - 50)/100 : (this.contrast - 100)/100);
            
            Pixastic.process(imgClone[0], "brightness", {brightness: brightness, contrast: contrast});
        }

        // canvas to return
        var canvas = container.find('canvas')[0];

        // remove after finishing
        container.remove();

        return canvas;
    },

    resetBrightnessContrast: function() {
        this.brightness = this.iOS7 ? 100 : 0;
        this.contrast = 100;
    },

    initSound: function() {
        if (!this.media) {
            var src = 'resources/audio/flick.mp3';
            this.media = new Media(src);
        }
    },

    setBrightness: function() {
        var self = this;
        brightness.getBrightness(function(value) {
            self.currentBrightness = value;
        });
        brightness.setBrightness(0.1);
    },

    revertBrightness: function() {
        brightness.setBrightness(this.currentBrightness);
    }
});
























