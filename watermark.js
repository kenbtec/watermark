! function(t, e, i) {
    "use strict";

    function a(e, i) { this.element = e, this.settings = t.extend({}, r, i), this._defaults = r, this._name = n, this.init() }
    var n = "watermark",
        r = { path: "watermark.png", text: "", textWidth: 200, textSize: 20, textColor: "white", textBg: "rgba(0, 0, 0, 0.4)", gravity: "se", opacity: 10, margin: 10, outputWidth: "auto", outputHeight: "auto", outputType: "jpeg", done: function(t) { this.src = t }, fail: function() {}, always: function() {} };
    t.extend(a.prototype, {
        init: function() {
            var e = this,
                i = e.element,
                a = e.settings,
                n = { imgurl: a.path, type: "png", cross: !0 },
                r = { imgurl: i.src, cross: !0, type: a.outputType, width: a.outputWidth, height: a.outputHeight };
            0 === a.path.search(/data:image\/(png|jpg|jpeg|gif);base64,/) && (n.cross = !1), 0 === i.src.search(/data:image\/(png|jpg|jpeg|gif);base64,/) && (r.cross = !1);
            var h = t.Deferred();
            t.when(h).done(function(t) { r.wmObj = t, e.imgurltodata(r, function(t) { a.done.call(i, t), a.always.call(i, t) }) }), "" !== a.text && (n.imgurl = e.textwatermark(), n.cross = !1), e.imgurltodata(n, function(t) { h.resolve(t) })
        },
        textwatermark: function() {
            var t = this,
                e = t.settings,
                a = i.createElement("CANVAS"),
                n = a.getContext("2d"),
                r = e.textWidth,
                h = e.textSize + 8;
            return a.width = r, a.height = h, n.fillStyle = e.textBg, n.fillRect(0, 0, r, h), n.fillStyle = e.textColor, n.textAlign = "center", n.font = "500 " + e.textSize + "px Sans-serif", n.fillText(e.text, r / 2, e.textSize + 2), a.toDataURL()
        },
        imgurltodata: function(t, e) {
            var a = this,
                n = a.settings,
                r = a.element,
                h = new Image;
            t.cross && (h.crossOrigin = "Anonymous"), h.onload = function() {
                var a, r = i.createElement("CANVAS"),
                    h = r.getContext("2d"),
                    s = this.width,
                    o = this.height;
                if (t.wmObj && ("auto" !== t.width && "auto" === t.height && t.width < s ? (o = o / s * t.width, s = t.width) : "auto" === t.width && "auto" !== t.height && t.height < o ? (s = s / o * t.height, o = t.height) : "auto" !== t.width && "auto" !== t.height && t.width < s && t.height < o && (s = t.width, o = t.height)), "w" !== n.gravity && "e" !== n.gravity || t.wmObj ? (r.width = s, r.height = o, a = 0) : (r.width = o, r.height = s, a = -o, h.rotate(90 * Math.PI / 180)), "jpeg" === t.type && (h.fillStyle = "#ffffff", h.fillRect(0, 0, s, o)), h.drawImage(this, 0, a, s, o), t.wmObj) {
                    var g = n.opacity;
                    g > 0 && 1 > g && (h.globalAlpha = n.opacity);
                    var c, l, u = t.wmObj.width,
                        w = t.wmObj.height,
                        f = n.margin;
                    switch (n.gravity) {
                        case "nw":
                            c = f, l = f;
                            break;
                        case "n":
                            c = s / 2 - u / 2, l = f;
                            break;
                        case "ne":
                            c = s - u - f, l = f;
                            break;
                        case "w":
                            c = f, l = o / 2 - w / 2;
                            break;
                        case "e":
                            c = s - u - f, l = o / 2 - w / 2;
                            break;
                        case "sw":
                            c = f, l = o - w - f;
                            break;
                        case "s":
                            c = s / 2 - u / 2, l = o - w - f;
                            break;
                        default:
                            c = s - u - f, l = o - w - f
                    }
                    h.drawImage(t.wmObj, c, l, u, w)
                }
                var d = r.toDataURL("image/" + t.type);
                if ("function" == typeof e)
                    if (t.wmObj) e(d);
                    else {
                        var m = new Image;
                        m.src = d, e(m)
                    }
                r = null
            }, h.onerror = function() { return n.fail.call(this, this.src), n.always.call(r, this.src), !1 }, h.src = t.imgurl
        }
    }), t.fn[n] = function(e) { return this.each(function() { t.data(this, "plugin_" + n) || t.data(this, "plugin_" + n, new a(this, e)) }) }
}(jQuery, window, document);
