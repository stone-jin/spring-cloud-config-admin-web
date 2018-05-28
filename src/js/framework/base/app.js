/**
 * @class mApp  Metronic App class
 */

var mApp = function () {

    /** @type {object} colors State colors **/
    var colors = {
        brand: '#508de8',
        metal: '#c4c5d6',
        light: '#ffffff',
        accent: '#00c5dc',
        primary: '#5867dd',
        success: '#34bfa3',
        info: '#36a3f7',
        warning: '#ffb822',
        danger: '#f4516c',
        focus: '#9816f4'
    }

    /**
     * Initializes bootstrap tooltip
     */
    var initTooltip = function (el) {
        var skin = el.data('skin') ? 'm-tooltip--skin-' + el.data('skin') : '';
        var width = el.data('width') == 'auto' ? 'm-tooltop--auto-width' : '';
        var triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';

        el.tooltip({
            trigger: triggerValue,
            template: '<div class="m-tooltip ' + skin + ' ' + width + ' tooltip" role="tooltip">\
                <div class="arrow"></div>\
                <div class="tooltip-inner"></div>\
            </div>'
        });
    }

    /**
     * Initializes bootstrap tooltips
     */
    var initTooltips = function () {
        // init bootstrap tooltips
        $('[data-toggle="m-tooltip"]').each(function () {
            initTooltip($(this));
        });
    }

    /**
     * Initializes bootstrap popover
     */
    var initPopover = function (el) {
        var skin = el.data('skin') ? 'm-popover--skin-' + el.data('skin') : '';
        var triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';

        el.popover({
            trigger: triggerValue,
            template: '\
            <div class="m-popover ' + skin + ' popover" role="tooltip">\
                <div class="arrow"></div>\
                <h3 class="popover-header"></h3>\
                <div class="popover-body"></div>\
            </div>'
        });
    }

    /**
     * Initializes bootstrap popovers
     */
    var initPopovers = function () {
        // init bootstrap popover
        $('[data-toggle="m-popover"]').each(function () {
            initPopover($(this));
        });
    }

    /**
     * Initializes bootstrap file input
     */
    var initFileInput = function () {
        // init bootstrap popover
        $('.custom-file-input').on('change', function () {
            var fileName = $(this).val();
            $(this).next('.custom-file-label').addClass("selected").html(fileName);
        });
    }

    /**
     * Initializes metronic portlet
     */
    var initPortlet = function (el, options) {
        // init portlet tools
        var el = $(el);
        var portlet = new mPortlet(el[0], options);
    }

    /**
     * Initializes metronic portlets
     */
    var initPortlets = function () {
        // init portlet tools
        $('[m-portlet="true"]').each(function () {
            var el = $(this);

            if (el.data('portlet-initialized') !== true) {
                initPortlet(el, {});
                el.data('portlet-initialized', true);
            }
        });
    }

    /**
     * Initializes scrollable contents
     */
    var initScrollables = function () {
        $('[data-scrollable="true"]').each(function () {
            var maxHeight;
            var height;
            var el = $(this);

            if (mUtil.isInResponsiveRange('tablet-and-mobile')) {
                if (el.data('mobile-max-height')) {
                    maxHeight = el.data('mobile-max-height');
                } else {
                    maxHeight = el.data('max-height');
                }

                if (el.data('mobile-height')) {
                    height = el.data('mobile-height');
                } else {
                    height = el.data('height');
                }
            } else {
                maxHeight = el.data('max-height');
                height = el.data('max-height');
            }

            if (maxHeight) {
                el.css('max-height', maxHeight);
            }
            if (height) {
                el.css('height', height);
            }

            mApp.initScroller(el, {});
        });
    }

    /**
     * Initializes bootstrap alerts
     */
    var initAlerts = function () {
        // init bootstrap popover
        $('body').on('click', '[data-close=alert]', function () {
            $(this).closest('.alert').hide();
        });
    }

    /**
     * Initializes Metronic custom tabs
     */
    var initCustomTabs = function () {
        // init bootstrap popover
        $('[data-tab-target]').each(function () {
            if ($(this).data('tabs-initialized') == true) {
                return;
            }

            $(this).click(function (e) {
                e.preventDefault();

                var tab = $(this);
                var tabs = tab.closest('[data-tabs="true"]');
                var contents = $(tabs.data('tabs-contents'));
                var content = $(tab.data('tab-target'));

                tabs.find('.m-tabs__item.m-tabs__item--active').removeClass('m-tabs__item--active');
                tab.addClass('m-tabs__item--active');

                contents.find('.m-tabs-content__item.m-tabs-content__item--active').removeClass('m-tabs-content__item--active');
                content.addClass('m-tabs-content__item--active');
            });

            $(this).data('tabs-initialized', true);
        });
    }

    var hideTouchWarning = function () {
        jQuery.event.special.touchstart = {
            setup: function (_, ns, handle) {
                if (typeof this === 'function')
                    if (ns.includes('noPreventDefault')) {
                        this.addEventListener('touchstart', handle, {
                            passive: false
                        });
                    } else {
                        this.addEventListener('touchstart', handle, {
                            passive: true
                        });
                    }
            },
        };
        jQuery.event.special.touchmove = {
            setup: function (_, ns, handle) {
                if (typeof this === 'function')
                    if (ns.includes('noPreventDefault')) {
                        this.addEventListener('touchmove', handle, {
                            passive: false
                        });
                    } else {
                        this.addEventListener('touchmove', handle, {
                            passive: true
                        });
                    }
            },
        };
        jQuery.event.special.wheel = {
            setup: function (_, ns, handle) {
                if (typeof this === 'function')
                    if (ns.includes('noPreventDefault')) {
                        this.addEventListener('wheel', handle, {
                            passive: false
                        });
                    } else {
                        this.addEventListener('wheel', handle, {
                            passive: true
                        });
                    }
            },
        };
    };

    return {
        /**
         * Main class initializer
         */
        init: function (options) {
            if (options && options.colors) {
                colors = options.colors;
            }
            mApp.initComponents();
        },

        /**
         * Initializes components
         */
        initComponents: function () {
            hideTouchWarning();
            initScrollables();
            initTooltips();
            initPopovers();
            initAlerts();
            initPortlets();
            initFileInput();
            initCustomTabs();
        },


        /**
         * Init custom tabs
         */
        initCustomTabs: function () {
            initCustomTabs();
        },

        /**
         * 
         * @param {object} el jQuery element object
         */
        // wrJangoer function to scroll(focus) to an element
        initTooltips: function () {
            initTooltips();
        },

        /**
         * 
         * @param {object} el jQuery element object
         */
        // wrJangoer function to scroll(focus) to an element
        initTooltip: function (el) {
            initTooltip(el);
        },

        /**
         * 
         * @param {object} el jQuery element object
         */
        // wrJangoer function to scroll(focus) to an element
        initPopovers: function () {
            initPopovers();
        },

        /**
         * 
         * @param {object} el jQuery element object
         */
        // wrJangoer function to scroll(focus) to an element
        initPopover: function (el) {
            initPopover(el);
        },

        /**
         * 
         * @param {object} el jQuery element object
         */
        // function to init portlet
        initPortlet: function (el, options) {
            initPortlet(el, options);
        },

        /**
         * 
         * @param {object} el jQuery element object
         */
        // function to init portlets
        initPortlets: function () {
            initPortlets();
        },

        /**
         * Scrolls to an element with animation
         * @param {object} el jQuery element object
         * @param {number} offset Offset to element scroll position
         */
        scrollTo: function (target, offset) {
            el = $(target);

            var pos = (el && el.length > 0) ? el.offset().top : 0;
            pos = pos + (offset ? offset : 0);

            jQuery('html,body').animate({
                scrollTop: pos
            }, 'slow');
        },

        /**
         * Scrolls until element is centered in the viewport 
         * @param {object} el jQuery element object
         */
        // wrJangoer function to scroll(focus) to an element
        scrollToViewport: function (el) {
            var elOffset = $(el).offset().top;
            var elHeight = el.height();
            var windowHeight = mUtil.getViewPort().height;
            var offset = elOffset - ((windowHeight / 2) - (elHeight / 2));

            jQuery('html,body').animate({
                scrollTop: offset
            }, 'slow');
        },

        /**
         * Scrolls to the top of the page
         */
        // function to scroll to the top
        scrollTop: function () {
            mApp.scrollTo();
        },

        /**
         * Initializes scrollable content using mCustomScrollbar plugin
         * @param {object} el jQuery element object
         * @param {object} options mCustomScrollbar plugin options(refer: http://manos.malihu.gr/jquery-custom-content-scroller/)
         */
        initScroller: function (el, options, doNotDestroy) {
            if (mUtil.isMobileDevice()) {
                el.css('overflow', 'auto');
            } else {
                if (doNotDestroy !== true) {
                    mApp.destroyScroller(el);
                }
                el.mCustomScrollbar({
                    scrollInertia: 0,
                    autoDraggerLength: true,
                    autoHideScrollbar: true,
                    autoExpandScrollbar: false,
                    alwaysShowScrollbar: 0,
                    axis: el.data('axis') ? el.data('axis') : 'y',
                    mouseWheel: {
                        scrollAmount: 120,
                        preventDefault: true
                    },
                    setHeight: (options.height ? options.height : ''),
                    theme: "minimal-dark"
                });
            }
        },

        /**
         * Destroys scrollable content's mCustomScrollbar plugin instance
         * @param {object} el jQuery element object
         */
        destroyScroller: function (el) {
            el.mCustomScrollbar("destroy");
            el.removeClass('mCS_destroyed');
        },

        /**
         * Shows bootstrap alert
         * @param {object} options
         * @returns {string} ID attribute of the created alert
         */
        alert: function (options) {
            options = $.extend(true, {
                container: "", // alerts parent container(by default placed after the page breadcrumbs)
                place: "append", // "append" or "prepend" in container 
                type: 'success', // alert's type
                message: "", // alert's message
                close: true, // make alert closable
                reset: true, // close all previouse alerts first
                focus: true, // auto scroll to the alert after shown
                closeInSeconds: 0, // auto close after defined seconds
                icon: "" // put icon before the message
            }, options);

            var id = mUtil.getUniqueID("App_alert");

            var html = '<div id="' + id + '" class="custom-alerts alert alert-' + options.type + ' fade in">' + (options.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' : '') + (options.icon !== "" ? '<i class="fa-lg fa fa-' + options.icon + '"></i>  ' : '') + options.message + '</div>';

            if (options.reset) {
                $('.custom-alerts').remove();
            }

            if (!options.container) {
                if ($('.page-fixed-main-content').size() === 1) {
                    $('.page-fixed-main-content').prepend(html);
                } else if (($('body').hasClass("page-container-bg-solid") || $('body').hasClass("page-content-white")) && $('.page-head').size() === 0) {
                    $('.page-title').after(html);
                } else {
                    if ($('.page-bar').size() > 0) {
                        $('.page-bar').after(html);
                    } else {
                        $('.page-breadcrumb, .breadcrumbs').after(html);
                    }
                }
            } else {
                if (options.place == "append") {
                    $(options.container).append(html);
                } else {
                    $(options.container).prepend(html);
                }
            }

            if (options.focus) {
                mApp.scrollTo($('#' + id));
            }

            if (options.closeInSeconds > 0) {
                setTimeout(function () {
                    $('#' + id).remove();
                }, options.closeInSeconds * 1000);
            }

            return id;
        },

        /**
         * Blocks element with loading indiciator using http://malsup.com/jquery/block/
         * @param {object} target jQuery element object
         * @param {object} options 
         */
        block: function (target, options) {
            var el = $(target);

            options = $.extend(true, {
                opacity: 0.03,
                overlayColor: '#000000',
                state: 'brand',
                type: 'loader',
                size: 'lg',
                centerX: true,
                centerY: true,
                message: '',
                shadow: true,
                width: 'auto'
            }, options);

            var skin;
            var state;
            var loading;

            if (options.type == 'spinner') {
                skin = options.skin ? 'm-spinner--skin-' + options.skin : '';
                state = options.state ? 'm-spinner--' + options.state : '';
                loading = '<div class="m-spinner ' + skin + ' ' + state + '"></div';
            } else {
                skin = options.skin ? 'm-loader--skin-' + options.skin : '';
                state = options.state ? 'm-loader--' + options.state : '';
                size = options.size ? 'm-loader--' + options.size : '';
                loading = '<div class="m-loader ' + skin + ' ' + state + ' ' + size + '"></div';
            }

            if (options.message && options.message.length > 0) {
                var classes = 'm-blockui ' + (options.shadow === false ? 'm-blockui-no-shadow' : '');

                html = '<div class="' + classes + '"><span>' + options.message + '</span><span>' + loading + '</span></div>';

                var el = document.createElement('div');
                mUtil.get('body').prepend(el);
                mUtil.addClass(el, classes);
                el.innerHTML = '<span>' + options.message + '</span><span>' + loading + '</span>';
                options.width = mUtil.actualWidth(el) + 10;
                mUtil.remove(el);

                if (target == 'body') {
                    html = '<div class="' + classes + '" style="margin-left:-' + (options.width / 2) + 'px;"><span>' + options.message + '</span><span>' + loading + '</span></div>';
                }
            } else {
                html = loading;
            }

            var params = {
                message: html,
                centerY: options.centerY,
                centerX: options.centerX,
                css: {
                    top: '30%',
                    left: '50%',
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none',
                    width: options.width
                },
                overlayCSS: {
                    backgroundColor: options.overlayColor,
                    opacity: options.opacity,
                    cursor: 'wait',
                    zIndex: '10'
                },
                onUnblock: function () {
                    if (el) {
                        mUtil.css(el, 'position', '');
                        mUtil.css(el, 'zoom', '');
                    }
                }
            };

            if (target == 'body') {
                params.css.top = '50%';
                $.blockUI(params);
            } else {
                var el = $(target);
                el.block(params);
            }
        },

        /**
         * Un-blocks the blocked element 
         * @param {object} target jQuery element object
         */
        unblock: function (target) {
            if (target && target != 'body') {
                $(target).unblock();
            } else {
                $.unblockUI();
            }
        },

        /**
         * Blocks the page body element with loading indicator
         * @param {object} options 
         */
        blockPage: function (options) {
            return mApp.block('body', options);
        },

        /**
         * Un-blocks the blocked page body element
         */
        unblockPage: function () {
            return mApp.unblock('body');
        },

        /**
         * Enable loader progress for button and other elements
         * @param {object} target jQuery element object
         * @param {object} options
         */
        progress: function (target, options) {
            var skin = (options && options.skin) ? options.skin : 'light';
            var alignment = (options && options.alignment) ? options.alignment : 'right';
            var size = (options && options.size) ? 'm-spinner--' + options.size : '';
            var classes = 'm-loader ' + 'm-loader--' + skin + ' m-loader--' + alignment + ' m-loader--' + size;

            mApp.unprogress(target);

            $(target).addClass(classes);
            $(target).data('progress-classes', classes);
        },

        /**
         * Disable loader progress for button and other elements
         * @param {object} target jQuery element object
         */
        unprogress: function (target) {
            $(target).removeClass($(target).data('progress-classes'));
        },

        /**
         * Gets state color's hex code by color name
         * @param {string} name Color name
         * @returns {string}  
         */
        getColor: function (name) {
            return colors[name];
        }
    };
}();

//== Initialize mApp class on document ready
$(document).ready(function () {
    mApp.init({});
});