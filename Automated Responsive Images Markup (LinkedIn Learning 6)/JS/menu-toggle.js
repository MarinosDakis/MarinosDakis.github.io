// all files were taken and adapted from: https://files3.lynda.com/secure/courses/574716/exercises/Ex_Files_JavaScript_EssT.zip?NBNXBBDymNe-Ln4cZhnSgnYBZSZulflDHgmdJIzi0CC-dk1G-JWNfBKaGZEF6ePUWobUw8YYwC86jOSTwuUtoaZSKwTE0oZauStPJARIES04RSBIplAniZnshIo_SfFmRy7zJTGa8eYp_8esBEi7ZmlhoFhBNrHPnzXU

( function( $ ) {
	// Drastically modified from the function in the WordPress Twenty Fifteen theme
	// Original source: https://github.com/WordPress/WordPress/blob/master/wp-content/themes/twentyfifteen/js/functions.js

	$( '.dropdown-toggle' ).click( function( e ) {
		var _this = $( this );
		e.preventDefault();
		_this.toggleClass( 'toggle-on' );
		_this.parent().next( '.sub-menu' ).toggleClass( 'toggled-on' );
		_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
		_this.html( _this.html() === '<span class="screen-reader-text">Expand child menu</span>' ? '<span class="screen-reader-text">Collapse child menu</span>' : '<span class="screen-reader-text">Expand child menu</span>' );
	} );

})( jQuery );
