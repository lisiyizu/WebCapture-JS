/*! Copyright (C) Neave Interactive, neave.com | glfx.js Copyright (C) Evan Wallace, github.com/evanw/glfx.js */
var WebcamToy = {};
if (!window.console || !console.log) {
    window.console = {
        log: function() {},
        error: function() {}
    }
}
var DealPly = DealPly ||
    function() {};
(function(d, e, j, h, f, c, b) {
    d.GoogleAnalyticsObject = f;
    d[f] = d[f] ||
        function() {
            (d[f].q = d[f].q || []).push(arguments)
        },
        d[f].l = 1 * new Date();
    c = e.createElement(j),
        b = e.getElementsByTagName(j)[0];
    c.async = 1;
    c.src = h;
    b.parentNode.insertBefore(c, b)
})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
ga("create", "UA-56095-9", "auto");
ga("send", "pageview");
(function(s) {
    var n = [],
        b = new Date().getTime(),
        o = false,
        c = false,
        p = false,
        H = $("body").hasClass("home"),
        w,
        J = false,
        Q = false,
        m,
        r,
        G = "",
        e = 0,
        i = "",
        M = $("#toy"),
        A = $("#toy-intro"),
        K = $("#app"),
        t = $("#button-start");

    function z(R) {
        if (window.$) {
            $("#toy-intro>p").hide();
            $("#prompt-" + R).show()
        }
    }
    s.showAccess = function(R) {
        if (!window.$ || R && !s.ua.chrome) {
            return
        }
        $("#content").css("top", 0);
        $("header,#head-sponsor,#toy-intro footer").hide();
        var S = $("#infobar-stripe");
        if (s.ua.ieEdge) {
            S.css("bottom", 0);
            K.css("bottom", 14);
            $("#home-sponsor").hide()
        } else {
            K.css("top", 14)
        }
        S.show();
        A.addClass("bg-access")
    };
    s.hideAccess = function(R) {
        if (!window.$ || R && !s.ua.chrome) {
            return
        }
        $("#content").css("top", 50);
        $("header,#head-sponsor").show();
        var S = $("#infobar-stripe");
        if (s.ua.ieEdge) {
            K.css("bottom", "");
            $("#home-sponsor").show()
        } else {
            K.css("top", "")
        }
        S.hide();
        A.removeClass("bg-access")
    };
    s.addScript = function(U) {
        var R = "script",
            T = document.createElement(R),
            S = $(R)[0];
        if (T && S) {
            T.src = U;
            T.async = true;
            S.parentNode.insertBefore(T, S)
        }
    };

    function y() {
        var S = s.log();
        try {
            if (S.length > 0) {
                var T = new Date().toUTCString() + ", V" + s.version;
                if (!H) {
                    T += " App"
                }
                localStorage.setItem("log", T + "\n" + S)
            }
        } catch (R) {}
    }
    s.log = function() {
        var T = new Date().getTime() - b,
            R = arguments[0],
            S;
        if (arguments.length === 0) {
            return n.join("\n")
        } else {
            if (arguments.length > 1 && arguments[0] === "Loader" && arguments[1] === "Init") {
                Q = true
            }
        }
        for (S = 1; S < arguments.length; S++) {
            if (arguments[S] || arguments[S] === 0) {
                R += " " + arguments[S]
            }
        }
        n.push(T + " " + R);
        if (n.length > 60) {
            if (n[40] === "...") {
                n.splice(41, 1)
            } else {
                n.splice(40, 1, "...")
            }
        }
        if (arguments[0] === "*ERROR*") {
            y()
        }
    };
    s.trackEvent = function(T, U, R, S) {
        try {
            ga("send", "event", T, U, R, S ? 1 : undefined, {
                nonInteraction: S
            })
        } catch (V) {}
    };

    function v(S, R) {
        if (S) {
            G += S + "<br>";
            if (A.is(":visible")) {
                $("#toy-intro footer").show();
                $("#footer-message").html(G)
            }
            if (s.Services && !s.Services.isHosted) {
                console.error("" + S, R)
            }
            if (G && /context|Effects not/.test(G)) {
                p = true;
                R = R || i
            }
            s.trackEvent("Error", "" + S, R, true);
            s.log("*ERROR*", "" + S, R)
        }
    }
    s.error = function(S, R) {
        s.hideAccess();
        v(S, R);
        if (A.is(":visible")) {
            A.removeClass("wait");
            $("#toy-intro>p,#button-start,#footer-check").hide();
            z("error");
            if (s.ua && !s.ua.mobile) {
                $("#button-start-flash").css("display", "inline-block");
                if (!p && !J) {
                    q(true)
                }
            }
        }
    };

    function x() {
        return $("#app-flash")[0]
    }

    function C(R, S) {
        s.Services.facebookAlbum(function(U, T, W) {
                var V = x();
                if (V) {
                    if (V.setFacebookAlbumURL) {
                        V.setFacebookAlbumURL(U)
                    }
                    if (V.setFacebookAlbumPrivacy) {
                        V.setFacebookAlbumPrivacy(T)
                    }
                    if (V.setFacebookAlbumID) {
                        V.setFacebookAlbumID(W)
                    }
                }
            },
            R, S)
    }

    function f(R) {
        var S = x();
        if (S && S.setFacebookToken) {
            S.setFacebookToken(R)
        }
    }

    function u(S) {
        var R = x();
        if (R && R.setFacebookUser) {
            R.setFacebookUser(S.fullName)
        }
    }

    function E(S, T, R) {
        var U = x();
        if (U && U.setTwitterUser) {
            U.setTwitterUser(S, T, R)
        }
    }

    function N(S, T, R) {
        var U = x();
        if (U && U.setTumblrUser) {
            U.setTumblrUser(S, T, R)
        }
    }

    function F(R, S) {
        var T = x();
        if (T && T.setVKUser) {
            T.setVKUser(R, S)
        }
    }

    function P(S) {
        var R = x();
        if (R && R.setVKAlbum) {
            R.setVKAlbum(S)
        }
    }

    function L() {
        if (window.$) {
            $("#home").remove()
        }
        delete s.Home;
        H = false
    }

    function h() {
        var T = $("#app-no-flash a,#home-no-flash a");
        if (s.ua.chrome) {
            T.attr("href", s.ua.chromeVersion > 11 ? "https://support.google.com/chrome/answer/108086?hl=" + (navigator.userLanguage || navigator.language || s.ua.locale) : "https://www.google.com/chrome/browser/desktop/")
        } else {
            if (s.ua.ie && !s.ua.ieOld && window.external && typeof window.external.msActiveXFilteringEnabled !== "undefined" && external.msActiveXFilteringEnabled()) {
                var R = s.ua.locale || "en",
                    V = R + "-" + R.toUpperCase();
                switch (R) {
                    case "en":
                        V = "en-US";
                        break;
                    case "cs":
                        V = "cs-CZ";
                        break;
                    case "da":
                        V = "da-DK";
                        break;
                    case "el":
                        V = "el-GR";
                        break;
                    case "es":
                        V = "es-XL";
                        break;
                    case "ja":
                        V = "ja-JP";
                        break;
                    case "nb":
                        V = "nb-NO";
                        break;
                    case "pt":
                        if (navigator.userLanguage === "pt-PT") {
                            V = "pt-PT"
                        } else {
                            V = "pt-BR"
                        }
                        break;
                    case "sr":
                        V = "sr-latn-RS";
                        break;
                    case "sv":
                        V = "sv-SE";
                        break;
                    case "zh":
                        V = "zh-CN";
                        break
                }
                T.attr("href", "http://windows.microsoft.com/" + V + "/internet-explorer/use-activex-filtering").text(T.eq(0).text().replace(/Adobe.Flash.Player/, "ActiveX"))
            }
        }
        if (H) {
            $("#home-main,#button-init").hide();
            $("#home-no-flash").removeClass("hidden")
        } else {
            $("#toy-intro>p,#toy-intro footer,#button-start").hide();
            $("#app-no-flash").show();
            M.addClass("bg-toy")
        }
        var S;
        try {
            if (!!s.swfobject && s.swfobject.getFlashPlayerVersion) {
                S = s.swfobject.getFlashPlayerVersion();
                S = S.major + "." + S.minor + "." + S.release
            }
        } catch (W) {}
        var U = "Flash not available";
        s.trackEvent("Error", U, S, true);
        s.log("*ERROR*", U, S)
    }

    function g(R) {
        if (!("localStorage" in window) || window.localStorage === null) {
            return -1
        }
        if (R && R > 0) {
            try {
                localStorage.setItem("saveCount", R);
                return R
            } catch (S) {}
        } else {
            try {
                return parseInt(localStorage.getItem("saveCount"), 10) || 1
            } catch (S) {}
        }
        return -1
    }

    function d() {
        if (!Q) {
            var S = x(),
                T = $(S);
            if (!S || S && !S.eitest) {
                var R;
                if (s.ua.chrome) {
                    if (T.attr("title") === "Adobe Flash Player") {
                        R = "chrome"
                    } else {
                        if ($(".flc-panel")[0]) {
                            R = "flashcontrol"
                        }
                    }
                } else {
                    if (s.ua.firefox) {
                        if ($("div[bgactive]")[0]) {
                            R = "flashblock"
                        }
                    }
                }
                if (R) {
                    s.error("Flash blocked", R)
                } else {
                    if (S) {
                        T.hide()
                    }
                    M.show().addClass("bg-toy");
                    $("#footer-message").show();
                    s.error("Flash not loaded")
                }
            }
        }
    }

    function I() {
        s.log("Init Flash");
        if (c) {
            if (!s.swfobject) {
                return
            }
            if (!J) {
                J = true;
                s.removeFooter();
                M.hide();
                if (!x()) {
                    K.show().append('<div id="app-flash"></div>').show()
                }
                if (!s.ua.ieOld) {
                    jQuery(document).on("visibilitychange webkitvisibilitychange mozvisibilitychange",
                        function() {
                            s.log("App", (document.hidden || document.webkitHidden || document.mozHidden) ? "hidden" : "visible");
                            y()
                        })
                }
            }
            s.Services.flashFacebookAlbum = C;
            s.Services.onFacebookAuth = f;
            s.Services.onFacebookUser = u;
            s.Services.onTwitterAuth = E;
            s.Services.onTumblrAuth = N;
            s.Services.onVKAuth = F;
            s.Services.onVKAlbum = P;
            s.Services.flashSaveCount = g;
            clearTimeout(r);
            r = setTimeout(d, 8000);
            s.swfobject.createSWF({
                    data: w,
                    width: "100%",
                    height: "100%"
                }, {
                    base: s.Services.assetsURL + "flash/",
                    bgcolor: "#000000",
                    allowfullscreen: "true",
                    allowscriptaccess: "always",
                    flashvars: "embed=1&infobar=" + (s.ua.chromeVersion > 26 ? 1 : 0) + "&fbver=" + s.Services.facebookVersion + "&shaderscale=" + (s.swfobject.hasFlashPlayerVersion("11.8.0") ? (s.ua.mac ? 0.5 : 0.4) : 1) + "&oauthurl=" + s.Services.oauthURL + "&lang=" + (navigator.userLanguage || navigator.language || "en").toLowerCase() + "&v=" + (M.attr("data-swf-main") || 1)
                },
                "app-flash")
        } else {
            h()
        }
        L()
    }

    function l(R) {
        c = !!s.swfobject && s.swfobject.hasFlashPlayerVersion(s.ua.mac ? "10.3.183" : "10.1.0");
        w = s.Services.assetsURL + "flash/loader-" + s.ua.locale + "." + (M.attr("data-swf-loader") || 1) + ".swf";
        if (R) {
            I();
            return
        }
        if (H) {
            if (c) {
                $.get(w)
            } else {
                h()
            }
        } else {
            I()
        }
    }

    function q(R) {
        if (s.ua.mobile || s.ua.tablet) {
            return
        }
        if (s.swfobjectInit) {
            s.swfobjectInit();
            delete s.swfobjectInit
        }
        if (!!s.swfobject) {
            l(R)
        }
    }

    function B() {
        s.log("Start HTML5");
        if (!s.Capabilities.webGL) {
            s.error("WebGL not enabled", i);
            return
        }
        t.hide();
        if (s.Camera.hasSecureAccess) {
            z("loading")
        } else {
            s.showAccess();
            z("access" + ((s.ua.firefox || s.ua.chrome) && !s.ua.mobile ? "-above" : ""))
        }
        s.Camera.getCamera(function(S, R, T) {
                if (T) {
                    s.error(T, R);
                    return
                }
                i = R || "";
                s.trackEvent("Capabilities", "Camera", i, true);
                if (G.length > 0) {
                    s.trackEvent("Error", "Camera error recovered", "", true)
                }
                s.log("Camera accessed", i);
                s.hideAccess();
                t.hide();
                z("loading");
                $("#footer-check").hide();
                $("#toy-intro footer").fadeOut(150,
                    function() {
                        A.addClass("wait");
                        if (!s.ua.mobile) {
                            s.Audio.loadAudio()
                        }
                        s.Effect.loadImages(function() {
                                s.log("Images loaded");
                                s.Effect.loadEffects(function() {
                                        s.log("Effects loaded");
                                        try {
                                            localStorage.removeItem("forceFlash")
                                        } catch (U) {}
                                        setTimeout(function() {
                                                s.UI.init(S)
                                            },
                                            150)
                                    },
                                    function(U) {
                                        s.error("Effects not loaded", U)
                                    })
                            },
                            function(U) {
                                s.error("Images not loaded", U)
                            })
                    })
            },
            function(R) {
                s.hideAccess();
                if (R) {
                    G = "";
                    v(R, i)
                }
                if (e < 2) {
                    e++;
                    z("request-error");
                    $("#footer-check").show();
                    t.show()
                } else {
                    G = "";
                    s.error("Camera not found", i)
                }
            })
    }

    function k() {
        try {
            localStorage.setItem("forceFlash", "1");
            s.trackEvent("Capabilities", "ForceFlash", "true", true);
            s.log("ForceFlash")
        } catch (R) {}
    }

    function O() {
        s.log("Init HTML5");
        if (s.ua.mobile) {
            $("header,#mobile-sponsor").remove();
            $("#content").css({
                top: 0,
                bottom: 0
            })
        }
        s.Effect.preloadImages();
        M.addClass("bg-toy");
        $("#prompt-request,#footer-message").show();
        $("#prompt-error").hide();
        t.removeClass("hidden").buttonClick(B);
        $("#prompt-request-error a,#button-start-flash").click(function(R) {
            J = false;
            if (R) {
                R.preventDefault()
            }
            if (p && s.Capabilities.localStorage) {
                k()
            }
            q(true)
        });
        K.fadeIn(150);
        L()
    }
    s.init = function() {
        if (o) {
            O()
        } else {
            q(true)
        }
        delete s.init
    };
    s.popup = function(Y, S, Z, W, T) {
        Z = Z || 600;
        W = W || 310;
        var aa = window.screenX || 0,
            V = aa ? $(window).width() : screen.availWidth,
            X = window.screenY || 0,
            R = X ? $(window).height() : screen.availHeight,
            U = aa + (V - Z) / 2,
            ab = X + (R - W) / 2;
        window.open(S || (Y && (Y.target.href || Y.currentTarget.href)), "webcamtoy" + (T || "window"), "resizable=yes,toolbar=no,scrollbars=yes,status=no,width=" + Z + ",height=" + W + ",left=" + U + ",top=" + ab);
        if (Y) {
            Y.preventDefault()
        }
    };

    function a() {
        $("#head-social .twitter").fadeIn(250);
        $("#head-social .twitter a").click(function(R) {
            s.popup(R, "https://twitter.com/intent/tweet?url=" + encodeURIComponent($(this).attr("data-url")) + "&text=" + encodeURIComponent($(this).attr("data-text")) + "&related=" + $(this).attr("data-related") + "&lang=" + $(this).attr("data-lang"));
            $(this).off("click").removeAttr("href").addClass("inactive")
        })
    }

    function D() {
        $("#head-social .vk-share").fadeIn(250);
        $("#head-social .vk-share a").click(function(R) {
            s.popup(R);
            $(this).off("click").removeAttr("href").addClass("inactive")
        })
    }

    function j(S) {
        var T = document.cookie.split("; ");
        for (var R = 0,
                U; U = T[R] && T[R].split("="); R++) {
            if (decodeURIComponent(U[0]) === S) {
                return decodeURIComponent(U[1] || "")
            }
        }
        return ""
    }
    jQuery(document).ready(function() {
        window.onerror = function(ak, aj, ai) {
            if (ak && !(/Script error|Access is denied\.|disconnected port|: a is null|freecorder|TopLine|NPObject|DealPly|dpQuery|postMessage|getElementsByTagName|NS_ERROR_OUT_OF_MEMORY|not of type 'Node'|Bind must be/.test(ak))) {
                s.trackEvent("Error", ak, aj && ai ? ("[" + aj + ":" + ai + "]") : "", true);
                s.log("*ERROR*", ak)
            }
            return false
        };
        if (location.pathname === "/contact/") {
            return
        }
        var X = M.attr("data-dev");
        var S = "https://webcamtoy.com";
        if ($("html").attr("manifest") && !H) {
            var W = j("webcamtoy").split("=")[1],
                ac = (navigator.userLanguage || navigator.language || "en"),
                Y = ac.substr(0, 2),
                T = top.location.search,
                ah = {
                    bg: "/bg/",
                    cs: "/cs/",
                    da: "/da/",
                    de: "/de/",
                    el: "/el/",
                    en: "/",
                    es: "/es/",
                    fi: "/fi/",
                    fr: "/fr/",
                    hr: "/hr/",
                    hu: "/hu/",
                    id: "/id/",
                    it: "/it/",
                    ja: "/ja/",
                    lt: "/lt/",
                    lv: "/lv/",
                    nb: "/nb/",
                    nl: "/nl/",
                    pl: "/pl/",
                    pt: "/pt/",
                    ro: "/ro/",
                    ru: "/ru/",
                    sk: "/sk/",
                    sr: "/sr/",
                    sv: "/sv/",
                    th: "/th/",
                    tr: "/tr/",
                    zh: "/zh/"
                };
            if (/ca/.test(Y)) {
                Y = "es"
            } else {
                if (/nn|no/.test(Y)) {
                    Y = "nb"
                } else {
                    if (/be|kk|ky|uk/.test(Y)) {
                        Y = "ru"
                    }
                }
            }
            if (!(/utm_medium=speeddial/.test(T))) {
                T = ""
            }
            var U = S + ah[W] + "app/" + T,
                af = S + ah[Y] + "app/" + T,
                ad = S + "/app/" + T,
                aa = window.applicationCache;
            if (aa) {
                if (location.href.indexOf(S) !== 0) {
                    if (Y && Y !== s.ua.locale && ah[Y]) {
                        top.location.href = af
                    } else {
                        top.location.href = ad
                    }
                }
                $(aa).on("updateready",
                    function() {
                        if (aa.status === aa.UPDATEREADY) {
                            try {
                                aa.swapCache()
                            } catch (ai) {}
                            if (location.href.indexOf(S) === 0) {
                                location.reload()
                            } else {
                                if (Y && Y !== s.ua.locale && ah[Y]) {
                                    top.location.href = af
                                } else {
                                    top.location.href = ad
                                }
                            }
                        }
                    }).on("cached error noupdate",
                    function() {
                        if (W) {
                            if (W !== s.ua.locale && ah[W]) {
                                top.location.href = U
                            }
                        } else {
                            if (Y && Y !== s.ua.locale && ah[Y]) {
                                top.location.href = af
                            }
                        }
                    })
            } else {
                if (W) {
                    if (W !== s.ua.locale && ah[W]) {
                        top.location.href = U;
                        return
                    }
                } else {
                    if (Y && Y !== s.ua.locale && ah[Y]) {
                        top.location.href = af;
                        return
                    }
                }
            }
        }
        if (window.location !== window.top.location || !s.ua.mobile && !X && !s.Services.isHosted) {
            top.location.href = S + "/";
            return
        }
        document.title = s.Services.appName;
        var ae = s.Capabilities.webGL,
            R = s.Capabilities.checkWebGL(),
            ag = s.Camera && s.Camera.hasGetUserMedia,
            V = location.search && location.search.substr(location.search.indexOf("app=") + 4, 5),
            ab = false;
        if (s.ua.mac) {
            $("body").addClass("mac");
            if ((/Chrom(e|ium)\/(2[2-3])/).test(navigator.userAgent)) {
                $("body").addClass("font-fix")
            }
        }
        if (H) {
            if (s.Home) {
                s.Home.init()
            }
        } else {
            delete s.Home
        }
        if (s.Capabilities.localStorage) {
            try {
                ab = localStorage.getItem("forceFlash") === "1" && !s.ua.mobile
            } catch (Z) {
                ab = false
            }
        }
        if (s.ua.mobile || s.ua.iPad) {
            addEventListener("load",
                function() {
                    window.scrollTo(0, 1)
                },
                false)
        } else {
            s.trackEvent("Capabilities", "Version", s.version, true)
        }
        s.trackEvent("Capabilities", "GetUserMedia", ag.toString(), true);
        s.trackEvent("Capabilities", "WebGL", ae.toString(), true);
        if (ae) {
            o = (R.hasFloat || s.ua.mobile) && R.canCompile && R.canLink
        }
        o = !s.ua.ie && (V === "html5" || o && ag && !ab && V !== "flash" && !M.hasClass("disabled"));
        s.trackEvent("Capabilities", "HTML5", o.toString(), true);
        s.trackEvent("Capabilities", "ForceFlash", ab.toString(), true);
        jQuery(window).on("beforeunload", y);
        if (!s.ua.mobile && H) {
            s.Services.onFacebookUser = s.Home.setFacebookUser
        }
        if (s.ua.mobile || s.ua.tablet) {
            if (o) {
                s.UI.loadImages()
            } else {
                $("#button-init").hide()
            }
        } else {
            if (o) {
                s.UI.loadImages();
                if (!H) {
                    O()
                }
            } else {
                q(false)
            }
        }
        if (!s.ua.mobile && !s.ua.tablet) {
            a();
            D();
            if (s.Services) {
                s.Services.init()
            }
            setTimeout(function() {
                    var ai = $("#head-sponsor ins").length < 2;
                    if (ai && !s.ua.ieOld) {
                        $("#head-sponsor").prepend('<a href="https://neave.com/" target="_top" style="position:absolute;width:220px;margin-left:-110px;">&hearts;&nbsp; Neave Interactive</a>')
                    }
                    s.trackEvent("Capabilities", "AdBlock", ai.toString(), true)
                },
                2000)
        } else {
            if (s.ua.mobile) {
                setTimeout(function() {
                        var ai = $("#mobile-sponsor ins").length < 2;
                        if (ai) {
                            $("#mobile-sponsor").html('<a href="https://neave.com/" target="_top"><img src="/assets/images/neave-ad-mobile.jpg" width="300" height="250" alt="Neave Interactive"></a>')
                        }
                        s.trackEvent("Capabilities", "AdBlock", ai.toString(), true)
                    },
                    2000)
            }
        }
    })
})(WebcamToy);
WebcamToy.swfobjectInit = function() {
    WebcamToy.swfobject = (function() {
        var r = "undefined",
            l = "object",
            a = "Shockwave Flash",
            x = "ShockwaveFlash.ShockwaveFlash",
            o = "application/x-shockwave-flash",
            d = window,
            w = document,
            g = navigator,
            b = false,
            e = [],
            f = [],
            t = function() {
                var B = typeof w.getElementById !== r && typeof w.getElementsByTagName !== r && typeof w.createElement !== r,
                    I = g.userAgent.toLowerCase(),
                    z = g.platform.toLowerCase(),
                    F = z ? /win/.test(z) : /win/.test(I),
                    D = z ? /mac/.test(z) : /mac/.test(I),
                    G = /webkit/.test(I) ? parseFloat(I.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                    y = g.appName === "Microsoft Internet Explorer",
                    H = [0, 0, 0],
                    C = null;
                if (typeof g.plugins !== r && typeof g.plugins[a] === l) {
                    C = g.plugins[a].description;
                    if (C && (typeof g.mimeTypes !== r && g.mimeTypes[o] && g.mimeTypes[o].enabledPlugin)) {
                        b = true;
                        y = false;
                        C = C.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                        H[0] = k(C.replace(/^(.*)\..*$/, "$1"));
                        H[1] = k(C.replace(/^.*\.(.*)\s.*$/, "$1"));
                        H[2] = /[a-zA-Z]/.test(C) ? k(C.replace(/^.*[a-zA-Z]+(.*)$/, "$1")) : 0
                    }
                } else {
                    if (typeof d.ActiveXObject !== r) {
                        try {
                            var E = new ActiveXObject(x);
                            if (E) {
                                C = E.GetVariable("$version");
                                if (C) {
                                    y = true;
                                    C = C.split(" ")[1].split(",");
                                    H = [k(C[0]), k(C[1]), k(C[2])]
                                }
                            }
                        } catch (A) {}
                    }
                }
                return {
                    w3: B,
                    pv: H,
                    wk: G,
                    ie: y,
                    win: F,
                    mac: D
                }
            }();

        function v(A) {
            var y = null,
                z = u(A);
            if (z && z.nodeName.toUpperCase() === "OBJECT") {
                if (typeof z.SetVariable !== r) {
                    y = z
                } else {
                    y = z.getElementsByTagName(l)[0] || z
                }
            }
            return y
        }

        function i(y, z) {
            var A = q("div");
            A.innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='" + y + "'>" + z + "</object>";
            return A.firstChild
        }

        function n(G, F, z) {
            var y, C = u(z);
            z = m(z);
            if (t.wk && t.wk < 312) {
                return y
            }
            if (C) {
                var B = (t.ie) ? q("div") : q(l),
                    E,
                    A,
                    D;
                if (typeof G.id === r) {
                    G.id = z
                }
                for (D in F) {
                    if (F.hasOwnProperty(D) && D.toLowerCase() !== "movie") {
                        c(B, D, F[D])
                    }
                }
                if (t.ie) {
                    B = i(G.data, B.innerHTML)
                }
                for (E in G) {
                    if (G.hasOwnProperty(E)) {
                        A = E.toLowerCase();
                        if (A === "styleclass") {
                            B.setAttribute("class", G[E])
                        } else {
                            if (A !== "classid" && A !== "data") {
                                B.setAttribute(E, G[E])
                            }
                        }
                    }
                }
                if (t.ie) {
                    f[f.length] = G.id
                } else {
                    B.setAttribute("type", o);
                    B.setAttribute("data", G.data)
                }
                C.parentNode.replaceChild(B, C);
                y = B
            }
            return y
        }

        function c(A, y, z) {
            var B = q("param");
            B.setAttribute("name", y);
            B.setAttribute("value", z);
            A.appendChild(B)
        }

        function s(A) {
            var z = u(A);
            if (z && z.nodeName.toUpperCase() === "OBJECT") {
                if (t.ie) {
                    z.style.display = "none";
                    (function y() {
                        if (z.readyState == 4) {
                            for (var B in z) {
                                if (typeof z[B] === "function") {
                                    z[B] = null
                                }
                            }
                            z.parentNode.removeChild(z)
                        } else {
                            setTimeout(y, 10)
                        }
                    }())
                } else {
                    z.parentNode.removeChild(z)
                }
            }
        }

        function p(y) {
            return (y && y.nodeType && y.nodeType === 1)
        }

        function m(y) {
            return (p(y)) ? y.id : y
        }

        function u(A) {
            if (p(A)) {
                return A
            }
            var y = null;
            try {
                y = w.getElementById(A)
            } catch (z) {}
            return y
        }

        function q(y) {
            return w.createElement(y)
        }

        function k(y) {
            return parseInt(y, 10)
        }

        function j(A) {
            A += "";
            var z = t.pv,
                y = A.split(".");
            y[0] = k(y[0]);
            y[1] = k(y[1]) || 0;
            y[2] = k(y[2]) || 0;
            return (z[0] > y[0] || (z[0] == y[0] && z[1] > y[1]) || (z[0] == y[0] && z[1] == y[1] && z[2] >= y[2])) ? true : false
        }
        var h = function() {
            if (t.ie) {
                window.attachEvent("onunload",
                    function() {
                        var A = f.length;
                        for (var B = 0; B < A; B++) {
                            s(f[B])
                        }
                        for (var z in t) {
                            t[z] = null
                        }
                        t = null;
                        for (var y in WebcamToy.swfobject) {
                            WebcamToy.swfobject[y] = null
                        }
                        WebcamToy.swfobject = null
                    })
            }
        }();
        return {
            getFlashPlayerVersion: function() {
                return {
                    major: t.pv[0],
                    minor: t.pv[1],
                    release: t.pv[2]
                }
            },
            hasFlashPlayerVersion: j,
            createSWF: function(A, z, y) {
                if (t.w3) {
                    return n(A, z, y)
                } else {
                    return undefined
                }
            }
        }
    }())
};
WebcamToy.Capabilities = (function(b) {
    b.version = $("#toy").attr("data-version") || "0";
    b.ua = (function() {
        var j = navigator.userAgent.toLowerCase() || "",
            i = $("body").hasClass("mobile"),
            k = /iPad/.test(navigator.platform),
            h = k || $("body").hasClass("tablet"),
            m = / opr\//.test(j),
            e = /edge\/[0-9]+\./.test(j),
            l = j.match(/chrom(e|ium)\/([0-9]+)\./),
            g = {
                ie: /msie /.test(j) || /trident\//.test(j),
                ieOld: /msie [2-8]\./.test(j),
                ieEdge: e,
                chrome: !e && !m && /chrom(e|ium)/.test(j),
                chromeVersion: !e && !m && l && l.length >= 2 ? parseInt(l[2], 10) : 0,
                firefox: /firefox/.test(j),
                mobile: i,
                tablet: h,
                iPad: k,
                mac: !i && !h && /mac os/.test(j),
                locale: ($("#toy").attr("data-locale") || $('meta[property="og:locale"]').attr("content") || "en").substr(0, 2)
            };
        return g
    })();
    var f, a = {
        touch: !!("ontouchstart" in window) && (b.ua.mobile || b.ua.tablet)
    };
    try {
        a.localStorage = "localStorage" in window && window.localStorage !== null
    } catch (d) {
        a.localStorage = false
    }
    a.webGL = (function() {
        var h;
        try {
            var g = document.createElement("canvas");
            h = !!(window.WebGLRenderingContext && (g.getContext("webgl") || g.getContext("experimental-webgl")));
            g = undefined
        } catch (i) {
            h = false
        }
        return h
    })();

    function c(g, i) {
        var h = f.createShader(g);
        f.shaderSource(h, i);
        f.compileShader(h);
        var j = f.getError();
        if (j !== f.NO_ERROR || f.isContextLost() || !f.getShaderParameter(h, f.COMPILE_STATUS)) {
            return null
        }
        return h
    }
    a.checkWebGL = function() {
        var j = {
            hasFloat: false,
            canCompile: false,
            canLink: false
        };
        if (a.webGL) {
            try {
                var i = document.createElement("canvas");
                f = i.getContext("webgl") || i.getContext("experimental-webgl");
                if (f) {
                    j.hasFloat = !!(f.getExtension("OES_texture_float") || f.getExtension("OES_texture_float_linear"));
                    var h = f.createProgram(),
                        l = c(f.VERTEX_SHADER, "attribute vec3 p;void main(){gl_Position=vec4(p,1.0);}"),
                        g = c(f.FRAGMENT_SHADER, "precision mediump float;uniform sampler2D t;uniform float a;void main(){vec4 c=vec4(1.0);vec2 p=gl_FragCoord.xy;if(a==1.0){p+=a;};for(float i=0.0;i<9.0;i++){float h=atan(p.y,p.x)+i,r=length(p),b=mod(floor(h/r),2.0);c+=texture2D(t,vec2(b));}gl_FragColor=c;}");
                    f.attachShader(h, l);
                    f.attachShader(h, g);
                    f.linkProgram(h);
                    j.canLink = !!f.getProgramParameter(h, f.LINK_STATUS);
                    j.canCompile = !!(l && g);
                    f.deleteShader(l);
                    f.deleteShader(g);
                    f.deleteProgram(h)
                }
                f = undefined;
                i = undefined
            } catch (k) {
                j.canLink = j.canCompile = false
            }
        }
        return j
    };
    return a
}(WebcamToy));
WebcamToy.Services = (function(p) {
    var C = {
            appName: "Webcam Toy",
            scheme: "https",
            assetsURL: "/assets/",
            facebookVersion: $("#toy").attr("data-fb") || "2.8",
            onFacebookAuth: null,
            onFacebookUser: null,
            onTwitterAuth: null,
            onTumblrAuth: null,
            onVKAuth: null,
            onVKAlbum: null
        },
        h = {
            facebook: {
                firstName: "",
                fullName: "",
                id: "",
                url: "",
                token: "",
                album: {
                    id: "",
                    url: "",
                    privacy: ""
                }
            },
            twitter: {
                user: "",
                token: "",
                secret: "",
                forceLogin: false
            },
            tumblr: {
                user: "",
                token: "",
                secret: "",
                forceLogin: false
            },
            vk: {
                user: "",
                token: "",
                aid: "",
                forceLogin: false
            }
        },
        H,
        l,
        L = false,
        g = "webcamtoy.com",
        x = "201969246526783",
        a = C.scheme + "://" + g + "/" + (p.ua.locale === "en" ? "" : p.ua.locale + "/") + "fb-channel.html",
        y = 0,
        A = 8,
        K = 6000,
        f,
        o = 12000,
        c;
    var j = C.scheme + "://oauth." + g,
        i = j + "/twitter/",
        b = j + "/tumblr/",
        v = j + "/vk/";
    C.oauthURL = j + "/";
    C.isHosted = location.hostname === g;
    try {
        h.facebook.album.id = localStorage.getItem("facebookAlbumID") || "";
        h.twitter.user = localStorage.getItem("twitterUser") || "";
        h.twitter.token = localStorage.getItem("twitterToken") || "";
        h.twitter.secret = localStorage.getItem("twitterSecret") || "";
        h.tumblr.user = localStorage.getItem("tumblrUser") || "";
        h.tumblr.token = localStorage.getItem("tumblrToken") || "";
        h.tumblr.secret = localStorage.getItem("tumblrSecret") || "";
        h.vk.aid = localStorage.getItem("vkAlbumID") || "";
        h.vk.user = localStorage.getItem("vkUser") || ""
    } catch (J) {}
    h.vk.token = "";

    function D(P) {
        if (!P || !window.Blob || !window.atob) {
            return null
        }
        var U, O, R, S, Q;
        try {
            U = window.atob(P.split(",")[1]);
            O = P.split(",")[0].split(":")[1].split(";")[0];
            R = new ArrayBuffer(U.length);
            S = new Uint8Array(R)
        } catch (T) {
            return null
        }
        for (Q = U.length; Q--;) {
            S[Q] = U.charCodeAt(Q)
        }
        try {
            if (!!window.DataView) {
                return new Blob([new DataView(R)], {
                    type: O
                })
            }
        } catch (T) {}
        try {
            return new Blob([S], {
                type: O
            })
        } catch (T) {}
        return null
    }

    function m(P, O) {
        var R;
        try {
            R = $.parseJSON(P.responseText)
        } catch (Q) {}
        if (O) {
            O(R)
        }
    }

    function B() {
        if (H) {
            H.abort()
        }
        clearTimeout(f)
    }
    C.cancelPost = function() {
        B();
        L = false
    };
    C.init = function() {
        $(window).on("message",
            function(P) {
                P = P.originalEvent;
                if (P.origin === j) {
                    var Q;
                    try {
                        Q = $.parseJSON(P.data)
                    } catch (O) {}
                    switch (Q.service) {
                        case "twitter":
                            G(Q.user, Q.token, Q.secret);
                            break;
                        case "tumblr":
                            u(Q.user, Q.token, Q.secret);
                            break;
                        case "vk":
                            n(Q.user, Q.token);
                            break
                    }
                }
            });
        z();
        k();
        N();
        r()
    };

    function s() {
        h.facebook.album.id = h.facebook.album.url = h.facebook.album.privacy = "";
        try {
            localStorage.setItem("facebookAlbumID", "")
        } catch (O) {}
    }

    function d() {
        h.facebook.token = h.facebook.firstName = h.facebook.fullName = h.facebook.id = h.facebook.url = "";
        s()
    }

    function t(e) {
        var O = e.authResponse ? e.authResponse.accessToken : "";
        if (e && e.status === "connected" && O) {
            h.facebook.token = O;
            C.facebookUser();
            if (C.onFacebookAuth) {
                C.onFacebookAuth(h.facebook.token)
            }
        } else {
            d()
        }
    }

    function M() {
        if (!!window.FB) {
            return
        }
        var O = navigator.userLanguage || navigator.language || "en-US",
            e = p.ua.locale || "en",
            P = e + "_" + e.toUpperCase();
        switch (e) {
            case "en":
                if (O === "en-GB") {
                    P = "en_GB"
                } else {
                    P = "en_US"
                }
                break;
            case "cs":
                P = "cs_CZ";
                break;
            case "da":
                P = "da_DK";
                break;
            case "el":
                P = "el_GR";
                break;
            case "es":
                P = "es_LA";
                switch (O) {
                    case "ca-ES":
                        P = "ca_ES";
                        break;
                    case "es-ES":
                        P = "es_ES";
                        break
                }
                break;
            case "ja":
                P = "ja_JP";
                break;
            case "nb":
                P = "nb_NO";
                break;
            case "pt":
                if (O === "pt-PT") {
                    P = "pt_PT"
                } else {
                    P = "pt_BR"
                }
                break;
            case "sr":
                P = "sr_RS";
                break;
            case "sv":
                P = "sv_SE";
                break;
            case "zh":
                P = "zh_CN";
                break
        }
        p.addScript("//connect.facebook.net/" + P + "/sdk.js")
    }

    function z() {
        var Q = location.hash.substr(1);
        if (Q) {
            var e = Q.split("&"),
                R = {},
                O,
                P;
            for (O = 0; O < e.length; O++) {
                P = e[O].split("=");
                R[P[0]] = P[1]
            }
            if (R.access_token && R.access_token.length > 50) {
                h.facebook.token = R.access_token;
                location.hash = ""
            }
        }
        window.fbAsyncInit = function() {
            if (!!window.FB) {
                FB.Event.subscribe("auth.statusChange", t);
                FB.Event.subscribe("auth.logout", t);
                FB.init({
                    appId: x,
                    channelUrl: a,
                    status: true,
                    cookie: true,
                    oauth: true,
                    version: "v" + C.facebookVersion
                });
                if (FB.XFBML) {
                    FB.XFBML.parse($("#head-social")[0])
                }
            }
        };
        M()
    }
    C.facebookUser = function() {
        if (h.facebook.firstName) {
            if (C.onFacebookUser) {
                C.onFacebookUser(h.facebook)
            }
        } else {
            if (!!window.FB) {
                FB.api("/me",
                    function(e) {
                        if (e) {
                            h.facebook.id = e.id;
                            h.facebook.url = C.scheme + "://www.facebook.com/" + e.id;
                            var O = e.name || "";
                            h.facebook.fullName = O;
                            h.facebook.firstName = O.split(" ")[0];
                            if (C.onFacebookUser) {
                                C.onFacebookUser(h.facebook)
                            }
                        }
                    })
            }
        }
    };
    C.facebookAuth = function() {
        B();
        if (!h.facebook.token) {
            if (!window.FB) {
                M()
            } else {
                FB.login(function() {}, {
                    scope: "user_photos,publish_actions"
                })
            }
        } else {
            if (C.onFacebookAuth) {
                FB.getLoginStatus(function(e) {
                    if (e && e.status === "connected") {
                        C.onFacebookAuth(h.facebook.token || "")
                    } else {
                        d()
                    }
                })
            }
        }
    };
    C.facebookLogout = function() {
        B();
        if (!!window.FB) {
            FB.getLoginStatus(function(e) {
                if (e && e.status === "connected") {
                    FB.logout();
                    FB.getLoginStatus()
                }
            })
        }
        d()
    };
    C.facebookStatus = function() {
        if (!window.FB) {
            M()
        } else {
            FB.getLoginStatus(t)
        }
    };

    function I(e) {
        clearTimeout(c);
        if (e) {
            e("", "", h.facebook.album.id = "me")
        }
    }
    C.facebookAlbum = function(Q, e, P, O) {
        if (!!window.FB && e) {
            clearTimeout(c);
            c = setTimeout(function() {
                    I(Q)
                },
                o);
            FB.api("/me/albums",
                function(T) {
                    if (T && T.data) {
                        var S = h.facebook.album.id;
                        for (var W = 0; W < T.data.length; W++) {
                            var R = T.data[W].name.toLowerCase();
                            if (S && T.data[W].id === S || !S && (R === e.toLowerCase() || /webcam toy/.test(R))) {
                                if (T.data[W].can_upload) {
                                    var V = h.facebook.album.url = T.data[W].link || (C.scheme + "://www.facebook.com/" + S),
                                        U = h.facebook.album.privacy = T.data[W].privacy,
                                        Y = h.facebook.album.id = T.data[W].id;
                                    try {
                                        localStorage.setItem("facebookAlbumID", Y)
                                    } catch (X) {}
                                    if (Q) {
                                        clearTimeout(c);
                                        Q(V, U, Y)
                                    }
                                    return
                                }
                            }
                        }
                        if (O) {
                            I(Q)
                        } else {
                            h.facebook.album.id = "";
                            FB.api("/me/albums", "post", {
                                    name: e,
                                    message: ""
                                },
                                function(Z) {
                                    if (Z && Z.id) {
                                        s();
                                        var ab = h.facebook.album.id = Z.id;
                                        try {
                                            localStorage.setItem("facebookAlbumID", ab)
                                        } catch (aa) {}
                                        C.facebookAlbum(Q, e, "", true)
                                    } else {
                                        I(Q)
                                    }
                                })
                        }
                    } else {
                        I(Q)
                    }
                })
        }
    };
    C.facebookPost = function(P, R, O) {
        if (!h.facebook.token) {
            O("OAuth token not found");
            return
        }
        if (!h.facebook.album.id) {
            clearTimeout(c);
            h.facebook.album.id = "me"
        }
        var e;
        if (P && P.image) {
            e = D(P.image.src)
        }
        if (!e) {
            O("Image data not found");
            return
        }
        L = true;
        var Q = new FormData();
        Q.append("access_token", h.facebook.token);
        Q.append("message", "");
        Q.append("source", e);
        if (l) {
            l.abort()
        }
        l = $.ajax({
            url: "https://graph.facebook.com/v" + C.facebookVersion + "/" + h.facebook.album.id + "/photos",
            data: Q,
            type: "POST",
            cache: false,
            contentType: false,
            processData: false,
            timeout: 30000,
            statusCode: {
                400: function(S) {
                    m(S, O)
                },
                401: function(S) {
                    m(S, O)
                },
                403: function(S) {
                    m(S, O)
                },
                500: function(S) {
                    m(S, O)
                }
            },
            complete: function(S, U) {
                if (L) {
                    var V;
                    U = S && S.statusText || U;
                    try {
                        V = $.parseJSON(S.responseText)
                    } catch (T) {
                        O(U)
                    }
                    if (V && V.success === 0) {
                        O(V)
                    } else {
                        if (V && V.id) {
                            R()
                        } else {
                            O(U)
                        }
                    }
                }
            }
        })
    };

    function G(P, Q, O) {
        B();
        if (!Q) {
            P = Q = O = ""
        }
        h.twitter.user = P;
        h.twitter.token = Q;
        h.twitter.secret = O;
        try {
            localStorage.setItem("twitterUser", P);
            localStorage.setItem("twitterToken", Q);
            localStorage.setItem("twitterSecret", O)
        } catch (R) {}
        if (C.onTwitterAuth) {
            C.onTwitterAuth(P, Q, O)
        }
    }

    function k() {
        if (h.twitter.token && C.onTwitterAuth) {
            C.onTwitterAuth(h.twitter.user, h.twitter.token, h.twitter.secret);
            return true
        }
        return false
    }

    function F() {
        if (k()) {
            B();
            return
        }
        $.ajax({
            url: i + "verify.php?format=json",
            dataType: "jsonp",
            crossDomain: true,
            cache: false,
            timeout: 15000,
            error: function() {},
            success: function(e) {
                if (e.success === 1) {
                    G(e.user, e.token, e.secret)
                } else {
                    if (e.success === 0 && /blacklist/i.test(e.message)) {
                        B()
                    }
                }
            }
        });
        if (y < A) {
            y++;
            f = setTimeout(F, K)
        }
    }
    C.twitterAuth = function() {
        B();
        if (!h.twitter.token) {
            var e = p.ua.locale;
            if (e === "zh-CN") {
                e = "zh"
            }
            p.popup(null, i + "?force_login=" + (h.twitter.forceLogin ? "1&destroy=1" : 0) + (e ? "&locale=" + e : ""), 700, 520, "twitter");
            y = 0;
            f = setTimeout(F, K)
        } else {
            if (C.onTwitterAuth) {
                C.onTwitterAuth(h.twitter.user, h.twitter.token, h.twitter.secret)
            }
        }
    };
    C.twitterLogout = function() {
        B();
        G("", "", "");
        h.twitter.forceLogin = true
    };
    C.twitterPost = function(R, Q, O) {
        if (!h.twitter.token) {
            O("OAuth token not found");
            return
        }
        var e;
        if (R && R.image) {
            e = D(R.image.src)
        }
        if (!e) {
            O("Image data not found");
            return
        }
        L = true;
        var P = new FormData();
        P.append("format", "json");
        P.append("user", h.twitter.user);
        P.append("token", h.twitter.token);
        P.append("secret", h.twitter.secret);
        P.append("message", R.message);
        P.append("file", e);
        if (l) {
            l.abort()
        }
        l = $.ajax({
            url: i + "tweet.php",
            data: P,
            type: "POST",
            cache: false,
            crossDomain: true,
            contentType: false,
            processData: false,
            timeout: 20000,
            error: function() {},
            complete: function(S, U) {
                if (L) {
                    U = S && S.statusText || U;
                    var V;
                    try {
                        V = $.parseJSON(S.responseText)
                    } catch (T) {
                        O(U)
                    }
                    if (V) {
                        if (V.success === 0) {
                            O(V.message || U)
                        } else {
                            Q(V.id ? ("https://pic.twitter.com/" + V.id) : "")
                        }
                    } else {
                        O(U)
                    }
                }
            }
        })
    };

    function u(P, Q, O) {
        B();
        if (!Q) {
            P = Q = O = ""
        }
        h.tumblr.user = P;
        h.tumblr.token = Q;
        h.tumblr.secret = O;
        try {
            localStorage.setItem("tumblrUser", P);
            localStorage.setItem("tumblrToken", Q);
            localStorage.setItem("tumblrSecret", O)
        } catch (R) {}
        if (C.onTumblrAuth) {
            C.onTumblrAuth(P, Q, O)
        }
    }

    function N() {
        if (h.tumblr.token && C.onTumblrAuth) {
            C.onTumblrAuth(h.tumblr.user, h.tumblr.token, h.tumblr.secret);
            return true
        }
        return false
    }

    function w() {
        if (N()) {
            B();
            return
        }
        $.ajax({
            url: b + "verify.php?format=json",
            dataType: "jsonp",
            crossDomain: true,
            cache: false,
            timeout: 15000,
            error: function() {},
            success: function(e) {
                if (e.success === 1) {
                    u(e.user, e.token, e.secret)
                }
            }
        });
        if (y < A) {
            y++;
            f = setTimeout(w, K)
        }
    }
    C.tumblrAuth = function() {
        B();
        if (!h.tumblr.token) {
            p.popup(null, b + "?force_login=" + (h.tumblr.forceLogin ? "1&destroy=1" : 0), 700, 520, "tumblr");
            y = 0;
            f = setTimeout(w, K)
        } else {
            if (C.onTumblrAuth) {
                C.onTumblrAuth(h.tumblr.user, h.tumblr.token, h.tumblr.secret)
            }
        }
    };
    C.tumblrLogout = function() {
        B();
        u("", "", "");
        h.tumblr.forceLogin = true
    };
    C.tumblrPost = function(Q, S, P) {
        if (!h.tumblr.token) {
            P("OAuth token not found");
            return
        }
        var e;
        if (Q && Q.image) {
            e = D(Q.image.src)
        }
        if (!e) {
            P("Image data not found");
            return
        }
        L = true;
        var O = C.scheme + "://" + g + "/" + (p.ua.locale === "en" ? "" : p.ua.locale + "/"),
            R = new FormData();
        R.append("format", "json");
        R.append("user", h.tumblr.user);
        R.append("token", h.tumblr.token);
        R.append("secret", h.tumblr.secret);
        R.append("effect", Q.effect);
        R.append("link", O);
        R.append("message", Q.message.replace(C.appName, '<a href="' + O + '">' + C.appName + "</a>"));
        R.append("file", e);
        if (l) {
            l.abort()
        }
        l = $.ajax({
            url: b + "upload.php",
            data: R,
            type: "POST",
            cache: false,
            crossDomain: true,
            contentType: false,
            processData: false,
            timeout: 20000,
            error: function() {},
            complete: function(T, V) {
                if (L) {
                    V = T && T.statusText || V;
                    var W;
                    try {
                        W = $.parseJSON(T.responseText)
                    } catch (U) {
                        P(V)
                    }
                    if (W) {
                        if (W.success === 0) {
                            P(W.message || V)
                        } else {
                            S(W.id ? ("http://" + h.tumblr.user + ".tumblr.com/post/" + W.id + "/") : "")
                        }
                    } else {
                        P(V)
                    }
                }
            }
        })
    };

    function n(O, P) {
        B();
        if (!P || !O) {
            O = P = ""
        }
        h.vk.user = String(O);
        h.vk.token = P;
        try {
            localStorage.setItem("vkUser", O)
        } catch (Q) {}
        if (C.onVKAuth) {
            C.onVKAuth(O, P)
        }
    }

    function E(O) {
        if (!O) {
            O = ""
        }
        O = String(O);
        h.vk.aid = O;
        try {
            localStorage.setItem("vkAlbumID", O)
        } catch (P) {}
        if (C.onVKAlbum) {
            C.onVKAlbum(O)
        }
    }

    function r() {
        if (h.vk.aid && C.onVKAlbum) {
            C.onVKAlbum(h.vk.aid)
        }
        if (h.vk.token && C.onVKAuth) {
            C.onVKAuth(h.vk.user, h.vk.token);
            return true
        }
        return false
    }

    function q() {
        if (r()) {
            B();
            return
        }
        $.ajax({
            url: v + "verify.php?format=json",
            dataType: "jsonp",
            crossDomain: true,
            cache: false,
            timeout: 15000,
            error: function() {},
            success: function(e) {
                if (e.success === 1) {
                    n(e.user, e.token)
                }
            }
        });
        if (y < A) {
            y++;
            f = setTimeout(q, K)
        }
    }
    C.vkAuth = function() {
        B();
        if (!h.vk.token) {
            p.popup(null, v + "?force_login=" + (h.vk.forceLogin ? "1&destroy=1" : 0), 620, 350, "vk");
            y = 0;
            f = setTimeout(q, K)
        } else {
            if (C.onVKAuth) {
                C.onVKAuth(h.vk.user, h.vk.token)
            }
        }
    };
    C.vkLogout = function() {
        B();
        n("", "");
        E("");
        h.vk.forceLogin = true
    };
    C.vkPost = function(P, R, O) {
        if (!h.vk.token) {
            O("OAuth token not found");
            return
        }
        var e;
        if (P && P.image) {
            e = D(P.image.src)
        }
        if (!e) {
            O("Image data not found");
            return
        }
        L = true;
        var Q = new FormData();
        Q.append("format", "json");
        Q.append("aid", h.vk.aid);
        Q.append("user", h.vk.user);
        Q.append("token", h.vk.token);
        Q.append("message", P.message.replace(C.appName, g));
        Q.append("file", e);
        if (l) {
            l.abort()
        }
        l = $.ajax({
            url: v + "upload.php",
            data: Q,
            type: "POST",
            cache: false,
            crossDomain: true,
            contentType: false,
            processData: false,
            timeout: 30000,
            error: function() {},
            complete: function(S, U) {
                if (L) {
                    U = S && S.statusText || U;
                    var V;
                    try {
                        V = $.parseJSON(S.responseText)
                    } catch (T) {
                        O(U)
                    }
                    if (V) {
                        if (V.success === 0) {
                            E(V.aid);
                            O(V.message || U)
                        } else {
                            if (V.aid && h.vk.aid !== String(V.aid)) {
                                E(V.aid)
                            }
                            R(V.id ? ("https://vk.com/" + V.id) : "")
                        }
                    } else {
                        O(U)
                    }
                }
            }
        })
    };
    return C
}(WebcamToy));
WebcamToy.Texture = (function() {
    function b(g, e, c) {
        var f = document.createElement("canvas");
        f.width = e || g.width;
        f.height = c || g.height;
        var d = f.getContext("2d");
        if (d) {
            d.clearRect(0, 0, e, c)
        }
        return d
    }

    function a(k, h, c, j, g, d, f) {
        this.gl = k;
        this.id = k.createTexture();
        this.format = j;
        this.type = g;
        f = f || (WebcamToy.ua.mac ? k.LINEAR : k.NEAREST);
        k.bindTexture(k.TEXTURE_2D, this.id);
        k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MAG_FILTER, f);
        k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MIN_FILTER, f);
        k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_S, k.CLAMP_TO_EDGE);
        k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_T, k.CLAMP_TO_EDGE);
        if (d) {
            this.loadContentsOf(d)
        } else {
            if (h && c) {
                this.width = h;
                this.height = c;
                try {
                    k.texImage2D(k.TEXTURE_2D, 0, j, h, c, 0, j, g, null)
                } catch (i) {}
            }
        }
    }
    a.prototype.loadContentsOf = function(c) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
        try {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.format, this.format, this.type, c)
        } catch (d) {}
        return this
    };
    a.prototype.use = function(c) {
        this.gl.activeTexture(this.gl.TEXTURE0 + (c || 0));
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.id)
    };
    a.prototype.drawTo = function(d) {
        var c = this.gl;
        c.bindFramebuffer(c.FRAMEBUFFER, c.framebuffer = c.framebuffer || c.createFramebuffer());
        c.framebufferTexture2D(c.FRAMEBUFFER, c.COLOR_ATTACHMENT0, c.TEXTURE_2D, this.id, 0);
        if (c.checkFramebufferStatus(c.FRAMEBUFFER) === c.FRAMEBUFFER_COMPLETE) {
            d()
        }
        c.bindFramebuffer(c.FRAMEBUFFER, null);
        return this
    };
    a.prototype.toImage = function(r, o, e, p) {
        p = p || this.height;
        e = r ? p : e || this.width;
        var m = 2,
            k = this.height,
            n = r ? k : this.width,
            j,
            s = n * k * 4,
            g = new Uint8Array(s),
            l = b(this, e, p),
            q = b(this, n, k),
            d = q.createImageData(n, k),
            c,
            f;
        if (d && d.data) {
            c = d.data
        } else {
            return
        }
        this.gl.readPixels(r ? (this.width - k) / 2 : 0, 0, n, k, this.gl.RGBA, this.gl.UNSIGNED_BYTE, g);
        for (j = s; j--;) {
            c[j] = g[j]
        }
        q.putImageData(d, 0, 0);
        l.save();
        l.translate(0, p);
        l.scale(e / n, -p / k);
        l.drawImage(q.canvas, m / -2 * n / k, m / -2, n + m * n / k, k + m);
        l.restore();
        f = l.canvas.toDataURL("image/jpeg", o);
        q = null;
        l = null;
        return f
    };
    a.prototype.swapWith = function(c) {
        var d = c.id;
        c.id = this.id;
        this.id = d;
        d = c.width;
        c.width = this.width;
        this.width = d;
        d = c.height;
        c.height = this.height;
        this.height = d;
        d = c.format;
        c.format = this.format;
        this.format = d;
        return this
    };
    a.prototype.destroy = function() {
        try {
            if (this.gl && this.id) {
                this.gl.deleteTexture(this.id)
            }
        } catch (c) {}
        this.id = null;
        this.gl = null
    };
    return a
}());
WebcamToy.Shader = (function(c) {
    var g = "attribute vec2 vertex;attribute vec2 _texCoord;varying vec2 texCoord;void main(){texCoord=_texCoord;gl_Position=vec4(vertex*2.0-1.0,0.0,1.0);}",
        b = "uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,texCoord);}";

    function a(h) {
        return Object.prototype.toString.call(h) === "[object Array]"
    }

    function d(h) {
        return Object.prototype.toString.call(h) === "[object Number]"
    }

    function f(l, i, k) {
        var j = l.createShader(i),
            h = "Compilation error";
        if (!j) {
            throw h
        } else {
            l.shaderSource(j, k)
        }
        l.compileShader(j);
        if (!l.isContextLost() && !l.getShaderParameter(j, l.COMPILE_STATUS)) {
            throw h
        }
        return j
    }

    function e(k, l, i) {
        this.gl = k;
        this.vertexAttribute = null;
        this.texCoordAttribute = null;
        this.program = k.createProgram();
        l = l || g;
        i = i || b;
        i = "precision mediump float;" + i;
        k.attachShader(this.program, f(k, k.VERTEX_SHADER, l));
        k.attachShader(this.program, f(k, k.FRAGMENT_SHADER, i));
        k.linkProgram(this.program);
        if (!k.isContextLost() && !k.getProgramParameter(this.program, k.LINK_STATUS)) {
            var j;
            try {
                j = k.getProgramInfoLog(this.program)
            } catch (h) {}
            throw "Link error" + (j ? ": " + j : "")
        }
    }
    e.getMainShader = function(h) {
        return new e(h, null, "uniform sampler2D texture;varying vec2 texCoord;uniform float mult;uniform float offset;uniform float mirror;void main(){vec2 p=texCoord/1.005+0.0025;if(mirror==1.0){p.x=1.0-p.x;}gl_FragColor=vec4(clamp(texture2D(texture,p).rgb*mult+offset,0.0,1.0),1.0);}")
    };
    e.getBlackShader = function(h) {
        return new e(h, null, "void main(){gl_FragColor=vec4(0.0,0.0,0.0,1.0);}")
    };
    e.getWhiteShader = function(h) {
        return new e(h, null, "void main(){gl_FragColor=vec4(1.0);}")
    };
    e.prototype.uniforms = function(h) {
        if (h) {
            var l = this.gl;
            l.useProgram(this.program);
            for (var j in h) {
                if (h.hasOwnProperty(j)) {
                    var i = l.getUniformLocation(this.program, j);
                    if (!i) {
                        continue
                    }
                    var k = h[j];
                    if (a(k)) {
                        switch (k.length) {
                            case 1:
                                l.uniform1fv(i, new Float32Array(k));
                                break;
                            case 2:
                                l.uniform2fv(i, new Float32Array(k));
                                break;
                            case 3:
                                l.uniform3fv(i, new Float32Array(k));
                                break;
                            case 4:
                                l.uniform4fv(i, new Float32Array(k));
                                break;
                            case 9:
                                l.uniformMatrix3fv(i, false, new Float32Array(k));
                                break;
                            case 16:
                                l.uniformMatrix4fv(i, false, new Float32Array(k));
                                break;
                            default:
                                throw 'Cannot load uniform "' + j + '" of length ' + k.length
                        }
                    } else {
                        if (d(k)) {
                            l.uniform1f(i, k)
                        } else {
                            throw 'Attempted to set uniform "' + j + '" to invalid value ' + (k || "undefined").toString()
                        }
                    }
                }
            }
        }
        return this
    };
    e.prototype.textures = function(h) {
        this.gl.useProgram(this.program);
        for (var i in h) {
            if (h.hasOwnProperty(i)) {
                this.gl.uniform1i(this.gl.getUniformLocation(this.program, i), h[i])
            }
        }
        return this
    };
    e.prototype.drawRect = function(k, j, h, i) {
        var l = this.gl;
        if (!l) {
            return
        }
        k = k || 0;
        j = j || 0;
        h = h || 1;
        i = i || 1;
        if (!l.vertexBuffer) {
            l.vertexBuffer = l.createBuffer()
        }
        l.bindBuffer(l.ARRAY_BUFFER, l.vertexBuffer);
        l.bufferData(l.ARRAY_BUFFER, new Float32Array([j, k, j, h, i, k, i, h]), l.STATIC_DRAW);
        if (!l.texCoordBuffer) {
            l.texCoordBuffer = l.createBuffer();
            l.bindBuffer(l.ARRAY_BUFFER, l.texCoordBuffer);
            l.bufferData(l.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), l.STATIC_DRAW)
        }
        if (!this.vertexAttribute) {
            this.vertexAttribute = l.getAttribLocation(this.program, "vertex");
            l.enableVertexAttribArray(this.vertexAttribute)
        }
        if (!this.texCoordAttribute) {
            this.texCoordAttribute = l.getAttribLocation(this.program, "_texCoord");
            l.enableVertexAttribArray(this.texCoordAttribute)
        }
        l.useProgram(this.program);
        l.bindBuffer(l.ARRAY_BUFFER, l.vertexBuffer);
        l.vertexAttribPointer(this.vertexAttribute, 2, l.FLOAT, false, 0, 0);
        l.bindBuffer(l.ARRAY_BUFFER, l.texCoordBuffer);
        l.vertexAttribPointer(this.texCoordAttribute, 2, l.FLOAT, false, 0, 0);
        l.drawArrays(l.TRIANGLE_STRIP, 0, 4)
    };
    e.prototype.destroy = function() {
        try {
            if (this.gl && this.program) {
                this.gl.deleteProgram(this.program)
            }
        } catch (h) {}
        this.program = null;
        this.gl = null
    };
    return e
}(WebcamToy));
WebcamToy.Effect = (function(k) {
    var f = {},
        d = ["mirrorleft", "mirrorright", "mirrortop", "mirrorbottom", "mirrorquad", "upsidedown", "switch", "kaleidoscope", "fragment", "quadcam", "splitscreen", "filmstrip", "ghost", "colorghost", "trail", "shuffle", "tunnel", "spiral", "twist", "dent", "pinch", "bulge", "fisheye", "wedge", "ripple", "stretch", "softfocus", "hazydays", "vintage", "rose", "retro", "cocoa", "xpro", "envy", "zinc", "citrus", "berry", "mint", "smoke", "halo", "bloom", "glaze", "watercolor", "silk", "oldmovie", "cocktail", "spycam", "hotpink", "bokeh", "flare", "danger", "rainbow", "trueblue", "mono", "lomo", "comicbook", "monoquad", "lomoquad", "comicstrip", "magazine", "blackwhite", "cartoon", "outline", "sketch", "crosshatch", "underwater", "fire", "snow", "disco", "sparkle", "glitch", "xray", "lsd", "alien", "nightvision", "thermal", "spectrum", "neon", "popart", "popbooth"],
        J = 0,
        b = 3,
        x = 800,
        o = 600,
        y = {
            texture2: 1
        },
        w = [2, 2, 2, 0, 0, 0, -2, -2, -2],
        m = [1, 2, 1, 2, -12, 2, 1, 2, 1],
        a = {
            add: function(K) {
                this.initShader("add");
                this.uniforms.add = {
                    ratio: K || 0.5
                }
            },
            alien: function() {
                this.initShader("alien");
                this.fps = 20
            },
            blur: function(K) {
                if (!this.initShader("blur")) {
                    this.initShader("blursimple")
                }
                this.uniforms.blur1 = {
                    delta: [(K || 32) / this.width, 0]
                };
                this.uniforms.blur2 = {
                    delta: [0, (K || 32) / this.height]
                }
            },
            bloom: function() {
                this.uniforms = {
                    center: this.center,
                    radius: (this.square ? this.height : this.width) / 4,
                    width: this.height
                }
            },
            bokeh: function() {
                var K = this.width / 6,
                    N = this.square ? this.width / 3 : (this.width + this.height) / 6;
                this.initShader("bokeh");
                this.initShader("radialblur");
                this.fps = 20;
                this.extraTexture = this.getTexture(e.bokeh);
                this.startTime = Date.now() - Math.random() * 100 - 50;
                this.uniforms = {
                    bokehs: [],
                    bokeh: {
                        center: this.center,
                        radius: this.height * 1.2,
                        init: 1,
                        texSize: this.size,
                        time: 0
                    },
                    radialblur1: {
                        texSize: this.size,
                        center: this.center,
                        blur: Math.floor(this.width / 32),
                        radius: K,
                        width: N,
                        delta: [1 / this.width, 0]
                    },
                    radialblur2: {
                        texSize: this.size,
                        center: this.center,
                        blur: Math.floor(this.width / 32),
                        radius: K,
                        width: N,
                        delta: [0, 1 / this.height]
                    }
                };
                for (var M = 32; M--;) {
                    var L = 128 - M * M / 24;
                    this.uniforms.bokehs.push(new c(Math.random() * x - L / 2, Math.random() * o - L / 2, L))
                }
            },
            bulge: function() {
                this.uniforms = {
                    mode: 1,
                    strength: 0.9,
                    center: this.center,
                    radius: this.height / 4
                }
            },
            cartoon: function() {
                this.initShader("cartoon");
                this.initShader("cartoonink");
                this.fps = 20;
                this.quality = 0.7;
                this.uniforms = {
                    cartoonink: {
                        size: [2.5 / o * this.height / this.width, 2.5 / o]
                    },
                    cartoon: {
                        rect: this.getRect(0.01)
                    }
                }
            },
            cocktail: function() {
                this.initShader("cocktail");
                this.initShader("cocktailborder");
                this.fps = 20;
                this.extraTexture = this.getTexture(this.square ? e.cocktailsq : e.cocktail);
                this.uniforms = {
                    rect: this.getRect(0.006),
                    fade: x / 3
                }
            },
            cocoa: function() {
                this.initShader("cocoa");
                this.fps = 20;
                this.uniforms = {
                    center: this.center,
                    radius: (this.square ? this.height : this.width) / 6,
                    width: this.height * 0.58,
                    rect: this.getRect(0.022),
                    fade: 60
                }
            },
            colorghost: function() {
                this.initShader("colorghost");
                this.initFrameTextures(this.fps = B ? 8 : 20, this.width, this.height);
                this.uniforms = {
                    frame: 0,
                    tex: {
                        frame1: 1,
                        frame2: 2
                    }
                }
            },
            comicbook: function() {
                this.quality = 0.55;
                this.uniforms = {
                    quad: 0,
                    center: this.center,
                    size: Math.min(0.8, 400 / this.height),
                    rect: this.getRect(0.02)
                }
            },
            comicstrip: function() {
                this.initShader("quadcam");
                this.initShader("comicbook");
                this.initShader("comicstripborder");
                this.quality = 0.55;
                this.isQuad = true;
                this.uniforms.comicstrip = {
                    center: this.center,
                    size: Math.min(0.8, 500 / this.height),
                    rect: this.getRect(this.square ? 0.028 : 0)
                };
                this.uniforms.comicstripborder = {
                    rect: this.getRect(0.018),
                    border: [0.009 * this.height / this.width, 0.009],
                    wide: (this.width - this.height / 2) / this.width
                };
                this.uniforms.comicstripwide = {
                    wide: this.square || B ? 0 : 1,
                    square: this.square || B ? 1 : 0
                };
                this.uniforms.comicstripsquare = {
                    wide: this.square || B ? 0 : 1,
                    square: 1
                }
            },
            danger: function() {
                this.uniforms = {
                    center: this.center,
                    radius: this.width * 0.75,
                    rect: this.getRect(0.05),
                    fade: 32
                }
            },
            dent: function() {
                this.initShader("bulge");
                this.uniforms = {
                    mode: 0,
                    strength: -1,
                    center: this.center,
                    radius: this.height / 4
                }
            },
            disco: function() {
                this.initShader("discored");
                this.initShader("discogreen");
                this.initShader("discoblue");
                this.startTime = Date.now() - 2000;
                this.uniforms = {
                    discolights: {},
                    discored: [new C(3.3, 2.9, 0.3, 0.3), new C(1.9, 2, 0.4, 0.4), new C(0.8, 0.7, 0.4, 0.5), new C(2.3, 0.1, 0.6, 0.3), new C(0.8, 1.7, 0.5, 0.4), new C(0.3, 1, 0.4, 0.4), new C(1.4, 1.7, 0.4, 0.5), new C(1.3, 2.1, 0.6, 0.3), new C(1.8, 1.7, 0.5, 0.4)],
                    discogreen: [new C(1.2, 1.9, 0.3, 0.3), new C(0.7, 2.7, 0.4, 0.4), new C(1.4, 0.6, 0.4, 0.5), new C(2.6, 0.4, 0.6, 0.3), new C(0.7, 1.4, 0.5, 0.4), new C(0.7, 1.7, 0.4, 0.4), new C(0.8, 0.5, 0.4, 0.5), new C(1.4, 0.9, 0.6, 0.3), new C(0.7, 1.3, 0.5, 0.4)],
                    discoblue: [new C(3.7, 0.3, 0.3, 0.3), new C(1.9, 1.3, 0.4, 0.4), new C(0.8, 0.9, 0.4, 0.5), new C(1.2, 1.7, 0.6, 0.3), new C(0.3, 0.6, 0.5, 0.4), new C(0.3, 0.3, 0.4, 0.4), new C(1.4, 0.8, 0.4, 0.5), new C(0.2, 0.6, 0.6, 0.3), new C(1.3, 0.5, 0.5, 0.4)]
                }
            },
            envy: function() {
                var K = this.square ? this.width / 8 : (this.width + this.height) / 10,
                    L = this.square ? this.width / 1.5 : (this.width + this.height) / 3;
                this.initShader("envy");
                this.initShader("radialblur");
                this.initShader("envyborder");
                this.fps = 20;
                this.uniforms = {
                    radialblur1: {
                        texSize: this.size,
                        center: this.center,
                        blur: Math.floor(this.width / 32),
                        radius: K,
                        width: L,
                        delta: [1 / this.width, 0]
                    },
                    radialblur2: {
                        texSize: this.size,
                        center: this.center,
                        blur: Math.floor(this.width / 32),
                        radius: K,
                        width: L,
                        delta: [0, 1 / this.height]
                    },
                    envyborder: {
                        rect: this.getRect(0.022),
                        fade: x / 3
                    }
                }
            },
            fire: function() {
                var K = this.square ? (this.width - this.height) / this.width / 2 : 0;
                this.initShader("fire");
                this.initShader("firevignette");
                this.initFrameTextures(6, this.width, this.height);
                this.fps = 20;
                this.quality = 0.7;
                this.uniforms = {
                    frame: 0,
                    center: this.center,
                    radius: this.height * 0.4,
                    width: (this.square ? this.height : this.width) / 3,
                    left: K,
                    right: 1 - K,
                    tex: {
                        frame1: 1,
                        frame2: 2,
                        frame3: 3,
                        frame4: 4,
                        frame5: 5,
                        frame6: 6
                    }
                }
            },
            filmstrip: function() {
                var K = B ? 1.5 : 3,
                    L = this.square ? (this.width - this.height) / this.width / 2 : 0;
                this.initShader("filmstrip");
                this.initFrameTextures(1, Math.round(this.width * K), Math.round(this.height * K));
                this.fps = 20;
                this.quality = 0.7;
                this.uniforms = {
                    frame: 0,
                    init: true,
                    left: L,
                    right: 1 - L
                }
            },
            fisheye: function() {
                this.initShader("bulge");
                this.uniforms = {
                    mode: 1,
                    strength: 1,
                    center: this.center,
                    radius: this.height * 0.75
                }
            },
            ghost: function() {
                this.initShader("ghost");
                this.initFrameTextures(this.fps = B ? 8 : 20, this.width, this.height);
                this.uniforms.ghost = {
                    frame: 0
                }
            },
            glaze: function() {
                this.initShader("glaze");
                this.initShader("overlay");
                this.fps = 20;
                this.uniforms = {
                    glaze: {
                        size: [this.width / 2, this.width / 2],
                        time: 0
                    },
                    overlay: {
                        rect: this.getRect(0.025),
                        mult: 1.25,
                        offset: 0.7
                    }
                }
            },
            glitch: function() {
                this.uniforms = {
                    pixelSize: Math.max(10, this.height / o * 20),
                    center: this.center,
                    width: this.width / 2
                }
            },
            halo: function() {
                this.initShader("halo");
                this.initShader("softfocus");
                this.fps = 20
            },
            hazydays: function() {
                this.initShader("hazydays");
                this.extraTexture = this.getTexture(this.square ? e.hazydayssq : e.hazydays)
            },
            hotpink: function() {
                this.initShader("hotpink");
                this.extraTexture = this.getTexture(e.hotpink)
            },
            kaleidoscope: function() {
                if (this.mainTexture.type === this.gl.FLOAT) {
                    this.initShader("kaleidoscope1");
                    this.initShader("kaleidoscope2")
                } else {
                    this.initShader("kaleidoscope")
                }
                this.uniforms = {
                    center: this.center,
                    offset: [this.width / 2, this.height * 0.1]
                }
            },
            lomo: function() {
                this.uniforms = {
                    quad: 0,
                    center: this.center,
                    radius: this.width * 0.8,
                    exposure: 2.25
                }
            },
            lomoquad: function() {
                this.initShader("lomo");
                this.isQuad = true;
                this.uniforms.lomoquad = {
                    center: this.center,
                    radius: this.width * 0.85,
                    exposure: 2.25,
                    rect: this.getRect(0.028),
                    fade: 80
                }
            },
            lsd: function() {
                this.initShader("lsd");
                this.sourceTexture.loadContentsOf(this.source);
                this.tempTexture.drawTo(this.mainDrawRect);
                this.fps = 15
            },
            magazine: function() {
                var K = Math.PI / 3;
                this.quality = 0.6;
                this.uniforms = {
                    center: this.center,
                    size: Math.min(0.8, 400 / this.height),
                    cosa: Math.cos(K),
                    sina: Math.sin(K),
                    rect: this.getRect(0.028),
                    fade: 48 * 24
                }
            },
            mix: function(K) {
                this.initShader("mix");
                this.uniforms.mix = {
                    strength: K || 8
                }
            },
            mono: function() {
                this.uniforms = {
                    quad: 0
                }
            },
            monoquad: function() {
                this.initShader("mono");
                this.isQuad = true;
                this.uniforms.monoquad = {
                    rect: this.getRect(0.028),
                    fade: 120
                }
            },
            neon: function() {
                this.quality = 0.9
            },
            nightvision: function() {
                this.quality = 0.7;
                this.uniforms = {
                    center: this.center,
                    radius: (this.square ? this.height : this.width) * 0.3
                }
            },
            oldmovie: function() {
                this.initShader("oldmovienoise");
                this.initShader("oldmoviedirt");
                this.initShader("sepia");
                this.fps = 10;
                this.quality = 0.7;
                this.uniforms = {
                    flicker: 0,
                    jump: 0,
                    line: 0,
                    dot0: new Array(3),
                    dot1: new Array(3),
                    dot2: new Array(3),
                    sepia: {
                        center: this.center,
                        radius: this.height / 2,
                        width: (this.square ? this.height : this.width) / 3
                    }
                }
            },
            outline: function() {
                this.quality = 0.7;
                this.uniforms = {
                    rect: this.getRect(0.01)
                }
            },
            pinch: function() {
                this.initShader("bulge");
                this.uniforms = {
                    mode: 1,
                    strength: -0.5,
                    center: this.center,
                    radius: this.height / 4
                }
            },
            popart: function() {
                this.initShader("popart");
                this.extraTexture = this.getTexture(e.popart);
                this.quality = 0.9
            },
            popbooth: function() {
                this.initShader("popart");
                this.extraTexture = this.getTexture(e.popbooth)
            },
            quad: function() {
                this.uniforms.quad = {
                    texSize: this.size,
                    square: this.square ? 1 : 0,
                    quad: 1
                }
            },
            quadcam: function() {
                this.initShader("quadcam");
                this.isQuad = true
            },
            rainbow: function() {
                var K = 32 * this.height / o;
                this.initShader("rainbow");
                this.initShader("overlay");
                this.initShader("rainbowborder");
                this.uniforms = {
                    rainbow: {
                        size: [this.width, this.square ? this.width : this.height],
                        offset: this.square ? 0.4 : 0.25
                    },
                    overlay: {
                        rect: this.getRect(0),
                        mult: 1.4,
                        offset: 0.6
                    },
                    rainbowborder: {
                        texSize: this.size,
                        radius: K,
                        border: 1.5,
                        ratio: this.square ? 1 : this.width / this.height
                    }
                }
            },
            retro: function() {
                this.initShader("retro");
                this.extraTexture = this.getTexture(this.square ? e.retrosq : e.retro)
            },
            ripple: function() {
                this.uniforms = {
                    center: this.center,
                    wavelength: this.height / 16,
                    amplitude: this.height / 22
                }
            },
            rose: function() {
                var K = this.square ? this.height : this.width;
                this.uniforms = {
                    center: this.center,
                    radius: K / 6.4,
                    width: K * 0.75,
                    rect: this.getRect(0.03),
                    fade: 75
                }
            },
            shuffle: function() {
                if (!B && this.initShader("shuffle")) {
                    this.initFrameTextures(27, this.width, this.height);
                    this.uniforms = {
                        frame: 0,
                        tex: {
                            frame1: 1,
                            frame2: 2,
                            frame3: 3,
                            frame4: 4,
                            frame5: 5,
                            frame6: 6,
                            frame7: 7,
                            frame8: 8,
                            frame9: 9
                        }
                    }
                } else {
                    this.initShader("shufflesimple");
                    this.initFrameTextures(12, this.width, this.height);
                    this.uniforms = {
                        frame: 0,
                        tex: {
                            frame1: 1,
                            frame2: 2,
                            frame3: 3,
                            frame4: 4
                        }
                    }
                }
                this.fps = 20
            },
            silk: function() {
                var K = (this.square ? this.height : this.width) / 8,
                    L = this.height;
                this.initShader("silk");
                this.initShader("radialblur");
                this.fps = 20;
                this.uniforms = {
                    silk: {
                        texSize: this.size,
                        center: this.center,
                        radius: K * 2,
                        width: L * 1.5
                    },
                    radialblur1: {
                        texSize: this.size,
                        center: this.center,
                        blur: Math.floor(this.width / 32),
                        radius: K,
                        width: L,
                        delta: [1 / this.width, 0]
                    },
                    radialblur2: {
                        texSize: this.size,
                        center: this.center,
                        blur: Math.floor(this.width / 32),
                        radius: K,
                        width: L,
                        delta: [0, 1 / this.height]
                    }
                }
            },
            snow: function() {
                var L = Math.max(60, Math.floor(this.height / 4)),
                    K = Math.floor(L * this.width / this.height);
                this.tempContext2D = p.getContext2D(K, L);
                this.assets.snowflakes = [];
                this.uniforms = {
                    center: this.center,
                    radius: (this.square ? this.height : this.width) / 3,
                    width: this.height / 2
                }
            },
            softfocus: function() {
                this.initShader("softfocus");
                this.fps = 20
            },
            sparkle: function() {
                var L = Math.max(60, Math.floor(this.height / 4)),
                    K = Math.floor(L * this.width / this.height);
                this.initShader("sparkle");
                this.initFrameTextures(1, this.width, this.height);
                this.tempContext2D = p.getContext2D(K, L);
                this.fps = 20;
                this.assets.sparkles = [];
                this.uniforms = {
                    mirror: this.mirror ? 1 : 0,
                    tex: {
                        texture2: 1,
                        texture3: 2
                    }
                }
            },
            spectrum: function() {
                this.quality = 0.7
            },
            spiral: function() {
                var R = 7,
                    O = o / this.height * 0.95,
                    P = Math.cos(R),
                    N = Math.sin(R),
                    M = 60 * this.height / o,
                    L = 140 * this.height / o,
                    K = Math.log(L / M),
                    Q = Math.atan(K / Math.PI / 2);
                if (this.mainTexture.type === this.gl.FLOAT) {
                    this.initShader("spiral1");
                    this.initShader("spiral2")
                } else {
                    this.initShader("spiral")
                }
                this.uniforms = {
                    spiralx: M,
                    a: K,
                    center: this.center,
                    za: [P * O, N * O],
                    start: [(this.center[0] * P + this.center[1] * N) * -O, (this.center[1] * P - this.center[0] * N) * O],
                    s: [Math.cos(Q), Math.sin(Q)]
                }
            },
            splitscreen: function() {
                this.initShader("splitscreen");
                this.initFrameTextures(this.fps = B ? 10 : 20, this.width, this.height);
                this.uniforms = {
                    frame: 0
                }
            },
            thermal: function() {
                this.initShader("thermal");
                this.extraTexture = this.getTexture(e.thermal);
                this.quality = 0.7
            },
            trail: function() {
                this.initShader("trail");
                this.sourceTexture.loadContentsOf(this.source);
                this.tempTexture.drawTo(this.mainDrawRect)
            },
            tunnel: function() {
                this.uniforms = {
                    center: this.center,
                    radius: this.height * 0.2
                }
            },
            twist: function() {
                this.uniforms = {
                    center: this.center,
                    radius: this.height / 2,
                    angle: -150 * Math.PI / 180
                }
            },
            underwater: function() {
                this.initShader("underwater");
                this.initShader("underwaterblue");
                this.assets.bubbles = new Array(12);
                this.uniforms = {
                    center: this.center,
                    radius: (this.square ? this.height : this.width) / 3,
                    width: this.height / 2
                }
            },
            vintage: function() {
                this.initShader("vintage");
                this.extraTexture = this.getTexture(e.vintage);
                this.uniforms = {
                    center: this.center,
                    radius: (this.square ? this.height : this.width) / 3,
                    width: this.height * 0.6
                }
            },
            watercolor: function() {
                this.initShader("watercolor");
                this.extraTexture = this.getTexture(e.watercolor);
                this.quality = 0.9;
                this.uniforms = {
                    rect: this.getRect(0.028),
                    fade: 100
                }
            },
            wedge: function() {
                this.uniforms = {
                    center: this.center
                }
            },
            xpro: function() {
                var K = this.square ? this.width / 6 : (this.width + this.height) / 8,
                    L = this.square ? this.width / 3 : (this.width + this.height) / 6;
                this.initShader("xpro");
                this.initShader("radialblur");
                this.initShader("xproborder");
                this.fps = 20;
                this.uniforms = {
                    radialblur1: {
                        texSize: this.size,
                        center: this.center,
                        blur: Math.floor(this.width / 32),
                        radius: K,
                        width: L,
                        delta: [1 / this.width, 0]
                    },
                    radialblur2: {
                        texSize: this.size,
                        center: this.center,
                        blur: Math.floor(this.width / 32),
                        radius: K,
                        width: L,
                        delta: [0, 1 / this.height]
                    },
                    xproborder: {
                        rect: this.getRect(0.022),
                        fade: 120
                    }
                }
            },
            zinc: function() {
                var K = this.square ? this.width / 6 : (this.width + this.height) / 8,
                    L = this.square ? this.width / 1.5 : (this.width + this.height) / 3;
                this.initShader("zinc");
                this.initShader("radialblur");
                this.fps = 20;
                this.uniforms = {
                    radialblur1: {
                        texSize: this.size,
                        center: this.center,
                        blur: Math.floor(this.width / 32),
                        radius: K,
                        width: L,
                        delta: [1 / this.width, 0]
                    },
                    radialblur2: {
                        texSize: this.size,
                        center: this.center,
                        blur: Math.floor(this.width / 32),
                        radius: K,
                        width: L,
                        delta: [0, 1 / this.height]
                    },
                    zinc: {
                        rect: this.getRect(0.022),
                        fade: o / 3
                    }
                }
            }
        },
        I = {
            add: function(K) {
                if (!this.uniforms.add) {
                    a.add.call(this, K)
                }
                if (this.shaders.add) {
                    this.shaders.add.textures(y);
                    n.call(this, this.shaders.add, this.uniforms.add)
                }
            },
            alien: function() {
                if (this.shaders.alien) {
                    this.shaders.alien.textures(y);
                    this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    if (!B) {
                        I.blur.call(this, Math.floor(this.width / 16))
                    }
                    n.call(this, this.shaders.alien)
                }
                this.mainDraw()
            },
            blur: function(K) {
                if (this.shaders.blursimple) {
                    n.call(this, this.shaders.blursimple, this.uniforms)
                } else {
                    if (!this.uniforms.blur1) {
                        a.blur.call(this, K)
                    }
                    n.call(this, this.shaders.blur, this.uniforms.blur1);
                    n.call(this, this.shaders.blur, this.uniforms.blur2)
                }
            },
            bokeh: function() {
                if (!B) {
                    n.call(this, this.shaders.radialblur, this.uniforms.radialblur1);
                    n.call(this, this.shaders.radialblur, this.uniforms.radialblur2)
                }
                if (this.shaders.bokeh && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.bokeh.textures(y);
                    this.uniforms.bokeh.time = this.uniforms.time;
                    for (var K = 4; K--;) {
                        this.uniforms.bokeh.init = K === 3 ? 1 : 0;
                        for (var L = 8; L--;) {
                            this.uniforms.bokeh["p" + L] = this.uniforms.bokehs[L + K * 8].move()
                        }
                        n.call(this, this.shaders.bokeh, this.uniforms.bokeh)
                    }
                }
                this.mainDraw()
            },
            cartoon: function() {
                n.call(this, this.shaders.cartoonink, this.uniforms.cartoonink);
                n.call(this, this.shaders.cartoon, this.uniforms.cartoon);
                this.mainDraw()
            },
            cocktail: function() {
                if (this.shaders.cocktail && this.extraTexture) {
                    this.shaders.cocktail.textures(y);
                    this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    if (!B) {
                        I.blur.call(this, Math.floor(this.width / 16))
                    }
                    n.call(this, this.shaders.cocktail, this.uniforms);
                    this.extraTexture.use(1);
                    this.shaders.cocktailborder.textures(y);
                    n.call(this, this.shaders.cocktailborder, this.uniforms)
                }
                this.mainDraw()
            },
            cocoa: function() {
                if (this.shaders.cocoa) {
                    this.shaders.cocoa.textures(y);
                    this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    if (!B) {
                        I.blur.call(this, Math.floor(this.width / 32))
                    }
                    n.call(this, this.shaders.cocoa, this.uniforms)
                }
                this.mainDraw()
            },
            colorghost: function() {
                var L = this.uniforms.frame,
                    K = this.frameTextures.length;
                this.mainTexture.use(0);
                this.frameTextures[L].drawTo(this.defaultDrawRect);
                L++;
                this.uniforms.frame = L %= K;
                this.frameTextures[L].use(1);
                this.frameTextures[(L + K / 2) % K].use(2);
                if (this.shaders.colorghost) {
                    this.shaders.colorghost.textures(this.uniforms.tex);
                    n.call(this, this.shaders.colorghost)
                }
                this.mainDraw()
            },
            comicstrip: function() {
                if (this.shaders.comicbook) {
                    this.shaders.comicbook.uniforms(this.uniforms.comicstrip);
                    I.quad.call(this, this.shaders.comicbook)
                }
            },
            dent: function() {
                n.call(this, this.shaders.bulge, this.uniforms);
                this.mainDraw()
            },
            disco: function() {
                var L = this.uniforms.time,
                    K;
                for (K = 0; K < 9; K++) {
                    this.uniforms.discolights["p" + K] = this.uniforms.discored[K].getPos(L)
                }
                n.call(this, this.shaders.discored, this.uniforms.discolights);
                for (K = 0; K < 9; K++) {
                    this.uniforms.discolights["p" + K] = this.uniforms.discogreen[K].getPos(L)
                }
                n.call(this, this.shaders.discogreen, this.uniforms.discolights);
                for (K = 0; K < 9; K++) {
                    this.uniforms.discolights["p" + K] = this.uniforms.discoblue[K].getPos(L)
                }
                n.call(this, this.shaders.discoblue, this.uniforms.discolights);
                this.mainDraw()
            },
            envy: function() {
                n.call(this, this.shaders.envy);
                if (!B) {
                    n.call(this, this.shaders.radialblur, this.uniforms.radialblur1);
                    n.call(this, this.shaders.radialblur, this.uniforms.radialblur2)
                }
                n.call(this, this.shaders.envyborder, this.uniforms.envyborder);
                this.mainDraw()
            },
            filmstrip: function() {
                var M = this.defaultShader,
                    K = this.frameTextures[0],
                    N = this.uniforms.frame,
                    L;
                this.mainTexture.use(0);
                this.gl.viewport(0, 0, K.width, K.height);
                if (this.uniforms.init) {
                    this.uniforms.init = false;
                    K.drawTo(function() {
                        for (L = 0; L < 6; L++) {
                            for (var O = 0; O < 6; O++) {
                                M.drawRect(L / 6, O / 6, (L + 1) / 6, (O + 1) / 6)
                            }
                        }
                    }).use(1)
                } else {
                    K.drawTo(function() {
                        for (L = 0; L < 6; L++) {
                            switch (N) {
                                case L:
                                    M.drawRect(L / 6, 0, (L + 1) / 6, 1 / 6);
                                    break;
                                case L + 6:
                                    M.drawRect(L / 6, 1 / 6, (L + 1) / 6, 2 / 6);
                                    break;
                                case L + 12:
                                    M.drawRect(L / 6, 2 / 6, (L + 1) / 6, 0.5);
                                    break;
                                case L + 18:
                                    M.drawRect(L / 6, 0.5, (L + 1) / 6, 4 / 6);
                                    break;
                                case L + 24:
                                    M.drawRect(L / 6, 4 / 6, (L + 1) / 6, 5 / 6);
                                    break;
                                case L + 30:
                                    M.drawRect(L / 6, 5 / 6, (L + 1) / 6, 1);
                                    break
                            }
                        }
                    }).use(1)
                }
                this.gl.viewport(0, 0, this.width, this.height);
                if (this.shaders.filmstrip) {
                    this.shaders.filmstrip.textures(y);
                    n.call(this, this.shaders.filmstrip, this.uniforms)
                }
                N++;
                this.uniforms.frame = N %= 36;
                this.mainDraw()
            },
            fire: function() {
                var K, M = this.uniforms.frame,
                    L = this.frameTextures.length;
                this.mainTexture.use(0);
                this.frameTextures[M].drawTo(this.defaultDrawRect);
                M++;
                this.uniforms.frame = M %= L;
                for (K = L; K--;) {
                    this.frameTextures[(M + K) % L].use(K + 1)
                }
                if (this.shaders.fire) {
                    this.shaders.fire.textures(this.uniforms.tex);
                    n.call(this, this.shaders.fire, this.uniforms);
                    n.call(this, this.shaders.firevignette, this.uniforms)
                }
                this.mainDraw()
            },
            fisheye: function() {
                n.call(this, this.shaders.bulge, this.uniforms);
                this.mainDraw()
            },
            ghost: function() {
                var K = this.uniforms.ghost.frame;
                this.mainTexture.use(0);
                this.frameTextures[K].drawTo(this.defaultDrawRect);
                K++;
                this.uniforms.ghost.frame = K %= this.frameTextures.length;
                this.frameTextures[K].use(1);
                I.add.call(this, 0.5);
                this.mainDraw()
            },
            glaze: function() {
                var K = this;
                this.uniforms.glaze.time = this.uniforms.time;
                this.mainTexture.use(0);
                this.tempTexture.drawTo(function() {
                    K.shaders.glaze.uniforms(K.uniforms.glaze).drawRect()
                }).use(1);
                if (this.shaders.overlay) {
                    this.shaders.overlay.textures(y);
                    n.call(this, this.shaders.overlay, this.uniforms.overlay)
                }
                this.mainDraw()
            },
            halo: function() {
                if (this.shaders.softfocus) {
                    this.shaders.softfocus.textures(y);
                    this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    if (!B) {
                        I.blur.call(this, Math.floor(this.width / 16))
                    }
                    n.call(this, this.shaders.softfocus)
                }
                n.call(this, this.shaders.halo, this.uniforms);
                this.mainDraw()
            },
            hazydays: function() {
                if (this.shaders.hazydays && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.hazydays.textures(y);
                    n.call(this, this.shaders.hazydays, this.uniforms)
                }
                this.mainDraw()
            },
            hotpink: function() {
                if (this.shaders.hotpink && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.hotpink.textures(y);
                    n.call(this, this.shaders.hotpink)
                }
                this.mainDraw()
            },
            kaleidoscope: function() {
                if (this.mainTexture.type === this.gl.FLOAT && this.shaders.kaleidoscope2) {
                    this.shaders.kaleidoscope2.textures(y);
                    this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    n.call(this, this.shaders.kaleidoscope1, this.uniforms);
                    n.call(this, this.shaders.kaleidoscope2, this.uniforms)
                } else {
                    n.call(this, this.shaders.kaleidoscope, this.uniforms)
                }
                this.mainDraw()
            },
            lomoquad: function() {
                if (this.shaders.lomo) {
                    this.shaders.lomo.uniforms(this.uniforms.lomoquad);
                    I.quad.call(this, this.shaders.lomo)
                }
            },
            lsd: function() {
                this.tempTexture.use(1);
                if (!B) {
                    I.blur.call(this, 2)
                }
                n.call(this, this.shaders.lsd);
                I.add.call(this, B ? 0.6 : 0.85);
                this.tempTexture.swapWith(this.mainTexture);
                this.mainDraw()
            },
            mix: function(K) {
                if (!this.uniforms.mix) {
                    a.mix.call(this, K)
                }
                if (this.shaders.mix) {
                    this.shaders.mix.textures(y);
                    n.call(this, this.shaders.mix, this.uniforms.mix)
                }
            },
            monoquad: function() {
                if (this.shaders.mono) {
                    this.shaders.mono.uniforms(this.uniforms.monoquad);
                    I.quad.call(this, this.shaders.mono)
                }
            },
            oldmovie: function() {
                if (Math.random() < 0.04) {
                    this.uniforms.jump = Math.random() * 0.02 + 0.02
                } else {
                    this.uniforms.jump = 0
                }
                this.uniforms.flicker = Math.random() * 1.25;
                this.uniforms.dot0[0] = Math.random() * this.width;
                this.uniforms.dot1[0] = Math.random() * this.width;
                this.uniforms.dot2[0] = Math.random() * this.width;
                this.uniforms.dot0[1] = Math.random() * this.height;
                this.uniforms.dot1[1] = Math.random() * this.height;
                this.uniforms.dot2[1] = Math.random() * this.height;
                this.uniforms.dot0[2] = Math.random() * this.width / 60 + 1;
                this.uniforms.dot1[2] = Math.random() * this.width / 60 + 1;
                this.uniforms.dot2[2] = Math.random() < 0.05 ? this.width * 2 : Math.random() * this.width / 60 + 1;
                var K = this.uniforms.line;
                if (Math.random() < 0.025) {
                    K = this.width
                } else {
                    if (Math.random() < 0.05) {
                        K = this.width * 0.1
                    } else {
                        K += (Math.random() * this.width * 0.25 - K) * 0.05
                    }
                }
                this.uniforms.line = K;
                n.call(this, this.shaders.oldmovienoise, this.uniforms);
                n.call(this, this.shaders.oldmoviedirt, this.uniforms);
                n.call(this, this.shaders.sepia, this.uniforms.sepia);
                this.mainDraw()
            },
            pinch: function() {
                n.call(this, this.shaders.bulge, this.uniforms);
                this.mainDraw()
            },
            popart: function() {
                if (this.shaders.popart && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.popart.textures(y);
                    n.call(this, this.shaders.popart, this.uniforms)
                }
                this.mainDraw()
            },
            popbooth: function() {
                if (this.shaders.popart && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.popart.textures(y);
                    n.call(this, this.shaders.popart, this.uniforms)
                }
                this.mainDraw()
            },
            quad: function(O) {
                var N = this,
                    K = this.square ? (this.width - this.height) / this.width / 2 : 0,
                    R,
                    P = 0,
                    L = 0.5,
                    Q = 0.5,
                    M = this.blackShader;
                switch (O) {
                    case this.shaders.mono:
                    case this.shaders.lomo:
                        P = 0.004;
                        break;
                    case this.shaders.comicbook:
                        P = 0.005;
                        if (!this.square && !B) {
                            Q = this.height / 2 / this.width;
                            L = 1 - Q
                        }
                        M = this.whiteShader;
                        break
                }
                R = P * this.height / this.width;
                if (!this.uniforms.quad) {
                    a.quad.call(this)
                }
                this.mainTexture.use(0);
                this.tempTexture.drawTo(function() {
                    O.uniforms(N.uniforms.quad);
                    switch (N.quadPos) {
                        case 0:
                        case 4:
                            M.drawRect(0.5, K, 1, L);
                            O.uniforms(N.uniforms.comicstripwide).drawRect(0.5 - P, K + R, 1 - P, L + R);
                        case 3:
                            M.drawRect(0.5, L, 1, 1 - K);
                            O.uniforms(N.uniforms.comicstripsquare).drawRect(0.5 - P, L - R, 1 - P, 1 - K - R);
                        case 2:
                            M.drawRect(0, K, 0.5, Q);
                            O.uniforms(N.uniforms.comicstripsquare).drawRect(P, K + R, 0.5 + P, Q + R);
                        case 1:
                            M.drawRect(0, Q, 0.5, 1 - K);
                            O.uniforms(N.uniforms.comicstripwide).drawRect(P, Q - R, 0.5 + P, 1 - K - R)
                    }
                }).use(0);
                if (N.uniforms.comicstripborder && !this.square && !B) {
                    this.swapTexture.drawTo(function() {
                        N.shaders.comicstripborder.uniforms(N.uniforms.comicstripborder).drawRect()
                    }).swapWith(this.mainTexture);
                    this.mainTexture.use(0)
                }
                this.defaultShader.drawRect()
            },
            quadcam: function() {
                I.quad.call(this, this.shaders.quadcam)
            },
            rainbow: function() {
                var K = this;
                this.mainTexture.use(0);
                this.tempTexture.drawTo(function() {
                    K.shaders.rainbow.uniforms(K.uniforms.rainbow).drawRect()
                }).use(1);
                if (this.shaders.overlay) {
                    this.shaders.overlay.textures(y);
                    n.call(this, this.shaders.overlay, this.uniforms.overlay)
                }
                n.call(this, this.shaders.rainbowborder, this.uniforms.rainbowborder);
                this.mainDraw()
            },
            retro: function() {
                if (this.shaders.retro && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.retro.textures(y);
                    n.call(this, this.shaders.retro, this.uniforms)
                }
                this.mainDraw()
            },
            shuffle: function() {
                var K, M = this.uniforms.frame,
                    L = this.frameTextures.length;
                this.mainTexture.use(0);
                this.frameTextures[M].drawTo(this.defaultDrawRect);
                M++;
                this.uniforms.frame = M %= L;
                for (K = L / 3; K--;) {
                    this.frameTextures[(M + K * 3) % L].use(K + 1)
                }
                if (this.shaders.shufflesimple) {
                    this.shaders.shufflesimple.textures(this.uniforms.tex);
                    n.call(this, this.shaders.shufflesimple, this.uniforms)
                } else {
                    if (this.shaders.shuffle) {
                        this.shaders.shuffle.textures(this.uniforms.tex);
                        n.call(this, this.shaders.shuffle, this.uniforms)
                    }
                }
                this.mainDraw()
            },
            silk: function() {
                n.call(this, this.shaders.silk, this.uniforms.silk);
                if (!B) {
                    n.call(this, this.shaders.radialblur, this.uniforms.radialblur1);
                    n.call(this, this.shaders.radialblur, this.uniforms.radialblur2)
                }
                this.mainDraw()
            },
            softfocus: function() {
                if (this.shaders.softfocus) {
                    this.shaders.softfocus.textures(y);
                    this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    I.blur.call(this, Math.floor(this.width / 40));
                    n.call(this, this.shaders.softfocus)
                }
                this.mainDraw()
            },
            sparkle: function() {
                if (this.shaders.sparkle) {
                    this.shaders.sparkle.textures(this.uniforms.tex);
                    this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    if (!B) {
                        I.blur.call(this, Math.floor(this.width / 40))
                    }
                    this.frameTextures[0].loadContentsOf(this.context2D.canvas).use(2);
                    n.call(this, this.shaders.sparkle, this.uniforms)
                }
                this.mainDraw()
            },
            spiral: function() {
                if (this.mainTexture.type === this.gl.FLOAT && this.shaders.spiral2) {
                    this.shaders.spiral2.textures(y);
                    this.tempTexture.drawTo(this.mainDrawRect).use(1);
                    n.call(this, this.shaders.spiral1, this.uniforms);
                    n.call(this, this.shaders.spiral2, this.uniforms)
                } else {
                    n.call(this, this.shaders.spiral, this.uniforms)
                }
                this.mainDraw()
            },
            splitscreen: function() {
                var K = this.uniforms.frame;
                this.mainTexture.use(0);
                this.frameTextures[K].drawTo(this.defaultDrawRect);
                K++;
                this.uniforms.frame = K %= this.frameTextures.length;
                this.frameTextures[K].use(1);
                if (this.shaders.splitscreen) {
                    this.shaders.splitscreen.textures(y);
                    n.call(this, this.shaders.splitscreen, this.uniforms)
                }
                this.mainDraw()
            },
            thermal: function() {
                if (this.shaders.thermal && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.thermal.textures(y);
                    n.call(this, this.shaders.thermal)
                }
                this.mainDraw()
            },
            trail: function() {
                if (this.shaders.trail) {
                    this.tempTexture.use(1);
                    this.shaders.trail.textures(y);
                    n.call(this, this.shaders.trail);
                    this.tempTexture.swapWith(this.mainTexture)
                }
                this.mainDraw()
            },
            underwater: function() {
                n.call(this, this.shaders.underwater, this.uniforms);
                n.call(this, this.shaders.underwaterblue, this.uniforms);
                this.mainDraw()
            },
            vintage: function() {
                if (this.shaders.vintage && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.vintage.textures(y);
                    n.call(this, this.shaders.vintage, this.uniforms)
                }
                this.mainDraw()
            },
            watercolor: function() {
                if (this.shaders.watercolor && this.extraTexture) {
                    this.extraTexture.use(1);
                    this.shaders.watercolor.textures(y);
                    n.call(this, this.shaders.watercolor, this.uniforms)
                }
                this.mainDraw()
            },
            xpro: function() {
                n.call(this, this.shaders.xpro);
                if (!B) {
                    n.call(this, this.shaders.radialblur, this.uniforms.radialblur1);
                    n.call(this, this.shaders.radialblur, this.uniforms.radialblur2)
                }
                n.call(this, this.shaders.xproborder, this.uniforms.xproborder);
                this.mainDraw()
            },
            zinc: function() {
                if (!B) {
                    n.call(this, this.shaders.radialblur, this.uniforms.radialblur1);
                    n.call(this, this.shaders.radialblur, this.uniforms.radialblur2)
                }
                n.call(this, this.shaders.zinc, this.uniforms.zinc);
                this.mainDraw()
            }
        },
        r = {
            snow: function() {
                var T = this.context2D,
                    W = this.tempContext2D,
                    V = T.canvas.width,
                    P = T.canvas.height,
                    Q = W.canvas.width,
                    L = W.canvas.height,
                    M, K, R, N, X, S = Math.max(1200, Math.floor(2400 / o * P)),
                    U = Math.max(6, Math.floor(12 / o * P));
                try {
                    T.drawImage(this.source, 0, 0, V, P)
                } catch (O) {
                    return
                }
                try {
                    W.drawImage(T.canvas, 0, 0, Q, L)
                } catch (O) {
                    return
                }
                K = W.getImageData(0, 0, Q, L);
                if (K && K.data) {
                    M = v(K.data, w, Q, L)
                } else {
                    return
                }
                while (this.assets.snowflakes.length < S && U) {
                    U--;
                    X = (Math.random() + 0.2) * P / o * 10 + 1;
                    this.assets.snowflakes.push(new G(Math.random() * V, 4 - X * 2, X, Math.random() - 0.5))
                }
                for (N = 0; N < this.assets.snowflakes.length; N++) {
                    R = this.assets.snowflakes[N];
                    if (R.y < L / 16 || R.y > L - L / 16 || M[Math.floor(R.x) + Math.floor(R.y) * Q] < 204) {
                        R.vx *= 0.997;
                        R.vy *= 0.997;
                        R.x += R.vx;
                        R.y += R.vy;
                        if (R.melt < 1) {
                            R.melt += 1 / 16
                        } else {
                            R.melt = 1
                        }
                        if (R.x > V + R.width) {
                            R.x -= V + R.width
                        }
                        if (R.x < -R.width) {
                            R.x += V + R.width
                        }
                        if (R.y > L + R.height) {
                            this.assets.snowflakes.splice(N++, 1)
                        }
                    } else {
                        if (R.melt > 0) {
                            R.melt -= 1 / 128;
                            R.vy = R.height * 0.3
                        } else {
                            this.assets.snowflakes.splice(N++, 1)
                        }
                    }
                    T.save();
                    T.globalAlpha = Math.min(1, R.melt * 4);
                    T.drawImage(e.snowflake, R.x * V / Q - R.width / 2, R.y * P / L - R.height / 2, R.width, R.height);
                    T.restore()
                }
                this.sourceTexture.loadContentsOf(T.canvas)
            },
            sparkle: function() {
                var aa = this.context2D,
                    T = this.tempContext2D,
                    ac = e.sparkle,
                    S = aa.canvas.width,
                    Y = aa.canvas.height,
                    ab = T.canvas.width,
                    O = T.canvas.height,
                    N, Z, P, K, U, M, R, Q, V, X, W = 0;
                this.sourceTexture.loadContentsOf(this.source);
                aa.fillRect(0, 0, this.width, this.height);
                try {
                    T.drawImage(this.source, 0, 0, ab, O)
                } catch (L) {
                    return
                }
                Z = T.getImageData(0, 0, ab, O);
                if (Z && Z.data) {
                    P = Z.data;
                    N = v(P, m, ab, O)
                } else {
                    return
                }
                do {
                    W++;
                    R = Math.floor(ab * Math.random());
                    Q = Math.floor(O * Math.random());
                    if (N[R + Q * ab] > 32) {
                        this.assets.sparkles.push(new z(R, Q, Math.random() < 0.05))
                    }
                } while (this.assets.sparkles.length < 128 && W < 32);
                for (X = 0; X < this.assets.sparkles.length; X++) {
                    V = this.assets.sparkles[X];
                    if (V.big) {
                        V.big = false;
                        M = 512
                    } else {
                        M = P[(V.x + V.y * ab) * 4] + (Math.random() - 0.5) * 16
                    }
                    if (M < 4 || N[V.x + V.y * ab] < 32) {
                        this.assets.sparkles.splice(X++, 1)
                    } else {
                        M *= Y / 122880;
                        K = ac.width * M;
                        U = ac.height * M;
                        aa.drawImage(ac, V.x * S / ab - K / 2, V.y * Y / O - U / 2, K, U)
                    }
                }
            },
            underwater: function() {
                var R = this.context2D,
                    N = e.bubbles,
                    M = R.canvas.width,
                    P = R.canvas.height,
                    Q = this.assets.bubbles.length,
                    O, K;
                R.save();
                try {
                    R.drawImage(this.source, 0, 0, M, P)
                } catch (L) {
                    R.restore();
                    return
                }
                for (O = Q; O--;) {
                    K = this.assets.bubbles[O] = this.assets.bubbles[O] || new A(Math.random() * M, Math.random() * P, (this.height < o / 2 ? O + 5 : O), Q);
                    K.x += Math.sin(K.y / 12) * 2;
                    K.y -= K.size * 0.15;
                    if (K.y < -K.size) {
                        K.x = Math.random() * M;
                        K.y = P + K.size
                    }
                    R.drawImage(N, K.offset, 0, K.size, K.size, Math.floor(K.x), Math.floor(K.y), K.size, K.size)
                }
                R.restore();
                this.sourceTexture.loadContentsOf(R.canvas)
            }
        },
        e,
        B = k.ua.mobile,
        F = $("#toy"),
        s = false,
        j = 2,
        E = 253,
        h;

    function v(K, U, W, R) {
        var S = new Float32Array(W * R);
        for (var Q = K.length - 4; Q >= 0; Q -= 4) {
            K[Q] = K[Q] * 0.3 + K[Q + 1] * 0.59 + K[Q + 2] * 0.11
        }
        for (var V = W; V--;) {
            for (var T = R; T--;) {
                var P = 0;
                for (var O = 3; O--;) {
                    for (var M = 3; M--;) {
                        var N = V + O - 1;
                        var L = T + M - 1;
                        if (L >= 0 && L < R && N >= 0 && N < W) {
                            P += K[(N + L * W) * 4] * U[O + M * 3]
                        }
                    }
                }
                S[V + T * W] = P
            }
        }
        return S
    }

    function c(K, M, L) {
        this.p = [K, M, L];
        this.dx = 0;
        this.dy = 0;
        this.reset()
    }
    c.prototype.reset = function() {
        this.dx = Math.pow(this.p[2], 4) / 100000000;
        this.dy = this.dx / 3 - Math.random()
    };
    c.prototype.move = function() {
        this.p[0] += this.dx;
        if (this.p[0] > x) {
            this.reset();
            this.p[0] -= x + this.p[2]
        }
        this.p[1] += this.dy;
        if (this.p[1] > o) {
            this.reset();
            this.p[1] -= o + this.p[2]
        } else {
            if (this.p[1] < -this.p[2]) {
                this.p[1] += o + this.p[2];
                this.reset()
            }
        }
        return this.p
    };

    function A(K, N, L, M) {
        this.x = K;
        this.y = N;
        if (L === 0) {
            this.size = 64;
            this.offset = 0
        } else {
            if (L < M * 2 / 4) {
                this.size = 48;
                this.offset = 64
            } else {
                if (L < M * 3 / 4) {
                    this.size = 32;
                    this.offset = 64 + 48
                } else {
                    this.size = 16;
                    this.offset = 64 + 48 + 32
                }
            }
        }
    }

    function C(L, K, N, M) {
        this.fx = L;
        this.fy = K;
        this.sx = N;
        this.sy = M;
        this.pos = new Array(2)
    }
    C.prototype.getPos = function(K) {
        this.pos[0] = Math.cos(this.fx * K) * this.sx + 0.5;
        this.pos[1] = Math.sin(this.fy * K) * this.sy + 0.5;
        return this.pos
    };

    function z(L, M, K) {
        this.x = L;
        this.y = M;
        this.big = K
    }

    function G(K, N, L, M) {
        this.x = K;
        this.y = N;
        this.width = L * 1.5;
        this.height = L;
        this.vx = M;
        this.vy = this.height * 0.3;
        this.melt = 1
    }

    function p(M, K, L, U) {
        if (this.gl || !M || !K) {
            return
        }
        this.source = K;
        this.width = L || x;
        this.height = U || o;
        M.width = this.width;
        M.height = this.height;
        this.size = [this.width, this.height];
        this.center = [this.width / 2, this.height / 2];
        this.context2D = p.getContext2D(Math.max(200, Math.floor(this.width / 2)), Math.max(200 * this.height / this.width, Math.floor(this.height / 2)));
        if (!h) {
            h = p.getContext2D(Math.max(160, Math.floor(this.width / 4)), Math.max(160 * this.height / this.width, Math.floor(this.height / 4)))
        }
        try {
            var V = {
                premultipliedAlpha: false
            };
            this.gl = M.getContext("webgl", V) || M.getContext("experimental-webgl", V)
        } catch (S) {
            this.gl = null;
            throw S
        }
        if (!this.gl) {
            throw "WebGL error"
        }
        var R = this,
            Q = this.gl,
            O = Q.getExtension("OES_texture_float"),
            N = Q.getExtension("OES_texture_float_linear"),
            T = Q.UNSIGNED_BYTE;
        this.sourceTexture = new k.Texture(Q, 0, 0, Q.RGB, Q.UNSIGNED_BYTE, null, Q.LINEAR);
        if (O && N) {
            var P = new k.Texture(Q, this.width, this.height, Q.RGB, Q.FLOAT);
            P.drawTo(function() {
                T = Q.FLOAT
            });
            P.destroy();
            P = null
        }
        this.mainTexture = new k.Texture(Q, this.width, this.height, Q.RGB, T);
        this.swapTexture = new k.Texture(Q, this.width, this.height, Q.RGB, T);
        this.tempTexture = new k.Texture(Q, this.width, this.height, Q.RGB, T);
        try {
            this.defaultShader = new k.Shader(Q);
            this.mainShader = k.Shader.getMainShader(Q);
            this.blackShader = k.Shader.getBlackShader(Q);
            this.whiteShader = k.Shader.getWhiteShader(Q)
        } catch (S) {
            q(S, "default", Q)
        }
        this.defaultDrawRect = function() {
            R.defaultShader.drawRect()
        };
        this.mainDrawRect = function() {
            R.mainShader.drawRect();
            R.mainShader.uniforms(R.mainUniforms).drawRect()
        };
        this.shaders = {};
        this.mainUniforms = {
            mult: 1,
            offset: 0,
            mirror: 1
        };
        this.mirror = true;
        this.square = false;
        this.setEffect()
    }
    p.getContext2D = function(N, K) {
        var L = document.createElement("canvas");
        L.width = N;
        L.height = K;
        var M = L.getContext("2d");
        if (M) {
            M.clearRect(0, 0, N, K)
        }
        return M
    };

    function t(K) {
        return K.replace(/[a-zA-Z]/g,
            function(L) {
                return String.fromCharCode((L <= "Z" ? 90 : 122) >= (L = L.charCodeAt(0) + 13) ? L : L - 26)
            })
    }

    function l(N, L, M) {
        if (k.getImages) {
            try {
                e = k.getImages(B);
                delete k.getImages;
                if (N) {
                    N()
                }
            } catch (K) {
                if (L) {
                    L(K || M)
                }
            }
        } else {
            if (L) {
                L(M)
            }
        }
    }

    function H() {
        return k.Services.assetsURL + "js/app-images." + (F.attr("data-app-images") || 1) + ".js"
    }
    p.preloadImages = function() {
        k.addScript(H())
    };
    p.loadImages = function(L, K) {
        if (k.getImages) {
            k.log("Images preloaded");
            l(L, K, "Parse error");
            return
        }
        $.ajax({
            url: H(),
            dataType: "script",
            cache: true,
            timeout: 20000,
            error: function(O, N, M) {
                p.preloadImages();
                setTimeout(l, 10000, L, K, M || N)
            },
            success: function(M) {
                setTimeout(function() {
                        l(L, K, "Parse error")
                    },
                    100)
            }
        })
    };

    function u() {
        return k.Services.assetsURL + "fs/fs." + (F.attr("data-fs") || 1) + ".txt"
    }
    p.loadEffects = function(L, K) {
        $.ajax({
            url: u(),
            cache: true,
            timeout: 20000,
            error: function(O, N, M) {
                if (!s) {
                    s = true;
                    p.loadEffects(L, K)
                } else {
                    K(M || N)
                }
            },
            complete: function(O) {
                if (O && (O.statusText === "success" || O.statusText === "OK") && O.responseText) {
                    var Q;
                    try {
                        Q = window.atob(t(O.responseText))
                    } catch (P) {
                        if (!s) {
                            s = true;
                            p.loadEffects(L, K)
                        } else {
                            K(P)
                        }
                        return
                    }
                    var N = Q.split("/*:*/\n"),
                        M = N.length - 1,
                        R;
                    while (M > 0) {
                        M--;
                        R = N[M].substr(3, N[M].indexOf(":*/") - 3);
                        if (R) {
                            f[R] = N[M]
                        }
                    }
                    if (L) {
                        L()
                    }
                } else {
                    if (K) {
                        if (!s) {
                            s = true;
                            p.loadEffects(L, K)
                        } else {
                            K(O && O.statusText)
                        }
                    }
                }
            }
        })
    };

    function D(L) {
        for (var K = 2; K < 256; K++) {
            if (L[K] > 4) {
                return K
            }
        }
        return 2
    }

    function g(L) {
        for (var K = 253; K > 0; K--) {
            if (L[K] > 4) {
                return K
            }
        }
        return 253
    }
    p.autoEnhance = function(M) {
        var T = 4,
            U = h.canvas.width,
            Q = h.canvas.height;
        try {
            h.drawImage(M, -T, -T, U + T * 2, Q + T * 2)
        } catch (R) {
            return {
                mult: 1,
                offset: 0
            }
        }
        var K = h.getImageData(0, 0, U, Q),
            L,
            N = U * Q,
            O = N * 4,
            S = [],
            P;
        if (K && K.data) {
            L = K.data
        } else {
            return {
                mult: 1,
                offset: 0
            }
        }
        for (P = 0; P < 256; P++) {
            S[P] = 0
        }
        while (N--) {
            S[(0.5 + L[O -= 4] * 0.3 + L[O + 1] * 0.59 + L[O + 2] * 0.11) | 0]++
        }
        for (P = 2; P < 254; P++) {
            if (S[P] < 8) {
                S[P] = 0
            }
            S[P] = S[P - 2] * 0.1 + S[P - 1] * 0.2 + S[P] * 0.4 + S[P + 1] * 0.2 + S[P + 2] + 0.1;
            if (S[P] < 8) {
                S[P] = 0
            }
        }
        j += (D(S) - j) / 8;
        E += (g(S) - E) / 8;
        return {
            mult: Math.min(2.5, 253 / (E - j)),
            offset: Math.min(60, j - 2) / -255
        }
    };

    function n(L, K) {
        this.mainTexture.use(0);
        this.swapTexture.drawTo(function() {
            L.uniforms(K).drawRect()
        }).swapWith(this.mainTexture)
    }

    function i() {
        n.call(this, this.shaders[this.id], this.uniforms);
        this.mainDraw()
    }
    p.prototype.mainDraw = function() {
        this.mainTexture.use(0);
        this.defaultShader.drawRect()
    };

    function q(K, N, M) {
        var L = N;
        if (K) {
            L += ": " + K;
            L = L.replace(/(\r\n|\n|\r)/gm, "")
        }
        if (L && /Compilation/.test(L)) {
            J++;
            if (J > b) {
                k.UI.destroy("Effects not compiled");
                return false
            }
        } else {
            if (!M.isContextLost() && J <= b) {
                k.trackEvent("Error", "Shader", L, true);
                k.log("*ERROR*", "Shader", N)
            }
        }
    }
    p.prototype.initShader = function(L) {
        if (this.shaders[L]) {
            return true
        }
        if (this.gl.isContextLost()) {
            return false
        }
        try {
            this.shaders[L] = new k.Shader(this.gl, null, f[L] ? "uniform sampler2D texture; uniform float square; uniform vec2 texSize; varying vec2 texCoord;" + f[L] : null);
            return true
        } catch (K) {
            this.shaders[L] = this.defaultShader;
            q(K, L, this.gl);
            return false
        }
    };
    p.prototype.getTexture = function(K) {
        return new k.Texture(this.gl, 0, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, K && K.width && K.height ? K : null)
    };
    p.prototype.initFrameTextures = function(N, M, K) {
        var L;
        if (this.frameTextures) {
            for (L = this.frameTextures.length; L--;) {
                if (this.frameTextures[L]) {
                    this.frameTextures[L].destroy();
                    this.frameTextures[L] = null
                }
            }
        }
        if (N && M && K) {
            this.frameTextures = new Array(N);
            for (L = 0; L < N; L++) {
                this.frameTextures[L] = new k.Texture(this.gl, M, K, this.gl.RGB, this.gl.UNSIGNED_BYTE)
            }
            this.sourceTexture.loadContentsOf(this.source);
            for (L = 0; L < N; L++) {
                this.frameTextures[L].drawTo(this.mainDrawRect)
            }
        } else {
            this.frameTextures = null
        }
    };
    p.prototype.setEffect = function(L) {
        if (this.gl) {
            this.gl.viewport(0, 0, this.width, this.height);
            this.gl.clearColor(0, 0, 0, 1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
        } else {
            throw "WebGL error"
        }
        if (this.mainTexture) {
            this.mainTexture.use(0)
        } else {
            throw "Effects error"
        }
        if (this.extraTexture) {
            this.extraTexture.destroy()
        }
        this.extraTexture = null;
        this.tempContext2D = null;
        this.initFrameTextures();
        this.startTime = Date.now() - Math.round(300000 * Math.random());
        this.id = L || "normal";
        this.fps = 30;
        this.fpsGrid = 0;
        this.quality = 0.8;
        this.quadPos = 0;
        this.isQuad = false;
        this.assets = {};
        this.uniforms = {};
        var K = a[this.id];
        if (K) {
            K.call(this)
        }
        this.uniforms.square = this.square ? 1 : 0;
        this.uniforms.texSize = this.size;
        this.uniforms.time = 0;
        this.effect = I[this.id];
        if (!this.effect) {
            this.initShader(this.id);
            this.effect = i
        }
        this.canvasEffect = r[this.id];
        this.effectNum = d.indexOf(this.id) + 1;
        if (this.defaultShader) {
            this.draw()
        }
    };
    p.prototype.getEffectID = function(K) {
        return d[K - 1] || "normal"
    };
    p.prototype.previousEffect = function() {
        var K = this.effectNum - 1;
        if (K < 0) {
            K = d.length
        }
        try {
            this.setEffect(this.getEffectID(K))
        } catch (L) {}
    };
    p.prototype.nextEffect = function() {
        var K = this.effectNum + 1;
        K %= d.length + 1;
        try {
            this.setEffect(this.getEffectID(K))
        } catch (L) {}
    };
    p.prototype.useMirror = function(K) {
        this.mirror = K;
        this.mainUniforms.mirror = K ? 1 : 0;
        try {
            this.setEffect(this.id)
        } catch (L) {}
        return this
    };
    p.prototype.useSquare = function(K) {
        this.square = K;
        try {
            this.setEffect(this.id)
        } catch (L) {}
        return this
    };
    p.prototype.getRect = function(L) {
        var K = L || 0,
            N = K,
            M = K * this.height / this.width;
        if (this.square) {
            M += (this.width - this.height) / 2 / this.width
        }
        return [N, M, 1 - N, 1 - M]
    };
    p.prototype.autoEnhance = function() {
        var K = k.Effect.autoEnhance(this.source);
        this.mainUniforms.mult = K.mult;
        this.mainUniforms.offset = K.offset
    };
    p.prototype.draw = function() {
        this.uniforms.time = (Date.now() - this.startTime) / 1000;
        if (this.canvasEffect) {
            this.canvasEffect()
        } else {
            this.sourceTexture.loadContentsOf(this.source)
        }
        this.mainTexture.drawTo(this.mainDrawRect);
        if (this.effect) {
            this.effect()
        }
    };
    p.prototype.getImage = function(L, K) {
        var M = new Image();
        if (this.defaultShader) {
            this.defaultShader.drawRect()
        }
        M.src = this.mainTexture.toImage(this.square, this.quality, L, K);
        return M
    };
    p.prototype.destroyShaders = function() {
        for (var K = this.shaders.length; K--;) {
            this.shaders[K].destroy()
        }
        this.shaders = {}
    };
    p.prototype.destroy = function() {
        this.destroyShaders();
        this.initFrameTextures();
        if (this.sourceTexture) {
            this.sourceTexture.destroy()
        }
        this.sourceTexture = null;
        if (this.mainTexture) {
            this.mainTexture.destroy()
        }
        this.mainTexture = null;
        if (this.swapTexture) {
            this.swapTexture.destroy()
        }
        this.swapTexture = null;
        if (this.tempTexture) {
            this.tempTexture.destroy()
        }
        this.tempTexture = null;
        if (this.extraTexture) {
            this.extraTexture.destroy()
        }
        this.extraTexture = null;
        if (this.defaultShader) {
            this.defaultShader.destroy()
        }
        this.defaultShader = null;
        if (this.mainShader) {
            this.mainShader.destroy()
        }
        this.mainShader = null;
        this.assets = null;
        this.uniforms = null;
        this.effect = null;
        this.canvasEffect = null;
        this.context2D = null;
        this.tempContext2D = null;
        this.isQuad = false;
        this.width = this.height = this.quadPos = this.startTime = this.quality = this.fpsGrid = this.fps = 0;
        this.size = null;
        this.center = null;
        this.id = null;
        this.source = null;
        this.gl = null
    };
    return p
}(WebcamToy));
WebcamToy.Grid = (function(b) {
    function c(f, e, d) {
        return Math.min(d, Math.max(e, f))
    }

    function a(e, g, f, h) {
        this.source = g;
        this.page = 0;
        this.totalPages = 9;
        this.itemWidth = f;
        this.itemHeight = h;
        this.gridContext2D = b.Effect.getContext2D(f, h);
        this.effects = new Array(9);
        for (var d = 0; d < 9; d++) {
            this.effects[d] = new b.Effect(e[d], this.gridContext2D.canvas, f, h)
        }
    }
    a.prototype.initPages = function(g, e, d) {
        var f = this;
        this.setPage(g,
            function() {
                if (e) {
                    e(g)
                }
                if (g > 0) {
                    setTimeout(function() {
                            f.initPages(g - 1, e, d)
                        },
                        0)
                } else {
                    if (d) {
                        b.log("Grid complete");
                        d()
                    }
                }
            })
    };
    a.prototype.draw = function() {
        var f = b.Effect.autoEnhance(this.source),
            h,
            g;
        try {
            this.gridContext2D.drawImage(this.source, 0, 0, this.itemWidth, this.itemHeight)
        } catch (d) {}
        if (this.effects) {
            for (g = 9; g--;) {
                h = this.effects[g];
                if (!h.fpsGrid) {
                    h.mainUniforms.mult = f.mult;
                    h.mainUniforms.offset = f.offset;
                    h.draw()
                }
                h.fpsGrid++;
                h.fpsGrid %= Math.ceil(30 / h.fps)
            }
        }
    };
    a.prototype.getEffectID = function(d) {
        return this.effects ? this.effects[c(Math.floor(d), 0, 9)].id : ""
    };
    a.prototype.setPage = function(f, h) {
        var g, d;
        this.page = c(Math.floor(f), 0, this.totalPages);
        if (this.effects) {
            for (d = 9; d--;) {
                g = this.effects[d];
                if (g) {
                    g.setEffect(g.getEffectID(this.page * 9 + d))
                }
            }
        }
        if (h) {
            h(f)
        }
        b.log("Grid page", f)
    };
    a.prototype.previousPage = function() {
        this.page--;
        if (this.page < 0) {
            this.page = this.totalPages - 1
        }
        this.setPage(this.page)
    };
    a.prototype.nextPage = function() {
        this.page++;
        this.page %= this.totalPages;
        this.setPage(this.page)
    };
    a.prototype.useMirror = function(e) {
        if (this.effects) {
            for (var d = 0; d < 9; d++) {
                this.effects[d].useMirror(e)
            }
        }
    };
    a.prototype.useSquare = function(e) {
        if (this.effects) {
            for (var d = 0; d < 9; d++) {
                this.effects[d].useSquare(e)
            }
        }
    };
    a.prototype.destroy = function() {
        if (this.effects) {
            for (var d = this.effects.length; d--;) {
                if (this.effects[d]) {
                    this.effects[d].destroy();
                    this.effects[d] = null
                }
            }
        }
        this.effects = null;
        this.gridContext2D = null
    };
    return a
}(WebcamToy));
WebcamToy.Audio = (function(c) {
    var b = {},
        d = {},
        e = ["countdown", "capture"];

    function a(f) {
        var g = new window.Audio();
        g.src = c.Services.assetsURL + "audio/" + f + ".ogg";
        d[f] = g
    }
    b.playTrack = function(g, f) {
        if (!!window.Audio) {
            setTimeout(function() {
                    if (d[g]) {
                        d[g].play()
                    }
                },
                f || 0)
        }
    };
    b.loadAudio = function() {
        if (!!window.Audio) {
            for (var f = e.length; f--;) {
                a(e[f])
            }
        }
    };
    return b
}(WebcamToy));
WebcamToy.Camera = (function() {
    var h = {},
        c = document.createElement("video"),
        m,
        b,
        d,
        i;
    navigator.getUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    h.hasGetUserMedia = (function() {
        return !!navigator.getUserMedia_ || !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    })();
    h.hasSecureAccess = (function() {
        var n;
        try {
            n = localStorage.getItem("secureAccess")
        } catch (o) {}
        return !!n
    })();

    function l(n) {
        WebcamToy.log("Infobar shown");
        k()
    }

    function k() {
        $(window).off("resize", l);
        clearTimeout(d)
    }

    function f(n) {
        k();
        if (c) {
            c.src = undefined
        }
        if (c && c.mozSrcObject) {
            c.mozSrcObject = undefined
        }
        if (m) {
            m(c, "", n || "Error")
        }
    }

    function a(n) {
        k();
        if (typeof n === "object") {
            if (n.name) {
                n = n.name
            } else {
                if (n.code === 1 || n.PERMISSION_DENIED) {
                    n = "PermissionDeniedError"
                } else {
                    n = JSON.stringify(n)
                }
            }
        }
        switch (n) {
            case "AbortError":
            case "PERMISSION_DENIED":
            case "Permission Denied":
            case "PermissionDeniedError":
            case "PermissionDismissedError":
                n = "Camera access denied";
                break;
            case "DevicesNotFoundError":
            case "NO_DEVICES_FOUND":
            case "NotFoundError":
            case "NotFoundError: The object can not be found here.":
                n = "Camera not found";
                break;
            case "CONSTRAINT_NOT_SATISFIED":
            case "ConstraintNotSatisfiedError":
            case "HARDWARE_UNAVAILABLE":
            case "InternalError":
            case "InvalidSecurityOriginError":
            case "InvalidStateError":
            case "MANDATORY_UNSATISFIED_ERROR":
            case "NOT_SUPPORTED_ERROR":
            case "SecurityError":
            case "NotAllowedError":
            case "OverconstrainedError":
            case "SourceUnavailableError":
            case "Starting video failed":
            case "TabCaptureError":
            case "TrackStartError":
                n = "Camera unavailable";
                break
        }
        if (b) {
            b(n)
        } else {
            f(n)
        }
    }

    function e(n) {
        n.forEach(function(o) {
            if (o.kind === "videoinput") {
                i = o.label;
                return
            }
        })
    }

    function g() {
        m(c, i);
        if (WebcamToy.ua.chrome && WebcamToy.Services.scheme === "https") {
            try {
                localStorage.setItem("secureAccess", true)
            } catch (n) {}
        }
    }

    function j(p) {
        var q = window.URL || window.webkitURL;
        k();
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices && window.Promise) {
                navigator.mediaDevices.enumerateDevices()["then"](e)
            } else {
                if (p && p.getVideoTracks) {
                    var n = p.getVideoTracks();
                    if (n && n.length > 0) {
                        i = n[0].label
                    }
                }
            }
        } catch (o) {}
        if (navigator.mozGetUserMedia) {
            try {
                c.src = q ? q.createObjectURL(p) : p;
                c.mozSrcObject = p;
                c.play()
            } catch (o) {
                f(o || "Video error")
            }
            if (m) {
                setTimeout(g, 150)
            }
        } else {
            $(c).on("canplay",
                function() {
                    $(this).off("canplay");
                    if (m) {
                        setTimeout(g, 150)
                    }
                });
            try {
                if (!c.src) {
                    c.src = q ? q.createObjectURL(p) : p;
                    c.loop = c.muted = true;
                    c.load()
                }
            } catch (o) {
                f(o || "Video error")
            }
        }
    }
    h.getCamera = function(s, o) {
        if (c.src || c.mozSrcObject) {
            return
        }
        m = s;
        b = o;
        c.onerror = function(t) {
            c.onerror = null;
            f(t || "Video error")
        };
        var p = WebcamToy.ua.chrome && WebcamToy.ua.chromeVersion < 42;
        if (p) {
            k();
            $(window).resize(l)
        }
        d = setTimeout(function() {
                a({
                    name: "Camera timeout"
                })
            },
            p ? 7000 : 15000);
        if (h.hasGetUserMedia) {
            var r = {
                audio: false,
                video: {
                    width: {
                        ideal: 640
                    },
                    height: {
                        ideal: 480
                    },
                    facingMode: "user"
                }
            };
            if (WebcamToy.ua.chrome) {
                r = {
                    audio: false,
                    video: {
                        mandatory: {
                            minAspectRatio: 1.25,
                            maxAspectRatio: 1.6
                        },
                        optional: [{
                                minWidth: 960
                            },
                            {
                                minHeight: 720
                            },
                            {
                                maxWidth: 960
                            },
                            {
                                maxHeight: 720
                            }
                        ]
                    }
                }
            }
            try {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.Promise) {
                    navigator.mediaDevices.getUserMedia(r)["then"](j)["catch"](a)
                } else {
                    navigator.getUserMedia_(r, j, a)
                }
            } catch (q) {
                try {
                    navigator.getUserMedia_("video", j, a)
                } catch (n) {
                    f(n || "Camera not accessible")
                }
            }
            WebcamToy.log("getUserMedia")
        } else {
            f("Camera not accessible")
        }
    };
    return h
}());
(function() {
    var a = 0,
        b = 0,
        c = ["ms", "moz", "webkit", "o"];
    while (a < c.length && !window.requestAnimationFrame) {
        window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[c[a] + "CancelAnimationFrame"] || window[c[a] + "CancelRequestAnimationFrame"];
        a++
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(h, e) {
            var d = new Date().getTime(),
                f = Math.max(0, 1000 / 60 - d + b),
                g = setTimeout(function() {
                        h(d + f)
                    },
                    f);
            b = d + f;
            return g
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(d) {
            clearTimeout(d)
        }
    }
}());
$.extend($.easing, {
    easeInQuad: function(e, f, a, h, g) {
        return h * (f /= g) * f + a
    },
    easeOutQuad: function(e, f, a, h, g) {
        return -h * (f /= g) * (f - 2) + a
    },
    easeInOutQuad: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f + a
        }
        return -h / 2 * ((--f) * (f - 2) - 1) + a
    }
});
$.fn.buttonClick = function(a) {
    if (WebcamToy.Capabilities.touch) {
        return this.each(function() {
            $(this).bind("touchend",
                function() {
                    if (a) {
                        a()
                    }
                })
        })
    } else {
        return this.each(function() {
            var b = $(this);
            b.mousedown(function() {
                b.data("pressed", true)
            }).mouseup(function() {
                if (b.data("pressed")) {
                    b.data("pressed", false);
                    if (a) {
                        a()
                    }
                }
            }).mouseout(function() {
                b.data("pressed", false)
            });
            this.onselectstart = function(c) {
                if (c) {
                    c.preventDefault()
                }
            };
            this.oncontextmenu = function(c) {
                if (c) {
                    c.preventDefault()
                }
            }
        })
    }
};
$.fn.removeButtonClick = function(a) {
    return this.each(function() {
        $(this).unbind("mousedown mouseup mouseout touchend");
        this.onselectstart = null
    })
};
WebcamToy.UI = (function(R) {
    var bY = {},
        b3 = {
            capturing: false,
            sharing: false,
            grid: false,
            gridLoaded: false,
            zooming: false,
            useCameraFlash: true,
            useCountdown: true,
            photoSaved: false,
            albumLoaded: false,
            destroyed: false,
            shareService: "",
            saveCount: 1,
            saveFilename: "",
            photoTextNum: 0,
            photoCommentNum: 0,
            postAttempt: 0,
            countdown: 0,
            quadCountdown: 0,
            restoreCount: 0
        },
        a6,
        U = 0,
        v,
        a1,
        aP,
        g,
        aZ,
        ak,
        bk,
        J,
        bq,
        bA,
        V = 105,
        bv = false,
        aD = $("#toy"),
        b7 = $("#toy-intro"),
        b9 = $("#toy-ui"),
        av = $("#toy-view"),
        ab = $("#toy-grid"),
        N = $("#toy-main"),
        b1 = $("#toy-view canvas"),
        af = $("#grid-ui"),
        a9 = $("#grid-view canvas"),
        bM = $("#grid-view p"),
        bZ = $("#settings form"),
        bc = $("#setting-mirror"),
        n = $("#setting-square"),
        a7 = $("#setting-countdown"),
        l = $("#setting-flash"),
        F = $("#setting-full-screen"),
        be = $("#button-settings"),
        aK = $("#button-previous"),
        bV = $("#button-next"),
        aY = $("#button-up"),
        bs = $("#button-down"),
        K = $("#button-effects"),
        i = $("#button-effects .loading"),
        au = $("#button-effects .loading span"),
        aE = $("#button-capture"),
        r = $("#button-back"),
        Q = $("#button-save"),
        w = $("div.button.facebook"),
        bO = $("a.button.facebook"),
        T = $("div.button.twitter"),
        aT = $("a.button.twitter"),
        aH = $("div.button.tumblr"),
        cc = $("a.button.tumblr"),
        a0 = $("div.button.vk"),
        b8 = $("a.button.vk"),
        aB = $("div.button.logout"),
        b6 = $("#capture-text"),
        y = $("#capture-quad-text"),
        ax = $("#toy-countdown"),
        bl = $("#prompt-back"),
        Y = $("#prompt-discard"),
        bU = $("#prompt-save"),
        s = $("#toy-share-ui footer"),
        c = $("#prompt-login"),
        b5 = $("#prompt-login span"),
        bP = $("#prompt-facebook-logout"),
        o = $("#prompt-facebook-post"),
        bF = $(".button.facebook .share-posting"),
        aW = bP.text(),
        z = o.text(),
        bE = bF.text(),
        ae = $("#prompt-twitter-logout"),
        bh = $("#prompt-twitter-post"),
        bd = $(".button.twitter .share-posting"),
        B = ae.text(),
        aF = bh.text(),
        aX = bd.text(),
        H = $("#prompt-tumblr-logout"),
        aC = $("#prompt-tumblr-post"),
        am = $(".button.tumblr .share-posting"),
        aA = H.text(),
        ca = aC.text(),
        aI = am.text(),
        A = $("#prompt-vk-logout"),
        bJ = $("#prompt-vk-post"),
        ar = $(".button.vk .share-posting"),
        ag = A.text(),
        aM = bJ.text(),
        W = ar.text(),
        p = $("#photo"),
        M = $("#photo img"),
        aV = $("#photo form"),
        a4 = $('#photo input[type="text"]'),
        bK = a4[0],
        bz = bK && a4.attr("data-alt").split("|"),
        bn = $("#photo p"),
        X = $('#photo input[type="hidden"]'),
        ah = R.ua.mobile;

    function al(ci, cj, ch, ck, cg) {
        var cf = cg ? "fade-fast" : "fade-slow";
        cj.show().addClass(cf);
        bq = setTimeout(function() {
                cj.css("opacity", ci);
                bq = setTimeout(function() {
                        cj.removeClass(cf);
                        if (!ci) {
                            cj.hide()
                        }
                        if (ck) {
                            ck()
                        }
                    },
                    cg ? 210 : 410)
            },
            ch || 0)
    }

    function aa() {
        J = requestAnimationFrame(I)
    }

    function I() {
        if (!v.paused) {
            if (b3.grid) {
                bk = setTimeout(aa, 1000 / 30);
                aP.draw()
            } else {
                bk = setTimeout(aa, 1000 / a1.fps);
                a1.autoEnhance();
                a1.draw()
            }
        }
    }

    function a5() {
        a1.quadPos = b3.quadCountdown = a1.isQuad ? 4 : 0;
        if (b3.quadCountdown) {
            b6.hide();
            y.show();
            aE.addClass("quad")
        } else {
            y.hide();
            b6.show();
            aE.removeClass("quad")
        }
        try {
            a1.draw()
        } catch (cf) {}
        bZ.hide();
        $("#button-effects .effect").hide();
        $("#button-effects .effect-" + a1.id).show();
        R.log("Effect", a1.id)
    }

    function bB() {
        if (!b1 || !v) {
            return
        }
        var cf = aD.width(),
            ck = aD.height(),
            cj = a1.square,
            ci = Math.ceil;
        if (b3.grid && a9) {
            var cl = false,
                ch = parseInt(af.css("bottom"), 10) < 26 ? 50 : 75,
                cm = Math.floor(cf / 3 - 25),
                cg = a1.square ? cm : cm / ak;
            a9.stop(true, false).each(function() {
                var co = (ck - ch - (ck < 711 ? 85 : 92)) / 3,
                    cn = a1.square ? co - 2 : co * ak;
                if (cn > cm) {
                    cn = cm;
                    co = cg;
                    cl = true
                }
                $(this).css({
                    "margin-left": a1.square ? ci((co - 2 - (co * ak)) / 2) : 0,
                    width: ci(co * ak),
                    height: ci(co)
                }).parent().stop(true, false).css({
                    "margin-left": 0,
                    "margin-bottom": 0,
                    width: ci(cn),
                    height: ci(co)
                })
            });
            $("#grid-view>div").css("margin-top", cl ? Math.max(2, (ck - ch - cg * 3 - 82) / 2) : "")
        } else {
            if (cf / ck > (cj ? 1 : ak)) {
                av.css({
                    width: cj ? ck - 2 : ck * ak,
                    height: ck,
                    "margin-left": cj ? (ck - 2) / -2 : ck * ak / -2,
                    "margin-top": ck / -2
                });
                b1.css({
                    width: ck * ak,
                    height: ck,
                    "margin-left": cj ? (ck - ck * ak - 2) / 2 : 0
                })
            } else {
                av.css({
                    width: cf,
                    height: cj ? cf : cf / ak,
                    "margin-left": cf / -2,
                    "margin-top": cj ? cf / -2 : cf / ak / -2
                });
                b1.css({
                    width: cj ? cf * ak : cf,
                    height: cj ? cf : cf / ak,
                    "margin-left": cj ? (cf - cf * ak) / 2 : 0
                })
            }
        }
    }

    function bg() {
        if (b3.capturing || b3.sharing || b3.grid) {
            return
        }
        a1.previousEffect();
        a5()
    }

    function bf() {
        if (b3.capturing || b3.sharing || b3.grid) {
            return
        }
        a1.nextEffect();
        a5()
    }

    function bQ() {
        if (b3.grid) {
            aP.previousPage();
            ba()
        }
    }

    function ao() {
        if (b3.grid) {
            aP.nextPage();
            ba()
        }
    }

    function aG() {
        if (!b3.sharing) {
            v.play();
            if (a1) {
                a1.draw()
            }
            clearTimeout(bk);
            cancelAnimationFrame(J);
            I()
        }
    }

    function P() {
        if (b3.capturing || b3.sharing) {
            return
        }
        a1.useMirror(!a1.mirror);
        if (aP) {
            aP.useMirror(a1.mirror)
        }
        if (!b3.grid) {
            a1.draw()
        }
    }

    function a2() {
        if (b3.capturing || b3.sharing) {
            return
        }
        a1.useSquare(!a1.square);
        aP.useSquare(a1.square);
        if (!b3.grid) {
            a1.draw()
        }
        bB()
    }

    function bw() {
        if (b3.capturing || b3.sharing || b3.grid) {
            return
        }
        b3.useCountdown = !b3.useCountdown
    }

    function bD() {
        if (b3.capturing || b3.sharing || b3.grid) {
            return
        }
        b3.useCameraFlash = !b3.useCameraFlash
    }

    function az() {
        var ch, cf, cg = a9.parent().eq(a1.effectNum - aP.page * 9);
        if (!cg.length) {
            cg = a9.parent().eq(4)
        }
        if (!cg.length) {
            return null
        }
        ch = aD.offset();
        cf = cg.offset();
        return {
            left: cf.left - ch.left,
            top: cf.top - ch.top,
            width: cg.width(),
            height: cg.height()
        }
    }

    function O() {
        var cg = Math.floor(a1.effectNum / 9);
        aG();
        if (b3.grid) {
            aD.removeClass("wait");
            bB();
            bZ.hide();
            al(0, b9, 0, null, true);
            setTimeout(function() {
                    if (aP.page !== cg) {
                        aP.setPage(cg)
                    }
                    ba();
                    ab.show();
                    var ci = az();
                    if (!ci) {
                        av.hide();
                        af.show();
                        return
                    }
                    af.hide().css("opacity", 0);
                    av.removeClass("toy-shadow").addClass("toy-zoom-out");
                    b1.addClass("toy-zoom-out");
                    setTimeout(function() {
                            av.css({
                                width: ci.width,
                                height: ci.height,
                                "margin-left": ci.left - aD.width() / 2,
                                "margin-top": ci.top - aD.height() / 2
                            });
                            b1.css({
                                width: a1.square ? ci.width * ak : ci.width,
                                height: ci.height,
                                "margin-left": a1.square ? (ci.width - ci.width * ak) / 2 : 0
                            });
                            setTimeout(function() {
                                    av.removeClass("toy-zoom-out");
                                    b1.removeClass("toy-zoom-out");
                                    al(0, av, 0, null, true);
                                    al(1, af, 210,
                                        function() {
                                            if (!b3.gridLoaded) {
                                                b3.gridLoaded = true;
                                                i.hide();
                                                $("#button-effects .more").show()
                                            }
                                            b3.zooming = false
                                        },
                                        true)
                                },
                                510)
                        },
                        0)
                },
                10)
        } else {
            if (aP.page !== cg) {
                aP.setPage(cg)
            }
            var cf = az();
            if (!cf) {
                b9.show();
                av.show();
                af.hide();
                ab.hide();
                bB();
                a5();
                return
            }
            bB();
            var ch = {
                width: av.width(),
                height: av.height(),
                "margin-left": av.css("margin-left"),
                "margin-top": av.css("margin-top")
            };
            av.show().css({
                opacity: 1,
                width: cf.width,
                height: cf.height,
                "margin-left": cf.left - aD.width() / 2,
                "margin-top": cf.top - aD.height() / 2
            });
            b1.css({
                width: a1.square ? cf.width * ak : cf.width,
                height: cf.height,
                "margin-left": a1.square ? (cf.width - cf.width * ak) / 2 : 0
            });
            al(0, af, 0, null, true);
            setTimeout(function() {
                    av.addClass("toy-zoom-in").css(ch);
                    b1.addClass("toy-zoom-in").css({
                        width: a1.square ? (ch.width * ak) : ch.width,
                        height: ch.height,
                        "margin-left": a1.square ? ((ch.width - ch.width * ak - 2) / 2) : 0
                    });
                    setTimeout(function() {
                            av.removeClass("toy-zoom-in").addClass("toy-shadow-fade toy-shadow");
                            b1.removeClass("toy-zoom-in");
                            ab.hide();
                            bB();
                            al(1, b9, 0, null, true);
                            setTimeout(function() {
                                    av.removeClass("toy-shadow-fade");
                                    b3.zooming = false
                                },
                                210)
                        },
                        410)
                },
                0);
            a5()
        }
    }

    function Z() {
        if (b3.capturing || b3.sharing || b3.zooming) {
            return
        }
        b3.grid = !b3.grid;
        b3.zooming = true;
        R.log("Grid", b3.grid ? "show" : "hide");
        if (b3.gridLoaded) {
            O()
        } else {
            v.pause();
            aD.addClass("wait");
            if (aP) {
                $("#button-effects p").hide();
                au.text("0%");
                i.show();
                R.log("Grid init");
                setTimeout(function() {
                        aP.initPages(aP.totalPages,
                            function(cf) {
                                au.text((Math.round(Math.max(0, Math.min(1, (aP.totalPages - cf) / aP.totalPages)) * 90 + 10)) + "%")
                            },
                            O)
                    },
                    0)
            } else {
                O()
            }
        }
    }

    function h() {
        if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        } else {
            if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else {
                if (document.mozExitFullScreen) {
                    document.mozExitFullScreen()
                } else {
                    if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen()
                    } else {
                        if (document.exitFullScreen) {
                            document.exitFullScreen()
                        } else {
                            if (document.exitFullscreen) {
                                document.exitFullscreen()
                            }
                        }
                    }
                }
            }
        }
    }

    function bT() {
        var cf = aD[0];
        if (cf.webkitRequestFullScreen) {
            cf.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
        } else {
            if (cf.mozRequestFullScreen) {
                cf.mozRequestFullScreen()
            } else {
                if (cf.requestFullScreen) {
                    cf.requestFullScreen()
                } else {
                    if (cf.requestFullscreen) {
                        cf.requestFullscreen()
                    }
                }
            }
        }
    }

    function ce() {
        return document.webkitIsFullScreen || document.mozFullScreen || document.webkitFullscreenElement || document.mozFullScreenElement || document.fullScreenElement || document.fullscreenElement
    }

    function bi() {
        if (ce()) {
            h()
        } else {
            bT()
        }
    }

    function bG() {
        return b3.saveFilename + b3.saveCount + ".jpg"
    }

    function bo() {
        setTimeout(function() {
                Q.removeAttr("href")
            },
            50)
    }

    function bt() {
        b3.sharing = false;
        bo();
        R.log("Back");
        if (aV.is(":visible")) {
            al(0, aV, 0,
                function() {
                    aV.hide()[0].reset()
                },
                true)
        }
        aG();
        M.fadeOut(150,
            function() {
                p.hide().css({
                    opacity: 1
                }).removeClass("photo-bottom photo-tweet");
                M.removeClass("rotate-two photo-drop photo-img-tweet photo-shadow").attr("src", "");
                al(0, $("#toy-share-ui"), 50,
                    function() {
                        R.Services.cancelPost();
                        aN();
                        bO.hide();
                        aT.hide();
                        cc.hide();
                        b8.hide();
                        aB.hide();
                        G();
                        bP.hide();
                        ae.hide();
                        H.hide();
                        A.hide();
                        bl.hide();
                        Y.hide();
                        bU.hide();
                        g = null;
                        aZ = null;
                        al(0, aD, 0,
                            function() {
                                aD.removeClass("bg-share").addClass("bg-toy");
                                N.css("opacity", 0);
                                al(1, aD, 0,
                                    function() {
                                        a1.setEffect(a1.id);
                                        a5();
                                        b1.show();
                                        av.show();
                                        al(1, N, 0,
                                            function() {
                                                al(1, b9)
                                            },
                                            true)
                                    },
                                    true)
                            },
                            true)
                    },
                    true)
            })
    }

    function t() {
        if (b3.countdown) {
            var cf = b3.quadCountdown,
                ci = 50,
                ch = 50,
                cg = a1.id === "comicstrip",
                cj = (a1.width - a1.height / 2) / a1.width * 100;
            switch (cf) {
                case 4:
                    ch = cg ? cj / 2 : 25;
                    ci = 25;
                    break;
                case 3:
                    ch = cg ? cj + (100 - cj) / 2 : 75;
                    ci = 25;
                    break;
                case 2:
                    ch = cg ? (100 - cj) / 2 : 25;
                    ci = 75;
                    break;
                case 1:
                    ch = cg ? 100 - cj / 2 : 75;
                    ci = 75;
                    break
            }
            if (cf) {
                ax.addClass("quad")
            } else {
                ax.removeClass("quad")
            }
            ax.css({
                left: ch + "%",
                top: ci + "%",
                visibility: "visible"
            }).html("<p>" + b3.countdown-- + "</p>").show().delay(cf ? 300 : 400).fadeOut(cf ? 100 : 150);
            R.Audio.playTrack("countdown");
            setTimeout(t, cf ? 700 : 900)
        } else {
            if (b3.quadCountdown) {
                b3.quadCountdown--
            }
            setTimeout(at, b3.useCountdown || a1.isQuad ? 200 : 0)
        }
    }

    function ap() {
        b3.photoSaved = true;
        if (Y.is(":visible")) {
            Y.hide();
            bl.show()
        }
    }

    function q() {
        if (w.is(":visible")) {
            w.fadeOut(200)
        } else {
            w.hide()
        }
        if (T.is(":visible")) {
            T.fadeOut(200)
        } else {
            T.hide()
        }
        if (aH.is(":visible")) {
            aH.fadeOut(200)
        } else {
            aH.hide()
        }
        if (a0.is(":visible")) {
            a0.fadeOut(200)
        } else {
            a0.hide()
        }
    }

    function b0() {
        b3.photoTextNum = Math.floor(Math.random() * bz.length);
        b3.photoCommentNum = Math.floor(Math.random() * X.length);
        b3.postAttempt = 0;
        b3.photoSaved = false;
        al(1, $("#toy-share-ui"), 300)
    }

    function bN(cg) {
        var cf = cg || 600,
            ch = Math.round(cf / ak);
        aZ = aZ || a1.getImage(cf, ch)
    }

    function at() {
        b3.capturing = false;
        if (b3.quadCountdown) {
            R.Audio.playTrack("capture", 125);
            if (b3.useCameraFlash) {
                $("#camera-flash").show().delay(250).fadeOut(250, S)
            } else {
                setTimeout(S, 250)
            }
            return
        }
        b3.sharing = true;
        ax.hide();
        switch (b3.shareService) {
            case "facebook":
                w.removeButtonClick().buttonClick(ay).removeClass("button-inactive").show();
                by("post");
                bp("facebook-post");
                C();
                break;
            case "twitter":
                T.removeButtonClick().buttonClick(bC).removeClass("button-inactive").show();
                by("compose");
                bp("twitter-compose");
                C();
                break;
            case "tumblr":
                aH.removeButtonClick().buttonClick(aq).removeClass("button-inactive").show();
                by("post");
                bp("tumblr-compose");
                C();
                break;
            case "vk":
                a0.removeButtonClick().buttonClick(a3).removeClass("button-inactive").show();
                by("post");
                bp("vk-post");
                C();
                break;
            default:
                ad();
                by("login");
                bp("disclaimer");
                break
        }
        R.Audio.playTrack("capture", 125);
        if (b3.useCameraFlash) {
            $("#camera-flash").show()
        }
        setTimeout(function() {
                if (b3.useCameraFlash) {
                    $("#camera-flash").fadeOut(250, b0)
                } else {
                    b0()
                }
                v.pause();
                g = a1.getImage();
                aZ = null;
                b9.hide();
                b1.hide();
                av.hide();
                aD.removeClass("bg-toy").addClass("bg-share");
                if (!b3.useCameraFlash) {
                    aD.hide().fadeIn(100)
                }
                if (g && a1 && M) {
                    M.attr({
                        src: g.src,
                        width: a1.width,
                        height: a1.height
                    })
                }
                switch (a1.id) {
                    case "cocoa":
                    case "danger":
                    case "retro":
                    case "rose":
                    case "xpro":
                    case "zinc":
                        M.removeClass("photo-white photo-thick");
                        M.addClass("photo-black photo-thin");
                        break;
                    case "fire":
                    case "lsd":
                    case "nightvision":
                        M.removeClass("photo-white photo-thin");
                        M.addClass("photo-black photo-thick");
                        break;
                    case "cocktail":
                    case "comicbook":
                    case "comicstrip":
                    case "envy":
                    case "hazydays":
                    case "magazine":
                    case "rainbow":
                        M.removeClass("photo-black photo-thick");
                        M.addClass("photo-white photo-thin");
                        break;
                    case "glaze":
                    case "watercolor":
                        M.removeClass("photo-black photo-thick photo-thin");
                        break;
                    default:
                        M.removeClass("photo-black photo-thin");
                        M.addClass("photo-white photo-thick")
                }
            },
            b3.useCameraFlash ? 250 : 0);
        setTimeout(function() {
                if (b3.useCameraFlash) {
                    p.show()
                } else {
                    p.fadeIn(100)
                }
                M.show().css("margin-top", -60);
                setTimeout(function() {
                        M.addClass("rotate-two photo-drop").css("margin-top", 0);
                        setTimeout(function() {
                                M.addClass("photo-shadow");
                                R.trackEvent("Photo", "Capture", a1.id);
                                R.log("Photo", "Capture", a1.id)
                            },
                            250)
                    },
                    b3.useCameraFlash ? 100 : 0)
            },
            200)
    }

    function S() {
        if (b3.capturing || b3.sharing || b3.grid) {
            return
        }
        bZ.hide();
        al(0, b9, 0, null, true);
        if (b3.quadCountdown) {
            a1.quadPos = b3.quadCountdown
        }
        b3.countdown = b3.useCountdown ? 3 : 0;
        b3.capturing = true;
        setTimeout(t, b3.countdown ? 250 : 0)
    }

    function x(cf) {
        return $("#button-effects .effect-" + cf).text()
    }

    function bj(cf) {
        cf = cf.replace(/(^|[-\u2014\s(\["])'/g, "$1\u2018");
        cf = cf.replace(/'/g, "\u2019");
        cf = cf.replace(/(^|[-\u2014\[(\u2018\s])"/g, "$1\u201c");
        cf = cf.replace(/"/g, "\u201d");
        cf = cf.replace(/<3/g, "\u2665");
        cf = cf.replace(/\.\.\./g, "\u2026");
        cf = cf.replace(/(:\)|:\-\)|\=\)|:D|\=D|:3|\(:)/g, "\u263a");
        cf = cf.replace(/(:\(|:\-\(|\=\()/g, "\u2639");
        cf = cf.replace(/WE(B|D)? ?CA(M(E)?|N) ?TOY/g, "WEBCAM TOY");
        cf = cf.replace(/(W|w)(E|e)(b|d)? ?(C|c)(A|a)(m(e)?|n)/g, "$1ebcam");
        return cf.substr(0, V)
    }

    function aw() {
        if (a1.id === "normal") {
            return bz[b3.photoTextNum || 0]
        }
        var cf = x(a1.id),
            cg = cf ? X[b3.photoCommentNum || 0].value.replace("%s", cf) : photoText;
        return bj(cg)
    }

    function ba() {
        bM.each(function(cf) {
            $(this).text(x(aP.getEffectID(cf)))
        })
    }

    function bu(cf, cg, ch) {
        if (ch.length === 3) {
            ch = ""
        } else {
            ch += "."
        }
        cf.text(cg + ch);
        bA = setTimeout(bu, 400, cf, cg, ch)
    }

    function bI() {
        al(0, c, 0, null, true)
    }

    function G() {
        $("#toy-share-ui footer p").hide()
    }

    function bp(cf) {
        G();
        if (cf) {
            $("#prompt-" + cf).show()
        }
    }

    function aN() {
        clearTimeout(bA);
        w.find("p").hide();
        T.find("p").hide();
        aH.find("p").hide();
        a0.find("p").hide()
    }

    function by(ch) {
        var cg, cf;
        aN();
        switch (b3.shareService) {
            case "facebook":
                cg = w;
                cf = bO;
                break;
            case "twitter":
                cg = T;
                cf = aT;
                break;
            case "tumblr":
                cg = aH;
                cf = cc;
                break;
            case "vk":
                cg = a0;
                cf = b8;
                break;
            default:
                $(".button .share-login").show();
                return
        }
        if (ch === "posted") {
            cg.hide();
            cf.show()
        } else {
            cf.hide();
            cg.show();
            if (ch) {
                cg.find(".share-" + ch).show()
            }
        }
    }

    function ad() {
        $(b5.hide()[Math.floor(Math.random() * b5.length)]).show()
    }

    function br() {
        b3.shareService = "";
        b3.postAttempt = 0;
        w.fadeOut(200);
        bO.fadeOut(200);
        T.fadeOut(200);
        aT.fadeOut(200);
        aH.fadeOut(200);
        cc.fadeOut(200);
        a0.fadeOut(200);
        b8.fadeOut(200);
        aB.fadeOut(200);
        bP.fadeOut(100);
        ae.fadeOut(100);
        H.fadeOut(100);
        A.fadeOut(100);
        G();
        al(0, s, 0,
            function() {
                aN();
                w.removeClass("share-center button-inactive").addClass("share").removeButtonClick().delay(250).fadeIn(400).buttonClick(b);
                T.removeClass("share-center button-inactive").addClass("share").removeButtonClick().delay(250).fadeIn(400).buttonClick(cb);
                aH.removeClass("share-center button-inactive").addClass("share").removeButtonClick().delay(250).fadeIn(400).buttonClick(bm);
                a0.removeClass("share-center button-inactive").addClass("share").removeButtonClick().delay(250).fadeIn(400).buttonClick(u);
                ad();
                by("login");
                bp("disclaimer");
                al(1, s, 250, null, true);
                al(1, c, 250, null, true)
            },
            true)
    }

    function C() {
        aB.removeClass("button-inactive").addClass("active").show()
    }

    function bW(ch) {
        var cg = "",
            cf = "";
        if (ch && ch.error) {
            cg = ch.error.message;
            cf = ch.error.type
        } else {
            cg = ch
        }
        if (cg === "OK") {
            return
        }
        if (b3.postAttempt < 1) {
            b3.postAttempt++
        } else {
            if (/oauth/i.test(cf) || /oauth/i.test(cg)) {
                R.Services.facebookLogout();
                br();
                return
            } else {
                bp("facebook-error");
                f()
            }
        }
        by("error");
        C();
        w.removeClass("button-inactive").buttonClick(ay);
        R.error("Facebook post error" + (cf ? ": " + cf : "") + (cg ? ": " + cg : ""))
    }

    function aU() {
        by("posted");
        bp("facebook-posted");
        C();
        R.trackEvent("Photo", "Facebook", a1.id);
        R.log("Photo", "Facebook", a1.id);
        b3.postAttempt = 0;
        ap()
    }

    function ay() {
        by("posting");
        G();
        w.removeButtonClick().addClass("button-inactive");
        aB.removeClass("active").addClass("button-inactive");
        bu(bF, bE, "...");
        R.log("Photo", "Facebook post", a1.id);
        R.Services.facebookPost({
                image: g,
                message: aw()
            },
            aU, bW)
    }

    function ac() {
        if (!b3.sharing || b3.shareService !== "facebook") {
            return
        }
        if (b3.albumLoaded) {
            by("post");
            w.removeButtonClick().buttonClick(ay).removeClass("button-inactive")
        } else {
            by("loading");
            w.removeButtonClick().addClass("button-inactive")
        }
    }

    function bS() {
        if (b3.shareService === "facebook") {
            return
        }
        b3.shareService = "facebook";
        bI();
        G();
        q();
        al(0, s, 0,
            function() {
                b3.albumLoaded = false;
                ac();
                w.hide().delay(250).fadeIn(400, f);
                bp("facebook-post");
                w.removeClass("share").addClass("share-center");
                aB.removeClass("twitter tumblr vk button-inactive").addClass("facebook active").delay(250).fadeIn(400);
                if (s.data("hover")) {
                    al(1, s, 250, null, true)
                }
            },
            true)
    }

    function aj(cg, cf, ch) {
        if (cg) {
            bO.attr("href", cg);
            if (cf === "everyone") {
                R.trackEvent("Photo", "Facebook album", cg);
                R.log("Photo", "Facebook album", cg)
            }
        }
        b3.albumLoaded = !!ch;
        ac()
    }

    function f() {
        R.Services.facebookAlbum(aj, aD.attr("data-fb-album-name"))
    }

    function aO(cf) {
        if (cf && b3.sharing) {
            bS()
        }
    }

    function b() {
        R.Services.onFacebookAuth = aO;
        R.Services.facebookAuth()
    }

    function m(cf) {
        if (cf && cf.fullName) {
            o.text(z.replace("%s", cf.fullName));
            bP.text(aW.replace("%s", cf.fullName));
            $("#prompt-facebook-post span,#prompt-facebook-logout span").show()
        }
    }

    function bH(cf) {
        if (cf && typeof cf === "object") {
            cf = cf.statusText || JSON.stringify(cf)
        }
        if (/blacklist/i.test(cf)) {
            R.Services.twitterLogout();
            br();
            return
        }
        if (b3.postAttempt < 2) {
            b3.postAttempt++
        } else {
            if (/oauth/i.test(cf)) {
                R.Services.twitterLogout();
                br();
                return
            } else {
                bp("twitter-error")
            }
        }
        by("error");
        C();
        T.removeClass("button-inactive").buttonClick(k);
        bK.disabled = false;
        R.error("Twitter post error" + (cf ? ": " + cf : ""))
    }

    function bR(cf) {
        aZ = null;
        by("posted");
        bp("twitter-posted");
        C();
        if (cf) {
            $("a.twitter").attr("href", cf)
        }
        R.trackEvent("Photo", "Twitter", a1.id);
        R.log("Photo", "Twitter", a1.id);
        b3.postAttempt = 0;
        ap()
    }

    function k() {
        bK.blur();
        bK.disabled = true;
        by("posting");
        G();
        T.removeButtonClick().addClass("button-inactive");
        aB.removeClass("active").addClass("button-inactive");
        bu(bd, aX, "...");
        R.log("Photo", "Twitter post", a1.id);
        R.Services.twitterPost({
                image: g,
                message: bj(a4.val()) || aw()
            },
            bR, bH)
    }

    function b2() {
        if (b3.shareService === "twitter") {
            return
        }
        b3.shareService = "twitter";
        bI();
        G();
        q();
        al(0, s, 0,
            function() {
                by("compose");
                T.hide().delay(250).fadeIn(400);
                bp("twitter-compose");
                T.removeClass("share").addClass("share-center");
                aB.removeClass("facebook tumblr vk button-inactive").addClass("twitter active").delay(250).fadeIn(400);
                if (s.data("hover")) {
                    al(1, s, 250, null, true)
                }
                T.removeButtonClick().buttonClick(bC)
            },
            true)
    }

    function ai() {
        var ch = bj(a4.val());
        if (a4.val() !== ch) {
            var cg = bK.selectionStart + ch.length - a4.val().length + 1;
            bK.focus();
            a4.val("");
            a4.val(ch);
            if (bK.setSelectionRange && cg) {
                bK.setSelectionRange(cg, cg)
            }
        }
        var cf = V - ch.length;
        bn.text(cf).removeClass("short long blur").addClass(a4.is(":focus") ? (cf < 20 ? "short" : "long") : "blur")
    }

    function a8() {
        if (aV.is(":visible")) {
            al(0, aV, 100,
                function() {
                    M.addClass("rotate-two");
                    p.removeClass("photo-bottom");
                    bK.blur();
                    a4.val("")
                },
                true)
        }
    }

    function bC() {
        M.removeClass("rotate-two photo-drop").addClass("photo-img-tweet");
        p.addClass("photo-bottom photo-tweet");
        a4.attr("placeholder", aw());
        bK.disabled = false;
        aV.css("opacity", 0);
        al(1, aV, 100,
            function() {
                bK.focus();
                ai()
            },
            true);
        T.removeButtonClick().buttonClick(k);
        by("post");
        bp("twitter-post")
    }

    function b4(cf) {
        if (cf) {
            bh.text(aF.replace("@", "@" + cf));
            ae.text(B.replace("@", "@" + cf));
            if (b3.sharing) {
                b2()
            }
        }
    }

    function cb() {
        R.Services.onTwitterAuth = b4;
        R.Services.twitterAuth()
    }

    function an(cf) {
        if (cf && typeof cf === "object") {
            cf = cf.statusText || JSON.stringify(cf)
        }
        if (b3.postAttempt < 2) {
            b3.postAttempt++
        } else {
            if (/oauth/i.test(cf)) {
                R.Services.tumblrLogout();
                br();
                return
            } else {
                bp("tumblr-error")
            }
        }
        by("error");
        C();
        aH.removeClass("button-inactive").buttonClick(aq);
        R.error("Tumblr post error" + (cf ? ": " + cf : ""))
    }

    function aQ(cf) {
        aZ = null;
        by("posted");
        bp("tumblr-posted");
        C();
        if (cf) {
            $("a.tumblr").attr("href", cf)
        }
        R.trackEvent("Photo", "Tumblr", a1.id);
        R.log("Photo", "Tumblr", a1.id);
        b3.postAttempt = 0;
        ap()
    }

    function aq() {
        bN(a1.square ? 500 * ak : 500);
        by("posting");
        G();
        aH.removeButtonClick().addClass("button-inactive");
        aB.removeClass("active").addClass("button-inactive");
        bu(am, aI, "...");
        R.log("Photo", "Tumblr post", a1.id);
        R.Services.tumblrPost({
                image: aZ,
                message: aw(),
                effect: a1.id
            },
            aQ, an)
    }

    function j() {
        if (b3.shareService === "tumblr") {
            return
        }
        b3.shareService = "tumblr";
        bI();
        G();
        q();
        al(0, s, 0,
            function() {
                by("post");
                aH.hide().delay(250).fadeIn(400);
                bp("tumblr-post");
                aH.removeClass("share").addClass("share-center");
                aB.removeClass("facebook twitter vk button-inactive").addClass("tumblr active").delay(250).fadeIn(400);
                if (s.data("hover")) {
                    al(1, s, 250, null, true)
                }
                aH.removeButtonClick().buttonClick(aq)
            },
            true)
    }

    function E(cf) {
        if (cf && b3.sharing) {
            j()
        }
    }

    function bm() {
        R.Services.onTumblrAuth = E;
        R.Services.tumblrAuth()
    }

    function aS(ch) {
        var cg = "",
            cf = "";
        if (ch && ch.error) {
            cg = ch.error.message;
            cf = ch.error.type
        } else {
            cg = ch
        }
        if (b3.postAttempt < 2) {
            b3.postAttempt++
        } else {
            if (/oauth/i.test(cf) || /oauth/i.test(cg)) {
                R.Services.vkLogout();
                br();
                return
            } else {
                bp("vk-error")
            }
        }
        by("error");
        C();
        a0.removeClass("button-inactive").buttonClick(a3);
        R.error("VK post error" + (cf ? ": " + cf : "") + (cg ? ": " + cg : ""))
    }

    function cd(cf) {
        aZ = null;
        by("posted");
        bp("vk-posted");
        C();
        if (cf) {
            $("a.vk").attr("href", cf)
        }
        R.trackEvent("Photo", "VK", a1.id);
        R.log("Photo", "VK", a1.id);
        b3.postAttempt = 0;
        ap()
    }

    function a3() {
        bN();
        by("posting");
        G();
        a0.removeButtonClick().addClass("button-inactive");
        aB.removeClass("active").addClass("button-inactive");
        bu(ar, W, "...");
        R.log("Photo", "VK post", a1.id);
        R.Services.vkPost({
                image: aZ,
                message: aw()
            },
            cd, aS)
    }

    function aJ() {
        if (b3.shareService === "vk") {
            return
        }
        b3.shareService = "vk";
        bI();
        G();
        q();
        al(0, s, 0,
            function() {
                by("post");
                a0.hide().delay(250).fadeIn(400);
                bp("vk-post");
                a0.removeClass("share").addClass("share-center");
                aB.removeClass("facebook twitter tumblr button-inactive").addClass("vk active").delay(250).fadeIn(400);
                if (s.data("hover")) {
                    al(1, s, 250, null, true)
                }
                a0.removeButtonClick().buttonClick(a3)
            },
            true)
    }

    function bx(cf) {
        if (cf && b3.sharing) {
            aJ()
        }
    }

    function u() {
        R.Services.onVKAuth = bx;
        R.Services.vkAuth()
    }

    function aL(cf) {
        if (cf.css("opacity") === "0") {
            cf.css("opacity", "")
        }
    }

    function aR() {
        aK.buttonClick(bg);
        bV.buttonClick(bf);
        if (ah) {
            return
        }
        b1.click(function() {
            bZ.hide()
        });
        aY.buttonClick(bQ);
        bs.buttonClick(ao);
        K.buttonClick(Z);
        aE.buttonClick(S);
        be.buttonClick(function() {
            bZ.toggle()
        });
        r.buttonClick(bt).hover(function() {
                var cg = b3.photoSaved ? bl : Y;
                if (cg) {
                    aL(cg);
                    cg.stop(true, true).fadeIn(150)
                }
            },
            function() {
                var cg = b3.photoSaved ? bl : Y;
                if (cg) {
                    cg.stop(true, true).delay(100).fadeOut(150)
                }
            });
        w.buttonClick(b);
        T.buttonClick(cb);
        aH.buttonClick(bm);
        a0.buttonClick(u);
        $(".button.share,.button.share-center").hover(function() {
                aL(s);
                s.data("hover", true).stop(true, true).fadeIn(150)
            },
            function() {
                s.data("hover", false).stop(true, true).delay(50).fadeOut(150)
            });
        aB.buttonClick(function() {
            if (aB.hasClass("active")) {
                switch (b3.shareService) {
                    case "facebook":
                        R.Services.onFacebookAuth = null;
                        R.Services.facebookLogout();
                        break;
                    case "twitter":
                        R.Services.onTwitterAuth = null;
                        R.Services.twitterLogout();
                        a8();
                        break;
                    case "tumblr":
                        R.Services.onTumblrAuth = null;
                        R.Services.tumblrLogout();
                        break;
                    case "vk":
                        R.Services.onVKAuth = null;
                        R.Services.vkLogout();
                        break
                }
                br()
            }
        }).hover(function() {
                if (aB.hasClass("active")) {
                    var cg;
                    switch (b3.shareService) {
                        case "facebook":
                            cg = bP;
                            break;
                        case "twitter":
                            cg = ae;
                            break;
                        case "tumblr":
                            cg = H;
                            break;
                        case "vk":
                            cg = A;
                            break
                    }
                    if (cg) {
                        cg.stop(true, true).fadeIn(150,
                            function() {
                                cg.css("opacity", 1)
                            })
                    }
                }
            },
            function() {
                if (aB.hasClass("active")) {
                    var cg;
                    switch (b3.shareService) {
                        case "facebook":
                            cg = bP;
                            break;
                        case "twitter":
                            cg = ae;
                            break;
                        case "tumblr":
                            cg = H;
                            break;
                        case "vk":
                            cg = A;
                            break
                    }
                    if (cg) {
                        cg.stop(true, true).delay(50).fadeOut(150)
                    }
                }
            });
        aV.submit(function(cg) {
            if (cg) {
                cg.preventDefault()
            }
        });
        bp("disclaimer");
        bc.click(P);
        n.click(a2);
        a7.click(bw);
        l.click(bD);
        F.click(bi);
        a9.parent().each(function(cg) {
            $(this).mousedown(function() {
                var cl = 0.92,
                    ck = $(this).find("canvas"),
                    cj = parseFloat(ck.css("height")),
                    ci = a1.square ? cj : parseFloat(ck.css("width")),
                    cm = Math.floor;
                $(this).data("pressed", true).css({
                    width: (ci - (a1.square ? 2 : 0)),
                    height: cj
                }).animate({
                        "margin-left": cm((ci - (ci - (a1.square ? 2 : 0)) * cl) / 2),
                        "margin-bottom": cm((cj - cj * cl) / 2),
                        width: (ci - (a1.square ? 2 : 0)) * cl,
                        height: cj * cl
                    },
                    100, "easeOutQuad");
                ck.css({
                    width: cj * ak,
                    height: cj
                }).animate({
                        "margin-left": a1.square ? cm((cj - cj * ak) * cl / 2) : 0,
                        width: cj * ak * cl,
                        height: cj * cl
                    },
                    100, "easeOutQuad")
            }).mouseup(function(ch) {
                if ($(this).data("pressed")) {
                    ch.stopPropagation();
                    $(this).data("pressed", false);
                    a1.setEffect(aP.getEffectID(cg));
                    if (b3.zooming) {
                        bB()
                    } else {
                        Z()
                    }
                } else {
                    bB()
                }
            }).mouseout(function() {
                if ($(this).data("pressed")) {
                    $(this).data("pressed", false);
                    bB()
                }
            });
            this.onselectstart = function(ch) {
                if (ch) {
                    ch.preventDefault()
                }
            }
        });
        ab.mouseup(function() {
            var cg = false;
            a9.parent().each(function() {
                if ($(this).data("pressed")) {
                    cg = true;
                    $(this).trigger("mouseup")
                }
            });
            if (!cg) {
                bB()
            }
        });
        try {
            bZ[0].oncontextmenu = ab[0].oncontextmenu = av[0].oncontextmenu = function(cg) {
                if (cg) {
                    cg.preventDefault();
                    return false
                }
            }
        } catch (cf) {}
        Q.click(function() {
            $(this).attr("download", bG());
            b3.saveCount++;
            try {
                localStorage.setItem("saveCount", b3.saveCount)
            } catch (cg) {}
            R.trackEvent("Photo", "Save", a1.id);
            R.log("Photo", "Save", a1.id);
            ap()
        }).mousedown(function() {
            if (g && g.src) {
                try {
                    var ck = window.atob(g.src.substring("data:image/jpeg;base64,".length));
                    var ch = new Uint8Array(ck.length);
                    for (var cj = 0,
                            cg = ck.length; cj < cg; cj++) {
                        ch[cj] = ck.charCodeAt(cj)
                    }
                    var ci = new Blob([ch.buffer], {
                        type: "image/jpeg"
                    });
                    $(this).attr("href", URL.createObjectURL(ci))
                } catch (cl) {
                    $(this).attr("href", g.src)
                }
            }
        }).mouseup(bo).mouseout(bo).mouseleave(bo).hover(function() {
                aL(bU);
                bU.stop(true, true).fadeIn(150)
            },
            function() {
                bU.stop(true, true).delay(100).fadeOut(150)
            })
    }

    function bL() {
        if (ah) {
            return
        }
        a4.on("change input focus blur mousedown mouseup", ai);
        jQuery(document).keydown(function(cf) {
            if (b3.sharing) {
                if (a4.is(":focus")) {
                    return
                }
                if (cf.metaKey && cf.keyCode === 8) {
                    bt();
                    return
                }
            }
            if (cf.altKey || cf.ctrlKey || cf.shiftKey || cf.metaKey || b3.zooming) {
                return
            }
            switch (cf.keyCode) {
                case 8:
                    cf.preventDefault();
                    break;
                case 32:
                    if (!b3.grid) {
                        aE.addClass("button-active")
                    }
                    break;
                case 37:
                    if (b3.grid) {
                        aY.addClass("button-active")
                    } else {
                        aK.addClass("button-active")
                    }
                    break;
                case 38:
                    if (b3.grid) {
                        aY.addClass("button-active")
                    }
                    break;
                case 39:
                    if (b3.grid) {
                        bs.addClass("button-active")
                    } else {
                        bV.addClass("button-active")
                    }
                    break;
                case 40:
                    if (b3.grid) {
                        bs.addClass("button-active")
                    }
                    break;
                case 67:
                    if (!b3.grid) {
                        a7.parent().addClass("settings-active")
                    }
                    break;
                case 70:
                    if (!b3.grid) {
                        l.parent().addClass("settings-active")
                    }
                    break;
                case 71:
                    if (!b3.grid) {
                        K.addClass("button-active")
                    }
                    break;
                case 73:
                    if (!b3.grid) {
                        be.addClass("button-active")
                    }
                    break;
                case 77:
                    if (!b3.grid) {
                        bc.parent().addClass("settings-active")
                    }
                    break;
                case 83:
                    if (!b3.grid) {
                        n.parent().addClass("settings-active")
                    }
                    break
            }
        }).keyup(function(cf) {
            if (b3.sharing && a4.is(":focus")) {
                if (cf.keyCode === 13) {
                    k()
                }
                return
            }
            if (cf.altKey || cf.ctrlKey || cf.shiftKey || cf.metaKey || b3.zooming) {
                return
            }
            switch (cf.keyCode) {
                case 8:
                    cf.preventDefault();
                    break;
                case 27:
                    h();
                    break;
                case 32:
                    if (b3.grid) {
                        Z()
                    } else {
                        aE.removeClass("button-active");
                        S()
                    }
                    break;
                case 37:
                    if (b3.grid) {
                        aY.removeClass("button-active");
                        bQ()
                    } else {
                        aK.removeClass("button-active");
                        bg()
                    }
                    break;
                case 38:
                    if (b3.grid) {
                        aY.removeClass("button-active");
                        bQ()
                    }
                    break;
                case 39:
                    if (b3.grid) {
                        bs.removeClass("button-active");
                        ao()
                    } else {
                        bV.removeClass("button-active");
                        bf()
                    }
                    break;
                case 40:
                    if (b3.grid) {
                        bs.removeClass("button-active");
                        ao()
                    }
                    break;
                case 67:
                    if (!b3.grid) {
                        bw();
                        a7.parent().removeClass("settings-active");
                        a7[0].checked = b3.useCountdown
                    }
                    break;
                case 70:
                    if (!b3.grid) {
                        bD();
                        l.parent().removeClass("settings-active");
                        l[0].checked = b3.useCameraFlash
                    }
                    break;
                case 71:
                    K.removeClass("button-active");
                    Z();
                    break;
                case 73:
                    if (!b3.grid) {
                        be.removeClass("button-active");
                        !b3.capturing && !b3.sharing && !b3.grid && bZ.toggle()
                    }
                    break;
                case 77:
                    if (!b3.grid) {
                        bc.parent().removeClass("settings-active")
                    }
                    P();
                    bc[0].checked = a1.mirror;
                    break;
                case 83:
                    if (!b3.grid) {
                        n.parent().removeClass("settings-active")
                    }
                    a2();
                    n[0].checked = a1.square;
                    break
            }
        })
    }

    function a() {
        if (!ah) {
            if (aP) {
                aP.destroy()
            }
            aP = new R.Grid(a9, v, 320, Math.floor(320 / ak))
        }
    }

    function bX(ci) {
        if (v && v.videoWidth && v.videoHeight && v.videoWidth > 2 && v.videoHeight > 2) {
            var cf = v.videoWidth + "x" + v.videoHeight;
            R.trackEvent("Capabilities", "Resolution", cf);
            R.log("Resolution", cf);
            ak = v.videoWidth / v.videoHeight
        } else {
            R.trackEvent("Capabilities", "Resolution", "None");
            R.log("Resolution", "None");
            ak = ah ? 3 / 4 : 4 / 3
        }
        try {
            var ch;
            if (a1) {
                ch = a1.id;
                a1.destroy();
                b1.remove();
                av.prepend("<canvas/>");
                b1 = $("#toy-view canvas")
            }
            a1 = new R.Effect(b1[0], v, 800, Math.floor(800 / ak));
            a1.setEffect(ch);
            a()
        } catch (cg) {
            R.error(cg);
            return
        }
        if (ci) {
            ci()
        }
    }

    function e() {
        clearTimeout(bk);
        cancelAnimationFrame(J);
        if (v) {
            v.pause()
        }
        if (a1) {
            a1.destroyShaders()
        }
        if (b3.grid) {
            if (b3.zooming) {
                b3.zooming = false;
                aD.removeClass("wait");
                $("#button-effects p").show();
                i.hide()
            }
            b3.grid = false;
            O()
        }
        if (b3.gridLoaded) {
            b3.gridLoaded = false;
            a()
        }
        R.log("Effects destroyed")
    }
    bY.destroy = function(cf) {
        b7.stop().css("opacity", 1).show();
        N.stop().hide();
        b9.stop().hide();
        if (b3.destroyed) {
            return
        }
        e();
        jQuery(document).off("keydown keyup");
        b3.destroyed = true;
        R.error(cf)
    };

    function d(cf) {
        cf.preventDefault();
        bY.destroy("WebGL context lost")
    }

    function D() {
        if (!b3.destroyed || b3.restoreCount > 3) {
            return
        }
        bX();
        bL();
        a5();
        bB();
        aG();
        b7.hide();
        N.show();
        b9.show();
        b3.destroyed = false;
        b3.restoreCount++;
        var cf = "WebGL context restored";
        R.trackEvent("Error", cf, "", true);
        R.log(cf)
    }

    function L(cg) {
        var cf = new Image();
        cf.src = R.Services.assetsURL + "images/" + cg
    }
    bY.loadImages = function() {
        var cf = ["bg-wood-light.jpg", "video.svg", "camera.svg", "camera4.svg", "gear.svg", "check.svg", "twitter.svg", "facebook.svg", "power.svg", "bg-linen.jpg"];
        if (R.ua.locale === "ru") {
            cf.push("vk.svg")
        } else {
            cf.push("tumblr.svg")
        }
        for (var cg = 0; cg < cf.length; cg++) {
            L(cf[cg])
        }
    };

    function bb() {
        if (b3.destroyed) {
            return
        }
        if (!a1) {
            R.error("Effects not found");
            return
        }
        if (ah) {
            P()
        } else {
            b3.saveFilename = Q.attr("data-save") || "webcam-toy-photo.jpg";
            b3.saveFilename = b3.saveFilename.substr(0, b3.saveFilename.indexOf("."));
            try {
                b3.saveCount = (parseInt(localStorage.getItem("saveCount"), 10) || 1)
            } catch (cf) {}
            $("#button-effects .effect span").remove();
            bc[0].checked = a1.mirror;
            n[0].checked = a1.square;
            a7[0].checked = b3.useCountdown;
            l[0].checked = b3.useCameraFlash;
            F[0].checked = ce();
            jQuery(document).on("webkitfullscreenchange mozfullscreenchange mozfullscreenerror",
                function() {
                    F[0].checked = ce();
                    bB()
                }).on("visibilitychange webkitvisibilitychange mozvisibilitychange",
                function() {
                    if (v && a1) {
                        if (document.hidden || document.webkitHidden || document.mozHidden) {
                            if (!bv) {
                                bv = true;
                                R.log("App hidden")
                            }
                        } else {
                            if (bv) {
                                bv = false;
                                R.log("App visible");
                                a1.setEffect(a1.id);
                                bB();
                                aG()
                            }
                        }
                    }
                    try {
                        localStorage.setItem("log", R.log())
                    } catch (cg) {}
                });
            av.addClass("toy-shadow");
            R.Services.onFacebookUser = m;
            R.Services.facebookUser()
        }
        a5();
        aR();
        $(window).resize(bB);
        bB();
        aG();
        b7.removeClass("wait");
        if (b3.destroyed) {
            bY.destroy()
        } else {
            al(0, b7, 100,
                function() {
                    if (b3.destroyed) {
                        bY.destroy()
                    } else {
                        al(1, N, 0,
                            function() {
                                if (b3.destroyed) {
                                    bY.destroy()
                                } else {
                                    al(1, b9, 0, bL, true)
                                }
                            },
                            true)
                    }
                },
                true)
        }
    }
    bY.init = function(cf) {
        if (v) {
            return
        }
        v = cf;
        if (window.$) {
            $("#toy-main canvas").on("webglcontextlost", d).on("webglcontextrestored", D)
        }
        R.removeFooter();
        var cg;
        if (v && v.videoWidth) {
            bX(bb)
        } else {
            $(v).on("loadedmetadata",
                function() {
                    if (ak && v.videoWidth && Math.round(v.videoWidth / ak) != v.videoHeight) {
                        clearTimeout(cg);
                        cg = setTimeout(bX, 1000, bb)
                    }
                });
            cg = setTimeout(function() {
                    clearTimeout(cg);
                    if (v && v.videoWidth) {
                        bX(bb)
                    } else {
                        cg = setTimeout(bX, 3000, bb)
                    }
                },
                2000)
        }
    };
    return bY
}(WebcamToy));
WebcamToy.Home = (function(e) {
    var a = {},
        o, j = 0,
        b = 4,
        d, c;

    function l() {
        b++;
        b %= o.length
    }

    function i(q) {
        return e.Services.assetsURL + "photos/" + q + ".jpg"
    }

    function n(r, q) {
        if (r && q && q.img && q.id) {
            r.css("background-image", "url(" + i(q.img) + ")");
            r.attr("href", "https://pic.twitter.com/" + q.id)
        }
    }

    function h(q) {
        if (q && window.$) {
            var r = $("#photo" + (j + 1)),
                s;
            try {
                if (r) {
                    s = r.find("div");
                    if (s && !!s[0]) {
                        if (e.ua.ie || e.ua.firefox) {
                            s.animate({
                                    opacity: 1
                                },
                                200)
                        } else {
                            s.css("opacity", 1)
                        }
                    }
                }
            } catch (t) {}
            d = setTimeout(function() {
                    n(r, q);
                    j++;
                    j %= 4;
                    l();
                    d = setTimeout(function() {
                            try {
                                if (s && !!s[0]) {
                                    if (e.ua.ie || e.ua.firefox) {
                                        s.animate({
                                                opacity: 0
                                            },
                                            200)
                                    } else {
                                        s.css("opacity", 0)
                                    }
                                }
                            } catch (u) {}
                            p()
                        },
                        150)
                },
                210)
        }
    }

    function k() {
        var q = o[b];
        if (!q || !q.img || !q.id || q.img.length !== 15) {
            p();
            return
        }
        var r = new Image();
        r.onload = function() {
            if (e.ua.ie) {
                d = setTimeout(function() {
                        h(q)
                    },
                    1400)
            } else {
                d = setTimeout(h, 1400, q)
            }
        };
        r.onerror = function() {
            l();
            d = setTimeout(p, 100)
        };
        r.src = i(q.img)
    }

    function p(q) {
        try {
            if (!$("#app").is(":visible")) {
                if ($("#home-photos").is(":visible") && $(window).width() > 700) {
                    k()
                } else {
                    d = setTimeout(p, 3000)
                }
            }
        } catch (r) {}
    }

    function f() {
        return (Math.round(Math.random()) - 0.5)
    }

    function g() {
        var q = $("#home-photos").attr("data-json");
        c = $.ajax({
            url: e.Services.assetsURL + "photos/" + (q || "photos") + ".json",
            dataType: "json",
            timeout: 20000,
            error: function() {},
            success: function(t) {
                if (t && t.photos) {
                    o = t.photos.sort(f);
                    for (var s = 0; s < 4; s++) {
                        var r = $("#photo" + (s + 1));
                        n(r, t.photos[s])
                    }
                    setTimeout(function() {
                            try {
                                var u = $("#home-photos div");
                                if (u && !!u[0]) {
                                    if (e.ua.ie || e.ua.firefox) {
                                        u.animate({
                                                opacity: 0
                                            },
                                            200)
                                    } else {
                                        u.addClass("photo-fade").css("opacity", 0)
                                    }
                                }
                            } catch (v) {}
                        },
                        200);
                    d = setTimeout(p, 500)
                }
            }
        })
    }
    a.setFacebookUser = function(q) {
        if (window.$) {
            var r = $("#home-fb").html();
            if (r && q.firstName) {
                $("#home-main").animate({
                        opacity: 0
                    },
                    150,
                    function() {
                        if (window.$) {
                            $("#home-main").html(r.replace("%s", q.firstName)).delay(150).animate({
                                    opacity: 1
                                },
                                150);
                            if (q.id && q.url) {
                                setTimeout(function() {
                                        $("#home-main .fb-pic").attr("href", q.url).css("background-image", "url(https://graph.facebook.com/v" + e.Services.facebookVersion + "/" + q.id + "/picture)")
                                    },
                                    0)
                            } else {
                                $("#home-main .fb-pic").hide()
                            }
                        }
                    })
            }
        }
    };

    function m() {
        if (e.init && window.$) {
            var t = $("#home"),
                q = $("#home-cws"),
                s = $("#home-sponsor"),
                r = $("#home-photos div");
            clearTimeout(d);
            if (c) {
                c.abort()
            }
            if (q) {
                q.fadeOut(200);
                s.fadeOut(200)
            }
            if (r) {
                r.stop()
            }
            if (t) {
                t.delay(50).fadeOut(250,
                    function() {
                        setTimeout(function() {
                                if (q) {
                                    if ($(window).height() > 600) {
                                        s.addClass("no-cws").fadeIn(200,
                                            function() {
                                                s.removeAttr("style")
                                            })
                                    } else {
                                        s.addClass("no-cws").removeAttr("style")
                                    }
                                }
                                setTimeout(function() {
                                        if (e.init) {
                                            e.init()
                                        }
                                    },
                                    30)
                            },
                            30)
                    })
            } else {
                if (q) {
                    q.hide()
                }
                e.init()
            }
        }
    }
    e.removeFooter = function() {
        var q = $("#home-cws,#home-sponsor");
        if (q) {
            if (e.ua.ie) {
                q.hide()
            } else {
                q.remove()
            }
        }
    };
    a.init = function() {
        if ($.fn.buttonClick) {
            $("#button-init").buttonClick(m)
        } else {
            $("#button-init").click(m)
        }
        $("#home-photos a,#home-body a,#home footer a").click(function(q) {
            e.trackEvent("Outbound", q.target.href || q.currentTarget.href)
        });
        $("#home-photos a").click(function(q) {
            e.popup(q, q.target.href || q.currentTarget.href, Math.min(screen.availWidth, 703), Math.min(screen.availHeight - 100, 660), "photowindow")
        });
        if (e.ua.chrome && e.Services.isHosted) {
            $("#home-cws").attr("onclick", "try{chrome.webstore.install();return false;}catch(e){}")
        }
        if (!e.ua.mobile) {
            g()
        }
    };
    return a
}(WebcamToy));