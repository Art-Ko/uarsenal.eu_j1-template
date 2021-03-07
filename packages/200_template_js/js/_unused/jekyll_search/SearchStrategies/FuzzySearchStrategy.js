/*
 # -----------------------------------------------------------------------------
 #  ~/src/jekyll_search/SearchStrategies/FuzzySearchStrategy.js
 #  Simple Jekyll Search v1.1.5 implementation for J1 template
 #
 #  Product/Info:
 #  https://jekyll.one
 #  https://github.com/christian-fei/Simple-Jekyll-Search
 #
 #  Copyright (C) 2021 Juergen Adams
 #  Copyright (C) 2015 Christian Fei
 #
 #  J1 Template is licensed under MIT License.
 #  See: https://github.com/jekyll-one-org/J1 Template/blob/master/LICENSE
 #  SimpleJekyllSearch is licensed under MIT License.
 #  See: https://github.com/christian-fei/Simple-Jekyll-Search
 #
 # -----------------------------------------------------------------------------
*/

// -----------------------------------------------------------------------------
// ESLint shimming
// -----------------------------------------------------------------------------
/* eslint no-undef: "off"                                                     */
// -----------------------------------------------------------------------------

'use strict';

var fuzzysearch = require('fuzzysearch');

module.exports = new FuzzySearchStrategy();

function FuzzySearchStrategy () {
  this.matches = function (string, crit) {
    return fuzzysearch(crit, string);
  };
}
