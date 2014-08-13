/*!
 * jquery.jlong-shadow.js | jQuery jLong Shadow v0.0.1
 *
 * https://github.com/iJos/jquery.jlong-shadow.js
 *
 * Copyright 2014 Jose Luis Jimenez | @iJos
 *
 * Released under MIT License
 */

(function($) {

	var methods = {
		init : function(options) {
			var defaults = {

				element : {
					selector 	: "",
					shadowSize 	: "30",
					shadowColor : "#222D3A",
					shadowFade 	: "0.3",
					shadowAlpha : "0.03",
				},
				container : {
					selector 	: "",
					shadowSize 	: "50",
					shadowColor : "#16A085",
					shadowFade 	: "0.3",
					shadowAlpha	: "0.03",
					padding 	: "10",
					width 		: "50",
					height		: "50",
					background 	: "",
					textAlign 	: "center",
					parent		: ""
				}
			};

			var options = $.extend(true, defaults, options);

			newLongShadow(options);

		}
	};

	$.fn.jLongShadow = function(methodOrOptions) {
		if (methods[methodOrOptions]) {
			//Methods
			return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if ( typeof methodOrOptions === 'object' || !methodOrOptions) {
			// Default to "init"
			return methods.init.apply(this, arguments);
		} else {
			//Error
			$.error('Method ' + methodOrOptions + ' does not exist on jQuery.jLongShadow');
		}
	};

	function newLongShadow(o) {

		var element_rgbColor = hexToRgb(o.element.shadowColor);
		var container_rgbColor = hexToRgb(o.container.shadowColor);



		// We are setting the container options
		$(o.container.selector).css({
			padding 		: o.container.padding,
			backgroundColor : o.container.background,
			width 			: o.container.width,
			height			: o.container.height,
			textAlign 		: o.container.textAlign
		});
		
		$(o.element.selector).css({
			fontSize		: o.element.shadowSize,
		});
		
		//HERE
        var bg = $(o.container.parent).css("background-color");
		var darkerBG = $.xcolor.opacity(bg, 'black', o.container.shadowAlpha);
		
		// CONTAINER
		// generate shadows and offset
		var shadows = [];
		var shadowSize = o.container.shadowSize;
		var fade = Math.ceil(shadowSize * o.container.shadowFade);

		for (var i = 0; i < shadowSize; i++) {
			
			//Direction
			var shadowX = shadowSize - i;
			var shadowY = shadowSize - i;
			
			
			var shadow = shadowX + "px " + shadowY + "px ";
			if (o.container.shadowFade && i <= fade) {
				var tweenedBG = $.xcolor.gradientlevel(darkerBG, bg, fade - i, fade);
				shadow += tweenedBG;
			} else {
				shadow += darkerBG;
			}
			shadows.push(shadow);
		}
		
		var shadowString = shadows.reverse().join();
		
		
		// ELEMENT
		var el = o.element.selector;
		if ( $(el).css("background-color") == "rgba(0, 0, 0, 0)" ) {
            var txc = $(el).parent().css("background-color");
        } else {
            var txc = $(el).css("background-color");   
        }
        var darkerTX = $.xcolor.opacity(txc, 'black', o.element.shadowAlpha);

		
		// generate shadows and offset
        var textShadows = [];
        var fadeText = Math.ceil(o.element.shadowSize*o.element.shadowFade);
		
		for (var i = 0; i < o.element.shadowSize; i++) {
			
			//Direction
			var textX = o.element.shadowSize - i;
			var textY = o.element.shadowSize - i;
			
			
			var textShadow = textX + "px " + textY + "px ";
			
			if (o.element.shadowFade && i <= fade) {
				var tweenedTX = $.xcolor.gradientlevel(darkerTX, txc, fadeText-i, fadeText);
				textShadow += tweenedTX;;
			} else {
				textShadow += darkerTX;
			}
			textShadows.push(textShadow);
		}
		
		var textShadowString = textShadows.reverse().join();
		console.log(textShadowString);		

		$(o.container.selector).css({
			"box-shadow" : shadowString,
			"text-shadow": textShadowString,
			"overflow" : "hidden"
		});
		

	}

	function hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r : parseInt(result[1], 16),
			g : parseInt(result[2], 16),
			b : parseInt(result[3], 16)
		} : null;
	}


})(jQuery);
