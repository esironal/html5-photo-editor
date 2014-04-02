Ext.define('PhotoEditor.controller.android.Main', {
	extend: 'PhotoEditor.controller.Main',

    requires: [
        'Ext.Img'
    ],

	config: {
        refs: {},
        control: {
            homeView: {
                show: 'onHomeViewShow'
            }
        }
    },

    init: function() {
		this.callParent();
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

    onChooseExisting: function() {
        this.onPhotoPicker('library');
    },

    onPickPhotoSuccess: function(imgUrl) {
        this.getHomeView().getLayout().setAnimation('slide');

        // save the img from picker
        if (this.androidVersionGT44) this.imgUrl = "data:image/png;base64," + imgUrl;
        else this.imgUrl = imgUrl;

        // push transform view
        this.getHomeView().push({
            xtype: 'transform'
        });
    },

    onTransformViewShow: function() {
        if (!this.transformImage) {
            this.imageElement(this.imgUrl, function(imageEl) {
                // add image to container
                var container = this.getTransformContainer(),
                    sWidth = container.element.getWidth(),
                    sHeight = container.element.getHeight();

                var image = Ext.create('widget.img', {
                    src: this.imgUrl
                });
                container.add(image);
                this.transformImage = $(image.element.dom);

                // free it
                this.imgUrl = null;

                // keep track of transform image
                var iContainer = $('<div style="position: absolute; top: -99999px; left: -99999px;"></div>');
                iContainer.append(imageEl);
                $(document.body).append(iContainer);

                // resize image to fit the screen
                this.realImageEl = $(imageEl);
                if (this.realImageEl.width() > sWidth ||
                    this.realImageEl.height() > sHeight) {
                    var iWidth = this.realImageEl.width(),
                        iHeight = this.realImageEl.height(),
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
                iContainer.remove();

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

        this.contrast = 0;
        this.brightness = 0;
    },

    onAdjustBrightness: function(e, target, eOpts) {
        var distanceX = e.pageX - e.previousX,
            distanceY = e.pageY - e.previousY;
        
        if (distanceX > 0) {
            this.brightness += 2;
            if (this.brightness >= 100) this.brightness = 100;
        } else {
            this.brightness -= 2;
            if (this.brightness <= -100) this.brightness = -100;
        }

        if (distanceY > 0) {
            this.contrast -= 0.1;
            if (this.contrast <= -1) this.contrast = -1;
        } else {
            this.contrast += 0.1;
            if (this.contrast >= 1) this.contrast = 1;
        }

        Pixastic.revert($('#adjust-image')[0]);
        Pixastic.process($('#adjust-image')[0], "brightness", {brightness: this.brightness, contrast: this.contrast});
        this.getNavBarGrayscaleBtn().setText("Grayscale");
    },

    onGrayscale: function() {
        var text = this.getNavBarGrayscaleBtn().getText(),
            canvas = document.getElementById('adjust-image');
        if (text === "Normal") {
            this.getNavBarGrayscaleBtn().setText("Grayscale");
            Pixastic.revert($('#adjust-image')[0]);

            this.brightness = 0;
            this.contrast = 0;
        } else {
            this.getNavBarGrayscaleBtn().setText("Normal");
            Pixastic.process($('#adjust-image')[0], "desaturate", {average : false});
        }
    },

    adjustImageToCanvas: function() {
        if (!this.getAdjustmentContainer().element.down('canvas'))
            Pixastic.process($('#adjust-image')[0], "brightness", {brightness: 0, contrast: 0});

        return $('#adjust-image')[0];
    },
});
























