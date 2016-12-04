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