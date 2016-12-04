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
        //  WebcamToy.log("Infobar shown");
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
            //   WebcamToy.log("getUserMedia")
        } else {
            f("Camera not accessible")
        }
    };
    return h
}());