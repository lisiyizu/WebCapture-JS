//http://evanw.github.io/glfx.js/glfx.js
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