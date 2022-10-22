/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/modules/jquery/js/extensions/hasClass.js
 # jQuery Plugin for J1 Template
 # Used to check whether selected elements have specified class name or not.
 #
 # Product/Info:
 # https://jekyll.one
 # https://github.com/Dogfalo/materialize
 #
 # Copyright (C) 2022 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # See: https://github.com/jekyll-one-org/J1 Template/blob/master/LICENSE
 # -----------------------------------------------------------------------------
*/
'use strict';

;(function(hasClass) {

	jQuery.fn.hasClass = function hasClassRegExp( selector ) {
		if ( selector && typeof selector.test === "function" ) {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				var classNames = this[i].className.split( /\s+/ );
				for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
					if (selector.test( classNames[c]) ) {
						return true;
					}
				}
			}
            return false;
		} else {
			return hasClass.call(this, selector);
		}
	}

})(jQuery.fn.hasClass);
