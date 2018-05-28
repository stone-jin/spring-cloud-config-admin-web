var mQuickSidebar = function() {
    var topbarAside = $('#m_quick_sidebar');
    var topbarAsideTabs = $('#m_quick_sidebar_tabs');    
    var topbarAsideContent = topbarAside.find('.m-quick-sidebar__content');

    var initMessages = function() {
        var messenger = $('#m_quick_sidebar_tabs_messenger');  

        if (messenger.length === 0) {
            return;
        }

        var messengerMessages = messenger.find('.m-messenger__messages');

        var init = function() {
            var height = topbarAside.outerHeight(true) - 
                topbarAsideTabs.outerHeight(true) - 
                messenger.find('.m-messenger__form').outerHeight(true) - 120;
            
            // init messages scrollable content
            messengerMessages.css('height', height);
            mApp.initScroller(messengerMessages, {});
        }

        init();        
        
        // reinit on window resize
        mUtil.addResizeHandler(init);
    }

    var initSettings = function() { 
        var settings = $('#m_quick_sidebar_tabs_settings');

        if (settings.length === 0) {
            return;
        }

        // init dropdown tabbable content
        var init = function() {
            var height = mUtil.getViewPort().height - topbarAsideTabs.outerHeight(true) - 60;

            // init settings scrollable content
            settings.css('height', height);
            mApp.initScroller(settings, {});
        }

        init();

        // reinit on window resize
        mUtil.addResizeHandler(init);
    }

    var initLogs = function() {
        // init dropdown tabbable content
        var logs = $('#m_quick_sidebar_tabs_logs');

        if (logs.length === 0) {
            return;
        }

        var init = function() {
            var height = mUtil.getViewPort().height - topbarAsideTabs.outerHeight(true) - 60;

            // init settings scrollable content
            logs.css('height', height);
            mApp.initScroller(logs, {});
        }

        init();

        // reinit on window resize
        mUtil.addResizeHandler(init);
    }

    var initOffcanvasTabs = function() {
        initMessages();
        initSettings();
        initLogs();
    }

    var initOffcanvas = function() {
        var topbarAsideObj = new mOffcanvas('m_quick_sidebar', {
            overlay: true,  
            baseClass: 'm-quick-sidebar',
            closeBy: 'm_quick_sidebar_close',
            toggleBy: 'm_quick_sidebar_toggle'
        });   

        // run once on first time dropdown shown
        topbarAsideObj.one('afterShow', function() {
            mApp.block(topbarAside);

            setTimeout(function() {
                mApp.unblock(topbarAside);
                
                topbarAsideContent.removeClass('m--hide');

                initOffcanvasTabs();
            }, 1000);                         
        });
    }

    return {     
        init: function() {  
            if (topbarAside.length === 0) {
                return;
            }

            initOffcanvas(); 
        }
    };
}();

$(document).ready(function() {
    mQuickSidebar.init();
});