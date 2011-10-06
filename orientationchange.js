/*global window, $, document, clearTimeout, setTimeout, jQuery*/
(function ($) {
    "use strict";
    var resizes, styleDomNode, orientationCheckDom, appOrientation, timeoutId, supportsMediaSelectors, checkOrientation, getOrientation, stop;
    appOrientation = false;
    $.event.special.orientationchange = {
        setup: function () {
            var testDom = document.createElement('div');
            if (window.hasOwnProperty("orientation")) {
                return false;
            }

            styleDomNode = document.createElement("style");
            styleDomNode.setAttribute("type", "text/css");
            styleDomNode.setAttribute("media", "screen");
            document.getElementsByTagName("head")[0].appendChild(styleDomNode);

            styleDomNode.appendChild(document.createTextNode("@media screen and (orientation:portrait) { #orientation-check{ visibility: hidden; display: inline; }}@media screen and (orientation:landscape) {#orientation-check{ visibility: visible; display: inline;}}"));

            $("body").append('<div id="orientation-check"></div>');
            orientationCheckDom = $("#orientation-check");

            supportsMediaSelectors = (orientationCheckDom.css('display') === 'inline') ? true : false;
            resizes = [];
            appOrientation = getOrientation();
            checkOrientation();
            $(window).bind('resize', function (event) {
                resizes.push(getOrientation());
            });
        },

        add: function (handleObject) {
            var nativeHandler = handleObject.handler;
            handleObject.handler = function (event) {
                if (appOrientation !== false) {
                    window.orientation = appOrientation;
                }
                nativeHandler.apply(this, arguments);
            };
        },

        teardown: function () {
            if (appOrientation === false) {
                return false;
            }
            orientationCheckDom.remove();
            window.unbind('resize');
            stop();

        }
    };

    stop = function () {
        clearTimeout(timeoutId);
    };

    getOrientation = function () {
        var orientation;
        if (supportsMediaSelectors) {
            orientation = (orientationCheckDom.css('visibility') === 'visible') ? 90 : 0;
            return orientation;
        }
        orientation = (Math.floor($(window).width() / $(window).height()) > 1) ? 90 : 0;
        return orientation;
    };

    checkOrientation = function () {
        stop();
        if (resizes.length > 0) {
            if (appOrientation !== resizes[0]) {
                appOrientation = resizes[0];
                $(window).trigger('orientationchange');
            }
            resizes = [];
        }
        timeoutId = setTimeout(checkOrientation, 50);
    };
})(jQuery); 