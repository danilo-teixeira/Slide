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