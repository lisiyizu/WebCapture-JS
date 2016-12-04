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