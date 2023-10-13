---
regenerate:                             true
---

{% capture cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/justifiedGallery.js
 # Liquid template to create the J1 Adapter for Justified Gallery
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2023 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # See: https://github.com/jekyll-one-org/j1-template/blob/main/LICENSE.md
 # -----------------------------------------------------------------------------
{% endcomment %}

{% comment %} Liquid procedures
-------------------------------------------------------------------------------- {% endcomment %}

{% comment %} Set global settings
-------------------------------------------------------------------------------- {% endcomment %}
{% assign environment           = site.environment %}
{% assign template_version      = site.version %}

{% comment %} Process YML config data
================================================================================ {% endcomment %}

{% comment %} Set config files
-------------------------------------------------------------------------------- {% endcomment %}
{% assign template_config       = site.data.j1_config %}
{% assign apps                  = site.data.apps %}
{% assign modules               = site.data.modules %}

{% comment %} Set config data
-------------------------------------------------------------------------------- {% endcomment %}
{% assign jf_gallery_defaults   = modules.defaults.justifiedGallery.defaults %}
{% assign jf_gallery_settings   = modules.justifiedGallery.settings %}

{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}
{% assign jf_gallery_options    = jf_gallery_defaults | merge: jf_gallery_settings %}

{% comment %} Detect prod mode
-------------------------------------------------------------------------------- {% endcomment %}
{% assign production = false %}
{% if environment == 'prod' or environment == 'production' %}
  {% assign production = true %}
{% endif %}

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/justifiedGallery.js
 # JS Adapter for Justified Gallery
 #
 # Product/Info:
 # https://jekyll.one
 # https://github.com/miromannino/Justified-Gallery
 #
 # Copyright (C) 2020 Miro Mannino
 # Copyright (C) 2023 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # See: https://github.com/jekyll-one-org/j1-template/blob/main/LICENSE.md
 # Justified Gallery is licensed under the MIT license
 # See: https://github.com/miromannino/Justified-Gallery/blob/master/LICENSE
 # -----------------------------------------------------------------------------
 # Adapter generated: {{site.time}}
 # -----------------------------------------------------------------------------
*/

// -----------------------------------------------------------------------------
// ESLint shimming
// -----------------------------------------------------------------------------
/* eslint indent: "off"                                                       */
// -----------------------------------------------------------------------------
'use strict';
j1.adapter.justifiedGallery = (function (j1, window) {

  {% comment %} Global variables
  ------------------------------------------------------------------------------ {% endcomment %}
  var environment   = '{{environment}}';
  var state         = 'not_started';
  var justifiedGalleryDefaults;
  var justifiedGallerySettings;
  var justifiedGalleryOptions;
  var frontmatterOptions;
  var _this;
  var logger;
  var logText;

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

      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.justifiedGallery',
        generated:   '{{site.time}}'
      }, options);

      // -----------------------------------------------------------------------
      // Global variable settings
      // -----------------------------------------------------------------------

      // create settings object from frontmatter (page settings)
      frontmatterOptions  = options != null ? $.extend({}, options) : {};

      // Load  module DEFAULTS|CONFIG
      justifiedGalleryDefaults = $.extend({}, {{jf_gallery_defaults | replace: 'nil', 'null' | replace: '=>', ':' }});
      justifiedGallerySettings = $.extend({}, {{jf_gallery_settings | replace: 'nil', 'null' | replace: '=>', ':' }});
      justifiedGalleryOptions  = $.extend(true, {}, justifiedGalleryDefaults, justifiedGallerySettings, frontmatterOptions);

      _this = j1.adapter.justifiedGallery;
      logger = log4javascript.getLogger('j1.adapter.justifiedGallery');

      var dependencies_met_j1_finished= setInterval(function() {
        var pageState     = $('#no_flicker').css("display");
        var pageVisible   = (pageState == 'block') ? true : false;
        var atticFinished = (j1.adapter.attic.getState() == 'finished') ? true: false;

        if (j1.getState() == 'finished' && pageVisible) {
//      if (j1.getState() == 'finished' && pageVisible && atticFinished) {

          // initialize state flag
          _this.setState('started');
          logger.debug('\n' + 'state: ' + _this.getState());
          logger.info('\n' + 'module is being initialized');

          _this.initialize(justifiedGalleryOptions);
          _this.setState('finished');

          logger.debug('\n' + 'state: ' + _this.getState());
          logger.info('\n' + 'module initialized successfully');

          clearInterval(dependencies_met_j1_finished);
        }
      }, 10);
    },

    // -----------------------------------------------------------------------
    // Load AJAX data and initialize the jg gallery
    // -----------------------------------------------------------------------
    initialize: function (options) {
      logger = log4javascript.getLogger('j1.adapter.justifiedGallery');

      _this.setState('running');
      logger.debug('\n' + 'state: ' + _this.getState());

      {% for item in jf_gallery_options.galleries %}
        {% if item.gallery.enabled %}

          {% assign gallery_id = item.gallery.id %}

          {% assign lb_options        	  = item.gallery.lightbox_options %}
          {% assign jg_options            = item.gallery.gallery_options  %}
          {% assign gallery_title         = item.gallery.title %}
          {% assign gallery_type          = item.gallery.type %}
          {% assign lightbox              = item.gallery.lightbox_options.lightbox %}
          {% assign theme                 = item.gallery.theme %}
          {% assign show_delay        	  = 250 %}

          {% if lightbox == "lg" %}
            {% assign lb_mode             = "lg-fade" %}
            {% assign lb_cssEasing        = "cubic-bezier(0.25, 0, 0.25, 1)" %}
            {% assign lb_thumbnails       = true  %}
            {% assign lb_autoplay         = false %}
            {% assign lb_fullscreen       = true  %}
            {% assign lb_pager            = true  %}
            {% assign lb_zoomer           = true  %}
            {% assign lb_hash             = true  %}
            {% assign lb_video            = false %}
            {% assign lb_video_html5      = false %}
            {% assign lb_video_online     = false %}
            {% assign lb_share            = false %}
            {% assign lb_share_facebook   = false %}
            {% assign lb_share_twitter    = false %}
            {% assign lb_share_googleplus = false %}
            {% assign lb_share_pinterest  = false %}
          {% endif %}

          {% if item.gallery.show_delay %}  {% assign show_delay    = item.gallery.show_delay %}  {% endif %}
          {% if item.gallery.theme %}       {% assign theme         = item.gallery.theme %}  {% endif %}
          {% if lb_options.mode %}          {% assign lb_mode       = lb_options.mode %}          {% endif %}
          {% if lb_options.cssEasing %}     {% assign lb_cssEasing  = lb_options.cssEasing %}     {% endif %}
          {% if lb_options.thumbnails %}    {% assign lb_thumbnails = lb_options.thumbnails %}    {% endif %}
          {% if lb_options.autoplay %}      {% assign lb_autoplay   = lb_options.autoplay %}      {% endif %}
          {% if lb_options.fullscreen %}    {% assign lb_fullscreen = lb_options.fullscreen %}    {% endif %}
          {% if lb_options.pager %}         {% assign lb_pager      = lb_options.pager %}         {% endif %}
          {% if lb_options.zoomer %}        {% assign lb_zoomer     = lb_options.zoomer %}        {% endif %}
          {% if lb_options.video.enabled %} {% assign lb_video      = lb_options.video.enabled %} {% endif %}

          {% if lb_options.video.enabled %}
            logText = '\n' + 'type video not supported';
            logger.error(logText);
          {% endif %}

          // Create an gallery instance if id: {{gallery_id}} exists
          if ($('#{{gallery_id}}').length) {

          logText = '\n' + 'gallery is being initialized on id: #{{gallery_id}}';
          logger.info(logText);

          // Place HTML markup for the title
          {% if gallery_title %}
          var gallery_title = '<div class="jg-gallery-title">{{gallery_title}}</div>';
          $('#{{gallery_id}}').before(gallery_title);
          {% endif %}

          $('#{{gallery_id}}').addClass('justified-gallery {{css_classes}}');

          {% if gallery_type == "image" %}
            // Collect image gallery data from data file (xhr_data_path)
            $.getJSON('{{jf_gallery_options.xhr_data_path}}', function (data) {
              var content = '';
              var gallery_class = 'justified-gallery';
              {% if lightbox == "lg" %}
              gallery_class += ' light-gallery ';
              {% endif %}

              for (var i in data['{{item.gallery.id}}']) {
                var img               = data['{{item.gallery.id}}'][i].img;
                var captions_gallery  = data['{{item.gallery.id}}'][i].captions_gallery;
                var captions_lightbox = data['{{item.gallery.id}}'][i].captions_lightbox;
                var lightbox          = '{{lightbox}}';

                if (captions_lightbox != null && lightbox == 'lg') {
                  content +=  '<a class="speak2me-ignore" data-sub-html="' +captions_lightbox+ '" ';
                  content +=  'href="' +img+ '">' + '\n';
                  content +=  '  <img class="speak2me-ignore" src="' +img+ '" img alt="' +captions_lightbox+ '">' + '\n';
                } else {
                  content +=  '<a class="speak2me-ignore" data-sub-html="' +captions_gallery+ '" ';
                  content +=  'href="' +img+ '">' + '\n';
                  content +=  ' <img class="speak2me-ignore" src="' +img+ '" img alt="' +captions_gallery+ '">' + '\n';
                }
                content +=  '</a>' + '\n';

              } // END for

          {% elsif gallery_type == "video-html5" or gallery_type == "video-online" %}

            // Collect html5 video gallery data from data file (xhr_data_path)
            //
            $.getJSON('{{jf_gallery_options.xhr_data_path}}', function (data) {
              var play_button = '/assets/themes/j1/modules/lightGallery/css/themes/icons/play-button.png';
              var content = '';
              var gallery_class = 'justified-gallery';
              {% if lightbox == "lg" %}
              gallery_class += ' light-gallery ';
              {% endif %}

              for (var i in data['{{item.gallery.id}}']) {
                var img               = data['{{item.gallery.id}}'][i].image_path + '/' + data['{{item.gallery.id}}'][i].poster;
                var captions_gallery  = data['{{item.gallery.id}}'][i].captions_gallery;
                var captions_lightbox = data['{{item.gallery.id}}'][i].captions_lightbox;
                var video_id          = data['{{item.gallery.id}}'][i].video_id;
                var video             = data['{{item.gallery.id}}'][i].video;
                var theme             = data['{{item.gallery.id}}'][i].theme;
                var player_params     = data['{{item.gallery.id}}'][i].player_params;
                var lightbox          = '{{lightbox}}';

                if (captions_lightbox != null && lightbox == 'lg') {
                  // VIDEO content use 'lightGallery'
                  // jadams 2023-06-18: NOT possible to add an href element (required for SEO)
                  //
                  content +=  '<a class="speak2me-ignore" data-sub-html="' +captions_lightbox+ '" ';
                  {% if gallery_type == "video-html5" %}
                  content += ' data-html="#' +video_id+ '">' + '\n';
                  {% endif %}
                  {% if gallery_type == "video-online" %}
                  content += ' data-src="' +video+ '"';
                  content += ' data-options="' +player_params+ '"' + '>' + '\n';
                  {% endif %}
                  content +=  'href="' +img+ '"' + '\n';
                  content +=  '<img class="speak2me-ignore" src="' +img+ '" img alt="' +captions_lightbox+ '">' + '\n';
                  content +=  '<span><img class="justified-gallery img-overlay speak2me-ignore" src="/assets/themes/j1/modules/lightGallery/css/themes/icons/play-button.png" alt="Play Button"></span>' + '\n';
                } else {
                  // IMAGE content use default 'Lightbox'
                  content +=  '<a data-sub-html="' +captions_gallery+ '" ';
                  content +=  'href="' +img+ '">' + '\n';
                  content +=  '<img class="speak2me-ignore" src="' +img+ '" img alt="' +captions_gallery+ '">' + '\n';
                  content +=  '<span><img class="justified-gallery img-overlay speak2me-ignore" src="/assets/themes/j1/modules/lightGallery/css/themes/icons/play-button.png" alt="Play Button"></span>' + '\n';
                }
                content +=  '</a>' + '\n';

              } // END for

              // hidden container for the video-js player
              //
              var hidden_video_div = '';
              for (var i in data['{{item.gallery.id}}']) {
                var video        = data['{{item.gallery.id}}'][i].video_path + '/' + data['{{item.gallery.id}}'][i].video;
                var poster       = data['{{item.gallery.id}}'][i].image_path + '/' + data['{{item.gallery.id}}'][i].poster;
                var caption      = data['{{item.gallery.id}}'][i].captions_lightbox;
                var video_id     = data['{{item.gallery.id}}'][i].video_id;
                var video_type   = video.substr(video.lastIndexOf('.') + 1);
                hidden_video_div += '<div style="display:none;" id="' +video_id+ '">' + '\n';
                hidden_video_div += '  <video class="lg-video-object lg-html5 video-js vjs-theme-{{theme}}"' + '\n';
                hidden_video_div += '    poster="' +poster+ '" controls="" preload="none">' + '\n';
                hidden_video_div += '    <source src="' +video+ '" type="video/' +video_type+ '">' + '\n';
                hidden_video_div += '    Your browser does not support HTML5 video.' + '\n';
                hidden_video_div += '  </video>' + '\n';
                hidden_video_div += '</div>' + '\n';
              }
              $('#{{ gallery_id }}').before(hidden_video_div);

          {% endif %}

              // Hide gallery container (until lightGallery is NOT initialized)
              // and place HTML markup
              $('#{{gallery_id}}').hide().html(content);
              // Initialize and run the gallery using individual gallery|lightbox options
              {% if lightbox == "lg" %}
                var gallery_selector = $('#{{gallery_id}}');
                if (options !== undefined) {
                  // lightbox initialized on COMPLETE event of justifiedGallery
                  /* eslint-disable */
                  gallery_selector.justifiedGallery({
                    {% for option in item.gallery.gallery_options %}
                    {{option[0] | json}}: {{option[1] | json}},
                    {% endfor %}
                  })
                  /* eslint-enable */
                  .on('jg.complete', function (e) {
                    e.stopPropagation();

                    // options enabled
                    /* eslint-disable */
                    lightGallery(
                      document.getElementById("{{gallery_id}}"), {
                      plugins: [lgFullscreen, lgRotate, lgThumbnail],
                      {% for option in item.gallery.lightbox_options %}
                      {{option[0] | json}}: {{option[1] | json}},                      
                      {% endfor %}
                    });
                    /* eslint-enable */

                    // Initialize instance variable of lightGallery (for later access)
                    j1['{{gallery_id}}'] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() {
                      $('#{{gallery_id}}').show();
                      logText = '\n' + 'initializing gallery finished on id: #{{gallery_id}}';
                      logger.info(logText);
                    }, {{show_delay}});
                  });
                } else {
                  /* eslint-disable */
                  gallery_selector.justifiedGallery({
                    {% for option in item.gallery.gallery_options %}
                    {{option[0] | json}}: {{option[1] | json}},
                    {% endfor %}
                  /* eslint-enable */
                  }).on('jg.complete', function (e) {
                     e.stopPropagation();
                    // lightbox initialized on COMPLETE event of justifiedGallery
                    /* eslint-disable */
                    window.lightGallery(
                      document.getElementById("{{gallery_id}}"), {
                      plugins: [lgVideo],
                      {% for option in item.gallery.lightbox_options %}
                      {{option[0] | json}}: {{option[1] | json}},
                      {% endfor %}
                    });
                    /* eslint-enable */

                    // Initialize instance variable of lightGallery (for later access)
                    j1['{{gallery_id}}'] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() {
                      $('#{{gallery_id}}').show();
                      logText = '\n' + 'initializing gallery finished on id: #{{gallery_id}}';
                      logger.info(logText);
                      }, {{show_delay}});
                  });
                }
              {% endif %} // ENDIF lightbox "lg"

            }); // END getJSON
          } //end gallery
        {% endif %} // ENDIF gallery enabled
      {% endfor %}
    }, // END function initialize

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
        _this.setState('finished');
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
    } // END getState

  }; // END return
})(j1, window);

{% endcapture %}
{% if production %}
  {{ cache | minifyJS }}
{% else %}
  {{ cache | strip_empty_lines }}
{% endif %}
{% assign cache = nil %}