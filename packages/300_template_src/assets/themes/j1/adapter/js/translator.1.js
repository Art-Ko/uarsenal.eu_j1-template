---
regenerate:                             true
---

{% capture cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/translator.js
 # Liquid template to create the Template Adapter for J1 Translator
 #
 # Product/Info:
 # http://jekyll.one
 #
 # Copyright (C) 2021 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 # Test data:
 #  {{ liquid_var | debug }}
 # -----------------------------------------------------------------------------
{% endcomment %}

{% comment %} Liquid var initialization
-------------------------------------------------------------------------------- {% endcomment %}

{% comment %} Set config files
-------------------------------------------------------------------------------- {% endcomment %}
{% assign environment         = site.environment %}
{% assign blocks              = site.data.blocks %}
{% assign modules             = site.data.modules %}
{% assign template_config     = site.data.j1_config %}

{% comment %} Set config data
-------------------------------------------------------------------------------- {% endcomment %}
{% assign translator_defaults = modules.defaults.translator.defaults %}
{% assign translator_settings = modules.translator.settings %}
{% assign tracking_enabled    = template_config.analytics.enabled %}


{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}
{% assign translator_options     = translator_defaults | merge: translator_settings %}

{% assign production = false %}
{% if environment == 'prod' or environment == 'production' %}
  {% assign production = true %}
{% endif %}

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/translator.js
 # JS Adapter for J1 Translate
 #
 #  Product/Info:
 #  http://jekyll.one
 #
 #  Copyright (C) 2021 Juergen Adams
 #
 #  J1 Template is licensed under MIT License.
 #  See: https://github.com/jekyll-one/J1 Template/blob/master/LICENSE
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
// https://github.com/EdwardBalaj/Simple-DeepL-API-Integration
// https://github.com/marghoobsuleman/ms-Dropdown
// https://www.marghoobsuleman.com/image-dropdown/help
// https://www.marghoobsuleman.com/image-dropdown/advanced-help
'use strict';

{% comment %} Main
-------------------------------------------------------------------------------- {% endcomment %}
j1.adapter['translator'] = (function (j1, window) {

  var environment       = '{{environment}}';
  var tracking_enabled  = ('{{tracking_enabled}}' === 'true') ? true: false;    // Analytics/GA enabled?
  var moduleOptions     = {};
  var user_translate    = {};
  var _this;
  var $modal;
  var domain;
  var cookie_names;
  var user_consent;
  var logger;
  var url;
  var baseUrl;
  var hostname;
  var domain;
  var cookie_sub_domains;
  var secure;
  var logText;
  var cookie_written;
  var modal_language;
  var navigator_language;
  var translation_language;
  var ddSourceLanguage;
  var head;
  var script;
  var languageList;

  // ---------------------------------------------------------------------------
  // helper functions
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // setCookie()
  // writes a flat cookie (not using an encoded JSON string)
  // ---------------------------------------------------------------------------
  function setCookie(options /*cName, cValue, expDays*/) {
    var defaults = {};
    var settings;
    var document_cookie;
    var stringifiedAttributes = '';

    defaults = {
        name: '',
        path: '/',
        expires: 0,
        domain: 'localhost',
        samesite: 'Strict',
        http_only: false,
        secure: false
    };
    settings = $.extend(defaults, options);

    stringifiedAttributes += '; ' + 'path=' + settings.path;

    if (settings.expires > 0) {
      date.setTime(date.getTime() + (settings.expires * 24 * 60 * 60 * 1000));
      stringifiedAttributes += '; ' + 'expires=' + date.toUTCString();
    }

    stringifiedAttributes += '; ' + 'SameSite=' + settings.samesite;

    if (settings.secure) {
      stringifiedAttributes += '; ' + 'secure=' + settings.secure;
    }

    // document_cookie = settings.name + '=' + settings.data  + '; path=' + settings.path + '; ' + 'domain=' + settings.domain + '; ' + 'SameSite=' + settings.samesite + ';';
    document_cookie = settings.name + '=' + settings.data + stringifiedAttributes;

    document.cookie = document_cookie;
  };

  // ---------------------------------------------------------------------------
  // Main object
  // ---------------------------------------------------------------------------
  return {

    // -------------------------------------------------------------------------
    // Initializer
    // -------------------------------------------------------------------------
    init: function (options) {

      // -----------------------------------------------------------------------
      // globals
      // -----------------------------------------------------------------------
      _this                 = j1.adapter.translator;
      logger                = log4javascript.getLogger('j1.adapter.translator');
      url                   = new liteURL(window.location.href);
      baseUrl               = url.origin;
      hostname              = url.hostname;
      domain                = hostname.substring(hostname.lastIndexOf('.', hostname.lastIndexOf('.') - 1) + 1);
      secure                = (url.protocol.includes('https')) ? true : false;
      modal_language        = "{{site.language}}";
      navigator_language    = navigator.language || navigator.userLanguage;     // userLanguage for MS IE compatibility
      translation_language  = navigator_language.split('-')[0];
      cookie_names          = j1.getCookieNames();
      head                  = document.getElementsByTagName('head')[0];
      script                = document.createElement('script');
      script.id             = 'google-translate';
      script.src            = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';

      user_translate = {
        'translatorName':           'google',
        'translationEnabled':       false,
        'analysis':                 true,
        'personalization':          true,
        'translateAllPages':        true,
        'useLanguageFromBrowser':   true,
        'translationLanguage':      translation_language,
      };

      // set domain used by cookies
      if(domain !== 'localhost') {
        cookie_sub_domains = '.' + hostname;
      } else {
        cookie_sub_domains = hostname;
      }

      if (j1.existsCookie(cookie_names.user_translate)) {
        user_translate = j1.readCookie(cookie_names.user_translate);
      } else {
        logger.debug('\n' + 'write to cookie : ' + cookie_names.user_translate);
        cookie_written = j1.writeCookie({
          name:     cookie_names.user_translate,
          data:     user_translate,
          samesite: 'Strict',
          expires:  365
        });
      }

      // set domain used by cookies
      if(domain !== 'localhost') {
        cookie_sub_domains = '.' + hostname;
      } else {
        cookie_sub_domains = hostname;
      }

      // initialize state flag
      _this.state = 'pending';
      // _this.settings.languageList = '/assets/data/ms_select.json';

      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.translator',
        generated:   '{{site.time}}'
      }, options);

      {% comment %} Load module config from yml data
      -------------------------------------------------------------------------- {% endcomment %}
      // Load  module DEFAULTS|CONFIG
      /* eslint-disable */
      moduleOptions = $.extend({}, {{translator_options | replace: '=>', ':' | replace: 'nil', '""'}});
      /* eslint-enable */

      if (typeof settings !== 'undefined') {
        moduleOptions = j1.mergeData(moduleOptions, settings);
      }

      // -----------------------------------------------------------------------
      // initializer
      // -----------------------------------------------------------------------
      var dependencies_met_page_ready = setInterval (function (options) {
        user_consent = j1.readCookie(cookie_names.user_consent);

        if ( j1.getState() === 'finished' ) {
          _this.setState('started');
          logger.info('\n' + 'state: ' + _this.getState());
          logger.info('\n' + 'module is being initialized');

          if ($('google_translate_element')) {
            $('google_translate_element').hide();
          }

          // show|hide translate button if enabled
          if (moduleOptions.hideTranslatorIcon) {
            if (!user_consent.analysis || !user_consent.personalization) {
              // disable google translate button if visible
              if ($('#quickLinksTranslateButton').css('display') === 'block')  {
                $('#quickLinksTranslateButton').css('display', 'none');
              }
            }
            if (user_consent.analysis && user_consent.personalization) {
              // enable google translate button if not visible
              if ($('#quickLinksTranslateButton').css('display') === 'none')  {
                $('#quickLinksTranslateButton').css('display', 'block');
              }
            }
          }

          // update user_translate cookie
          user_translate.analysis         = user_consent.analysis;
          user_translate.personalization  = user_consent.personalization;
          cookie_written = j1.writeCookie({
            name:     cookie_names.user_translate,
            data:     user_translate,
            samesite: 'Strict',
            secure:   secure
          });

          j1.translator = new Translator({
            contentURL:               moduleOptions.contentURL,                 // dialog content (modals) for all supported languages
            cookieName:               moduleOptions.cookieName,                 // the name of the User State Cookie (primary data)
            cookieConsentName:        moduleOptions.cookieConsentName,          // the name of the Cookie Consent Cookie (secondary data)
            disableLanguageSelector:  moduleOptions.disableLanguageSelector,    // disable language dropdown for translation in dialog (modal)
            dialogContainerID:        moduleOptions.dialogContainerID,          // dest container, the dialog modal is loaded (dynamically)
            dialogLanguage:           moduleOptions.dialogLanguage,             // language for the dialog (modal)
            translationLanguage:      moduleOptions.translationLanguage,        // default language for translation
            translationLanguages:     moduleOptions.google.translationLanguages,// supported languages for translation
            translationEnabled:       moduleOptions.translationEnabled,         // run translation enabled|disabled
            translatorName:           moduleOptions.translatorName,             // translator used for translation
            xhrDataElement:           moduleOptions.xhrDataElement,             // container for all language-specific dialogs (modals)
            postSelectionCallback:    moduleOptions.google.postSelectionCallback
          });

          if (user_consent.analysis && user_consent.personalization && user_translate.translationEnabled) {
            if (moduleOptions.translatorName === 'google') {
              head.appendChild(script);
              if ($('google_translate_element')) {
                $('google_translate_element').hide();
              }
            }
          } else {
            if (moduleOptions.translatorName === 'google') {
              j1.removeCookie({name: 'googtrans', domain: domain});
            }
          }

          _this.setState('finished');
          logger.info('\n' + 'state: ' + _this.getState());
          logger.debug('\n' + 'module initialized successfully');
          clearInterval(dependencies_met_page_ready);
        }
      });
    }, // END init

    // -------------------------------------------------------------------------
    // messageHandler: MessageHandler for J1 google_translate module
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

    // -------------------------------------------------------------------------
    // postTranslateElementInit()
    // ???
    // -------------------------------------------------------------------------
    postTranslateElementInit: function () {
      // var transCode = '/en/de';
      //
      // // set the transCode cookie (googtrans)
      // setCookie({
      //   name: 'googtrans',
      //   data: transCode
      // });
      // j1.removeCookie({name: 'googtrans', domain: domain});
      return;
    }, // END postTranslateElementInit

    // -------------------------------------------------------------------------
    // cbGoogle()
    // Called by the translator CORE module after the user
    // has made the lanuage selection for translation (callback)
    // -------------------------------------------------------------------------
    cbGoogle: function () {
      var cookie_names   = j1.getCookieNames();
      var user_state     = j1.readCookie(cookie_names.user_state);
      var user_consent   = j1.readCookie(cookie_names.user_consent);
      var user_translate = j1.readCookie(cookie_names.user_translate);
      var msDropdownLang = document.getElementById('dropdownJSON').msDropdown;
      var msDropdown     = document.getElementById('dropdownJSON').msDropdown;
      var head;
      var script;
      var srcLang;
      var destLang;
      var transCode;
      var cookie_written;
      var htmlScriptElement;
      var selectedTranslationLanguage;

      logger.info('\n' + 'entered post selection callback from google_translate');
      logger.debug('\n' + 'current values from cookie consent: ' + JSON.stringify(user_consent));
      logger.debug('\n' + 'current values from user state: ' + JSON.stringify(user_state));

      selectedTranslationLanguage = msDropdownLang.value;
      logger.info('\n' + 'selected translation language: ' + selectedTranslationLanguage);

      // update cookie consent settings
      user_consent.analysis         = user_translate.analysis;
      user_consent.personalization  = user_translate.personalization;

      cookie_written = j1.writeCookie({
        name:     cookie_names.user_consent,
        data:     user_consent,
        samesite: 'Strict',
        secure:   secure,
        expires:  0
      });

      // translation allowed
      if (user_consent.analysis && user_consent.personalization)  {
        head              = document.getElementsByTagName('head')[0];
        script            = document.createElement('script');
        script.id         = 'google-translate';
        script.src        = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        htmlScriptElement = document.getElementById(script.id);

        if (user_translate.translationEnabled && moduleOptions.translatorName === 'google') {
          // head.appendChild(script);

          if ($('google_translate_element')) {
            $('google_translate_element').hide();
          }

          // set transCode settings
          srcLang   = "{{site.language}}";
          destLang  = translation_language;
          transCode = '/' + srcLang + '/' + selectedTranslationLanguage;

          // set the transCode cookie (googtrans)
          setCookie({
            name: 'googtrans',
            data: transCode
          });

          // enable google transalate button if not visible
          if ($('#quickLinksTranslateButton').css('display') === 'none')  {
            $('#quickLinksTranslateButton').css('display', 'block');
          }
        } else { // translation NOT allowed

          // update cookie user translate settings
          user_translate.translationEnabled = false;
          cookie_written = j1.writeCookie({
            name:     cookie_names.user_translate,
            data:     user_translate,
            samesite: 'Strict',
            secure:   secure
          });

          // stop translation for all pages
          if (htmlScriptElement) { htmlScriptElement.remove(); }
          j1.removeCookie({name: 'googtrans', domain: domain});
        }
      }

      // translation NOT allowed
      if (!user_translate.analysis || !user_translate.personalization) {
        head       = document.getElementsByTagName('head')[0];
        script     = document.createElement('script');
        script.id  = 'google-translate';

        // update cookie consent settings
        user_consent.analysis        = user_translate.analysis;
        user_consent.personalization = user_translate.personalization;
        cookie_written = j1.writeCookie({
          name:     cookie_names.user_consent,
          data:     user_consent,
          samesite: 'Strict',
          secure:   secure,
          expires:  0
        });

        // update cookie user translate settings
        user_translate.translationEnabled = false;
        cookie_written = j1.writeCookie({
          name:     cookie_names.user_translate,
          data:     user_consent,
          samesite: 'Strict',
          secure:   secure,
          expires:  0
        });

        // stop translation for all pages
        if (htmlScriptElement) { htmlScriptElement.remove(); }
        j1.removeCookie({name: 'googtrans', domain: domain});
      }

      if (moduleOptions.reloadPageOnChange) {
        // reload current page (skip cache)
        location.reload(true);
      }

      // disable google translate button if visible
      if ($('#quickLinksTranslateButton').css('display') === 'block')  {
        $('#quickLinksTranslateButton').css('display', 'none');
      }

    }, // END cbGoogle

    // -------------------------------------------------------------------------
    // cbDeepl()
    // Called by the translator CORE module after the user
    // has made the lanuage selection for translation (callback)
    // -------------------------------------------------------------------------
    cbDeepl: function () {

      // code for post procession on Deepl translations

    } // END cbDeepl

  }; // END return
})(j1, window);

{% endcapture %}
{{ cache | strip_empty_lines }}
{% assign cache = nil %}
