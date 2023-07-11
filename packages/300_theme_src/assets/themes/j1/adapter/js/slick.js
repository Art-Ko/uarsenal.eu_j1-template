---
regenerate:                             true
---

{% capture cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/slick.js
 # Liquid template to create the Template Adapter for J1 Slick
 #
 # Product/Info:
 # http://jekyll.one
 #
 # Copyright (C) 2023 Juergen Adams
 #
 # J1 Theme is licensed under the MIT License.
 # For details, see: https://github.com/jekyll-one-org/j1-template/blob/main/LICENSE.md
 # -----------------------------------------------------------------------------
 # Test data:
 #  {{ liquid_var | debug }}
 # cookie_options: {{ cookie_options | debug }}
 # -----------------------------------------------------------------------------
 # See: https://github.com/kenwheeler/slick
 # -----------------------------------------------------------------------------
{% endcomment %}

{% comment %} Liquid var initialization
-------------------------------------------------------------------------------- {% endcomment %}

{% comment %} Set config files
-------------------------------------------------------------------------------- {% endcomment %}
{% assign environment             = site.environment %}
{% assign blocks                  = site.data.blocks %}
{% assign modules                 = site.data.modules %}
{% assign template_config         = site.data.j1_config %}

{% comment %} Set config data
-------------------------------------------------------------------------------- {% endcomment
{% assign attic_defaults          = modules.defaults.attics.defaults %}
{% assign attic_settings          = modules.attics.settings %}

{% assign slick_defaults          = modules.defaults.slick.defaults %}
{% assign slick_settings          = modules.slick.settings %}
{% assign slick_lightbox_defaults = modules.defaults.slick.defaults.lightbox %}
{% assign slick_lightbox_settings = modules.slick.settings.lightbox %}

{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}

{% comment %} Set variables
-------------------------------------------------------------------------------- {% endcomment %}

{% comment %} Detect prod mode
-------------------------------------------------------------------------------- {% endcomment %}
{% assign production = false %}
{% if environment == 'prod' or environment == 'production' %}
  {% assign production = true %}
{% endif %}

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/slick.js
 # JS Adapter for J1 Slick
 #
 #  Product/Info:
 #  http://jekyll.one
 #
 #  Copyright (C) 2023 Juergen Adams
 #
 #  J1 Theme is licensed under MIT License.
 #  See: https://github.com/jekyll-one/J1 Theme/blob/master/LICENSE
 # -----------------------------------------------------------------------------
 #  Adapter generated: {{site.time}}
 # -----------------------------------------------------------------------------
*/

// -----------------------------------------------------------------------------
// ESLint shimming
// -----------------------------------------------------------------------------
/* eslint indent: "off"                                                       */
/* eslint quotes: "off"                                                       */
// -----------------------------------------------------------------------------
'use strict';
j1.adapter.slick = (function (j1, window) {
  var environment                 = '{{environment}}';
  var responsiveSettings          = [];
  var carouselResponsiveSettings  = [];
  var state                       = 'not_started';
  var _this;
  var logger;
  var logText;
  var atticDefaults;
  var atticSettings;
  var atticOptions;
  var slickDefaults;
  var slickSettings;
  var slickLightboxDefaults;
  var slickLightboxSettings;
  var slickLightboxOptions;
  var slickOptions;
  var carouselOptions;
  var carouselSettings;

  // ---------------------------------------------------------------------------
  // Helper functions
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Main object
  // ---------------------------------------------------------------------------
  return {

    // -------------------------------------------------------------------------
    // Initializer
    // -------------------------------------------------------------------------
    init: function (options) {
      var xhrLoadState                  = 'pending';                            // (initial) load state for the HTML portion of the carousel
      var load_dependencies             = {};                                   // dynamic variable
      var carouselResponsiveSettingsOBJ = {};                                   // initial object for responsive settings
      var reload_on_resize              = false;
      var dependency;
      var carouselResponsiveSettingsYAML;
      var carouselResponsiveSettingsSTRING;
      var slick_lightbox_enabled;

      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings  = $.extend({
        module_name: 'j1.adapter.cookieConsent',
        generated:   '{{site.time}}'
      }, options);

      // Load  module DEFAULTS|CONFIG
      atticDefaults         = $.extend({}, {{attic_defaults | replace: 'nil', 'null' | replace: '=>', ':' }});
      atticSettings         = $.extend({}, {{attic_settings | replace: 'nil', 'null' | replace: '=>', ':' }});
      atticOptions          = $.extend(true, {}, atticDefaults, atticSettings);

      slickDefaults         = $.extend({}, {{slick_defaults | replace: 'nil', 'null' | replace: '=>', ':' }});
      slickSettings         = $.extend({}, {{slick_settings | replace: 'nil', 'null' | replace: '=>', ':' }});
      slickLightboxDefaults = $.extend({}, {{slick_lightbox_defaults | replace: 'nil', 'null' | replace: '=>', ':' }});
      slickLightboxSettings = $.extend({}, {{slick_lightbox_settings | replace: 'nil', 'null' | replace: '=>', ':' }});
      slickLightboxOptions  = $.extend(true, {}, slickLightboxDefaults, slickLightboxSettings);
      slickOptions          = $.extend(true, {}, slickDefaults, slickSettings);

      // -----------------------------------------------------------------------
      // Global variable settings
      // -----------------------------------------------------------------------
      _this                 = j1.adapter.slick;
      logger                = log4javascript.getLogger('j1.adapter.slick');

      _this.setState('started');
      logger.debug('\n' + 'state: ' + _this.getState());
      logger.info('\n' + 'module is being initialized');

      // load HTML portion for all carousels
      // console.debug('loading HTML portion for all carousels configured');
      _this.loadCarouselHTML(slickOptions, slickOptions.carousels);

      // Re-Init all carousels in a page if window is resized (if enabled)
      if (reload_on_resize) {
        window.onresize = function() {
          location.reload();
        }
      }

      // -----------------------------------------------------------------------
      // initializer
      // -----------------------------------------------------------------------
      // make sure the 'content' section is visible BEFORE setting-up sliders
      //
      var dependencies_met_page_ready = setInterval (function (options) {
        var contentState    = $('#content').css("display");
        var contentVisible  = (contentState == 'block') ? true: false;

        if (j1.getState() === 'finished' && contentVisible) {
          {% for carousel in slick_settings.carousels %} {% if carousel.enabled %}
          logger.info('\n' + 'carousel is being initialized on id: ' + '{{carousel.id}}');

          {% if carousel.options.responsive %}
          logger.info('\n' + 'collect responsive settings for carousel on id: ' + '{{carousel.id}}');
          // collect breakpoint settings from carousel config
          responsiveSettings = $.extend({}, {{carousel.responsive | replace: 'nil', 'null' | replace: '=>', ':' }});
          // generate carousel breakpoint settings as YAML data structure
          carouselResponsiveSettings  = '[' ;
          for (const [obj_key, obj_value] of Object.entries(responsiveSettings)) {
            var length = Object.keys(obj_value.settings).length;
            var count = 0;
            for (const [key, value] of Object.entries(obj_value.settings)) {
              count++;
              if (key == 'breakOn' && count == 1) {
                carouselResponsiveSettings += '  {' ;
                carouselResponsiveSettings += '    breakpoint: ' + value + ',' ;
                carouselResponsiveSettings += '    settings: {' ;
              } else {
                carouselResponsiveSettings += '      ' + key + ': ' + value + ',' ;
              }
              // close current breakpoint element
              if (count == length) {
                carouselResponsiveSettings += '    }' ;
                carouselResponsiveSettings += '  },' ;
              }
            }
          } // End generate breakpoint YAML elements

          // close breakpoint YAML data
          carouselResponsiveSettings += ']';
          {% endif %}

          // create dynamic loader variable|s
          dependency = 'dependencies_met_html_loaded_{{carousel.id}}';
          load_dependencies[dependency] = '';

          // initialize carousel if HTML portion successfully loaded
          load_dependencies['dependencies_met_html_loaded_{{carousel.id}}'] = setInterval (function (options) {
            // check if HTML portion of the carousel is loaded successfully (loadcarouselHTML)
            xhrLoadState = j1.xhrDOMState['#{{carousel.id}}_parent'];
            if ( xhrLoadState === 'success' ) {

              // collect general carousel settings
              carouselOptions  = $.extend({}, {{carousel.options | replace: 'nil', 'null' | replace: '=>', ':' }});
              carouselSettings = $.extend(true, {}, slickDefaults, carouselOptions );

              // convert carousel responsive settings to object (carouselResponsiveSettingsOBJ)
              carouselResponsiveSettingsYAML    = yaml.loadAll(carouselResponsiveSettings, 'utf8');
              carouselResponsiveSettingsOBJ     = carouselResponsiveSettingsYAML[0];
              carouselResponsiveSettingsSTRING  = JSON.stringify(carouselResponsiveSettingsOBJ, null, 4);
              logger.debug('\n' + 'responsive settings on carousel id #{{carousel.id}}: ' + '\n' + carouselResponsiveSettingsSTRING);

              $('.{{carousel.id | replace: '_','-' }}').on('init', function(event, slick) {
                logger.info('\n' + 'carousel initialized on id: {{carousel.id}}');

                slick_lightbox_enabled = '{{carousel.lightbox.enabled}}';

                // check if a lightbox is used|enabled
                if ( slick_lightbox_enabled !== '' && slick_lightbox_enabled == 'true' ) {
                  slick_lightbox_enabled = true;
                } else {
                  slick_lightbox_enabled = false;
                }

                if (slick_lightbox_enabled) {
                  logger.info('\n' + 'initialize lightbox on id: {{carousel.id}}');

                  // See: http://mreq.github.io/slick-lightbox/demo/
                  $('#{{carousel.id}}').slickLightbox({
                    caption:                  slickLightboxOptions.caption,
                    useHistoryApi:            slickLightboxOptions.useHistoryApi,
                    background:               slickLightboxOptions.background,
                    closeOnEscape:            slickLightboxOptions.closeOnEscape,
                    closeOnBackdropClick:     slickLightboxOptions.closeOnBackdropClick,
                    navigateByKeyboard:       slickLightboxOptions.navigateByKeyboard,
                    destroyTimeout:           slickLightboxOptions.destroyTimeout,
                    imageMaxHeight:           slickLightboxOptions.imageMaxHeight,
                    lazy:                     slickLightboxOptions.lazy,
                  });
                } // END carousel lightbox enabled

                logger.info('\n' + 'adjust positions of arrows on id: {{carousel.id}}');
                var buttons = $("#{{carousel.id}} > button");

                // recalculate right arrow position based on gutter settings
                //
                var percentage_right = 3 + carouselSettings.gutters;
                $.each($(buttons), function(index, button) {
                  if (button.textContent.includes("Next")) {
                    $(button).attr('style','right: ' + percentage_right + '%');
                  }
                });

                // add CSS style for individual top position for all carousels
                //
                if ($('#{{carousel.id}}_caption')) {
                  logger.info('\n' + 'adjust top position of arrows on id: {{carousel.id}}');
                  var buttons = $("#{{carousel.id}} > button");
                  $.each($(buttons), function(index, button) {
                    $(button).addClass('slick-arrow-{{carousel.id}}');
                  });
                }

              }); // END on carousel init

              function debounce(callback, timeout = 300) {
                let timer;
                var buttons = $("#{{carousel.id}} > button");

                $.each($(buttons), function(index, button) {
                  $(button).addClass('slick-arrow-{{carousel.id}}');
                });

                return (...args) => {
                  clearTimeout(timer);
                  timer = setTimeout(() => { callback.apply(this, args); }, timeout);
                };
              }

              // calculate individual arrow positions for all carousels
              //
              function positionSlickArrows (e) {
                var dependencies_met_page_ready = setInterval (function (options) {
                  var contentState    = $('#content').css("display");
                  var ContentVisible  = (contentState == 'block') ? true: false;
                  var slideImageHeight;

                  if ( j1.getState() === 'finished' && ContentVisible ) {
                    const carousel_type = '{{carousel.type}}';
                    const $slick = $('.{{carousel.id | replace: '_','-' }}');
                    const $slides = $slick.find('.slick-slide');
                    const $currentSlide = $slides.filter((index, slide) => $(slide).hasClass('slick-current'));

                    if (carousel_type == 'example') {
                      slideImageHeight = ($currentSlide.find('{{carousel.style}}').height() / 2) - 25;
                    } else {
                      slideImageHeight = ($currentSlide.find('img').height() / 2) - 20;
                    }

                    logger.info('\n' + 'adjust top arrow position (centered) by ' + slideImageHeight + ' on id: {{carousel.id}}');
                    $('.slick-arrow-{{carousel.id}}').css('top', slideImageHeight + 'px');
                    clearInterval(dependencies_met_page_ready);
                  }
                }, 10);
              }

              // set individual arrow positions for a carousel
              //
              $('.{{carousel.id | replace: '_','-' }}').on('init afterChange', positionSlickArrows);

              // setup the carousel
              logger.info('\n' + 'carousel is being setup on id: ' + '{{carousel.id}}');
              $('.{{carousel.id | replace: '_','-' }}').slick({
                accessibility:              carouselSettings.accessibility,
                adaptiveHeight:             carouselSettings.adaptiveHeight,
                arrows:                     carouselSettings.arrows,
                autoplay:                   carouselSettings.autoplay,
                autoplaySpeed:              carouselSettings.autoplaySpeed,
                centerMode:                 carouselSettings.centerMode,
                centerPadding:              carouselSettings.centerPadding,
                cssEase:                    carouselSettings.cssEase,
                dots:                       carouselSettings.dots,
                dotsClass:                  carouselSettings.dotsClass,
                draggable:                  carouselSettings.draggable,
                easing:                     carouselSettings.easing,
                edgeFriction:               carouselSettings.edgeFriction,
                fade:                       carouselSettings.fade,
                focusOnSelect:              carouselSettings.focusOnSelect,
                focusOnChange:              carouselSettings.focusOnChange,
                infinite:                   carouselSettings.infinite,
                initialSlide:               carouselSettings.initialSlide,
                lazyLoad:                   carouselSettings.lazyLoad,
                mobileFirst:                carouselSettings.mobileFirst,
                pauseOnDotsHover:           carouselSettings.pauseOnDotsHover,
                pauseOnFocus:               carouselSettings.pauseOnFocus,
                pauseOnHover:               carouselSettings.pauseOnHover,
                respondTo:                  carouselSettings.respondTo,
                rows:                       carouselSettings.rows,
                rtl:                        carouselSettings.rtl,
                slide:                      carouselSettings.slide,
                slidesPerRow:               carouselSettings.slidesPerRow,
                slidesToScroll:             carouselSettings.slidesToScroll,
                slidesToShow:               carouselSettings.slidesToShow,
                speed:                      carouselSettings.speed,
                swipe:                      carouselSettings.swipe,
                swipeToSlide:               carouselSettings.swipeToSlide,
                touchMove:                  carouselSettings.touchMove,
                touchThreshold:             carouselSettings.touchThreshold,
                useCSS:                     carouselSettings.useCSS,
                useTransform:               carouselSettings.useTransform,
                variableWidth:              carouselSettings.variableWidth,
                vertical:                   carouselSettings.vertical,
                verticalSwiping:            carouselSettings.verticalSwiping,
                waitForAnimate:             carouselSettings.waitForAnimate,
                zIndex:                     carouselSettings.zIndex,
                responsive:                 carouselResponsiveSettingsOBJ
              });

              // NOT issued correctly (disabled for now)
              // $(window).resize(debounce(positionSlickArrows, 100));

              clearInterval(load_dependencies['dependencies_met_html_loaded_{{carousel.id}}']);
            }
          }, 10); // END
          {% endif %} {% endfor %} // ENDFOR (all) carousels

          _this.setState('finished');
          logger.debug('\n' + 'state: ' + _this.getState());
          logger.info('\n' + 'module initialization finished');

          clearInterval(dependencies_met_page_ready);
        }
      }, 10);

    }, // END init

    // -------------------------------------------------------------------------
    // loadcarouselHTML()
    // load all Slick carousels (HTML portion) dynanically configured
    // and enabled (AJAX) from YAMLdata file
    // NOTE: Make sure the placeholder is available in the content page
    // eg. using the asciidoc extension mastercarousel::
    // -------------------------------------------------------------------------
    loadCarouselHTML: function (options, carousel) {
      var numcarousels      = Object.keys(carousel).length;
      var active_carousels  = numcarousels;
      var xhr_data_path   = options.xhr_data_path + '/index.html';
      var xhr_container_id;

      // console.debug('number of carousels found: ' + numcarousels);

      _this.setState('load_data');
      Object.keys(carousel).forEach(function(key) {
        if (carousel[key].enabled) {
          xhr_container_id = carousel[key].id + '_parent';

          // console.debug('load HTML data on carousel id: ' + carousel[key].id);
          j1.loadHTML({
            xhr_container_id: xhr_container_id,
            xhr_data_path:    xhr_data_path,
            xhr_data_element: carousel[key].id
          });
        } else {
          // console.debug('carousel found disabled on id: ' + carousel[key].id);
          active_carousels--;
        }
      });
      // console.debug('carousels loaded in page enabled|all: ' + active_carousels + '|' + numcarousels);
      _this.setState('data_loaded');
    }, // END loadcarouselHTML

    // -------------------------------------------------------------------------
    // messageHandler: MessageHandler for J1 CookieConsent module
    // Manage messages send from other J1 modules
    // -------------------------------------------------------------------------
    messageHandler: function (sender, message) {
      var json_message = JSON.stringify(message, undefined, 2);

      logText = '\n' + 'received message from ' + sender + ': ' + json_message;
      logger.debug(logText);

      // -----------------------------------------------------------------------
      //  Process commands|actions
      // -----------------------------------------------------------------------
      if (message.type === 'command' && message.action === 'module_initialized') {
        //
        // Place handling of command|action here
        //
        logger.info('\n' + message.text);
      }

      //
      // Place handling of other command|action here
      //

      return true;
    }, // END messageHandler

    // -------------------------------------------------------------------------
    // setState()
    // Sets the current (processing) state of the module
    // -------------------------------------------------------------------------
    setState: function (stat) {
      _this.state = stat;
    }, // END setState

    // -------------------------------------------------------------------------
    // getState()
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return _this.state;
    }, // END getState

  }; // END return
})(j1, window);

{% endcapture %}
{% if production %}
  {{ cache | minifyJS }}
{% else %}
  {{ cache | strip_empty_lines }}
{% endif %}
{% assign cache = nil %}
