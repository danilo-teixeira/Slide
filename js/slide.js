/*
 * @Class : Slide
 * @File : slide.js
 * @Date : 31/07/2013
 * @Version : 0.02
 * @Author : Danilo Teixeira
 * @GitHub : https://github.com/danilo-teixeira
 * MIT license see http://opensource.org/licenses/MIT
 */

( function( $ ) {

	"use strict";

	var slide = null;
	var slides = [];
	var countId = 0;

	/*
	 * @param {Object} elementTarget
	 * @param {Object} options
	 */
	function Slide( elementTarget, options ) {

		this.init( $( elementTarget ), options );

		slides.push( this ); // salver all instance
		countId++; // cont all

	}

	Slide.prototype.effect = "";
	Slide.prototype.options = {};
	Slide.prototype.timeAnimate = 0;
	Slide.prototype.widthTarget = 0;
	Slide.prototype.lenImages = 0;
	Slide.prototype.indice = 0;
	Slide.prototype.countId = 0;
	Slide.prototype.classSelectorNav = null;
	Slide.prototype.elementTarget = null;
	Slide.prototype.slides = [];
	

	/*
	 * @param {Object} elementTarget
	 * @param {Object} options
	 */
	Slide.prototype.init = function( elementTarget, options ) {

		this.options = options;

		this.countId = countId;
		this.slides = slides;

		this.elementTarget = elementTarget;
		this.widthTarget = this.elementTarget.width();

		this.lenImages = this.getImages().length;

		this.timeAnimate = this.options[ "time-animate" ] || 1000;
		this.effect = this.options[ "effect" ] || "easeInBack";
		this.classSelectorNav = "seletor-nav";

		this.elementTarget.css( "position", "relative" );

		this.addImages();
		this.addNav();

	}

	Slide.prototype.clearImages = function() {

		this.elementTarget.html( "" );

	}

	Slide.prototype.getImages = function() {

		var images = this.elementTarget.find( "img" );

		return images;

	}

	Slide.prototype.addNav = function() {

		var navSlide = $( "<ul id='nav-slide-" + this.countId + "'/>" ).css( {
			"position" : "absolute",
			"left" : "10px",
			"bottom" : "10px",
			"height" : "20px",
			"margin" : "0",
			"padding" : "0",
			"list-style" : "none"
		} );

		var cssNavSelector = ( !this.options[ "class-nav-selector" ] ) ? {
			"width" : "15px",
			"height" : "15px",
			"float" : "left",
			"margin-left" : "3px",
			"border" : "1px solid #ccc",
		} : {};

		for( var i = 0, len = this.lenImages; i < len; i++ ) {

			var classOption = ( this.options[ "class-nav-selector" ] ) ? this.options[ "class-nav-selector" ] + " " : "";
			var classNav = classOption + this.classSelectorNav + "-" + this.countId;

			var seletorNav = $( "<li class='" + classNav + "' data-indice='" + i + "' data-id-slide='" + this.countId + "'/>" )
			.css( cssNavSelector )
			.on( "click", this.nav );

			navSlide.append( seletorNav );

		}

		this.elementTarget.append( navSlide );

		var cssNavRightLeft = {
			"position" : "absolute",
			"width" : "30px",
			"height" : "100px",
			"left" : "-35px",
			"top" : "50%",
			"margin-top" : "-50px",
			"border" : "1px solid #ccc"
		}

		var navLeft = $( "<div id='nav-left-slide-" + this.countId + "'/>" ).css( cssNavRightLeft )
		.on( "click", this.prev );

		$.fn.extend( cssNavRightLeft, { "left" : "auto", "right" : "-35px" } );

		var navRight = $( "<div id='nav-right-slide-" + this.countId + "'/>" ).css( cssNavRightLeft )
		.on( "click", this.next );
		
		this.elementTarget.append( navRight );
		this.elementTarget.append( navLeft );

	}

	Slide.prototype.addImages = function() {

		var images = this.getImages();

		var contentImages = $( "<ul id='content-images-" + this.countId + "'/>" ).css( {
			"height" : "100%",
			"width" : this.widthTarget * this.lenImages,
			"left" : "0",
			"top" : "0",
			"margin" : "0",
			"padding" : "0",
			"list-style" : "none"
		} );

		for( var i = 0, len = this.lenImages; i < len; i++ ) {

			var li = $( "<li class='images-slide'/>" ).css( {
				"width" : this.widthTarget,
				"height" : "100%",
				"float" : "left"
			} );

			li.append( images[i] );

			contentImages.append( li );

		}

		this.clearImages();

		var content = $( "<div/>" ).css( {
			"overflow" : "hidden",
			"width" : this.widthTarget,
			"height" : "100%"
		} ).append( contentImages );

		this.elementTarget.append( content );


	}

	Slide.prototype.navSelected = function( element ) {

		var self = slides[ element.data( "id-slide" ) ]; // get id the elementTarget
		var classSelected = self.options[ "class-nav-selector-selected" ];
		
		$( element ).parent().find( "li" ).removeClass( classSelected );
		$( element ).addClass( classSelected );

	}

	/*
	 * @param {Object} e
	 */
	Slide.prototype.nav = function( e ) {

		var element = $( e.target );
		var self = slides[ element.data( "id-slide" ) ]; // get id the elementTarget

		if( self.indice == element.data( "indice" ) ) {

			return false;

		}

		self.indice = element.data( "indice" );

		var classSelected = self.options[ "class-nav-selector-selected" ];
		
		if( classSelected ) {

			self.navSelected( element );

		}

		self.move();

	}

	/*
	 * @param {Object} e
	 */
	Slide.prototype.prev = function( e ) {

		var self = slides[ e.target.id.replace( /[\D]+/g, "" ) ]; // get id the elementTarget

		if( self.indice == 0 ) {

			return false;

		}
		
		self.indice--;

		self.move();

	}

	/*
	 * @param {Object} e
	 */
	Slide.prototype.next = function( e ) {

		var self = slides[ e.target.id.replace( /[\D]+/g, "" ) ]; // get id the elementTarget

		if( self.indice == self.lenImages - 1 ) {

			return false;

		}

		self.indice++;

		self.move();

	}

	Slide.prototype.move = function() {

		$.each( slides, function( i, elementTarget ) {

			elementTarget.animate( elementTarget );

		} );

	}

	/*
	 * @param {Object} elementTarget
	 */
	Slide.prototype.animate = function( elementTarget ) {

		var target = "#content-images-" + elementTarget.countId;
		var marginLeft = -elementTarget.indice * elementTarget.widthTarget;

		$( target ).stop().animate( {
			"margin-left" : marginLeft
		}, elementTarget.timeAnimate, elementTarget.effect );

	}

	// to plugin $.slide
	$.fn.extend( {

		"slide" : function( options ) {
			
			var options = options || {};

			$.each( this, function() {

				slide = new Slide( this, options );

			} );

		}

	} );
	
	// call
	$( "#content-slide-2" ).slide( {
		"effect" : "easeInQuad",
		"class-nav-selector" : "nav-selector",
		"class-nav-selector-selected" : "nav-selector-selected"
	} );
	$( "#content-slide-1" ).slide();

} )( jQuery );

// Rob Penner's easing equations
jQuery.extend( jQuery.easing, {
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
})