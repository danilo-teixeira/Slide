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
	var contId = 0;

	/*
	 * @param {Object} elementTarget
	 */
	function Slide( elementTarget ) {

		this.init( $( elementTarget ) );

		slides.push( this ); // salver all instance
		contId++; // cont all instance

	}

	Slide.prototype.effect = "";
	Slide.prototype.timeAnimate = 0;
	Slide.prototype.widthTarget = 0;
	Slide.prototype.lenImages = 0;
	Slide.prototype.indice = 0;
	Slide.prototype.contId = 0;
	Slide.prototype.CLASS_SELETOR_NAV = null;
	Slide.prototype.elementTarget = null;
	Slide.prototype.slides = [];
	

	/*
	 * @param {Object} elementTarget
	 */
	Slide.prototype.init = function( elementTarget ) {

		this.contId = contId;
		this.slides = slides;

		this.elementTarget = elementTarget;
		this.widthTarget = this.elementTarget.width();

		this.lenImages = this.getImages().length;

		this.timeAnimate = 1000;
		this.effect = "easeInBack";
		this.CLASS_SELETOR_NAV = "seletor-nav";

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

		var navSlide = $( "<ul id='nav-slide-" + this.contId + "'/>" ).css( {
			"position" : "absolute",
			"left" : "10px",
			"bottom" : "10px",
			"height" : "20px",
			"margin" : "0",
			"padding" : "0",
			"list-style" : "none"
		} );

		for( var i = 0; i < this.lenImages; i++ ) {

			var seletorNav = $( "<li class='" + this.CLASS_SELETOR_NAV + "' data-indice='" + i + "'/>" ).css( {
				"width" : "15px",
				"height" : "15px",
				"float" : "left",
				"cursor" : "pointer"
			} );

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
			"cursor" : "pointer"
		}

		var navLeft = $( "<div id='nav-left-slide-" + this.contId + "'/>" ).css( cssNavRightLeft )
		.on( "click", this.prev );

		$.fn.extend( cssNavRightLeft, { "left" : "auto", "right" : "-35px" } );

		var navRight = $( "<div id='nav-right-slide-" + this.contId + "'/>" ).css( cssNavRightLeft )
		.on( "click", this.next );
		
		this.elementTarget.append( navRight );
		this.elementTarget.append( navLeft );

	}

	Slide.prototype.addImages = function() {

		var images = this.getImages();

		var contentImages = $( "<ul id='content-images-" + this.contId + "'/>" ).css( {
			"height" : "100%",
			"width" : this.widthTarget * this.lenImages,
			"left" : "0",
			"top" : "0",
			"margin" : "0",
			"padding" : "0",
			"list-style" : "none"
		} );

		for( var i = 0; i < this.lenImages; i++ ) {

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

		var target = "#content-images-" + elementTarget.contId;
		var marginLeft = -elementTarget.indice * elementTarget.widthTarget;

		$( target ).animate( {
			"margin-left" : marginLeft
		}, elementTarget.timeAnimate, elementTarget.effect );

	}

	// to plugin $.slide
	$.fn.extend( {

		"slide" : function() {
			
			$.each( this, function() {

				slide = new Slide( this );

			} );

		}

	} );
	
	// call
	$( "#content-slide-1, #content-slide-2" ).slide();

} )( jQuery );