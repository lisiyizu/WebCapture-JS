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