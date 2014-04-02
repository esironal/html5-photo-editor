Ext.define('PhotoEditor.controller.ios.Main', {
	extend: 'PhotoEditor.controller.Main',

	config: {
        refs: {},
        control: {}
    },

    init: function() {
		this.callParent();
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

        this.contrast = 100;
        this.brightness = 100;
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
        var text = this.getNavBarGrayscaleBtn().getText();
        if (text === "Normal") {
            this.getNavBarGrayscaleBtn().setText("Grayscale");
            this.adjustImage.css('-webkit-filter', 'grayscale(0%)');

            this.brightness = 100;
            this.contrast = 100;
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
            Pixastic.process(imgClone[0], "brightness", {brightness: this.brightness - 100, contrast: (this.contrast - 100)/100});
        }

        // canvas to return
        var canvas = container.find('canvas')[0];

        // remove after finishing
        container.remove();

        return canvas;
    },
});
























