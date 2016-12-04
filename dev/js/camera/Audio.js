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