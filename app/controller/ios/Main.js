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
        this.onPhotoPicker(Camera.PictureSourceType.PHOTOLIBRARY);
    },

    onPhotoPicker: function(source) {
        this.onCameraCancel();

        navigator.camera.getPicture(
            Ext.bind(this.onPickPhotoSuccess, this), 
            Ext.bind(this.onPickPhotoFailure, this), 
            {
                quality: 100,
                sourceType : source,
                encodingType: Camera.EncodingType.JPG,
                destinationType: Camera.DestinationType.FILE_URI,
                correctOrientation: true
            }
        );
    },

    onPickPhotoSuccess: function(responseObject) {
        responseObject = eval("(" + responseObject + ")");
        console.log(responseObject);
        this.getHomeView().getLayout().setAnimation('slide');

        // save the img from picker
        this.imgUrl = responseObject.url;
        this.imageHasTransformed = responseObject.isTransform;

        // push transform view
        this.getHomeView().push({
            xtype: 'transform'
        });
    },

    exportTransformImageData: function(callback) {
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
        view.append(new Ext.Element(container));

        var stage = new Kinetic.Stage({
            container: container,
            width: canvasWidth,
            height: canvasHeight
        });

        var layer = new Kinetic.Layer();

        var image = new Kinetic.Image({
            width: imgWidth,
            height: this.imageHasTransformed ? imgHeight*2 : imgHeight,
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
























