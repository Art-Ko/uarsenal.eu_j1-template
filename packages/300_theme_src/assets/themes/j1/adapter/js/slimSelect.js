---
regenerate:                             true
---

{% capture cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/slimSelect.js
 # Liquid template to adapt the slimSelect module
 #
 # Product/Info:
 # https://jekyll.one
 # Copyright (C) 2023, 2024 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see: https://github.com/jekyll-one-org/j1-template/blob/main/LICENSE.md
 # -----------------------------------------------------------------------------
 # Test data:
 #  {{ liquid_var | debug }}
 #  slim_select_options:  {{ slim_select_options | debug }}
 # -----------------------------------------------------------------------------
{% endcomment %}

{% comment %} Liquid procedures
-------------------------------------------------------------------------------- {% endcomment %}

{% comment %} Set global settings
-------------------------------------------------------------------------------- {% endcomment %}
{% assign environment       = site.environment %}
{% assign asset_path        = "/assets/themes/j1" %}

{% comment %} Process YML config data
================================================================================ {% endcomment %}

{% comment %} Set config files
-------------------------------------------------------------------------------- {% endcomment %}
{% assign template_config    = site.data.j1_config %}
{% assign blocks             = site.data.blocks %}
{% assign modules            = site.data.modules %}

{% comment %} Set config data
-------------------------------------------------------------------------------- {% endcomment %}
{% assign slim_select_defaults = modules.defaults.slim_select.defaults %}
{% assign slim_select_settings = modules.slim_select.settings %}

{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}
{% assign slim_select_options  = slim_select_defaults | merge: slim_select_settings %}

{% comment %} Variables
-------------------------------------------------------------------------------- {% endcomment %}
{% assign comments          = slim_select_options.enabled %}

{% comment %} Detect prod mode
-------------------------------------------------------------------------------- {% endcomment %}
{% assign production = false %}
{% if environment == 'prod' or environment == 'production' %}
  {% assign production = true %}
{% endif %}

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/waves.js
 # J1 Adapter for the waves module
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2023, 2024 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see: https://github.com/jekyll-one-org/j1-template/blob/main/LICENSE.md
 # -----------------------------------------------------------------------------
 # NOTE: Wave styles defind in /assets/data/panel.html, key 'wave'
 # -----------------------------------------------------------------------------
 #  Adapter generated: {{site.time}}
 # -----------------------------------------------------------------------------
*/

// -----------------------------------------------------------------------------
// ESLint shimming
// -----------------------------------------------------------------------------
/* eslint indent: "off"                                                       */
// -----------------------------------------------------------------------------
'use strict';
j1.adapter.slimSelect = (function (j1, window) {

// -----------------------------------------------------------------------------
// Set global variables
// -----------------------------------------------------------------------------
var slimSelectDefaults;
var slimSelectSettings;
var slimSelectOptions;

var _this;
var logger;
var logText;

var selectDIV;
var selectHTML;

// date|time
var startTime;
var endTime;
var startTimeModule;
var endTimeModule;
var timeSeconds;

  // ---------------------------------------------------------------------------
  // Main object
  // ---------------------------------------------------------------------------
  return {

    // -------------------------------------------------------------------------
    // init()
    // adapter initializer
    // -------------------------------------------------------------------------
    init: function (options) {

      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.slimSelect',
        generated:   '{{site.time}}'
      }, options);

      // -----------------------------------------------------------------------
      // Global variable settings
      // -----------------------------------------------------------------------
      slimSelectDefaults  = $.extend({}, {{slim_select_defaults | replace: 'nil', 'null' | replace: '=>', ':' }});
      slimSelectSettings  = $.extend({}, {{slim_select_settings | replace: 'nil', 'null' | replace: '=>', ':' }});
      slimSelectOptions   = $.extend(true, {}, slimSelectDefaults, slimSelectSettings);
      _this               = j1.adapter.slimSelect;
      logger              = log4javascript.getLogger('j1.adapter.slimSelect');

      // intialize select data (for later access)
      _this.select        = {};
      _this.selectHTML    = {};

      // -----------------------------------------------------------------------
      // initializer
      // -----------------------------------------------------------------------
      var dependency_met_page_ready = setInterval (() => {
        var pageState      = $('#content').css("display");
        var pageVisible    = (pageState == 'block') ? true : false;
        var j1CoreFinished = (j1.getState() == 'finished') ? true : false;

        if (j1CoreFinished && pageVisible) {
          startTimeModule = Date.now();

          _this.setState('started');
          logger.debug('\n' + 'set module state to: ' + _this.getState());
          logger.info('\n' + 'initializing module: started');

          var wrapper_dependencies = {};
          var dependency;

          // setup selects on all wrappers
          {% for select in slim_select_settings.selects %} {% if select.enabled %}
          logger.debug('\n' + 'select {{select.id}} is being initialized on wrapper: {{select.wrapper_id}}');

          // create dynamic loader variable to setup the
          // select '{{select.id}}' on wrapper: '{{select.wrapper_id}}'
          dependency = 'dependency_met_wrapper_ready_{{select.id}}';
          wrapper_dependencies[dependency] = '';

          wrapper_dependencies['dependency_met_wrapper_ready_{{select.id}}'] = setInterval (() => {
            var wrapperState = $('#{{select.wrapper_id}}').length;
            var wrapperReady = (wrapperState > 0) ? true : false;

            // process the wrapper if extsts
            if (wrapperReady) {
              logger.debug('\n' + 'select {{select.id}} is being placed on wrapper: {{select.wrapper_id}}');

              // create|place select <div> element
              selectDIV           = document.createElement('div');
              selectDIV.id        = 'container_{{select.wrapper_id}}';
              selectHTML          = `{{select.items}}`;
              selectDIV.innerHTML = selectHTML;
              document.getElementById('{{select.wrapper_id}}').appendChild(selectDIV);

              // store the select HTML code into the adapter for later access
              _this.selectHTML.{{select.id}} = selectDIV;

              // setup new SlimSelect
              // jadams, 2024-03-06: setup events moved to page (test_icon_picker.adoc)
              logger.debug('\n' + 'SlimSelect object is being created for id: {{select.id}}');
              var $select_{{select.id}} = new SlimSelect ({
                select:                   'select[name ="{{select.name}}"]',
                settings: {
                  showSearch:             slimSelectOptions.api_options.showSearch,
                  searchPlaceholder:      slimSelectOptions.api_options.searchPlaceholder,
                  searchText:             slimSelectOptions.api_options.searchText,
                  searchingText:          slimSelectOptions.api_options.searchingText,
                  searchHighlight:        slimSelectOptions.api_options.searchHighlight,
                  closeOnSelect:          slimSelectOptions.api_options.closeOnSelect,
                  contentPosition:        slimSelectOptions.api_options.contentPosition,
                  openPosition:           slimSelectOptions.api_options.openPosition,
                  placeholderText:        slimSelectOptions.api_options.placeholderText,
                  allowDeselect:          slimSelectOptions.api_options.allowDeselect,
                  hideSelected:           slimSelectOptions.api_options.hideSelected,
                  showOptionTooltips:     slimSelectOptions.api_options.showOptionTooltips,
                  minSelected:            slimSelectOptions.api_options.minSelected,
                  maxSelected:            slimSelectOptions.api_options.maxSelected,
                  timeoutDelay:           slimSelectOptions.api_options.timeoutDelay,
                  maxValuesShown:         slimSelectOptions.api_options.maxValuesShown
                }
              });

              // store the select in the adapter for later access
              _this.select.{{select.id}} = $select_{{select.id}};

              logger.debug('\n' + 'initializing finished select: {{select.id}}');
            } else {
              logger.debug('\n' + 'wrapper not found: {{select.wrapper_id}}');
            } // END if wrapperReady

            clearInterval(wrapper_dependencies['dependency_met_wrapper_ready_{{select.id}}']);
          }, 10);
          {% endif %} {% endfor %}
          // END (for) all selects

          _this.setState('finished');
          logger.debug('\n' + 'state: ' + _this.getState());
          logger.info('\n' + 'initializing module: finished');

          endTimeModule = Date.now();
          logger.info('\n' + 'module initializing time: ' + (endTimeModule-startTimeModule) + 'ms');

          clearInterval(dependency_met_page_ready);
        } // END 'pageVisible'
      }, 10);

    }, // END init

    // -------------------------------------------------------------------------
    // int2float()
    // convert an integer to float using given precision (default: 2 decimals)
    // -------------------------------------------------------------------------
    int2float: function (number, precision=2) {
      return number.toFixed(precision);
    },

    // -------------------------------------------------------------------------
    // messageHandler()
    // manage messages send from other J1 modules
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
