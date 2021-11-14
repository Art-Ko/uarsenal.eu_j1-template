// extracted from buttons.js
//
(function($, anim) {
  'use strict';

  let _defaults = {
    direction: 'top',
    hoverEnabled: true,
    toolbarEnabled: false
  };

  $.fn.reverse = [].reverse;

  // jadams, 2020-10-10, added class from main (materialize.js)
  //
  class Component {
    /**
     * Generic constructor for all components
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(classDef, el, options) {
      // Display error if el is valid HTML Element
      if (!(el instanceof Element)) {
        console.error(Error(el + ' is not an HTML Element'));
      }

      // If exists, destroy and reinitialize in child
      let ins = classDef.getInstance(el);
      if (!!ins) {
        ins.destroy();
      }

      this.el = el;
      this.$el = cash(el);
    }

    /**
     * Initializes components
     * @param {class} classDef
     * @param {Element | NodeList | jQuery} els
     * @param {Object} options
     */
    static init(classDef, els, options) {
      let instances = null;
      if (els instanceof Element) {
        instances = new classDef(els, options);
      } else if (!!els && (els.jquery || els.cash || els instanceof NodeList)) {
        let instancesArr = [];
        for (let i = 0; i < els.length; i++) {
          instancesArr.push(new classDef(els[i], options));
        }
        instances = instancesArr;
      }
      return instances;
    }
  }

  /**
   * @class
   *
   */
  class FloatingActionButton extends Component {
    /**
     * Construct FloatingActionButton instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(FloatingActionButton, el, options);
      this.el.M_FloatingActionButton = this;

      /**
       * Options for the fab
       * @member FloatingActionButton#options
       * @prop {Boolean} [direction] - Direction fab menu opens
       * @prop {Boolean} [hoverEnabled=true] - Enable hover vs click
       * @prop {Boolean} [toolbarEnabled=false] - Enable toolbar transition
       */
      this.options = $.extend({}, FloatingActionButton.defaults, options);

      this.isOpen               = false;
      this.$anchor              = this.$el.children('a').first();
      this.$menu                = this.$el.children('ul').first();
      this.$floatingBtns        = this.$el.find('ul .btn-fab-floating');
      this.$floatingBtnsReverse = this.$el.find('ul .btn-fab-floating').reverse();
      this.offsetY = 0;
      this.offsetX = 0;

      this.$el.addClass(`direction-${this.options.direction}`);
      if (this.options.direction === 'top') {
        this.offsetY = 40;
      } else if (this.options.direction === 'right') {
        this.offsetX = -40;
      } else if (this.options.direction === 'bottom') {
        this.offsetY = -40;
      } else {
        this.offsetX = 40;
      }
      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_FloatingActionButton;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this.el.M_FloatingActionButton = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleFABClickBound   = this._handleFABClick.bind(this);
      this._handleOpenBound       = this.open.bind(this);
      this._handleCloseBound      = this.close.bind(this);

      if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
        this.el.addEventListener('mouseenter', this._handleOpenBound);
        this.el.addEventListener('mouseleave', this._handleCloseBound);
      } else {
        this.el.addEventListener('click', this._handleFABClickBound);
      }
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
        this.el.removeEventListener('mouseenter', this._handleOpenBound);
        this.el.removeEventListener('mouseleave', this._handleCloseBound);
      } else {
        this.el.removeEventListener('click', this._handleFABClickBound);
      }
    }

    /**
     * Handle FAB Click
     */
    _handleFABClick() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    /**
     * Handle Document Click
     * @param {Event} e
     */
    _handleDocumentClick(e) {
      if (!$(e.target).closest(this.$menu).length) {
        this.close();
      }
    }

    /**
     * Open FAB
     */
    open() {
      if (this.isOpen) {
        return;
      }

      if (this.options.toolbarEnabled) {
        this._animateInToolbar();
      } else {
        this._animateInFAB();
      }
      this.isOpen = true;
    }

    /**
     * Close FAB
     */
    close() {
      if (!this.isOpen) {
        return;
      }

      if (this.options.toolbarEnabled) {
        window.removeEventListener('scroll', this._handleCloseBound, true);
        document.body.removeEventListener('click', this._handleDocumentClickBound, true);
        this._animateOutToolbar();
      } else {
        this._animateOutFAB();
      }
      this.isOpen = false;
    }

    /**
     * Classic FAB Menu open
     */
    _animateInFAB() {
      this.$el.addClass('active');

      let time = 0;
      this.$floatingBtnsReverse.each((el) => {
        anim({
          targets: el,
          opacity: 1,
          scale: [0.4, 1],
          translateY: [this.offsetY, 0],
          translateX: [this.offsetX, 0],
          duration: 275,
          delay: time,
          easing: 'easeInOutQuad'
        });
        time += 40;
      });
    }

    /**
     * Classic FAB Menu close
     */
    _animateOutFAB() {
      this.$floatingBtnsReverse.each((el) => {
        anim.remove(el);
        anim({
          targets: el,
          opacity: 0,
          scale: 0.4,
          translateY: this.offsetY,
          translateX: this.offsetX,
          duration: 175,
          easing: 'easeOutQuad',
          complete: () => {
            this.$el.removeClass('active');
          }
        });
      });
    }

    /**
     * Toolbar transition Menu open
     */
    _animateInToolbar() {
      let scaleFactor;
      let windowWidth     = window.innerWidth;
      let windowHeight    = window.innerHeight;
      let btnRect         = this.el.getBoundingClientRect();
      let backdrop        = $('<div class="fam-btn-backdrop"></div>');
      let fabColor        = this.$anchor.css('background-color');

      this.$anchor.append(backdrop);

      this.offsetX    = btnRect.left - windowWidth / 2 + btnRect.width / 2;
      this.offsetY    = windowHeight - btnRect.bottom;
      scaleFactor     = windowWidth / backdrop[0].clientWidth;
      this.btnBottom  = btnRect.bottom;
      this.btnLeft    = btnRect.left;
      this.btnWidth   = btnRect.width;

      // Set initial state
      this.$el.addClass('active');
      this.$el.css({
        'text-align': 'center',
        width: '100%',
        bottom: 0,
        left: 0,
        transform: 'translateX(' + this.offsetX + 'px)',
        transition: 'none'
      });
      this.$anchor.css({
        transform: 'translateY(' + -this.offsetY + 'px)',
        transition: 'none'
      });
      backdrop.css({
        'background-color': fabColor
      });

      setTimeout(() => {
        this.$el.css({
          transform: '',
          transition:
            'transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s'
        });
        this.$anchor.css({
          overflow: 'visible',
          transform: '',
          transition: 'transform .2s'
        });

        setTimeout(() => {
          this.$el.css({
            overflow: 'hidden',
            'background-color': fabColor
          });
          backdrop.css({
            transform: 'scale(' + scaleFactor + ')',
            transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
          });
          this.$menu
            .children('li')
            .children('a')
            .css({
              opacity: 1
            });

          // Scroll to close
          this._handleDocumentClickBound = this._handleDocumentClick.bind(this);
          window.addEventListener('scroll', this._handleCloseBound, true);
          document.body.addEventListener('click', this._handleDocumentClickBound, true);
        }, 100);
      }, 0);
    }

    /**
     * Toolbar transition Menu close
     */
    _animateOutToolbar() {
      let windowWidth   = window.innerWidth;
      let windowHeight  = window.innerHeight;
      let backdrop      = this.$el.find('.fam-btn-backdrop');
      let fabColor      = this.$anchor.css('background-color');

      this.offsetX      = this.btnLeft - windowWidth / 2 + this.btnWidth / 2;
      this.offsetY      = windowHeight - this.btnBottom;

      // Hide backdrop
      this.$el.removeClass('active');
      this.$el.css({
        'background-color': 'transparent',
        transition: 'none'
      });
      this.$anchor.css({
        transition: 'none'
      });
      backdrop.css({
        transform: 'scale(0)',
        'background-color': fabColor
      });
      this.$menu
        .children('li')
        .children('a')
        .css({
          opacity: ''
        });

      setTimeout(() => {
        backdrop.remove();

        // Set initial state.
        this.$el.css({
          'text-align': '',
          width: '',
          bottom: '',
          left: '',
          overflow: '',
          'background-color': '',
          transform: 'translate3d(' + -this.offsetX + 'px,0,0)'
        });
        this.$anchor.css({
          overflow: '',
          transform: 'translate3d(0,' + this.offsetY + 'px,0)'
        });

        setTimeout(() => {
          this.$el.css({
            transform: 'translate3d(0,0,0)',
            transition: 'transform .2s'
          });
          this.$anchor.css({
            transform: 'translate3d(0,0,0)',
            transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
          });
        }, 20);
      }, 200);
    }
  }

  // jadams, 2020-10-10: moved to j1 name space
  //
  // M.FloatingActionButton = FloatingActionButton;
  j1.FloatingActionButton = FloatingActionButton;

  // jadams, 2020-10-10: check how to transform function to jQuery
  //
  // if (M.jQueryLoaded) {
  //   M.initializeJqueryWrapper(
  //     FloatingActionButton,
  //     'floatingActionButton',
  //     'M_FloatingActionButton'
  //   );
  // }

  //  jadams, 2020-10-10: TODO: check if anime could be a replacement
  //  for (huge) animate.css

})(cash, j1.anime);