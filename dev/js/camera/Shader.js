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