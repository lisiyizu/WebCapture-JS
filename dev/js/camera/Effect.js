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