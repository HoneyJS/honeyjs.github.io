(function (root) {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d');
	var COLORS = [0x00549a, 0x2da3fd, 0x94d3fe, 0xd3edfe, 0xffc700];

	var app = {
		converted: false,
		image: null,
		convert: function (img) {
			this.converted = true;
			this.image = img;
			canvas.width = img.width;
			canvas.height = img.height;
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.drawImage(img, 0, 0, img.width, img.height);

			// compute imageData
			// count colors
			var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			var colors = {};
			for (var i = 0; i < imageData.data.length; i += 4) {
				var color = __getColor(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]);
				//color = color.toString(16);
				colors[color] = colors[color] ? colors[color] + 1 : 1;
			}
			console.log(colors);
			// find the most colors
			var colorList = [];
			for (var color in colors) {
				for (var i = 0; i < COLORS.length; ++i) {
					if (!colorList[i]) colorList[i] = [0, 0];
					if (colorList[i][1] < colors[color]) {
						colorList[i] = [~~color, colors[color]];
						break;
					}
				}
			}
			colorList.sort(function (a, b) {
				return a[0] - b[0];
			});
			console.log(colorList);
			// replace colors
			for (var i = 0; i < imageData.data.length; i += 4) {
				var color = __getColor(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]);
				for (var j = 0; j < colorList.length; ++j) {
					if (colorList[j][0] >= color || j == colorList.length - 1) {
						imageData.data[i] = (COLORS[j] & 0xff0000) >> 16;
						imageData.data[i + 1] = (COLORS[j] & 0x00ff00) >> 8;
						imageData.data[i + 2] = (COLORS[j] & 0x0000ff) >> 0;
						//imageData.data[i] = (colorList[j][0] & 0xff0000) >> 16;
						//imageData.data[i + 1] = (colorList[j][0] & 0x00ff00) >> 8;
						//imageData.data[i + 2] = (colorList[j][0] & 0x0000ff) >> 0;
						break;
					}
				}
			}
			context.putImageData(imageData, 0, 0);
		},
		toggle: function () {
			if (this.converted) {
				this.converted = false;
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.drawImage(this.image, 0, 0, this.image.width, this.image.height);
			} else {
				this.convert(this.image);
			}
		}
	};
	root.app = app;

	function __getColor(r, g, b) {
		var delta = 64;
		r = Math.floor(r / delta);
		g = Math.floor(g / delta);
		b = Math.floor(b / delta);
		return (r * delta << 16) + (g * delta << 8) + (b * delta << 0);
	}
})(window);