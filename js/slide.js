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

	$.fn.extend( {

		"slide" : function() {
			
			$.each( this, function() {

				slide = new Slide( this );

			} );

		}

	} );

	function Slide( element ) {

		this.init( $( element ) );

		slides.push( this );
		contId++;

	}

	Slide.prototype.contId = 0;
	Slide.prototype.slides = [];
	Slide.prototype.self = null;
	Slide.prototype.selfElement = null;
	Slide.prototype.widthSelf = 0;
	Slide.prototype.CLASS_SELETOR_NAV = null;
	Slide.prototype.lenImages = 0;
	Slide.prototype.indice = 0;

	/*
	 * @param {String} element
	 */
	Slide.prototype.init = function( element ) {

		this.self = this;
		this.contId = contId;
		this.slides = slides;
		this.selfElement = element;
		this.widthSelf = this.selfElement.width();
		this.lenImages = this.getImages().length;
		this.CLASS_SELETOR_NAV = "seletor-nav";

		this.selfElement.css( "position", "relative" );

		this.addImages();
		this.addNav();

	}

	Slide.prototype.clearImages = function() {

		this.selfElement.html( "" );

	}

	Slide.prototype.getImages = function() {

		var images = this.selfElement.find( "img" );

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

		this.selfElement.append( navSlide );

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
		
		this.selfElement.append( navRight );
		this.selfElement.append( navLeft );

	}

	Slide.prototype.addImages = function() {

		var images = this.getImages();

		var contentImages = $( "<ul id='content-images-" + this.contId + "'/>" ).css( {
			"height" : "100%",
			"width" : this.widthSelf * this.lenImages,
			"left" : "0",
			"top" : "0",
			"margin" : "0",
			"padding" : "0",
			"list-style" : "none"
		} );

		for( var i = 0; i < this.lenImages; i++ ) {

			var li = $( "<li class='images-slide'/>" ).css( {
				"width" : this.widthSelf,
				"height" : "100%",
				"float" : "left"
			} );

			li.append( images[i] );

			contentImages.append( li );

		}

		this.clearImages();

		var content = $( "<div/>" ).css( {
			"overflow" : "hidden",
			"width" : this.widthSelf,
			"height" : "100%"
		} ).append( contentImages );

		this.selfElement.append( content );


	}

	Slide.prototype.prev = function( e ) {

		var element = slides[ e.target.id.replace( /[\D]+/g, "" ) ];

		if( element.self.indice == 0 ) {

			return false;

		}
		
		element.self.indice--;

		element.self.move();

	}

	Slide.prototype.next = function( e ) {

		var element = slides[ e.target.id.replace( /[\D]+/g, "" ) ];

		if( element.self.indice == element.lenImages - 1 ) {

			return false;

		}

		element.self.indice++;

		element.self.move();

	}

	Slide.prototype.move = function() {

		$.each( slides, function( i, element) {

			$( "#content-images-" + element.contId ).animate( {
				"margin-left" : -element.indice * element.widthSelf
			}, 1000, "easeInBack" );

		} );

	}

	$( "#content-slide-1, #content-slide-2" ).slide();

} )( jQuery );