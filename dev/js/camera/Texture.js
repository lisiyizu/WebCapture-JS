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