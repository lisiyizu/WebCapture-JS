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