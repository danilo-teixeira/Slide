/**
 * slide, v0.1.5 - (2013-08-12) 
 * license: MIT - see http://opensource.org/licenses/MIT 
 * author: Danilo Teixeira 
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

		slides.push( this ); // save all instance

		this.init( $( elementTarget ), options );

		countId++; // count all

	}

	Slide.prototype.effect = "";
	Slide.prototype.classSelectorNav = "";
	Slide.prototype.options = {};
	Slide.prototype.timeAnimate = 0;
	Slide.prototype.widthTarget = 0;
	Slide.prototype.lenImages = 0;
	Slide.prototype.indice = 0;
	Slide.prototype.countId = 0;
	Slide.prototype.elementTarget = null;
	Slide.prototype.slides = [];
	

	/*
	 * @param {Object} elementTarget
	 * @param {Object} options
	 */
	Slide.prototype.init = function( elementTarget, options ) {

		var self = this;

		self.options = options;

		self.countId = countId;
		self.slides = slides;

		self.elementTarget = elementTarget;
		self.widthTarget = self.elementTarget.width();

		self.lenImages = self.getImages().length;

		self.timeAnimate = self.options[ "time-animate" ] || 1000;
		self.effect = self.options.effect || "easeInBack";
		self.classSelectorNav = "seletor-nav";

		self.elementTarget.css( "position", "relative" );

		self.addImages();
		self.addNav();

	};

	Slide.prototype.clearImages = function() {

		this.elementTarget.html( "" );

	};

	Slide.prototype.getImages = function() {

		var images = this.elementTarget.find( "img" );

		return images;

	};

	Slide.prototype.addNav = function() {

		var self = this;

		// set style ul
		var cssNavSlide = {
			"position" : "absolute",
			"left" : "10px",
			"bottom" : "10px",
			"height" : "20px",
			"margin" : "0",
			"padding" : "0",
			"list-style" : "none"
		};

		// create ul
		var navSlide = $( "<ul id='nav-slide-" + self.countId + "'/>" )
		.css( cssNavSlide ); // add style

		// set style li's
		var cssNavSelector = {
			"width" : "15px",
			"height" : "15px",
			"float" : "left",
			"margin-left" : "3px",
			"border" : "1px solid #ccc"
		};

		if( self.options[ "nav-selector" ] && typeof self.options[ "nav-selector" ] === "object" ) {

			$.fn.extend( cssNavSelector, self.options[ "nav-selector" ] );

		}

		// set class li's
		self.classSelectorNav = self.classSelectorNav + "-" + self.countId;

		var classOption = ( self.options[ "class-nav-selector" ] ) ? self.options[ "class-nav-selector" ] + " " : "";
		var classNav = classOption + self.classSelectorNav;

		// create and add li's to ul
		for( var i = 0, len = self.lenImages; i < len; i++ ) {

			var seletorNav = $( "<li class='" + classNav + "' data-indice='" + i + "' data-id-slide='" + self.countId + "'/>" )
			.css( cssNavSelector )
			.on( "click", self.nav );

			navSlide.append( seletorNav );

		}

		// add ul
		self.elementTarget.append( navSlide );

		// add class selected
		var classSelected = self.options[ "class-nav-selector-selected" ];
		
		if( classSelected ) {

			self.navSelected( self.countId );

		}

		// set style nav right and left
		var cssNavRightLeft = {
			"position" : "absolute",
			"width" : "30px",
			"height" : "100px",
			"left" : "-35px",
			"top" : "50%",
			"margin-top" : "-50px",
			"border" : "1px solid #ccc"
		};

		// create nav left
		var navLeft = $( "<div id='nav-left-slide-" + self.countId + "' data-id-slide='" + self.countId + "'/>" )
		.css( cssNavRightLeft ) // add style
		.on( "click", self.prev ); // add event listener

		// extend style nav right
		$.fn.extend( cssNavRightLeft, {
			"left" : "auto",
			"right" : "-35px"
		} );

		// create nav right
		var navRight = $( "<div id='nav-right-slide-" + self.countId + "' data-id-slide='" + self.countId + "'/>" )
		.css( cssNavRightLeft ) // add style
		.on( "click", self.next ); // add event listener
		
		// add nav right and left
		self.elementTarget.append( navRight );
		self.elementTarget.append( navLeft );

	};

	Slide.prototype.addImages = function() {

		var self = this;

		// get images
		var images = self.getImages();

		// set style ul#content-images
		var cssContentImages = {
			"height" : "100%",
			"width" : self.widthTarget * self.lenImages,
			"left" : "0",
			"top" : "0",
			"margin" : "0",
			"padding" : "0",
			"list-style" : "none"
		};

		// create ul#content-images
		var contentImages = $( "<ul id='content-images-" + self.countId + "'/>" )
		.css( cssContentImages ); // add style

		// set style li.images-slide
		var cssImagesSlide = {
			"width" : self.widthTarget,
			"height" : "100%",
			"float" : "left"
		};

		// create li.images-slide
		for( var i = 0, len = self.lenImages; i < len; i++ ) {

			var li = $( "<li class='images-slide'/>" )
			.css( cssImagesSlide ); // add style

			li.append( images[i] ); // add images to li.images-slide

			contentImages.append( li ); // add li to ul#content-images

		}

		self.clearImages(); // clear images

		// wrap ul#content-images
		var content = $( "<div/>" ).css( {
			"overflow" : "hidden",
			"width" : self.widthTarget,
			"height" : "100%"
		} ).append( contentImages );

		// add ul#content-images
		self.elementTarget.append( content );


	};

	/*
	 * @param {Number} idSlide
	 */
	Slide.prototype.navSelected = function( idSlide ) {

		var self = slides[ idSlide ]; // get target instance
		var classSelected = self.options[ "class-nav-selector-selected" ]; // get class selected
		
		$( "." + self.classSelectorNav ).removeClass( classSelected ); // remove class selected
		$( "." + self.classSelectorNav ).eq( self.indice ).addClass( classSelected ); // add class selected

	};

	/*
	 * @param {Object} e
	 */
	Slide.prototype.nav = function( e ) {

		var element = $( e.target ); // get target element
		var idSlide = element.data( "id-slide" ); // get id the target element
		var self = slides[ idSlide ]; // get target instance

		if( self.indice == element.data( "indice" ) ) {

			return false;

		}

		self.indice = element.data( "indice" ); // set current indice

		var classSelected = self.options[ "class-nav-selector-selected" ]; // get class selected
		
		if( classSelected ) {

			self.navSelected( idSlide );

		}

		self.move();

	};

	/*
	 * @param {Object} e
	 */
	Slide.prototype.prev = function( e ) {

		var element = $( e.target ); // get target element
		var idSlide = element.data( "id-slide" ); // get id the target element
		var self = slides[ idSlide ]; // get target instance

		if( self.indice === 0 ) {

			return false;

		}

		self.indice--;

		self.navSelected( idSlide );

		self.move();

	};

	/*
	 * @param {Object} e
	 */
	Slide.prototype.next = function( e ) {

		var element = $( e.target ); // get target element
		var idSlide = element.data( "id-slide" ); // get id the target element
		var self = slides[ idSlide ]; // get target instance

		if( self.indice == self.lenImages - 1 ) {

			return false;

		}

		self.indice++;

		self.navSelected( idSlide );

		self.move();

	};

	Slide.prototype.move = function() {

		$.each( slides, function( i, elementTarget ) {

			elementTarget.animate( elementTarget );

		} );

	};

	/*
	 * @param {Object} elementTarget
	 */
	Slide.prototype.animate = function( elementTarget ) {

		var target = "#content-images-" + elementTarget.countId; // get target element
		var marginLeft = -elementTarget.indice * elementTarget.widthTarget; // calc margin target element

		$( target ).stop().animate( {
			"margin-left" : marginLeft
		}, elementTarget.timeAnimate, elementTarget.effect );

	};

	// to plugin $.slide
	$.fn.extend( {

		slide : function( object ) {
			
			var options = object || {};

			$.each( this, function() {

				slide = new Slide( this, options );

			} );

		}

	} );

} )( jQuery );
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});
