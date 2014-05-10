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
            correctOrientation: true,

            success: this.onPickPhotoSuccess,
            failure: this.onPickPhotoFailure,
            scope: this
        });
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
            image: this.realImageEl[0],
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

    initSound: function() {
        if (!this.media) {
            var src = '/android_asset/www/resources/audio/flick.mp3';
            this.media = new Media(src);
        }
    },

    setBrightness: function() {
        brightness.setBrightness(0.1);
    },

    revertBrightness: function() {
        brightness.setBrightness(-1.0);
    }
});
























