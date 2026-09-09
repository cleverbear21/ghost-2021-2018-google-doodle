(function() {
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    'use strict';
    var q, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    };

    function ba(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("a");
    }
    var ca = ba(this);

    function da(a, b) {
        if (b) a: {
            var c = ca;a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                if (!(e in c)) break a;
                c = c[e]
            }
            a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && aa(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    }

    function ea(a) {
        function b(d) {
            return a.next(d)
        }

        function c(d) {
            return a.throw(d)
        }
        return new Promise(function(d, e) {
            function f(g) {
                g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
            }
            f(a.next())
        })
    }

    function r(a) {
        return ea(a())
    }
    da("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [],
                d;
            for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
            return c
        }
    });

    function fa(a, b) {
        a instanceof String && (a += "");
        var c = 0,
            d = !1,
            e = {
                next: function() {
                    if (!d && c < a.length) {
                        var f = c++;
                        return {
                            value: b(f, a[f]),
                            done: !1
                        }
                    }
                    d = !0;
                    return {
                        done: !0,
                        value: void 0
                    }
                }
            };
        e[Symbol.iterator] = function() {
            return e
        };
        return e
    }
    da("Array.prototype.values", function(a) {
        return a ? a : function() {
            return fa(this, function(b, c) {
                return c
            })
        }
    });
    da("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || Object.is(f, b)) return !0
            }
            return !1
        }
    });
    da("Object.values", function(a) {
        return a ? a : function(b) {
            var c = [],
                d;
            for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
            return c
        }
    });
    da("Promise.prototype.finally", function(a) {
        return a ? a : function(b) {
            return this.then(function(c) {
                return Promise.resolve(b()).then(function() {
                    return c
                })
            }, function(c) {
                return Promise.resolve(b()).then(function() {
                    throw c;
                })
            })
        }
    });
    var ha = ha || {},
        t = this || self;

    function ia() {
        throw Error("b");
    }

    function ja(a) {
        a.Bc = void 0;
        a.Va = function() {
            return a.Bc ? a.Bc : a.Bc = new a
        }
    }

    function ka(a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    }

    function la(a) {
        var b = ka(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }

    function ma(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }

    function na(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function pa(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }

    function qa(a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? qa = na : qa = pa;
        return qa.apply(null, arguments)
    }

    function ra(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    }

    function sa(a, b) {
        a = a.split(".");
        var c = t;
        a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
    }

    function ta(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.Rb = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.xg = function(d, e, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
            return b.prototype[e].apply(d, g)
        }
    }

    function ua(a) {
        return a
    };

    function va(a, b) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, va);
        else {
            const c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b)
    }
    ta(va, Error);
    va.prototype.name = "CustomError";
    var wa;

    function xa() {
        throw Error("c");
    }

    function ya(a, b) {
        b = String.fromCharCode.apply(null, b);
        return null == a ? b : a + b
    }
    let za = void 0,
        Aa;
    const Ba = "undefined" !== typeof TextDecoder;
    let Ca;
    const Da = "undefined" !== typeof TextEncoder;

    function Ea(a) {
        if (Da) a = (Ca || (Ca = new TextEncoder)).encode(a);
        else {
            let c = 0;
            const d = new Uint8Array(3 * a.length);
            for (let e = 0; e < a.length; e++) {
                var b = a.charCodeAt(e);
                if (128 > b) d[c++] = b;
                else {
                    if (2048 > b) d[c++] = b >> 6 | 192;
                    else {
                        if (55296 <= b && 57343 >= b) {
                            if (56319 >= b && e < a.length) {
                                const f = a.charCodeAt(++e);
                                if (56320 <= f && 57343 >= f) {
                                    b = 1024 * (b - 55296) + f - 56320 + 65536;
                                    d[c++] = b >> 18 | 240;
                                    d[c++] = b >> 12 & 63 | 128;
                                    d[c++] = b >> 6 & 63 | 128;
                                    d[c++] = b & 63 | 128;
                                    continue
                                } else e--
                            }
                            b = 65533
                        }
                        d[c++] = b >> 12 | 224;
                        d[c++] = b >> 6 & 63 | 128
                    }
                    d[c++] = b & 63 | 128
                }
            }
            a = c === d.length ?
                d : d.subarray(0, c)
        }
        return a
    };

    function Fa(a) {
        t.setTimeout(() => {
            throw a;
        }, 0)
    };
    var Ga = String.prototype.trim ? function(a) {
            return a.trim()
        } : function(a) {
            return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
        },
        Ha = /&/g,
        Ia = /</g,
        Ja = />/g,
        Ka = /"/g,
        La = /'/g,
        Ma = /\x00/g,
        Na = /[\x00&<>"']/;

    function Oa(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };

    function Pa() {
        var a = t.navigator;
        return a && (a = a.userAgent) ? a : ""
    }

    function Qa(a) {
        return -1 != Pa().indexOf(a)
    };
    const Ra = Array.prototype.indexOf ? function(a, b) {
            return Array.prototype.indexOf.call(a, b, void 0)
        } : function(a, b) {
            if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
            for (let c = 0; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        },
        Sa = Array.prototype.forEach ? function(a, b) {
            Array.prototype.forEach.call(a, b, void 0)
        } : function(a, b) {
            const c = a.length,
                d = "string" === typeof a ? a.split("") : a;
            for (let e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a)
        },
        Ta = Array.prototype.map ? function(a, b) {
            return Array.prototype.map.call(a,
                b, void 0)
        } : function(a, b) {
            const c = a.length,
                d = Array(c),
                e = "string" === typeof a ? a.split("") : a;
            for (let f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
            return d
        },
        Ua = Array.prototype.some ? function(a, b) {
            return Array.prototype.some.call(a, b, void 0)
        } : function(a, b) {
            const c = a.length,
                d = "string" === typeof a ? a.split("") : a;
            for (let e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) return !0;
            return !1
        },
        Va = Array.prototype.every ? function(a, b) {
            return Array.prototype.every.call(a, b, void 0)
        } : function(a, b) {
            const c = a.length,
                d =
                "string" === typeof a ? a.split("") : a;
            for (let e = 0; e < c; e++)
                if (e in d && !b.call(void 0, d[e], e, a)) return !1;
            return !0
        };

    function Wa(a, b) {
        b = Ra(a, b);
        let c;
        (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
        return c
    }

    function Xa(a) {
        const b = a.length;
        if (0 < b) {
            const c = Array(b);
            for (let d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    };

    function Ya(a) {
        Ya[" "](a);
        return a
    }
    Ya[" "] = function() {};

    function Za(a) {
        var b = $a;
        return Object.prototype.hasOwnProperty.call(b, 9) ? b[9] : b[9] = a(9)
    };
    var ab = Qa("Opera"),
        bb = Qa("Trident") || Qa("MSIE"),
        cb = Qa("Edge"),
        db = Qa("Gecko") && !(-1 != Pa().toLowerCase().indexOf("webkit") && !Qa("Edge")) && !(Qa("Trident") || Qa("MSIE")) && !Qa("Edge"),
        eb = -1 != Pa().toLowerCase().indexOf("webkit") && !Qa("Edge"),
        fb;
    a: {
        var gb = "",
            hb = function() {
                var a = Pa();
                if (db) return /rv:([^\);]+)(\)|;)/.exec(a);
                if (cb) return /Edge\/([\d\.]+)/.exec(a);
                if (bb) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (eb) return /WebKit\/(\S+)/.exec(a);
                if (ab) return /(?:Version)[ \/]?(\S+)/.exec(a)
            }();hb && (gb = hb ? hb[1] : "");
        if (bb) {
            var ib, jb = t.document;
            ib = jb ? jb.documentMode : void 0;
            if (null != ib && ib > parseFloat(gb)) {
                fb = String(ib);
                break a
            }
        }
        fb = gb
    }
    var kb = fb,
        $a = {};

    function lb() {
        return Za(function() {
            let a = 0;
            const b = Ga(String(kb)).split("."),
                c = Ga("9").split("."),
                d = Math.max(b.length, c.length);
            for (let g = 0; 0 == a && g < d; g++) {
                var e = b[g] || "",
                    f = c[g] || "";
                do {
                    e = /(\d*)(\D*)(.*)/.exec(e) || ["", "", "", ""];
                    f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                    if (0 == e[0].length && 0 == f[0].length) break;
                    a = Oa(0 == e[1].length ? 0 : parseInt(e[1], 10), 0 == f[1].length ? 0 : parseInt(f[1], 10)) || Oa(0 == e[2].length, 0 == f[2].length) || Oa(e[2], f[2]);
                    e = e[3];
                    f = f[3]
                } while (0 == a)
            }
            return 0 <= a
        })
    };
    var mb = {},
        nb = null;

    function ob(a, b) {
        void 0 === b && (b = 0);
        pb();
        b = mb[b];
        const c = Array(Math.floor(a.length / 3)),
            d = b[64] || "";
        let e = 0,
            f = 0;
        for (; e < a.length - 2; e += 3) {
            var g = a[e],
                h = a[e + 1],
                k = a[e + 2],
                l = b[g >> 2];
            g = b[(g & 3) << 4 | h >> 4];
            h = b[(h & 15) << 2 | k >> 6];
            k = b[k & 63];
            c[f++] = l + g + h + k
        }
        l = 0;
        k = d;
        switch (a.length - e) {
            case 2:
                l = a[e + 1], k = b[(l & 15) << 2] || d;
            case 1:
                a = a[e], c[f] = b[a >> 2] + b[(a & 3) << 4 | l >> 4] + k + d
        }
        return c.join("")
    }

    function qb(a) {
        var b = a.length,
            c = 3 * b / 4;
        c % 3 ? c = Math.floor(c) : -1 != "=.".indexOf(a[b - 1]) && (c = -1 != "=.".indexOf(a[b - 2]) ? c - 2 : c - 1);
        var d = new Uint8Array(c),
            e = 0;
        rb(a, function(f) {
            d[e++] = f
        });
        return e !== c ? d.subarray(0, e) : d
    }

    function rb(a, b) {
        function c(k) {
            for (; d < a.length;) {
                var l = a.charAt(d++),
                    m = nb[l];
                if (null != m) return m;
                if (!/^[\s\xa0]*$/.test(l)) throw Error("e`" + l);
            }
            return k
        }
        pb();
        for (var d = 0;;) {
            var e = c(-1),
                f = c(0),
                g = c(64),
                h = c(64);
            if (64 === h && -1 === e) break;
            b(e << 2 | f >> 4);
            64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h))
        }
    }

    function pb() {
        if (!nb) {
            nb = {};
            for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
                var d = a.concat(b[c].split(""));
                mb[c] = d;
                for (var e = 0; e < d.length; e++) {
                    var f = d[e];
                    void 0 === nb[f] && (nb[f] = e)
                }
            }
        }
    };
    var sb = "undefined" !== typeof Uint8Array;

    function tb(a) {
        return null == a || ub(a) ? a : "string" === typeof a ? qb(a) : null
    }

    function ub(a) {
        return sb && null != a && a instanceof Uint8Array
    }
    let vb;

    function wb() {
        return vb || (vb = new Uint8Array(0))
    }
    var xb = {};
    let yb;

    function zb(a) {
        if (a !== xb) throw Error("f");
    }

    function Ab() {
        return yb || (yb = new Bb(null, xb))
    }

    function Cb(a) {
        zb(xb);
        const b = tb(a.Sc);
        return null == b ? b : a.Sc = b
    }
    var Bb = class {
        constructor(a, b) {
            zb(b);
            this.Sc = a;
            if (null != a && 0 === a.length) throw Error("g");
        }
        isEmpty() {
            return null == this.Sc
        }
    };
    const Db = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol(void 0) : void 0;

    function Eb(a, b) {
        Object.isFrozen(a) || (Db ? a[Db] |= b : void 0 !== a.ac ? a.ac |= b : Object.defineProperties(a, {
            ac: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        }))
    }

    function Fb(a, b) {
        Object.isExtensible(a) && (Db ? a[Db] && (a[Db] &= ~b) : void 0 !== a.ac && (a.ac &= ~b))
    }

    function Gb(a) {
        let b;
        Db ? b = a[Db] : b = a.ac;
        return null == b ? 0 : b
    }

    function Hb(a, b) {
        Db ? a[Db] = b : void 0 !== a.ac ? a.ac = b : Object.defineProperties(a, {
            ac: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        })
    }

    function Ib(a) {
        Eb(a, 1);
        return a
    }

    function Jb(a) {
        Eb(a, 17);
        return a
    }

    function Kb(a) {
        return a ? !!(Gb(a) & 2) : !1
    }

    function Lb(a) {
        Eb(a, 16);
        return a
    }

    function Mb(a, b) {
        Hb(b, (Gb(a) | 0) & -51)
    }

    function Nb(a, b) {
        Hb(b, (Gb(a) | 18) & -33)
    };
    var Ob = {};

    function Pb(a) {
        return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
    }
    let Qb;

    function Rb(a, b) {
        if (null != a)
            if ("string" === typeof a) a = a ? new Bb(a, xb) : Ab();
            else if (a.constructor !== Bb)
            if (ub(a)) a = a.length ? new Bb(new Uint8Array(a), xb) : Ab();
            else {
                if (!b) throw Error();
                a = void 0
            } return a
    }

    function Sb(a) {
        a instanceof Bb && (zb(xb), a = a.Sc || "");
        return a
    }
    var Tb = Object,
        Ub = Tb.freeze,
        Vb = [];
    Eb(Vb, 3);
    var Wb = Ub.call(Tb, Vb);

    function Xb(a) {
        if (Kb(a.Fa)) throw Error("j");
    };

    function Yb(a, b, c) {
        let d = !1;
        if (null != a && "object" === typeof a && !(d = Array.isArray(a)) && a.Md === Ob) return a;
        if (d) return new b(a);
        if (c) return new b
    }

    function Zb(a, b, c = !1) {
        if (Array.isArray(a)) return new b(c ? Lb(a) : a)
    };

    function ac(a, b) {
        a = a || {};
        b = b || {};
        const c = {};
        for (let d in a) c[d] = 0;
        for (let d in b) c[d] = 0;
        for (let d in c)
            if (!bc(a[d], b[d])) return !1;
        return !0
    }

    function cc(a) {
        return a && "object" === typeof a ? a.Fa || a : a
    }

    function bc(a, b) {
        a = Sb(a);
        b = Sb(b);
        a = cc(a);
        b = cc(b);
        if (a == b) return !0;
        if (sb) {
            var c = ub(a),
                d = ub(b);
            if (c || d) {
                if (!c)
                    if ("string" === typeof a) a = tb(a);
                    else return !1;
                if (d) d = b;
                else if ("string" === typeof b) d = tb(b);
                else return !1;
                if (a.length !== d.length) return !1;
                for (b = 0; b < a.length; b++)
                    if (a[b] !== d[b]) return !1;
                return !0
            }
        }
        if (null == a && Array.isArray(b) && b && Gb(b) & 1 && !b.length || null == b && Array.isArray(a) && a && Gb(a) & 1 && !a.length) return !0;
        if (!ma(a) || !ma(b)) return "number" === typeof a && isNaN(a) || "number" === typeof b && isNaN(b) ? String(a) ==
            String(b) : !1;
        if (a.constructor != b.constructor) return !1;
        if (a.constructor === Array) {
            d = a;
            c = a = void 0;
            const e = Math.max(d.length, b.length);
            for (let f = 0; f < e; f++) {
                let g = d[f],
                    h = b[f];
                g && g.constructor == Object && (a = g, g = void 0);
                h && h.constructor == Object && (c = h, h = void 0);
                if (!bc(g, h)) return !1
            }
            return a || c ? (a = a || {}, c = c || {}, ac(a, c)) : !0
        }
        if (a.constructor === Object) return ac(a, b);
        throw Error("m");
    };

    function dc(a) {
        switch (typeof a) {
            case "number":
                return isFinite(a) ? a : String(a);
            case "object":
                if (a && !Array.isArray(a)) {
                    if (ub(a)) return ob(a);
                    if (a instanceof Bb) {
                        const b = a.Sc;
                        return null == b ? "" : "string" === typeof b ? b : a.Sc = ob(b)
                    }
                }
        }
        return a
    };

    function ec(a, b, c, d) {
        if (null != a) {
            if (Array.isArray(a)) a = fc(a, b, c, void 0 !== d);
            else if (Pb(a)) {
                const e = {};
                for (let f in a) e[f] = ec(a[f], b, c, d);
                a = e
            } else a = b(a, d);
            return a
        }
    }

    function fc(a, b, c, d) {
        d = d ? !!(Gb(a) & 16) : void 0;
        const e = Array.prototype.slice.call(a);
        c(a, e);
        for (a = 0; a < e.length; a++) e[a] = ec(e[a], b, c, d);
        return e
    }

    function gc(a) {
        return a.Md === Ob ? a.toJSON() : dc(a)
    }

    function hc(a) {
        if (!a) return a;
        if ("object" === typeof a) {
            if (ub(a)) return new Uint8Array(a);
            if (a.Md === Ob) return a.clone()
        }
        return a
    }

    function ic() {};

    function jc(a, b, c = !1) {
        return -1 === b ? null : b >= a.yc ? a.Cb ? a.Cb[b] : void 0 : c && a.Cb && (c = a.Cb[b], null != c) ? c : a.Fa[b + a.oc]
    }

    function B(a, b, c, d = !1, e = !1) {
        e || Xb(a);
        a.g && (a.g = void 0);
        if (b >= a.yc || d) return (a.Cb || (a.Cb = a.Fa[a.yc + a.oc] = {}))[b] = c, a;
        void 0 !== a.Cb && a.yc >= a.Fa.length ? (d = a.Fa.length - 1, e = b + a.oc, e >= d ? (a.Fa[d] = void 0, a.Fa[e] = c, a.Fa.push(a.Cb)) : a.Fa[e] = c) : a.Fa[b + a.oc] = c;
        void 0 !== a.Cb && b in a.Cb && delete a.Cb[b];
        return a
    }

    function kc(a, b, c, d) {
        let e = jc(a, b, d);
        Array.isArray(e) || (e = Wb);
        const f = Gb(e);
        f & 1 || Ib(e);
        if (Kb(a.Fa)) f & 2 || Eb(e, 2), c & 1 || Object.freeze(e);
        else if (e === Wb || !(c & 1 && c & 2) && f & 2) e = Ib(Array.prototype.slice.call(e)), B(a, b, e, d);
        else if (!(c & 2) && f & 16) {
            a = e;
            if (!Array.isArray(a)) throw Error("h");
            Fb(a, 16)
        }
        return e
    }

    function lc(a, b) {
        a = jc(a, b);
        return null == a ? a : +a
    }

    function mc(a, b) {
        a = jc(a, b);
        return null == a ? a : !!a
    }

    function nc(a, b) {
        const c = jc(a, b),
            d = Rb(c, !0);
        null != d && d !== c && B(a, b, d, void 0, !0);
        return d
    }

    function E(a, b, c) {
        a = jc(a, b);
        return null == a ? c : a
    }

    function oc(a, b, c) {
        return B(a, b, void 0, !1, c)
    }

    function pc(a, b, c) {
        Xb(a);
        "" !== c ? B(a, b, c) : oc(a, b);
        return a
    }

    function qc(a, b, c) {
        Xb(a);
        c = Rb(c, !1);
        null == c || c.isEmpty() ? oc(a, b) : B(a, b, c)
    }

    function rc(a, b, c, d) {
        Xb(a);
        (c = sc(a, c)) && c !== b && null != d && oc(a, c);
        B(a, b, d)
    }

    function sc(a, b) {
        let c = 0;
        for (let d = 0; d < b.length; d++) {
            const e = b[d];
            null != jc(a, e) && (0 !== c && oc(a, c, !0), c = e)
        }
        return c
    }

    function tc(a, b, c) {
        Xb(a);
        const d = jc(a, c);
        b = uc(Yb(d, b, !0));
        d !== b && B(a, c, b);
        return b
    }

    function vc(a, b, c) {
        const d = jc(a, c, !1);
        b = Yb(d, b);
        b !== d && null != b && (B(a, c, b, !1, !0), Eb(b.Fa, Gb(a.Fa) & -33));
        return b
    }

    function F(a, b, c) {
        b = vc(a, b, c);
        if (null == b) return b;
        Kb(b.Fa) && !Kb(a.Fa) && (b = uc(b), B(a, c, b, !1));
        return b
    }

    function wc(a, b, c, d, e = !0) {
        a.Jb || (a.Jb = {});
        let f = a.Jb[c],
            g = kc(a, c, 3, d);
        const h = Kb(a.Fa);
        if (f) h || (Object.isFrozen(f) ? e || (f = Array.prototype.slice.call(f), a.Jb[c] = f) : e && Object.freeze(f));
        else {
            f = [];
            const l = !!(Gb(a.Fa) & 16),
                m = Kb(g);
            !h && m && (g = Ib(Array.prototype.slice.call(g)), B(a, c, g, d));
            d = m;
            for (let n = 0; n < g.length; n++) {
                var k = g[n];
                d = d || Kb(k);
                k = Zb(k, b, l);
                void 0 !== k && (f.push(k), m && Eb(k.Fa, 2))
            }
            a.Jb[c] = f;
            a = g;
            Object.isFrozen(a) || (b = Gb(a) | 33, Hb(a, d ? b & -9 : b | 8));
            (h || e && m) && Eb(f, 2);
            (h || e) && Object.freeze(f)
        }
        return f
    }

    function xc(a, b, c, d = !1) {
        var e = Kb(a.Fa);
        b = wc(a, b, c, d, e);
        a = kc(a, c, 3, d);
        if (e = !e && a) {
            if (!a) throw Error("i");
            e = !(Gb(a) & 8)
        }
        if (e) {
            for (e = 0; e < b.length; e++)(c = b[e]) && Kb(c.Fa) && (b[e] = uc(b[e]), a[e] = b[e].Fa);
            Eb(a, 8)
        }
        return b
    }

    function yc(a, b, c) {
        Xb(a);
        null == c && (c = void 0);
        B(a, b, c)
    }

    function zc(a, b, c, d) {
        Xb(a);
        let e;
        if (null != c) {
            e = Ib([]);
            let f = !1;
            for (let g = 0; g < c.length; g++) e[g] = c[g].Fa, f = f || Kb(e[g]);
            a.Jb || (a.Jb = {});
            a.Jb[b] = c;
            c = e;
            f ? Fb(c, 8) : Eb(c, 8)
        } else a.Jb && (a.Jb[b] = void 0), e = Wb;
        B(a, b, e, d)
    }

    function Ac(a, b, c, d) {
        Xb(a);
        const e = wc(a, c, b, void 0, !1);
        c = null != d ? d : new c;
        a = kc(a, b, 2);
        e.push(c);
        a.push(c.Fa);
        c.hc() && Fb(a, 8);
        return c
    }

    function Bc(a, b) {
        return null == a ? b : a
    }

    function Cc(a, b) {
        return Bc(jc(a, b), "")
    }

    function Dc(a, b) {
        return Bc(mc(a, b), !1)
    }

    function Ec(a, b) {
        return Bc(lc(a, b), 0)
    }

    function Fc(a, b) {
        return Bc(jc(a, b), 0)
    };

    function Gc(a) {
        if (Kb(a) && Object.isFrozen(a)) return a;
        const b = Ta(a, Hc);
        Nb(a, b);
        Object.freeze(b);
        return b
    }

    function Ic(a, b) {
        if (null != a) {
            if (sb && a instanceof Uint8Array) return a.length ? new Bb(new Uint8Array(a), xb) : Ab();
            if (Array.isArray(a)) {
                if (Kb(a)) return a;
                b && (b = Gb(a), b = !(b & 32) && (!!(b & 16) || 0 === b));
                return b ? (Eb(a, 2), a) : fc(a, Ic, Nb)
            }
            return a.Md === Ob ? Hc(a) : a
        }
    }

    function Hc(a) {
        if (Kb(a.Fa)) return a;
        a = Jc(a);
        Eb(a.Fa, 2);
        return a
    }

    function Jc(a) {
        const b = new a.constructor;
        a.uc && (b.uc = a.uc.slice());
        const c = a.Fa,
            d = !!(Gb(c) & 16);
        for (let l = 0; l < c.length; l++) {
            var e = c[l];
            if (l === c.length - 1 && Pb(e))
                for (const m in e) {
                    var f = +m;
                    if (Number.isNaN(f))(b.Cb || (b.Cb = b.Fa[b.yc + b.oc] = {}))[f] = e[f];
                    else {
                        var g = b,
                            h = e[m],
                            k = d;
                        const n = a.Jb && a.Jb[f];
                        n ? zc(g, f, Gc(n), !0) : B(g, f, Ic(h, k), !0)
                    }
                } else g = b, f = l - a.oc, h = d, (k = a.Jb && a.Jb[f]) ? zc(g, f, Gc(k), !1) : B(g, f, Ic(e, h), !1)
        }
        return b
    };

    function uc(a) {
        if (Kb(a.Fa)) {
            var b = Jc(a);
            b.g = a;
            a = b
        }
        return a
    }
    var H = class {
        constructor(a, b, c) {
            null == a && (a = Kc);
            Kc = null;
            var d = this.constructor.g || 0,
                e = 0 < d,
                f = this.constructor.i,
                g = !1;
            if (null == a) {
                var h = f ? [f] : [];
                Eb(h, 48);
                a = h;
                h = !0
            } else {
                if (!Array.isArray(a)) throw Error();
                if (h = !!(Gb(a) & 16)) g = Gb(a), Hb(a, g | 32), g = !!(g & 32)
            }
            e && 0 < a.length && Pb(a[a.length - 1]) && "g" in a[a.length - 1] && (d = 0);
            this.oc = (f ? 0 : -1) - d;
            this.Jb = void 0;
            this.Fa = a;
            a: {
                f = this.Fa.length;d = f - 1;
                if (f && (f = this.Fa[d], Pb(f))) {
                    this.Cb = f;
                    b = Object.keys(f);
                    0 < b.length && Va(b, isNaN) ? this.yc = Number.MAX_VALUE : this.yc = d - this.oc;
                    break a
                }
                void 0 !== b && -1 < b ? (this.yc = Math.max(b, d + 1 - this.oc), this.Cb = void 0) : this.yc = Number.MAX_VALUE
            }
            if (!e && this.Cb && "g" in this.Cb) throw Error("n");
            if (c)
                for (e = h && !g ? Jb : Ib, b = 0; b < c.length; b++) h = c[b], (g = jc(this, h)) ? Array.isArray(g) && e(g) : B(this, h, Wb, !1, !0)
        }
        toJSON() {
            const a = this.Fa;
            return Qb ? a : fc(a, gc, ic)
        }
        Qd() {
            Qb = !0;
            try {
                return JSON.stringify(this.toJSON(), Lc)
            } finally {
                Qb = !1
            }
        }
        clone() {
            var a = fc(this.Fa, hc, Mb);
            Lb(a);
            Kc = a;
            a = new this.constructor(a);
            Kc = null;
            Mc(a, this);
            return a
        }
        hc() {
            return Kb(this.Fa)
        }
    };
    H.prototype.Md = Ob;
    H.prototype.toString = function() {
        return this.Fa.toString()
    };

    function Lc(a, b) {
        return dc(b)
    }

    function Mc(a, b) {
        b.uc && (a.uc = b.uc.slice());
        const c = b.Jb;
        if (c) {
            b = b.Cb;
            for (let f in c) {
                const g = c[f];
                if (g) {
                    var d = !(!b || !b[f]),
                        e = +f;
                    if (Array.isArray(g)) {
                        if (g.length)
                            for (d = xc(a, g[0].constructor, e, d), e = 0; e < Math.min(d.length, g.length); e++) Mc(d[e], g[e])
                    } else throw Error("o`" + ka(g) + "`" + g);
                }
            }
        }
    }
    let Kc;

    function Nc(a) {
        if ("string" === typeof a) return {
            buffer: qb(a),
            hc: !1
        };
        if (Array.isArray(a)) return {
            buffer: new Uint8Array(a),
            hc: !1
        };
        if (a.constructor === Uint8Array) return {
            buffer: a,
            hc: !1
        };
        if (a.constructor === ArrayBuffer) return {
            buffer: new Uint8Array(a),
            hc: !1
        };
        if (a.constructor === Bb) return {
            buffer: Cb(a) || wb(),
            hc: !0
        };
        if (a instanceof Uint8Array) return {
            buffer: new Uint8Array(a.buffer, a.byteOffset, a.byteLength),
            hc: !1
        };
        throw Error("x");
    };
    const Oc = "function" === typeof Uint8Array.prototype.slice;
    let Pc = 0,
        Qc = 0;

    function Sc(a) {
        const b = 0 > a;
        a = Math.abs(a);
        let c = a >>> 0;
        a = Math.floor((a - c) / 4294967296);
        if (b) {
            const [d, e] = Tc(c, a);
            a = e;
            c = d
        }
        Pc = c >>> 0;
        Qc = a >>> 0
    }
    const Uc = "function" === typeof BigInt;

    function Tc(a, b) {
        b = ~b;
        a ? a = ~a + 1 : b += 1;
        return [a, b]
    };

    function Vc(a, b) {
        var {
            te: c = !1
        } = {};
        a.te = c;
        b && (b = Nc(b), a.i = b.buffer, a.v = b.hc, a.u = 0, a.j = a.i.length, a.g = a.u)
    }

    function Wc(a, b) {
        a.g = b;
        if (b > a.j) throw Error("v`" + b + "`" + a.j);
    }

    function Xc(a) {
        let b = 0,
            c = a.g;
        const d = c + 10,
            e = a.i;
        for (; c < d;) {
            const f = e[c++];
            b |= f;
            if (0 === (f & 128)) return Wc(a, c), !!(b & 127)
        }
        throw Error("u");
    }

    function Yc(a) {
        var b = a.i;
        const c = a.g;
        var d = b[c];
        var e = b[c + 1];
        const f = b[c + 2];
        b = b[c + 3];
        a.advance(4);
        e = (d << 0 | e << 8 | f << 16 | b << 24) >>> 0;
        a = 2 * (e >> 31) + 1;
        d = e >>> 23 & 255;
        e &= 8388607;
        return 255 == d ? e ? NaN : Infinity * a : 0 == d ? a * Math.pow(2, -149) * e : a * Math.pow(2, d - 150) * (e + Math.pow(2, 23))
    }

    function Zc(a, b) {
        if (0 > b) throw Error("w`" + b);
        const c = a.g,
            d = c + b;
        if (d > a.j) throw Error("v`" + (a.j - c) + "`" + b);
        a.g = d;
        return c
    }

    function $c(a, b) {
        if (0 == b) return Ab();
        var c = Zc(a, b);
        a.te && a.v ? c = a.i.subarray(c, c + b) : (a = a.i, b = c + b, c = c === b ? wb() : Oc ? a.slice(c, b) : new Uint8Array(a.subarray(c, b)));
        return 0 == c.length ? Ab() : new Bb(c, xb)
    }
    var bd = class {
            constructor(a) {
                this.i = null;
                this.v = !1;
                this.g = this.j = this.u = 0;
                Vc(this, a)
            }
            H() {
                this.clear();
                100 > ad.length && ad.push(this)
            }
            clear() {
                this.i = null;
                this.v = !1;
                this.g = this.j = this.u = 0;
                this.te = !1
            }
            reset() {
                this.g = this.u
            }
            advance(a) {
                Wc(this, this.g + a)
            }
            o() {
                const a = this.i;
                let b = this.g,
                    c = a[b++],
                    d = c & 127;
                if (c & 128 && (c = a[b++], d |= (c & 127) << 7, c & 128 && (c = a[b++], d |= (c & 127) << 14, c & 128 && (c = a[b++], d |= (c & 127) << 21, c & 128 && (c = a[b++], d |= c << 28, c & 128 && a[b++] & 128 && a[b++] & 128 && a[b++] & 128 && a[b++] & 128 && a[b++] & 128))))) throw Error("u");
                Wc(this, b);
                return d
            }
        },
        ad = [];

    function cd(a) {
        var b = a.g;
        if (b.g == b.j) return !1;
        a.j = a.g.g;
        var c = a.g.o() >>> 0;
        b = c >>> 3;
        c &= 7;
        if (!(0 <= c && 5 >= c)) throw Error("q`" + c + "`" + a.j);
        if (1 > b) throw Error("r`" + b + "`" + a.j);
        a.o = b;
        a.i = c;
        return !0
    }

    function dd(a) {
        switch (a.i) {
            case 0:
                0 != a.i ? dd(a) : Xc(a.g);
                break;
            case 1:
                a.g.advance(8);
                break;
            case 2:
                if (2 != a.i) dd(a);
                else {
                    var b = a.g.o() >>> 0;
                    a.g.advance(b)
                }
                break;
            case 5:
                a.g.advance(4);
                break;
            case 3:
                b = a.o;
                do {
                    if (!cd(a)) throw Error("s");
                    if (4 == a.i) {
                        if (a.o != b) throw Error("t");
                        break
                    }
                    dd(a)
                } while (1);
                break;
            default:
                throw Error("q`" + a.i + "`" + a.j);
        }
    }

    function ed(a, b, c) {
        const d = a.g.j,
            e = a.g.o() >>> 0,
            f = a.g.g + e;
        let g = f - d;
        0 >= g && (a.g.j = f, c(b, a, void 0, void 0, void 0), g = f - a.g.g);
        if (g) throw Error("p`" + e + "`" + (e - g));
        a.g.g = f;
        a.g.j = d
    }

    function fd(a) {
        var b = a.g.o() >>> 0;
        a = a.g;
        var c = Zc(a, b);
        a = a.i;
        if (Ba) {
            var d = a,
                e;
            (e = Aa) || (e = Aa = new TextDecoder("utf-8", {
                fatal: !0
            }));
            a = c + b;
            d = 0 === c && a === d.length ? d : d.subarray(c, a);
            try {
                var f = e.decode(d)
            } catch (h) {
                if (void 0 === za) {
                    try {
                        e.decode(new Uint8Array([128]))
                    } catch (k) {}
                    try {
                        e.decode(new Uint8Array([97])), za = !0
                    } catch (k) {
                        za = !1
                    }
                }!za && (Aa = void 0);
                throw h;
            }
        } else {
            f = c;
            b = f + b;
            c = [];
            let h = null;
            let k;
            for (; f < b;) {
                var g = a[f++];
                128 > g ? c.push(g) : 224 > g ? f >= b ? xa() : (k = a[f++], 194 > g || 128 !== (k & 192) ? (f--, xa()) : c.push((g & 31) << 6 |
                    k & 63)) : 240 > g ? f >= b - 1 ? xa() : (k = a[f++], 128 !== (k & 192) || 224 === g && 160 > k || 237 === g && 160 <= k || 128 !== ((d = a[f++]) & 192) ? (f--, xa()) : c.push((g & 15) << 12 | (k & 63) << 6 | d & 63)) : 244 >= g ? f >= b - 2 ? xa() : (k = a[f++], 128 !== (k & 192) || 0 !== (g << 28) + (k - 144) >> 30 || 128 !== ((d = a[f++]) & 192) || 128 !== ((e = a[f++]) & 192) ? (f--, xa()) : (g = (g & 7) << 18 | (k & 63) << 12 | (d & 63) << 6 | e & 63, g -= 65536, c.push((g >> 10 & 1023) + 55296, (g & 1023) + 56320))) : xa();
                8192 <= c.length && (h = ya(h, c), c.length = 0)
            }
            f = ya(h, c)
        }
        return f
    }
    var hd = class {
            constructor(a) {
                if (ad.length) {
                    const b = ad.pop();
                    Vc(b, a);
                    a = b
                } else a = new bd(a);
                this.g = a;
                this.j = this.g.g;
                this.i = this.o = -1;
                ({
                    Hd: a = !1
                } = {});
                this.Hd = a
            }
            H() {
                this.g.clear();
                this.i = this.o = -1;
                100 > gd.length && gd.push(this)
            }
            reset() {
                this.g.reset();
                this.j = this.g.g;
                this.i = this.o = -1
            }
            advance(a) {
                this.g.advance(a)
            }
        },
        gd = [];

    function id(a) {
        if (!a) return jd || (jd = new kd(0, 0));
        if (!/^-?\d+$/.test(a)) return null;
        if (16 > a.length) Sc(Number(a));
        else if (Uc) a = BigInt(a), Pc = Number(a & BigInt(4294967295)) >>> 0, Qc = Number(a >> BigInt(32) & BigInt(4294967295));
        else {
            const b = +("-" === a[0]);
            Qc = Pc = 0;
            const c = a.length;
            for (let d = b, e = (c - b) % 6 + b; e <= c; d = e, e += 6) {
                const f = Number(a.slice(d, e));
                Qc *= 1E6;
                Pc = 1E6 * Pc + f;
                4294967296 <= Pc && (Qc += Pc / 4294967296 | 0, Pc %= 4294967296)
            }
            if (b) {
                const [d, e] = Tc(Pc, Qc);
                Pc = d;
                Qc = e
            }
        }
        return new kd(Pc, Qc)
    }
    var kd = class {
        constructor(a, b) {
            this.i = a >>> 0;
            this.g = b >>> 0
        }
    };
    let jd;

    function ld(a, b, c) {
        for (; 0 < c || 127 < b;) a.g.push(b & 127 | 128), b = (b >>> 7 | c << 25) >>> 0, c >>>= 7;
        a.g.push(b)
    }

    function md(a, b) {
        for (; 127 < b;) a.g.push(b & 127 | 128), b >>>= 7;
        a.g.push(b)
    }

    function nd(a, b) {
        if (0 <= b) md(a, b);
        else {
            for (let c = 0; 9 > c; c++) a.g.push(b & 127 | 128), b >>= 7;
            a.g.push(1)
        }
    }
    var od = class {
        constructor() {
            this.g = []
        }
        length() {
            return this.g.length
        }
        end() {
            const a = this.g;
            this.g = [];
            return a
        }
    };

    function pd(a, b) {
        0 !== b.length && (a.j.push(b), a.i += b.length)
    }

    function qd(a, b) {
        md(a.g, 8 * b + 2);
        b = a.g.end();
        pd(a, b);
        b.push(a.i);
        return b
    }

    function rd(a, b) {
        var c = b.pop();
        for (c = a.i + a.g.length() - c; 127 < c;) b.push(c & 127 | 128), c >>>= 7, a.i++;
        b.push(c);
        a.i++
    }

    function sd(a, b) {
        if (b = b.uc) {
            pd(a, a.g.end());
            for (let c = 0; c < b.length; c++) pd(a, Cb(b[c]) || wb())
        }
    }

    function td(a, b, c) {
        md(a.g, 8 * b + 2);
        md(a.g, c.length);
        pd(a, a.g.end());
        pd(a, c)
    }
    var ud = class {
        constructor() {
            this.j = [];
            this.i = 0;
            this.g = new od
        }
    };

    function vd(a, b, c) {
        if (c)
            for (let d in c) {
                const e = c[d];
                let f = e.lg;
                if (!f) {
                    const g = e.Gg || e.fg.Xd;
                    if (e.Ve) {
                        const h = wd(e.Ve);
                        f = (k, l, m) => g(k, l, m, h)
                    } else if (e.hf) {
                        const h = xd(e.ze.qc, e.hf);
                        f = (k, l, m) => g(k, l, m, h)
                    } else f = g;
                    e.lg = f
                }
                f(b, a, e.ze)
            }
        sd(b, a)
    }
    const yd = Symbol();

    function zd(a, b, c) {
        return a[yd] || (a[yd] = (d, e) => b(d, e, c))
    }

    function Ad(a) {
        let b = a[yd];
        if (!b) {
            const c = Bd(a);
            b = (d, e) => Cd(d, e, c);
            a[yd] = b
        }
        return b
    }

    function Dd(a) {
        var b = a.Ve;
        if (b) return Ad(b);
        if (b = a.Fg) return zd(a.ze.qc, b, a.hf)
    }

    function Ed(a) {
        const b = Dd(a),
            c = a.ze,
            d = a.fg.Od;
        return b ? (e, f) => d(e, f, c, b) : (e, f) => d(e, f, c)
    }

    function Fd(a, b) {
        let c = a[b];
        "function" == typeof c && 0 === c.length && (c = c(), a[b] = c);
        return Array.isArray(c) && (Gd in c || Hd in c || 0 < c.length && "function" == typeof c[0]) ? c : void 0
    }

    function Id(a, b, c, d, e, f) {
        b.qc = a[0];
        let g = 1;
        if (a.length > g && "number" !== typeof a[g]) {
            var h = a[g++];
            c(b, h)
        }
        for (; g < a.length;) {
            c = a[g++];
            for (var k = g + 1; k < a.length && "number" !== typeof a[k];) k++;
            h = a[g++];
            k -= g;
            switch (k) {
                case 0:
                    d(b, c, h);
                    break;
                case 1:
                    (k = Fd(a, g)) ? (g++, e(b, c, h, k)) : d(b, c, h, a[g++]);
                    break;
                case 2:
                    k = g++;
                    k = Fd(a, k);
                    e(b, c, h, k, a[g++]);
                    break;
                case 3:
                    f(b, c, h, a[g++], a[g++], a[g++]);
                    break;
                case 4:
                    f(b, c, h, a[g++], a[g++], a[g++], a[g++]);
                    break;
                default:
                    throw Error("y`" + k);
            }
        }
        return b
    }
    const Jd = Symbol();

    function wd(a) {
        let b = a[Jd];
        if (!b) {
            const c = Kd(a);
            b = (d, e) => Ld(d, e, c);
            a[Jd] = b
        }
        return b
    }

    function xd(a, b) {
        let c = a[Jd];
        c || (c = (d, e) => vd(d, e, b), a[Jd] = c);
        return c
    }
    const Hd = Symbol();

    function Md(a, b) {
        a.push(b)
    }

    function Nd(a, b, c) {
        a.push(b, c.Xd)
    }

    function Od(a, b, c, d) {
        const e = wd(d),
            f = Kd(d).qc,
            g = c.Xd;
        a.push(b, (h, k, l) => g(h, k, l, f, e))
    }

    function Pd(a, b, c, d, e, f) {
        const g = xd(d, f),
            h = c.Xd;
        a.push(b, (k, l, m) => h(k, l, m, d, g))
    }

    function Kd(a) {
        let b = a[Hd];
        if (b) return b;
        b = Id(a, a[Hd] = [], Md, Nd, Od, Pd);
        Gd in a && Hd in a && (a.length = 0);
        return b
    }
    const Gd = Symbol();

    function Qd(a, b) {
        a[0] = b
    }

    function Rd(a, b, c, d) {
        const e = c.Od;
        a[b] = d ? (f, g, h) => e(f, g, h, d) : e
    }

    function Sd(a, b, c, d, e) {
        const f = c.Od,
            g = Ad(d),
            h = Bd(d).qc;
        a[b] = (k, l, m) => f(k, l, m, h, g, e)
    }

    function Td(a, b, c, d, e, f, g) {
        const h = c.Od,
            k = zd(d, e, f);
        a[b] = (l, m, n) => h(l, m, n, d, k, g)
    }

    function Bd(a) {
        let b = a[Gd];
        if (b) return b;
        b = Id(a, a[Gd] = {}, Qd, Rd, Sd, Td);
        Gd in a && Hd in a && (a.length = 0);
        return b
    }

    function Cd(a, b, c) {
        for (; cd(b) && 4 != b.i;) {
            var d = b.o,
                e = c[d];
            if (!e) {
                var f = c[0];
                f && (f = f[d]) && (e = c[d] = Ed(f))
            }
            if (!e || !e(b, a, d))
                if (f = b, d = a, e = f.j, dd(f), !f.Hd) {
                    const g = f.g.g - e;
                    f.g.g = e;
                    e = $c(f.g, g);
                    (f = d.uc) ? f.push(e): d.uc = [e]
                }
        }
        return a
    }
    var Ud = (a, b) => {
        if (gd.length) {
            const d = gd.pop();
            var {
                Hd: c = !1
            } = {};
            d.Hd = c;
            Vc(d.g, a);
            a = d
        } else a = new hd(a);
        try {
            const d = Bd(b);
            return Cd(new d.qc, a, d)
        } finally {
            a.H()
        }
    };

    function Ld(a, b, c) {
        const d = c.length,
            e = 1 == d % 2;
        let f = e ? 1 : 0;
        for (; f < d; f += 2)(0, c[f + 1])(b, a, c[f]);
        vd(a, b, e ? c[0] : void 0)
    }
    var Vd = (a, b) => {
        const c = new ud;
        Ld(a, c, Kd(b));
        pd(c, c.g.end());
        a = new Uint8Array(c.i);
        b = c.j;
        const d = b.length;
        let e = 0;
        for (let f = 0; f < d; f++) {
            const g = b[f];
            a.set(g, e);
            e += g.length
        }
        c.j = [a];
        return a
    };

    function Wd(a, b) {
        return {
            Od: a,
            Xd: b
        }
    }

    function Xd(a, b, c) {
        b = lc(b, c);
        if (null != b) {
            md(a.g, 8 * c + 5);
            a = a.g;
            var d = +b;
            0 === d ? 0 < 1 / d ? Pc = Qc = 0 : (Qc = 0, Pc = 2147483648) : isNaN(d) ? (Qc = 0, Pc = 2147483647) : (d = (c = 0 > d ? -2147483648 : 0) ? -d : d, 3.4028234663852886E38 < d ? (Qc = 0, Pc = (c | 2139095040) >>> 0) : 1.1754943508222875E-38 > d ? (d = Math.round(d / Math.pow(2, -149)), Qc = 0, Pc = (c | d) >>> 0) : (b = Math.floor(Math.log(d) / Math.LN2), d *= Math.pow(2, -b), d = Math.round(8388608 * d), 16777216 <= d && ++b, Qc = 0, Pc = (c | b + 127 << 23 | d & 8388607) >>> 0));
            c = Pc;
            a.g.push(c >>> 0 & 255);
            a.g.push(c >>> 8 & 255);
            a.g.push(c >>> 16 & 255);
            a.g.push(c >>> 24 & 255)
        }
    }

    function Yd(a, b, c) {
        b = mc(b, c);
        null != b && (md(a.g, 8 * c), a.g.g.push(b ? 1 : 0))
    }

    function Zd(a, b, c) {
        b = jc(b, c);
        null != b && td(a, c, Ea(b))
    }

    function $d(a, b, c, d, e) {
        b = F(b, d, c);
        null != b && (c = qd(a, c), e(b, a), rd(a, c))
    }
    var ae = Wd(function(a, b, c) {
            if (5 !== a.i) return !1;
            B(b, c, Yc(a.g));
            return !0
        }, Xd),
        be = Wd(function(a, b, c, d) {
            if (5 !== a.i) return !1;
            rc(b, c, d, Yc(a.g));
            return !0
        }, Xd),
        ce = Wd(function(a, b, c) {
            if (0 !== a.i) return !1;
            {
                var d = a.g;
                let f = 0,
                    g = a = 0;
                const h = d.i;
                let k = d.g;
                do {
                    var e = h[k++];
                    f |= (e & 127) << g;
                    g += 7
                } while (32 > g && e & 128);
                32 < g && (a |= (e & 127) >> 4);
                for (g = 3; 32 > g && e & 128; g += 7) e = h[k++], a |= (e & 127) << g;
                Wc(d, k);
                if (128 > e) {
                    d = f >>> 0;
                    e = a >>> 0;
                    if (a = e & 2147483648) d = ~d + 1 >>> 0, e = ~e >>> 0, 0 == d && (e = e + 1 >>> 0);
                    d = 4294967296 * e + (d >>> 0);
                    a = a ? -d : d
                } else throw Error("u");
            }
            B(b, c, a);
            return !0
        }, function(a, b, c) {
            b = jc(b, c);
            null != b && ("string" === typeof b && id(b), null != b && (md(a.g, 8 * c), "number" === typeof b ? (a = a.g, Sc(b), ld(a, Pc, Qc)) : (c = id(b), ld(a.g, c.i, c.g))))
        }),
        de = Wd(function(a, b, c) {
            if (0 !== a.i) return !1;
            B(b, c, a.g.o());
            return !0
        }, function(a, b, c) {
            b = jc(b, c);
            null != b && null != b && (md(a.g, 8 * c), nd(a.g, b))
        }),
        ee = Wd(function(a, b, c) {
                if (0 !== a.i && 2 !== a.i) return !1;
                b = kc(b, c, 0, !1);
                if (2 == a.i) {
                    c = bd.prototype.o;
                    var d = a.g.o() >>> 0;
                    for (d = a.g.g + d; a.g.g < d;) b.push(c.call(a.g))
                } else b.push(a.g.o());
                return !0
            },
            function(a, b, c) {
                b = kc(b, c, 0, !1);
                if (null != b)
                    for (let f = 0; f < b.length; f++) {
                        var d = a,
                            e = b[f];
                        null != e && (md(d.g, 8 * c), nd(d.g, e))
                    }
            }),
        fe = Wd(function(a, b, c) {
            if (0 !== a.i) return !1;
            B(b, c, Xc(a.g));
            return !0
        }, Yd),
        ge = Wd(function(a, b, c, d) {
            if (0 !== a.i) return !1;
            rc(b, c, d, Xc(a.g));
            return !0
        }, Yd),
        he = Wd(function(a, b, c) {
            if (2 !== a.i) return !1;
            B(b, c, fd(a));
            return !0
        }, Zd),
        ie = Wd(function(a, b, c) {
            if (2 !== a.i) return !1;
            a = fd(a);
            Xb(b);
            kc(b, c, 2, !1).push(a);
            return !0
        }, function(a, b, c) {
            var d = kc(b, c, 1, !1);
            if (d.length && !(Gb(d) & 4)) {
                Object.isFrozen(d) &&
                    (d = Ib(d.slice()), B(b, c, d, !1, !0));
                var e = 0;
                let f = 0;
                for (; e < d.length; e++) {
                    const g = d[e];
                    null != g && (d[f++] = g)
                }
                f < e && (d.length = f);
                Eb(d, 5)
            }
            Kb(b.Fa) && !Object.isFrozen(d) && (Eb(d, 2), Object.freeze(d));
            b = d;
            if (null != b)
                for (e = 0; e < b.length; e++) d = b[e], null != d && td(a, c, Ea(d))
        }),
        je = Wd(function(a, b, c, d) {
            if (2 !== a.i) return !1;
            rc(b, c, d, fd(a));
            return !0
        }, Zd),
        ke = Wd(function(a, b, c, d, e) {
            if (2 !== a.i) return !1;
            ed(a, tc(b, d, c), e);
            return !0
        }, $d),
        le = Wd(function(a, b, c, d, e) {
            if (2 !== a.i) return !1;
            ed(a, Ac(b, c, d), e);
            return !0
        }, function(a, b, c, d, e) {
            b =
                xc(b, d, c);
            if (null != b)
                for (d = 0; d < b.length; d++) {
                    const f = qd(a, c);
                    e(b[d], a);
                    rd(a, f)
                }
        }),
        me = Wd(function(a, b, c, d, e, f) {
            if (2 !== a.i) return !1;
            (f = sc(b, f)) && f !== c && oc(b, f);
            b = tc(b, d, c);
            ed(a, b, e);
            return !0
        }, $d),
        ne = Wd(function(a, b, c) {
            if (0 !== a.i) return !1;
            B(b, c, a.g.o());
            return !0
        }, function(a, b, c) {
            b = jc(b, c);
            null != b && (b = parseInt(b, 10), md(a.g, 8 * c), nd(a.g, b))
        });
    var oe = class extends H {
            constructor(a) {
                super(a)
            }
            getTypeName() {
                return Cc(this, 1).split("/").pop()
            }
        },
        pe = [oe, 1, Wd(function(a, b, c) {
            if (2 !== a.i) return !1;
            a = fd(a);
            pc(b, c, a);
            return !0
        }, Zd), 2, Wd(function(a, b, c) {
            if (2 !== a.i) return !1;
            const d = a.g.o() >>> 0;
            a = $c(a.g, d);
            qc(b, c, a);
            return !0
        }, function(a, b, c) {
            b = nc(b, c);
            null != b && td(a, c, Nc(b).buffer)
        })];

    function qe() {};

    function re(a, b, c) {
        for (const d in a) b.call(c, a[d], d, a)
    }
    const se = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function te(a, b) {
        let c, d;
        for (let e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (let f = 0; f < se.length; f++) c = se[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    var ue;

    function ve() {
        if (void 0 === ue) {
            var a = null,
                b = t.trustedTypes;
            if (b && b.createPolicy) {
                try {
                    a = b.createPolicy("goog#html", {
                        createHTML: ua,
                        createScript: ua,
                        createScriptURL: ua
                    })
                } catch (c) {
                    t.console && t.console.error(c.message)
                }
                ue = a
            } else ue = a
        }
        return ue
    };

    function we(a, b) {
        this.g = a === xe && b || "";
        this.i = ye
    }
    we.prototype.Oc = !0;
    we.prototype.Nc = function() {
        return this.g
    };

    function ze(a) {
        return a instanceof we && a.constructor === we && a.i === ye ? a.g : "type_error:Const"
    }
    var ye = {},
        xe = {};
    var Be = class {
        constructor(a, b) {
            this.g = b === Ae ? a : ""
        }
        toString() {
            return this.g + ""
        }
    };
    Be.prototype.Oc = !0;
    Be.prototype.Nc = function() {
        return this.g.toString()
    };

    function Ce(a) {
        return a instanceof Be && a.constructor === Be ? a.g : "type_error:TrustedResourceUrl"
    }

    function De() {
        var a = {},
            b = ze(new we(xe, "//google-doodles.appspot.com/?"));
        if (!Ee.test(b)) throw Error("A`" + b);
        var c = b.replace(Fe, function(d, e) {
            if (!Object.prototype.hasOwnProperty.call(a, e)) throw Error("B`" + e + "`" + b + "`" + JSON.stringify(a));
            d = a[e];
            return d instanceof we ? ze(d) : encodeURIComponent(String(d))
        });
        return Ge(c)
    }
    var Fe = /%{(\w+)}/g,
        Ee = RegExp("^((https:)?//[0-9a-z.:[\\]-]+/|/[^/\\\\]|[^:/\\\\%]+/|[^:/\\\\%]*[?#]|about:blank#)", "i"),
        He = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;

    function Ie(a) {
        var b = De();
        b = He.exec(Ce(b).toString());
        var c = b[3] || "";
        return Ge(b[1] + Je("?", b[2] || "", a) + Je("#", c))
    }
    var Ae = {};

    function Ge(a) {
        const b = ve();
        a = b ? b.createScriptURL(a) : a;
        return new Be(a, Ae)
    }

    function Je(a, b, c) {
        if (null == c) return b;
        if ('string' === typeof c) return c ? a + encodeURIComponent(c) : '';
        for (var d in c)
            if (Object.prototype.hasOwnProperty.call(c, d)) {
                var e = c[d];
                e = Array.isArray(e) ? e : [e];
                for (var f = 0; f < e.length; f++) {
                    var g = e[f];
                    null != g &&
                        (b || (b = a),
                            b += (b.length > a.length ? '&' : '') + encodeURIComponent(d) + '=' +
                            encodeURIComponent(String(g)))
                }
            }
        return b
    };
    var Le = class {
        constructor(a, b) {
            this.g = b === Ke ? a : ''
        }
        toString() {
            return this.g.toString()
        }
    };
    Le.prototype.Oc = !0;
    Le.prototype.Nc = function() {
        return this.g.toString()
    };

    function Me(a) {
        return a instanceof Le && a.constructor === Le ? a.g : 'type_error:SafeUrl'
    }
    var Ne = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
        Ke = {},
        Oe = new Le('about:invalid#zClosurez', Ke);
    const Pe = {};

    function Qe(a) {
        return a instanceof Te && a.constructor === Te ? a.g : 'type_error:SafeHtml'
    }

    function Ue(a) {
        a instanceof Te ||
            (a = 'object' == typeof a && a.Oc ? a.Nc() : String(a),
                Na.test(a) &&
                (-1 != a.indexOf('&') && (a = a.replace(Ha, '&amp;')),
                    -1 != a.indexOf('<') && (a = a.replace(Ia, '&lt;')),
                    -1 != a.indexOf('>') && (a = a.replace(Ja, '&gt;')),
                    -1 != a.indexOf('"') && (a = a.replace(Ka, '&quot;')),
                    -1 != a.indexOf('\'') && (a = a.replace(La, '&#39;')),
                    -1 != a.indexOf('\x00') && (a = a.replace(Ma, '&#0;'))),
                a = Ve(a));
        return a
    }

    function Ve(a) {
        const b = ve();
        a = b ? b.createHTML(a) : a;
        return new Te(a, Pe)
    }

    function We(a) {
        const b = Ue(Xe),
            c = [],
            d = e => {
                Array.isArray(e) ? e.forEach(d) : (e = Ue(e), c.push(Qe(e).toString()))
            };
        a.forEach(d);
        return Ve(c.join(Qe(b).toString()))
    }

    function Ye(a) {
        return We(Array.prototype.slice.call(arguments))
    }
    class Te {
        constructor(a, b) {
            this.g = b === Pe ? a : '';
            this.Oc = !0
        }
        Nc() {
            return this.g.toString()
        }
        toString() {
            return this.g.toString()
        }
    }
    var Xe = new Te(t.trustedTypes && t.trustedTypes.emptyHTML || '', Pe),
        Ze = Ve('<br>');
    var $e = function(a) {
        let b = !1,
            c;
        return function() {
            b || (c = a(), b = !0);
            return c
        }
    }(function() {
        var a = document.createElement('div'),
            b = document.createElement('div');
        b.appendChild(document.createElement('div'));
        a.appendChild(b);
        b = a.firstChild.firstChild;
        a.innerHTML = Qe(Xe);
        return !b.parentElement
    });

    function af(a, b) {
        if ($e())
            for (; a.lastChild;) a.removeChild(a.lastChild);
        a.innerHTML = Qe(b)
    }

    function bf(a, b) {
        a: {
            var c = (a.ownerDocument && a.ownerDocument.defaultView || t).document;
            if (c.querySelector && (c = c.querySelector("script[nonce]")) && (c = c.nonce || c.getAttribute("nonce")) && cf.test(c)) break a;c = ""
        }
        c && a.setAttribute("nonce", c);a.src = Ce(b)
    }

    function df(a) {
        a instanceof Le || a instanceof Le || (a = "object" == typeof a && a.Oc ? a.Nc() : String(a), Ne.test(a) || (a = "about:invalid#zClosurez"), a = new Le(a, Ke));
        t.open(Me(a), "")
    }
    var cf = /^[\w+/_-]+[=]{0,2}$/;
    var ef = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

    function ff(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("="),
                    e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else f = a[c];
                b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
        }
    };

    function gf(a) {
        this.j = this.O = this.o = "";
        this.H = null;
        this.v = this.u = "";
        this.i = !1;
        var b;
        a instanceof gf ? (this.i = a.i, hf(this, a.o), this.O = a.O, this.j = a.j, jf(this, a.H), this.u = a.u, kf(this, a.g.clone()), this.v = a.v) : a && (b = String(a).match(ef)) ? (this.i = !1, hf(this, b[1] || "", !0), this.O = lf(b[2] || ""), this.j = lf(b[3] || "", !0), jf(this, b[4]), this.u = lf(b[5] || "", !0), kf(this, b[6] || "", !0), this.v = lf(b[7] || "")) : (this.i = !1, this.g = new mf(null, this.i))
    }
    gf.prototype.toString = function() {
        var a = [],
            b = this.o;
        b && a.push(nf(b, of, !0), ":");
        var c = this.j;
        if (c || "file" == b) a.push("//"), (b = this.O) && a.push(nf(b, of, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.H, null != c && a.push(":", String(c));
        if (c = this.u) this.j && "/" != c.charAt(0) && a.push("/"), a.push(nf(c, "/" == c.charAt(0) ? pf : qf, !0));
        (c = this.g.toString()) && a.push("?", c);
        (c = this.v) && a.push("#", nf(c, rf));
        return a.join("")
    };
    gf.prototype.clone = function() {
        return new gf(this)
    };

    function hf(a, b, c) {
        a.o = c ? lf(b, !0) : b;
        a.o && (a.o = a.o.replace(/:$/, ""))
    }

    function jf(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b) throw Error("C`" + b);
            a.H = b
        } else a.H = null
    }

    function kf(a, b, c) {
        b instanceof mf ? (a.g = b, sf(a.g, a.i)) : (c || (b = nf(b, tf)), a.g = new mf(b, a.i))
    }

    function uf(a, b, c) {
        a.g.set(b, c);
        return a
    }

    function vf(a) {
        return a instanceof gf ? a.clone() : new gf(a)
    }

    function lf(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }

    function nf(a, b, c) {
        return "string" === typeof a ? (a = encodeURI(a).replace(b, wf), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
    }

    function wf(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
    var of = /[#\/\?@]/g, qf = /[#\?:]/g, pf = /[#\?]/g, tf = /[#\?@]/g, rf = /#/g;

    function mf(a, b) {
        this.i = this.g = null;
        this.j = a || null;
        this.o = !!b
    }

    function xf(a) {
        a.g || (a.g = new Map, a.i = 0, a.j && ff(a.j, function(b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    }
    q = mf.prototype;
    q.add = function(a, b) {
        xf(this);
        this.j = null;
        a = yf(this, a);
        var c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.i += 1;
        return this
    };

    function zf(a, b) {
        xf(a);
        b = yf(a, b);
        a.g.has(b) && (a.j = null, a.i -= a.g.get(b).length, a.g.delete(b))
    }
    q.clear = function() {
        this.g = this.j = null;
        this.i = 0
    };
    q.isEmpty = function() {
        xf(this);
        return 0 == this.i
    };

    function Af(a, b) {
        xf(a);
        b = yf(a, b);
        return a.g.has(b)
    }
    q.forEach = function(a, b) {
        xf(this);
        this.g.forEach(function(c, d) {
            c.forEach(function(e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    };
    q.Be = function(a) {
        xf(this);
        let b = [];
        if ("string" === typeof a) Af(this, a) && (b = b.concat(this.g.get(yf(this, a))));
        else {
            a = Array.from(this.g.values());
            for (let c = 0; c < a.length; c++) b = b.concat(a[c])
        }
        return b
    };
    q.set = function(a, b) {
        xf(this);
        this.j = null;
        a = yf(this, a);
        Af(this, a) && (this.i -= this.g.get(a).length);
        this.g.set(a, [b]);
        this.i += 1;
        return this
    };
    q.get = function(a, b) {
        if (!a) return b;
        a = this.Be(a);
        return 0 < a.length ? String(a[0]) : b
    };
    q.toString = function() {
        if (this.j) return this.j;
        if (!this.g) return "";
        const a = [],
            b = Array.from(this.g.keys());
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            const f = encodeURIComponent(String(d)),
                g = this.Be(d);
            for (d = 0; d < g.length; d++) {
                var e = f;
                "" !== g[d] && (e += "=" + encodeURIComponent(String(g[d])));
                a.push(e)
            }
        }
        return this.j = a.join("&")
    };
    q.clone = function() {
        var a = new mf;
        a.j = this.j;
        this.g && (a.g = new Map(this.g), a.i = this.i);
        return a
    };

    function yf(a, b) {
        b = String(b);
        a.o && (b = b.toLowerCase());
        return b
    }

    function sf(a, b) {
        b && !a.o && (xf(a), a.j = null, a.g.forEach(function(c, d) {
            var e = d.toLowerCase();
            d != e && (zf(this, d), zf(this, e), 0 < c.length && (this.j = null, this.g.set(yf(this, e), Xa(c)), this.i += c.length))
        }, a));
        a.o = b
    };
    var Bf = navigator.userAgent,
        Cf = new gf(location.href),
        Df = () => "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints,
        Ef = () => Bf.includes("iPad") || Bf.includes("iPhone") || Bf.includes("iPod") || Df();
    const Ff = () => Bf.toLowerCase().includes("gsa") || Bf.includes("GoogleApp");
    var I = () => Ef() || Bf.includes("Android") || Bf.includes("Mobile") || Bf.includes("Silk") || Bf.includes("UCBrowser") || Bf.includes("UCWEB"),
        Gf = "sdoodles" === document.documentElement.id && !I();
    Bf.includes("GT-I9300") && Bf.includes("Chrome");
    var Hf = () => Cf.u.includes("/logos/") && Cf.u.includes(".html"),
        If = () => {
            const a = Cf.g.get("ntp");
            return "1" === a || "2" === a
        },
        Jf = () => "1" === Cf.g.get("fpdoodle") && !!document.getElementById("fpdoodle"),
        Kf = () => !!document.querySelector("body#iframedoodle"),
        Lf = () => (!I() || Df()) && !Gf && !(document.getElementById("fkbx") || If()) && !Jf() && !Hf(),
        Mf = Df() && !Gf && !(document.getElementById("fkbx") || If()) && !Jf() && !Hf();
    var Pf = a => {
        let b = new Image;
        b.onerror = b.onload = b.onabort = () => {
            delete Nf[Of]
        };
        Nf[Of] = b;
        b.src = `${""}/gen_204?atyp=i&ct=${"doodle"}&cad=${a}&zx=${Date.now()}`;
        Of++
    };
    let Nf = [],
        Of = 0;
    /*

     SPDX-License-Identifier: Apache-2.0
    */
    var Qf;
    try {
        new URL("s://g"), Qf = !0
    } catch (a) {
        Qf = !1
    }
    const Rf = Qf;

    function Sf(a, b) {
        a.src = Ce(b);
        var c;
        let d;
        (c = (b = null == (d = (c = (a.ownerDocument && a.ownerDocument.defaultView || window).document).querySelector) ? void 0 : d.call(c, "script[nonce]")) ? b.nonce || b.getAttribute("nonce") || "" : "") && a.setAttribute("nonce", c)
    };

    function Tf(a, b, c) {
        b = String(b);
        let d = c;
        "inserthtml" === b.toLowerCase() && (d = Qe(c));
        return a.execCommand(b, !1, d)
    };
    var Uf = RegExp("[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]"),
        Vf = RegExp("^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc]"),
        Wf = /^http:\/\/.*/,
        Xf = /\s+/,
        Yf = /[\d\u06f0-\u06f9]/;
    class Zf {
        constructor(a) {
            this.Zc = a
        }
    }

    function $f(a) {
        return new Zf(b => b.substr(0, a.length + 1).toLowerCase() === a + ":")
    }
    const ag = [$f("data"), $f("http"), $f("https"), $f("mailto"), $f("ftp"), new Zf(a => /^[^:]*([/?#]|$)/.test(a))];

    function bg(a, b = ag) {
        for (let c = 0; c < b.length; ++c) {
            const d = b[c];
            if (d instanceof Zf && d.Zc(a)) return new Le(a, Ke)
        }
    };
    var cg = (a, ...b) => {
            if (a)
                for (let c = 0; c < b.length; c += 2) {
                    const d = b[c],
                        e = b[c + 1],
                        f = a.style;
                    f && d in f ? f[d] = e : d in a && (a[d] = e)
                }
        },
        dg = Date.now,
        eg = ["Moz", "ms", "O", "webkit"],
        fg = (a, b, c) => {
            if (a) {
                for (const d of eg) a.style[d + b] = c;
                a.style[b.charAt(0).toLowerCase() + b.substr(1)] = c
            }
        },
        gg = ["", "moz", "ms", "o", "webkit"],
        hg = (a, b) => {
            if (!a) return null;
            for (const d of gg) {
                var c = b;
                0 < d.length && (c = b.charAt(0).toUpperCase() + b.substr(1));
                c = d + c;
                if ("undefined" != typeof a[c]) return c
            }
            return null
        },
        ig = (a, b) => {
            if (b = (b = b && !(Ff() && Ef())) || If()) df(a);
            else {
                b = window.top.location;
                a = bg(a, ag) || Oe;
                if (a instanceof Le) a = Me(a);
                else {
                    b: if (Rf) {
                        try {
                            var c = new URL(a)
                        } catch (d) {
                            c = "https:";
                            break b
                        }
                        c = c.protocol
                    } else c: {
                        c = document.createElement("a");
                        try {
                            c.href = a
                        } catch (d) {
                            c = void 0;
                            break c
                        }
                        c = c.protocol;c = ":" === c || "" === c ? "https:" : c
                    }
                    a = "javascript:" !== c ? a : void 0
                }
                void 0 !== a && b.assign(a)
            }
        },
        jg = () => window.google && void 0 !== window.google.doodle ? window.google.doodle : null,
        kg = (a, b) => {
            const c = jg();
            return c && void 0 != c[a] ? c[a] : b
        },
        lg = a => {
            jg() || (window.google.doodle = {});
            window.google.doodle.pvc =
                a
        };

    function mg() {
        var a = ng;
        a = og(pg(qg(new rg, Cc(F(a.g, rg, 2), 1)), Cc(F(a.g, rg, 2), 2)), sg.Yd.name);
        a = ob(Vd(a, tg), 3);
        a = uf(vf("https://www.google.com/webhp"), "doodle", `${ug}_${a}`).toString();
        a = new URL(a);
        const b = new URL(a.origin);
        for (let c of "fpdoodle tune doodle hl gl nord".split(" ")) {
            const d = a.searchParams.get(c);
            d && b.searchParams.set(c, d)
        }
        return b.toString()
    }
    var vg = (a, b) => {
            a = kg("doodle_args", {})[a];
            return null != a ? a : b
        },
        wg = () => !!vg("is_dogfood", !1),
        xg = kg("hl", "en"),
        yg = kg("gl", "");
    RegExp("^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)", "i").test(xg);
    var Ag = (a, b, c) => {
        const d = Math.max(0, c - 230) + (document.querySelector("div.og-pdp") ? 36 : 12);
        cg(a, "width", `${b}px`, "height", `${c}px`);
        zg(d)
    };
    const zg = a => {
        a = `${a}px`;
        var b = document.getElementById("lga");
        b && cg(b, "marginBottom", a);
        document.getElementById("fkbx") || If() || ((b = document.getElementById("searchform")) && cg(b, "transform", "translateY(" + a + ")"), a = new UIEvent("resize", {
            bubbles: !1,
            yg: !1,
            view: window,
            detail: 0
        }), window.dispatchEvent(a))
    };
    let Bg = null,
        Cg = null,
        Dg = null;
    var Eg = () => {
            Dg ||
                (window.google && window.google.kEI && window.google.kEI.length ?
                    Dg = window.google.kEI :
                    Kf() && Af(Cf.g, 'ei') && (Dg = Cf.g.get('ei')));
            return Dg
        },
        Fg = () => {
            if (!Bg) {
                const a = document.getElementById('hplogoved');
                a ? Bg = a.getAttribute('data-ved') :
                    Kf() && Af(Cf.g, 'ved') && (Bg = Cf.g.get('ved'))
            }
            return Bg
        },
        Gg = a => {
            const b = new gf('/');
            uf(b, 'fpdoodle', '1');
            uf(b, 'doodle', String(a));
            xg && uf(b, 'hl', xg);
            yg && uf(b, 'gl', yg);
            ig(b.toString(), !1)
        };
    var Hg = {
            [2]: 'wss://matchmaker.us-central1-a-h22.h22.cloud.doodles.goog',
            [3]: 'wss://matchmaker.us-west1-a-halloween.dev.cloud.doodles.goog',
            [4]: 'wss://matchmaker.prod.h22.cloud.doodles.goog',
            [6]: 'wss://matchmaker.18.h18.cloud.doodles.goog',
            [5]: 'wss://matchmaker.18.h18.cloud.doodles.goog',
            [1]: '',
            [0]: ''
        } [5],
        K = I() && !Mf,
        L = K ? 540 : 960,
        Ig = K ? 960 : 540,
        Jg = 1E3 / 24,
        Kg = document.querySelector('#hplogo'),
        N = document.getElementById('hpcanvas'),
        O = N.getContext('2d'),
        Lg = new Map([
            [87, !0],
            [65, !0],
            [83, !0],
            [68, !0],
            [32, !0],
            [37, !0],
            [38, !0],
            [39, !0],
            [40, !0],
            [192, !0]
        ]),
        ug = kg('id', '207425579'),
        Mg = I() ? 78 : 0,
        Ng = 0 <= 'en en-US en-GB ko ko-KR ko-US'.split(' ').indexOf(xg) ?
        'Poor Story' :
        'Noto Sans',
        Og = `${Ng},sans-serif`,
        Pg = 'true' === vg('disable_host', 'false');

    function Qg(a) {
        if (!a.i) {
            a.i = !0;
            for (const b of a.j) b()
        }
    }

    function Rg(a, b) {
        a.i ? b() : a.j.push(b)
    }
    class Sg {
        constructor(a) {
            this.g = a;
            this.i = !1;
            this.j = []
        }
        preload() {}
    }
    var Tg = (a, b) => {
        Promise.all(a.map(c => c.preload())).then(b)
    };
    class Ug extends Sg {
        constructor(a) {
            super(a);
            this.image = new Image
        }
        preload() {
            if (this.image.src) return Promise.resolve(this.image);
            let a;
            const b = new Promise(d => a = d),
                c = () => {
                    Qg(this);
                    a(this.image)
                };
            this.image.crossOrigin = 'Anonymous';
            this.image.decode ? (this.image.src = this.g,
                    this.image.decode().then(
                        c,
                        () => {
                            this.image.removeAttribute('crossOrigin');
                            this.image.src = this.g;
                            this.image.decode().then(c, () => {
                                c()
                            })
                        })) :
                (this.image.onload = c, this.image.onerror = () => {
                    this.image.removeAttribute('crossOrigin');
                    this.image.removeAttribute('onerror');
                    this.image.src = this.image.src
                }, this.image.src = this.g);
            (this.image.complete || 'complete' == this.image.readyState) && c();
            return b
        }
    };

    function Vg(a, b, c) {
        a.g.push(b);
        a.i.push(c);
        return a.g.length - 1
    }

    function Wg(a) {
        return 'number' === typeof a ? a : a[0]
    }

    function Xg(a, b) {
        var c = Yg;
        Promise.all(a.map(d => c.preload(d))).then(() => b && b())
    }

    function Zg(a, b, c, d, e, f, g, h, k) {
        var l = c[1],
            m = c[2];
        const n = c[3],
            w = c[4];
        let v, A, p, u;
        void 0 === d ? (v = l, A = m, p = n, u = w, g = f = 0, d = n, e = w) : void 0 === f ? (v = l, A = m, p = n, u = w, g = f = 0) : (v = l, A = m, p = d, u = e, d = h, e = k);
        v < l && (k = l - v, v = l, p -= k, f += k, d -= k);
        A < m && (k = m - A, A = m, u -= k, g += k, e -= k);
        v + p > l + n && (l = v + p - (l + n), p -= l, d -= l);
        A + u > m + w && (m = A + u - (m + w), u -= m, e -= m);
        a = a.g[Wg(c)];
        if (!a.i) throw Error("E");
        0 < p && 0 < u && b.drawImage(a.image, v, A, p, u, f, g, d, e)
    }

    function $g(a, b, c, d, e, f = 1, g = !1) {
        const h = b[3],
            k = b[4];
        c.save();
        c.translate(d, e);
        c.scale(f, f);
        Zg(a, c, b, h, k, -h * (g ? .5 : 0), -k * (g ? .5 : 0), h, k);
        c.restore()
    }

    function ah(a = 1) {
        var b = bh;
        const c = b[5] || 1;
        b = ch.i[Wg(b)];
        return `${a*b[0]/c}px ${a*b[1]/c}px`
    }
    var eh = class {
        constructor() {
            var a = dh;
            this.g = [];
            this.i = [];
            for (const b of a)
                Vg(this, new Ug('/logos/2021/halloween18_reboot/r1025/' + b.filename), b.size)
        }
        preload(a, b) {
            const c = this.g[Wg(a)];
            return (new Promise(d => {
                    Rg(c, d);
                    c.preload()
                }))
                .then(() => b && b())
        }
        getSize(a) {
            return {
                width: a[3],
                height: a[4]
            }
        }
    };
    class fh extends eh {}
    ja(fh);
    var dh = [{
            filename: "main-sprite.png",
            size: [2042, 565]
        }, {
            filename: "hats-sprite.png",
            size: [2047, 1120]
        }, {
            filename: "achievements-sprite.png",
            size: [2047, 1195]
        }, {
            filename: "tutorial-sprite.png",
            size: [2044, 1615]
        }, {
            filename: "alpha-sprite.png",
            size: [2045, 3832]
        }, {
            filename: "bravo-sprite.png",
            size: [2047, 3574]
        }, {
            filename: "desktop-sprite.png",
            size: [3849, 1083]
        }, {
            filename: "initial-sprite.png",
            size: [1017, 412]
        }, {
            filename: "mobile-sprite.png",
            size: [3798, 1923]
        }, {
            filename: "dogfood-sprite.png",
            size: [60, 60]
        }],
        gh = [4, 234, 3708,
            75, 75
        ],
        hh = [6, 0, 0, 960, 540],
        ih = [8, 0, 0, 540, 960],
        jh = [0, 951, 271, 306, 117],
        kh = [0, 951, 235, 32, 33],
        lh = [6, 963, 0, 960, 540],
        mh = [8, 543, 0, 540, 960],
        nh = [0, 1795, 271, 166, 192],
        bh = [7, 93, 0, 90, 97],
        oh = [3, 874, 718, 300, 100],
        ph = [0, 459, 415, 96, 96],
        qh = [6, 1926, 0, 960, 540],
        rh = [8, 1086, 0, 540, 960],
        sh = [3, 0, 0, 512, 512],
        th = [3, 515, 0, 512, 512],
        uh = [3, 1829, 718, 156, 76],
        vh = [3, 874, 668, 56, 37],
        wh = [1, 687, 956, 100, 100],
        xh = [3, 1177, 718, 275, 261],
        yh = [3, 1924, 0, 116, 116],
        zh = [6, 0, 543, 960, 540],
        Ah = [6, 963, 543, 960, 540],
        Bh = [8, 2715, 0, 540, 960],
        Ch = [6, 1926, 543, 960, 540],
        Dh = [8, 3258, 0, 540, 960],
        Eh = [3, 1455, 718, 205, 93],
        Fh = [0, 1528, 271, 264, 202],
        Gh = [0, 1260, 271, 265, 265],
        Hh = [3, 447, 515, 424, 462],
        Ih = [3, 1924, 119, 100, 98],
        Jh = [3, 1030, 0, 444, 356],
        Kh = [3, 1477, 0, 444, 356],
        Lh = [3, 1477, 0, 444, 356],
        Mh = [3, 1030, 359, 444, 356],
        Nh = [3, 1477, 359, 444, 356],
        Oh = [3, 0, 515, 444, 356],
        Ph = [0, 1964, 271, 77, 77],
        Qh = [0, 0, 0, 640, 141],
        Rh = [3, 1663, 718, 163, 75],
        Sh = [3, 933, 668, 56, 37],
        Th = [6, 2889, 543, 960, 540],
        Uh = [8, 0, 963, 540, 960],
        Vh = [
            [3, 874, 515, 150, 150],
            [3, 874, 515, 150, 150],
            [3, 1663, 796, 150, 150],
            [3, 1663, 796, 150, 150],
            [3, 1663, 796,
                150, 150
            ],
            [3, 1816, 797, 150, 150],
            [3, 1816, 797, 150, 150],
            [3, 1816, 797, 150, 150],
            [3, 1455, 814, 150, 150],
            [3, 1455, 814, 150, 150],
            [3, 1455, 814, 150, 150],
            [3, 874, 821, 150, 150],
            [3, 874, 821, 150, 150],
            [3, 874, 821, 150, 150],
            [3, 0, 874, 150, 150],
            [3, 153, 874, 150, 150],
            [3, 153, 874, 150, 150],
            [3, 153, 874, 150, 150],
            [3, 1608, 949, 150, 150],
            [3, 1608, 949, 150, 150],
            [3, 1761, 950, 150, 150],
            [3, 1761, 950, 150, 150],
            [3, 1761, 950, 150, 150],
            [3, 874, 515, 150, 150],
            [3, 1455, 967, 150, 150],
            [3, 874, 974, 150, 150],
            [3, 874, 974, 150, 150],
            [3, 306, 980, 150, 150],
            [3, 1816, 797, 150, 150],
            [3,
                1816, 797, 150, 150
            ],
            [3, 1816, 797, 150, 150],
            [3, 1455, 814, 150, 150],
            [3, 1455, 814, 150, 150],
            [3, 1455, 814, 150, 150],
            [3, 874, 821, 150, 150],
            [3, 874, 821, 150, 150],
            [3, 874, 821, 150, 150],
            [3, 0, 874, 150, 150],
            [3, 153, 874, 150, 150],
            [3, 153, 874, 150, 150],
            [3, 153, 874, 150, 150],
            [3, 1608, 949, 150, 150],
            [3, 1608, 949, 150, 150],
            [3, 1761, 950, 150, 150],
            [3, 1761, 950, 150, 150],
            [3, 1761, 950, 150, 150]
        ],
        Wh = [
            [1, 793, 144, 200, 200],
            [1, 1467, 152, 200, 200],
            [1, 0, 163, 200, 200],
            [1, 996, 174, 200, 200],
            [1, 1199, 174, 200, 200],
            [1, 203, 181, 200, 200],
            [1, 1670, 187, 200, 200],
            [1, 406, 331,
                200, 200
            ],
            [1, 609, 347, 200, 200],
            [1, 1402, 355, 200, 200],
            [1, 0, 366, 200, 200],
            [1, 812, 377, 200, 200],
            [1, 1015, 377, 200, 200],
            [1, 203, 384, 200, 200],
            [1, 1605, 390, 200, 200],
            [1, 1808, 390, 200, 200],
            [1, 406, 534, 200, 200],
            [1, 609, 550, 200, 200],
            [1, 1218, 558, 200, 200],
            [1, 0, 569, 200, 200],
            [1, 812, 580, 200, 200],
            [1, 1015, 580, 200, 200],
            [1, 203, 587, 200, 200],
            [1, 1421, 593, 200, 200],
            [1, 1624, 593, 200, 200],
            [1, 1827, 593, 200, 200],
            [1, 406, 737, 200, 200],
            [1, 609, 753, 200, 200],
            [1, 1218, 761, 200, 200],
            [1, 0, 772, 200, 200],
            [1, 812, 783, 200, 200]
        ],
        Xh = [
            [3, 1988, 688, 50, 50],
            [3, 1988,
                688, 50, 50
            ],
            [3, 1988, 741, 50, 50],
            [3, 1988, 741, 50, 50],
            [3, 1608, 814, 50, 50],
            [3, 1608, 814, 50, 50],
            [3, 1105, 821, 50, 50],
            [3, 1105, 821, 50, 50],
            [3, 1608, 867, 50, 50],
            [3, 1608, 867, 50, 50],
            [3, 384, 874, 50, 50],
            [3, 384, 874, 50, 50],
            [3, 1105, 874, 50, 50],
            [3, 1105, 874, 50, 50],
            [3, 1105, 927, 50, 50],
            [3, 1105, 927, 50, 50],
            [3, 1988, 688, 50, 50],
            [3, 1988, 688, 50, 50],
            [3, 1988, 741, 50, 50],
            [3, 1988, 741, 50, 50],
            [3, 1608, 814, 50, 50],
            [3, 1608, 814, 50, 50],
            [3, 1105, 821, 50, 50],
            [3, 1992, 953, 50, 50],
            [3, 1992, 1006, 50, 50],
            [3, 765, 1058, 50, 50],
            [3, 818, 1058, 50, 50],
            [3, 818, 1058, 50, 50],
            [3, 1992, 1059, 50, 50],
            [3, 1992, 1059, 50, 50],
            [3, 1333, 1060, 50, 50],
            [3, 1333, 1060, 50, 50],
            [3, 1386, 1060, 50, 50],
            [3, 1386, 1060, 50, 50],
            [3, 1992, 1112, 50, 50],
            [3, 1992, 1112, 50, 50],
            [3, 1486, 1198, 50, 50],
            [3, 1486, 1198, 50, 50],
            [3, 1539, 1198, 50, 50],
            [3, 1539, 1198, 50, 50],
            [3, 1224, 1213, 50, 50],
            [3, 1224, 1213, 50, 50],
            [3, 818, 1058, 50, 50],
            [3, 818, 1058, 50, 50],
            [3, 1992, 1059, 50, 50],
            [3, 1992, 1059, 50, 50],
            [3, 1333, 1060, 50, 50],
            [3, 1333, 1060, 50, 50],
            [3, 1386, 1060, 50, 50],
            [3, 1386, 1060, 50, 50],
            [3, 1992, 1112, 50, 50],
            [3, 1992, 1112, 50, 50],
            [3, 1486, 1198, 50, 50],
            [3,
                1486, 1198, 50, 50
            ],
            [3, 1277, 1213, 50, 50],
            [3, 1277, 1213, 50, 50],
            [3, 1149, 1288, 50, 50],
            [3, 1608, 867, 50, 50],
            [3, 384, 874, 50, 50],
            [3, 384, 874, 50, 50],
            [3, 1105, 874, 50, 50],
            [3, 1105, 874, 50, 50],
            [3, 1105, 927, 50, 50],
            [3, 1105, 927, 50, 50],
            [3, 1988, 688, 50, 50],
            [3, 1988, 688, 50, 50],
            [3, 1988, 741, 50, 50],
            [3, 1988, 741, 50, 50],
            [3, 1608, 814, 50, 50],
            [3, 1608, 814, 50, 50],
            [3, 1105, 821, 50, 50],
            [3, 1105, 821, 50, 50],
            [3, 234, 1333, 50, 50],
            [3, 234, 1333, 50, 50],
            [3, 1149, 1341, 50, 50],
            [3, 384, 874, 50, 50],
            [3, 1105, 874, 50, 50],
            [3, 1105, 874, 50, 50],
            [3, 1105, 927, 50, 50],
            [3, 1105,
                927, 50, 50
            ]
        ],
        Yh = [
            [3, 1383, 1429, 50, 50],
            [3, 1383, 1429, 50, 50],
            [3, 702, 1439, 50, 50],
            [3, 702, 1439, 50, 50],
            [3, 1077, 1444, 50, 50],
            [3, 1077, 1444, 50, 50],
            [3, 702, 1492, 50, 50],
            [3, 702, 1492, 50, 50],
            [3, 1311, 1507, 50, 50],
            [3, 1311, 1507, 50, 50],
            [3, 755, 1511, 50, 50],
            [3, 755, 1511, 50, 50],
            [3, 234, 1517, 50, 50],
            [3, 234, 1517, 50, 50],
            [3, 287, 1517, 50, 50],
            [3, 287, 1517, 50, 50],
            [3, 1383, 1429, 50, 50],
            [3, 340, 1517, 50, 50],
            [3, 393, 1517, 50, 50],
            [3, 393, 1517, 50, 50],
            [3, 446, 1517, 50, 50],
            [3, 499, 1517, 50, 50],
            [3, 552, 1517, 50, 50],
            [3, 605, 1517, 50, 50],
            [3, 808, 1519, 50, 50],
            [3,
                808, 1519, 50, 50
            ],
            [3, 861, 1519, 50, 50],
            [3, 861, 1519, 50, 50],
            [3, 914, 1519, 50, 50],
            [3, 914, 1519, 50, 50],
            [3, 967, 1522, 50, 50],
            [3, 967, 1522, 50, 50],
            [3, 1020, 1522, 50, 50],
            [3, 1020, 1522, 50, 50],
            [3, 658, 1545, 50, 50],
            [3, 658, 1545, 50, 50],
            [3, 1311, 1560, 50, 50],
            [3, 1311, 1560, 50, 50],
            [3, 605, 1517, 50, 50],
            [3, 605, 1517, 50, 50],
            [3, 808, 1519, 50, 50],
            [3, 808, 1519, 50, 50],
            [3, 861, 1519, 50, 50],
            [3, 711, 1564, 50, 50],
            [3, 1364, 1564, 50, 50],
            [3, 1364, 1564, 50, 50],
            [3, 1417, 1564, 50, 50],
            [3, 1470, 1564, 50, 50],
            [3, 1383, 1429, 50, 50],
            [3, 1383, 1429, 50, 50],
            [3, 702, 1439, 50, 50],
            [3, 702, 1439, 50, 50],
            [3, 1077, 1444, 50, 50],
            [3, 1077, 1444, 50, 50],
            [3, 702, 1492, 50, 50],
            [3, 702, 1492, 50, 50],
            [3, 1311, 1507, 50, 50],
            [3, 1311, 1507, 50, 50],
            [3, 755, 1511, 50, 50],
            [3, 755, 1511, 50, 50],
            [3, 234, 1517, 50, 50],
            [3, 1523, 1565, 50, 50],
            [3, 1576, 1565, 50, 50],
            [3, 1576, 1565, 50, 50],
            [3, 1629, 1565, 50, 50],
            [3, 1383, 1429, 50, 50],
            [3, 702, 1439, 50, 50],
            [3, 702, 1439, 50, 50],
            [3, 1077, 1444, 50, 50],
            [3, 1077, 1444, 50, 50],
            [3, 702, 1492, 50, 50],
            [3, 702, 1492, 50, 50],
            [3, 1311, 1507, 50, 50],
            [3, 1311, 1507, 50, 50],
            [3, 755, 1511, 50, 50],
            [3, 755, 1511, 50, 50],
            [3, 234, 1517, 50,
                50
            ],
            [3, 234, 1517, 50, 50],
            [3, 287, 1517, 50, 50],
            [3, 287, 1517, 50, 50]
        ],
        Zh = [
            [7, 966, 0, 50, 50],
            [7, 966, 0, 50, 50],
            [7, 966, 53, 50, 50],
            [7, 966, 53, 50, 50],
            [7, 966, 106, 50, 50],
            [7, 966, 106, 50, 50],
            [7, 966, 159, 50, 50],
            [7, 966, 159, 50, 50],
            [7, 702, 332, 50, 50],
            [7, 702, 332, 50, 50],
            [7, 755, 332, 50, 50],
            [7, 755, 332, 50, 50],
            [7, 808, 332, 50, 50],
            [7, 808, 332, 50, 50],
            [7, 861, 332, 50, 50],
            [7, 861, 332, 50, 50],
            [7, 914, 332, 50, 50],
            [7, 914, 332, 50, 50],
            [7, 967, 332, 50, 50],
            [7, 78, 349, 50, 50],
            [7, 966, 106, 50, 50],
            [7, 966, 106, 50, 50],
            [7, 966, 159, 50, 50],
            [7, 966, 159, 50, 50],
            [7, 702, 332,
                50, 50
            ],
            [7, 702, 332, 50, 50],
            [7, 755, 332, 50, 50],
            [7, 755, 332, 50, 50],
            [7, 808, 332, 50, 50],
            [7, 808, 332, 50, 50],
            [7, 861, 332, 50, 50],
            [7, 861, 332, 50, 50],
            [7, 966, 0, 50, 50],
            [7, 966, 0, 50, 50],
            [7, 966, 53, 50, 50],
            [7, 966, 53, 50, 50],
            [7, 966, 106, 50, 50],
            [7, 966, 106, 50, 50],
            [7, 966, 159, 50, 50],
            [7, 966, 159, 50, 50],
            [7, 702, 332, 50, 50],
            [7, 702, 332, 50, 50],
            [7, 755, 332, 50, 50],
            [7, 755, 332, 50, 50],
            [7, 808, 332, 50, 50],
            [7, 808, 332, 50, 50],
            [7, 861, 332, 50, 50],
            [7, 861, 332, 50, 50],
            [7, 966, 0, 50, 50],
            [7, 966, 0, 50, 50],
            [7, 966, 53, 50, 50],
            [7, 966, 53, 50, 50],
            [7, 966, 106, 50, 50],
            [7,
                966, 106, 50, 50
            ],
            [7, 966, 159, 50, 50],
            [7, 966, 159, 50, 50],
            [7, 702, 332, 50, 50],
            [7, 702, 332, 50, 50],
            [7, 755, 332, 50, 50],
            [7, 755, 332, 50, 50],
            [7, 808, 332, 50, 50],
            [7, 808, 332, 50, 50],
            [7, 861, 332, 50, 50],
            [7, 861, 332, 50, 50],
            [7, 966, 0, 50, 50],
            [7, 966, 0, 50, 50],
            [7, 966, 53, 50, 50],
            [7, 966, 53, 50, 50],
            [7, 966, 106, 50, 50],
            [7, 966, 106, 50, 50],
            [7, 966, 159, 50, 50],
            [7, 966, 159, 50, 50],
            [7, 702, 332, 50, 50],
            [7, 702, 332, 50, 50],
            [7, 755, 332, 50, 50],
            [7, 755, 332, 50, 50],
            [7, 808, 332, 50, 50],
            [7, 808, 332, 50, 50],
            [7, 861, 332, 50, 50],
            [7, 861, 332, 50, 50]
        ],
        $h = [
            [0, 1067, 0, 314, 268],
            [0, 1384, 0, 314, 268],
            [0, 1384, 0, 314, 268],
            [0, 1701, 0, 314, 268],
            [0, 0, 144, 314, 268],
            [0, 317, 144, 314, 268],
            [0, 317, 144, 314, 268],
            [0, 634, 235, 314, 268]
        ],
        ai = [
            [0, 2018, 0, 24, 31],
            [0, 2018, 0, 24, 31],
            [0, 2018, 34, 24, 31],
            [0, 2018, 34, 24, 31],
            [0, 2018, 68, 24, 31],
            [0, 2018, 68, 24, 31],
            [0, 2018, 102, 24, 31],
            [0, 2018, 102, 24, 31],
            [0, 2018, 136, 24, 31],
            [0, 2018, 136, 24, 31]
        ],
        bi = [
            [7, 186, 0, 75, 80],
            [7, 186, 0, 75, 80],
            [7, 264, 0, 75, 80],
            [7, 342, 0, 75, 80],
            [7, 420, 0, 75, 80],
            [7, 498, 0, 75, 80],
            [7, 576, 0, 75, 80],
            [7, 654, 0, 75, 80],
            [7, 732, 0, 75, 80],
            [7, 810, 0, 75, 80],
            [7, 810, 0, 75, 80],
            [7, 888, 0, 75, 80],
            [7, 186, 83, 75, 80],
            [7, 186, 83, 75, 80],
            [7, 264, 83, 75, 80],
            [7, 342, 83, 75, 80],
            [7, 420, 83, 75, 80],
            [7, 498, 83, 75, 80],
            [7, 576, 83, 75, 80],
            [7, 654, 83, 75, 80],
            [7, 732, 83, 75, 80],
            [7, 810, 83, 75, 80],
            [7, 888, 83, 75, 80],
            [7, 888, 83, 75, 80],
            [7, 186, 0, 75, 80],
            [7, 186, 0, 75, 80],
            [7, 186, 0, 75, 80],
            [7, 342, 0, 75, 80],
            [7, 93, 100, 75, 80],
            [7, 0, 101, 75, 80],
            [7, 171, 166, 75, 80],
            [7, 249, 166, 75, 80],
            [7, 327, 166, 75, 80],
            [7, 405, 166, 75, 80],
            [7, 483, 166, 75, 80],
            [7, 561, 166, 75, 80],
            [7, 888, 0, 75, 80],
            [7, 810, 0, 75, 80],
            [7, 186, 83, 75, 80],
            [7, 264, 83, 75, 80],
            [7, 639, 166,
                75, 80
            ],
            [7, 420, 83, 75, 80],
            [7, 498, 83, 75, 80],
            [7, 717, 166, 75, 80],
            [7, 654, 83, 75, 80],
            [7, 732, 83, 75, 80],
            [7, 795, 166, 75, 80],
            [7, 888, 83, 75, 80],
            [7, 888, 83, 75, 80],
            [7, 888, 83, 75, 80]
        ],
        ci = [
            [7, 873, 166, 75, 80],
            [7, 78, 183, 75, 80],
            [7, 0, 184, 75, 80],
            [7, 156, 249, 75, 80],
            [7, 234, 249, 75, 80],
            [7, 312, 249, 75, 80],
            [7, 390, 249, 75, 80],
            [7, 468, 249, 75, 80],
            [7, 546, 249, 75, 80],
            [7, 624, 249, 75, 80],
            [7, 702, 249, 75, 80],
            [7, 780, 249, 75, 80],
            [7, 858, 249, 75, 80],
            [7, 936, 249, 75, 80],
            [7, 78, 266, 75, 80],
            [7, 0, 267, 75, 80]
        ],
        di = [
            [7, 156, 332, 75, 80],
            [7, 234, 332, 75, 80],
            [7, 312, 332,
                75, 80
            ],
            [7, 312, 332, 75, 80],
            [7, 390, 332, 75, 80],
            [7, 390, 332, 75, 80],
            [7, 468, 332, 75, 80],
            [7, 468, 332, 75, 80],
            [7, 546, 332, 75, 80],
            [7, 546, 332, 75, 80],
            [7, 546, 332, 75, 80],
            [7, 624, 332, 75, 80],
            [7, 624, 332, 75, 80],
            [7, 624, 332, 75, 80]
        ],
        ei = [
            [0, 951, 391, 150, 150],
            [0, 951, 391, 150, 150],
            [0, 951, 391, 150, 150],
            [0, 1104, 391, 150, 150],
            [0, 1104, 391, 150, 150],
            [0, 1104, 391, 150, 150],
            [0, 0, 415, 150, 150],
            [0, 0, 415, 150, 150],
            [0, 0, 415, 150, 150],
            [0, 153, 415, 150, 150],
            [0, 153, 415, 150, 150],
            [0, 153, 415, 150, 150]
        ];

    function fi(a) {
        a && "function" == typeof a.dispose && a.dispose()
    };

    function gi() {
        this.wa = this.wa;
        this.va = this.va
    }
    gi.prototype.wa = !1;
    gi.prototype.dispose = function() {
        this.wa || (this.wa = !0, this.Bb())
    };

    function hi(a, b) {
        a.wa ? b() : (a.va || (a.va = []), a.va.push(b))
    }
    gi.prototype.Bb = function() {
        if (this.va)
            for (; this.va.length;) this.va.shift()()
    };

    function ii(a, b) {
        this.type = a;
        this.i = this.target = b;
        this.defaultPrevented = !1
    }
    ii.prototype.preventDefault = function() {
        this.defaultPrevented = !0
    };
    var ji = function() {
        if (!t.addEventListener || !Object.defineProperty) return !1;
        var a = !1,
            b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
        try {
            t.addEventListener("test", () => {}, b), t.removeEventListener("test", () => {}, b)
        } catch (c) {}
        return a
    }();

    function ki(a, b) {
        ii.call(this, a ? a.type : "");
        this.relatedTarget = this.i = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.key = "";
        this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.pointerId = 0;
        this.pointerType = "";
        this.g = null;
        if (a) {
            var c = this.type = a.type,
                d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.i = b;
            if (b = a.relatedTarget) {
                if (db) {
                    a: {
                        try {
                            Ya(b.nodeName);
                            var e = !0;
                            break a
                        } catch (f) {}
                        e = !1
                    }
                    e || (b = null)
                }
            } else "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.offsetX = eb || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY = eb || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX =
                a.screenX || 0, this.screenY = a.screenY || 0);
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = "string" === typeof a.pointerType ? a.pointerType : li[a.pointerType] || "";
            this.state = a.state;
            this.g = a;
            a.defaultPrevented && ki.Rb.preventDefault.call(this)
        }
    }
    ta(ki, ii);
    var li = {
        2: "touch",
        3: "pen",
        4: "mouse"
    };
    ki.prototype.preventDefault = function() {
        ki.Rb.preventDefault.call(this);
        var a = this.g;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    };
    ki.prototype.j = function() {
        return this.g
    };
    var mi = "closure_listenable_" + (1E6 * Math.random() | 0);
    var ni = 0;

    function oi(a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.Id = e;
        this.key = ++ni;
        this.ld = this.Ed = !1
    }

    function pi(a) {
        a.ld = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.Id = null
    };

    function qi(a) {
        this.src = a;
        this.g = {};
        this.i = 0
    }
    qi.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.g[f];
        a || (a = this.g[f] = [], this.i++);
        var g = ri(a, b, d, e); - 1 < g ? (b = a[g], c || (b.Ed = !1)) : (b = new oi(b, this.src, f, !!d, e), b.Ed = c, a.push(b));
        return b
    };

    function si(a, b) {
        var c = b.type;
        c in a.g && Wa(a.g[c], b) && (pi(b), 0 == a.g[c].length && (delete a.g[c], a.i--))
    }

    function ri(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.ld && f.listener == b && f.capture == !!c && f.Id == d) return e
        }
        return -1
    };
    var ti = "closure_lm_" + (1E6 * Math.random() | 0),
        ui = {},
        vi = 0;

    function wi(a, b, c, d, e) {
        if (d && d.once) return xi(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) wi(a, b[f], c, d, e);
            return null
        }
        c = yi(c);
        return a && a[mi] ? zi(a, b, c, ma(d) ? !!d.capture : !!d, e) : Ai(a, b, c, !1, d, e)
    }

    function Ai(a, b, c, d, e, f) {
        if (!b) throw Error("F");
        var g = ma(e) ? !!e.capture : !!e,
            h = Bi(a);
        h || (a[ti] = h = new qi(a));
        c = h.add(b, c, d, g, f);
        if (c.proxy) return c;
        d = Ci();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) ji || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent) a.attachEvent(Di(b.toString()), d);
        else if (a.addListener && a.removeListener) a.addListener(d);
        else throw Error("G");
        vi++;
        return c
    }

    function Ci() {
        function a(c) {
            return b.call(a.src, a.listener, c)
        }
        const b = Ei;
        return a
    }

    function xi(a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) xi(a, b[f], c, d, e);
            return null
        }
        c = yi(c);
        return a && a[mi] ? a.j.add(String(b), c, !0, ma(d) ? !!d.capture : !!d, e) : Ai(a, b, c, !0, d, e)
    }

    function Fi(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++) Fi(a, b[f], c, d, e);
        else(d = ma(d) ? !!d.capture : !!d, c = yi(c), a && a[mi]) ? (a = a.j, b = String(b).toString(), b in a.g && (f = a.g[b], c = ri(f, c, d, e), -1 < c && (pi(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.g[b], a.i--)))) : a && (a = Bi(a)) && (b = a.g[b.toString()], a = -1, b && (a = ri(b, c, d, e)), (c = -1 < a ? b[a] : null) && Gi(c))
    }

    function Gi(a) {
        if ("number" !== typeof a && a && !a.ld) {
            var b = a.src;
            if (b && b[mi]) si(b.j, a);
            else {
                var c = a.type,
                    d = a.proxy;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Di(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                vi--;
                (c = Bi(b)) ? (si(c, a), 0 == c.i && (c.src = null, b[ti] = null)) : pi(a)
            }
        }
    }

    function Di(a) {
        return a in ui ? ui[a] : ui[a] = "on" + a
    }

    function Ei(a, b) {
        if (a.ld) a = !0;
        else {
            b = new ki(b, this);
            var c = a.listener,
                d = a.Id || a.src;
            a.Ed && Gi(a);
            a = c.call(d, b)
        }
        return a
    }

    function Bi(a) {
        a = a[ti];
        return a instanceof qi ? a : null
    }
    var Hi = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);

    function yi(a) {
        if ("function" === typeof a) return a;
        a[Hi] || (a[Hi] = function(b) {
            return a.handleEvent(b)
        });
        return a[Hi]
    };

    function Ii() {
        gi.call(this);
        this.j = new qi(this);
        this.Xa = this;
        this.Ea = null
    }
    ta(Ii, gi);
    Ii.prototype[mi] = !0;
    Ii.prototype.addEventListener = function(a, b, c, d) {
        wi(this, a, b, c, d)
    };
    Ii.prototype.removeEventListener = function(a, b, c, d) {
        Fi(this, a, b, c, d)
    };
    Ii.prototype.dispatchEvent = function(a) {
        var b, c = this.Ea;
        if (c)
            for (b = []; c; c = c.Ea) b.push(c);
        c = this.Xa;
        var d = a.type || a;
        if ("string" === typeof a) a = new ii(a, c);
        else if (a instanceof ii) a.target = a.target || c;
        else {
            var e = a;
            a = new ii(d, c);
            te(a, e)
        }
        e = !0;
        if (b)
            for (var f = b.length - 1; 0 <= f; f--) {
                var g = a.i = b[f];
                e = Ji(g, d, !0, a) && e
            }
        g = a.i = c;
        e = Ji(g, d, !0, a) && e;
        e = Ji(g, d, !1, a) && e;
        if (b)
            for (f = 0; f < b.length; f++) g = a.i = b[f], e = Ji(g, d, !1, a) && e;
        return e
    };
    Ii.prototype.Bb = function() {
        Ii.Rb.Bb.call(this);
        Ki(this);
        this.Ea = null
    };

    function zi(a, b, c, d, e) {
        return a.j.add(String(b), c, !1, d, e)
    }

    function Ki(a) {
        if (a.j) {
            a = a.j;
            var b = 0,
                c;
            for (c in a.g) {
                for (var d = a.g[c], e = 0; e < d.length; e++) ++b, pi(d[e]);
                delete a.g[c];
                a.i--
            }
        }
    }

    function Ji(a, b, c, d) {
        b = a.j.g[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.ld && g.capture == c) {
                var h = g.listener,
                    k = g.Id || g.src;
                g.Ed && si(a.j, g);
                e = !1 !== h.call(k, d) && e
            }
        }
        return e && !d.defaultPrevented
    };

    function Li() {}
    Li.prototype.g = null;
    Li.prototype.getOptions = function() {
        var a;
        (a = this.g) || (a = {}, Mi(this) && (a[0] = !0, a[1] = !0), a = this.g = a);
        return a
    };
    var Ni;

    function Oi() {}
    ta(Oi, Li);

    function Pi(a) {
        return (a = Mi(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }

    function Mi(a) {
        if (!a.i && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            const b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
            for (let c = 0; c < b.length; c++) {
                const d = b[c];
                try {
                    return new ActiveXObject(d), a.i = d
                } catch (e) {}
            }
            throw Error("H");
        }
        return a.i
    }
    Ni = new Oi;

    function Qi(a, b) {
        a.o(b);
        100 > a.i && (a.i++, b.next = a.g, a.g = b)
    }
    class Ri {
        constructor(a, b) {
            this.j = a;
            this.o = b;
            this.i = 0;
            this.g = null
        }
        get() {
            let a;
            0 < this.i ? (this.i--, a = this.g, this.g = a.next, a.next = null) : a = this.j();
            return a
        }
    };
    try {
        (new self.OffscreenCanvas(0, 0)).getContext("2d")
    } catch (a) {};

    function Si(a, b, c) {
        return Math.min(Math.max(a, b), c)
    }

    function Ti(a, b, c) {
        return a + c * (b - a)
    };

    function P(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    }
    q = P.prototype;
    q.clone = function() {
        return new P(this.x, this.y)
    };
    q.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    q.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    q.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    q.scale = function(a, b) {
        this.x *= a;
        this.y *= "number" === typeof b ? b : a;
        return this
    };

    function Ui(a, b) {
        this.width = a;
        this.height = b
    }
    q = Ui.prototype;
    q.clone = function() {
        return new Ui(this.width, this.height)
    };
    q.aspectRatio = function() {
        return this.width / this.height
    };
    q.isEmpty = function() {
        return !(this.width * this.height)
    };
    q.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    q.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    q.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    q.scale = function(a, b) {
        this.width *= a;
        this.height *= "number" === typeof b ? b : a;
        return this
    };

    function Vi(a, b) {
        re(b, function(c, d) {
            c && "object" == typeof c && c.Oc && (c = c.Nc());
            "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : Wi.hasOwnProperty(d) ? a.setAttribute(Wi[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
        })
    }
    var Wi = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };

    function Xi(a, b, c) {
        function d(h) {
            h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h)
        }
        for (var e = 1; e < c.length; e++) {
            var f = c[e];
            if (!la(f) || ma(f) && 0 < f.nodeType) d(f);
            else {
                a: {
                    if (f && "number" == typeof f.length) {
                        if (ma(f)) {
                            var g = "function" == typeof f.item || "string" == typeof f.item;
                            break a
                        }
                        if ("function" === typeof f) {
                            g = "function" == typeof f.item;
                            break a
                        }
                    }
                    g = !1
                }
                Sa(g ? Xa(f) : f, d)
            }
        }
    }

    function Yi(a, b) {
        b = String(b);
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b)
    }

    function Zi(a) {
        this.g = a || t.document || document
    }
    q = Zi.prototype;
    q.getElementsByTagName = function(a, b) {
        return (b || this.g).getElementsByTagName(String(a))
    };
    q.createElement = function(a) {
        return Yi(this.g, a)
    };
    q.createTextNode = function(a) {
        return this.g.createTextNode(String(a))
    };
    q.append = function(a, b) {
        Xi(9 == a.nodeType ? a : a.ownerDocument || a.document, a, arguments)
    };
    q.removeChildren = function(a) {
        for (var b; b = a.firstChild;) a.removeChild(b)
    };
    q.La = function() {
        if (!a) return null;
        if (a.firstChild) return a.firstChild;
        for (; a && !a.nextSibling;) var a = a.parentNode;
        return a ? a.nextSibling : null
    };
    q.contains = function(a, b) {
        if (!a || !b) return !1;
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    };
    var $i;

    function aj() {
        var a = t.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !Qa("Presto") && (a = function() {
            var e = Yi(document, "IFRAME");
            e.style.display = "none";
            document.documentElement.appendChild(e);
            var f = e.contentWindow;
            e = f.document;
            e.open();
            e.close();
            var g = "callImmediate" + Math.random(),
                h = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
            e = qa(function(k) {
                if (("*" == h || k.origin == h) && k.data == g) this.port1.onmessage()
            }, this);
            f.addEventListener("message", e, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    f.postMessage(g, h)
                }
            }
        });
        if ("undefined" !== typeof a && !Qa("Trident") && !Qa("MSIE")) {
            var b = new a,
                c = {},
                d = c;
            b.port1.onmessage = function() {
                if (void 0 !== c.next) {
                    c = c.next;
                    var e = c.cb;
                    c.cb = null;
                    e()
                }
            };
            return function(e) {
                d.next = {
                    cb: e
                };
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return function(e) {
            t.setTimeout(e, 0)
        }
    };

    function bj() {
        var a = cj;
        let b = null;
        a.g && (b = a.g, a.g = a.g.next, a.g || (a.i = null), b.next = null);
        return b
    }
    class dj {
        constructor() {
            this.i = this.g = null
        }
        add(a, b) {
            const c = ej.get();
            c.set(a, b);
            this.i ? this.i.next = c : this.g = c;
            this.i = c
        }
    }
    var ej = new Ri(() => new fj, a => a.reset());
    class fj {
        constructor() {
            this.next = this.g = this.i = null
        }
        set(a, b) {
            this.i = a;
            this.g = b;
            this.next = null
        }
        reset() {
            this.next = this.g = this.i = null
        }
    };
    let gj, hj = !1,
        cj = new dj,
        jj = (a, b) => {
            gj || ij();
            hj || (gj(), hj = !0);
            cj.add(a, b)
        },
        ij = () => {
            if (t.Promise && t.Promise.resolve) {
                const a = t.Promise.resolve(void 0);
                gj = () => {
                    a.then(kj)
                }
            } else gj = () => {
                var a = kj;
                "function" !== typeof t.setImmediate || t.Window && t.Window.prototype && !Qa("Edge") && t.Window.prototype.setImmediate == t.setImmediate ? ($i || ($i = aj()), $i(a)) : t.setImmediate(a)
            }
        };
    var kj = () => {
        let a;
        for (; a = bj();) {
            try {
                a.i.call(a.g)
            } catch (b) {
                Fa(b)
            }
            Qi(ej, a)
        }
        hj = !1
    };

    function lj(a) {
        if (!a) return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    };

    function mj(a) {
        this.g = 0;
        this.H = void 0;
        this.o = this.i = this.j = null;
        this.u = this.v = !1;
        if (a != qe) try {
            var b = this;
            a.call(void 0, function(c) {
                nj(b, 2, c)
            }, function(c) {
                nj(b, 3, c)
            })
        } catch (c) {
            nj(this, 3, c)
        }
    }

    function oj() {
        this.next = this.context = this.i = this.j = this.g = null;
        this.o = !1
    }
    oj.prototype.reset = function() {
        this.context = this.i = this.j = this.g = null;
        this.o = !1
    };
    var pj = new Ri(function() {
        return new oj
    }, function(a) {
        a.reset()
    });

    function qj(a, b, c) {
        var d = pj.get();
        d.j = a;
        d.i = b;
        d.context = c;
        return d
    }
    mj.prototype.then = function(a, b, c) {
        return rj(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
    };
    mj.prototype.$goog_Thenable = !0;
    mj.prototype.cancel = function(a) {
        if (0 == this.g) {
            var b = new sj(a);
            jj(function() {
                tj(this, b)
            }, this)
        }
    };

    function tj(a, b) {
        if (0 == a.g)
            if (a.j) {
                var c = a.j;
                if (c.i) {
                    for (var d = 0, e = null, f = null, g = c.i; g && (g.o || (d++, g.g == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
                    e && (0 == c.g && 1 == d ? tj(c, b) : (f ? (d = f, d.next == c.o && (c.o = d), d.next = d.next.next) : uj(c), vj(c, e, 3, b)))
                }
                a.j = null
            } else nj(a, 3, b)
    }

    function wj(a, b) {
        a.i || 2 != a.g && 3 != a.g || xj(a);
        a.o ? a.o.next = b : a.i = b;
        a.o = b
    }

    function rj(a, b, c, d) {
        var e = qj(null, null, null);
        e.g = new mj(function(f, g) {
            e.j = b ? function(h) {
                try {
                    var k = b.call(d, h);
                    f(k)
                } catch (l) {
                    g(l)
                }
            } : f;
            e.i = c ? function(h) {
                try {
                    var k = c.call(d, h);
                    void 0 === k && h instanceof sj ? g(h) : f(k)
                } catch (l) {
                    g(l)
                }
            } : g
        });
        e.g.j = a;
        wj(a, e);
        return e.g
    }
    mj.prototype.V = function(a) {
        this.g = 0;
        nj(this, 2, a)
    };
    mj.prototype.va = function(a) {
        this.g = 0;
        nj(this, 3, a)
    };

    function nj(a, b, c) {
        if (0 == a.g) {
            a === c && (b = 3, c = new TypeError("I"));
            a.g = 1;
            a: {
                var d = c,
                    e = a.V,
                    f = a.va;
                if (d instanceof mj) {
                    wj(d, qj(e || qe, f || null, a));
                    var g = !0
                } else if (lj(d)) d.then(e, f, a),
                g = !0;
                else {
                    if (ma(d)) try {
                        var h = d.then;
                        if ("function" === typeof h) {
                            yj(d, h, e, f, a);
                            g = !0;
                            break a
                        }
                    } catch (k) {
                        f.call(a, k);
                        g = !0;
                        break a
                    }
                    g = !1
                }
            }
            g || (a.H = c, a.g = b, a.j = null, xj(a), 3 != b || c instanceof sj || zj(a, c))
        }
    }

    function yj(a, b, c, d, e) {
        function f(k) {
            h || (h = !0, d.call(e, k))
        }

        function g(k) {
            h || (h = !0, c.call(e, k))
        }
        var h = !1;
        try {
            b.call(a, g, f)
        } catch (k) {
            f(k)
        }
    }

    function xj(a) {
        a.v || (a.v = !0, jj(a.O, a))
    }

    function uj(a) {
        var b = null;
        a.i && (b = a.i, a.i = b.next, b.next = null);
        a.i || (a.o = null);
        return b
    }
    mj.prototype.O = function() {
        for (var a; a = uj(this);) vj(this, a, this.g, this.H);
        this.v = !1
    };

    function vj(a, b, c, d) {
        if (3 == c && b.i && !b.o)
            for (; a && a.u; a = a.j) a.u = !1;
        if (b.g) b.g.j = null, Aj(b, c, d);
        else try {
            b.o ? b.j.call(b.context) : Aj(b, c, d)
        } catch (e) {
            Bj.call(null, e)
        }
        Qi(pj, b)
    }

    function Aj(a, b, c) {
        2 == b ? a.j.call(a.context, c) : a.i && a.i.call(a.context, c)
    }

    function zj(a, b) {
        a.u = !0;
        jj(function() {
            a.u && Bj.call(null, b)
        })
    }
    var Bj = Fa;

    function sj(a) {
        va.call(this, a)
    }
    ta(sj, va);
    sj.prototype.name = "cancel";

    function Cj(a, b, c) {
        if ("function" === typeof a) c && (a = qa(a, c));
        else if (a && "function" == typeof a.handleEvent) a = qa(a.handleEvent, a);
        else throw Error("J");
        return 2147483647 < Number(b) ? -1 : t.setTimeout(a, b || 0)
    };

    function Dj(a) {
        Ii.call(this);
        this.headers = new Map;
        this.O = a || null;
        this.i = !1;
        this.H = this.g = null;
        this.Ba = "";
        this.o = this.ya = this.u = this.V = !1;
        this.Oa = 0;
        this.v = null;
        this.Ia = "";
        this.Na = this.Qa = !1
    }
    ta(Dj, Ii);
    var Ej = /^https?$/i,
        Fj = ["POST", "PUT"];

    function Gj(a, b) {
        if (a.g) throw Error("K`" + a.Ba + "`" + b);
        a.Ba = b;
        a.V = !1;
        a.i = !0;
        a.g = a.O ? Pi(a.O) : Pi(Ni);
        a.H = a.O ? a.O.getOptions() : Ni.getOptions();
        a.g.onreadystatechange = qa(a.lf, a);
        try {
            a.ya = !0, a.g.open("GET", String(b), !0), a.ya = !1
        } catch (e) {
            Hj(a);
            return
        }
        b = new Map(a.headers);
        const c = Array.from(b.keys()).find(e => "content-type" == e.toLowerCase()),
            d = t.FormData && !1;
        !(0 <= Ra(Fj, "GET")) || c || d || b.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        for (const [e, f] of b) a.g.setRequestHeader(e, f);
        a.Ia &&
            (a.g.responseType = a.Ia);
        "withCredentials" in a.g && a.g.withCredentials !== a.Qa && (a.g.withCredentials = a.Qa);
        try {
            Ij(a), 0 < a.Oa && (a.Na = Jj(a.g), a.Na ? (a.g.timeout = a.Oa, a.g.ontimeout = qa(a.wd, a)) : a.v = Cj(a.wd, a.Oa, a)), a.u = !0, a.g.send(""), a.u = !1
        } catch (e) {
            Hj(a)
        }
    }

    function Jj(a) {
        return bb && lb() && "number" === typeof a.timeout && void 0 !== a.ontimeout
    }
    q = Dj.prototype;
    q.wd = function() {
        "undefined" != typeof ha && this.g && (this.dispatchEvent("timeout"), this.abort(8))
    };

    function Hj(a) {
        a.i = !1;
        a.g && (a.o = !0, a.g.abort(), a.o = !1);
        Kj(a);
        Lj(a)
    }

    function Kj(a) {
        a.V || (a.V = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
    }
    q.abort = function() {
        this.g && this.i && (this.i = !1, this.o = !0, this.g.abort(), this.o = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Lj(this))
    };
    q.Bb = function() {
        this.g && (this.i && (this.i = !1, this.o = !0, this.g.abort(), this.o = !1), Lj(this, !0));
        Dj.Rb.Bb.call(this)
    };
    q.lf = function() {
        this.wa || (this.ya || this.u || this.o ? Mj(this) : this.Yf())
    };
    q.Yf = function() {
        Mj(this)
    };

    function Mj(a) {
        if (a.i && "undefined" != typeof ha && (!a.H[1] || 4 != (a.g ? a.g.readyState : 0) || 2 != Nj(a)))
            if (a.u && 4 == (a.g ? a.g.readyState : 0)) Cj(a.lf, 0, a);
            else if (a.dispatchEvent("readystatechange"), 4 == (a.g ? a.g.readyState : 0)) {
            a.i = !1;
            try {
                const f = Nj(a);
                a: switch (f) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        var b = !0;
                        break a;
                    default:
                        b = !1
                }
                var c;
                if (!(c = b)) {
                    var d;
                    if (d = 0 === f) {
                        var e = String(a.Ba).match(ef)[1] || null;
                        !e && t.self && t.self.location && (e = t.self.location.protocol.slice(0, -1));
                        d = !Ej.test(e ? e.toLowerCase() :
                            "")
                    }
                    c = d
                }
                c ? (a.dispatchEvent("complete"), a.dispatchEvent("success")) : Kj(a)
            } finally {
                Lj(a)
            }
        }
    }

    function Lj(a, b) {
        if (a.g) {
            Ij(a);
            const c = a.g,
                d = a.H[0] ? () => {} : null;
            a.g = null;
            a.H = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {}
        }
    }

    function Ij(a) {
        a.g && a.Na && (a.g.ontimeout = null);
        a.v && (t.clearTimeout(a.v), a.v = null)
    }
    q.isActive = function() {
        return !!this.g
    };

    function Nj(a) {
        try {
            return 2 < (a.g ? a.g.readyState : 0) ? a.g.status : -1
        } catch (b) {
            return -1
        }
    };

    function Oj(a) {
        if (a.g && "running" == a.g.state && !a.H) {
            a.H = !0;
            for (let b = 0; b < a.O.length; b++) a.O[b]()
        }
    }

    function Pj(a) {
        a.g && (null == a.i ? Qj(a) : void 0 === a.i.playbackState ? Qj(a) : a.i.playbackState !== a.i.PLAYING_STATE && a.i.playbackState !== a.i.FINISHED_STATE && Qj(a))
    }

    function Rj(a, b) {
        if (Sj && !a.g) {
            a.g = new(window.AudioContext || window.webkitAudioContext);
            a.v = a.g.createGain();
            a.v.connect(a.g.destination);
            for (let c in a.u) a.u[c].o = a.g;
            for (let c in a.j) Tj(a.j[c], a.g, a.v);
            a.g.onstatechange = () => {
                Oj(a)
            };
            Oj(a);
            Pj(a);
            xi(b, "click pointerup mousedown mouseup touchstart touchend".split(" "), () => {
                a.g && (a.g.resume(), Pj(a))
            }, !0)
        }
    }

    function Qj(a) {
        if (a.g) {
            a.i = a.g.createBufferSource();
            var b = a.g.createBuffer(1, 1, 22050);
            a.i.buffer = b;
            a.i.connect(a.g.destination);
            a.i.start(0);
            for (const c of a.V) c()
        }
    }

    function Uj() {
        var a = Vj;
        !a.o && a.g && a.g.suspend();
        a.o = !0
    }
    class Wj {
        constructor() {
            var a = Q;
            this.u = R;
            this.j = a;
            this.g = null;
            this.V = [];
            this.v = null;
            this.H = this.o = !1;
            this.O = [];
            this.i = null
        }
        getContext() {
            return this.g
        }
        destroy() {
            this.g && (this.g.close(), this.g = null)
        }
        reset() {
            for (let a in this.u) this.u[a].j = [];
            for (let a in this.j) this.j[a].stop()
        }
        isMuted() {
            return !1
        }
    }
    var Sj = !(!window.AudioContext && !window.webkitAudioContext) && !!window.GainNode;

    function Tj(a, b, c) {
        a.g = b;
        a.u = c
    }

    function Xj(a) {
        if (a.g)
            for (const c in a.j) {
                var b = a.j[c];
                !b.Pf && null !== a.g && 1E3 * a.g.currentTime > b.nf + a.v && delete a.j[c]
            }
    }

    function Yj(a) {
        !a.i && a.g && a.g.createGain && (a.i = a.g.createGain())
    }

    function Zj(a, b) {
        Yj(a);
        a.i && a.g && a.i.gain.setValueAtTime(b, a.g.currentTime)
    }
    var ak = class {
        constructor(a, b, c, d) {
            this.H = a;
            this.O = b;
            this.v = c;
            this.V = d;
            this.j = {};
            this.o = this.u = this.g = this.i = null;
            this.va = 0
        }
        clone() {
            const a = new ak(this.H, this.O, this.v, this.V);
            Tj(a, this.g, this.u);
            return a
        }
        getContext() {
            return this.g
        }
        play(a = 0, b = !1, c = 0, d, e = 0, f) {
            if (!this.g || !this.u) return -1;
            Xj(this);
            f = void 0 === f ? this.g.currentTime + a / 1E3 : f;
            d || (d = this.g.createBufferSource(), d.playbackRate.setValueAtTime(1, this.g.currentTime));
            Yj(this);
            this.o && d.connect(this.o);
            this.i ? (this.o ? this.o.connect(this.i) : d.connect(this.i),
                this.i.connect(this.u)) : this.o ? this.o.connect(this.u) : d.connect(this.u);
            this.o = null;
            d.loop = b;
            try {
                d.buffer = this.H.buffer
            } catch (h) {
                return -1
            }
            a = this.O / 1E3;
            const g = this.v / 1E3 / d.playbackRate.value;
            b ? (d.loopStart = a + (e ? e / 1E3 : c / 1E3), d.loopEnd = a + g, d.start(f, a + c / 1E3)) : d.start(f, a + c / 1E3, g);
            e = this.va++;
            this.j[e] = {
                node: d,
                nf: 1E3 * f - c,
                Pf: b
            };
            return e
        }
        stop(a) {
            Xj(this);
            if (void 0 !== a && this.g) {
                if (this.j[a]) {
                    try {
                        this.j[a].node.stop(0)
                    } catch (c) {}
                    var b = (1E3 * this.g.currentTime - this.j[a].nf) % this.v;
                    delete this.j[a];
                    return [b]
                }
                return []
            }
            a = [];
            for (b in this.j) a = a.concat(this.stop(b));
            return a
        }
    };
    const bk = document.createElement("audio");
    var ck =
        'function' === typeof bk.canPlayType && '' != bk.canPlayType('audio/mpeg') ?
        '.mp3' :
        '.ogg',
        dk = class extends Sg {
            constructor(a) {
                super('/logos/2021/halloween18_reboot/r1025/' + a + ck);
                this.o = this.buffer = null;
                this.u = 0
            }
            preload(a, b) {
                const c = new Promise(e => {
                    Rg(this, e)
                });
                a && Rg(this, a);
                if (0 != this.u) return Promise.resolve();
                if (!this.o) return Promise.reject(Error('M'));
                const d = new XMLHttpRequest;
                d.open('GET', this.g, !0);
                d.responseType = 'arraybuffer';
                d.onload = () => {
                    const e = f => {
                        f && (this.buffer = f, this.u = 3, Qg(this))
                    };
                    this.o && this.o.decodeAudioData(d.response, e);
                    this.u = 2
                };
                b && (d.onprogress = e => {
                    e.lengthComputable && b && b(e.loaded / e.total)
                });
                d.send();
                this.u = 1;
                return c
            }
        };
    class ek extends Wj {}
    var R = {};
    R.Sb = new dk('sfx');
    R.Cd = new dk('tutorial');
    R.Bd = new dk('lobby');
    R.fe = new dk('outside');
    R.zd = new dk('hurry_up');
    R.Tc = new dk('postgame');
    var Q = {};
    Q.uf = new ak(R.Sb, 0, 1541.156005859375, .1589999943971634);
    Q.vf = new ak(R.Sb, 2541.156005859375, 1810.4310302734375, .11299999803304672);
    Q.wf = new ak(R.Sb, 5351.5869140625, 559.7730102539062, .2720000147819519);
    Q.zd = new ak(R.zd, 0, 26250, 0);
    Q.yf = new ak(R.Sb, 6911.36083984375, 11390.8388671875, 51.74599838256836);
    Q.Bd = new ak(R.Bd, 0, 17142.853515625, 0);
    Q.zf = new ak(R.Tc, 0, 16666.66796875, 0);
    Q.Af = new ak(R.Tc, 17666.66796875, 5454.5419921875, 0);
    Q.fe = new ak(R.fe, 0, 38540.14453125, 0);
    Q.he = new ak(R.Sb, 19302.19921875, 1316.009033203125, .9300000071525574);
    Q.Bf = new ak(R.Sb, 21618.208984375, 1156.43994140625, 25.19300079345703);
    Q.Le = new ak(R.Sb, 23774.6484375, 3412.2900390625, .6579999923706055);
    Q.Cf = new ak(R.Sb, 28186.939453125, 1699.2969970703125, 2.8570001125335693);
    Q.Df = new ak(R.Sb, 30886.236328125, 1830.4539794921875, .9520000219345093);
    Q.Ef = new ak(R.Sb, 33716.6875, 1841.905029296875, .8389999866485596);
    Q.Ff = new ak(R.Sb, 36558.59375, 4530.68017578125, 1.7910000085830688);
    Q.Cd = new ak(R.Cd, 0, 40615.375, 0);
    Q.Gf = new ak(R.Tc, 24121.20703125, 16E3, 0);
    Q.Hf = new ak(R.Tc, 41121.20703125, 5818.18701171875, 0);
    ja(ek);
    var fk = "en af am ar az be bg bn bs ca cs da de el en-GB-uk es es-419 et eu fa fi fr fr-ca gl gu hi hr hu hy id is it iw ja ka kk km kn ko ky lo lt lv mk ml mn mr ms my ne nl no pa pl pt-BR pt-PT ro ru si-lk sk sl sq sr sv sw ta te th tr uk ur uz vi zh-CN zh-HK zh-TW zu crs".split(" ");
    var gk = () => {
            if (Kf()) throw Error("N");
            return Lf() || !!document.getElementById("fkbx") || If() || Hf()
        },
        hk = () => {
            if (Kf()) throw Error("N");
            return Jf() || Hf() || I() && !Df()
        },
        ik = () => Kf() ? "1" === Cf.g.get("ccta") : Jf() && !(document.getElementById("fkbx") || If()) || Hf() && I() && !Lf(),
        jk = () => {
            const a = !I() && Lf() && 600 >= window.innerHeight;
            return !Mf && (Lf() || a) && !Hf()
        };
    const kk = [5, 6, 7, 8, 9, 11, 12, 16];
    let lk = 0,
        mk = !1,
        nk = {},
        ok = [];
    var S = a => {
        var b = Date.now();
        0 == a && (lk = b);
        nk.e = a;
        nk.t = 0 == lk ? -1 : Math.floor(b - lk);
        nk.l = "sdoodles" === document.documentElement.id ? 0 : 1;
        b = [];
        for (var c in nk) nk.hasOwnProperty(c) && b.push(c + ":" + nk[c]);
        c = b.join(",");
        b = 10 == a;
        var d = 0 <= kk.indexOf(a);
        (document.getElementById("fkbx") || If()) && (c += "&ntp=1");
        b ? (b = Fg()) && (c += `&ved=${b}`) : d && (Cg || ((b = document.getElementById("hplogoshareved")) ? Cg = b.getAttribute("data-ved") : Kf() && Af(Cf.g, "sved") && (Cg = Cf.g.get("sved"))), (b = Cg) && (c += `&ved=${b}`)); - 1 == c.search("&ei=") && (c +=
            "&ei=", (b = Eg()) && (c += b));
        for (window.google && window.google.log ? window.google.log("doodle", c) : Pf(c); 0 < ok.length;) delete nk[ok.pop()];
        mk || 0 != a || ik() || (mk = !0, S(10))
    };
    var rk = () => {
            var a = wg() || !1;
            nk.d = ug;
            !mk && ik() && (mk = !0, S(10));
            a && pk("d1", 1);
            qk(1)
        },
        qk = a => {
            nk.c = a;
            S(1);
            switch (a) {
                case 12:
                    S(0);
                    break;
                case 16:
                    S(2)
            }
        };
    const sk = (new Map).set(PIXI.RENDERER_TYPE.UNKNOWN, "UNKNOWN").set(PIXI.RENDERER_TYPE.WEBGL, "WEBGL").set(PIXI.RENDERER_TYPE.CANVAS, "CANVAS"),
        tk = (new Map).set(0, "UNDEFINED_CLIENT_TYPE").set(1, "PUBLIC").set(2, "PRIVATE_CLIENT").set(3, "PRIVATE_HOST"),
        pk = (a, b) => {
            nk[a] = b;
            switch (a) {
                case "d2":
                    sk.get(b);
                    break;
                case "d3":
                    tk.get(b)
            }
        };
    var uk = a => {
        void 0 === a ? delete nk.d4 : pk("d4", a)
    };
    var vk = a => a.split("").reduce((b, c) => (b << 5) - b + c.charCodeAt(0) | 0, 0);
    var xk = a => {
            var b = [Ng];
            let c, d;
            new Promise((e, f) => {
                c = e;
                d = f
            });
            if (window.WebFontConfig && b)
                for (const e of b) wk(e) && a && a(e, "");
            else sa("WebFontConfig.active", c), sa("WebFontConfig.inactive", d), sa("WebFontConfig.timeout", 6E4), sa("WebFontConfig.google.families", b), a && sa("WebFontConfig.fontactive", a), a = Yi(document, "SCRIPT"), Sf(a, Ge(ze(new we(xe, "//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js")))), a.type = "text/javascript", a.async = !0, (document.getElementById("xjsc") || document.body).appendChild(a)
        },
        wk =
        a => {
            a = a.toLowerCase().replace(/ /g, "");
            const b = document.documentElement.classList;
            for (const c of b.values())
                if (c.search(`wf-${a}-w+-active`)) return !0;
            return !1
        };
    var yk = {
        ad: ["ca"],
        ae: ["ar", "en", "fa", "hi", "ur"],
        af: ["ps", "fa"],
        ag: ["en"],
        ai: ["en"],
        al: ["sq", "en"],
        am: ["hy", "ru"],
        ao: ["pt-PT"],
        ar: ["es-419", "es"],
        as: ["en"],
        at: ["de"],
        au: ["en"],
        az: ["az", "ru"],
        ba: ["bs", "hr", "sr"],
        bd: ["bn", "en"],
        be: ["nl", "de", "en", "fr"],
        bf: ["fr"],
        bg: ["bg"],
        bh: ["ar", "en"],
        bi: ["fr"],
        bj: ["fr"],
        bn: ["ms", "en", "zh-CN"],
        bo: ["es-419", "es"],
        br: ["pt-BR", "en"],
        bs: ["en"],
        bt: ["en"],
        bw: ["tn", "en"],
        by: ["be", "ru"],
        bz: ["en", "es", "es-419"],
        ca: ["en", "fr", "fr-CA"],
        cd: ["fr", "sw"],
        cf: ["fr"],
        cg: ["fr"],
        ch: ["de",
            "en", "fr", "it"
        ],
        ci: ["fr"],
        ck: ["en"],
        cl: ["es-419", "es"],
        cm: ["fr", "en"],
        cn: ["zh-CN"],
        co: ["es-419", "es"],
        cr: ["es-419", "en", "es"],
        cu: ["es-419", "es"],
        cv: ["pt-PT"],
        cy: ["en", "el", "tr"],
        cz: ["cs"],
        de: ["de", "en", "fr"],
        dj: ["fr", "ar", "so"],
        dk: ["da"],
        dm: ["en"],
        "do": ["es-419", "es"],
        dz: ["fr", "ar"],
        ec: ["es-419", "es"],
        ee: ["et", "ru"],
        eg: ["ar", "en"],
        es: ["es", "ca", "en", "eu", "gl"],
        et: ["am", "en", "so"],
        fi: ["fi", "sv"],
        fj: ["en"],
        fr: ["fr"],
        ga: ["fr"],
        ge: ["ka", "en"],
        gg: ["en", "fr"],
        gh: ["en"],
        gi: ["en", "es", "it", "pt-PT"],
        gl: ["da",
            "en"
        ],
        gm: ["en", "wo"],
        gr: ["el"],
        gt: ["es-419", "es"],
        gy: ["en"],
        hk: ["zh-TW", "en", "zh-CN", "zh-HK"],
        hn: ["es-419", "es"],
        hr: ["hr"],
        ht: ["fr", "en", "ht"],
        hu: ["hu"],
        id: ["id", "en", "nl"],
        ie: ["en-GB", "ga"],
        il: ["iw", "ar", "en"],
        im: ["en"],
        "in": "en bn gu hi kn ml mr ne or pa ta te".split(" "),
        iq: ["ar", "en"],
        is: ["is", "en"],
        it: ["it", "en"],
        je: ["en", "fr"],
        jm: ["en"],
        jo: ["ar", "en"],
        jp: ["ja"],
        ke: ["sw", "en"],
        kg: ["ky", "ru"],
        kh: ["km", "en"],
        ki: ["en"],
        kr: ["ko"],
        kw: ["ar", "en"],
        kz: ["kk", "ru"],
        la: ["lo", "en"],
        lb: ["ar", "en", "fr", "hy"],
        lk: ["en", "si", "ta"],
        ls: ["st", "en", "zu"],
        lt: ["lt"],
        lu: ["de", "fr"],
        lv: ["lv", "lt", "ru"],
        ly: ["ar", "en", "it"],
        ma: ["fr", "ar"],
        md: ["ro", "ro-MD", "ru"],
        me: ["sr-ME", "bs", "sr"],
        mg: ["mg", "fr"],
        mk: ["mk"],
        ml: ["fr"],
        mm: ["my", "en"],
        mn: ["mn"],
        mt: ["mt", "en"],
        mu: ["en", "fr"],
        mv: ["en"],
        mw: ["ny", "en"],
        mx: ["es-419", "es"],
        my: ["en", "ms"],
        mz: ["pt-PT", "ny", "sn", "sw"],
        na: ["en", "af", "de"],
        ne: ["fr"],
        ng: ["en"],
        ni: ["es-419", "en", "es"],
        nl: ["nl", "en"],
        no: ["no", "nn"],
        np: ["ne", "en"],
        nr: ["en"],
        nu: ["en"],
        nz: ["en-GB"],
        om: ["ar", "en"],
        pa: ["es-419",
            "en", "es"
        ],
        pe: ["es-419", "es"],
        pg: ["en"],
        ph: ["en"],
        pk: ["en", "pa", "ur"],
        pl: ["pl"],
        pn: ["en"],
        pr: ["es-419", "en", "es"],
        ps: ["ar", "en"],
        pt: ["pt-PT"],
        py: ["es-419", "es"],
        qa: ["ar", "en"],
        ro: ["ro", "de", "hu"],
        rs: ["sr", "sr-Latn"],
        ru: ["ru"],
        rw: ["en", "fr", "sw"],
        sa: ["ar", "en"],
        sb: ["en"],
        sc: ["crs", "en", "fr"],
        se: ["sv"],
        sg: ["en", "ms", "ta", "zh-CN"],
        si: ["sl"],
        sk: ["sk", "hu"],
        sl: ["en"],
        sm: ["it"],
        sn: ["fr", "wo"],
        so: ["so", "ar", "en"],
        sr: ["nl", "en"],
        st: ["pt-PT"],
        sv: ["es-419", "es"],
        td: ["fr", "ar"],
        tg: ["fr"],
        th: ["th", "en"],
        tj: ["tg",
            "ru"
        ],
        tl: ["pt-PT", "en", "id"],
        tm: ["tk", "ru", "uz"],
        tn: ["ar", "fr"],
        to: ["en"],
        tr: ["tr"],
        tt: "en es es-419 fr hi zh-TW".split(" "),
        tw: ["zh-TW", "en"],
        tz: ["sw", "en"],
        ua: ["uk", "ru"],
        ug: ["en"],
        uk: ["en-GB"],
        us: ["en", "es", "es-419", "zh-CN"],
        uy: ["es-419", "es"],
        uz: ["uz", "ru"],
        vc: ["en"],
        ve: ["es-419", "es"],
        vi: ["en"],
        vn: ["vi", "en", "fr", "zh-TW"],
        vu: ["en", "fr"],
        ws: ["en"],
        za: ["en", "af", "st", "tn", "zu"],
        zm: ["en", "ny", "sn"],
        zw: ["en", "ny", "sn", "tn", "zu"]
    };
    var zk = a => {
        var b = "Bc";
        if (a.Bc && a.hasOwnProperty(b)) return a.Bc;
        b = new a;
        return a.Bc = b
    };

    function Ak(a, b, c, d) {
        const e = `${b}-${c}`;
        if (d.includes(e)) return a.g = b, e;
        if (b && d.includes(b)) return a.g = b;
        if (c && yk[c])
            for (const f of yk[c])
                if (d.includes(f)) return a.g = f, a.g;
        return d.includes("en") ? (a.g = "en", a.g) : a.g = null
    }

    function U(a) {
        var b = Bk;
        if (null == b.i) throw Error("O");
        a = void 0 === b.i[a] ? "" : b.i[a];
        let c = b = 0,
            d = !1;
        const e = a.split(Xf);
        for (let f = 0; f < e.length; f++) {
            const g = e[f];
            Vf.test(g) ? (b++, c++) : Wf.test(g) ? d = !0 : Uf.test(g) ? c++ : Yf.test(g) && (d = !0)
        }
        b = 0 == c ? d ? 1 : 0 : .4 < b / c ? -1 : 1;
        return 1 == b ? "\u202a" + a + "\u202c" : -1 == b ? "\u202b" + a + "\u202c" : a
    }
    class Ck {
        constructor() {
            this.g = this.i = null
        }
        load(a, b, c, d) {
            a = Ak(this, a, b, c);
            if (null == a) return Promise.resolve();
            const e = `${d}messages.${a}.nocache.json`,
                f = new Dj;
            f.Ia = "text";
            return new Promise((g, h) => {
                zi(f, "success", () => {
                    try {
                        var k = f.g ? f.g.responseText : ""
                    } catch (l) {
                        k = ""
                    }
                    this.i = JSON.parse(k.substring(5));
                    g()
                });
                zi(f, "error", h);
                Gj(f, e)
            })
        }
    };

    function Dk(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    }
    q = Dk.prototype;
    q.clone = function() {
        return new Dk(this.left, this.top, this.width, this.height)
    };
    q.contains = function(a) {
        return a instanceof P ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    };
    q.getSize = function() {
        return new Ui(this.width, this.height)
    };
    q.ceil = function() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    q.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    q.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    q.scale = function(a, b) {
        b = "number" === typeof b ? b : a;
        this.left *= a;
        this.width *= a;
        this.top *= b;
        this.height *= b;
        return this
    };

    function Ek() {};
    /*

     Copyright 2005, 2007 Bob Ippolito. All Rights Reserved.
     Copyright The Closure Library Authors.
     SPDX-License-Identifier: MIT
    */
    function Fk(a, b) {
        this.u = [];
        this.ya = a;
        this.wa = b || null;
        this.o = this.j = !1;
        this.i = void 0;
        this.V = this.Ba = this.H = !1;
        this.v = 0;
        this.g = null;
        this.O = 0
    }
    ta(Fk, Ek);
    Fk.prototype.cancel = function(a) {
        if (this.j) this.i instanceof Fk && this.i.cancel();
        else {
            if (this.g) {
                const b = this.g;
                delete this.g;
                a ? b.cancel(a) : (a = b, a.O--, 0 >= a.O && a.cancel())
            }
            this.ya ? this.ya.call(this.wa, this) : this.V = !0;
            this.j || (a = new Gk(this), Hk(this), Ik(this, !1, a))
        }
    };
    Fk.prototype.va = function(a, b) {
        this.H = !1;
        Ik(this, a, b)
    };

    function Ik(a, b, c) {
        a.j = !0;
        a.i = c;
        a.o = !b;
        Jk(a)
    }

    function Hk(a) {
        if (a.j) {
            if (!a.V) throw new Kk(a);
            a.V = !1
        }
    }

    function Lk(a, b, c, d) {
        a.u.push([b, c, d]);
        a.j && Jk(a)
    }
    Fk.prototype.then = function(a, b, c) {
        let d, e;
        const f = new mj(function(g, h) {
            e = g;
            d = h
        });
        Lk(this, e, function(g) {
            g instanceof Gk ? f.cancel() : d(g);
            return Mk
        }, this);
        return f.then(a, b, c)
    };
    Fk.prototype.$goog_Thenable = !0;

    function Nk(a) {
        return Ua(a.u, function(b) {
            return "function" === typeof b[1]
        })
    }
    var Mk = {};

    function Jk(a) {
        if (a.v && a.j && Nk(a)) {
            var b = a.v,
                c = Ok[b];
            c && (t.clearTimeout(c.g), delete Ok[b]);
            a.v = 0
        }
        a.g && (a.g.O--, delete a.g);
        b = a.i;
        for (var d = c = !1; a.u.length && !a.H;) {
            var e = a.u.shift(),
                f = e[0];
            const h = e[1];
            e = e[2];
            if (f = a.o ? h : f) try {
                var g = f.call(e || a.wa, b);
                g === Mk && (g = void 0);
                void 0 !== g && (a.o = a.o && (g == b || g instanceof Error), a.i = b = g);
                if (lj(b) || 'function' === typeof t.Promise && b instanceof t.Promise)
                    d = !0, a.H = !0
            } catch (k) {
                b = k, a.o = !0, Nk(a) || (c = !0)
            }
        }
        a.i = b;
        d &&
            (g = qa(a.va, a, !0), d = qa(a.va, a, !1),
                b instanceof Fk ? (Lk(b, g, d), b.Ba = !0) : b.then(g, d));
        c && (b = new Pk(b), Ok[b.g] = b, a.v = b.g)
    }

    function Kk() {
        va.call(this)
    }
    ta(Kk, va);
    Kk.prototype.message = 'Deferred has already fired';
    Kk.prototype.name = 'AlreadyCalledError';

    function Gk() {
        va.call(this)
    }
    ta(Gk, va);
    Gk.prototype.message = 'Deferred was canceled';
    Gk.prototype.name = 'CanceledError';

    function Pk(a) {
        this.g = t.setTimeout(qa(this.j, this), 0);
        this.i = a
    }
    Pk.prototype.j = function() {
        delete Ok[this.g];
        throw this.i;
    };
    var Ok = {};

    function Qk() {
        var a = Rk;
        const b = {},
            c = b.document || document,
            d = Ce(a).toString(),
            e = (new Zi(c)).createElement('SCRIPT');
        var f = {
            sf: e,
            wd: void 0
        };
        const g = new Fk(Sk, f);
        let h = null;
        const k = null != b.timeout ? b.timeout : 5E3;
        0 < k && (h = window.setTimeout(function() {
            Tk(e, !0);
            var l = new Uk(1, 'Timeout reached for loading script ' + d);
            Hk(g);
            Ik(g, !1, l)
        }, k), f.wd = h);
        e.onload = e.onreadystatechange = function() {
            e.readyState && 'loaded' != e.readyState && 'complete' != e.readyState ||
                (Tk(e, b.zg || !1, h), Hk(g), Ik(g, !0, null))
        };
        e.onerror = function() {
            Tk(e, !0, h);
            var l = new Uk(0, 'Error while loading script ' + d);
            Hk(g);
            Ik(g, !1, l)
        };
        f = b.attributes || {};
        te(f, {
            type: 'text/javascript',
            charset: 'UTF-8'
        });
        Vi(e, f);
        bf(e, a);
        Vk(c).appendChild(e);
        return g
    }

    function Vk(a) {
        const b = (a || document).getElementsByTagName('HEAD');
        return b && 0 !== b.length ? b[0] : a.documentElement
    }

    function Sk() {
        if (this && this.sf) {
            const a = this.sf;
            a && 'SCRIPT' == a.tagName && Tk(a, !0, this.wd)
        }
    }

    function Tk(a, b, c) {
        null != c && t.clearTimeout(c);
        a.onload = () => {};
        a.onerror = () => {};
        a.onreadystatechange = () => {};
        b && window.setTimeout(function() {
            a && a.parentNode && a.parentNode.removeChild(a)
        }, 0)
    }

    function Uk(a, b) {
        let c = 'Jsloader error (code #' + a + ')';
        b && (c += ': ' + b);
        va.call(this, c);
        this.code = a
    }
    ta(Uk, va);
    const Bk = zk(Ck),
        Yg = fh.Va();
    var Wk = a => `${'/logos/2021/halloween18_reboot/r1025/'}${a}`.toLowerCase();
    let Xk = null;
    const Rk =
        function(a, ...b) {
            if (0 === b.length) return Ge(a[0]);
            const c = [a[0]];
            for (let d = 0; d < b.length; d++)
                c.push(encodeURIComponent(b[d])), c.push(a[d + 1]);
            return Ge(c.join(''))
        }
    `https://www.gstatic.com/external_hosted/pixi_v5/pixi-legacy.min.js`,
    Yk = () => new Promise(a => {
        var b = Qk();
        Lk(b, a, null)
    });
    var Zk = () => {
            const a = [];
            a.push(Yk());
            a.push(new Promise(b => {
                Xg([7], b)
            }));
            a.push(new Promise(b => {
                xk(() => {
                    b()
                })
            }));
            a.push(zk(Ck).load(xg, yg, fk, '/logos/2021/halloween18_reboot/r1025/'));
            return Promise.all(a)
        },
        al = () => {
            const a = [];
            a.push(new Promise(c => {
                Yg.preload(3, c)
            }));
            const b = [R.Sb, R.Cd];
            for (const c of b) a.push(new Promise(d => {
                c.preload(d)
            }));
            a.push($k('tutorial-map.json').then(c => {
                Xk = c
            }));
            return Promise.all(a)
        },
        bl = () => {
            const a = [];
            a.push(new Promise(b => {
                Xg([0, 1, 2, 4, 5, K ? 8 : 6], b)
            }));
            a.push(new Promise(b => {
                R.Bd.preload(b)
            }));
            return Promise.all(a)
        };

    function $k(a, b) {
        return r(function*() {
            const c = Wk(a);
            try {
                return yield cl(c, b)
            } catch (d) {
                return S(114), Promise.reject(d)
            }
        })
    }
    const cl = (a, b) => new Promise((c, d) => {
        const e = new XMLHttpRequest;
        e.addEventListener("load", () => {
            try {
                if (200 !== e.status) d(`${e.status}: ${a}`);
                else {
                    var f = JSON.parse(e.responseText);
                    if (void 0 !== b) {
                        const g = vk(JSON.stringify(f));
                        g !== b && (S(115), d(`Hash mismatch: expected: ${b} actual: ${g}`))
                    }
                    c(f)
                }
            } catch (g) {
                dl(e.responseText), d(g)
            }
        });
        e.addEventListener("error", f => {
            d(f)
        });
        e.addEventListener("abort", f => {
            d(f)
        });
        e.open("GET", a, !0);
        e.send()
    });
    var el = (a, b) => {
            a.play(0, !1);
            a.play(a.v, !0, b, void 0)
        },
        fl = (a, b, c) => {
            const d = a[3];
            a = a[4];
            void 0 === b && (b = d);
            void 0 === c && (c = a);
            return Math.min(b / d, c / a)
        };
    const V = new Dk(0, 0, 0, 0);
    var gl = a => {
            const b = Math.min(a.width, a.height - Mg);
            V.left = (a.width - b) / 2;
            V.top = Mg;
            V.width = b;
            V.height = b
        },
        hl = (a, b) => {
            if (a) {
                const c = b ? "ddl-visible_" : "hidden";
                a.classList.remove(b ? "hidden" : "ddl-visible_");
                a.classList.add(c)
            }
        },
        il = (...a) => {
            window.console.log.apply(null, a)
        },
        dl = (...a) => {
            window.console.error.apply(null, a)
        };
    var kl = (a, b) => {
            if (!jl) return b;
            let c;
            try {
                c = window.localStorage.getItem(a)
            } catch (d) {
                return b
            }
            return null == c ? b : JSON.parse(c)
        },
        jl = !!self.localStorage;
    var ll = (new Map).set("MOST_SPIRITS_COLLECTED", [
        [2, 175, 982, 168, 142],
        [1, 406, 181, 168, 142],
        [1, 1218, 377, 168, 142]
    ]).set("STOLE_MOST", [
        [2, 420, 887, 209, 184],
        [1, 1680, 0, 209, 184],
        [1, 581, 144, 209, 184]
    ]).set("MOST_MEGA_FLAMES", [
        [2, 1885, 1030, 160, 165],
        [1, 400, 940, 160, 165],
        [1, 203, 955, 160, 165]
    ]).set("COLLECT_1000_SPIRITS", [
        [2, 420, 706, 245, 178],
        [1, 333, 0, 245, 178], null
    ]).set("COLLECT_5000_SPIRITS", [
        [2, 890, 963, 194, 162],
        [1, 203, 790, 194, 162],
        [1, 1421, 796, 194, 162]
    ]).set("STEAL_250", [
        [2, 1087, 963, 190, 118],
        [1, 1618, 796, 190, 118],
        [1,
            1811, 796, 190, 118
        ]
    ]).set("STEAL_1000", [
        [2, 668, 706, 225, 141],
        [1, 581, 0, 225, 141],
        [1, 809, 0, 225, 141]
    ]).set("COLLECT_10_MEGA_FLAMES", [
        [2, 1280, 963, 174, 137],
        [1, 1873, 187, 174, 137], null
    ]).set("COLLECT_30_MEGA_FLAMES", [
        [2, 1721, 1030, 161, 115],
        [1, 1015, 935, 161, 115], null
    ]).set("WIN_5_GAMES", [
        [2, 420, 543, 330, 160],
        [1, 0, 0, 330, 160], null
    ]).set("WIN_35_GAMES", [
        [2, 632, 991, 162, 179],
        [1, 1618, 917, 162, 179],
        [1, 1783, 917, 162, 179]
    ]).set("PLAY_10_GAMES", [
        [2, 1457, 1052, 134, 115],
        [1, 1892, 0, 134, 115], null
    ]).set("PLAY_50_GAMES", [
        [2, 1926, 0,
            121, 145
        ],
        [1, 563, 956, 121, 145], null
    ]).set("COLLECT_150_SPIRITS_SINGLE_GAME", [
        [2, 1506, 878, 212, 171],
        [1, 1037, 0, 212, 171],
        [1, 1252, 0, 212, 171]
    ]).set("COLLECT_200_SPIRITS_SINGLE_GAME", [
        [2, 1721, 878, 210, 149],
        [1, 1467, 0, 210, 149], null
    ]).set("MOST_SPIRITS_COLLECTED_5_GAMES", [
        [2, 753, 543, 200, 149],
        [1, 1015, 783, 200, 149], null
    ]);

    function ml(a, b = 1) {
        b = kl("Get hyped for Halloween 2021COUNTER_" + a, 0) + b;
        if (jl) try {
            window.localStorage.setItem("Get hyped for Halloween 2021COUNTER_" + a, JSON.stringify(b))
        } catch (c) {}
    };
    var nl = new Map([
        [16, 1],
        [1, 2],
        [2, 2]
    ]);

    function ol() {
        pl || (pl = new ql);
        return pl
    }

    function rl(a, b, c) {
        a.left += b / a.g;
        a.top += c / a.g
    }

    function sl(a, b, c, d = N.width / 2, e = N.height) {
        e /= a.g;
        a.left = b - d / a.g;
        a.top = c - e
    }

    function tl(a, b) {
        const c = N.width / 2,
            d = N.height / 2,
            e = a.left + c / a.g,
            f = a.top + d / a.g;
        a.g *= b;
        a.left = e - c / a.g;
        a.top = f - d / a.g
    }

    function ul(a, b) {
        a.g = b
    }

    function vl(a, b) {
        a = (b - a.left) * a.g;
        return a - 0 * (N.width / 2 - a)
    }

    function wl(a, b) {
        return (b - a.top) * a.g
    }
    var ql = class {
            constructor() {
                this.top = this.left = 0;
                this.i = this.j = !1;
                this.g = 25;
                this.o = new Map([
                    [73, () => {
                        tl(this, 1.5)
                    }],
                    [79, () => {
                        tl(this, 1 / 1.5)
                    }],
                    [65, () => {
                        rl(this, -100, 0)
                    }],
                    [68, () => {
                        rl(this, 100, 0)
                    }],
                    [87, () => {
                        rl(this, 0, -100)
                    }],
                    [83, () => {
                        rl(this, 0, 100)
                    }],
                    [81, () => {}]
                ])
            }
        },
        pl;
    const xl = fh.Va(),
        yl = ol();
    var Al = (a, b, c, d, e = 0, f = !1, g = 1, h = 1, k, l = xl) => {
            b = vl(yl, b);
            c = wl(yl, c);
            zl(a, b, c, yl.g * d, e, f, g, h, k, l)
        },
        zl = (a, b, c, d, e = 0, f = !1, g = 1, h = 1, k, l = xl) => {
            O.save();
            void 0 !== k && (O.globalAlpha = k);
            O.translate(b, c);
            O.scale(g, h);
            f && O.rotate(e);
            b = a[3] / (a[5] || 1);
            c = a[4] / (a[5] || 1);
            void 0 !== d && (d /= c, O.scale(d, d));
            !f && 0 > Math.cos(e) && O.scale(-1, 1);
            $g(l, a, O, -(b / 2), -(c / 2));
            O.restore()
        },
        Bl = (a, b, c, d, e, f) => {
            if (!a) return 0;
            e = fl(a, e, f);
            $g(xl, a, b, c, d, e, !0);
            return e
        },
        Cl = (a, b, c, d) => {
            a = vl(yl, a);
            b = wl(yl, b);
            c *= yl.g;
            d && (O.fillStyle = d);
            O.beginPath();
            O.arc(a, b, c, 0, 2 * Math.PI);
            d ? O.fill() : O.stroke()
        },
        Dl = (a, b, c, d, e, f, g) => {
            b = vl(yl, b);
            c = wl(yl, c);
            O.save();
            O.translate(b, c);
            void 0 !== f && O.rotate(f);
            void 0 !== g && O.scale(g, g);
            void 0 !== e && (O.strokeStyle = e, O.strokeText(a, 0, 0));
            void 0 !== d && (O.fillStyle = d, O.fillText(a, 0, 0));
            O.restore()
        },
        El = a => {
            a.save();
            a.setTransform(1, 0, 0, 1, 0, 0);
            a.fillStyle = "rgba(0,0,0,0.6)";
            a.fillRect(0, 0, a.canvas.width, a.canvas.height);
            a.restore()
        };
    var Fl = class {
        j() {
            return !0
        }
    };
    var Gl = class extends Fl {
        constructor(a, b, c) {
            super();
            this.g = a;
            this.i = b;
            this.o = Math.abs(c)
        }
        moveTo(a, b) {
            this.g = a;
            this.i = b
        }
        contains(a, b) {
            return Math.sqrt((this.g - a) * (this.g - a) + (this.i - b) * (this.i - b)) <= this.o
        }
    };

    function Hl(a, b, c, d, e, f, g, h = "") {
        const k = a.font;
        a.font = h + " " + d + "px " + c;
        let l = Il(a, b, f);
        for (; l.length > g && d > e;) d = Math.max(e, 1 < d ? d - 1 : d - .1), a.font = h + " " + d + "px " + c, l = Il(a, b, f);
        for (b = 0; b < l.length; b++)
            for (; a.measureText(l[b]).width > f && d > e;) d = Math.max(e, 1 < d ? d - 1 : d - .1), a.font = h + " " + d + "px " + c;
        a.font = k;
        return {
            lines: l,
            fontFamily: c,
            fontSize: d,
            fontStyle: h
        }
    }

    function Il(a, b, c) {
        b = b.match(/[^\s-]+-?/g);
        if (!b || 1 > b.length) return [""];
        let d = b[0];
        const e = [];
        for (let f = 1; f < b.length; f++) {
            const g = d + ("-" == d[d.length - 1] ? "" : " ") + b[f];
            a.measureText(g).width > c ? (e.push(d), d = b[f]) : d = g
        }
        e.push(d);
        return e
    }

    function Jl(a, b, c, d, e, f) {
        const g = a.font;
        a.font = b.fontStyle + " " + b.fontSize + "px " + b.fontFamily;
        for (let h = 0; h < b.lines.length; h++) a.fillText(b.lines[h], c, d + h * e), f && a.strokeText(b.lines[h], c, d + h * e);
        a.font = g
    };
    fh.Va();
    var Kl = class {
            constructor() {
                this.o = this.u = !1
            }
            update(a) {
                this.u || (this.onStart(), this.u = !0);
                this.g() ? this.o || (this.j(), this.o = !0) : this.Ta(a)
            }
            g() {
                return !0
            }
            onStart() {}
            Ta() {}
            j() {}
            reset() {
                this.o = this.u = !1
            }
        },
        Ll = class extends Kl {
            constructor(a) {
                super();
                this.i = a
            }
            j() {
                super.j();
                this.i()
            }
        },
        W = class extends Kl {
            constructor(a, b) {
                super();
                this.i = a;
                this.v = b
            }
            onStart() {
                this.i.start()
            }
            Ta(a) {
                this.i.update(a);
                this.v(Ml(this.i))
            }
            g() {
                return !this.i.u && Nl(this.i)
            }
            reset() {
                super.reset();
                this.i.reset()
            }
        },
        Ol = class extends Kl {
            constructor(a) {
                super();
                this.v = a;
                this.i = 0
            }
            Ta(a) {
                this.i += a
            }
            g() {
                return this.i >= this.v
            }
            reset() {
                super.reset();
                this.i = 0
            }
        },
        Pl = class extends Kl {
            constructor(a, b = !1) {
                super();
                this.actions = a;
                this.v = b;
                this.i = a.slice()
            }
            g() {
                return !this.actions.length
            }
            Ta(a) {
                if (0 < this.actions.length && 0 < a) {
                    const b = this.actions[0];
                    b.update(a);
                    b.g() && this.actions.length && this.actions[0] === b && this.actions.shift()
                }
                this.g() && this.v && this.reset()
            }
            reset() {
                super.reset();
                this.actions = this.i.slice();
                for (const a of this.actions) a.reset()
            }
        },
        Ql = class extends Kl {
            constructor(a) {
                super();
                this.actions = a
            }
            g() {
                for (const a of this.actions)
                    if (!a.g()) return !1;
                return !0
            }
            Ta(a) {
                if (!this.g())
                    for (const b of this.actions) b.update(a)
            }
            reset() {
                super.reset();
                for (const a of this.actions) a.reset()
            }
        };

    function Rl(a, b, c, d, e, f, g, h) {
        this.g = a;
        this.u = b;
        this.j = c;
        this.v = d;
        this.o = e;
        this.H = f;
        this.i = g;
        this.O = h
    }
    Rl.prototype.clone = function() {
        return new Rl(this.g, this.u, this.j, this.v, this.o, this.H, this.i, this.O)
    };

    function Sl(a, b) {
        if (0 == b) return a.g;
        if (1 == b) return a.i;
        var c = Ti(a.g, a.j, b),
            d = Ti(a.j, a.o, b);
        a = Ti(a.o, a.i, b);
        c = Ti(c, d, b);
        d = Ti(d, a, b);
        return Ti(c, d, b)
    }

    function Tl(a, b) {
        if (0 == b) return a.u;
        if (1 == b) return a.O;
        var c = Ti(a.u, a.v, b),
            d = Ti(a.v, a.H, b);
        a = Ti(a.H, a.O, b);
        c = Ti(c, d, b);
        d = Ti(d, a, b);
        return Ti(c, d, b)
    }
    Rl.prototype.wb = function() {
        return new P(Sl(this), Tl(this))
    };

    function Ul(a, b) {
        var c = (b - a.g) / (a.i - a.g);
        if (0 >= c) return 0;
        if (1 <= c) return 1;
        for (var d = 0, e = 1, f = 0, g = 0; 8 > g; g++) {
            f = Sl(a, c);
            var h = (Sl(a, c + 1E-6) - f) / 1E-6;
            if (1E-6 > Math.abs(f - b)) return c;
            if (1E-6 > Math.abs(h)) break;
            else f < b ? d = c : e = c, c -= (f - b) / h
        }
        for (g = 0; 1E-6 < Math.abs(f - b) && 8 > g; g++) f < b ? (d = c, c = (c + e) / 2) : (e = c, c = (c + d) / 2), f = Sl(a, c);
        return c
    };
    const Vl = (a, b, c, d) => {
        const e = new Rl(0, 0, a, b, c, d, 1, 1);
        return f => Tl(e, Ul(e, f))
    };
    var Wl = Vl(.25, .1, .25, 1),
        Xl = (a, b, c, d = Wl) => b + d(a) * (c - b),
        Yl = a => a,
        Zl = Vl(.4, 0, 1, 1),
        $l = Vl(.6, -.28, .735, .045),
        am = Vl(0, 0, .6, 1),
        bm = Vl(.175, .885, .32, 1.275),
        cm = Vl(.6, 0, .4, 1);

    function dm() {
        return performance.now()
    }

    function Ml(a) {
        let b = Math.min(Math.max(em(a) / a.duration, 0), 1);
        a.i && (b = 1 - b);
        for (let c in a.v) a.O.hasOwnProperty(c) && (a.V[c] = Xl(b, a.v[c], a.O[c], a.va));
        return a.V
    }

    function Nl(a) {
        return em(a) >= a.duration
    }

    function em(a) {
        return null === a.g ? 0 : a.o() - a.g
    }

    function fm(a) {
        if (null !== a.g && !a.i) {
            var b = Math.min(a.duration, em(a));
            a.g = a.o() - (a.duration - b);
            a.i = !0
        }
    }
    class gm {
        constructor(a, b, c, d = Wl, e = dm) {
            this.v = a;
            this.O = b;
            this.V = {};
            this.duration = c;
            this.va = d;
            this.o = e;
            this.g = null;
            this.i = !1
        }
        start() {
            this.g = this.o();
            this.i = !1
        }
        reset() {
            this.g = null
        }
    };
    class X extends gm {
        constructor(a, b, c, d = Wl, e = !1, f = !1) {
            super(a, b, c, d, () => this.j);
            this.j = 0;
            this.H = f;
            this.u = e
        }
        update(a) {
            null !== this.g && (this.j += a, Nl(this) && (this.H && !this.i ? fm(this) : this.u && this.i && (this.i = !1), this.H || this.u)) && (this.g = 0, this.j %= this.duration)
        }
        reset() {
            super.reset();
            this.j = 0
        }
    };
    var jm = (a, b) => void 0 !== b && hm.has(b) ? hm.get(b).get(a) : im.get(a),
        mm = (a, b) => {
            a = km[a - 1];
            return new Pl([new X({
                y: a.a.y
            }, {
                y: a.b.y
            }, a.b.f * lm, cm), new X({
                y: a.b.y
            }, {
                y: a.c.y
            }, (a.c.f - a.b.f) * lm, cm)].map(c => new W(c, b)), !0)
        };
    const lm = 1E3 / 24,
        im = new Map([
            [1, [gh]],
            [2, [
                [4, 312, 3708, 75, 75]
            ]],
            [3, [
                [4, 1014, 3741, 63, 75]
            ]],
            [4, [
                [4, 390, 3714, 75, 63]
            ]],
            [5, [
                [5, 390, 3499, 75, 75]
            ]],
            [6, [
                [5, 468, 3499, 75, 75]
            ]],
            [7, [
                [5, 546, 3499, 75, 75]
            ]],
            [8, [
                [5, 624, 3499, 75, 75]
            ]],
            [9, [
                [4, 0, 0, 150, 180]
            ]],
            [10, [
                [4, 1377, 2415, 150, 150]
            ]],
            [11, [
                [5, 0, 0, 150, 180]
            ]],
            [12, [
                [5, 306, 1989, 150, 150]
            ]],
            [0, [gh]]
        ]),
        hm = new Map([
            ["sleep", new Map([
                [1, [
                    [3, 1611, 1409, 75, 75],
                    [3, 1611, 1409, 75, 75],
                    [3, 1689, 1409, 75, 75],
                    [3, 1689, 1409, 75, 75],
                    [3, 1767, 1409, 75, 75],
                    [3, 1767, 1409, 75, 75],
                    [3, 1845, 1409, 75, 75],
                    [3,
                        1845, 1409, 75, 75
                    ],
                    [3, 1845, 1409, 75, 75],
                    [3, 1845, 1409, 75, 75],
                    [3, 1845, 1409, 75, 75],
                    [3, 1845, 1409, 75, 75],
                    [3, 1845, 1409, 75, 75],
                    [3, 1845, 1409, 75, 75],
                    [3, 1845, 1409, 75, 75],
                    [3, 1845, 1409, 75, 75],
                    [3, 1845, 1409, 75, 75],
                    [3, 1845, 1409, 75, 75],
                    [3, 1845, 1409, 75, 75],
                    [3, 1845, 1409, 75, 75],
                    [3, 1845, 1409, 75, 75],
                    [3, 0, 1411, 75, 75],
                    [3, 0, 1411, 75, 75],
                    [3, 78, 1411, 75, 75],
                    [3, 78, 1411, 75, 75],
                    [3, 156, 1411, 75, 75],
                    [3, 156, 1411, 75, 75],
                    [3, 78, 1411, 75, 75],
                    [3, 78, 1411, 75, 75],
                    [3, 156, 1411, 75, 75],
                    [3, 156, 1411, 75, 75],
                    [3, 78, 1411, 75, 75],
                    [3, 78, 1411, 75, 75],
                    [3, 156,
                        1411, 75, 75
                    ],
                    [3, 156, 1411, 75, 75],
                    [3, 78, 1411, 75, 75]
                ]],
                [5, [
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1929, 1499, 75, 75],
                    [3, 1077, 1504, 75, 75],
                    [3, 1077, 1504, 75, 75],
                    [3, 1155, 1504, 75, 75],
                    [3, 1155, 1504, 75, 75],
                    [3, 1155, 1504, 75, 75],
                    [3, 1155, 1504, 75, 75],
                    [3, 1155,
                        1504, 75, 75
                    ],
                    [3, 1155, 1504, 75, 75],
                    [3, 1155, 1504, 75, 75],
                    [3, 1155, 1504, 75, 75],
                    [3, 1155, 1504, 75, 75],
                    [3, 1155, 1504, 75, 75],
                    [3, 1155, 1504, 75, 75],
                    [3, 1155, 1504, 75, 75],
                    [3, 1155, 1504, 75, 75],
                    [3, 1155, 1504, 75, 75],
                    [3, 1155, 1504, 75, 75],
                    [3, 1155, 1504, 75, 75],
                    [3, 1233, 1507, 75, 75],
                    [3, 1233, 1507, 75, 75]
                ]],
                [0, Vh]
            ])],
            ["idle", new Map([
                [1, Vh],
                [2, [
                    [4, 153, 0, 150, 180],
                    [4, 153, 0, 150, 180],
                    [4, 306, 0, 150, 180],
                    [4, 306, 0, 150, 180],
                    [4, 306, 0, 150, 180],
                    [4, 306, 0, 150, 180],
                    [4, 459, 0, 150, 180],
                    [4, 612, 0, 150, 180],
                    [4, 765, 0, 150, 180],
                    [4, 918, 0, 150, 180],
                    [4, 1071, 0,
                        150, 180
                    ],
                    [4, 1224, 0, 150, 180],
                    [4, 1224, 0, 150, 180],
                    [4, 1377, 0, 150, 180],
                    [4, 1530, 0, 150, 180],
                    [4, 1683, 0, 150, 180],
                    [4, 1683, 0, 150, 180],
                    [4, 1836, 0, 150, 180],
                    [4, 0, 183, 150, 180],
                    [4, 1377, 0, 150, 180],
                    [4, 1530, 0, 150, 180],
                    [4, 153, 183, 150, 180],
                    [4, 153, 183, 150, 180],
                    [4, 306, 183, 150, 180],
                    [4, 459, 183, 150, 180],
                    [4, 612, 183, 150, 180],
                    [4, 765, 183, 150, 180],
                    [4, 918, 183, 150, 180],
                    [4, 918, 183, 150, 180],
                    [4, 1071, 183, 150, 180],
                    [4, 1224, 183, 150, 180],
                    [4, 1377, 183, 150, 180],
                    [4, 1530, 183, 150, 180],
                    [4, 1683, 183, 150, 180],
                    [4, 1683, 183, 150, 180],
                    [4, 1836, 0, 150, 180],
                    [4, 1836, 183, 150, 180],
                    [4, 0, 366, 150, 180],
                    [4, 0, 366, 150, 180],
                    [4, 153, 366, 150, 180],
                    [4, 306, 366, 150, 180],
                    [4, 306, 366, 150, 180],
                    [4, 459, 366, 150, 180],
                    [4, 612, 366, 150, 180],
                    [4, 612, 366, 150, 180],
                    [4, 765, 366, 150, 180],
                    [4, 153, 0, 150, 180],
                    [4, 153, 0, 150, 180],
                    [4, 153, 0, 150, 180],
                    [4, 306, 0, 150, 180],
                    [4, 918, 366, 150, 180],
                    [4, 1071, 366, 150, 180],
                    [4, 1224, 366, 150, 180],
                    [4, 1377, 366, 150, 180],
                    [4, 1530, 366, 150, 180],
                    [4, 1683, 366, 150, 180],
                    [4, 1836, 366, 150, 180],
                    [4, 0, 549, 150, 180],
                    [4, 459, 0, 150, 180],
                    [4, 153, 549, 150, 180],
                    [4, 153, 549, 150, 180],
                    [4, 153, 549,
                        150, 180
                    ],
                    [4, 153, 549, 150, 180],
                    [4, 153, 549, 150, 180],
                    [4, 153, 549, 150, 180],
                    [4, 153, 549, 150, 180],
                    [4, 153, 549, 150, 180],
                    [4, 153, 549, 150, 180]
                ]],
                [3, [
                    [4, 306, 549, 150, 180],
                    [4, 306, 549, 150, 180],
                    [4, 306, 549, 150, 180],
                    [4, 306, 549, 150, 180],
                    [4, 306, 549, 150, 180],
                    [4, 306, 549, 150, 180],
                    [4, 459, 549, 150, 180],
                    [4, 459, 549, 150, 180],
                    [4, 459, 549, 150, 180],
                    [4, 459, 549, 150, 180],
                    [4, 459, 549, 150, 180],
                    [4, 459, 549, 150, 180],
                    [4, 612, 549, 150, 180],
                    [4, 612, 549, 150, 180],
                    [4, 612, 549, 150, 180],
                    [4, 612, 549, 150, 180],
                    [4, 765, 549, 150, 180],
                    [4, 765, 549, 150, 180],
                    [4, 765,
                        549, 150, 180
                    ],
                    [4, 765, 549, 150, 180],
                    [4, 918, 549, 150, 180],
                    [4, 918, 549, 150, 180],
                    [4, 918, 549, 150, 180],
                    [4, 918, 549, 150, 180],
                    [4, 306, 549, 150, 180],
                    [4, 306, 549, 150, 180],
                    [4, 306, 549, 150, 180],
                    [4, 306, 549, 150, 180],
                    [4, 306, 549, 150, 180],
                    [4, 306, 549, 150, 180],
                    [4, 459, 549, 150, 180],
                    [4, 459, 549, 150, 180],
                    [4, 459, 549, 150, 180],
                    [4, 1071, 549, 150, 180],
                    [4, 1071, 549, 150, 180],
                    [4, 1224, 549, 150, 180],
                    [4, 1377, 549, 150, 180],
                    [4, 1377, 549, 150, 180],
                    [4, 1377, 549, 150, 180],
                    [4, 1377, 549, 150, 180],
                    [4, 1530, 549, 150, 180],
                    [4, 1530, 549, 150, 180],
                    [4, 1530, 549, 150, 180],
                    [4, 1530, 549, 150, 180],
                    [4, 1683, 549, 150, 180],
                    [4, 1683, 549, 150, 180],
                    [4, 1683, 549, 150, 180],
                    [4, 1683, 549, 150, 180],
                    [4, 1836, 549, 150, 180],
                    [4, 1836, 549, 150, 180],
                    [4, 1836, 549, 150, 180],
                    [4, 1836, 549, 150, 180],
                    [4, 0, 732, 150, 180],
                    [4, 153, 732, 150, 180],
                    [4, 306, 732, 150, 180],
                    [4, 306, 732, 150, 180],
                    [4, 306, 732, 150, 180],
                    [4, 306, 732, 150, 180],
                    [4, 306, 732, 150, 180],
                    [4, 306, 732, 150, 180],
                    [4, 459, 732, 150, 180],
                    [4, 459, 732, 150, 180],
                    [4, 459, 732, 150, 180],
                    [4, 459, 732, 150, 180],
                    [4, 612, 732, 150, 180],
                    [4, 612, 732, 150, 180],
                    [4, 612, 732, 150, 180],
                    [4, 612, 732, 150,
                        180
                    ],
                    [4, 765, 732, 150, 180],
                    [4, 918, 732, 150, 180],
                    [4, 918, 732, 150, 180],
                    [4, 1071, 732, 150, 180]
                ]],
                [4, [
                    [4, 1530, 2415, 150, 150],
                    [4, 1530, 2415, 150, 150],
                    [4, 1683, 2415, 150, 150],
                    [4, 1683, 2415, 150, 150],
                    [4, 1836, 2415, 150, 150],
                    [4, 1836, 2415, 150, 150],
                    [4, 0, 2445, 150, 150],
                    [4, 153, 2445, 150, 150],
                    [4, 306, 2445, 150, 150],
                    [4, 459, 2445, 150, 150],
                    [4, 612, 2445, 150, 150],
                    [4, 765, 2445, 150, 150],
                    [4, 765, 2445, 150, 150],
                    [4, 918, 2445, 150, 150],
                    [4, 1071, 2445, 150, 150],
                    [4, 1224, 2568, 150, 150],
                    [4, 1224, 2568, 150, 150],
                    [4, 1377, 2568, 150, 150]
                ]],
                [5, [
                    [3, 459, 980, 150, 150],
                    [3, 459, 980, 150, 150],
                    [3, 459, 980, 150, 150],
                    [3, 612, 980, 150, 150],
                    [3, 612, 980, 150, 150],
                    [3, 1027, 982, 150, 150],
                    [3, 1027, 982, 150, 150],
                    [3, 1180, 982, 150, 150],
                    [3, 1180, 982, 150, 150],
                    [3, 0, 1027, 150, 150],
                    [3, 0, 1027, 150, 150],
                    [3, 0, 1027, 150, 150],
                    [3, 1180, 982, 150, 150],
                    [3, 1180, 982, 150, 150],
                    [3, 153, 1027, 150, 150],
                    [3, 153, 1027, 150, 150],
                    [3, 1608, 1102, 150, 150],
                    [3, 1608, 1102, 150, 150],
                    [3, 459, 980, 150, 150],
                    [3, 459, 980, 150, 150],
                    [3, 459, 980, 150, 150],
                    [3, 612, 980, 150, 150],
                    [3, 612, 980, 150, 150],
                    [3, 1027, 982, 150, 150],
                    [3, 1027, 982, 150, 150],
                    [3, 1180, 982,
                        150, 150
                    ],
                    [3, 1180, 982, 150, 150],
                    [3, 0, 1027, 150, 150],
                    [3, 0, 1027, 150, 150],
                    [3, 1761, 1103, 150, 150],
                    [3, 1333, 1120, 150, 150],
                    [3, 1333, 1120, 150, 150],
                    [3, 765, 1127, 150, 150],
                    [3, 306, 1133, 150, 150],
                    [3, 459, 1133, 150, 150],
                    [3, 612, 1133, 150, 150],
                    [3, 918, 1135, 150, 150],
                    [3, 918, 1135, 150, 150],
                    [3, 918, 1135, 150, 150],
                    [3, 1071, 1135, 150, 150],
                    [3, 1071, 1135, 150, 150],
                    [3, 0, 1180, 150, 150],
                    [3, 0, 1180, 150, 150],
                    [3, 153, 1180, 150, 150],
                    [3, 153, 1180, 150, 150],
                    [3, 1486, 1255, 150, 150],
                    [3, 1486, 1255, 150, 150],
                    [3, 1486, 1255, 150, 150],
                    [3, 153, 1180, 150, 150],
                    [3, 153, 1180,
                        150, 150
                    ],
                    [3, 1639, 1256, 150, 150],
                    [3, 1639, 1256, 150, 150],
                    [3, 1792, 1256, 150, 150],
                    [3, 1792, 1256, 150, 150],
                    [3, 918, 1135, 150, 150],
                    [3, 918, 1135, 150, 150],
                    [3, 918, 1135, 150, 150],
                    [3, 1071, 1135, 150, 150],
                    [3, 1071, 1135, 150, 150],
                    [3, 0, 1180, 150, 150],
                    [3, 0, 1180, 150, 150],
                    [3, 153, 1180, 150, 150],
                    [3, 1224, 1273, 150, 150],
                    [3, 765, 1280, 150, 150],
                    [3, 765, 1280, 150, 150],
                    [3, 306, 1286, 150, 150],
                    [3, 459, 1286, 150, 150],
                    [3, 612, 1286, 150, 150],
                    [3, 918, 1288, 150, 150],
                    [3, 918, 1288, 150, 150],
                    [3, 1608, 1102, 150, 150],
                    [3, 1608, 1102, 150, 150]
                ]],
                [6, [
                    [5, 459, 1989, 150, 150],
                    [5, 459, 1989, 150, 150],
                    [5, 459, 1989, 150, 150],
                    [5, 612, 1989, 150, 150],
                    [5, 612, 1989, 150, 150],
                    [5, 765, 1989, 150, 150],
                    [5, 765, 1989, 150, 150],
                    [5, 918, 1989, 150, 150],
                    [5, 918, 1989, 150, 150],
                    [5, 1071, 1989, 150, 150],
                    [5, 1071, 1989, 150, 150],
                    [5, 1071, 1989, 150, 150],
                    [5, 918, 1989, 150, 150],
                    [5, 918, 1989, 150, 150],
                    [5, 1224, 1989, 150, 150],
                    [5, 1224, 1989, 150, 150],
                    [5, 1377, 1989, 150, 150],
                    [5, 1377, 1989, 150, 150],
                    [5, 1530, 1989, 150, 150],
                    [5, 1530, 1989, 150, 150],
                    [5, 1683, 1989, 150, 150],
                    [5, 1683, 1989, 150, 150],
                    [5, 1836, 1989, 150, 150],
                    [5, 0, 2019, 150, 150],
                    [5, 153, 2142,
                        150, 150
                    ],
                    [5, 153, 2142, 150, 150],
                    [5, 153, 2142, 150, 150],
                    [5, 306, 2142, 150, 150],
                    [5, 306, 2142, 150, 150],
                    [5, 459, 2142, 150, 150],
                    [5, 459, 2142, 150, 150],
                    [5, 612, 2142, 150, 150],
                    [5, 612, 2142, 150, 150],
                    [5, 612, 2142, 150, 150],
                    [5, 306, 2142, 150, 150],
                    [5, 306, 2142, 150, 150],
                    [5, 765, 2142, 150, 150],
                    [5, 765, 2142, 150, 150],
                    [5, 153, 2142, 150, 150],
                    [5, 153, 2142, 150, 150],
                    [5, 153, 2142, 150, 150],
                    [5, 306, 2142, 150, 150],
                    [5, 918, 2142, 150, 150],
                    [5, 1071, 2142, 150, 150],
                    [5, 1224, 2142, 150, 150],
                    [5, 1377, 2142, 150, 150],
                    [5, 1530, 2142, 150, 150],
                    [5, 1530, 2142, 150, 150],
                    [5, 1683,
                        2142, 150, 150
                    ],
                    [5, 1683, 2142, 150, 150],
                    [5, 1836, 2142, 150, 150],
                    [5, 0, 2172, 150, 150],
                    [5, 153, 2295, 150, 150],
                    [5, 306, 2295, 150, 150],
                    [5, 306, 2295, 150, 150],
                    [5, 459, 2295, 150, 150],
                    [5, 459, 2295, 150, 150],
                    [5, 612, 2295, 150, 150],
                    [5, 612, 2295, 150, 150],
                    [5, 612, 2295, 150, 150],
                    [5, 765, 2295, 150, 150],
                    [5, 765, 2295, 150, 150],
                    [5, 918, 2295, 150, 150],
                    [5, 918, 2295, 150, 150],
                    [5, 1071, 2295, 150, 150],
                    [5, 1071, 2295, 150, 150],
                    [5, 1071, 2295, 150, 150],
                    [5, 765, 2295, 150, 150],
                    [5, 765, 2295, 150, 150],
                    [5, 459, 2295, 150, 150],
                    [5, 459, 2295, 150, 150],
                    [5, 612, 2295, 150, 150],
                    [5,
                        612, 2295, 150, 150
                    ],
                    [5, 612, 2295, 150, 150],
                    [5, 1224, 2295, 150, 150],
                    [5, 1224, 2295, 150, 150],
                    [5, 1377, 2295, 150, 150],
                    [5, 1530, 2295, 150, 150],
                    [5, 1683, 2295, 150, 150],
                    [5, 1836, 2295, 150, 150],
                    [5, 1836, 2295, 150, 150],
                    [5, 0, 2325, 150, 150],
                    [5, 0, 2325, 150, 150],
                    [5, 459, 1989, 150, 150]
                ]],
                [7, [
                    [5, 153, 2448, 150, 150],
                    [5, 153, 2448, 150, 150],
                    [5, 153, 2448, 150, 150],
                    [5, 306, 2448, 150, 150],
                    [5, 306, 2448, 150, 150],
                    [5, 459, 2448, 150, 150],
                    [5, 459, 2448, 150, 150],
                    [5, 612, 2448, 150, 150],
                    [5, 612, 2448, 150, 150],
                    [5, 612, 2448, 150, 150],
                    [5, 459, 2448, 150, 150],
                    [5, 459, 2448,
                        150, 150
                    ],
                    [5, 306, 2448, 150, 150],
                    [5, 306, 2448, 150, 150],
                    [5, 153, 2448, 150, 150],
                    [5, 153, 2448, 150, 150],
                    [5, 765, 2448, 150, 150],
                    [5, 918, 2448, 150, 150],
                    [5, 918, 2448, 150, 150],
                    [5, 1071, 2448, 150, 150],
                    [5, 459, 2448, 150, 150],
                    [5, 612, 2448, 150, 150],
                    [5, 612, 2448, 150, 150],
                    [5, 612, 2448, 150, 150],
                    [5, 459, 2448, 150, 150],
                    [5, 459, 2448, 150, 150],
                    [5, 306, 2448, 150, 150],
                    [5, 306, 2448, 150, 150],
                    [5, 153, 2448, 150, 150],
                    [5, 153, 2448, 150, 150],
                    [5, 153, 2448, 150, 150],
                    [5, 306, 2448, 150, 150],
                    [5, 1224, 2448, 150, 150],
                    [5, 1377, 2448, 150, 150],
                    [5, 1530, 2448, 150, 150],
                    [5, 1683,
                        2448, 150, 150
                    ],
                    [5, 1683, 2448, 150, 150],
                    [5, 1683, 2448, 150, 150],
                    [5, 1530, 2448, 150, 150],
                    [5, 1530, 2448, 150, 150],
                    [5, 1836, 2448, 150, 150],
                    [5, 1836, 2448, 150, 150],
                    [5, 0, 2478, 150, 150],
                    [5, 153, 2601, 150, 150],
                    [5, 306, 2601, 150, 150],
                    [5, 459, 2601, 150, 150],
                    [5, 612, 2601, 150, 150],
                    [5, 765, 2601, 150, 150],
                    [5, 765, 2601, 150, 150],
                    [5, 918, 2601, 150, 150],
                    [5, 918, 2601, 150, 150],
                    [5, 918, 2601, 150, 150],
                    [5, 765, 2601, 150, 150],
                    [5, 765, 2601, 150, 150],
                    [5, 612, 2601, 150, 150],
                    [5, 612, 2601, 150, 150],
                    [5, 1071, 2601, 150, 150],
                    [5, 1071, 2601, 150, 150],
                    [5, 1071, 2601, 150, 150],
                    [5, 1224, 2601, 150, 150],
                    [5, 1377, 2601, 150, 150],
                    [5, 1530, 2601, 150, 150],
                    [5, 459, 2448, 150, 150],
                    [5, 612, 2448, 150, 150],
                    [5, 612, 2448, 150, 150],
                    [5, 612, 2448, 150, 150],
                    [5, 459, 2448, 150, 150],
                    [5, 459, 2448, 150, 150],
                    [5, 306, 2448, 150, 150],
                    [5, 306, 2448, 150, 150],
                    [5, 153, 2448, 150, 150],
                    [5, 153, 2448, 150, 150]
                ]],
                [8, [
                    [5, 1683, 2601, 150, 150],
                    [5, 1683, 2601, 150, 150],
                    [5, 1683, 2601, 150, 150],
                    [5, 1836, 2601, 150, 150],
                    [5, 1836, 2601, 150, 150],
                    [5, 0, 2631, 150, 150],
                    [5, 0, 2631, 150, 150],
                    [5, 153, 2754, 150, 150],
                    [5, 153, 2754, 150, 150],
                    [5, 153, 2754, 150, 150],
                    [5, 306, 2754,
                        150, 150
                    ],
                    [5, 459, 2754, 150, 150],
                    [5, 612, 2754, 150, 150],
                    [5, 612, 2754, 150, 150],
                    [5, 1683, 2601, 150, 150],
                    [5, 1683, 2601, 150, 150],
                    [5, 1683, 2601, 150, 150],
                    [5, 1836, 2601, 150, 150],
                    [5, 1836, 2601, 150, 150],
                    [5, 0, 2631, 150, 150],
                    [5, 765, 2754, 150, 150],
                    [5, 765, 2754, 150, 150],
                    [5, 918, 2754, 150, 150],
                    [5, 1071, 2754, 150, 150],
                    [5, 1071, 2754, 150, 150],
                    [5, 1224, 2754, 150, 150],
                    [5, 1224, 2754, 150, 150],
                    [5, 1224, 2754, 150, 150],
                    [5, 1377, 2754, 150, 150],
                    [5, 1377, 2754, 150, 150],
                    [5, 1530, 2754, 150, 150],
                    [5, 1530, 2754, 150, 150],
                    [5, 1530, 2754, 150, 150],
                    [5, 1683, 2754, 150,
                        150
                    ],
                    [5, 1683, 2754, 150, 150],
                    [5, 1836, 2754, 150, 150],
                    [5, 1836, 2754, 150, 150],
                    [5, 0, 2784, 150, 150],
                    [5, 0, 2784, 150, 150],
                    [5, 0, 2784, 150, 150],
                    [5, 153, 2907, 150, 150],
                    [5, 153, 2907, 150, 150],
                    [5, 306, 2907, 150, 150],
                    [5, 306, 2907, 150, 150],
                    [5, 459, 2907, 150, 150],
                    [5, 459, 2907, 150, 150],
                    [5, 459, 2907, 150, 150],
                    [5, 612, 2907, 150, 150],
                    [5, 612, 2907, 150, 150],
                    [5, 765, 2907, 150, 150],
                    [5, 765, 2907, 150, 150],
                    [5, 765, 2907, 150, 150],
                    [5, 459, 2907, 150, 150],
                    [5, 459, 2907, 150, 150],
                    [5, 459, 2907, 150, 150],
                    [5, 612, 2907, 150, 150],
                    [5, 612, 2907, 150, 150],
                    [5, 765, 2907, 150,
                        150
                    ],
                    [5, 765, 2907, 150, 150],
                    [5, 765, 2907, 150, 150],
                    [5, 459, 2907, 150, 150],
                    [5, 459, 2907, 150, 150],
                    [5, 459, 2907, 150, 150],
                    [5, 612, 2907, 150, 150],
                    [5, 612, 2907, 150, 150],
                    [5, 765, 2907, 150, 150],
                    [5, 918, 2907, 150, 150],
                    [5, 1071, 2907, 150, 150],
                    [5, 1071, 2907, 150, 150],
                    [5, 1071, 2907, 150, 150],
                    [5, 1224, 2907, 150, 150],
                    [5, 1224, 2907, 150, 150]
                ]],
                [9, [
                    [4, 1530, 2568, 150, 150],
                    [4, 1683, 2568, 150, 150],
                    [4, 1683, 2568, 150, 150],
                    [4, 1836, 2568, 150, 150],
                    [4, 0, 2598, 150, 150],
                    [4, 153, 2598, 150, 150],
                    [4, 306, 2598, 150, 150],
                    [4, 459, 2598, 150, 150],
                    [4, 1224, 2415, 150, 150],
                    [4, 612, 2598, 150, 150],
                    [4, 765, 2598, 150, 150],
                    [4, 918, 2598, 150, 150],
                    [4, 1071, 2598, 150, 150],
                    [4, 1224, 2721, 150, 150],
                    [4, 1377, 2721, 150, 150],
                    [4, 1530, 2721, 150, 150],
                    [4, 1683, 2721, 150, 150],
                    [4, 1836, 2721, 150, 150],
                    [4, 0, 2751, 150, 150],
                    [4, 153, 2751, 150, 150],
                    [4, 306, 2751, 150, 150],
                    [4, 459, 2751, 150, 150],
                    [4, 612, 2751, 150, 150],
                    [4, 765, 2751, 150, 150],
                    [4, 918, 2751, 150, 150],
                    [4, 1071, 2751, 150, 150],
                    [4, 1071, 2751, 150, 150],
                    [4, 1224, 2874, 150, 150],
                    [4, 1377, 2874, 150, 150],
                    [4, 1530, 2874, 150, 150],
                    [4, 1683, 2874, 150, 150],
                    [4, 1836, 2874, 150, 150],
                    [4, 0, 2904,
                        150, 150
                    ],
                    [4, 153, 2904, 150, 150],
                    [4, 306, 2904, 150, 150],
                    [4, 459, 2904, 150, 150],
                    [4, 612, 2904, 150, 150],
                    [4, 765, 2904, 150, 150],
                    [4, 765, 2904, 150, 150],
                    [4, 765, 2904, 150, 150],
                    [4, 918, 2904, 150, 150],
                    [4, 1071, 2904, 150, 150],
                    [4, 1224, 3027, 150, 150],
                    [4, 1377, 3027, 150, 150],
                    [4, 1530, 3027, 150, 150],
                    [4, 1683, 3027, 150, 150],
                    [4, 1836, 3027, 150, 150],
                    [4, 0, 3057, 150, 150],
                    [4, 1530, 2568, 150, 150],
                    [4, 1683, 2568, 150, 150],
                    [4, 1683, 2568, 150, 150],
                    [4, 1836, 2568, 150, 150],
                    [4, 153, 2598, 150, 150],
                    [4, 306, 2598, 150, 150],
                    [4, 153, 3057, 150, 150],
                    [4, 306, 3057, 150, 150],
                    [4,
                        918, 2598, 150, 150
                    ],
                    [4, 459, 3057, 150, 150],
                    [4, 612, 3057, 150, 150],
                    [4, 765, 3057, 150, 150],
                    [4, 918, 3057, 150, 150],
                    [4, 1071, 3057, 150, 150],
                    [4, 1224, 3180, 150, 150],
                    [4, 1224, 3180, 150, 150],
                    [4, 1377, 3180, 150, 150],
                    [4, 1530, 3180, 150, 150],
                    [4, 1683, 3180, 150, 150],
                    [4, 1836, 3180, 150, 150],
                    [4, 0, 3210, 150, 150],
                    [4, 153, 3210, 150, 150],
                    [4, 306, 3210, 150, 150],
                    [4, 0, 3057, 150, 150]
                ]],
                [10, [
                    [4, 1836, 885, 150, 150],
                    [4, 0, 915, 150, 150],
                    [4, 0, 915, 150, 150],
                    [4, 153, 915, 150, 150],
                    [4, 306, 915, 150, 150],
                    [4, 459, 915, 150, 150],
                    [4, 612, 915, 150, 150],
                    [4, 765, 915, 150, 150],
                    [4,
                        918, 915, 150, 150
                    ],
                    [4, 1071, 915, 150, 150],
                    [4, 1224, 1038, 150, 150],
                    [4, 1377, 1038, 150, 150],
                    [4, 1530, 1038, 150, 150],
                    [4, 1683, 1038, 150, 150],
                    [4, 1836, 1038, 150, 150],
                    [4, 0, 1068, 150, 150],
                    [4, 153, 1068, 150, 150],
                    [4, 306, 1068, 150, 150],
                    [4, 459, 1068, 150, 150],
                    [4, 612, 1068, 150, 150],
                    [4, 765, 1068, 150, 150],
                    [4, 918, 1068, 150, 150],
                    [4, 1071, 1068, 150, 150],
                    [4, 1224, 1191, 150, 150],
                    [4, 1377, 1191, 150, 150],
                    [4, 1530, 1191, 150, 150],
                    [4, 1683, 1191, 150, 150],
                    [4, 1836, 1191, 150, 150],
                    [4, 0, 1221, 150, 150],
                    [4, 153, 1221, 150, 150],
                    [4, 306, 1221, 150, 150],
                    [4, 459, 1221, 150,
                        150
                    ],
                    [4, 612, 1221, 150, 150],
                    [4, 765, 1221, 150, 150],
                    [4, 918, 1221, 150, 150],
                    [4, 1071, 1221, 150, 150],
                    [4, 1224, 1344, 150, 150],
                    [4, 1377, 1344, 150, 150],
                    [4, 1530, 1344, 150, 150],
                    [4, 1530, 1344, 150, 150],
                    [4, 1683, 1344, 150, 150],
                    [4, 1836, 1344, 150, 150],
                    [4, 0, 1374, 150, 150],
                    [4, 153, 1374, 150, 150],
                    [4, 306, 1374, 150, 150],
                    [4, 459, 1374, 150, 150],
                    [4, 612, 1374, 150, 150],
                    [4, 765, 1374, 150, 150],
                    [4, 918, 1374, 150, 150],
                    [4, 1071, 1374, 150, 150],
                    [4, 1071, 1374, 150, 150],
                    [4, 1224, 1497, 150, 150],
                    [4, 1377, 1497, 150, 150],
                    [4, 1530, 1497, 150, 150],
                    [4, 1683, 1497, 150, 150],
                    [4,
                        1836, 1497, 150, 150
                    ],
                    [4, 0, 1527, 150, 150],
                    [4, 153, 1527, 150, 150],
                    [4, 306, 1527, 150, 150],
                    [4, 459, 1527, 150, 150],
                    [4, 612, 1527, 150, 150],
                    [4, 765, 1527, 150, 150],
                    [4, 765, 1527, 150, 150],
                    [4, 765, 1527, 150, 150],
                    [4, 918, 1527, 150, 150],
                    [4, 1071, 1527, 150, 150],
                    [4, 1224, 1650, 150, 150],
                    [4, 1377, 1650, 150, 150],
                    [4, 1530, 1650, 150, 150],
                    [4, 1683, 1650, 150, 150],
                    [4, 1836, 1650, 150, 150],
                    [4, 0, 1680, 150, 150],
                    [4, 1836, 885, 150, 150],
                    [4, 0, 915, 150, 150],
                    [4, 153, 915, 150, 150],
                    [4, 153, 1680, 150, 150],
                    [4, 459, 915, 150, 150],
                    [4, 306, 1680, 150, 150],
                    [4, 459, 1680, 150, 150],
                    [4,
                        1836, 1497, 150, 150
                    ],
                    [4, 612, 1680, 150, 150],
                    [4, 765, 1680, 150, 150],
                    [4, 918, 1680, 150, 150],
                    [4, 1071, 1680, 150, 150],
                    [4, 1224, 1803, 150, 150],
                    [4, 1377, 1803, 150, 150],
                    [4, 1530, 1803, 150, 150],
                    [4, 1683, 1803, 150, 150],
                    [4, 1836, 1803, 150, 150],
                    [4, 0, 1833, 150, 150],
                    [4, 153, 1833, 150, 150],
                    [4, 306, 1833, 150, 150],
                    [4, 1530, 1650, 150, 150],
                    [4, 459, 1833, 150, 150],
                    [4, 612, 1833, 150, 150],
                    [4, 0, 1680, 150, 150]
                ]],
                [11, [
                    [5, 1836, 0, 150, 150],
                    [5, 1836, 0, 150, 150],
                    [5, 1836, 0, 150, 150],
                    [5, 153, 153, 150, 150],
                    [5, 306, 153, 150, 150],
                    [5, 306, 153, 150, 150],
                    [5, 459, 153, 150, 150],
                    [5, 459, 153, 150, 150],
                    [5, 612, 153, 150, 150],
                    [5, 765, 153, 150, 150],
                    [5, 918, 153, 150, 150],
                    [5, 1071, 153, 150, 150],
                    [5, 1224, 153, 150, 150],
                    [5, 1377, 153, 150, 150],
                    [5, 1530, 153, 150, 150],
                    [5, 1683, 153, 150, 150],
                    [5, 1836, 153, 150, 150],
                    [5, 0, 183, 150, 150],
                    [5, 153, 306, 150, 150],
                    [5, 306, 306, 150, 150],
                    [5, 459, 306, 150, 150],
                    [5, 612, 306, 150, 150],
                    [5, 765, 306, 150, 150],
                    [5, 765, 306, 150, 150],
                    [5, 1836, 0, 150, 150],
                    [5, 1836, 0, 150, 150],
                    [5, 1836, 0, 150, 150],
                    [5, 153, 153, 150, 150],
                    [5, 306, 153, 150, 150],
                    [5, 918, 306, 150, 150],
                    [5, 459, 153, 150, 150],
                    [5, 1071, 306, 150, 150],
                    [5, 1224, 306, 150, 150],
                    [5, 1377, 306, 150, 150],
                    [5, 1530, 306, 150, 150],
                    [5, 1683, 306, 150, 150],
                    [5, 1836, 306, 150, 150],
                    [5, 1836, 306, 150, 150],
                    [5, 0, 336, 150, 150],
                    [5, 153, 459, 150, 150],
                    [5, 306, 459, 150, 150],
                    [5, 459, 459, 150, 150],
                    [5, 612, 459, 150, 150],
                    [5, 765, 459, 150, 150],
                    [5, 918, 459, 150, 150],
                    [5, 1071, 459, 150, 150],
                    [5, 1224, 459, 150, 150],
                    [5, 1224, 459, 150, 150],
                    [5, 1377, 459, 150, 150],
                    [5, 1377, 459, 150, 150],
                    [5, 1377, 459, 150, 150],
                    [5, 1530, 459, 150, 150],
                    [5, 1683, 459, 150, 150],
                    [5, 1836, 459, 150, 150],
                    [5, 0, 489, 150, 150],
                    [5, 153, 612, 150, 150],
                    [5, 306, 612,
                        150, 150
                    ],
                    [5, 459, 612, 150, 150],
                    [5, 612, 612, 150, 150],
                    [5, 765, 612, 150, 150],
                    [5, 918, 612, 150, 150],
                    [5, 918, 612, 150, 150],
                    [5, 918, 612, 150, 150],
                    [5, 1071, 612, 150, 150],
                    [5, 459, 459, 150, 150],
                    [5, 1224, 612, 150, 150],
                    [5, 1377, 612, 150, 150],
                    [5, 765, 459, 150, 150],
                    [5, 1530, 612, 150, 150],
                    [5, 1683, 612, 150, 150],
                    [5, 1836, 612, 150, 150],
                    [5, 0, 642, 150, 150]
                ]],
                [12, [
                    [5, 459, 1071, 150, 150],
                    [5, 612, 1071, 150, 150],
                    [5, 612, 1071, 150, 150],
                    [5, 765, 1071, 150, 150],
                    [5, 918, 1071, 150, 150],
                    [5, 1071, 1071, 150, 150],
                    [5, 1224, 1071, 150, 150],
                    [5, 1377, 1071, 150, 150],
                    [5, 1530, 1071,
                        150, 150
                    ],
                    [5, 1683, 1071, 150, 150],
                    [5, 1836, 1071, 150, 150],
                    [5, 0, 1101, 150, 150],
                    [5, 153, 1224, 150, 150],
                    [5, 306, 1224, 150, 150],
                    [5, 459, 1224, 150, 150],
                    [5, 612, 1224, 150, 150],
                    [5, 765, 1224, 150, 150],
                    [5, 918, 1224, 150, 150],
                    [5, 1071, 1224, 150, 150],
                    [5, 1224, 1224, 150, 150],
                    [5, 1377, 1224, 150, 150],
                    [5, 1530, 1224, 150, 150],
                    [5, 1683, 1224, 150, 150],
                    [5, 1836, 1224, 150, 150],
                    [5, 459, 1071, 150, 150],
                    [5, 612, 1071, 150, 150],
                    [5, 612, 1071, 150, 150],
                    [5, 0, 1254, 150, 150],
                    [5, 153, 1377, 150, 150],
                    [5, 306, 1377, 150, 150],
                    [5, 459, 1377, 150, 150],
                    [5, 612, 1377, 150, 150],
                    [5, 765,
                        1377, 150, 150
                    ],
                    [5, 918, 1377, 150, 150],
                    [5, 1071, 1377, 150, 150],
                    [5, 1224, 1377, 150, 150],
                    [5, 1377, 1377, 150, 150],
                    [5, 1530, 1377, 150, 150],
                    [5, 1530, 1377, 150, 150],
                    [5, 1683, 1377, 150, 150],
                    [5, 1836, 1377, 150, 150],
                    [5, 0, 1407, 150, 150],
                    [5, 153, 1530, 150, 150],
                    [5, 306, 1530, 150, 150],
                    [5, 459, 1530, 150, 150],
                    [5, 612, 1530, 150, 150],
                    [5, 765, 1530, 150, 150],
                    [5, 918, 1530, 150, 150],
                    [5, 1071, 1530, 150, 150],
                    [5, 1224, 1530, 150, 150],
                    [5, 1377, 1530, 150, 150],
                    [5, 1530, 1530, 150, 150],
                    [5, 1683, 1530, 150, 150],
                    [5, 1836, 1530, 150, 150],
                    [5, 0, 1560, 150, 150],
                    [5, 153, 1683, 150,
                        150
                    ],
                    [5, 306, 1683, 150, 150],
                    [5, 459, 1683, 150, 150],
                    [5, 612, 1683, 150, 150],
                    [5, 765, 1683, 150, 150],
                    [5, 918, 1683, 150, 150],
                    [5, 1071, 1683, 150, 150],
                    [5, 1071, 1683, 150, 150],
                    [5, 1224, 1683, 150, 150],
                    [5, 1377, 1683, 150, 150],
                    [5, 1530, 1683, 150, 150],
                    [5, 1683, 1683, 150, 150],
                    [5, 1836, 1683, 150, 150],
                    [5, 0, 1713, 150, 150],
                    [5, 153, 1836, 150, 150],
                    [5, 306, 1836, 150, 150],
                    [5, 459, 1836, 150, 150]
                ]],
                [0, Vh]
            ])],
            ["move", new Map([
                [1, [
                    [3, 1224, 1135, 75, 75],
                    [3, 1224, 1135, 75, 75],
                    [3, 1224, 1135, 75, 75],
                    [3, 1945, 1187, 75, 75],
                    [3, 1945, 1187, 75, 75],
                    [3, 1945, 1187, 75, 75],
                    [3,
                        1945, 1265, 75, 75
                    ],
                    [3, 1945, 1265, 75, 75],
                    [3, 1945, 1265, 75, 75],
                    [3, 1377, 1273, 75, 75],
                    [3, 1377, 1273, 75, 75],
                    [3, 1377, 1273, 75, 75]
                ]],
                [2, [
                    [4, 78, 3444, 75, 90],
                    [4, 78, 3444, 75, 90],
                    [4, 156, 3444, 75, 90],
                    [4, 234, 3444, 75, 90],
                    [4, 312, 3444, 75, 90],
                    [4, 1029, 3477, 75, 90],
                    [4, 1107, 3477, 75, 90],
                    [4, 1185, 3477, 75, 90],
                    [4, 1263, 3477, 75, 90],
                    [4, 1263, 3477, 75, 90],
                    [4, 1263, 3477, 75, 90],
                    [4, 1263, 3477, 75, 90],
                    [4, 1341, 3477, 75, 90],
                    [4, 1341, 3477, 75, 90],
                    [4, 1419, 3495, 75, 90],
                    [4, 1419, 3495, 75, 90],
                    [4, 1419, 3495, 75, 90]
                ]],
                [3, [
                    [4, 1248, 3570, 75, 90],
                    [4, 1248, 3570, 75, 90],
                    [4, 1326, 3570, 75, 90],
                    [4, 1326, 3570, 75, 90],
                    [4, 1326, 3570, 75, 90],
                    [4, 1326, 3570, 75, 90],
                    [4, 1404, 3588, 75, 90],
                    [4, 1404, 3588, 75, 90],
                    [4, 1404, 3588, 75, 90],
                    [4, 1482, 3588, 75, 90],
                    [4, 1482, 3588, 75, 90],
                    [4, 1482, 3588, 75, 90]
                ]],
                [4, [
                    [4, 1248, 3663, 75, 75],
                    [4, 1248, 3663, 75, 75],
                    [4, 1326, 3663, 75, 75],
                    [4, 1326, 3663, 75, 75],
                    [4, 1326, 3663, 75, 75],
                    [4, 1404, 3681, 75, 75],
                    [4, 1404, 3681, 75, 75],
                    [4, 1404, 3681, 75, 75],
                    [4, 1404, 3681, 75, 75],
                    [4, 1482, 3681, 75, 75],
                    [4, 1482, 3681, 75, 75],
                    [4, 1482, 3681, 75, 75]
                ]],
                [5, [
                    [3, 999, 1444, 75, 75],
                    [3, 999, 1444, 75, 75],
                    [3, 999, 1444,
                        75, 75
                    ],
                    [3, 1383, 1486, 75, 75],
                    [3, 1383, 1486, 75, 75],
                    [3, 1383, 1486, 75, 75],
                    [3, 1461, 1486, 75, 75],
                    [3, 1461, 1486, 75, 75],
                    [3, 1461, 1486, 75, 75],
                    [3, 1539, 1487, 75, 75],
                    [3, 1539, 1487, 75, 75],
                    [3, 1539, 1487, 75, 75]
                ]],
                [6, [
                    [5, 936, 3265, 75, 75],
                    [5, 936, 3265, 75, 75],
                    [5, 936, 3265, 75, 75],
                    [5, 1014, 3265, 75, 75],
                    [5, 1014, 3265, 75, 75],
                    [5, 1014, 3265, 75, 75],
                    [5, 1092, 3265, 75, 75],
                    [5, 1092, 3265, 75, 75],
                    [5, 1092, 3265, 75, 75],
                    [5, 1170, 3265, 75, 75],
                    [5, 1170, 3265, 75, 75],
                    [5, 1248, 3265, 75, 75],
                    [5, 1248, 3265, 75, 75]
                ]],
                [7, [
                    [5, 156, 3421, 75, 75],
                    [5, 156, 3421, 75, 75],
                    [5, 156,
                        3421, 75, 75
                    ],
                    [5, 234, 3421, 75, 75],
                    [5, 234, 3421, 75, 75],
                    [5, 234, 3421, 75, 75],
                    [5, 234, 3421, 75, 75],
                    [5, 312, 3421, 75, 75],
                    [5, 312, 3421, 75, 75],
                    [5, 390, 3421, 75, 75],
                    [5, 390, 3421, 75, 75],
                    [5, 390, 3421, 75, 75],
                    [5, 468, 3421, 75, 75],
                    [5, 468, 3421, 75, 75],
                    [5, 468, 3421, 75, 75]
                ]],
                [8, [
                    [5, 1482, 3465, 75, 75],
                    [5, 1482, 3465, 75, 75],
                    [5, 1560, 3469, 75, 75],
                    [5, 1560, 3469, 75, 75],
                    [5, 1638, 3469, 75, 75],
                    [5, 1638, 3469, 75, 75],
                    [5, 1638, 3469, 75, 75],
                    [5, 1638, 3469, 75, 75],
                    [5, 1716, 3469, 75, 75],
                    [5, 1794, 3469, 75, 75],
                    [5, 1794, 3469, 75, 75],
                    [5, 1794, 3469, 75, 75]
                ]],
                [9, [
                    [4, 612, 2139,
                        150, 150
                    ],
                    [4, 612, 2139, 150, 150],
                    [4, 612, 2139, 150, 150],
                    [4, 765, 2139, 150, 150],
                    [4, 765, 2139, 150, 150],
                    [4, 765, 2139, 150, 150],
                    [4, 918, 2139, 150, 150],
                    [4, 918, 2139, 150, 150],
                    [4, 918, 2139, 150, 150],
                    [4, 1071, 2139, 150, 150],
                    [4, 1071, 2139, 150, 150],
                    [4, 1071, 2139, 150, 150]
                ]],
                [10, [
                    [4, 765, 1833, 150, 150],
                    [4, 765, 1833, 150, 150],
                    [4, 765, 1833, 150, 150],
                    [4, 918, 1833, 150, 150],
                    [4, 918, 1833, 150, 150],
                    [4, 918, 1833, 150, 150],
                    [4, 1071, 1833, 150, 150],
                    [4, 1071, 1833, 150, 150],
                    [4, 1071, 1833, 150, 150],
                    [4, 1224, 1956, 150, 150],
                    [4, 1224, 1956, 150, 150],
                    [4, 1224, 1956, 150,
                        150
                    ]
                ]],
                [11, [
                    [5, 153, 765, 150, 150],
                    [5, 153, 765, 150, 150],
                    [5, 153, 765, 150, 150],
                    [5, 306, 765, 150, 150],
                    [5, 306, 765, 150, 150],
                    [5, 306, 765, 150, 150],
                    [5, 459, 765, 150, 150],
                    [5, 459, 765, 150, 150],
                    [5, 459, 765, 150, 150],
                    [5, 612, 765, 150, 150],
                    [5, 612, 765, 150, 150],
                    [5, 612, 765, 150, 150]
                ]],
                [12, [
                    [5, 612, 1836, 150, 150],
                    [5, 612, 1836, 150, 150],
                    [5, 612, 1836, 150, 150],
                    [5, 765, 1836, 150, 150],
                    [5, 765, 1836, 150, 150],
                    [5, 765, 1836, 150, 150],
                    [5, 918, 1836, 150, 150],
                    [5, 918, 1836, 150, 150],
                    [5, 918, 1836, 150, 150],
                    [5, 1071, 1836, 150, 150],
                    [5, 1071, 1836, 150, 150],
                    [5, 1071, 1836,
                        150, 150
                    ]
                ]],
                [0, Vh]
            ])],
            ["happy", new Map([
                [1, [
                    [3, 1924, 220, 75, 75],
                    [3, 1924, 220, 75, 75],
                    [3, 1924, 298, 75, 75],
                    [3, 1924, 298, 75, 75],
                    [3, 1924, 376, 75, 75],
                    [3, 1924, 376, 75, 75],
                    [3, 1924, 454, 75, 75],
                    [3, 1924, 454, 75, 75],
                    [3, 1924, 532, 75, 75],
                    [3, 1924, 532, 75, 75],
                    [3, 1924, 610, 75, 75],
                    [3, 1969, 797, 75, 75],
                    [3, 1969, 797, 75, 75],
                    [3, 1027, 821, 75, 75],
                    [3, 1027, 821, 75, 75],
                    [3, 306, 874, 75, 75],
                    [3, 306, 874, 75, 75],
                    [3, 1969, 875, 75, 75],
                    [3, 1969, 875, 75, 75],
                    [3, 1969, 875, 75, 75],
                    [3, 1027, 899, 75, 75],
                    [3, 1027, 899, 75, 75],
                    [3, 1027, 899, 75, 75],
                    [3, 1027, 899, 75, 75],
                    [3, 1914,
                        953, 75, 75
                    ],
                    [3, 1914, 953, 75, 75],
                    [3, 1914, 953, 75, 75],
                    [3, 1914, 953, 75, 75],
                    [3, 765, 980, 75, 75],
                    [3, 765, 980, 75, 75],
                    [3, 1333, 982, 75, 75],
                    [3, 1914, 1031, 75, 75],
                    [3, 1914, 1031, 75, 75],
                    [3, 1914, 1109, 75, 75],
                    [3, 1914, 1109, 75, 75],
                    [3, 1486, 1120, 75, 75],
                    [3, 1486, 1120, 75, 75]
                ]],
                [2, [
                    [4, 1734, 3414, 75, 90],
                    [4, 1734, 3414, 75, 90],
                    [4, 1812, 3414, 75, 90],
                    [4, 1812, 3414, 75, 90],
                    [4, 1812, 3414, 75, 90],
                    [4, 1890, 3414, 75, 90],
                    [4, 1890, 3414, 75, 90],
                    [4, 1890, 3414, 75, 90],
                    [4, 1890, 3414, 75, 90],
                    [4, 1890, 3414, 75, 90],
                    [4, 1890, 3414, 75, 90],
                    [4, 1890, 3414, 75, 90],
                    [4, 1968, 3414,
                        75, 90
                    ],
                    [4, 1968, 3414, 75, 90],
                    [4, 405, 3435, 75, 90],
                    [4, 483, 3435, 75, 90],
                    [4, 483, 3435, 75, 90],
                    [4, 561, 3435, 75, 90],
                    [4, 561, 3435, 75, 90],
                    [4, 561, 3435, 75, 90],
                    [4, 561, 3435, 75, 90],
                    [4, 561, 3435, 75, 90],
                    [4, 561, 3435, 75, 90],
                    [4, 561, 3435, 75, 90],
                    [4, 561, 3435, 75, 90],
                    [4, 561, 3435, 75, 90],
                    [4, 639, 3435, 75, 90],
                    [4, 639, 3435, 75, 90],
                    [4, 717, 3435, 75, 90],
                    [4, 717, 3435, 75, 90],
                    [4, 717, 3435, 75, 90],
                    [4, 795, 3435, 75, 90],
                    [4, 561, 3435, 75, 90],
                    [4, 561, 3435, 75, 90],
                    [4, 561, 3435, 75, 90],
                    [4, 561, 3435, 75, 90],
                    [4, 561, 3435, 75, 90],
                    [4, 873, 3435, 75, 90],
                    [4, 873, 3435, 75, 90],
                    [4, 951, 3435, 75, 90],
                    [4, 951, 3435, 75, 90],
                    [4, 0, 3444, 75, 90],
                    [4, 0, 3444, 75, 90]
                ]],
                [3, [
                    [4, 780, 3528, 75, 90],
                    [4, 780, 3528, 75, 90],
                    [4, 858, 3528, 75, 90],
                    [4, 858, 3528, 75, 90],
                    [4, 936, 3528, 75, 90],
                    [4, 936, 3528, 75, 90],
                    [4, 0, 3537, 75, 90],
                    [4, 0, 3537, 75, 90],
                    [4, 78, 3537, 75, 90],
                    [4, 78, 3537, 75, 90],
                    [4, 156, 3537, 75, 90],
                    [4, 156, 3537, 75, 90],
                    [4, 234, 3537, 75, 90],
                    [4, 234, 3537, 75, 90],
                    [4, 234, 3537, 75, 90],
                    [4, 234, 3537, 75, 90],
                    [4, 312, 3537, 75, 90],
                    [4, 312, 3537, 75, 90],
                    [4, 312, 3537, 75, 90],
                    [4, 312, 3537, 75, 90],
                    [4, 312, 3537, 75, 90],
                    [4, 312, 3537, 75, 90],
                    [4, 312, 3537,
                        75, 90
                    ],
                    [4, 312, 3537, 75, 90],
                    [4, 312, 3537, 75, 90],
                    [4, 1014, 3570, 75, 90],
                    [4, 1092, 3570, 75, 90],
                    [4, 1092, 3570, 75, 90],
                    [4, 1170, 3570, 75, 90],
                    [4, 1170, 3570, 75, 90]
                ]],
                [4, [
                    [4, 546, 3621, 75, 75],
                    [4, 546, 3621, 75, 75],
                    [4, 624, 3621, 75, 75],
                    [4, 624, 3621, 75, 75],
                    [4, 702, 3621, 75, 75],
                    [4, 702, 3621, 75, 75],
                    [4, 780, 3621, 75, 75],
                    [4, 780, 3621, 75, 75],
                    [4, 858, 3621, 75, 75],
                    [4, 936, 3621, 75, 75],
                    [4, 0, 3630, 75, 75],
                    [4, 0, 3630, 75, 75],
                    [4, 78, 3630, 75, 75],
                    [4, 78, 3630, 75, 75],
                    [4, 78, 3630, 75, 75],
                    [4, 78, 3630, 75, 75],
                    [4, 156, 3630, 75, 75],
                    [4, 156, 3630, 75, 75],
                    [4, 156, 3630, 75, 75],
                    [4, 156, 3630, 75, 75],
                    [4, 156, 3630, 75, 75],
                    [4, 156, 3630, 75, 75],
                    [4, 156, 3630, 75, 75],
                    [4, 234, 3630, 75, 75],
                    [4, 234, 3630, 75, 75],
                    [4, 234, 3630, 75, 75],
                    [4, 234, 3630, 75, 75],
                    [4, 312, 3630, 75, 75],
                    [4, 312, 3630, 75, 75],
                    [4, 1014, 3663, 75, 75],
                    [4, 1092, 3663, 75, 75],
                    [4, 1170, 3663, 75, 75],
                    [4, 1170, 3663, 75, 75]
                ]],
                [5, [
                    [3, 1923, 1421, 75, 75],
                    [3, 1923, 1421, 75, 75],
                    [3, 1149, 1426, 75, 75],
                    [3, 1149, 1426, 75, 75],
                    [3, 1227, 1426, 75, 75],
                    [3, 1227, 1426, 75, 75],
                    [3, 1305, 1429, 75, 75],
                    [3, 765, 1433, 75, 75],
                    [3, 765, 1433, 75, 75],
                    [3, 765, 1433, 75, 75],
                    [3, 765, 1433, 75, 75],
                    [3, 765, 1433,
                        75, 75
                    ],
                    [3, 765, 1433, 75, 75],
                    [3, 234, 1439, 75, 75],
                    [3, 234, 1439, 75, 75],
                    [3, 312, 1439, 75, 75],
                    [3, 312, 1439, 75, 75],
                    [3, 390, 1439, 75, 75],
                    [3, 390, 1439, 75, 75],
                    [3, 468, 1439, 75, 75],
                    [3, 468, 1439, 75, 75],
                    [3, 468, 1439, 75, 75],
                    [3, 468, 1439, 75, 75],
                    [3, 468, 1439, 75, 75],
                    [3, 468, 1439, 75, 75],
                    [3, 468, 1439, 75, 75],
                    [3, 468, 1439, 75, 75],
                    [3, 468, 1439, 75, 75],
                    [3, 468, 1439, 75, 75],
                    [3, 468, 1439, 75, 75],
                    [3, 468, 1439, 75, 75],
                    [3, 546, 1439, 75, 75],
                    [3, 546, 1439, 75, 75],
                    [3, 624, 1439, 75, 75],
                    [3, 624, 1439, 75, 75],
                    [3, 843, 1441, 75, 75],
                    [3, 843, 1441, 75, 75],
                    [3, 921, 1441, 75, 75],
                    [3, 921, 1441, 75, 75]
                ]],
                [6, [
                    [5, 0, 3263, 75, 75],
                    [5, 0, 3263, 75, 75],
                    [5, 78, 3265, 75, 75],
                    [5, 78, 3265, 75, 75],
                    [5, 156, 3265, 75, 75],
                    [5, 156, 3265, 75, 75],
                    [5, 234, 3265, 75, 75],
                    [5, 234, 3265, 75, 75],
                    [5, 312, 3265, 75, 75],
                    [5, 312, 3265, 75, 75],
                    [5, 390, 3265, 75, 75],
                    [5, 390, 3265, 75, 75],
                    [5, 468, 3265, 75, 75],
                    [5, 468, 3265, 75, 75],
                    [5, 468, 3265, 75, 75],
                    [5, 546, 3265, 75, 75],
                    [5, 546, 3265, 75, 75],
                    [5, 546, 3265, 75, 75],
                    [5, 546, 3265, 75, 75],
                    [5, 546, 3265, 75, 75],
                    [5, 546, 3265, 75, 75],
                    [5, 546, 3265, 75, 75],
                    [5, 546, 3265, 75, 75],
                    [5, 546, 3265, 75, 75],
                    [5, 546, 3265, 75, 75],
                    [5, 624,
                        3265, 75, 75
                    ],
                    [5, 624, 3265, 75, 75],
                    [5, 702, 3265, 75, 75],
                    [5, 702, 3265, 75, 75],
                    [5, 780, 3265, 75, 75],
                    [5, 780, 3265, 75, 75],
                    [5, 858, 3265, 75, 75]
                ]],
                [7, [
                    [5, 78, 3343, 75, 75],
                    [5, 78, 3343, 75, 75],
                    [5, 156, 3343, 75, 75],
                    [5, 156, 3343, 75, 75],
                    [5, 234, 3343, 75, 75],
                    [5, 312, 3343, 75, 75],
                    [5, 390, 3343, 75, 75],
                    [5, 468, 3343, 75, 75],
                    [5, 546, 3343, 75, 75],
                    [5, 624, 3343, 75, 75],
                    [5, 702, 3343, 75, 75],
                    [5, 780, 3343, 75, 75],
                    [5, 858, 3343, 75, 75],
                    [5, 936, 3343, 75, 75],
                    [5, 1014, 3343, 75, 75],
                    [5, 1092, 3343, 75, 75],
                    [5, 1170, 3343, 75, 75],
                    [5, 1248, 3343, 75, 75],
                    [5, 1872, 3350, 75, 75],
                    [5, 1950,
                        3350, 75, 75
                    ],
                    [5, 1950, 3350, 75, 75],
                    [5, 1326, 3352, 75, 75],
                    [5, 1404, 3352, 75, 75],
                    [5, 1482, 3387, 75, 75],
                    [5, 1560, 3391, 75, 75],
                    [5, 1560, 3391, 75, 75],
                    [5, 1638, 3391, 75, 75],
                    [5, 1638, 3391, 75, 75],
                    [5, 1638, 3391, 75, 75],
                    [5, 1716, 3391, 75, 75],
                    [5, 1716, 3391, 75, 75],
                    [5, 1716, 3391, 75, 75],
                    [5, 1716, 3391, 75, 75],
                    [5, 1794, 3391, 75, 75],
                    [5, 1794, 3391, 75, 75],
                    [5, 0, 3419, 75, 75],
                    [5, 0, 3419, 75, 75],
                    [5, 0, 3419, 75, 75],
                    [5, 78, 3421, 75, 75],
                    [5, 78, 3421, 75, 75]
                ]],
                [8, [
                    [5, 936, 3421, 75, 75],
                    [5, 936, 3421, 75, 75],
                    [5, 1014, 3421, 75, 75],
                    [5, 1014, 3421, 75, 75],
                    [5, 1092, 3421, 75, 75],
                    [5, 1092, 3421, 75, 75],
                    [5, 1170, 3421, 75, 75],
                    [5, 1170, 3421, 75, 75],
                    [5, 1248, 3421, 75, 75],
                    [5, 1248, 3421, 75, 75],
                    [5, 1248, 3421, 75, 75],
                    [5, 1092, 3421, 75, 75],
                    [5, 1092, 3421, 75, 75],
                    [5, 1170, 3421, 75, 75],
                    [5, 1170, 3421, 75, 75],
                    [5, 1248, 3421, 75, 75],
                    [5, 1248, 3421, 75, 75],
                    [5, 1248, 3421, 75, 75],
                    [5, 1092, 3421, 75, 75],
                    [5, 1092, 3421, 75, 75],
                    [5, 1170, 3421, 75, 75],
                    [5, 1170, 3421, 75, 75],
                    [5, 1248, 3421, 75, 75],
                    [5, 1248, 3421, 75, 75],
                    [5, 1248, 3421, 75, 75],
                    [5, 1092, 3421, 75, 75],
                    [5, 1092, 3421, 75, 75],
                    [5, 1872, 3428, 75, 75],
                    [5, 1872, 3428, 75, 75],
                    [5, 1950, 3428, 75, 75],
                    [5,
                        1950, 3428, 75, 75
                    ],
                    [5, 1326, 3430, 75, 75],
                    [5, 1326, 3430, 75, 75],
                    [5, 1404, 3430, 75, 75],
                    [5, 1404, 3430, 75, 75]
                ]],
                [9, [
                    [4, 918, 1986, 150, 150],
                    [4, 918, 1986, 150, 150],
                    [4, 1071, 1986, 150, 150],
                    [4, 1071, 1986, 150, 150],
                    [4, 1224, 2109, 150, 150],
                    [4, 1224, 2109, 150, 150],
                    [4, 1377, 2109, 150, 150],
                    [4, 1377, 2109, 150, 150],
                    [4, 1377, 2109, 150, 150],
                    [4, 1377, 2109, 150, 150],
                    [4, 1530, 2109, 150, 150],
                    [4, 1530, 2109, 150, 150],
                    [4, 1683, 2109, 150, 150],
                    [4, 1683, 2109, 150, 150],
                    [4, 1836, 2109, 150, 150],
                    [4, 1836, 2109, 150, 150],
                    [4, 0, 2139, 150, 150],
                    [4, 0, 2139, 150, 150],
                    [4, 153, 2139,
                        150, 150
                    ],
                    [4, 153, 2139, 150, 150],
                    [4, 153, 2139, 150, 150],
                    [4, 153, 2139, 150, 150],
                    [4, 153, 2139, 150, 150],
                    [4, 153, 2139, 150, 150],
                    [4, 153, 2139, 150, 150],
                    [4, 153, 2139, 150, 150],
                    [4, 153, 2139, 150, 150],
                    [4, 153, 2139, 150, 150],
                    [4, 153, 2139, 150, 150],
                    [4, 153, 2139, 150, 150],
                    [4, 153, 2139, 150, 150],
                    [4, 306, 2139, 150, 150],
                    [4, 306, 2139, 150, 150],
                    [4, 459, 2139, 150, 150],
                    [4, 459, 2139, 150, 150],
                    [4, 918, 1986, 150, 150],
                    [4, 918, 1986, 150, 150]
                ]],
                [10, [
                    [4, 1224, 732, 150, 150],
                    [4, 1224, 732, 150, 150],
                    [4, 1377, 732, 150, 150],
                    [4, 1377, 732, 150, 150],
                    [4, 1530, 732, 150, 150],
                    [4,
                        1530, 732, 150, 150
                    ],
                    [4, 1683, 732, 150, 150],
                    [4, 1683, 732, 150, 150],
                    [4, 1836, 732, 150, 150],
                    [4, 1836, 732, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1224, 885, 150, 150],
                    [4, 1377, 885, 150, 150],
                    [4, 1377, 885, 150, 150],
                    [4, 1530, 885, 150, 150],
                    [4, 1530, 885, 150, 150],
                    [4, 1683, 885, 150, 150],
                    [4, 1683, 885, 150, 150],
                    [4, 1224, 732, 150, 150],
                    [4, 1224, 732, 150, 150]
                ]],
                [11, [
                    [5, 153, 0, 150, 150],
                    [5, 153, 0, 150, 150],
                    [5, 306, 0, 150, 150],
                    [5, 459, 0, 150, 150],
                    [5, 612, 0, 150, 150],
                    [5, 612, 0, 150, 150],
                    [5, 765, 0, 150, 150],
                    [5, 918, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150,
                        150
                    ],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1071, 0, 150, 150],
                    [5, 1224, 0, 150, 150],
                    [5, 1224, 0, 150, 150],
                    [5, 1377, 0, 150, 150],
                    [5, 1377, 0, 150, 150],
                    [5, 1530, 0, 150, 150],
                    [5, 1683, 0, 150, 150],
                    [5, 1683, 0, 150, 150]
                ]],
                [12, [
                    [5, 153, 918, 150, 150],
                    [5, 153, 918, 150, 150],
                    [5, 306, 918, 150, 150],
                    [5, 306, 918, 150, 150],
                    [5, 306, 918, 150, 150],
                    [5, 459, 918, 150, 150],
                    [5, 459, 918,
                        150, 150
                    ],
                    [5, 459, 918, 150, 150],
                    [5, 612, 918, 150, 150],
                    [5, 765, 918, 150, 150],
                    [5, 918, 918, 150, 150],
                    [5, 918, 918, 150, 150],
                    [5, 1071, 918, 150, 150],
                    [5, 1224, 918, 150, 150],
                    [5, 1224, 918, 150, 150],
                    [5, 1224, 918, 150, 150],
                    [5, 1224, 918, 150, 150],
                    [5, 1377, 918, 150, 150],
                    [5, 1377, 918, 150, 150],
                    [5, 1377, 918, 150, 150],
                    [5, 1377, 918, 150, 150],
                    [5, 1377, 918, 150, 150],
                    [5, 1377, 918, 150, 150],
                    [5, 1377, 918, 150, 150],
                    [5, 1377, 918, 150, 150],
                    [5, 1530, 918, 150, 150],
                    [5, 1530, 918, 150, 150],
                    [5, 1683, 918, 150, 150],
                    [5, 1836, 918, 150, 150],
                    [5, 1836, 918, 150, 150],
                    [5, 0, 948, 150, 150],
                    [5, 0, 948, 150, 150],
                    [5, 153, 1071, 150, 150],
                    [5, 306, 1071, 150, 150],
                    [5, 306, 1071, 150, 150],
                    [5, 153, 918, 150, 150],
                    [5, 153, 918, 150, 150]
                ]],
                [0, Vh]
            ])],
            ["sad", new Map([
                [1, [
                    [3, 1071, 1288, 75, 75],
                    [3, 1071, 1288, 75, 75],
                    [3, 1071, 1288, 75, 75],
                    [3, 1071, 1288, 75, 75],
                    [3, 0, 1333, 75, 75],
                    [3, 0, 1333, 75, 75],
                    [3, 78, 1333, 75, 75],
                    [3, 156, 1333, 75, 75],
                    [3, 156, 1333, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1945, 1343, 75, 75],
                    [3, 1377, 1351, 75, 75],
                    [3, 1377, 1351, 75, 75],
                    [3, 1071, 1366, 75, 75],
                    [3, 1071, 1366, 75, 75],
                    [3, 1455, 1408, 75, 75],
                    [3, 1533, 1408, 75, 75],
                    [3, 1533, 1408, 75, 75],
                    [3, 1533, 1408, 75, 75],
                    [3, 1071, 1288, 75, 75]
                ]],
                [2, [
                    [4, 1497, 3495, 75, 90],
                    [4, 1497, 3495, 75, 90],
                    [4, 1575, 3495, 75, 90],
                    [4, 1575, 3495, 75, 90],
                    [4, 1653, 3495, 75, 90],
                    [4, 1731, 3507, 75, 90],
                    [4, 1809, 3507, 75, 90],
                    [4, 1887, 3507, 75,
                        90
                    ],
                    [4, 1965, 3507, 75, 90],
                    [4, 390, 3528, 75, 90],
                    [4, 390, 3528, 75, 90],
                    [4, 1965, 3507, 75, 90],
                    [4, 1965, 3507, 75, 90],
                    [4, 468, 3528, 75, 90],
                    [4, 468, 3528, 75, 90],
                    [4, 1965, 3507, 75, 90],
                    [4, 1965, 3507, 75, 90],
                    [4, 468, 3528, 75, 90],
                    [4, 468, 3528, 75, 90],
                    [4, 1965, 3507, 75, 90],
                    [4, 1965, 3507, 75, 90],
                    [4, 468, 3528, 75, 90],
                    [4, 468, 3528, 75, 90],
                    [4, 1965, 3507, 75, 90],
                    [4, 1965, 3507, 75, 90],
                    [4, 468, 3528, 75, 90],
                    [4, 468, 3528, 75, 90],
                    [4, 1965, 3507, 75, 90],
                    [4, 1965, 3507, 75, 90],
                    [4, 468, 3528, 75, 90],
                    [4, 468, 3528, 75, 90],
                    [4, 1965, 3507, 75, 90],
                    [4, 1965, 3507, 75, 90],
                    [4, 468, 3528,
                        75, 90
                    ],
                    [4, 468, 3528, 75, 90],
                    [4, 1965, 3507, 75, 90],
                    [4, 546, 3528, 75, 90],
                    [4, 624, 3528, 75, 90],
                    [4, 624, 3528, 75, 90],
                    [4, 1497, 3495, 75, 90],
                    [4, 1497, 3495, 75, 90],
                    [4, 702, 3528, 75, 90],
                    [4, 702, 3528, 75, 90]
                ]],
                [3, [
                    [4, 1560, 3588, 75, 90],
                    [4, 1560, 3588, 75, 90],
                    [4, 1638, 3588, 75, 90],
                    [4, 1638, 3588, 75, 90],
                    [4, 1716, 3600, 75, 90],
                    [4, 1716, 3600, 75, 90],
                    [4, 1794, 3600, 75, 90],
                    [4, 1872, 3600, 75, 90],
                    [4, 1872, 3600, 75, 90],
                    [4, 1950, 3600, 75, 90],
                    [4, 1950, 3600, 75, 90],
                    [4, 1950, 3600, 75, 90],
                    [4, 1950, 3600, 75, 90],
                    [4, 1950, 3600, 75, 90],
                    [4, 1950, 3600, 75, 90],
                    [4, 1950, 3600, 75,
                        90
                    ],
                    [4, 1950, 3600, 75, 90],
                    [4, 1950, 3600, 75, 90],
                    [4, 1950, 3600, 75, 90],
                    [4, 1950, 3600, 75, 90],
                    [4, 1950, 3600, 75, 90],
                    [4, 1950, 3600, 75, 90],
                    [4, 1950, 3600, 75, 90],
                    [4, 1950, 3600, 75, 90],
                    [4, 390, 3621, 75, 90],
                    [4, 390, 3621, 75, 90],
                    [4, 468, 3621, 75, 90],
                    [4, 468, 3621, 75, 90]
                ]],
                [4, [
                    [4, 1560, 3681, 75, 75],
                    [4, 1638, 3681, 75, 75],
                    [4, 1638, 3681, 75, 75],
                    [4, 1716, 3693, 75, 75],
                    [4, 1716, 3693, 75, 75],
                    [4, 1794, 3693, 75, 75],
                    [4, 1794, 3693, 75, 75],
                    [4, 1872, 3693, 75, 75],
                    [4, 1872, 3693, 75, 75],
                    [4, 1872, 3693, 75, 75],
                    [4, 1950, 3693, 75, 75],
                    [4, 1950, 3693, 75, 75],
                    [4, 546, 3699, 75,
                        75
                    ],
                    [4, 546, 3699, 75, 75],
                    [4, 624, 3699, 75, 75],
                    [4, 624, 3699, 75, 75],
                    [4, 702, 3699, 75, 75],
                    [4, 702, 3699, 75, 75],
                    [4, 702, 3699, 75, 75],
                    [4, 702, 3699, 75, 75],
                    [4, 702, 3699, 75, 75],
                    [4, 702, 3699, 75, 75],
                    [4, 702, 3699, 75, 75],
                    [4, 780, 3699, 75, 75],
                    [4, 780, 3699, 75, 75],
                    [4, 858, 3699, 75, 75],
                    [4, 858, 3699, 75, 75],
                    [4, 936, 3699, 75, 75],
                    [4, 936, 3699, 75, 75],
                    [4, 0, 3708, 75, 75],
                    [4, 0, 3708, 75, 75],
                    [4, 78, 3708, 75, 75],
                    [4, 78, 3708, 75, 75],
                    [4, 156, 3708, 75, 75]
                ]],
                [5, [
                    [3, 1617, 1487, 75, 75],
                    [3, 1617, 1487, 75, 75],
                    [3, 1695, 1487, 75, 75],
                    [3, 1773, 1487, 75, 75],
                    [3, 0, 1489, 75, 75],
                    [3,
                        78, 1489, 75, 75
                    ],
                    [3, 1773, 1487, 75, 75],
                    [3, 0, 1489, 75, 75],
                    [3, 78, 1489, 75, 75],
                    [3, 1773, 1487, 75, 75],
                    [3, 0, 1489, 75, 75],
                    [3, 78, 1489, 75, 75],
                    [3, 1773, 1487, 75, 75],
                    [3, 0, 1489, 75, 75],
                    [3, 78, 1489, 75, 75],
                    [3, 1773, 1487, 75, 75],
                    [3, 0, 1489, 75, 75],
                    [3, 78, 1489, 75, 75],
                    [3, 1773, 1487, 75, 75],
                    [3, 0, 1489, 75, 75],
                    [3, 156, 1489, 75, 75],
                    [3, 156, 1489, 75, 75],
                    [3, 1851, 1499, 75, 75],
                    [3, 1851, 1499, 75, 75]
                ]],
                [6, [
                    [5, 1931, 3272, 75, 75],
                    [5, 1931, 3272, 75, 75],
                    [5, 1326, 3274, 75, 75],
                    [5, 1326, 3274, 75, 75],
                    [5, 1404, 3274, 75, 75],
                    [5, 1404, 3274, 75, 75],
                    [5, 1482, 3309, 75, 75],
                    [5, 1482,
                        3309, 75, 75
                    ],
                    [5, 1560, 3313, 75, 75],
                    [5, 1560, 3313, 75, 75],
                    [5, 1482, 3309, 75, 75],
                    [5, 1482, 3309, 75, 75],
                    [5, 1560, 3313, 75, 75],
                    [5, 1560, 3313, 75, 75],
                    [5, 1482, 3309, 75, 75],
                    [5, 1482, 3309, 75, 75],
                    [5, 1560, 3313, 75, 75],
                    [5, 1638, 3313, 75, 75],
                    [5, 1716, 3313, 75, 75],
                    [5, 1794, 3313, 75, 75],
                    [5, 1794, 3313, 75, 75],
                    [5, 0, 3341, 75, 75],
                    [5, 0, 3341, 75, 75]
                ]],
                [7, [
                    [5, 78, 3343, 75, 75],
                    [5, 78, 3343, 75, 75],
                    [5, 546, 3421, 75, 75],
                    [5, 546, 3421, 75, 75],
                    [5, 624, 3421, 75, 75],
                    [5, 702, 3421, 75, 75],
                    [5, 702, 3421, 75, 75],
                    [5, 780, 3421, 75, 75],
                    [5, 780, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5,
                        858, 3421, 75, 75
                    ],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 858, 3421, 75, 75],
                    [5, 0, 3419, 75, 75],
                    [5, 0, 3419, 75,
                        75
                    ],
                    [5, 0, 3419, 75, 75],
                    [5, 78, 3421, 75, 75],
                    [5, 78, 3421, 75, 75]
                ]],
                [8, [
                    [5, 0, 3497, 75, 75],
                    [5, 0, 3497, 75, 75],
                    [5, 1014, 3421, 75, 75],
                    [5, 1014, 3421, 75, 75],
                    [5, 78, 3499, 75, 75],
                    [5, 78, 3499, 75, 75],
                    [5, 156, 3499, 75, 75],
                    [5, 156, 3499, 75, 75],
                    [5, 234, 3499, 75, 75],
                    [5, 234, 3499, 75, 75],
                    [5, 234, 3499, 75, 75],
                    [5, 78, 3499, 75, 75],
                    [5, 78, 3499, 75, 75],
                    [5, 156, 3499, 75, 75],
                    [5, 156, 3499, 75, 75],
                    [5, 234, 3499, 75, 75],
                    [5, 234, 3499, 75, 75],
                    [5, 234, 3499, 75, 75],
                    [5, 78, 3499, 75, 75],
                    [5, 78, 3499, 75, 75],
                    [5, 156, 3499, 75, 75],
                    [5, 156, 3499, 75, 75],
                    [5, 234, 3499, 75, 75],
                    [5, 234, 3499,
                        75, 75
                    ],
                    [5, 234, 3499, 75, 75],
                    [5, 78, 3499, 75, 75],
                    [5, 78, 3499, 75, 75],
                    [5, 312, 3499, 75, 75],
                    [5, 312, 3499, 75, 75],
                    [5, 1950, 3428, 75, 75],
                    [5, 1950, 3428, 75, 75],
                    [5, 1326, 3430, 75, 75],
                    [5, 1326, 3430, 75, 75],
                    [5, 1404, 3430, 75, 75],
                    [5, 1404, 3430, 75, 75]
                ]],
                [9, [
                    [4, 1224, 2262, 150, 150],
                    [4, 1224, 2262, 150, 150],
                    [4, 1377, 2262, 150, 150],
                    [4, 1377, 2262, 150, 150],
                    [4, 1530, 2262, 150, 150],
                    [4, 1530, 2262, 150, 150],
                    [4, 1683, 2262, 150, 150],
                    [4, 1836, 2262, 150, 150],
                    [4, 0, 2292, 150, 150],
                    [4, 0, 2292, 150, 150],
                    [4, 0, 2292, 150, 150],
                    [4, 0, 2292, 150, 150],
                    [4, 0, 2292, 150, 150],
                    [4, 0,
                        2292, 150, 150
                    ],
                    [4, 0, 2292, 150, 150],
                    [4, 0, 2292, 150, 150],
                    [4, 153, 2292, 150, 150],
                    [4, 153, 2292, 150, 150],
                    [4, 153, 2292, 150, 150],
                    [4, 306, 2292, 150, 150],
                    [4, 459, 2292, 150, 150],
                    [4, 459, 2292, 150, 150],
                    [4, 612, 2292, 150, 150],
                    [4, 765, 2292, 150, 150],
                    [4, 765, 2292, 150, 150],
                    [4, 765, 2292, 150, 150],
                    [4, 765, 2292, 150, 150],
                    [4, 765, 2292, 150, 150],
                    [4, 765, 2292, 150, 150],
                    [4, 765, 2292, 150, 150],
                    [4, 765, 2292, 150, 150],
                    [4, 765, 2292, 150, 150],
                    [4, 765, 2292, 150, 150],
                    [4, 918, 2292, 150, 150],
                    [4, 1071, 2292, 150, 150]
                ]],
                [10, [
                    [4, 1377, 1956, 150, 150],
                    [4, 1377, 1956, 150, 150],
                    [4, 1530, 1956, 150, 150],
                    [4, 1530, 1956, 150, 150],
                    [4, 1530, 1956, 150, 150],
                    [4, 1530, 1956, 150, 150],
                    [4, 1683, 1956, 150, 150],
                    [4, 1683, 1956, 150, 150],
                    [4, 1683, 1956, 150, 150],
                    [4, 1683, 1956, 150, 150],
                    [4, 1836, 1956, 150, 150],
                    [4, 0, 1986, 150, 150],
                    [4, 0, 1986, 150, 150],
                    [4, 153, 1986, 150, 150],
                    [4, 153, 1986, 150, 150],
                    [4, 153, 1986, 150, 150],
                    [4, 153, 1986, 150, 150],
                    [4, 153, 1986, 150, 150],
                    [4, 153, 1986, 150, 150],
                    [4, 153, 1986, 150, 150],
                    [4, 153, 1986, 150, 150],
                    [4, 153, 1986, 150, 150],
                    [4, 153, 1986, 150, 150],
                    [4, 153, 1986, 150, 150],
                    [4, 153, 1986, 150, 150],
                    [4, 153, 1986, 150,
                        150
                    ],
                    [4, 153, 1986, 150, 150],
                    [4, 306, 1986, 150, 150],
                    [4, 306, 1986, 150, 150],
                    [4, 459, 1986, 150, 150],
                    [4, 459, 1986, 150, 150],
                    [4, 612, 1986, 150, 150],
                    [4, 612, 1986, 150, 150],
                    [4, 765, 1986, 150, 150],
                    [4, 765, 1986, 150, 150]
                ]],
                [11, [
                    [5, 765, 765, 150, 150],
                    [5, 765, 765, 150, 150],
                    [5, 918, 765, 150, 150],
                    [5, 1071, 765, 150, 150],
                    [5, 1071, 765, 150, 150],
                    [5, 1224, 765, 150, 150],
                    [5, 1377, 765, 150, 150],
                    [5, 1377, 765, 150, 150],
                    [5, 1530, 765, 150, 150],
                    [5, 1530, 765, 150, 150],
                    [5, 1683, 765, 150, 150],
                    [5, 1530, 765, 150, 150],
                    [5, 1530, 765, 150, 150],
                    [5, 1683, 765, 150, 150],
                    [5, 1530, 765,
                        150, 150
                    ],
                    [5, 1530, 765, 150, 150],
                    [5, 1683, 765, 150, 150],
                    [5, 1530, 765, 150, 150],
                    [5, 1530, 765, 150, 150],
                    [5, 1683, 765, 150, 150],
                    [5, 1530, 765, 150, 150],
                    [5, 1530, 765, 150, 150],
                    [5, 1683, 765, 150, 150],
                    [5, 1530, 765, 150, 150],
                    [5, 1530, 765, 150, 150],
                    [5, 1683, 765, 150, 150],
                    [5, 1530, 765, 150, 150],
                    [5, 1530, 765, 150, 150],
                    [5, 1683, 765, 150, 150],
                    [5, 1530, 765, 150, 150],
                    [5, 1530, 765, 150, 150],
                    [5, 1683, 765, 150, 150],
                    [5, 1836, 765, 150, 150],
                    [5, 1836, 765, 150, 150],
                    [5, 0, 795, 150, 150],
                    [5, 0, 795, 150, 150],
                    [5, 765, 765, 150, 150]
                ]],
                [12, [
                    [5, 1224, 1836, 150, 150],
                    [5, 1224,
                        1836, 150, 150
                    ],
                    [5, 1377, 1836, 150, 150],
                    [5, 1377, 1836, 150, 150],
                    [5, 1530, 1836, 150, 150],
                    [5, 1530, 1836, 150, 150],
                    [5, 1683, 1836, 150, 150],
                    [5, 1683, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5,
                        1836, 1836, 150, 150
                    ],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 1836, 1836, 150, 150],
                    [5, 0, 1866, 150, 150],
                    [5, 0, 1866, 150, 150],
                    [5, 153, 1989, 150, 150],
                    [5, 153, 1989, 150, 150],
                    [5, 1224, 1836, 150, 150],
                    [5, 1224, 1836, 150, 150]
                ]],
                [0, Vh]
            ])],
            ["lobby", new Map([
                [1, [
                    [4, 1989, 0, 56, 68]
                ]],
                [2, [
                    [4, 1491, 3333, 78, 78],
                    [4, 1572, 3333, 78, 78],
                    [4, 1653, 3333, 78, 78],
                    [4, 1734, 3333, 78, 78],
                    [4, 1815, 3333, 78, 78],
                    [4, 1896, 3333, 78, 78],
                    [4, 459, 3354, 78, 78],
                    [4, 540, 3354, 78, 78],
                    [4, 621, 3354,
                        78, 78
                    ],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 621, 3354, 78, 78],
                    [4, 702, 3354, 78, 78],
                    [4, 702, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 783, 3354, 78, 78],
                    [4, 864, 3354, 78, 78],
                    [4, 945, 3354, 78, 78],
                    [4, 0, 3363, 78, 78],
                    [4, 81, 3363, 78, 78],
                    [4, 162, 3363, 78, 78],
                    [4, 243, 3363, 78, 78],
                    [4, 324, 3363, 78, 78],
                    [4, 1491, 3414, 78, 78],
                    [4, 1572, 3414, 78, 78],
                    [4, 1653, 3414, 78, 78],
                    [4, 1491, 3333, 78, 78],
                    [4, 1491, 3333, 78, 78]
                ]],
                [3, [
                    [4, 459, 3210, 126, 141],
                    [4, 459, 3210, 126, 141],
                    [4, 459, 3210, 126, 141],
                    [4, 588, 3210, 126, 141],
                    [4, 588, 3210, 126, 141],
                    [4, 588, 3210, 126, 141],
                    [4, 588, 3210, 126, 141],
                    [4, 717, 3210, 126, 141],
                    [4, 717, 3210, 126, 141],
                    [4, 846, 3210, 126, 141],
                    [4, 846, 3210, 126, 141],
                    [4, 975, 3210, 126, 141],
                    [4, 975, 3210, 126, 141],
                    [4, 1104, 3333, 126, 141],
                    [4, 1104, 3333, 126, 141],
                    [4, 1233, 3333, 126, 141],
                    [4, 1233, 3333, 126, 141],
                    [4, 1362, 3333, 126, 141]
                ]],
                [4, [
                    [4, 1080, 3741, 62, 91],
                    [4, 1080, 3741, 62, 91],
                    [4, 1080, 3741, 62, 91],
                    [4, 1080, 3741, 62, 91],
                    [4, 1080, 3741, 62, 91],
                    [4, 1080, 3741, 62, 91],
                    [4, 1080, 3741,
                        62, 91
                    ],
                    [4, 1080, 3741, 62, 91],
                    [4, 1080, 3741, 62, 91],
                    [4, 1080, 3741, 62, 91],
                    [4, 1145, 3741, 62, 91],
                    [4, 1145, 3741, 62, 91],
                    [4, 1145, 3741, 62, 91],
                    [4, 1145, 3741, 62, 91],
                    [4, 1145, 3741, 62, 91],
                    [4, 1145, 3741, 62, 91],
                    [4, 1145, 3741, 62, 91],
                    [4, 1145, 3741, 62, 91],
                    [4, 1145, 3741, 62, 91],
                    [4, 1145, 3741, 62, 91],
                    [4, 1145, 3741, 62, 91]
                ]],
                [5, [
                    [5, 1969, 2907, 78, 92],
                    [5, 1969, 2907, 78, 92],
                    [5, 1969, 2907, 78, 92],
                    [5, 1969, 3002, 78, 92],
                    [5, 1969, 3002, 78, 92],
                    [5, 1969, 3002, 78, 92],
                    [5, 1961, 3097, 78, 92],
                    [5, 1961, 3097, 78, 92],
                    [5, 1961, 3097, 78, 92]
                ]],
                [6, [
                    [5, 1536, 3149, 76, 77],
                    [5,
                        1615, 3153, 76, 77
                    ],
                    [5, 1694, 3153, 76, 77],
                    [5, 1773, 3153, 76, 77],
                    [5, 1852, 3153, 76, 77],
                    [5, 0, 3183, 76, 77],
                    [5, 79, 3185, 76, 77],
                    [5, 158, 3185, 76, 77],
                    [5, 237, 3185, 76, 77],
                    [5, 237, 3185, 76, 77],
                    [5, 237, 3185, 76, 77],
                    [5, 316, 3185, 76, 77],
                    [5, 316, 3185, 76, 77],
                    [5, 316, 3185, 76, 77],
                    [5, 316, 3185, 76, 77],
                    [5, 395, 3185, 76, 77],
                    [5, 395, 3185, 76, 77],
                    [5, 395, 3185, 76, 77],
                    [5, 395, 3185, 76, 77],
                    [5, 474, 3185, 76, 77],
                    [5, 474, 3185, 76, 77],
                    [5, 474, 3185, 76, 77],
                    [5, 474, 3185, 76, 77],
                    [5, 553, 3185, 76, 77],
                    [5, 553, 3185, 76, 77],
                    [5, 553, 3185, 76, 77],
                    [5, 553, 3185, 76, 77],
                    [5, 632, 3185,
                        76, 77
                    ],
                    [5, 632, 3185, 76, 77],
                    [5, 632, 3185, 76, 77],
                    [5, 711, 3185, 76, 77],
                    [5, 711, 3185, 76, 77],
                    [5, 711, 3185, 76, 77],
                    [5, 711, 3185, 76, 77],
                    [5, 237, 3185, 76, 77],
                    [5, 237, 3185, 76, 77],
                    [5, 237, 3185, 76, 77],
                    [5, 237, 3185, 76, 77],
                    [5, 316, 3185, 76, 77],
                    [5, 316, 3185, 76, 77],
                    [5, 316, 3185, 76, 77],
                    [5, 790, 3185, 76, 77],
                    [5, 869, 3185, 76, 77],
                    [5, 948, 3185, 76, 77],
                    [5, 1027, 3185, 76, 77],
                    [5, 1106, 3185, 76, 77],
                    [5, 1185, 3185, 76, 77],
                    [5, 1264, 3185, 76, 77],
                    [5, 1931, 3192, 76, 77],
                    [5, 1536, 3229, 76, 77],
                    [5, 1615, 3233, 76, 77],
                    [5, 1694, 3233, 76, 77],
                    [5, 1773, 3233, 76, 77],
                    [5, 1852, 3233,
                        76, 77
                    ]
                ]],
                [7, [
                    [5, 1673, 3028, 93, 122],
                    [5, 1673, 3028, 93, 122],
                    [5, 1769, 3028, 93, 122],
                    [5, 1769, 3028, 93, 122],
                    [5, 1769, 3028, 93, 122],
                    [5, 1769, 3028, 93, 122],
                    [5, 1865, 3028, 93, 122],
                    [5, 0, 3058, 93, 122],
                    [5, 0, 3058, 93, 122],
                    [5, 0, 3058, 93, 122],
                    [5, 96, 3060, 93, 122],
                    [5, 96, 3060, 93, 122],
                    [5, 96, 3060, 93, 122],
                    [5, 96, 3060, 93, 122],
                    [5, 192, 3060, 93, 122],
                    [5, 192, 3060, 93, 122],
                    [5, 192, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060,
                        93, 122
                    ],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 384, 3060, 93, 122],
                    [5, 384, 3060, 93, 122],
                    [5, 480, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 288, 3060, 93, 122],
                    [5, 576, 3060, 93, 122],
                    [5, 576, 3060, 93, 122],
                    [5, 576, 3060, 93, 122],
                    [5, 672, 3060, 93, 122],
                    [5, 672, 3060, 93, 122],
                    [5, 672, 3060, 93,
                        122
                    ],
                    [5, 768, 3060, 93, 122],
                    [5, 768, 3060, 93, 122],
                    [5, 768, 3060, 93, 122],
                    [5, 768, 3060, 93, 122],
                    [5, 768, 3060, 93, 122],
                    [5, 864, 3060, 93, 122],
                    [5, 864, 3060, 93, 122],
                    [5, 864, 3060, 93, 122],
                    [5, 864, 3060, 93, 122],
                    [5, 960, 3060, 93, 122],
                    [5, 960, 3060, 93, 122],
                    [5, 1056, 3060, 93, 122],
                    [5, 1056, 3060, 93, 122],
                    [5, 1152, 3060, 93, 122],
                    [5, 1152, 3060, 93, 122],
                    [5, 1248, 3060, 93, 122],
                    [5, 1248, 3060, 93, 122],
                    [5, 1344, 3149, 93, 122],
                    [5, 1344, 3149, 93, 122],
                    [5, 1440, 3149, 93, 122]
                ]],
                [8, [
                    [5, 1377, 2907, 145, 118],
                    [5, 1377, 2907, 145, 118],
                    [5, 1377, 2907, 145, 118],
                    [5, 1525, 2907, 145,
                        118
                    ],
                    [5, 1525, 2907, 145, 118],
                    [5, 1525, 2907, 145, 118],
                    [5, 1673, 2907, 145, 118],
                    [5, 1673, 2907, 145, 118],
                    [5, 1821, 2907, 145, 118],
                    [5, 1821, 2907, 145, 118],
                    [5, 1821, 2907, 145, 118],
                    [5, 0, 2937, 145, 118],
                    [5, 0, 2937, 145, 118],
                    [5, 0, 2937, 145, 118],
                    [5, 1377, 3028, 145, 118],
                    [5, 1377, 3028, 145, 118],
                    [5, 1525, 3028, 145, 118],
                    [5, 1525, 3028, 145, 118],
                    [5, 1525, 3028, 145, 118]
                ]],
                [9, [
                    [4, 1224, 2415, 150, 150]
                ]],
                [10, [
                    [4, 1836, 885, 150, 150]
                ]],
                [11, [
                    [5, 1836, 0, 150, 150]
                ]],
                [12, [
                    [5, 459, 1071, 150, 150]
                ]],
                [0, Vh]
            ])],
            ["ready", new Map([
                [1, [
                    [4, 1104, 3210, 108, 116]
                ]],
                [2, [
                    [4,
                        1026, 3354, 72, 75
                    ]
                ]],
                [3, [
                    [4, 1977, 3333, 66, 75]
                ]],
                [4, [
                    [4, 468, 3714, 72, 75]
                ]],
                [5, [
                    [5, 702, 3499, 70, 75]
                ]],
                [6, [
                    [5, 775, 3499, 66, 75]
                ]],
                [7, [
                    [5, 909, 3499, 61, 75]
                ]],
                [8, [
                    [5, 844, 3499, 62, 75]
                ]],
                [9, [
                    [4, 765, 2139, 150, 150]
                ]],
                [10, [
                    [4, 1836, 885, 150, 150]
                ]],
                [11, [
                    [5, 1836, 0, 150, 150]
                ]],
                [12, [
                    [5, 459, 1071, 150, 150]
                ]],
                [0, Vh]
            ])]
        ]),
        km = [{
                a: {
                    f: 1,
                    y: 0
                },
                b: {
                    f: 16,
                    y: 7.7
                },
                c: {
                    f: 24,
                    y: 0
                }
            }, {
                a: {
                    f: 1,
                    y: 0
                },
                b: {
                    f: 16,
                    y: 7.7
                },
                c: {
                    f: 24,
                    y: 0
                }
            }, {
                a: {
                    f: 1,
                    y: 0
                },
                b: {
                    f: 35,
                    y: -16
                },
                c: {
                    f: 72,
                    y: 0
                }
            }, {
                a: {
                    f: 1,
                    y: 0
                },
                b: {
                    f: 16,
                    y: 5
                },
                c: {
                    f: 24,
                    y: 0
                }
            }, {
                a: {
                    f: 1,
                    y: 0
                },
                b: {
                    f: 10,
                    y: -8
                },
                c: {
                    f: 18,
                    y: 0
                }
            },
            {
                a: {
                    f: 1,
                    y: 0
                },
                b: {
                    f: 13,
                    y: 5
                },
                c: {
                    f: 24,
                    y: 0
                }
            }, {
                a: {
                    f: 1,
                    y: 0
                },
                b: {
                    f: 21,
                    y: -5
                },
                c: {
                    f: 42,
                    y: 0
                }
            }, {
                a: {
                    f: 1,
                    y: 0
                },
                b: {
                    f: 21,
                    y: 8
                },
                c: {
                    f: 42,
                    y: 0
                }
            }, {
                a: {
                    f: 1,
                    y: 0
                },
                b: {
                    f: 13,
                    y: 5
                },
                c: {
                    f: 24,
                    y: 0
                }
            }, {
                a: {
                    f: 1,
                    y: 0
                },
                b: {
                    f: 35,
                    y: -16
                },
                c: {
                    f: 72,
                    y: 0
                }
            }, {
                a: {
                    f: 1,
                    y: 0
                },
                b: {
                    f: 13,
                    y: 5
                },
                c: {
                    f: 24,
                    y: 0
                }
            }, {
                a: {
                    f: 1,
                    y: 0
                },
                b: {
                    f: 13,
                    y: 5
                },
                c: {
                    f: 24,
                    y: 0
                }
            }
        ];
    var nm = class extends H {
        constructor(a) {
            super(a)
        }
    };
    var om = class extends H {
        constructor(a) {
            super(a)
        }
    };
    var pm = class extends H {
        constructor(a) {
            super(a)
        }
    };

    function qm(a, b) {
        B(a, 1, b)
    }
    var rm = class extends H {
        constructor(a) {
            super(a)
        }
        getId() {
            return Fc(this, 1)
        }
    };
    var tm = class extends H {
            constructor(a) {
                super(a, -1, sm)
            }
        },
        sm = [1];
    var um = class extends H {
        constructor(a) {
            super(a)
        }
        Rc(a) {
            B(this, 3, a)
        }
    };
    var vm = class extends H {
        constructor(a) {
            super(a)
        }
    };
    var wm = class extends H {
        constructor(a) {
            super(a)
        }
        getType() {
            return E(this, 1, 0)
        }
    };
    var xm = class extends H {
        constructor(a) {
            super(a)
        }
        getType() {
            return E(this, 1, 0)
        }
    };
    var ym = class extends H {
        constructor(a) {
            super(a)
        }
    };
    var zm = class extends H {
        constructor(a) {
            super(a)
        }
        getType() {
            return E(this, 1, 0)
        }
    };
    var Bm = class extends H {
            constructor(a) {
                super(a, -1, Am)
            }
        },
        Am = [7, 9, 13, 14, 15];
    var Cm = class extends H {
            constructor(a) {
                super(a)
            }
            getId() {
                return Fc(this, 1)
            }
            getPlayerState() {
                return F(this, Bm, 3)
            }
        },
        Dm = [Cm, 1, de, 2, ne, 3, ke, [Bm, 1, ae, 2, ae, 3, de, 4, ne, 6, de, 7, le, [ym, 1, ae, 2, ae], 8, fe, 9, ee, 10, fe, 12, fe, 13, le, [xm, 1, ne, 2, ne], 14, le, [zm, 1, ne, 2, de], 15, le, [wm, 1, ne], 16, fe, 17, ae, 18, fe, 19, de, 20, de, 21, he], 4, ke, [um, 1, ne, 2, fe, 3, de], 5, ke, [tm, 1, ee], 6, ke, [vm, 1, ne], 7, ke, [class extends H {
            constructor(a) {
                super(a)
            }
        }, 1, ne]];
    var Em = class extends H {
        constructor(a) {
            super(a)
        }
    };
    var Fm = class extends H {
        constructor(a) {
            super(a)
        }
        getId() {
            return Fc(this, 1)
        }
    };
    var Gm = class extends H {
        constructor(a) {
            super(a)
        }
    };
    var Hm = class extends H {
        constructor(a) {
            super(a)
        }
    };
    var Im = class extends H {
        constructor(a) {
            super(a)
        }
        getId() {
            return Fc(this, 1)
        }
    };
    var Jm = class extends H {
        constructor(a) {
            super(a)
        }
    };
    var Km = class extends H {
            constructor(a) {
                super(a)
            }
        },
        Lm = [2, 3, 4],
        Mm = [Km, 1, he, 2, je, Lm, 3, be, Lm, 4, ge, Lm];
    var Om = class extends H {
            constructor(a) {
                super(a, -1, Nm)
            }
        },
        Nm = [2];
    var Pm = class extends H {
        constructor(a) {
            super(a)
        }
    };
    var Rm = class extends H {
            constructor(a) {
                super(a, -1, Qm)
            }
        },
        Qm = [10];
    var Sm = class extends H {
        constructor(a) {
            super(a)
        }
        getId() {
            return Fc(this, 1)
        }
    };
    var Um = class extends H {
            constructor(a) {
                super(a, -1, Tm)
            }
        },
        Tm = [1];
    var Vm = class extends H {
        constructor(a) {
            super(a)
        }
    };
    var Wm = class extends H {
        constructor(a) {
            super(a)
        }
        getId() {
            return Fc(this, 1)
        }
    };
    var Xm = class extends H {
            constructor(a) {
                super(a)
            }
            getType() {
                return E(this, 1, 0)
            }
        },
        Ym = [Xm, 1, ne, 2, de, 3, fe, 4, ke, [Hm, 1, he, 2, ke, [Gm, 1, ce, 2, ce], 3, he], 5, ke, [Fm, 1, de, 2, he, 3, ce, 4, he], 7, ke, [Om, 2, le, Mm, 3, he, 4, de], 8, ke, [Em, 1, de], 9, ke, [Vm, 1, ke, [rm, 1, de, 2, ne, 3, ae, 4, ae, 6, ke, [pm, 2, ne, 3, ne, 4, fe], 7, ke, [om], 8, ke, [nm, 1, ne, 2, de, 3, de], 9, ke, [class extends H {
                constructor(a) {
                    super(a)
                }
            }], 10, ke, [class extends H {
                constructor(a) {
                    super(a)
                }
            }]], 2, ke, Dm], 10, ke, [Wm, 1, de], 11, ke, [Rm, 3, de, 4, de, 5, de, 6, fe, 7, fe, 8, ne, 10, le, [Pm, 1, de, 2, ne]], 12,
            ke, [Im, 1, de, 2, ae, 3, ae, 4, fe], 13, ke, Dm, 14, ke, [Sm, 1, de, 2, ae, 3, ae, 4, ae, 5, ae, 6, fe], 15, ke, [Um, 1, le, Mm], 16, ke, [class extends H {
                constructor(a) {
                    super(a)
                }
            }, 1, ne], 17, ke, [Jm, 1, ce]
        ];
    /*

     copyright (c) 2006-2007 Erin Catto http://www.gphysics.com

     This software is provided 'as-is', without any express or implied
     warranty.  In no event will the authors be held liable for any damages
     arising from the use of this software.
     Permission is granted to anyone to use this software for any purpose,
     including commercial applications, and to alter it and redistribute it
     freely, subject to the following restrictions:
     1. The origin of this software must not be misrepresented; you must not
     claim that you wrote the original software. If you use this software
     in a product, an acknowledgment in the product documentation would be
     appreciated but is not required.
     2. Altered source versions must be plainly marked as such, and must not be
     misrepresented as being the original software.
     3. This notice may not be removed or altered from any source distribution.
    */
    function Zm(a, b) {
        this.x = a;
        this.y = b
    }
    var $m = [];

    function Y(a, b) {
        if (0 < $m.length) {
            var c = $m.pop();
            c.set(a, b);
            return c
        }
        return new Zm(a, b)
    }

    function Z(a) {
        null != a && $m.push(a)
    }

    function an(a) {
        a.x = 0;
        a.y = 0
    }
    q = Zm.prototype;
    q.set = function(a, b) {
        this.x = a;
        this.y = b
    };
    q.Ca = function(a) {
        this.x = a.x;
        this.y = a.y
    };

    function bn(a) {
        return Y(-a.x, -a.y)
    }

    function cn(a) {
        a.x = -a.x;
        a.y = -a.y
    }

    function dn(a) {
        return Y(a.x, a.y)
    }
    q.add = function(a) {
        this.x += a.x;
        this.y += a.y
    };

    function en(a, b) {
        a.x *= b;
        a.y *= b
    }
    q.abs = function() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y)
    };
    q.length = function() {
        return Math.sqrt(fn(this))
    };

    function fn(a) {
        return a.x * a.x + a.y * a.y
    }

    function gn(a) {
        var b = a.length();
        b < Number.MIN_VALUE || (b = 1 / b, a.x *= b, a.y *= b)
    }
    q.Zc = function() {
        return isFinite(this.x) && isFinite(this.y)
    };

    function hn(a) {
        const b = {
            x: 0,
            y: 0
        };
        if (a.jf && a.Oa) {
            var c = a.Oa,
                d = ((new Date).getTime() - c.t) / 1E3;
            if (d < +jn(a, "sync_dt_threshold")) {
                var e = a.body.ta.position;
                const f = c.x + c.Vd * d,
                    g = c.y + c.Wd * d,
                    h = +jn(a, "sync_slip_time"),
                    k = Math.sqrt((f - e.x) * (f - e.x) + (g - e.y) * (g - e.y));
                d = Math.sqrt(c.Vd * c.Vd + c.Wd * c.Wd) * (h + d) + +jn(a, "sync_epsilon");
                !a.re && k > d ? (c = a.body, e = Y(f + (e.x - f) * d / k, g + (e.y - g) * d / k), kn(c, e, c.ha.a)) : (c = +jn(a, "sync_coefficient"), b.x = (f - e.x) * k / d * c, b.y = (g - e.y) * k / d * c)
            }
            a.re = !0
        }
        return b
    }

    function jn(a, b) {
        return a.settings.get(b)
    }
    var on = class {
        constructor(a, b, c) {
            this.ya = a;
            this.settings = b;
            this.body = null;
            this.angle = 1;
            this.Oa = this.jf = null;
            this.re = this.qe = !1;
            this.alpha = 1;
            this.id = c.getId();
            this.type = E(c, 2, 0);
            this.g = Y(Ec(c, 3), Ec(c, 4))
        }
        getId() {
            return this.id
        }
        getType() {
            return this.type
        }
        Wc() {
            return !1
        }
        H() {
            const a = this.body.ta.position;
            this.g.x = a.x;
            this.g.y = a.y
        }
        mc(a) {
            if (Dc(a, 6)) {
                var b = this.body,
                    c = Y(Ec(a, 2), Ec(a, 3));
                kn(b, c, b.ha.a);
                ln(this.body, Y(Ec(a, 4), Ec(a, 5)))
            } else this.jf = a, this.Oa = {
                    x: Ec(a, 2),
                    y: Ec(a, 3),
                    Vd: Ec(a, 4),
                    Wd: Ec(a, 5),
                    t: (new Date).getTime()
                },
                this.re = !1
        }
        nc() {
            const a = hn(this),
                b = this.body.ka;
            b.x += a.x;
            b.y += a.y;
            ln(this.body, b);
            b.x && (this.angle = Math.PI + Math.atan2(-b.x, b.y))
        }
        Ea() {
            return nl.get(this.type) || 0
        }
        isVisible() {
            return !0
        }
        render() {}
        oe(a) {
            var b = this.body.ta.position;
            const c = this.body.ka,
                d = new Sm;
            B(d, 1, this.id);
            B(d, 2, b.x);
            B(d, 3, b.y);
            B(d, 4, c.x);
            B(d, 5, c.y);
            B(d, 6, !1);
            b = new Xm;
            B(b, 1, 11);
            B(b, 2, this.id);
            a ? (B(d, 6, !0), B(b, 3, !0), yc(b, 14, d), mn(this.ya.Ad, b)) : (yc(b, 14, d), this.ya.ue(b))
        }
        va() {
            this.qe = !0
        }
        Pe() {
            return this.qe
        }
        dispose(a) {
            var b = this.body;
            b && nn(a.o, b)
        }
    };

    function pn() {
        this.i = 0;
        this.g = Y(0, 0);
        this.I = 0
    }
    var qn = [];
    pn.prototype.Ca = function(a, b, c) {
        this.i = a;
        this.g.Ca(b);
        this.I = c
    };
    pn.prototype.set = function(a, b, c, d) {
        this.i = a;
        this.g.set(b, c);
        this.I = d
    };

    function rn() {
        this.ab = Y(0, 0);
        this.yb = Y(0, 0);
        this.w = Y(0, 0);
        this.Za = this.Ya = this.a = 0
    }
    rn.prototype.set = function(a) {
        this.ab.Ca(a.ab);
        this.yb.Ca(a.yb);
        this.w.Ca(a.w);
        this.a = a.a;
        this.Ya = a.Ya;
        this.Za = a.Za
    };

    function sn() {
        this.T = Y(0, 0);
        this.U = Y(0, 0);
        this.T.set(1, 0);
        this.U.set(0, 1)
    }
    var tn = [];

    function un() {
        if (0 < tn.length) {
            var a = tn.pop();
            a.T.set(0, 0);
            a.U.set(0, 0);
            return a
        }
        return new sn
    }
    sn.prototype.set = function(a) {
        var b = Math.cos(a);
        a = Math.sin(a);
        this.T.set(b, a);
        this.U.set(-a, b)
    };
    sn.prototype.abs = function() {
        this.T.abs();
        this.U.abs()
    };

    function vn(a, b) {
        return a.x * b.x + a.y * b.y
    }

    function wn(a, b) {
        return a.x * b.y - a.y * b.x
    }

    function xn(a) {
        return Y(a.y, -1 * a.x)
    }

    function yn(a, b) {
        return Y(a.T.x * b.x + a.U.x * b.y, a.T.y * b.x + a.U.y * b.y)
    }

    function zn(a, b) {
        return Y(vn(b, a.T), vn(b, a.U))
    }

    function An(a, b) {
        b = yn(a.R, b);
        b.x += a.position.x;
        b.y += a.position.y;
        return b
    }

    function Bn(a, b) {
        return Y(a.x - b.x, a.y - b.y)
    }

    function Cn(a, b, c) {
        return a < b ? b : a > c ? c : a
    };

    function Dn(a) {
        if (!a) throw Error("P");
    }
    var En = .5 * Math.PI,
        Fn = En * En,
        Gn = 2 / 180 * Math.PI,
        Hn = Number.MIN_VALUE * Number.MIN_VALUE;

    function In() {
        this.i = new rn;
        this.j = new rn;
        this.u = new rn;
        this.o = [this.i, this.j, this.u];
        this.g = 0
    }
    var Jn = [];

    function Kn(a) {
        if (1 == a.g) return 0;
        if (2 == a.g) {
            var b = Bn(a.i.w, a.j.w);
            a = b.length();
            Z(b);
            return a
        }
        if (3 == a.g) {
            b = Bn(a.j.w, a.i.w);
            var c = Bn(a.u.w, a.i.w);
            a = wn(b, c);
            Z(b);
            Z(c);
            return a
        }
        Dn(!1);
        return 0
    };

    function Ln(a, b, c) {
        if (0 < Jn.length) {
            var d = Jn.pop();
            for (var e = 0; e < d.o.length; e++) {
                var f = d.o[e];
                null != f.ab && f.ab.set(0, 0);
                null != f.yb && f.yb.set(0, 0);
                null != f.w && f.w.set(0, 0);
                f.Ya = 0;
                f.Za = 0;
                f.a = 0
            }
        } else d = new In;
        e = d;
        f = c.g;
        var g = c.j,
            h = c.i,
            k = c.o;
        Dn(0 <= b.count && 3 >= b.count);
        e.g = b.count;
        for (var l = e.o, m = 0; m < e.g; m++) {
            var n = l[m];
            n.Ya = b.Ya[m];
            n.Za = b.Za[m];
            var w = Mn(f, n.Ya);
            var v = Mn(h, n.Za);
            Z(n.ab);
            Z(n.yb);
            Z(n.w);
            n.ab = An(g, w);
            n.yb = An(k, v);
            n.w = Bn(n.yb, n.ab);
            n.a = 0
        }
        1 < e.g && (w = b.g, v = Kn(e), v < .5 * w || 2 * w < v || v < Number.MIN_VALUE) &&
            (e.g = 0);
        0 == e.g && (n = l[0], n.Ya = 0, n.Za = 0, w = Mn(f, 0), v = Mn(h, 0), Z(n.ab), Z(n.yb), Z(n.w), n.ab = An(g, w), n.yb = An(k, v), n.w = Bn(n.yb, n.ab), e.g = 1);
        (1 > d.g || 3 < d.g) && Dn(!1);
        for (e = 0; 20 > e;) {
            f = [];
            for (g = 0; g < d.g; g++) f[g] = {}, f[g].Ya = d.o[g].Ya, f[g].Za = d.o[g].Za;
            if (2 == d.g) g = d, k = g.i.w, l = g.j.w, h = Bn(l, k), k = -(k.x * h.x + k.y * h.y), 0 >= k ? (Z(h), g.i.a = 1, g.g = 1) : (l = l.x * h.x + l.y * h.y, Z(h), 0 >= l ? (g.j.a = 1, g.g = 1, g.i.set(g.j)) : (h = 1 / (l + k), g.i.a = l * h, g.j.a = k * h, g.g = 2));
            else if (3 == d.g) {
                g = d;
                w = g.i.w;
                v = g.j.w;
                n = g.u.w;
                var A = Bn(v, w);
                h = vn(v, A);
                k = -vn(w, A);
                var p =
                    Bn(n, w),
                    u = vn(w, p);
                l = vn(n, p);
                m = wn(A, p);
                Z(A);
                Z(p);
                A = -u;
                u = Bn(n, v);
                var C = vn(v, u);
                p = vn(n, u);
                Z(u);
                u = -C;
                C = m * wn(v, n);
                n = m * wn(n, w);
                w = m * wn(w, v);
                0 >= k && 0 >= A ? (g.i.a = 1, g.g = 1) : 0 < h && 0 < k && 0 >= w ? (l = 1 / (h + k), g.i.a = h * l, g.j.a = k * l, g.g = 2) : 0 < l && 0 < A && 0 >= n ? (h = 1 / (l + A), g.i.a = l * h, g.u.a = A * h, g.g = 2, g.j.set(g.u)) : 0 >= h && 0 >= u ? (g.j.a = 1, g.g = 1, g.i.set(g.j)) : 0 >= l && 0 >= p ? (g.u.a = 1, g.g = 1, g.i.set(g.u)) : 0 < p && 0 < u && 0 >= C ? (h = 1 / (p + u), g.j.a = p * h, g.u.a = u * h, g.g = 2, g.i.set(g.u)) : (h = 1 / (C + n + w), g.i.a = C * h, g.j.a = n * h, g.u.a = w * h, g.g = 3)
            }
            if (3 == d.g) break;
            h = d;
            1 == h.g ?
                g = bn(h.i.w) : 2 == h.g ? (g = Bn(h.j.w, h.i.w), h = bn(h.i.w), k = wn(g, h), Z(h), h = 0 < k ? Y(-1 * g.y, g.x) : xn(g), Z(g), g = h) : (Dn(!1), g = Y(0, 0));
            if (fn(g) < Hn) {
                Z(g);
                break
            }
            Z(d.o[d.g].ab);
            Z(d.o[d.g].yb);
            Z(d.o[d.g].w);
            h = bn(g);
            k = zn(c.j.R, h);
            Z(h);
            d.o[d.g].Ya = Nn(c.g, k);
            Z(k);
            d.o[d.g].ab = An(c.j, Mn(c.g, d.o[d.g].Ya));
            h = zn(c.o.R, g);
            Z(g);
            d.o[d.g].Za = Nn(c.i, h);
            Z(h);
            d.o[d.g].yb = An(c.o, Mn(c.i, d.o[d.g].Za));
            d.o[d.g].w = Bn(d.o[d.g].yb, d.o[d.g].ab);
            e++;
            h = !1;
            for (g = 0; g < f.length; g++)
                if (d.o[d.g].Ya == f[g].Ya && d.o[d.g].Za == f[g].Za) {
                    h = !0;
                    break
                } if (h) break;
            d.g++
        }
        e = d;
        f = a.g;
        g = a.i;
        1 == e.g ? (f.Ca(e.i.ab), g.Ca(e.i.yb)) : 2 == e.g ? (f.x = e.i.a * e.i.ab.x + e.j.a * e.j.ab.x, f.y = e.i.a * e.i.ab.y + e.j.a * e.j.ab.y, g.x = e.i.a * e.i.yb.x + e.j.a * e.j.yb.x, g.y = e.i.a * e.i.yb.y + e.j.a * e.j.yb.y) : 3 == e.g ? (g.x = f.x = e.i.a * e.i.ab.x + e.j.a * e.j.ab.x + e.u.a * e.u.ab.x, g.y = f.y = e.i.a * e.i.ab.y + e.j.a * e.j.ab.y + e.u.a * e.u.ab.y) : Dn(!1);
        e = Bn(a.g, a.i);
        a.j = e.length();
        Z(e);
        e = d;
        b.g = Kn(e);
        b.count = e.g;
        f = e.o;
        for (g = 0; g < e.g; g++) b.Ya[g] = f[g].Ya, b.Za[g] = f[g].Za;
        null != d && Jn.push(d);
        c.u && (b = c.g.i, c = c.i.i, a.j > b + c && a.j > Number.MIN_VALUE ?
            (a.j -= b + c, d = Bn(a.i, a.g), gn(d), a.g.x += b * d.x, a.g.y += b * d.y, a.i.x -= c * d.x, a.i.y -= c * d.y, Z(d)) : (c = Y(0, 0), c.x = .5 * (a.g.x + a.i.x), c.y = .5 * (a.g.y + a.i.y), a.g.x = a.i.x = c.x, a.g.y = a.i.y = c.y, a.j = 0, Z(c)))
    };

    function On() {
        this.u = !1;
        this.o = this.j = this.i = this.g = null
    };

    function Pn() {
        this.g = Y(0, 0);
        this.i = Y(0, 0);
        this.j = 0
    };

    function Qn() {
        this.i = this.j = 0;
        this.g = []
    }
    Qn.prototype.set = function(a) {
        a.Ge(this)
    };

    function Nn(a, b) {
        for (var c = 0, d = a.g[0].x * b.x + a.g[0].y * b.y, e = 1; e < a.j; e++) {
            var f = a.g[e].x * b.x + a.g[e].y * b.y;
            f > d && (c = e, d = f)
        }
        return c
    }

    function Rn(a, b) {
        return a.g[Nn(a, b)]
    }

    function Mn(a, b) {
        void 0 === b && (b = 0);
        Dn(0 <= b && b < a.j);
        return a.g[b]
    };

    function Sn() {
        this.Ya = [0, 0, 0];
        this.Za = [0, 0, 0]
    };

    function Tn() {
        this.j = .005
    }
    q = Tn.prototype;
    q.getTypeName = function() {
        return ia()
    };
    q.Zd = function() {
        return ia()
    };
    q.set = function(a) {
        this.j = a.j
    };
    q.Mc = function() {
        ia()
    };
    q.xe = function() {
        ia()
    };
    q.Ge = function() {
        ia()
    };

    function Un() {
        this.position = Y(0, 0);
        this.R = un()
    }
    Un.prototype.set = function(a) {
        this.position.Ca(a.position);
        var b = this.R;
        a = a.R;
        b.T.Ca(a.T);
        b.U.Ca(a.U)
    };

    function Vn() {
        this.j = .005;
        this.u = Y(0, 0);
        this.g = [];
        this.o = 0;
        this.i = []
    }
    ta(Vn, Tn);
    q = Vn.prototype;
    q.getTypeName = function() {
        return "PolygonShape"
    };
    q.Zd = function() {
        var a = new Vn;
        a.set(this);
        return a
    };
    q.set = function(a) {
        Vn.Rb.set.call(this, a);
        if (a instanceof Vn) {
            this.u.Ca(a.u);
            this.o = a.o;
            Wn(this, this.o);
            for (var b = 0; b < this.o; b++) this.g[b].Ca(a.g[b]), this.i[b].Ca(a.i[b])
        }
    };

    function Xn(a, b) {
        var c = new Vn;
        c.o = 4;
        Wn(c, 4);
        c.g[0].set(-a, -b);
        c.g[1].set(a, -b);
        c.g[2].set(a, b);
        c.g[3].set(-a, b);
        c.i[0].set(0, -1);
        c.i[1].set(1, 0);
        c.i[2].set(0, 1);
        c.i[3].set(-1, 0);
        an(c.u);
        return c
    }

    function Yn(a, b) {
        var c = new Vn;
        c.o = 2;
        Wn(c, 2);
        c.g[0].Ca(a);
        c.g[1].Ca(b);
        c.u.x = .5 * (a.x + b.x);
        c.u.y = .5 * (a.y + b.y);
        a = Bn(b, a);
        b = xn(a);
        Z(a);
        c.i[0] = b;
        gn(c.i[0]);
        c.i[1].x = -c.i[0].x;
        c.i[1].y = -c.i[0].y;
        return c
    }
    q.Mc = function(a, b) {
        for (var c = b.R, d = this.g[0], e = b.position.x + (c.T.x * d.x + c.U.x * d.y), f = b.position.y + (c.T.y * d.x + c.U.y * d.y), g = e, h = f, k = 1; k < this.o; ++k) {
            d = this.g[k];
            var l = b.position.x + (c.T.x * d.x + c.U.x * d.y);
            d = b.position.y + (c.T.y * d.x + c.U.y * d.y);
            e = e < l ? e : l;
            f = f < d ? f : d;
            g = g > l ? g : l;
            h = h > d ? h : d
        }
        a.g.x = e - this.j;
        a.g.y = f - this.j;
        a.i.x = g + this.j;
        a.i.y = h + this.j
    };
    q.xe = function(a, b) {
        if (2 == this.o) a.g.x = .5 * (this.g[0].x + this.g[1].x), a.g.y = .5 * (this.g[0].y + this.g[1].y), a.i = 0, a.I = 0;
        else {
            for (var c = 0, d = 0, e = 0, f = 0, g = 1 / 3, h = 0; h < this.o; ++h) {
                var k = this.g[h],
                    l = h + 1 < this.o ? this.g[h + 1] : this.g[0],
                    m = k.x,
                    n = k.y,
                    w = l.x,
                    v = l.y,
                    A = m * v - n * w,
                    p = .5 * A;
                e += p;
                c += p * g * (k.x + l.x);
                d += p * g * (k.y + l.y);
                k = m;
                f += A * (g * (.25 * (k * k + w * k + w * w) + (0 * k + 0 * w)) + g * (.25 * (n * n + v * n + v * v) + (0 * n + 0 * v)))
            }
            a.set(b * e, 1 / e * c, 1 / e * d, b * f)
        }
    };
    q.Ge = function(a) {
        var b = this.j,
            c = this.g;
        a.j = this.o;
        a.i = b;
        a.g = c
    };

    function Wn(a, b) {
        for (var c = 0; c < a.g.length; c++) Z(a.g[c]), Z(a.i[c]);
        a.g = [];
        a.i = [];
        for (c = 0; c < b; c++) a.g[c] = Y(0, 0), a.i[c] = Y(0, 0)
    }
    un();

    function Zn() {
        this.position = Y(0, 0);
        this.V = Y(0, 0);
        this.j = this.O = this.o = this.angle = 0;
        this.u = this.i = !0;
        this.v = this.H = !1;
        this.type = 0;
        this.active = !0;
        this.g = 1
    };

    function $n() {
        this.g = 1;
        this.i = 65535;
        this.j = 0
    };

    function ao() {
        this.filter = new $n;
        this.filter.g = 1;
        this.filter.i = 65535;
        this.filter.j = 0;
        this.g = null;
        this.H = .2;
        this.i = this.va = 0;
        this.j = !1
    };
    var eo = class extends on {
        constructor(a, b, c, d) {
            super(a, b, c);
            this.i = d;
            a = F(c, nm, 8);
            this.Wa = E(a, 1, 0);
            this.width = Fc(a, 2);
            this.height = Fc(a, 3);
            a = new Zn;
            a.type = 0;
            a.position.set(this.g.x, this.g.y);
            this.body = bo(d.o, a);
            this.body.Se = this;
            d = new ao;
            d.j = !0;
            d.g = Xn(this.width, this.height);
            d.filter.g = 4;
            d.filter.i = 3;
            co(this.body, d);
            d.j = !1;
            d.filter.i = 1 === this.Wa ? 2 : 1;
            co(this.body, d)
        }
    };
    var fo = class extends eo {
        constructor(a, b, c, d) {
            super(a, b, c, d);
            this.state = null;
            this.j = {
                radius: Math.sqrt(this.width * this.width + this.height * this.height) + 5,
                Fe: 0,
                Wa: this.Wa,
                Nd: null,
                Jd: !0,
                visible: !0
            }
        }
        render() {}
        update() {
            if (this.state) {
                var a = this,
                    b = kc(this.state, 1, 0, !1);
                for (let c = 0; c < b.length; c++) {
                    const d = this.i.v.get(b[c]);
                    d && (d.O(a, c + 1), a = d)
                }
            }
        }
        H() {
            if (this.state)
                for (const a of kc(this.state, 1, 0, !1)) {
                    const b = this.i.v.get(a);
                    b && b.H()
                }
        }
        Ae() {
            return this.j
        }
    };
    const go = ol(),
        ho = fh.Va(),
        io = [-.5, -1],
        jo = [0, 0];

    function ko(a, b, c, d, e) {
        const f = b[3],
            g = b[4],
            h = document.createElement("canvas");
        h.width = f;
        h.height = g;
        const k = h.getContext("2d");
        Zg(ho, k, b);
        b = PIXI.TilingSprite.from(h, Math.ceil(L / (f * e * .5)) * f, Math.ceil(Ig / (g * e * .5)) * g);
        b.blendMode = c;
        b.alpha = d;
        e /= 25;
        b.scale.set(e);
        a.vd.push(f * e);
        a.ud.push(g * e);
        a.g.addChild(b)
    }

    function lo(a, b) {
        const c = a.g.children[b];
        c.tilePosition.set(25 * io[b] * a.i / 1E3, 25 * jo[b] * a.i / 1E3);
        const d = a.vd[b];
        a = a.ud[b];
        c.position.set(Math.floor(go.left / d) * d, Math.floor(go.top / a) * a)
    }
    var mo = class extends gi {
        constructor() {
            super();
            this.vd = [];
            this.ud = [];
            this.i = 0;
            this.j = PIXI.autoDetectRenderer({
                antialias: !0,
                clearBeforeRender: !1,
                preserveDrawingBuffer: !0,
                view: N,
                powerPreference: "high-performance",
                forceCanvas: !0,
                width: N.width,
                height: N.height
            });
            this.j.plugins.interaction.destroy();
            this.g = new PIXI.Container;
            ko(this, sh, PIXI.BLEND_MODES.SCREEN, .5, 1);
            ko(this, th, PIXI.BLEND_MODES.MULTIPLY, .15, 1.5)
        }
        Bb() {
            super.Bb();
            this.g.destroy(!0);
            this.j.destroy(!1)
        }
        update(a) {
            this.i += a
        }
        render() {
            lo(this, 0);
            lo(this, 1);
            this.g.scale.set(go.g);
            this.g.position.set(vl(go, 0), wl(go, 0));
            this.j.render(this.g)
        }
    };
    var oo = class {
            constructor(a) {
                this.Ad = a
            }
            Dd(a) {
                mn(this.Ad, a)
            }
            ue(a) {
                mn(this.Ad, a)
            }
            g() {
                var a = this.Ad;
                0 < xc(a.i, Xm, 1).length && (a.sendMessage(a.i), a.i = new no)
            }
        },
        po = class extends oo {
            constructor() {
                super()
            }
            Dd() {}
            ue() {}
            g() {}
        };
    var ro = (a, b, c) => {
            if (!qo) return b;
            let d;
            try {
                d = window.sessionStorage.getItem(a)
            } catch (e) {
                return b
            }
            if (null == d) return b;
            a = JSON.parse(d);
            return c && !c(a) ? b : a
        },
        so = (a, b, c) => {
            if (qo && (!c || c(b))) try {
                window.sessionStorage.setItem(a, JSON.stringify(b))
            } catch (d) {}
        },
        to;
    try {
        to = !!self.sessionStorage
    } catch (a) {
        to = !1
    }
    var qo = to;
    var vo = () => {
        const a = ro("halloween21.client.match_config", null, uo);
        if (!a) return il("Stored match config not found."), null;
        const b = a.timestamp;
        return !b || 15E4 < Date.now() - b ? (so("halloween21.client.match_config", null), il("Stored match config expired."), null) : a
    };

    function uo(a) {
        return a ? void 0 !== a.url && void 0 !== a.match && void 0 !== a.player && void 0 !== a.nonce && void 0 !== a.timestamp : !1
    };

    function wo(a, b) {
        Ac(a, 1, Xm, b);
        return a
    }
    var no = class extends H {
            constructor(a) {
                super(a, -1, xo)
            }
        },
        xo = [1],
        yo = [no, 1, le, Ym];

    function mn(a, b) {
        if (Dc(b, 3)) wo(a.i, b);
        else {
            var c = "" + b.getType();
            Fc(b, 2) && (c += "_" + Fc(b, 2));
            var d = a.o.get(c);
            b == d || b && d && b instanceof d.constructor && bc(b.Fa, d.Fa) || (a.o.set(c, b), wo(a.i, b))
        }
    }
    var zo = class {
        constructor() {
            this.o = new Map;
            this.i = new no
        }
    };
    var Ao = {
        Qd: a => Vd(a, yo),
        Ze: a => Ud(a, yo)
    };

    function Bo(a, b) {
        const c = new Hm;
        B(c, 1, a.Fc);
        if (a.Gc) {
            const d = new Gm;
            yc(c, 2, d);
            B(d, 1, a.Gc.player);
            B(d, 2, a.Gc.nonce)
        }
        b && B(c, 3, b);
        a = new Xm;
        B(a, 1, 1);
        yc(a, 4, c);
        return a
    };

    function Co(a) {
        return r(function*() {
            for (; a.i < a.j;) {
                a.i++;
                if (yield a.v()) return a.u(a.i), !0;
                yield new Promise(b => void setTimeout(b, a.g));
                a.g *= 2
            }
            a.o();
            return !1
        })
    }
    var Do = class {
        constructor(a, b, c, d = () => {}, e = () => {}) {
            this.v = a;
            this.g = b;
            this.j = c;
            this.u = d;
            this.o = e;
            this.i = 0
        }
    };

    function Eo(a) {
        var b = {
                nd: Ao,
                Ud: !0
            },
            c = Fo;
        return r(function*() {
            const d = new c(b);
            if (!(yield Co(new Do(() => r(function*() {
                    try {
                        return yield d.connect(a), !0
                    } catch (e) {
                        return !1
                    }
                }), 500, 3, e => void console.log("Connecting to", a, "- attempt", e), () => void console.log("Could not connect to", a))))) throw Error("Q");
            return d
        })
    };

    function Go() {
        let a, b;
        const c = new Promise((d, e) => {
            a = d;
            b = e
        });
        return new Ho(c, a, b)
    }

    function Io(a, b) {
        a.g || (a.g = !0, a.i && (clearTimeout(a.i), a.i = void 0), a.o(b))
    }

    function Jo(a, b) {
        a.g || (a.g = !0, a.i && (clearTimeout(a.i), a.i = void 0), a.j(b))
    }
    var Ho = class {
            constructor(a, b, c) {
                this.promise = a;
                this.o = b;
                this.j = c;
                this.g = !1
            }
        },
        Ko = class {
            constructor() {
                this.g = Go()
            }
            set(a) {
                this.value = a;
                Io(this.g, a)
            }
            get() {
                return void 0 !== this.value ? Promise.resolve(this.value) : this.g.promise
            }
        };

    function Lo(a) {
        return "string" === typeof a
    };

    function Mo(a, b) {
        console.warn("WARN: %s%s", a.g, b)
    }
    var No = class {
        constructor() {
            this.g = ""
        }
        error(a) {
            console.error("ERROR: %s%s", this.g, a)
        }
        log(a, b = 2) {
            2 >= b && console.log("INFO: %s%s", this.g, a)
        }
    };
    let Oo = 0;

    function Po(a, b, ...c) {
        a = [...a.g[b].entries()].sort((d, e) => d[0].localeCompare(e[0]));
        for (const [, d] of a) d(...c)
    }
    var Qo = class {
        constructor() {
            this.g = {
                [0]: new Map,
                [2]: new Map,
                [1]: new Map,
                [3]: new Map
            }
        }
        addListener(a, b) {
            const c = `${a}${Oo++}`;
            this.g[a].set(c, b);
            return c
        }
        removeListener(a, b) {
            b ? this.g[a].delete(b) : this.g[a].clear()
        }
        reset() {
            this.g = {
                [0]: new Map,
                [2]: new Map,
                [1]: new Map,
                [3]: new Map
            }
        }
    };
    var Ro = class extends H {
            constructor(a) {
                super(a)
            }
        },
        So = [Ro, 1, ne, 2, ke, pe, 3, he, 4, he];

    function To(a, b, c) {
        if (c) {
            var d = new oe;
            c = a.nd.Qd(c);
            var e = "";
            "/" !== e.substr(-1) && (e += "/");
            d = pc(d, 1, e + "m");
            c = Nc(c);
            qc(d, 2, c.hc ? new Uint8Array(c.buffer) : c.buffer)
        }
        c = oc(oc(oc(B(Uo, 1, b.Kd), 3), 2), 4);
        b.clientId && B(c, 3, b.clientId);
        b.Fd && B(c, 4, b.Fd);
        d && yc(c, 2, d);
        b = Vd(c, So);
        a.ob.Xb.send(b)
    }

    function Vo(a) {
        if (a.o) {
            var b = (new Date).getTime() - a.O.getTime();
            1E4 < b ? (a.g.log(`No Ping Received in ${b}ms; closing connection.`), a.close()) : To(a, {
                Kd: 0
            })
        } else Mo(a.g, "Failed to send ping - Socket not alive.")
    }

    function Wo(a, b) {
        a.o ? void 0 !== a.u.value ? To(a, {
            Kd: 3
        }, b) : a.g.error("Connection to server not yet established (no websocket key).") : a.g.error("Failed to send message - Socket not alive.")
    }

    function Xo(a, b, c) {
        a.i.addListener(b, c)
    }

    function Yo(a) {
        a.o = !0;
        a.O = new Date;
        Vo(a);
        const b = setInterval(() => {
            Vo(a)
        }, a.mf);
        a.V.push(b)
    }
    var $o = class {
            constructor(a, b = 5E3) {
                this.nd = a;
                this.mf = b;
                this.u = new Ko;
                this.V = [];
                this.O = new Date;
                this.o = !1;
                this.g = new No;
                this.i = new Qo
            }
            va() {}
            open(a) {
                Zo(this, "opened", this.ya.bind(this));
                Zo(this, "message", this.wa.bind(this));
                Zo(this, "closed", this.v.bind(this));
                Zo(this, "error", this.onError.bind(this));
                this.ob.open(a)
            }
            close() {
                this.H()
            }
            v() {
                Ki(this.ob);
                this.o = !1;
                for (const a of this.V) clearInterval(a);
                Po(this.i, 2);
                this.i.reset()
            }
            onError(a) {
                Po(this.i, 3, a)
            }
            ya() {
                Yo(this);
                this.va();
                this.u.get().then(a => {
                    this.onReady(a)
                })
            }
            onReady(a) {
                this.g.g =
                    `(${a.clientId}) `;
                Po(this.i, 0, a)
            }
            wa(a) {
                if (a) {
                    try {
                        var b = Ud(new Uint8Array(a.message), So)
                    } catch (c) {
                        Mo(this.g, "Found unparsable message");
                        return
                    }
                    switch (E(b, 1, 0)) {
                        case 0:
                            this.o ? To(this, {
                                Kd: 1
                            }) : this.g.log("Cancelling scheduled pong - Socket closed.");
                            break;
                        case 1:
                            this.O = new Date;
                            break;
                        case 2:
                            this.u.set({
                                clientId: Cc(b, 3),
                                Fd: Cc(b, 4)
                            });
                            break;
                        case 3:
                            b = F(b, oe, 2);
                            a = this.nd.Ze;
                            if ("m" == b.getTypeName()) {
                                if (Array.isArray(jc(b, 2))) throw Error("z");
                                b = nc(b, 2);
                                b = null == b ? Ab() : b;
                                b = (b = Cb(b)) ? new Uint8Array(b) : wb();
                                a =
                                    a(b)
                            } else a = null;
                            a && Po(this.i, 1, a)
                    }
                } else Mo(this.g, "Received empty message.")
            }
        },
        Uo = new Ro;
    var ap = class extends $o {
        constructor(a) {
            super(a.nd, a.mf);
            let b;
            this.Ud = null != (b = a.Ud) ? b : !1
        }
        connect(a) {
            const b = this;
            return r(function*() {
                b.address = a;
                b.j = Go();
                b.g.log("Websocket Client: connecting to " + a);
                b.open(a);
                yield b.j.promise;
                b.g.log("Websocket Client: connected to " + a)
            })
        }
        va() {
            const a = this.Ud ? ro("WS_SERVER_CLIENT_KEY", void 0, Lo) : void 0;
            To(this, {
                Kd: 2,
                Fd: a
            })
        }
        onReady(a) {
            this.Ud && so("WS_SERVER_CLIENT_KEY", a.Fd, Lo);
            super.onReady(a);
            if (!this.j) throw Error("R`" + this.address);
            Io(this.j)
        }
        onError(a) {
            super.onError(a);
            this.g.error(`Error connecting to ${this.address}: ${a.message}`);
            if (!this.j) throw Error("S`" + this.address);
            Jo(this.j)
        }
        v(a) {
            this.g.log("WebSocket client closed: " + a);
            super.v();
            this.j = void 0
        }
        H() {
            this.v(1005)
        }
    };

    function bp(a) {
        Ii.call(this);
        a || (a = {});
        this.o = 0 != a.Re;
        this.g = a.Cg || cp;
        this.u = a.binaryType || "blob";
        this.i = this.g(this.kd)
    }
    ta(bp, Ii);
    q = bp.prototype;
    q.Xb = null;
    q.yd = null;
    q.jd = void 0;
    q.we = !1;
    q.kd = 0;
    q.Hc = null;

    function cp(a) {
        return Math.min(1E3 * Math.pow(2, a), 6E4)
    }
    q.open = function(a, b) {
        null != this.Hc && t.clearTimeout(this.Hc);
        this.Hc = null;
        this.yd = a;
        this.Xb = (this.jd = b) ? new WebSocket(this.yd, this.jd) : new WebSocket(this.yd);
        this.Xb.binaryType = this.u;
        this.Xb.onopen = qa(this.Xf, this);
        this.Xb.onclose = qa(this.Uf, this);
        this.Xb.onmessage = qa(this.Wf, this);
        this.Xb.onerror = qa(this.Vf, this)
    };
    q.close = function() {
        null != this.Hc && t.clearTimeout(this.Hc);
        this.Hc = null;
        this.Xb && (this.we = !0, this.Xb.close(), this.Xb = null)
    };
    q.Xf = function() {
        this.dispatchEvent("d");
        this.kd = 0;
        this.i = this.g(this.kd)
    };
    q.Uf = function(a) {
        this.dispatchEvent(new dp(a.code, a.reason, a.wasClean));
        this.Xb = null;
        this.we ? (this.yd = null, this.jd = void 0) : this.o && (this.Hc = Cj(qa(this.open, this, this.yd, this.jd), this.i, this), this.kd++, this.i = this.g(this.kd));
        this.we = !1
    };
    q.Wf = function(a) {
        this.dispatchEvent(new ep(a.data))
    };
    q.Vf = function(a) {
        this.dispatchEvent(new fp(a.data))
    };
    q.Bb = function() {
        bp.Rb.Bb.call(this);
        this.close()
    };

    function dp(a, b, c) {
        ii.call(this, "a");
        this.code = a;
        this.reason = b;
        this.wasClean = c
    }
    ta(dp, ii);

    function ep(a) {
        ii.call(this, "c");
        this.message = a
    }
    ta(ep, ii);

    function fp(a) {
        ii.call(this, "b");
        this.data = a
    }
    ta(fp, ii);
    const gp = {
            opened: "d",
            closed: "a",
            message: "c",
            error: "b"
        },
        hp = {
            opened: a => a,
            error: a => a,
            message: a => b => {
                a(b)
            },
            closed: a => () => {
                a()
            }
        };

    function Zo(a, b, c) {
        zi(a.ob, gp[b], hp[b](c))
    }
    var Fo = class extends ap {
        constructor(a) {
            super(a);
            let b;
            this.ob = new bp({
                Re: null != (b = a.Re) ? b : !1,
                binaryType: "arraybuffer"
            })
        }
        H() {
            this.ob.close();
            super.H()
        }
    };

    function ip(a) {
        return r(function*() {
            return Eo(a)
        })
    };

    function jp(a, b) {
        return r(function*() {
            il(b.Gc ? "Reconnecting" : "Connecting", "to GameServer.");
            const c = yield ip(b.Yc), d = new kp(c, a, b);
            var e = Bo(b, kl("Get hyped for Halloween 2021HAT", null));
            e = wo(new no, e);
            Wo(c, e);
            return d
        })
    }

    function lp(a, b, c) {
        return r(function*() {
            il("Connecting to game (existing socket).");
            return new kp(c, a, b)
        })
    }

    function mp(a) {
        return r(function*() {
            return a.j.promise
        })
    }
    var kp = class extends zo {
        constructor(a, b, c) {
            super();
            this.ob = a;
            this.g = b;
            this.connectionInfo = c;
            this.u = !1;
            this.j = Go();
            Xo(this.ob, 1, this.H.bind(this));
            Xo(this.ob, 2, this.v.bind(this));
            Xo(this.ob, 3, this.onError.bind(this))
        }
        H(a) {
            for (const c of xc(a, Xm, 1)) switch (c.getType()) {
                case 2:
                    console.log("handshake!");
                    a = F(c, Fm, 5);
                    var b = a.getId();
                    np(this.g.match.g, b);
                    so("halloween21.client.match_config", {
                        url: this.connectionInfo.Yc,
                        player: b,
                        match: Cc(a, 2),
                        nonce: Bc(jc(a, 3), 0),
                        timestamp: Date.now()
                    }, uo);
                    il("Server: " + Cc(a,
                        4));
                    qk(12);
                    void 0 !== this.connectionInfo.Gc && S(112);
                    Io(this.j);
                    break;
                case 5:
                    a = F(c, Em, 8);
                    b = this.g.match;
                    b.vb = Fc(a, 1);
                    b.Fb || (qk(14), b.Fb = !0);
                    break;
                case 4:
                    op(this.g, F(c, Om, 7));
                    break;
                case 8:
                    Dc(F(c, Rm, 11), 7) && (this.u = !0);
                    a = F(c, Rm, 11);
                    this.g.match.update(a);
                    break;
                case 6:
                    a = F(c, Vm, 9);
                    pp(this.g.match, a);
                    break;
                case 7:
                    a = F(c, Wm, 10);
                    (a = qp(this.g.match.g, a.getId())) && a.va();
                    break;
                case 10:
                    a = F(c, Cm, 13);
                    rp(this.g.match.g, a);
                    break;
                case 9:
                    a = F(c, Im, 12);
                    qp(this.g.match.g, a.getId()).input = a;
                    break;
                case 11:
                    a = F(c, Sm, 14);
                    (b =
                        qp(this.g.match.g, a.getId())) ? b.mc(a): dl(`Physics update for unknown entity: ${a.getId()}`);
                    break;
                case 12:
                    a = F(c, Um, 15);
                    sp(this.g.match, xc(a, Km, 1));
                    break;
                case 15:
                    S(111), so("halloween21.client.match_config", null)
            }
        }
        v() {
            il("Close.");
            this.u || (void 0 !== this.connectionInfo.Gc && !this.j.g || this.g.H(), this.j.g ? console.error("Lost connection to GameServer.") : Jo(this.j, "Failed to connect to GameServer."))
        }
        onError(a) {
            dl("Error:", a);
            void 0 === this.connectionInfo.Gc && S(110)
        }
        sendMessage(a) {
            Wo(this.ob, a)
        }
    };

    function qg(a, b) {
        return B(a, 1, b)
    }

    function pg(a, b) {
        return B(a, 2, b)
    }

    function og(a, b) {
        return B(a, 3, b)
    }
    var rg = class extends H {
            constructor(a) {
                super(a)
            }
        },
        tg = [rg, 1, he, 2, he, 3, he];
    var tp = class extends H {
        constructor(a) {
            super(a)
        }
    };
    /*

    Math.uuid.js (v1.4)
    http://www.broofa.com
    mailto:robert@broofa.com
    Copyright (c) 2010 Robert Kieffer
    Dual licensed under the MIT and GPL licenses.
    */
    const up = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
        vp = /^mtch-\w+-\d+-HALLOWEEN_PRIVATE$/;
    var wp = class {
        constructor(a, b, c) {
            this.ob = a;
            this.connectionInfo = b;
            b = Bo(b, c);
            b = wo(new no, b);
            Wo(a, b)
        }
        join(a, b) {
            return new Promise((c, d) => {
                Xo(this.ob, 1, e => {
                    for (const f of xc(e, Xm, 1)) switch (f.getType()) {
                        case 16:
                            let g, h;
                            a(null != (h = null == (g = F(f, Jm, 17)) ? void 0 : Bc(jc(g, 1), 0)) ? h : 1);
                            break;
                        case 17:
                            this.ob.i.removeListener(1, void 0);
                            this.ob.i.removeListener(2, void 0);
                            c({
                                ob: this.ob,
                                connectionInfo: this.connectionInfo
                            });
                            break;
                        case 18:
                            b();
                            break;
                        default:
                            console.log("Unexpected message", f.getType())
                    }
                });
                Xo(this.ob, 2,
                    () => {
                        d()
                    })
            })
        }
        start() {
            var a = new no;
            var b = new Xm;
            b = B(b, 1, 17);
            a = wo(a, b);
            Wo(this.ob, a)
        }
    };
    const xp = new we(xe, ".cloud.doodles.goog"),
        yp = new we(xe, "gs."),
        zp = new we(xe, "wss");

    function Ap(a) {
        a = vf(a);
        return a.o === ze(zp) && a.j.startsWith(ze(yp)) && a.j.endsWith(ze(xp)) && !a.v && "" === a.g.toString() && null == a.H ? !0 : !1
    };
    var sg = {
        DEFAULT: {
            name: "DEFAULT",
            Pc: 2
        },
        vg: {
            name: "PETANQUE_SINGLES",
            Pc: 2
        },
        og: {
            name: "PETANQUE_DOUBLES",
            Pc: 4
        },
        rg: {
            name: "PETANQUE_PRIVATE_SINGLES",
            Pc: 1
        },
        qg: {
            name: "PETANQUE_PRIVATE_DOUBLES",
            Pc: 1
        },
        Yd: {
            name: "HALLOWEEN",
            Pc: 8
        },
        xf: {
            name: "HALLOWEEN_PRIVATE",
            Pc: 1
        }
    };

    function Bp() {
        Cp || (Cp = new Dp);
        return Cp
    }

    function Ep(a) {
        B(a.g, 3, a.i);
        so("halloween21.client.replay", a.g.Qd());
        pk("d3", E(a.g, 1, 1))
    }

    function Fp(a) {
        if (!a) return !1;
        switch (E(a, 1, 1)) {
            case 1:
                return !0;
            case 2:
            case 3:
                var b = F(a, rg, 2);
                if (!b) return !1;
                a = Cc(b, 2);
                b = Cc(b, 1) || "";
                return (up.test(b) || "local-match-id" === b || vp.test(b)) && a && Ap(a) ? !0 : !1;
            default:
                return !1
        }
    }

    function Gp(a) {
        if (!a.i) return null;
        const b = a.i.indexOf("_");
        if (0 > b) return null;
        a = a.i.substr(b + 1);
        if (!a) return null;
        let c;
        try {
            var d = qb(a);
            c = Ud(d, tg)
        } catch (e) {
            return null
        }
        d = new tp;
        B(d, 1, 2);
        yc(d, 2, c);
        return Fp(d) ? d : null
    }
    var Dp = class {
            constructor() {
                this.i = vf(window.location.href).g.get("doodle");
                var a;
                b: if (a = ro("halloween21.client.replay", null)) {
                    try {
                        if (null == a || "" == a) var b = new tp;
                        else {
                            var c = JSON.parse(a);
                            if (!Array.isArray(c)) throw Error(void 0);
                            var d = Lb(c);
                            Kc = d;
                            const e = new tp(d);
                            Kc = null;
                            b = e
                        }
                    } catch (e) {
                        a = null;
                        break b
                    }
                    a = Fp(b) ? b : null
                } else a = null;
                a = Fp(a) && jc(a, 3) === this.i ? a : null;
                a || (a = Gp(this), a || (a = new tp, B(a, 1, 1)));
                this.g = a;
                Ep(this)
            }
            set(a, b) {
                B(this.g, 1, a);
                yc(this.g, 2, b);
                Ep(this)
            }
        },
        Cp;

    function Hp(a) {
        return a.g[Math.min(a.g.length - 1, a.u)]
    }

    function Ip(a, b) {
        a.g = b;
        a.u = 0;
        a.i = 0
    }
    var Jp = class {
        constructor(a) {
            this.g = a;
            this.u = 0;
            this.o = !0;
            this.i = 0;
            this.j = this.loop = !0;
            this.Vb = 0;
            this.point = new P(0, 0);
            this.opacity = 1
        }
        Ha(a, b) {
            this.point.x = a;
            this.point.y = b
        }
        wb() {
            return this.point
        }
        update(a) {
            this.o && 1 !== this.g.length + this.Vb && (this.loop || this.u !== this.g.length + this.Vb + this.Vb - 1) && (this.i += a, this.u = Math.floor(this.i % (1E3 / 24 * (this.g.length + this.Vb)) / 1E3 * 24) % (this.g.length + this.Vb))
        }
        render(a = 0, b = 0, c, d = 0, e = !1, f = 1, g, h) {
            h = void 0 !== h ? h : this.opacity;
            const k = Hp(this);
            g = void 0 !== g ? g : f;
            this.j && void 0 !==
                c ? Al(k, a + this.point.x, b + this.point.y, c, d, e, f, g, h) : zl(k, a + this.point.x, b + this.point.y, c, d, e, f, g, h)
        }
        play() {
            this.o || (this.i = 0, this.o = !0)
        }
        stop() {
            this.o = !1
        }
        setLoop(a) {
            this.loop = a
        }
    };
    var Kp = class {
        constructor() {
            this.Ka = new Jp(Zh);
            this.status = 1
        }
        render(a, b, c, d) {
            Al(Hp(this.Ka), a, b, 2, c, !1, 1, 1, d, fh.Va())
        }
        update(a) {
            this.Ka.update(a)
        }
    };
    var Lp = class {
            constructor() {
                const a = Array(256);
                for (var b = 0; b < a.length; ++b) a[b] = b;
                for (b = a.length - 1; 0 < b; --b) {
                    const c = Math.floor(Math.random() * a.length),
                        d = a[b];
                    a[b] = a[c];
                    a[c] = d
                }
                this.g = a.concat(a)
            }
        },
        Mp;
    const Np = (a, b, c, d) => {
        a &= 15;
        const e = 8 > a ? b : c;
        b = 4 > a ? c : 12 === a || 14 === a ? b : d;
        return (0 === (a & 1) ? e : -e) + (0 === (a & 2) ? b : -b)
    };

    function Op(a, b) {
        E(a.state, 1, 0) !== b && B(a.state, 1, b)
    }
    var Pp = class extends on {
        constructor(a, b, c, d, e = !0) {
            super(a, b, c);
            this.Xa = d;
            this.i = null;
            this.state = new um;
            Op(this, 1);
            B(this.state, 2, !0);
            this.Rc(null);
            e && (a = new Zn, a.type = 2, a.position.set(this.g.x, this.g.y), this.body = bo(d.o, a), this.body.Xe = this, d = new ao, d.j = !0, d.i = 1E-4, d.H = .1, d.g = Xn(1, 1), d.filter.g = 16, d.filter.i = 64, co(this.body, d))
        }
        V(a) {
            (a = (this.state = a) && Fc(a, 3)) ? this.i = this.Xa.j.get(a) || null: this.i = null
        }
        isVisible() {
            return 4 !== E(this.state, 1, 0)
        }
        Rc(a) {
            (this.i = a) ? this.state.Rc(a.getId()): oc(this.state,
                3)
        }
        O(a) {
            const b = this.body.ta.position,
                c = dn(a.body.ta.position);
            c.x -= b.x;
            c.y -= b.y;
            en(c, this.j());
            ln(this.body, c);
            this.angle = a.angle
        }
        j() {
            return +jn(this, "collectible_trail_speed")
        }
        update() {}
    };
    var Rp = class extends Pp {
        constructor(a, b, c, d, e = !1) {
            super(a, b, c, d, e);
            this.Qa = e;
            this.Na = new Kp;
            this.opacity = 0;
            this.Rd = 1;
            this.o = this.u = null;
            this.v = {
                x: 0,
                y: 0
            };
            this.wa = new Jp(Wh);
            this.Ia = new Jp(ei);
            this.u = new Pl([new W(new X({
                opacity: 0
            }, {
                opacity: 1
            }, 242, Zl), f => {
                this.opacity = f.opacity
            }), new Ll(() => {
                this.u = null
            })]);
            this.Ba = {
                radius: 7,
                Fe: 0,
                Wa: 1,
                Nd: 1E3 * Math.random(),
                Jd: !1,
                visible: !0
            }
        }
        va() {
            this.o = new Ql([new W(new X({
                opacity: 1
            }, {
                opacity: 0
            }, 750, am), a => {
                this.opacity = a.opacity
            }), new W(new X({
                    Rd: 1
                }, {
                    Rd: 5
                }, 2E3, am),
                a => {
                    this.Rd = a.speedMultiplier
                })])
        }
        Pe() {
            return !!this.o && this.o.g()
        }
        update(a) {
            this.o ? this.o.update(a) : this.u && this.u.update(a);
            var b = this.Na,
                c = E(this.state, 1, 0);
            if (b.status !== c) {
                b.status = c;
                switch (c) {
                    case 2:
                        Ip(b.Ka, Xh);
                        break;
                    case 3:
                        Ip(b.Ka, Yh);
                        break;
                    default:
                        Ip(b.Ka, Zh)
                }
                b.Ka.play()
            }
            this.Na.update(a);
            this.wa.opacity = this.opacity;
            this.Ia.opacity = this.opacity;
            this.wa.update(a);
            this.Ia.update(a)
        }
        render() {
            this.isVisible() && (this.Na.render(this.g.x, this.g.y, this.angle, this.opacity), this.i && Qp(this.i) && (this.wa.render(this.g.x,
                this.g.y, 2), this.Ia.render(this.g.x, this.g.y, 2)))
        }
        V(a) {
            const b = this.i;
            super.V(a);
            (a = this.i) && a.i && (!b || !b.i) && a.i && a.Ba - a.df >= Jg && (Q.he.play(), a.df = a.Ba)
        }
        Rc(a) {
            super.Rc(a);
            a && a.i && Q.he.play()
        }
        O(a, b) {
            this.Qa ? super.O(a, b) : (b = a.g, this.v.x = this.j() * (b.x - this.g.x), this.v.y = this.j() * (b.y - this.g.y), this.angle = a.angle)
        }
        H() {
            this.Qa ? super.H() : (this.g.x += 16 * this.v.x / 1E3, this.g.y += 16 * this.v.y / 1E3)
        }
        mc(a) {
            this.Qa ? super.mc(a) : Dc(a, 6) && (this.g.x = Ec(a, 2), this.g.y = Ec(a, 3))
        }
        j() {
            return this.Rd * super.j()
        }
        Ae() {
            this.Ba.Wa =
                2 === E(this.state, 1, 0) ? 1 : 2;
            this.Ba.visible = 2 === E(this.state, 1, 0) || 3 === E(this.state, 1, 0);
            return this.Ba
        }
    };
    var Sp = class {
        render(a, b) {
            a.save();
            0 > b ? (b = U("countdown_get_ready"), a.textAlign = "center", a.font = `${K?45:60}px ${Og}`, a.fillStyle = "#700", a.fillText(b, 0, 0), a.strokeStyle = "#F93", a.strokeText(b, 0, 0)) : (Bl(nh, a, 0, 0), a.textAlign = "center", a.textBaseline = "middle", fh.Va(), a.font = `${.75*nh[3]}px ${Og}`, a.fillStyle = "#000", a.fillText(`${b}`, 0, 0));
            a.restore()
        }
    };
    var Tp = class {};
    class Up extends Tp {
        constructor(a, b, c) {
            super();
            this.text = a;
            this.V = b;
            this.va = c;
            this.offsetX = 1
        }
        j() {
            return -1
        }
        cancel() {}
        Ta(a) {
            this.offsetX = a.offsetX
        }
        render(a) {
            fh.Va();
            var b = oh[3];
            var c = this.V - b / 2;
            c += this.offsetX * c;
            const d = this.va;
            a.save();
            Bl(oh, a, c + b / 2, d);
            var e = this.v();
            if (e) {
                fh.Va();
                var f = e[3];
                fh.Va();
                Bl(e, a, c, d, f / 2, e[4] / 2);
                a.textAlign = "center";
                a.textBaseline = "middle";
                a.fillStyle = "#000";
                e = Hl(a, this.text, Og, 24, 16, b - f / 4, 2);
                f = 1.25 * e.fontSize;
                Jl(a, e, c + b / 2 + 20, d - e.lines.length * f / 2 + f / 2, f)
            }
            a.restore()
        }
    }
    var Wp = class extends Up {
            constructor(a, b, c, d) {
                super(a, c, d);
                this.action = Vp(this, b)
            }
            u() {
                return this.action.g()
            }
            update(a) {
                this.action.update(a)
            }
        },
        Zp = class extends Up {
            constructor(a) {
                super(a, 0, 0);
                this.o = !1;
                this.O = Xp(this);
                this.H = Yp(this)
            }
            u() {
                return this.H.g()
            }
            update(a) {
                this.O.g() ? this.o && !this.H.g() && this.H.update(a) : this.O.update(a)
            }
        };
    var $p = class {
        constructor(a, b, c, d, e) {
            this.x = a;
            this.y = b;
            this.width = c;
            this.height = d;
            this.j = e;
            this.body = null;
            this.i = new Zn;
            this.i.type = 0;
            this.i.position.set(a, b);
            this.g = new ao;
            this.g.H = .1;
            this.g.i = 1E3;
            this.g.g = Xn(c, d);
            this.g.filter.g = 256;
            this.g.filter.i = 1
        }
        open() {
            this.body && (nn(this.j, this.body), this.body = null)
        }
        close() {
            this.body || (this.body = bo(this.j, this.i), this.body.Xa = this, co(this.body, this.g))
        }
        render(a) {
            if (this.body) {
                a.save();
                a.fillStyle = "#000";
                var b = this.x - this.width,
                    c = this.y - this.height,
                    d = 2 * this.width,
                    e = 2 * this.height;
                b = vl(yl, b);
                c = wl(yl, c);
                d *= yl.g;
                e *= yl.g;
                O.fillRect(b, c, d, e);
                a.restore()
            }
        }
    };

    function aq(a) {
        const b = N.getContext("2d");
        b.textAlign = a.j;
        b.textBaseline = "middle";
        return Hl(b, a.text, a.fontFamily, a.fontSize, Math.round(a.fontSize / 4), a.v, a.H, a.fontStyle)
    }

    function bq(a, b, c = 3) {
        a.u = c;
        a.o = b
    }
    var cq = class {
        constructor(a, b, c, d = 1) {
            this.fontSize = b;
            this.v = c;
            this.H = d;
            this.fontFamily = Og;
            this.point = new P(0, 0);
            this.fontStyle = "";
            this.g = "#fff";
            this.o = null;
            this.j = "center";
            this.u = 3;
            this.text = U(a);
            this.i = aq(this)
        }
        Ha(a, b) {
            this.point.x = a;
            this.point.y = b
        }
        render(a) {
            a.save();
            null != this.o && (a.strokeStyle = this.o, a.lineWidth = this.u);
            a.fillStyle = this.g;
            a.textAlign = this.j;
            a.textBaseline = "middle";
            Jl(a, this.i, this.point.x, this.point.y - this.i.fontSize * (this.i.lines.length - 1) / 2, .85 * this.fontSize, !!this.o);
            a.restore()
        }
    };

    function dq(a, b, c, d) {
        return new eq([a, b, a + c, b, a + c, b + d, a, b + d])
    }

    function fq(a, b, c) {
        b -= a.g[0];
        c -= a.g[1];
        if (0 != b || 0 != c)
            for (let d = 0; d < a.g.length - 1; d += 2) a.g[d] += b, a.g[d + 1] += c
    }
    var eq = class extends Fl {
        constructor(a) {
            super();
            this.g = a
        }
        contains(a, b) {
            const c = this.g;
            if (6 > c.length) return !1;
            let d = !1;
            for (let e = 0, f = c.length - 2; e < c.length; f = e, e += 2) {
                const g = c[e],
                    h = c[e + 1],
                    k = c[f],
                    l = c[f + 1];
                a < g != a < k && b > h + (a - g) * (l - h) / (k - g) && (d = !d)
            }
            return d
        }
    };
    var jq = (a, b) => r(function*() {
        const c = "string" === typeof a ? a : a.value;
        var d;
        if (!(d = yield gq(c)))
            if (Tf) {
                "string" === typeof a ? (hq || (hq = document.createElement("input"), hq.readOnly = !0, cg(hq, "position", "absolute", "opacity", 0, "left", 0, "top", 0, "pointerEvents", "none"), document.body.appendChild(hq)), hq.value = a, d = hq) : d = a;
                d !== document.activeElement && d.focus();
                const f = d.contentEditable,
                    g = d.readOnly;
                d.contentEditable = "true";
                d.readOnly = !1;
                const h = document.createRange();
                h.selectNodeContents(d);
                const k = window.getSelection();
                k.removeAllRanges();
                k.addRange(h);
                try {
                    d.select(), d.setSelectionRange(0, d.value.length)
                } catch (l) {}
                d.contentEditable = f;
                d.readOnly = g;
                try {
                    var e = Tf("copy")
                } catch (l) {
                    e = !1
                }
                window.getSelection().removeAllRanges();
                d.blur();
                b && b !== document.activeElement && b.focus();
                hq && hq.remove();
                d = e
            } else d = !1;
        return d || (yield iq()) && (yield gq(c)) ? Promise.resolve() : Promise.reject()
    });
    const gq = a => r(function*() {
            return navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(a).then(() => !0, () => !1) : !1
        }),
        kq = a => r(function*() {
            switch (a.state) {
                case "granted":
                    return !0;
                case "denied":
                    return !1
            }
            return new Promise(b => {
                a.onchange = () => b(kq(a))
            })
        }),
        iq = () => r(function*() {
            return navigator.permissions && navigator.permissions.query ? kq(yield navigator.permissions.query({
                name: "clipboard-write"
            })) : !1
        });
    let hq = null;

    function lq(a) {
        gi.call(this);
        this.i = a;
        this.g = {}
    }
    ta(lq, gi);
    var mq = [];

    function nq(a, b, c, d, e) {
        Array.isArray(c) || (c && (mq[0] = c.toString()), c = mq);
        for (var f = 0; f < c.length; f++) {
            var g = wi(b, c[f], d || a.handleEvent, e || !1, a.i || a);
            if (!g) break;
            a.g[g.key] = g
        }
    }

    function oq(a) {
        re(a.g, function(b, c) {
            this.g.hasOwnProperty(c) && Gi(b)
        }, a);
        a.g = {}
    }
    lq.prototype.Bb = function() {
        lq.Rb.Bb.call(this);
        oq(this)
    };
    lq.prototype.handleEvent = function() {
        throw Error("T");
    };
    Object.freeze([]);
    Object.create(null);
    var pq = () => null != window.agsa_ext && null != window.agsa_ext.share;
    const qq = (a, b) => {
        const c = new mf;
        for (let d in b) c.add(d, b[d]);
        a = new gf(a);
        kf(a, c);
        return a.toString()
    };
    var rq = (a, b) => r(function*() {
        if (wg()) return Promise.reject();
        S(16);
        return jq(a, b)
    });
    fh.Va();
    (new Map).set(1, "#005c20").set(2, "#f6d4fb");
    (new Map).set(1, "#8bffb5").set(2, "#dc6dfb");
    const sq = L / 2,
        tq = K ? 225 : 15;
    (new Map).set(0, K ? new Gl(110, 790, 66) : new Gl(590, 346, 66)).set(2, K ? new Gl(270, 790, 80) : new Gl(738, 338, 80)).set(3, K ? new Gl(440, 790, 66) : new Gl(875, 346, 66)).set(1, K ? dq(140, 880, 270, 80) : dq(600, 440, 270, 80)).set(4, K ? dq(100, 530, 340, 170) : dq(560, 80, 340, 170)).set(5, dq(sq + 91, tq + 96, 122, 122)).set(6, dq(sq + 235, tq + 96, 122, 122)).set(7, dq(sq + 91, tq + 241, 122, 122)).set(8, dq(sq + 235, tq + 241, 122, 122)).set(9, dq(sq + 331, tq - 100, 102, 102));
    fh.Va();
    const uq = K ? 285 : 520,
        vq = K ? 93 : 47,
        wq = K ? 270 : 291,
        xq = K ? 2 : 7,
        yq = K ? -128 : -140,
        zq = K ? 115 : 106,
        Aq = K ? 100 : 105,
        Bq = K ? 255 : 715,
        Cq = K ? 642 : 125,
        Dq = K ? 101 : 615,
        Eq = K ? 834 : 353,
        Fq = (new Map).set(1, "#005c20").set(2, "#f6d4fb"),
        Gq = (new Map).set(1, "#8bffb5").set(2, "#dc6dfb"),
        Hq = L / 2,
        Iq = K ? 225 : 15,
        Jq = (new Map).set(0, K ? new Gl(425, 682, 50) : new Gl(892, 165, 50)).set(1, K ? new Gl(101, 811, 55) : new Gl(615, 346, 55)).set(2, K ? new Gl(247, 849, 68) : new Gl(738, 438, 68)).set(3, K ? new Gl(432, 811, 55) : new Gl(852, 346, 55)).set(4, dq(Hq + 91, Iq + 96, 122, 122)).set(5, dq(Hq +
            235, Iq + 96, 122, 122)).set(6, dq(Hq + 91, Iq + 241, 122, 122)).set(7, dq(Hq + 235, Iq + 241, 122, 122)).set(8, dq(Hq + 331, Iq - 100, 102, 102)),
        Kq = (new Map).set(1, "most_spirits_collected").set(2, "least_spirits_collected").set(3, "most_spirits_held_at_once").set(4, "most_spirits_held_at_end").set(5, "stole_most").set(6, "most_stolen_from").set(7, "most_team_bonus").set(10, "most_mega_flames").set(11, "fastest_to_max_powerups").set(12, "fewest_powerups"),
        Lq = (new Map).set(1, "most_spirits_collected_subtitle").set(2, "least_spirits_collected_subtitle").set(3,
            "most_spirits_held_at_once_subtitle").set(4, "most_spirits_held_at_end_subtitle").set(5, "stole_most_subtitle").set(6, "most_stolen_from_subtitle").set(7, "most_team_bonus_subtitle").set(10, "most_mega_flames_subtitle").set(11, "fastest_to_max_powerups_subtitle").set(12, "fewest_powerups_subtitle");

    function Mq(a) {
        const b = [...a.match.g.j.values()];
        b.sort((c, d) => Nq(d) - Nq(c));
        for (const c of b) {
            const d = c.Wa,
                e = Nq(c);
            c.i && (nk.s = e);
            a.O.set(d, (a.O.get(d) || 0) + e)
        }
        return b
    }

    function Oq(a, b, c) {
        if (b = Jq.get(b)) Pq(a.u, b, d => {
            "mouseup" === d && c()
        }), Qq(a.u, b)
    }

    function Rq(a) {
        for (const b of Jq.values()) Sq(a.u, b)
    }

    function Tq() {
        const a = kg("shortlink", `https://www.google.com/?doodle=${ug}`);
        return 0 === a.indexOf("//") ? `https:${a}` : a
    }

    function Uq() {
        return kg("share", "TODO(b/116542685): Default share message")
    }

    function Vq(a) {
        const b = Tq(),
            c = Uq(),
            d = Wk("share.png");
        Oq(a, 4, () => {
            S(16);
            rq(b, N).then(() => {
                hl(a.g, !0);
                setTimeout(() => {
                    hl(a.g, !1)
                }, 2E3)
            })
        });
        Oq(a, 5, () => {
            var e = b;
            wg() || (e = 0 == e.indexOf("//") ? "https:" + e : e, e = "text=" + encodeURIComponent(c + "\n" + e), df("http://twitter.com/intent/tweet?" + e), S(6))
        });
        Oq(a, 6, () => {
            var e = b;
            wg() || (e = 0 == e.indexOf("//") ? "https:" + e : e, e = qq("https://www.tumblr.com/widgets/share/tool", {
                canonicalUrl: e,
                posttype: "photo",
                title: c,
                content: d
            }), df(e), S(12))
        });
        Oq(a, 7, () => {
            var e = b;
            wg() || (e = 0 == e.indexOf("//") ?
                "https:" + e : e, e = qq("https://www.facebook.com/dialog/share", {
                    app_id: "738026486351791",
                    href: e,
                    hashtag: "#GoogleDoodle"
                }), df(e), S(5))
        });
        Oq(a, 8, () => {
            Rq(a);
            Wq(a);
            a.H = !1
        })
    }

    function Xq(a, b) {
        a.state = b;
        a.o = 0;
        switch (a.state) {
            case 1:
                Wq(a), qk(17), el(a.V, a.Ia)
        }
    }

    function Wq(a) {
        Oq(a, 0, () => {
            if (pq()) {
                var b = Tq(),
                    c = Uq();
                !wg() && pq() && (S(15), window.agsa_ext.share(c + " " + b, null))
            } else Rq(a), a.H = !0, Vq(a)
        });
        Oq(a, 2, () => {
            Rq(a);
            Xq(a, 4);
            S(4)
        });
        Pg || Oq(a, 1, () => {
            Rq(a);
            Xq(a, 3);
            S(113)
        });
        Oq(a, 3, () => {
            S(3);
            let b = google.doodle ? google.doodle.url : "";
            b && ig(b, !0)
        })
    }

    function Yq(a, b, c, d) {
        b.save();
        b.translate(c, 0);
        c = Fq.get(d);
        b.fillStyle = c;
        b.font = `56px ${Og}`;
        b.fillText(`${a.O.get(d)||0}`, 0, xq);
        b.font = `48px ${Og}`;
        let e = Aq;
        for (const f of a.Oa)
            if (f.Wa === d) {
                if (f.i) {
                    a = Gq.get(d);
                    b.fillStyle = a;
                    a = e - 47.5;
                    const g = a + 48,
                        h = e + 47.5,
                        k = h - 48;
                    b.beginPath();
                    b.moveTo(-49.5, a);
                    b.lineTo(49.5, a);
                    b.arc(49.5, g, 48, -Math.PI / 2, 0);
                    b.lineTo(97.5, k);
                    b.arc(49.5, k, 48, 0, Math.PI / 2);
                    b.lineTo(-49.5, h);
                    b.arc(-49.5, k, 48, Math.PI / 2, Math.PI);
                    b.lineTo(-97.5, g);
                    b.arc(-49.5, g, 48, Math.PI, 3 * Math.PI / 2);
                    b.fill();
                    b.fillStyle = c
                }
                a = jm(f.Na)[0];
                Bl(a, b, -45, e, 90, 90);
                f.Vc && Bl(kh, b, -72, e + 26);
                b.fillText(`${Nq(f)}`, 45, e);
                e += 95
            } b.restore()
    }
    var $q = class extends gi {
        constructor(a, b) {
            super();
            this.match = a;
            this.u = b;
            this.o = this.state = 0;
            this.O = new Map;
            this.H = !1;
            this.g = this.oa = this.j = null;
            this.i = a.Oa;
            this.ya = (a = this.i === a.g.g.Wa) ? Q.Hf : Q.Af;
            this.V = a ? Q.Gf : Q.zf;
            this.Ia = a ? 4363 : 6E3;
            this.Oa = Mq(this);
            this.Na = 1 === this.i ? I() ? ih : hh : 2 === this.i ? I() ? mh : lh : I() ? Uh : Th;
            1 === this.i ? (b = "alpha_team_wins", a = "#019d4b") : 2 === this.i ? (b = "bravo_team_wins", a = "#9a00d6") : (b = "draw", a = "#2c2b8f");
            b = new cq(b, 64, 360);
            b.Ha(uq, 264);
            b.g = a;
            this.Qa = b;
            this.v = new cq("host_private_match",
                40, 90, 2);
            this.v.g = "#3d4e93";
            this.v.Ha(Dq, Eq);
            this.vb = U(Kq.get(Zq(this.match, this.match.g.g.getId())) || "undefined_award");
            this.Xa = U(Lq.get(Zq(this.match, this.match.g.g.getId())) || "undefined_award_subtitle");
            this.Ea = I() ? rh : qh;
            this.Ba = document.getElementById("ddlDomRoot");
            this.g = document.createElement("div");
            this.g.classList.add("ddl-shareLinkCopied_");
            this.g.style.font = `28px ${Og}`;
            this.g.textContent = U("share_link_copied");
            this.oa = document.createElement("div");
            this.oa.classList.add("ddl-shareLinkContainer_");
            cg(this.oa, "width", "100%");
            this.oa.appendChild(this.g);
            this.Ba.appendChild(this.oa);
            qk(16);
            this.ya.play()
        }
        Bb() {
            super.Bb();
            this.ya.stop();
            this.V.stop();
            this.oa && (this.oa.remove(), this.oa = null)
        }
        render(a) {
            a.save();
            a.fillStyle = "#000";
            a.fillRect(0, 0, a.canvas.width, a.canvas.height);
            switch (this.state) {
                case 0:
                    Bl(this.Na, a, L / 2, Ig / 2);
                    this.Qa.render(a);
                    break;
                default:
                    Bl(this.Ea, a, L / 2, Ig / 2);
                    a.textAlign = "center";
                    a.textBaseline = "middle";
                    a.save();
                    a.translate(wq, vq);
                    Yq(this, a, yq, 2);
                    Yq(this, a, zq, 1);
                    a.restore();
                    Pg ||
                        this.v.render(a);
                    a.fillStyle = "#fff";
                    a.shadowColor = "#fff";
                    a.shadowOffsetX = 0;
                    a.shadowOffsetY = 0;
                    a.shadowBlur = 15;
                    var b = Hl(a, this.vb, Og, 50, 30, 200, 2);
                    Jl(a, b, Bq, Cq, 42);
                    a.shadowColor = "rgba(0, 120,255, .85)";
                    Jl(a, b, Bq, Cq, 42);
                    a.shadowBlur = 0;
                    a.fillStyle = "#001630";
                    var c = Hl(a, this.Xa, Og, 24, 12, 200, 2);
                    Jl(a, c, Bq, Cq + 40 * b.lines.length, 20);
                    this.H && (El(a), b = L / 2, c = Iq + Hh[4] / 2, Bl(Hh, a, b, c), Bl(Gh, a, b, c), fq(Jq.get(4), b - Gh[3] / 2, c - Gh[4] / 2), fq(Jq.get(5), b + 10, c - Gh[4] / 2), fq(Jq.get(6), b - Gh[3] / 2, c + 10), fq(Jq.get(7), b + 10, c + 10), b =
                        b + Hh[3] / 2 - Ih[3] / 2, c = Iq + Ih[4] / 2, Bl(Ih, a, b, c), fq(Jq.get(8), b - Ih[3] / 2, c - Ih[4] / 2), a.fillStyle = "#5977ab", a.textAlign = "center", a.textBaseline = "middle", this.j || (this.j = Hl(a, U("share"), Og, 48, 20, 320, 1)), Jl(a, this.j, L / 2, Iq + 416, this.j.fontSize))
            }
            a.restore()
        }
    };

    function ar(a, b) {
        a.Ea = b
    }

    function qp(a, b) {
        return a.H.get(b)
    }

    function br(a, b) {
        for (const f of a.H.values())
            if (f.update(b), f.Pe()) {
                var c = a,
                    d = f.getId(),
                    e = f.getType();
                const g = c.H.get(d);
                if (g) {
                    g.Wc() && c.V.delete(d);
                    switch (e) {
                        case 1:
                        case 2:
                            c.j.delete(d);
                            break;
                        case 16:
                            c.v.delete(d);
                            break;
                        case 4:
                            c.u.delete(d)
                    }
                    c.H.delete(d);
                    g.dispose(c);
                    c.Ea && c.Ea(d)
                }
                f.qe = !1
            }
    }

    function cr(a) {
        for (const b of a.V.values()) b.nc()
    }

    function dr(a, b) {
        a.H.set(b.getId(), b);
        b.Wc() && a.V.set(b.getId(), b);
        switch (b.getType()) {
            case 1:
            case 2:
                a.j.set(b.getId(), b);
                break;
            case 16:
                a.v.set(b.getId(), b);
                break;
            case 4:
                a.u.set(b.getId(), b)
        }
    }
    var fr = class {
        constructor(a) {
            this.o = a;
            this.H = new Map;
            this.V = new Map;
            this.j = new Map;
            this.v = new Map;
            this.u = new Map;
            this.Ba = 1;
            this.i = this.O = 0;
            this.Ea = null
        }
        wa(a) {
            this.O += a;
            for (this.i += a; 100 <= this.O && 16 <= this.i;) this.update(100), er(this.o), this.va(), this.O -= 100, this.i -= 16;
            for (; 16 <= this.i;) er(this.o), this.va(), this.i -= 16
        }
        update(a) {
            br(this, a);
            cr(this)
        }
        va() {
            for (const a of this.H.values()) a.H()
        }
        wake() {
            this.i = 0
        }
    };

    function np(a, b) {
        if (b = a.j.get(b)) a.g = b, a = a.g, a.i = !0, a.Kc.Jd = !0
    }

    function rp(a, b) {
        switch (E(b, 2, 0)) {
            case 1:
            case 2:
                var c = b.getId();
                a = a.j.get(c);
                if (c = b.getPlayerState()) {
                    b = a.state ? E(a.state, 4, 0) : 0;
                    var d = !(!a.state || !Dc(a.state, 12));
                    a.state = c;
                    a.state && null != jc(a.state, 16, !1) && (a.Vc = Dc(a.state, 16));
                    if (!a.V && null != jc(a.state, 21)) {
                        var e = Cc(a.state, 21);
                        e && ll.has(e) && (a.V = new gr(a, ll.get(e)[1], ll.get(e)[2]))
                    }
                    a.i && !d && a.state && Dc(a.state, 12) && Q.Cf.play();
                    a.j = [];
                    for (var f of kc(c, 9, 0, !1))(d = a.vb.v.get(f)) && a.j.push(d);
                    for (var g of xc(c, zm, 14)) switch (g.getType()) {
                        case 1:
                            hr(a,
                                Fc(g, 2));
                            break;
                        case 3:
                            f = a;
                            ir(f, new jr(Fc(g, 2), f.Oe, f.hg));
                            f.Hb = f.Oe;
                            f.i && Q.uf.play();
                            break;
                        case 2:
                            f = a;
                            d = Fc(g, 2);
                            ir(f, new kr(d));
                            f.i && (Q.vf.play(), ml("SPIRITS_COLLECTED", d));
                            break;
                        case 4:
                            f = a, ir(f, new lr(Fc(g, 2))), f.i && (Q.he.play(), ml("MEGA_FLAMES"))
                    }
                    for (var h of xc(c, xm, 13)) {
                        g = null;
                        switch (h.getType()) {
                            case 1:
                                g = a;
                                f = h;
                                e = V;
                                d = e.width / 2 + e.left + jn(g, "notice_offset_x");
                                e = .75 * e.height + e.top + jn(g, "notice_offset_y");
                                g = new mr(f.getType(), nr(E(f, 2, 0)), jn(g, "notice_duration_ms"), d, e);
                                break;
                            case 2:
                                g = new or(pr(E(h,
                                    2, 0)), jn(a, "notice_duration_ms"))
                        }
                        g && ir(a, g)
                    }
                    h = xc(c, wm, 15);
                    h.length && qr(a, h[h.length - 1].getType());
                    (a.state ? E(a.state, 4, 0) : 0) > b && (rr(a), sr(a))
                }
                break;
            case 16:
                h = b.getId();
                (h = a.v.get(h)) ? h.V(F(b, um, 4)): dl(`Collectible state update for unknown collectible: ${b.getId()}: ${E(F(b,um,4),1,0)}`);
                break;
            case 4:
                h = b.getId();
                h = a.u.get(h);
                a = F(b, tm, 5);
                h.state = a;
                break;
            case 32:
                h = qp(a, b.getId()), a = F(b, vm, 6), h.state = a
        }
    }
    var vr = class extends fr {
        constructor(a, b) {
            super(a);
            this.ya = b;
            this.g = null
        }
        update() {
            cr(this);
            if (this.g && tr(this.g)) {
                var a = new Im,
                    b = this.g.getId();
                B(a, 1, b);
                B(a, 2, 0);
                B(a, 3, 0);
                B(a, 4, !1);
                b = this.ya.j;
                fn(b) && (gn(b), en(b, (Ec(this.g.state, 2) || 0) * this.ya.u), B(a, 2, b.x), B(a, 3, b.y), B(a, 4, !0));
                this.g.input = a;
                this.g.oe()
            }
        }
        wa(a) {
            super.wa(a);
            this.update(a);
            br(this, a);
            for (var b of this.j.values())
                if (b !== this.g)
                    for (var c of b.j) c.H();
            for (var d of this.u.values()) d.H();
            a = this.ya;
            if (a.g) {
                c = a.gamepad;
                if (navigator.getGamepads) {
                    d =
                        navigator.getGamepads();
                    b = !1;
                    for (var e of d)
                        if (e && e.connected) {
                            if (e.axes) {
                                d = e.axes[0];
                                let f = e.axes[1];
                                .1 > Math.abs(d) && (d = 0);
                                .1 > Math.abs(f) && (f = 0);
                                b = 0 !== d || 0 !== f;
                                e = c.g;
                                e.u || (c = 72.5 * d, d = 72.5 * f, e.g = {
                                    x: 0,
                                    y: 0
                                }, e.i = {
                                    x: c,
                                    y: d
                                }, e.j = Y(c, d), e.o = ur(Math.min(1, fn(e.j) / 5256.25)))
                            }
                            break
                        }
                } else b = !1;
                if (b || a.O) a.o = b, a.j = a.gamepad.g.j, a.u = a.gamepad.g.o;
                a.O = b
            }
            for (const f of a.v) f();
            a.v = []
        }
        va() {
            for (const a of this.V.values()) a.H();
            for (const a of this.g.j) a.H()
        }
        wake() {
            super.wake();
            this.g.wake()
        }
    };
    fh.Va();

    function wr(a) {
        var b = xr(a);
        b = fl(a.g, b.width, b.height);
        return new Ui(a.g[3] * b, a.g[4] * b)
    }

    function yr(a) {
        const b = wr(a);
        a.j = dq(N.width / 2 - b.width / 2, N.height / 2 - b.height / 2, b.width, b.height);
        Pq(a.u, a.j, d => {
            "mouseup" === d && (Sq(a.u, a.j), a.v())
        });
        Qq(a.u, a.j);
        const c = document.createElement("canvas").getContext("2d");
        a.title = Hl(c, U("error_eek"), Og, 56, 20, .8 * b.width, 1);
        a.o = Hl(c, U("error_something_went_wrong"), Og, 48, 20, .8 * b.width, 1);
        a.i = Hl(c, U("error_try_again"), Og, 48, 20, b.width / 2, 1)
    }

    function xr(a) {
        return new Ui(Math.min(a.g[3], .8 * L), Math.min(a.g[4], .8 * Ig))
    }
    var zr = class {
        constructor(a, b) {
            this.u = a;
            this.v = b;
            this.g = Hh;
            this.i = this.o = this.title = this.j = null
        }
        render(a) {
            if (this.title && this.o && this.i) {
                a.save();
                El(a);
                a.translate(N.width / 2, N.height / 2);
                var b = xr(this);
                b = Bl(this.g, a, 0, 0, b.width, b.height);
                a.scale(b, b);
                var c = this.g[4];
                Bl(Fh, a, 0, 0);
                a.fillStyle = "#5977ab";
                a.textAlign = "center";
                a.textBaseline = "middle";
                Jl(a, this.title, 0, -c / 2 + 50, this.title.fontSize);
                Jl(a, this.o, 0, -c / 2 + 110, this.o.fontSize);
                Jl(a, this.i, 0, 150, this.i.fontSize);
                c = Ph[3];
                var d = Ph[4],
                    e = this.i;
                a.font =
                    e.fontStyle + " " + e.fontSize + "px " + e.fontFamily;
                let f = 0;
                for (let g = 0; g < e.lines.length; g++) {
                    const h = a.measureText(e.lines[g]).width;
                    f = Math.max(f, h)
                }
                Bl(Ph, a, f / 2 + 10 + b * c / 2, 150, b * c, b * d);
                a.restore()
            }
        }
    };
    var Ar = class {
        constructor() {
            this.g = new cq("times_up", 64, .75 * L, 3);
            this.g.Ha(0, 10);
            this.g.g = "#700";
            bq(this.g, "#F93");
            this.g.j = "center"
        }
        render(a, b) {
            a.save();
            if (0 >= b) {
                fh.Va();
                b = nh[4];
                fh.Va();
                var c = Oh[3];
                fh.Va();
                var d = Oh[4];
                Bl(nh, a, 0, b / 2);
                Bl(Oh, a, 0, b / 2, c / 2, d / 2);
                a.translate(0, 0);
                this.g.render(a)
            } else a.translate(0, 0), a.textAlign = "center", a.font = `60px ${Og}`, a.fillStyle = "#700", a.fillText("" + b, 0, 0), a.strokeStyle = "#F93", a.strokeText("" + b, 0, 0);
            a.restore()
        }
    };
    var Cr = class {
        constructor() {
            this.g = new Br;
            this.i = !1;
            this.alpha = 1
        }
        reset() {
            this.g.reset();
            this.i = !1
        }
        render(a) {
            a.save();
            a.globalAlpha = this.alpha;
            this.g.render(a);
            a.restore()
        }
    };
    const ur = Vl(.39, .575, .565, 1);
    class Br {
        constructor() {
            this.g = {
                x: 0,
                y: 0
            };
            this.i = {
                x: 0,
                y: 0
            };
            this.j = Y(0, 0);
            this.o = 0;
            this.u = !1
        }
        reset() {
            this.g = {
                x: 0,
                y: 0
            };
            this.i = {
                x: 0,
                y: 0
            };
            this.j = Y(0, 0);
            this.o = 0;
            this.u = !1
        }
        render(a) {
            var b = N.width / 2;
            var c = N.height - (N.height - (V.height + V.top)) / 2;
            var d = this.i.x - this.g.x,
                e = this.i.y - this.g.y;
            a.save();
            zl(xh, b - 2, c + 8);
            zl(yh, b + Si(-72.5, d, 72.5), c + Si(-72.5, e, 72.5));
            a.restore()
        }
    }

    function Dr(a) {
        const b = N.getBoundingClientRect();
        return window.innerHeight > window.innerWidth ? {
            x: a.clientX - b.left,
            y: a.clientY - b.top
        } : {
            x: a.clientY - b.top,
            y: b.left - a.clientX
        }
    };

    function Er(a, b, c) {
        return c ? Promise.resolve(b) : a.hd(sg.xf).then(d => og(qg(pg(new rg, d.Yc), d.Fc), sg.Yd.name))
    };
    var Fr = class extends Fl {
        contains() {
            return !1
        }
    };

    function Pq(a, b, c) {
        a.i.push(new Gr(b, c))
    }

    function Qq(a, b) {
        let c = null;
        for (let d = 0; d < a.i.length; d++) a.i[d].i === b && (c = a.i[d]);
        c && (Wa(a.i, c), a.i.unshift(c))
    }

    function Sq(a, b) {
        for (let c = a.i.length - 1; 0 <= c; c--) a.i[c].i === b && a.i.splice(c, 1);
        a.g && b === a.g.i && (a.g = null, Hr(a));
        a.j && b === a.j.i && (a.j = null);
        Ir(a, "areamove", a.u, a.v)
    }

    function Jr(a) {
        var b = a.Ib.getBoundingClientRect();
        const c = a.o.Ld ? b.height : b.width;
        b = a.o.Ld ? b.width : b.height;
        const [d, e] = a.getSize();
        a.wa = d / c;
        a.V = e / b
    }

    function Hr(a) {
        var b = a.g && a.g.i.j() ? "pointer" : "default";
        for (const c of a.ya) cg(c, "cursor", b)
    }

    function Kr(a, b, c) {
        c = (b = (b = b.g) || window.event) ? (c = c || b.targetTouches && b.targetTouches[0] || b.changedTouches && b.changedTouches[0]) && void 0 !== c.pageX ? [c.pageX, c.pageY] : void 0 !== b.clientX ? [b.clientX + ("rtl" == document.dir ? -1 : 1) * (document.body.scrollLeft || document.documentElement.scrollLeft || 0), b.clientY + (document.body.scrollTop || document.documentElement.scrollTop || 0)] : void 0 !== b.pageX ? [b.pageX, b.pageY] : [0, 0] : [0, 0];
        b = a.Ib.getBoundingClientRect();
        if (a.o.Ld) {
            const d = b.right - c[0];
            c[0] = c[1] - b.top;
            c[1] = d
        } else c[0] -=
            b.left, c[1] -= b.top;
        c[0] *= a.wa;
        c[1] *= a.V;
        return c
    }

    function Ir(a, b, c, d) {
        if (!a.H && "mousedown" === b) {
            a.H = !0;
            for (var e = 0; e < a.O.length; e++) a.O[e]()
        }
        if ("mousedown" === b) {
            if (!a.j)
                for (b = 0; b < a.i.length; b++)
                    if (e = a.i[b], e.i.contains(c, d)) {
                        a.j = e;
                        a.g = e;
                        e.g("mousedown", c, d);
                        break
                    }
        } else if ("mouseup" === b) a.j ? (a.j.g("mouseup", c, d), a.j = null) : a.g && a.g.g("mouseup", c, d);
        else if ("mousemove" === b || "areamove" === b) {
            e = null;
            for (let f = 0; f < a.i.length; f++) {
                const g = a.i[f];
                if (g.i.contains(c, d)) {
                    e = g;
                    break
                }
            }
            a.g !== e && (a.g && a.g.g("mouseout", c, d), e && e.g("mouseover", c, d), a.g = e);
            if ("mousemove" ===
                b)
                for (a.j && a.j.g("mousemove", c, d), b = 0; b < a.i.length; b++) e = a.i[b], e !== a.j && e.i.contains(c, d) && e.g("mousemove", c, d)
        } else "mouseout" === b ? (a.g && a.g.g("mouseout", c, d), a.j = null, a.g = null) : "contextmenu" === b && a.g && a.g.g("contextmenu", c, d);
        Hr(a)
    }
    var Lr = class {
            constructor(a) {
                this.o = a;
                this.i = [];
                this.g = this.j = null;
                this.v = this.u = 0;
                this.va = this.H = !1;
                this.O = [];
                this.V = this.wa = 1;
                this.Ib = this.o.Ib;
                this.ya = [this.Ib];
                wi(window, "resize", () => {
                    Jr(this)
                });
                a = () => {
                    xi(window, "resize", () => {
                        Jr(this)
                    })
                };
                window.hasOwnProperty("screen") && window.screen.hasOwnProperty("orientation") && !Ef() ? wi(screen.orientation, "change", a) : wi(window, "orientationchange", a);
                Jr(this)
            }
            handleEvent(a) {
                Jr(this);
                var b = Kr(this, a),
                    c = b[1];
                this.u = b[0];
                this.v = c;
                a = a.type;
                this.va && 0 === a.indexOf("mouse") ||
                    (b = {
                        touchstart: "mousedown",
                        touchend: "mouseup",
                        touchmove: "mousemove"
                    }, a in b && (this.va = !0, a = b[a]), Ir(this, a, this.u, this.v))
            }
            getSize() {
                return this.Ib instanceof HTMLCanvasElement ? [this.Ib.width, this.Ib.height] : [Number(this.Ib.dataset.width), Number(this.Ib.dataset.height)]
            }
        },
        Mr = (() => {
            const a = new Fr;
            a.contains = () => !0;
            a.j = () => !1;
            return a
        })();
    class Gr {
        constructor(a, b) {
            this.i = a;
            this.g = b
        }
    };

    function Nr(a) {
        var b = window.agsa_ext;
        if (!a.V && !a.o && b && b.getPageVisibility) return "hidden" === b.getPageVisibility();
        b = document[a.o];
        return document[a.V] || "hidden" === b
    }

    function Or(a) {
        a.H ? Pr(a) : Ff() && !Ef() && Qr(a, () => {
            Pr(a)
        })
    }

    function Rr(a) {
        nq(a.va, document, "mousedown mouseout touchstart mouseup mousemove touchend touchmove contextmenu keypress keydown keyup".split(" "), () => {
            Sr(a)
        }, !0)
    }

    function Tr(a) {
        a.timeout && clearTimeout(a.timeout);
        a.timeout = setTimeout(() => {
            a.timeout = void 0;
            a.j = dg() - a.v >= a.O;
            a.j || Tr(a);
            Ur(a)
        }, Math.max(100, a.O - (dg() - a.v)))
    }

    function Sr(a) {
        a.v = dg();
        a.j = !1;
        Ur(a)
    }

    function Pr(a) {
        a.u = () => {
            a.i = Nr(a);
            a.i ? Ur(a) : Sr(a)
        };
        const b = window.agsa_ext;
        a.H ? document.addEventListener(a.H, a.u, !1) : b && b.registerPageVisibilityListener && (lg(() => {
            a.u && a.u()
        }), b.registerPageVisibilityListener("google.doodle.pvc();"))
    }

    function Qr(a, b) {
        window.agsa_ext ? b() : setTimeout(() => {
            Or(a)
        }, 100)
    }

    function Ur(a) {
        const b = a.i || a.j;
        a.g && !b ? (a.g = !1, a.ya(), Tr(a)) : !a.g && b && (a.g = !0, a.wa())
    }
    var Vr = class {
        constructor(a, b, c) {
            this.O = a;
            this.wa = b;
            this.ya = c;
            this.j = !1;
            this.u = () => {};
            this.v = dg();
            this.V = hg(document, "hidden");
            this.H = (this.o = hg(document, "visibilityState")) ? this.o.replace(/state$/i, "change").toLowerCase() : null;
            this.g = this.i = Nr(this);
            this.va = new lq;
            Or(this);
            Rr(this);
            Tr(this)
        }
        bc() {
            return !this.g
        }
    };
    class Wr {
        constructor(a, b) {
            this.j = a;
            this.u = b;
            this.i = {};
            this.g = document.getElementsByTagName("input")
        }
        handleEvent(a) {
            var b;
            if (b = a && a.j && this.u(a) && !a.ctrlKey && !a.metaKey && !a.altKey) {
                a: {
                    for (b = 0; b < this.g.length; b++)
                        if ("q" == this.g[b].name) {
                            b = this.g[b];
                            break a
                        } b = null
                }
                b = !(b && b == document.activeElement)
            }
            if (b && (!document.activeElement || !document.activeElement.tagName || "textarea" != document.activeElement.tagName.toLowerCase())) {
                this.o && Sr(this.o);
                b = a.g;
                var c = b.keyCode;
                c && ("keydown" == a.type ? this.i[c] || (this.j(a),
                    this.i[c] = !0) : "keyup" == a.type && (this.j(a), this.i[c] = !1), b.preventDefault && b.preventDefault(), b.stopPropagation && b.stopPropagation())
            }
        }
    };

    function Xr(a, b) {
        Pq(a.V, Mr, (d, e, f) => {
            switch (d) {
                case "mousedown":
                    window !== window.parent && window.focus();
                    a.g && (a.o = !0, Yr(a, e, f));
                    break;
                case "mousemove":
                    Yr(a, e, f);
                    break;
                case "mouseup":
                    Zr(a)
            }
        });
        const c = new Wr(d => {
            if ("keydown" === d.type) {
                if (a.g) {
                    a.i.set(d.keyCode, !0);
                    $r(a);
                    var e = ol();
                    d = d.keyCode;
                    192 === d ? (e.i && (e.j = !e.j), e.i = !0) : e.i = !1;
                    e.j && (e = e.o.get(d)) && e()
                }
            } else "keyup" === d.type && as(a, d)
        }, d => !!d.keyCode && !!Lg.get(d.keyCode));
        c.o = b;
        wi(document, ["keydown", "keyup", "keypress"], d => {
            c.handleEvent(d)
        }, !0)
    }

    function bs(a) {
        a.reset();
        a.g = !0;
        document.activeElement && document.activeElement.blur()
    }

    function cs(a) {
        a.g = !1;
        a.reset()
    }

    function Yr(a, b, c) {
        a.g && a.o && (a.j = Y(b - N.width / 2, c - N.height / 2), a.u = fn(a.j) ? 1 : 0)
    }

    function Zr(a) {
        a.g && a.v.push(() => {
            a.j = Y(0, 0);
            a.o = !1;
            a.u = 0
        })
    }

    function as(a, b) {
        a.g && a.v.push(() => {
            a.i.set(b.keyCode, !1);
            $r(a)
        })
    }

    function $r(a) {
        const b = Y(0, 0);
        (a.i.get(37) || a.i.get(65)) && b.x--;
        (a.i.get(39) || a.i.get(68)) && b.x++;
        (a.i.get(38) || a.i.get(87)) && b.y--;
        (a.i.get(40) || a.i.get(83)) && b.y++;
        a.H = 0 !== b.x || 0 !== b.y;
        a.j = b;
        a.u = a.H ? 1 : 0
    }

    function ds(a, b) {
        const c = b.g.changedTouches[0];
        if (!c) return null;
        a = Kr(a.V, b, c);
        return {
            x: a[0],
            y: a[1]
        }
    }
    var es = class {
        constructor(a, b, c) {
            this.V = a;
            this.gamepad = b;
            this.i = new Map;
            this.v = [];
            this.j = Y(0, 0);
            this.u = 1;
            this.g = this.O = this.o = this.H = !1;
            I() ? (wi(N, "touchstart", this.ya, void 0, this), wi(N, "touchmove", this.wa, void 0, this), wi(N, "touchend", this.va, void 0, this)) : Xr(this, c)
        }
        reset() {
            this.i.clear();
            this.v = [];
            this.j = Y(0, 0);
            this.u = 1;
            this.O = this.o = this.H = !1
        }
        ya(a) {
            if (this.g && ds(this, a)) {
                var b = this.gamepad;
                b.i = !0;
                b = b.g;
                b.g = Dr(a);
                b.i = b.g;
                this.o = b.u = !0
            }
        }
        wa(a) {
            if (this.g && ds(this, a) && this.o) {
                var b = this.gamepad;
                b.i &&
                    (b = b.g, b.i = Dr(a), b.j = Y(b.i.x - b.g.x, b.i.y - b.g.y), b.o = ur(Math.min(1, fn(b.j) / 5256.25)));
                this.j = this.gamepad.g.j;
                this.u = this.gamepad.g.o
            }
        }
        va(a) {
            this.g && ds(this, a) && this.v.push(() => {
                var b = this.gamepad,
                    c = b.g;
                c.g = {
                    x: 0,
                    y: 0
                };
                c.i = {
                    x: 0,
                    y: 0
                };
                c.o = 0;
                c.u = !1;
                b.i = !1;
                this.j = Y(0, 0);
                this.u = 0;
                this.o = !1
            })
        }
    };

    function fs(a) {
        return 50 < a.g && 2E3 > a.g ? new Promise(b => {
            setTimeout(b, 2E3 - a.g)
        }) : Promise.resolve()
    }
    var gs = class {
        constructor() {
            this.g = 0;
            const a = new Jp(bi);
            a.Ha(-100, 0);
            a.opacity = 0;
            const b = new Jp(bi);
            b.Ha(0, 0);
            b.opacity = 0;
            const c = new Jp(bi);
            c.Ha(100, 0);
            c.opacity = 0;
            this.i = [a, b, c];
            this.j = new Pl([new W(new X({
                opacity: 0,
                y: 0
            }, {
                opacity: 1,
                y: -15
            }, 500), d => {
                a.opacity = d.opacity;
                a.Ha(a.wb().x, d.y)
            }), new W(new X({
                opacity: 0,
                y: 0
            }, {
                opacity: 1,
                y: -15
            }, 500), d => {
                a.opacity = 1 - d.opacity;
                a.Ha(a.wb().x, -15 - d.y);
                b.opacity = d.opacity;
                b.Ha(b.wb().x, d.y)
            }), new W(new X({
                opacity: 0,
                y: 0
            }, {
                opacity: 1,
                y: -15
            }, 500), d => {
                b.opacity = 1 - d.opacity;
                b.Ha(b.wb().x, -15 - d.y);
                c.opacity = d.opacity;
                c.Ha(c.wb().x, d.y)
            }), new W(new X({
                opacity: 1,
                y: -15
            }, {
                opacity: 0,
                y: 0
            }, 500), d => {
                c.opacity = d.opacity;
                c.Ha(c.wb().x, d.y)
            })], !0)
        }
        render(a) {
            a.setTransform(1, 0, 0, 1, 0, 0);
            a.fillStyle = "#000";
            a.fillRect(0, 0, a.canvas.width, a.canvas.height);
            for (const b of this.i) b.render(a.canvas.width / 2, a.canvas.height / 2)
        }
    };

    function hs(a, b) {
        if (a = a.g[b]) a.xd && (clearTimeout(a.xd), a.xd = 0), a.lc && (a.lc.parentNode && a.lc.parentNode.removeChild(a.lc), a.lc = null), a.He = null, a.Xc = null
    }

    function is(a, b, c, d) {
        let e = a.g[b];
        if (e) {
            if (e.od) {
                c && c(e.od);
                return
            }
            if (e.xd) return
        } else e = {
            Xc: d,
            Of: b,
            lc: null,
            He: c,
            xd: 0,
            od: null
        };
        e.lc || (e.lc = document.createElement("script"));
        c = "c" + ++a.i;
        js[c] = function(f) {
            var g = zk(ks),
                h = e;
            h.od = f.id;
            h.od ? h.He && h.He(h.od) : h.Xc && h.Xc();
            hs(g, h.Of)
        };
        c = Ie({
            callback: "google.doodle.lsc." + c,
            url: b
        });
        Sf(e.lc, c);
        e.xd = setTimeout(() => {
            e.Xc && e.Xc();
            hs(zk(ks), b)
        }, 2E3);
        a.j.appendChild(e.lc);
        a.g[b] = e
    }
    class ks {
        constructor() {
            this.g = {};
            this.i = 0;
            this.j = document.body
        }
        reset() {
            for (const a in this.g) hs(this, a);
            this.g = {}
        }
    }
    const js = {};
    sa("google.doodle.lsc", js);
    const ng = Bp();
    fh.Va();
    const ls = I() ? 130 : 86;

    function ms(a) {
        cg(a.g, "textAlign", "center", "border", "none", "padding", "0", "background", "none", "font", `${a.fontSize}px sans-serif`, "pointerEvents", "auto");
        const b = ns();
        b.onclick = () => {
            rq(a.g.textContent, b).then(() => {
                hl(a.j, !0);
                setTimeout(() => {
                    hl(a.j, !1)
                }, 2E3)
            })
        };
        a.oa = document.createElement("div");
        a.oa.classList.add("ddl-shareLinkContainer_");
        a.oa.style.position = "absolute";
        a.va.appendChild(a.oa);
        a.oa.appendChild(b);
        a.oa.appendChild(a.g);
        a.oa.appendChild(a.j);
        a.H && (a.o = !0, a.H.then(c => {
            ng.set(a.V ? 3 : 2, c);
            const d = mg();
            is(zk(ks), d, e => {
                a.o = !1;
                a.g.textContent = 0 == e.indexOf("//") ? "https:" + e : e;
                os(a)
            }, () => {
                a.o = !1;
                a.g.textContent = 0 == d.indexOf("//") ? "https:" + d : d;
                os(a)
            })
        }))
    }

    function os(a) {
        var b = fl(a.i, .9 * L, a.i[4]),
            c = b * (a.i[3] - 48);
        const d = Math.floor(c / N.width * N.offsetWidth);
        b *= a.i[4] - 48;
        const e = Math.floor(b / N.height * N.offsetHeight),
            [f, g] = [Math.floor((a.wa[3] - c) / 2 / N.width * N.offsetWidth + N.offsetLeft), Math.floor((ls - b / 2) / N.height * N.offsetHeight + N.offsetTop)];
        !a.oa || a.oa.offsetLeft === f && a.oa.offsetTop === g && a.oa.offsetWidth === d && a.oa.offsetHeight === e || (a.fontSize = 48, cg(a.oa, "left", `${f}px`, "top", `${g}px`, "width", `${d}px`, "height", `${e}px`), cg(a.g, "fontSize", `${a.fontSize}px`));
        c = N.getContext("2d");
        c = Hl(c, a.g.textContent, "sans-serif", 48, 12, a.g.clientWidth, 1);
        cg(a.g, "fontSize", `${c.fontSize}px`)
    }
    var ps = class {
        constructor(a, b, c, d) {
            this.O = a;
            this.H = b;
            this.V = c;
            this.wa = d;
            this.fontSize = 48;
            this.oa = null;
            this.i = Qh;
            this.o = !1;
            this.u = 0;
            this.g = document.createElement("div");
            this.g.classList.add("ddl-shareLink_");
            this.va = document.getElementById("ddlDomRoot");
            this.j = document.createElement("div");
            this.j.classList.add("ddl-shareLinkCopied_");
            this.j.style.font = `28px ${Og}`;
            this.j.textContent = U("share_link_copied");
            this.v = new cq("share_invite_link", 24, .9 * L);
            this.v.g = "#ff8c00"
        }
        update(a) {
            this.u = (this.u + a / 150) %
                (2 * Math.PI)
        }
        dispose() {
            Sq(this.O, null);
            zk(ks).reset();
            this.oa && (this.oa.remove(), this.oa = null)
        }
        render(a) {
            var b = a.canvas.width;
            const c = b / 2;
            b = Bl(this.i, a, c, ls, .9 * b, this.i[4]);
            this.v.Ha(c, ls + b * this.i[4] / 2 + 24);
            this.v.render(a);
            os(this);
            this.o && (a.save(), a.strokeStyle = "#333", a.lineWidth = 4, a.beginPath(), a.arc(c, ls, b * this.i[4] / 4, this.u, this.u + Math.PI / 3), a.stroke(), a.restore())
        }
    };
    const ns = () => {
        const a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        a.classList.add("ddl-shareButton_");
        a.setAttribute("viewBox", "0 0 24 24");
        a.setAttribute("width", "24");
        a.setAttribute("height", "24");
        const b = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        b.setAttribute("cx", "12");
        b.setAttribute("cy", "12");
        b.setAttribute("r", "12");
        b.setAttribute("fill", "white");
        const c = document.createElementNS("http://www.w3.org/2000/svg", "path");
        c.setAttribute("transform", "translate(4, 4) scale(0.66)");
        c.setAttribute("d", "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z");
        a.appendChild(b);
        a.appendChild(c);
        return a
    };
    const qs = [{
            height: 86
        }, {
            height: 78,
            Vb: 12
        }, {
            height: 151,
            Vb: 12
        }, {
            height: 102
        }, {
            height: 106
        }, {
            height: 90,
            Vb: 18
        }, {
            height: 150,
            Vb: 6
        }, {
            height: 130
        }],
        rs = 1E3 / 24,
        ss = [a => new Ql([new W(new X({
            y: a.wb().y
        }, {
            y: a.wb().y - 8
        }, 12 * rs, Yl, !0, !0), b => {
            a.Ha(a.wb().x, b.y)
        }), new Pl([new W(new X({
            opacity: 0
        }, {
            opacity: 1
        }, 24 * rs, Yl), b => {
            a.opacity = b.opacity
        }), new Ol(16 * rs), new W(new X({
            opacity: 1
        }, {
            opacity: 0
        }, 11 * rs, Yl), b => {
            a.opacity = b.opacity
        }), new Ol(11 * rs)], !0)]), null, a => new Pl([new W(new X({
            opacity: 0
        }, {
            opacity: 1
        }, 16 * rs, Yl), b => {
            a.opacity =
                b.opacity
        }), new Ol(1250), new W(new X({
            opacity: 1
        }, {
            opacity: 0
        }, 13 * rs, Yl), b => {
            a.opacity = b.opacity
        }), new Ol(13 * rs)], !0), a => {
            a.opacity = 0;
            return new Pl([new Ol(10 * rs), new W(new X({
                opacity: 0
            }, {
                opacity: 1
            }, 16 * rs, Yl), b => {
                a.opacity = b.opacity
            }), new Ol(26 * rs), new W(new X({
                opacity: 1
            }, {
                opacity: 0
            }, 20 * rs, Yl), b => {
                a.opacity = b.opacity
            })], !0)
        }, a => new Ql([new Pl([new W(new X({
            x: a.wb().x
        }, {
            x: a.wb().x + 132
        }, 50 * rs, Yl), b => {
            a.Ha(b.x, a.wb().y)
        }), new Ol(22 * rs)], !0), new W(new X({
            y: a.wb().y
        }, {
            y: a.wb().y - 15
        }, 9 * rs, Yl, !0, !0), b => {
            a.Ha(a.wb().x,
                b.y)
        }), new Pl([new W(new X({
            opacity: 0
        }, {
            opacity: 1
        }, 8 * rs, Yl), b => {
            a.opacity = b.opacity
        }), new Ol(35 * rs), new W(new X({
            opacity: 1
        }, {
            opacity: 0
        }, 7 * rs, Yl), b => {
            a.opacity = b.opacity
        }), new Ol(22 * rs)], !0)]), null, null, a => new Pl([new W(new X({
            opacity: 0
        }, {
            opacity: 1
        }, 16 * rs), b => {
            a.opacity = b.opacity
        }), new Ol(32 * rs), new W(new X({
            opacity: 1
        }, {
            opacity: 0
        }, 13 * rs), b => {
            a.opacity = b.opacity
        }), new Ol(11 * rs)], !0)],
        ts = (I() ? [{
            position: new P(244, 193)
        }, {
            position: new P(405, 716)
        }, {
            position: new P(207, 648)
        }, {
            position: new P(401, 415)
        }, {
            position: new P(200,
                480)
        }, {
            position: new P(151, 404)
        }, {
            position: new P(107, 209)
        }, {
            position: new P(100, 864)
        }] : [{
            position: new P(484, 168)
        }, {
            position: new P(362, 193),
            scale: new P(1, -1)
        }, {
            position: new P(456, 344)
        }, {
            position: new P(769, 419),
            rotation: 5 * Math.PI / 180
        }, {
            position: new P(635, 296)
        }, {
            position: new P(162, 308),
            rotation: -10 * Math.PI / 180
        }, {
            position: new P(97, 433),
            rotation: 60 * Math.PI / 180,
            scale: new P(-1, 1)
        }, {
            position: new P(875, 390)
        }]).map((a, b) => Object.assign(a, qs[b])),
        us = [{
                height: 116
            }, {
                height: 126
            }, {
                height: 136
            }, {
                height: 109
            }, {
                height: 113
            },
            {
                height: 115
            }, {
                height: 129
            }, {
                height: 127
            }
        ],
        vs = (I() ? [{
            position: new P(216, 496)
        }, {
            position: new P(128, 372)
        }, {
            position: new P(140, 514)
        }, {
            position: new P(116, 638)
        }, {
            position: new P(368, 364)
        }, {
            position: new P(430, 532)
        }, {
            position: new P(326, 494)
        }, {
            position: new P(398, 675)
        }] : [{
            position: new P(414, 276)
        }, {
            position: new P(274, 174),
            rotation: -12 * Math.PI / 180
        }, {
            position: new P(314, 316),
            rotation: -7 * Math.PI / 180
        }, {
            position: new P(216, 392)
        }, {
            position: new P(586, 282)
        }, {
            position: new P(682, 332),
            rotation: 15 * Math.PI / 180
        }, {
            position: new P(688,
                206)
        }, {
            position: new P(798, 402),
            rotation: -14 * Math.PI / 180
        }]).map((a, b) => Object.assign(a, us[b]));
    var ws = class {
        constructor(a) {
            this.v = a;
            this.o = ts;
            this.j = this.g = null;
            this.u = [1, 2, 3, 4, 5, 6, 7, 8].map((b, c) => {
                b = jm(b, "lobby");
                b = new Jp(b);
                b.j = !1;
                b.Vb = ts[c].Vb || 0;
                c = ts[c].position;
                b.Ha(c.x, c.y);
                return b
            });
            this.H = [1, 2, 3, 4, 5, 6, 7, 8].map((b, c) => {
                b = jm(b, "ready");
                b = new Jp(b);
                b.j = !1;
                c = vs[c].position;
                b.Ha(c.x, c.y);
                return b
            });
            this.actions = ss.map((b, c) => b ? b(this.u[c]) : null);
            this.i = this.u;
            a || (this.g = new Jp(ai), a = ts[0].position, this.g.Ha(a.x + 23, a.y), this.j = new X({
                y: a.y
            }, {
                y: a.y - 8
            }, 12 * rs, Yl, !0, !0), this.j.start());
            this.state =
                0
        }
        update(a) {
            if (0 === this.state) {
                for (const b of this.u) b.update(a);
                if (!this.v) {
                    this.j.update(a);
                    this.g.update(a);
                    this.g.Ha(this.g.wb().x, Ml(this.j).y);
                    for (const b of this.actions) b && b.update(a)
                }
            }
        }
        render() {
            for (let a = 0; a < this.i.length; a++) {
                const b = this.o[a];
                this.i[a].render(void 0, void 0, b.height, b.rotation || 0, !0, void 0 !== b.scale ? b.scale.x : 1, void 0 !== b.scale ? b.scale.y : void 0)
            }
            this.v || 0 !== this.state || this.g.render()
        }
    };

    function xs(a) {
        a: {
            var b = a.match(ys);
            if (b) {
                var c = Number(b[1]);
                const d = Number(b[2]);
                b = Number(b[3]);
                if (0 <= c && 255 >= c && 0 <= d && 255 >= d && 0 <= b && 255 >= b) {
                    c = [c, d, b];
                    break a
                }
            }
            c = []
        }
        if (!c.length) throw Error("U`" + a);
        return c
    }

    function zs(a) {
        var b = a[0],
            c = a[1];
        a = a[2];
        b = Number(b);
        c = Number(c);
        a = Number(a);
        if (b != (b & 255) || c != (c & 255) || a != (a & 255)) throw Error("V`" + b + "`" + c + "`" + a);
        c = b << 16 | c << 8 | a;
        return 16 > b ? "#" + (16777216 | c).toString(16).slice(1) : "#" + c.toString(16)
    }
    var ys = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;

    function As(a) {
        var b = [255, 255, 255];
        var c = Si(.5, 0, 1);
        return [Math.round(a[0] + c * (b[0] - a[0])), Math.round(a[1] + c * (b[1] - a[1])), Math.round(a[2] + c * (b[2] - a[2]))]
    };
    var Bs = class {
        constructor() {
            var a = I() ? 80 : 60;
            this.j = new cq("connected", 80, L - 20);
            this.j.g = "#773903";
            bq(this.j, "#ff8d03", 6);
            this.j.Ha(L / 2, a);
            this.o = new cq("connected", 80, L - 20);
            this.o.g = "#773903";
            this.o.Ha(L / 2, a);
            a += 90;
            this.g = new cq("team_alpha", 64, L / 2 - 30);
            this.g.j = "right";
            this.g.Ha(L / 2 - 50, a);
            this.g.g = "rgb(50,255,100)";
            bq(this.g, zs(As(xs("rgb(50,255,100)"))));
            this.i = new cq("team_bravo", 64, L / 2 - 30);
            this.i.j = "left";
            this.i.Ha(L / 2 + 50, a);
            this.i.g = "rgb(100,0,255)";
            bq(this.i, zs(As(xs("rgb(100,0,255)"))));
            this.u =
                new cq("versus", 48, 60);
            this.u.Ha(L / 2, a)
        }
        render(a) {
            this.j.render(a);
            this.o.render(a);
            this.g.render(a);
            this.i.render(a);
            this.u.render(a)
        }
    };
    var Cs = class {
        constructor(a, b) {
            this.j = b;
            b = zs(As(xs(this.j)));
            this.o = new cq("you_are", 64, L - 20);
            this.i = new cq(1 === a ? "team_alpha" : "team_bravo", I() ? 120 : 100, L - 20);
            this.i.g = this.j;
            bq(this.i, b);
            this.i.Ha(0, I() ? 90 : 80);
            if (this.g = "en" == xg || "en-GB" == xg ? null : new cq(1 === a ? "alpha_team" : "bravo_team", I() ? 120 : 72, L - 20)) this.g.g = this.j, bq(this.g, b), this.g.Ha(0, I() ? 90 : 80)
        }
        render(a) {
            const b = a.canvas.width / 2;
            a.save();
            a.translate(b, I() ? 120 : 60);
            this.g ? this.g.render(a) : (this.o.render(a), this.i.render(a));
            a.restore()
        }
    };
    const Ds = fh.Va(),
        Es = K ? -11 : 15,
        Fs = K ? 795 : 427,
        Gs = K ? 120 : 83,
        Hs = K ? 150 : 267,
        Is = K ? 2 : 1.5,
        Js = K ? 829 : 429;

    function Ks(a, b) {
        a.De = b;
        if (a.vb) {
            var c = a.Na;
            c.i = [];
            c.o = [];
            for (let d = 0; d < b; d++) {
                const e = Math.floor(d % 2 ? d / 2 + 4 : d / 2);
                c.i.push(c.H[e]);
                c.o.push(vs[e])
            }
            c = a.Qa;
            c.text = a.nc.replace("[NUM]", `${b}`);
            c.i = aq(c)
        }
    }

    function Ls(a, b) {
        a.state = b;
        a.v = 0;
        var c = a.wa;
        c.i = aq(c);
        c = a.Oa;
        c.i = aq(c);
        0 !== b && a.i && (c = a.i, c.oa && (c.oa.remove(), c.oa = null));
        switch (b) {
            case 0:
                el(a.Ia, 3428);
                a.g = K ? Bh : Ah;
                a.vb && ms(a.i);
                break;
            case 7:
                a.u = new X({
                    opacity: 0
                }, {
                    opacity: 1
                }, 250, Zl);
                a.u.start();
                Q.Ff.play();
                a.Ia.stop();
                break;
            case 1:
                a.g = K ? Dh : Ch;
                a = a.Na;
                a.i = a.H;
                a.o = vs;
                a.state = 1;
                break;
            case 2:
                a.j = new X({
                    scale: 1
                }, {
                    scale: a.g[3] / Hs
                }, 250, Vl(.95, .05, .795, .035));
                a.ya = new X({
                    x: a.g[3] / 2,
                    y: a.g[4] / 2
                }, {
                    x: N.width / 2 + Es,
                    y: Fs + 70
                }, 250, Yl);
                a.j.start();
                a.ya.start();
                break;
            case 4:
                a.O.play();
                a.g = K ? Dh : Ch;
                a.va = new X({
                    scale: .2
                }, {
                    scale: 1
                }, 250, Vl(.95, .05, .795, .035));
                a.va.start();
                break;
            case 5:
                a.O.stop();
                a.dispose();
                break;
            case 6:
                a.dispose()
        }
    }

    function Ms(a, b, c) {
        0 === a.state && (a.H = new Jp(jm(b, "idle")), a.H.j = !1, a.Eb = mm(b, d => {
            a.H.Ha(0, d.y)
        }), b = 1 === c ? "rgb(50,255,100)" : "rgb(100,0,255)", a.Nb = new Bs, a.Pb = new Cs(c, b), Ls(a, 7))
    }

    function Ns(a) {
        Ls(a, 6);
        a.Ba || (a.Ba = new zr(a.V, () => {
            document.location.reload()
        }));
        yr(a.Ba);
        Q.wf.play();
        a.Ia.stop()
    }

    function Os(a, b) {
        const c = b.canvas.width / 2;
        a.i.render(b);
        const d = a.Xa[3],
            e = a.Xa[4],
            f = c - d / 2,
            g = Js - e / 2,
            h = g + e + 24;
        if (!a.mc || a.Mb) a.Ea ? (Bl(a.Xa, b, c, Js), a.wa.render(b), a.o || (a.o = dq(f, g, d, e), Pq(a.V, a.o, k => {
            if ("mousedown" === k) {
                Sq(a.V, a.o);
                k = a.wa;
                var l = U("game_starting");
                k.text = l;
                k.i = aq(k);
                a.Yb()
            }
        }), Qq(a.V, a.o))) : a.Hb.render(b);
        a.Qa.Ha(c, h);
        a.Qa.render(b)
    }
    var Ps = class {
        constructor(a, b, c, d, e, f = !1) {
            this.V = a;
            this.vb = b;
            this.Ea = c;
            this.Yb = e;
            this.mc = f;
            this.state = null;
            this.v = 0;
            this.g = K ? Bh : Ah;
            this.Fb = K ? null : zh;
            this.Xa = jh;
            this.Pb = this.Nb = this.H = this.Eb = this.va = this.u = this.ya = this.j = this.o = null;
            this.Lb = oh;
            this.Ia = Q.Bd;
            this.Ba = null;
            this.Mb = !1;
            this.i = b ? new ps(a, d, c, this.g) : null;
            this.wa = new cq("start_game", 48, .7 * this.Xa[3]);
            this.wa.g = "#f0f";
            this.wa.Ha(L / 2, Js);
            this.nc = U("num_players_ready");
            this.Qa = new cq("num_players_ready", 24, .8 * L);
            this.Qa.g = "#fff";
            this.Hb = new cq("waiting_for_host",
                48, .8 * L);
            this.Hb.g = "#fff";
            this.Hb.Ha(L / 2, Js);
            fh.Va();
            this.Oa = new cq("waiting_for_players", 64, 1.6 * this.Lb[3] - 46);
            this.Oa.Ha(L / 2, 70);
            this.Oa.g = "#000";
            this.Na = new ws(b);
            this.O = new Jp($h);
            this.O.j = !1;
            this.O.setLoop(!1);
            this.De = b ? 1 : 8;
            Ks(this, this.De);
            Ls(this, 0);
            this.vb ? this.Ea ? qk(6) : qk(5) : qk(4)
        }
        dispose() {
            this.Ia.stop();
            this.i && this.i.dispose();
            this.o && Sq(this.V, this.o)
        }
        render(a) {
            var b = a.canvas.width,
                c = a.canvas.height;
            const d = b / 2;
            a.fillStyle = "#000";
            a.fillRect(0, 0, b, c);
            a.save();
            c = 1;
            this.j && null !== this.j.g &&
                (c = Ml(this.j), b = Ml(this.ya), c = c.scale, a.translate(b.x, b.y), a.scale(c, c), a.translate(-b.x, -b.y));
            Bl(this.g, a, this.g[3] / 2, this.g[4] / 2);
            this.Fb && $g(Ds, this.Fb, a, this.g[3] / 2 + 18, this.g[4] - .291 * this.Fb[4] / 2 - 40, .291, !0);
            this.O.render(d + Es, Fs, Gs);
            if (4 === this.state || 5 === this.state) a.save(), a.translate(d + Es, Fs + 20), c = Ml(this.va).scale * Is / c, this.H.render(0, 0, 150, 0, !1, c), a.restore();
            this.Na.render();
            1 !== this.state && 2 !== this.state || this.Nb.render(a);
            a.restore();
            0 === this.state ? this.i ? Os(this, a) : (zl(this.Lb, d, 70,
                void 0, 0, !1, 1.6, 1, 1), this.Oa.render(a)) : 4 === this.state || 5 === this.state ? this.Pb.render(a) : 6 === this.state ? this.Ba.render(a) : 7 === this.state && (a.save(), a.setTransform(1, 0, 0, 1, 0, 0), a.fillStyle = "#fff", a.globalAlpha = Ml(this.u).opacity, a.fillRect(0, 0, a.canvas.width, a.canvas.height), a.restore())
        }
    };

    function Qs(a, b) {
        a.g.push(b)
    }
    var Rs = class {
        constructor() {
            this.g = []
        }
    };
    var Ss = class {
        constructor(a, b, c, d) {
            this.g = c;
            c = new Zn;
            c.type = 0;
            c.position.set(a, b);
            this.body = bo(d, c);
            this.body.tf = this;
            a = new ao;
            a.j = !0;
            a.g = Xn(1, 1);
            a.filter.g = 128;
            a.filter.i = 3;
            co(this.body, a)
        }
        getId() {
            return this.g
        }
    };
    var Ts = class {
        constructor(a, b, c, d, e, f, g) {
            this.i = b;
            this.width = e;
            this.height = f;
            const h = new Zn;
            h.type = 0;
            h.position.set(c, d);
            this.body = bo(g, h);
            this.body.Fb = this;
            c = new ao;
            c.H = .1;
            c.i = 1E3;
            c.filter.g = b ? 1024 : 8;
            c.filter.i = 35;
            b = null;
            switch (a) {
                case 1:
                    b = Xn(e, f);
                    break;
                case 2:
                case 4:
                    b = Yn(Y(-e, f), Y(e, -f));
                    break;
                case 3:
                case 5:
                    b = Yn(Y(-e, -f), Y(e, f))
            }
            this.g = c.g = b;
            co(this.body, c)
        }
    };
    var Us = class extends Ts {
        render(a) {
            if (this.g && !(2 > this.g.o)) {
                a.save();
                a.globalAlpha = .3;
                a.fillStyle = "#000";
                a.strokeStyle = this.i ? "#40e0d0" : "#0f0";
                var b = this.body.ta.position,
                    c = ol(),
                    d = this.g.g;
                a.beginPath();
                a.moveTo(vl(c, b.x + d[0].x), wl(c, b.y + d[0].y));
                for (let e = 1; e < d.length; ++e) a.lineTo(vl(c, b.x + d[e].x), wl(c, b.y + d[e].y));
                a.closePath();
                a.fill();
                a.stroke();
                a.restore()
            }
        }
    };

    function Vs(a, b, c, d) {
        const e = a.g.Td.tiles;
        let f;
        for (const h of a.g.layers) {
            var g = +h.tiles[d * a.g.width + c] & 536870911;
            0 !== g && (g = e[g].properties, b in g && (f = g[b]))
        }
        return f
    }

    function Ws(a, b, c, d, e) {
        const f = a.g.Td.tiles;
        for (const h of a.g.layers) {
            var g = +h.tiles[e * a.g.width + d] & 536870911;
            if (0 !== g && (g = f[g].properties, b in g && g[b] === c)) return !0
        }
        return !1
    }

    function Xs(a, b, c) {
        const d = a.g.Td.tiles;
        let e;
        for (const g of a.g.layers) {
            var f = +g.tiles[c * a.g.width + b] & 536870911;
            0 !== f && (f = d[f].objectgroup) && (e = f)
        }
        return e
    }

    function Ys(a, b, c) {
        a = Xs(a, b, c);
        if (!a) return null;
        c = a.objects;
        if (!c || !c.length) return null;
        b = [];
        for (const g of c) {
            var d = a.x + g.x,
                e = a.y + g.y;
            c = [];
            var f = !1;
            if (g.polygon) {
                for (const h of g.polygon) c.push({
                    x: d + h.x,
                    y: e + h.y
                });
                f = !0
            } else if (g.polyline)
                for (const h of g.polyline) c.push({
                    x: d + h.x,
                    y: e + h.y
                });
            else if (g.ellipse) console.error("Unsupported elliptical shadow object");
            else {
                f = d;
                const h = e;
                d += g.width;
                e += g.height;
                c.push({
                    x: f,
                    y: h
                });
                c.push({
                    x: d,
                    y: h
                });
                c.push({
                    x: d,
                    y: e
                });
                c.push({
                    x: f,
                    y: e
                });
                f = !0
            }
            for (e = 1; e < c.length; ++e) b.push([c[e -
                1], c[e]]);
            f && b.push([c[c.length - 1], c[0]])
        }
        return b
    }

    function Zs(a, b, c) {
        a = Vs(a, "wall", b, c);
        switch (a) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                return a;
            default:
                return 0
        }
    }
    var $s = class {
        constructor() {
            this.g = null
        }
        getSize() {
            return {
                x: this.g.width,
                y: this.g.height
            }
        }
    };
    var at = class {
            constructor(a, b) {
                this.x = a;
                this.y = b;
                this.g = this.j = this.i = !1;
                this.parent = null
            }
        },
        bt = class {
            constructor(a, b) {
                this.width = a;
                this.height = b;
                this.g = Array(b);
                for (let c = 0; c < b; c++) {
                    this.g[c] = Array(a);
                    for (let d = 0; d < a; d++) this.g[c][d] = new at(d, c)
                }
            }
            reset() {
                for (let a = 0; a < this.height; a++)
                    for (let b = 0; b < this.width; b++) this.g[a][b].j = !1, this.g[a][b].g = !1, this.g[a][b].parent = null
            }
        };

    function ct(a, b) {
        const c = [],
            d = (g, h, k, l, m, n) => {
                k = dt(a, k, l);
                m = 2 * m / 2;
                n = 2 * n / 2;
                c.push(new Us(g, h, k.x + m, k.y + n, m, n, b))
            };
        var e = et(a, (g, h) => 1 === Zs(a.map, g, h));
        for (var f of e) d(1, !1, f.x, f.y, f.width, f.height);
        e = a.map.getSize();
        for (f = 0; f < e.y; f++)
            for (let g = 0; g < e.x; g++) {
                const h = Zs(a.map, g, f);
                switch (h) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        d(h, !1, g, f, 1, 1)
                }
            }
        e = a.map.getSize();
        d(1, !0, -1, -1, e.x + 2, 1);
        d(1, !0, -1, e.y, e.x + 2, 1);
        d(1, !0, -1, 0, 1, e.y);
        d(1, !0, e.x, 0, 1, e.y)
    }

    function ft(a, b) {
        const c = a.map.getSize(),
            d = new bt(c.x, c.y);
        for (let e = 0; e < c.y; e++)
            for (let f = 0; f < c.x; f++)
                if (0 !== Zs(a.map, f, e) || Ws(a.map, 1 === b ? "Alpha Base" : "Bravo Base", !0, f, e))
                    for (let g = -1; 1 >= g; g++)
                        for (let h = -1; 1 >= h; h++) f + g < c.x && 0 <= f + g && e + h < c.y && 0 <= e + h && (d.g[e + h][f + g].i = !0)
    }

    function dt(a, b, c) {
        a = a.map.getSize();
        return {
            x: 2 * (b - .5) - a.x + 1,
            y: 2 * (c - .5) - a.y + 1
        }
    }

    function et(a, b) {
        var c = a.map.getSize();
        a = [];
        for (var d = 0; d < c.y; d++) {
            var e = -1;
            for (let f = 0; f < c.x; f++)
                if (b(f, d) && 0 > e && (e = f), (!b(f, d) || f === c.x - 1) && 0 <= e) {
                    let g = f - e;
                    f === c.x - 1 && ++g;
                    a.push({
                        x: e,
                        y: d,
                        width: g,
                        height: 1
                    });
                    e = -1
                }
        }
        for (b = 0; b < a.length; ++b)
            for (c = a[b], d = b + 1; d < a.length; ++d) e = a[d], c.x === e.x && c.width === e.width && c.y + c.height === e.y && (c.height += e.height, a.splice(d, 1), d--);
        return a
    }

    function gt(a) {
        const b = [];
        var c = et(a, (d, e) => Ws(a.map, "Alpha Base", !0, d, e));
        for (const d of c) {
            c = dt(a, d.x, d.y);
            const e = new nm;
            B(e, 1, 1);
            B(e, 2, d.width);
            B(e, 3, d.height);
            const f = new rm;
            qm(f, a.j.Ba++);
            B(f, 2, 4);
            B(f, 3, c.x + d.width);
            B(f, 4, c.y + d.height);
            yc(f, 8, e);
            b.push(ht(a, f))
        }
    }

    function it(a) {
        const b = [],
            c = a.map.getSize();
        for (let h = 0; h < c.y; h++)
            for (let k = 0; k < c.x; k++)
                if (Ws(a.map, "Candle", !0, k, h)) {
                    var d = dt(a, k, h),
                        e = new rm;
                    qm(e, a.j.Ba++);
                    B(e, 2, 16);
                    B(e, 3, d.x + 1);
                    B(e, 4, d.y + 1);
                    d = e;
                    var f = new om;
                    yc(d, 7, f);
                    d = b;
                    f = d.push;
                    var g = a;
                    e = new Rp(g.va, g.settings, e, g.j, g.Ea);
                    dr(g.j, e);
                    f.call(d, e)
                }
    }
    var jt = class {
        constructor(a, b, c, d, e) {
            this.va = a;
            this.j = b;
            this.settings = c;
            a = this.map = new $s;
            b = {
                Sd: [],
                tiles: {}
            };
            for (var f of d.tilesets || []) {
                b.Sd.push({
                    image: f.image,
                    width: f.imagewidth,
                    height: f.imageheight
                });
                for (var g = 0; g < f.tilecount; ++g) b.tiles[g + f.firstgid] = {
                    Ka: [b.Sd.length - 1, g % f.columns * (f.tilewidth + f.spacing), Math.floor(g / f.columns) * (f.tileheight + f.spacing), f.tilewidth, f.tileheight],
                    properties: f.tileproperties && f.tileproperties[g] ? f.tileproperties[g] : {},
                    objectgroup: f.tiles && f.tiles[g] && f.tiles[g].objectgroup
                }
            }
            f = [];
            g = 1;
            for (const h of d.layers || []) "tilelayer" !== h.type ? "players" === h.name && (g = 2) : h.compression ? console.warn(`Skipping map layer "${h.name}": ${h.compression} compression not supported`) : h.encoding && "csv" !== h.encoding ? console.warn(`Skipping map layer "${h.name}": ${h.encoding} encoding not supported`) : f.push({
                group: g,
                properties: h.properties || {},
                tiles: h.data
            });
            a.g = {
                width: d.width,
                height: d.height,
                vd: d.tilewidth,
                ud: d.tileheight,
                Td: b,
                layers: f,
                properties: d.properties || {}
            };
            c.get("use_pathfinding") || ct(this,
                e);
            ft(this, 2);
            ft(this, 1)
        }
    };
    const kt = fh.Va();

    function ht(a, b) {
        b = new fo(a.va, a.settings, b, a.j);
        dr(a.j, b);
        return b
    }

    function lt(a) {
        const b = a.map.getSize();
        for (let c = 0; c < b.y; ++c)
            for (let d = 0; d < b.x; ++d) {
                Ws(a.map, "character spawn", !0, d, c) && (a.v = dt(a, d, c), a.v.x += 1, a.v.y += 1);
                Ws(a.map, "enemy spawn", !0, d, c) && (a.u = dt(a, d, c), a.u.x += 1, a.u.y += 1);
                Ws(a.map, "circle_center", !0, d, c) && (a.o = dt(a, d, c), a.o.x += 1, a.o.y += 1);
                const e = Vs(a.map, "spider", d, c);
                if (void 0 !== e) {
                    const f = dt(a, d, c);
                    f.x += 1;
                    f.y += 1;
                    a.g.set(e, f)
                }
            }
    }

    function mt(a, b) {
        const c = a.map.getSize();
        for (let d = 0; d < c.y; ++d)
            for (let e = 0; e < c.x; ++e) {
                const f = Vs(a.map, "trigger", e, d);
                if (void 0 !== f) {
                    const g = dt(a, e, d);
                    g.x += 1;
                    g.y += 1;
                    a.Ia.push(new Ss(g.x, g.y, f, b))
                }
            }
    }

    function nt(a, b) {
        for (let c = 1; 3 > c; ++c) a.H.set(c, ot(a, b, c))
    }

    function pt(a) {
        var b = et(a, (h, k) => {
            var l = a.map,
                m;
            if (m = 1 === Zs(l, h, k)) h = Xs(l, h, k), m = !(h && h.objects && h.objects.length);
            return m
        });
        for (var c of b) {
            var d = dt(a, c.x, c.y);
            b = d.x;
            var e = d.x + 2 * c.width,
                f = d.y;
            d = d.y + 2 * c.height;
            Qs(a.i, [b, f, e, f]);
            Qs(a.i, [e, f, e, d]);
            Qs(a.i, [e, d, b, d]);
            Qs(a.i, [b, d, b, f])
        }
        c = a.map.getSize();
        for (b = 0; b < c.y; ++b)
            for (e = 0; e < c.x; ++e)
                if (f = Ys(a.map, e, b)) {
                    d = dt(a, e, b);
                    for (const h of f) Qs(a.i, [h[0].x / 25 + d.x, h[0].y / 25 + d.y, h[1].x / 25 + d.x, h[1].y / 25 + d.y])
                } else if (f = Zs(a.map, e, b), 2 <= f && 5 >= f) {
            var g = dt(a, e,
                b);
            d = g.x;
            const h = g.x + 2,
                k = g.y;
            g = g.y + 2;
            switch (f) {
                case 2:
                case 4:
                    Qs(a.i, [d, g, h, k]);
                    break;
                case 3:
                case 5:
                    Qs(a.i, [d, k, h, g])
            }
        }
    }

    function qt(a) {
        const b = a.map.getSize(),
            c = () => {
                const e = document.createElement("canvas");
                e.width = a.map.g.vd * b.x;
                e.height = a.map.g.ud * b.y;
                return e
            };
        let d = a.V = c();
        for (const e of a.map.g.layers)
            if (!e.properties.invisible) {
                switch (e.group) {
                    case 1:
                        d = a.V;
                        break;
                    case 2:
                        a.O || (a.O = c()), d = a.O
                }
                const f = d.getContext("2d");
                for (let g = 0; g < b.y; g++)
                    for (let h = 0; h < b.x; h++) rt(a, e, h, g, f)
            }
    }

    function ot(a, b, c) {
        const d = [];
        var e = et(a, (f, g) => Ws(a.map, "door", c, f, g));
        for (const f of e) e = dt(a, f.x, f.y), d.push(new $p(e.x + f.width, e.y + f.height, f.width, f.height, b));
        return d
    }

    function st(a, b) {
        if (a = a.H.get(b))
            for (const c of a) c.open()
    }

    function tt(a, b) {
        if (a = a.H.get(b))
            for (const c of a) c.close()
    }

    function rt(a, b, c, d, e) {
        const f = b.tiles[d * a.map.g.width + c];
        if (f) {
            b = a.map.g.vd;
            const g = a.map.g.ud;
            e.save();
            e.translate((c + .5) * b, (d + .5) * g);
            f & 1073741824 && e.scale(1, -1);
            f & 2147483648 && e.scale(-1, 1);
            f & 536870912 && e.transform(0, 1, 1, 0, 0, 0);
            a = a.Ba.get(+f & 536870911);
            $g(kt, a, e, -b / 2, -g / 2);
            e.restore()
        }
    }

    function ut(a) {
        if (!a) return !1;
        var b = a.height / 25;
        var c = vl(yl, 0);
        var d = wl(yl, 0);
        O.save();
        O.translate(c, d);
        c = a.width;
        d = a.height;
        b = yl.g * b / d;
        O.scale(b, b);
        O.drawImage(a, -(c / 2), -(d / 2));
        O.restore();
        return !0
    }

    function vt(a, b) {
        ut(a.O);
        for (const c of a.H.values())
            for (const d of c) d.render(b)
    }
    var wt = class extends jt {
        constructor(a, b, c, d, e, f) {
            super(a, b, c, d, e);
            this.Ea = f;
            this.V = this.O = null;
            this.wa = !1;
            this.Ia = [];
            this.g = new Map;
            this.H = new Map;
            this.o = this.u = this.v = null;
            this.i = new Rs;
            this.ya = [];
            this.Ba = new Map;
            f ? (lt(this), gt(this), it(this), mt(this, e), nt(this, e)) : uk(+this.map.g.properties.map);
            I() || pt(this);
            const g = [];
            a = this.map.g.Td;
            for (b = 0; b < a.Sd.length; ++b) c = a.Sd[b], d = new Ug(Wk(c.image)), g.push(d), this.ya[b] = Vg(kt, d, [c.width, c.height]);
            for (const h of Object.keys(a.tiles)) b = +h & 536870911, c = a.tiles[b],
                this.Ba.set(b, [this.ya[c.Ka[0]], c.Ka[1], c.Ka[2], c.Ka[3], c.Ka[4], 1]);
            Tg(g, () => {
                qt(this);
                this.wa = !0;
                for (const h of g) h.j = []
            })
        }
    };
    var xt = class {
        constructor() {
            this.Ka = new Jp(bi);
            this.status = 1
        }
        render(a, b, c, d) {
            Al(Hp(this.Ka), a, b, 3, c, !1, 1, 1, d, fh.Va())
        }
        update(a) {
            this.Ka.update(a)
        }
    };
    var yt = class extends on {
        constructor(a, b, c) {
            super(a, b, c);
            this.Ne = !1;
            this.input = null
        }
        Wc() {
            return !0
        }
        nc() {
            if (this.input) {
                this.Ne = !!Dc(this.input, 4);
                let a = Ec(this.input, 2),
                    b = Ec(this.input, 3);
                const c = hn(this);
                a += c.x;
                b += c.y;
                ln(this.body, Y(a, b));
                a && (this.angle = Math.atan2(b, a))
            } else super.nc()
        }
        oe(a) {
            super.oe(a);
            this.input && (a = new Xm, B(a, 1, 9), B(a, 2, this.id), yc(a, 12, this.input), this.ya.ue(a))
        }
    };

    function zt(a) {
        this.j = a;
        this.i = a * a;
        this.g = Y(0, 0);
        this.o = [this.g]
    }
    ta(zt, Tn);
    q = zt.prototype;
    q.getTypeName = function() {
        return "CircleShape"
    };
    q.Zd = function() {
        var a = new zt(this.j);
        a.set(this);
        return a
    };
    q.set = function(a) {
        zt.Rb.set.call(this, a);
        a instanceof zt && this.g.Ca(a.g)
    };
    q.Mc = function(a, b) {
        var c = b.R,
            d = b.position.x + (c.T.x * this.g.x + c.U.x * this.g.y);
        b = b.position.y + (c.T.y * this.g.x + c.U.y * this.g.y);
        a.g.set(d - this.j, b - this.j);
        a.i.set(d + this.j, b + this.j)
    };
    q.xe = function(a, b) {
        b = b * Math.PI * this.i;
        a.Ca(b, this.g, b * (.5 * this.i + (this.g.x * this.g.x + this.g.y * this.g.y)))
    };
    q.Ge = function(a) {
        var b = this.j,
            c = this.o;
        a.j = 1;
        a.i = b;
        a.g = c
    };
    var At = class extends yt {
        constructor(a, b, c, d) {
            super(a, b, c);
            a = new Zn;
            a.type = 2;
            a.position.set(this.g.x, this.g.y);
            a.angle = 0;
            a.g = 1;
            this.body = bo(d.o, a);
            this.body.vb = this;
            d = new ao;
            d.i = 1;
            d.H = 1;
            d.g = new zt(Math.sqrt(3));
            d.filter.g = 32;
            d.filter.i = 1035;
            co(this.body, d)
        }
        update() {}
    };
    var Bt = class extends At {
        constructor(a, b, c, d) {
            super(a, b, c, d);
            this.o = new xt;
            this.state = new vm;
            this.j = null;
            this.opacity = 0;
            this.i = null;
            this.i = new Pl([new W(new X({
                opacity: 0
            }, {
                opacity: 1
            }, 242, Zl), e => {
                this.opacity = e.opacity
            }), new Ll(() => {
                this.i = null
            })])
        }
        update(a) {
            this.j ? this.j.update(a) : this.i && this.i.update(a);
            var b = this.o,
                c = E(this.state, 1, 0);
            if (b.status !== c) {
                b.status = c;
                switch (c) {
                    case 3:
                        Ip(b.Ka, ci);
                        break;
                    case 4:
                        Ip(b.Ka, di);
                        break;
                    default:
                        Ip(b.Ka, bi)
                }
                b.Ka.play()
            }
            this.o.update(a)
        }
        render() {
            this.o.render(this.g.x,
                this.g.y, this.angle, this.opacity)
        }
        va() {
            this.body.setActive(!1);
            B(this.state, 1, 4);
            this.j = new Pl([new Ol(1E3 * (di.length - 1) / 24), new Ll(() => {
                super.va()
            })])
        }
    };
    let Ct = !1;
    var Dt = class {
        constructor(a) {
            this.u = a;
            this.i = this.H = this.v = 0;
            this.o = 1E3 / 60;
            this.g = Math.ceil(1E3 / this.o);
            this.j = Array(this.g);
            for (a = 0; a < this.g; ++a) this.j[a] = 0
        }
    };
    const Et = fh.Va(),
        Ft = new Map([
            [0, Y(-.5, -1.8)],
            [1, Y(-.4, -1.75)],
            [2, Y(-.4, -1.5)],
            [3, Y(-.3, -1.8)],
            [4, Y(-.3, -1.3)],
            [5, Y(-.3, -1.65)],
            [6, Y(-.4, -1.5)],
            [7, Y(-.4, -1.5)],
            [8, Y(-.5, -1.8)],
            [9, Y(-.2, -1.6)],
            [10, Y(-.3, -1.8)],
            [11, Y(-.3, -1.6)],
            [12, Y(-.15, -1.3)]
        ]);

    function Gt(a) {
        const b = Ft.get(a.player.Na),
            c = a.player.body.ka;
        var d = a.player;
        return {
            x: -(.01 * c.x) + b.x * Math.cos(a.player.angle),
            y: -(.005 * c.y) + b.y + ("idle" !== Ht(d) ? 0 : d.Eb.Ka.wb().y)
        }
    }

    function It(a, b = 1) {
        a.render(a.i, b)
    }

    function Jt(a, b = 1) {
        a.render(a.g, b)
    }
    var gr = class {
        constructor(a, b, c) {
            this.player = a;
            this.i = b;
            this.g = c;
            this.scale = 1;
            this.x = Gt(this).x;
            this.y = Gt(this).y
        }
        update(a) {
            this.scale = this.player.scale;
            var b = a / 1E3;
            a = Math.min(1, 10 * b);
            b = Math.min(1, 40 * b);
            this.x = this.x * (1 - a) + Gt(this).x * a;
            this.y = this.y * (1 - b) + Gt(this).y * b
        }
        render(a, b) {
            a && Al(a, this.player.g.x + this.x, this.player.g.y + this.y, 2, this.player.angle, !1, this.scale, this.scale, b, Et)
        }
    };

    function Vp(a, b) {
        return new Pl([new W(new X({
            offsetX: 1
        }, {
            offsetX: 0
        }, 500, bm), c => a.Ta(c)), new W(new X({
            offsetX: 0
        }, {
            offsetX: 0
        }, b, Zl), c => a.Ta(c)), new W(new X({
            offsetX: -.1
        }, {
            offsetX: 1
        }, 500, $l), c => a.Ta(c))])
    }
    var mr = class extends Wp {
        constructor(a, b, c, d, e) {
            super(b, c, d, e);
            this.type = a
        }
        v() {
            return 1 === this.type ? Kh : null
        }
    };
    class Kt extends Tp {
        constructor(a, b) {
            super();
            this.text = a;
            this.scale = 0;
            this.action = this.g(b)
        }
        cancel() {}
        g(a) {
            return new Pl([new W(new X({
                scale: 0
            }, {
                scale: 1
            }, 218, Zl), b => this.Ta(b)), new Ol(a), new W(new X({
                scale: 1
            }, {
                scale: 0
            }, 218, am), b => this.Ta(b))])
        }
        u() {
            return this.action.g()
        }
        update(a) {
            this.action.update(a)
        }
        Ta(a) {
            this.scale = a.scale
        }
    }
    var or = class extends Kt {
            j() {
                return 4
            }
            render(a, b = 0, c = 0) {
                a.save();
                a.fillStyle = "#000";
                a.textAlign = "center";
                a.font = `48px ${Og}`;
                a.lineWidth = 4;
                Dl(this.text, b, c - 2, "#4B1", "#BF5", 0, this.scale);
                a.restore()
            }
        },
        Lt = class extends Kt {
            constructor(a, b, c, d) {
                super(a, b);
                this.x = c;
                this.y = d
            }
            j() {
                return 5
            }
            g(a) {
                return new Pl([new W(new X({
                    scale: 0
                }, {
                    scale: 1
                }, 218, Zl), b => this.Ta(b)), new Ol(a), new W(new X({
                    scale: 1
                }, {
                    scale: 2
                }, 128, am), b => this.Ta(b))])
            }
            render(a) {
                a.save();
                a.translate(this.x, this.y);
                a.scale(this.scale, this.scale);
                a.textAlign = "center";
                a.font = `60px ${Og}`;
                a.fillStyle = "#700";
                a.fillText(this.text, 0, 0);
                a.strokeStyle = "#F93";
                a.strokeText(this.text, 0, 0);
                a.restore()
            }
        };
    const Mt = ol();
    var Nt = class {
        constructor(a) {
            this.g = a;
            this.state = "idle";
            this.Ka = new Jp(jm(this.g, this.state));
            this.Ka.play();
            this.i = mm(this.g, b => {
                this.Ka.Ha(0, b.y / Mt.g)
            })
        }
        render(a, b, c, d, e, f = !1) {
            this.Ka.render(a, b, 3, c, f, d, d, e)
        }
        update(a) {
            "idle" === this.state && this.i.update(a);
            this.Ka.update(a)
        }
    };
    class Ot extends Tp {
        constructor(a, b) {
            super();
            this.amount = a;
            this.scale = this.opacity = this.offsetY = 0;
            this.action = this.H(b)
        }
        cancel() {
            this.action = this.g()
        }
        u() {
            return this.action.g()
        }
        update(a) {
            this.action.update(a)
        }
        Ta(a) {
            this.offsetY = a.offsetY;
            this.opacity = a.opacity;
            this.scale = a.scale
        }
    }
    var kr = class extends Ot {
        constructor(a) {
            super(a, 1E3)
        }
        j() {
            return 3
        }
        H(a) {
            return new Pl([new W(new X({
                offsetY: 0,
                opacity: 0,
                scale: 0
            }, {
                offsetY: -.5,
                opacity: 1,
                scale: 1.25
            }, 107, Zl), b => this.Ta(b)), new W(new X({
                offsetY: -.5,
                opacity: 1,
                scale: 1.1
            }, {
                offsetY: -.5,
                opacity: 1,
                scale: 1
            }, a, Zl), b => this.Ta(b)), new W(new X({
                offsetY: -.5,
                opacity: 1,
                scale: 1
            }, {
                offsetY: -.5,
                opacity: 1,
                scale: 1
            }, 218, Zl), b => this.Ta(b)), this.g()])
        }
        g() {
            return new W(new X({
                offsetY: -.5,
                opacity: 1,
                scale: 1
            }, {
                offsetY: -.5,
                opacity: 0,
                scale: 1
            }, 107, Zl), a => {
                this.Ta(a)
            })
        }
        render(a,
            b = 0, c = 0) {
            const d = this.offsetY - 1.5;
            a.save();
            a.fillStyle = "#000";
            a.textAlign = "center";
            a.font = `48px ${Og}`;
            a.lineWidth = 4;
            a.globalAlpha = this.opacity;
            Dl(`+${this.amount}!`, b, c + d, "#4B1", "#BF5", 0, this.scale);
            a.restore()
        }
    };
    class Pt extends Ot {
        j() {
            return 2
        }
        H(a) {
            const b = this.i();
            return new Pl([new W(new X({
                offsetY: this.v(),
                opacity: 0
            }, {
                offsetY: b,
                opacity: 1
            }, 107, Zl), c => this.Ta(c)), new W(new X({
                offsetY: b,
                opacity: 1
            }, {
                offsetY: b,
                opacity: 1
            }, a, Zl), c => this.Ta(c)), this.g()])
        }
        g() {
            const a = this.i();
            return new W(new X({
                offsetY: a,
                opacity: 1
            }, {
                offsetY: a,
                opacity: 0
            }, 107, Zl), b => {
                this.Ta(b)
            })
        }
        render(a, b = 0, c = 0) {
            const d = this.offsetY - 1.5;
            a.save();
            a.fillStyle = "#000";
            a.textAlign = "center";
            a.font = `32px ${Og}`;
            a.lineWidth = 3;
            a.globalAlpha = this.opacity;
            this.o(a, b, c + d);
            a.restore()
        }
    }
    var Qt = class extends Pt {
            constructor(a) {
                super(a, 1E3)
            }
            v() {
                return 0
            }
            i() {
                return -.5
            }
            o(a, b, c) {
                Dl(`+${this.amount}`, b, c, "#59E", "#FFF")
            }
        },
        Rt = class extends Pt {
            constructor(a) {
                super(a, 1E3)
            }
            v() {
                return -.5
            }
            i() {
                return 0
            }
            o(a, b, c) {
                Dl(`${this.amount}`, b, c, "#D67", "#000")
            }
        },
        jr = class extends Pt {
            constructor(a, b, c) {
                super(a, b);
                this.color = c
            }
            j() {
                return 1
            }
            v() {
                return 0
            }
            i() {
                return -.5
            }
            o(a, b, c) {
                var d = ol();
                b = vl(d, b);
                c = wl(d, c);
                a.font = `32px ${Og}`;
                a.textAlign = "center";
                a.textBaseline = "middle";
                a.fillStyle = `rgb(${this.color})`;
                a.strokeStyle =
                    "#fff";
                a.lineWidth = 3;
                a.strokeText(`+${this.amount}`, b, c - 40);
                a.fillText(`+${this.amount}`, b, c - 40);
                a.lineWidth = .5;
                a.font = `12px ${Og}`;
                d = Hl(a, U("buddy_bonus"), Og, 12, 8, 50, 2);
                Jl(a, d, b, c - 15, 1.25 * d.fontSize, !0)
            }
        },
        lr = class extends Qt {
            o(a, b, c) {
                Dl(`+${this.amount}`, b, c, "#0AF", "#FFF")
            }
        };

    function St(a) {
        let b = a;
        for (let c = 0; c < a.j.length; c++) {
            const d = a.j[c];
            d.O(b, c + 1);
            b = d
        }
    }

    function Qp(a) {
        return 0 < a.Ia ? 2E3 < a.Ia ? !0 : 0 === Math.round(a.Ia / 200) % 2 : !1
    }

    function sr(a) {
        a.hb && (a.hb.v.i = (1 === a.Wa ? 2 : 1) | (Tt(a, 4) ? 1024 : 1544) | 420)
    }
    var Vt = class extends yt {
        constructor(a, b, c, d) {
            super(a, b, c);
            this.vb = d;
            this.j = [];
            this.Ia = 0;
            this.u = !1;
            this.v = 0;
            this.ef = Y(0, 0);
            a = F(c, pm, 6);
            this.Wa = E(a, 2, 0);
            this.Na = E(a, 3, 0);
            this.Vc = Dc(a, 4);
            a = new Zn;
            a.type = 2;
            a.position.set(this.g.x, this.g.y);
            a.angle = 0;
            a.g = 1;
            this.body = bo(d.o, a);
            this.body.qf = this;
            d = new ao;
            d.g = new zt(Math.sqrt(3));
            d.i = 1;
            d.H = 1;
            d.filter.g = 1 === this.Wa ? 1 : 2;
            this.hb = co(this.body, d);
            sr(this);
            d.j = !0;
            d.filter.g = 64;
            co(this.body, d);
            this.jg = jn(this, "return_to_base_duration_ms")
        }
        le() {
            if (this.u) {
                this.u = !1;
                this.v = 0;
                var a = new ao;
                a.g = new zt(Math.sqrt(3));
                a.i = 1;
                a.H = 1;
                a.filter.g = 1 === this.Wa ? 1 : 2;
                this.hb = co(this.body, a)
            }
        }
        Uc(a) {
            this.u && (this.hb && (Ut(this.body, this.hb), this.hb = void 0), this.v += a / this.jg, this.v = Math.min(this.v, 1), this.input = null, ln(this.body, Y(0, 0)), .5 < this.v && (a = this.body, kn(a, this.ef, a.ha.a)))
        }
        Ic() {
            return !0
        }
    };

    function Nq(a) {
        return a.state ? Fc(a.state, 6) || 0 : 0
    }

    function tr(a) {
        return a.Qe && !a.u
    }

    function Tt(a, b) {
        return a.state ? E(a.state, 4, 0) >= b : !1
    }

    function hr(a, b) {
        a.O += b;
        a.Pb = jn(a, "score_delta_timer_ms");
        a.i && 0 < b && ml("STEALS", b)
    }

    function qr(a, b) {
        if (a.Xa !== b) {
            var c = jm(a.Na, 1 === b ? "happy" : "sad").length;
            a.Xa = b;
            a.Lb = new Pl([new Ol(1E3 * c / 24), new Ll(() => {
                a.Xa = null;
                a.Lb = null
            })])
        }
    }

    function ir(a, b) {
        if (!a.o || a.o.j() <= b.j()) a.o && a.o.cancel(), a.o = b
    }

    function pr(a) {
        switch (a) {
            case 1:
                return U("powerup_fast");
            case 2:
                return U("powerup_all_seeing");
            case 3:
                return U("powerup_magnetic");
            case 4:
                return U("powerup_dematerialized");
            case 5:
                return U("powerup_invincible");
            default:
                return ""
        }
    }

    function rr(a) {
        a.wa = jn(a, "sonic_boom_timer_ms");
        a.i && Q.Bf.play()
    }

    function nr(a) {
        switch (a) {
            case 1:
                return U("base_powerup_fast");
            case 2:
                return U("base_powerup_all_seeing");
            case 3:
                return U("base_powerup_magnetic");
            case 4:
                return U("base_powerup_dematerialized");
            default:
                return ""
        }
    }

    function Ht(a) {
        let b = "idle";
        a.Qa ? b = "sleep" : 1 === a.Xa ? b = "happy" : 2 === a.Xa ? b = "sad" : a.Ne && (b = "move");
        return b
    }

    function Wt(a, b, c, d, e) {
        a.V && Jt(a.V, e);
        Qp(a) ? (a.Nb || (a.Nb = !0, a.Mb.play()), a.Jc.render(b, c, 4, e, a.u), a.Lc.render(b, c, 4, e, a.u)) : a.Nb && (a.Nb = !1, a.Mb.stop());
        a.Eb.render(b, c, a.angle, d, e, a.u);
        a.V && It(a.V, e)
    }

    function Xt(a) {
        let b = 0,
            c = 0,
            d = Number.MAX_VALUE;
        const e = a.g;
        for (const g of a.vb.u.values()) {
            if (g.Wa !== a.Wa) continue;
            var f = g.g;
            const h = f.x - e.x;
            f = f.y - e.y;
            const k = h * h + f * f;
            k < d && (d = k, b = h, c = f)
        }
        return [b, c]
    }

    function Yt(a, b) {
        if (a.i && !a.Qa) {
            const g = ol(),
                [h, k] = Xt(a),
                l = Math.atan2(k, h) % Math.PI + Math.PI;
            var c = N.width / g.g,
                d = N.height / g.g,
                e = a.Tf ? a.Yb : a.j.length + Nq(a) >= (+jn(a, `powerup_threshold_${(a.state?E(a.state,4,0):0)+1}`) || 500);
            if (e || c / 2 <= Math.abs(h) || d / 2 <= Math.abs(k)) {
                b.save();
                c = a.g;
                var f = d = 1;
                let m = 1;
                e ? (m = 3, f = (Date.now() & 511) / 512, b.globalAlpha = .9, d = 1.25, f = 1 + f) : b.globalAlpha = .25;
                e = I() ? 42 : 32;
                b.fillStyle = "#fff";
                b.strokeStyle = "#000";
                for (let n = 1; n <= m; n++) {
                    const w = c.x - 3 * Math.cos(l) * f * n,
                        v = c.y - 3 * Math.sin(l) * f * n;
                    b.save();
                    b.translate(vl(g, w), wl(g, v));
                    b.scale(d, d);
                    b.rotate(l - Math.PI);
                    b.beginPath();
                    b.moveTo(-e / 2, -e / 2);
                    b.lineTo(e / 2, 0);
                    b.lineTo(-e / 2, e / 2);
                    b.closePath();
                    b.fill();
                    b.stroke();
                    b.restore()
                }
                b.restore()
            }
        }
        a.o && a.o.render(b, a.g.x, a.g.y)
    }
    var Zt = class extends Vt {
        constructor(a, b, c, d, e) {
            super(a, b, c, d);
            this.Tf = e;
            this.state = null;
            this.i = !1;
            this.Hb = this.Pb = this.O = this.wa = 0;
            this.Xa = this.o = null;
            this.Qa = !1;
            this.Qe = !0;
            this.Yb = this.Nb = !1;
            this.Lb = null;
            this.opacity = this.Ba = 0;
            this.Fb = null;
            this.scale = 1;
            this.V = null;
            this.Jc = new Jp(Wh);
            this.Lc = new Jp(ei);
            this.Mb = Q.yf.clone();
            this.Oe = jn(this, "ally_bonus_timer_ms");
            this.hg = 1 === this.Wa ? "50,255,100" : "150,60,255";
            this.dg = jn(this, "draw_debug_location");
            this.ff = jn(this, "speed_boost_trail_coefficient");
            this.ig =
                jn(this, "render_paths");
            this.Eb = new Nt(this.Na);
            this.df = this.Ba;
            this.Kc = {
                radius: this.i ? Fc(this.state, 3) || 0 : 10,
                Fe: 10,
                Wa: this.Wa,
                Nd: 1E3 * Math.random(),
                Jd: !1,
                visible: !0
            };
            this.Jc.play();
            this.Lc.play();
            this.Fb = new Pl([new W(new X({
                opacity: 0
            }, {
                opacity: 1
            }, 242, Zl), f => {
                this.opacity = f.opacity
            }), new Ll(() => {
                this.Fb = null
            })])
        }
        Ea() {
            const a = super.Ea();
            return this.i ? a + 1 : a
        }
        Ic() {
            return null != this.state
        }
        update(a) {
            this.Jc.update(a);
            this.Lc.update(a);
            this.Ba += a;
            if (Qp(this))
                if (this.i) Zj(this.Mb, 1);
                else {
                    const d = dn(this.vb.g.g);
                    var b = d,
                        c = this.g;
                    b.x -= c.x;
                    b.y -= c.y;
                    b = Math.max(1E-4, Math.pow(d.length(), 2));
                    Zj(this.Mb, Si(40 / b, 0, 1))
                } this.V && this.V.update(a);
            0 < this.wa && (this.wa -= a);
            0 < this.Hb && (this.Hb -= a);
            0 < this.Pb ? this.Pb -= a : this.i && 0 !== this.O && (ir(this, 0 < this.O ? new Qt(this.O) : new Rt(this.O)), (0 < this.O ? Q.Df : Q.Ef).play(), this.O = 0);
            St(this);
            this.o && (this.o.update(a), this.o.u() && (this.o = null));
            this.Lb && this.Lb.update(a);
            b = this.Eb;
            c = Ht(this);
            c !== b.state && (b.state = c, "idle" === b.state && b.i.reset(), b.Ka.setLoop("happy" !== b.state && "sad" !==
                b.state), b.Ka.Ha(0, 0), Ip(b.Ka, jm(b.g, b.state)), b.Ka.play());
            this.Eb.update(a);
            this.Fb && this.Fb.update(a);
            b = Ec(this.state, 17);
            b > this.Ia && (rr(this), c = new or(pr(5), jn(this, "notice_duration_ms")), ir(this, c));
            this.Ia = b;
            b = Dc(this.state, 18);
            !this.u && b ? qr(this, 2) : this.u && !b && this.le();
            this.u = b;
            this.ef = Y(Fc(this.state, 19), Fc(this.state, 20));
            this.Uc(a)
        }
        sendMessage(a) {
            this.ya.Dd(a)
        }
        Uc(a) {
            this.u && (this.angle = 15 * this.v, this.scale = .5 > this.v ? 1 - 2 * this.v : 2 * this.v - 1, super.Uc(a))
        }
        le() {
            this.scale = 1;
            super.le()
        }
        render(a) {
            const b =
                this.g.x,
                c = this.g.y;
            if (this.dg && this.Oa) {
                a.save();
                a.globalAlpha = .5;
                var d = this.Oa,
                    e = d.x,
                    f = d.y,
                    g = ((new Date).getTime() - this.Oa.t) / 1E3;
                Cl(e + d.Vd * g, f + d.Wd * g, 1.5, "yellow");
                Cl(e, f, 1.5, "white");
                a.restore()
            }
            a.save();
            a.globalAlpha = this.alpha;
            Tt(this, 4) && (a.save(), a.globalAlpha *= .1);
            if (Dc(this.state, 12))
                for (d = 0; 3 > d; d++) e = this.body.ka, Wt(this, b - e.x * this.ff * (d + 1), c - e.y * this.ff * (d + 1), this.scale, a.globalAlpha * (.1 + (3 - d) / 6));
            Wt(this, b, c, this.scale, 1 > this.opacity ? this.opacity : a.globalAlpha);
            if (0 < this.wa)
                for (d = jn(this,
                        "sonic_boom_timer_ms"), e = 0; 5 > e; e++) Wt(this, b, c, .1 + 3 * e * (d - this.wa) / d, a.globalAlpha * (.1 + (5 - e) / 12 - .1 * (d - this.wa) / d));
            Tt(this, 4) && a.restore();
            if (xc(this.state, ym, 7) && this.ig)
                for (d = ol(), a.strokeStyle = "#f00", a.lineWidth = 2, e = b, f = c, g = 0; g < xc(this.state, ym, 7).length; ++g) {
                    const h = xc(this.state, ym, 7)[g];
                    0 < g && (a.beginPath(), a.moveTo(vl(d, e), wl(d, f)), a.lineTo(vl(d, Ec(h, 1)), wl(d, Ec(h, 2))), a.stroke());
                    Cl(Ec(h, 1), Ec(h, 2), 3 * .1, "#f00");
                    e = Ec(h, 1);
                    f = Ec(h, 2)
                }
            Dc(this.state, 8) || this.Vc || Al(ph, b, c, 3, 0);
            this.Qa && (a.font = `32px ${Og}`,
                a.lineWidth = 3, Math.floor(this.Ba / 500) % 2 ? Dl("Z z Z", b - .17, c - 1.8, "#4B1", "#BF5") : Dl("z Z z", b - .17, c - 1.8, "#4B1", "#BF5"));
            a.restore()
        }
        wake() {
            const a = new Xm;
            B(a, 1, 13);
            B(a, 2, this.id);
            B(a, 3, !0);
            this.ya.Dd(a)
        }
        Ae() {
            this.Kc.radius = this.i ? Fc(this.state, 3) || 0 : 10;
            return this.Kc
        }
    };
    var $t = class {
        constructor() {
            this.Ka = new Jp([wh]);
            this.status = 1;
            this.g = new Jp(Wh);
            this.i = new Jp(ei)
        }
        render(a, b, c, d) {
            Al(Hp(this.Ka), a, b, 4, c, !1, 1, 1, d, fh.Va());
            this.g.render(a, b, 5);
            this.i.render(a, b, 5)
        }
        update(a) {
            this.Ka.update(a);
            this.g.update(a);
            this.i.update(a)
        }
    };
    var au = class extends yt {
        constructor(a, b, c, d) {
            super(a, b, c);
            a = new Zn;
            a.type = 0;
            a.position.set(this.g.x, this.g.y);
            a.angle = 0;
            a.g = 1;
            this.body = bo(d.o, a);
            this.body.Eb = this;
            d = new ao;
            d.i = 1;
            d.j = !0;
            d.H = 1;
            d.g = new zt(Math.sqrt(3));
            d.filter.g = 32;
            d.filter.i = 1035;
            co(this.body, d)
        }
    };
    var bu = class extends au {
        constructor(a, b, c, d) {
            super(a, b, c, d);
            this.j = new $t;
            this.opacity = 0;
            this.i = null;
            this.i = new Pl([new W(new X({
                opacity: 0
            }, {
                opacity: 1
            }, 242, Zl), e => {
                this.opacity = e.opacity
            }), new Ll(() => {
                this.i = null
            })])
        }
        update(a) {
            this.i && this.i.update(a);
            var b = this.j;
            1 !== b.status && (b.status = 1, Ip(b.Ka, [wh]), b.Ka.play());
            this.j.update(a)
        }
        render() {
            this.j.render(this.g.x, this.g.y, this.angle, this.opacity)
        }
        va() {
            super.va()
        }
    };

    function cu(a, b) {
        a = new PIXI.Sprite(a);
        a.blendMode = PIXI.BLEND_MODES.ADD;
        a.scale.set(2 * b / 256);
        a.anchor.set(.5);
        return a
    }
    var du = class {
        constructor(a, b, c = 0) {
            this.i = b;
            this.scale = 1;
            this.oa = new PIXI.Container;
            const d = cu(a, b);
            this.oa.addChild(d);
            0 < c && (a = cu(a, c), this.oa.addChild(a));
            this.g = new Dk(0, 0, 2 * b, 2 * b)
        }
        getBounds() {
            return this.g
        }
    };
    const eu = ol();

    function fu(a, b) {
        var c = a.i.get(b);
        c && (c = c.oa, a.g.removeChild(c), a.i.delete(b), c.destroy({
            children: !0
        }))
    }

    function gu(a, b, c, d = 0) {
        let e = a.i.get(b);
        e || (e = new du(a.texture, c, d), a.i.set(b, e), a.g.addChild(e.oa));
        return e
    }
    var iu = class extends gi {
        constructor() {
            var a = N.width,
                b = N.height;
            super();
            this.g = new PIXI.Container;
            this.i = new Map;
            this.v = new Map;
            this.o = 0;
            this.u = !1;
            a = this.j = PIXI.autoDetectRenderer({
                antialias: !1,
                backgroundColor: 6579350,
                powerPreference: "high-performance",
                width: a,
                height: b,
                forceCanvas: !1
            });
            a.type !== PIXI.RENDERER_TYPE.WEBGL && S(103);
            pk("d2", a.type);
            this.j.plugins.interaction.destroy();
            a = PIXI.Texture;
            b = a.from;
            const c = document.createElement("canvas");
            c.width = 256;
            c.height = 256;
            const d = c.getContext("2d"),
                e = d.createRadialGradient(128,
                    128, 128, 128, 128, 0);
            e.addColorStop(0, "rgba(255,255,255,0)");
            e.addColorStop(.5, "rgba(255,255,255,1)");
            e.addColorStop(1, "rgba(255,255,255,1)");
            d.fillStyle = e;
            d.fillRect(0, 0, 256, 256);
            this.texture = b.call(a, c, {
                scaleMode: PIXI.SCALE_MODES.LINEAR
            })
        }
        Bb() {
            super.Bb();
            this.v.clear();
            this.i.clear();
            this.g.destroy(!0);
            this.texture.destroy(!0);
            this.j.destroy(!0)
        }
        update(a) {
            this.o += a
        }
        render(a, b, c, d) {
            var e = eu.left;
            var f = eu.top;
            e = {
                left: e,
                right: e + N.width / eu.g,
                top: f,
                bottom: f + N.height / eu.g
            };
            f = 1;
            Tt(b, 2) && (f = hu(d, "all_seeing_lighting_multiplier"),
                this.u || (fu(this, b.getId()), this.u = !0));
            b = b.Wa;
            for (const u of c) {
                c = u.Ae();
                var g = c.Wa === b;
                d = u;
                var h = gu(this, d.getId(), c.radius, c.Fe * (g ? f : 1));
                if (c.visible) {
                    var k = h,
                        l = 1 === c.Wa ? 3342180 : 9846015;
                    for (const C of k.oa.children || []) C.tint = l;
                    h.oa.alpha = d.alpha * (g ? 1 : .2);
                    k = h;
                    g = d.g;
                    var m = e;
                    k.oa.position.set(g.x, g.y);
                    k.g.left = g.x;
                    k.g.top = g.y;
                    l = g.x - Si(g.x, m.left, m.right);
                    g = g.y - Si(g.y, m.top, m.bottom);
                    k.oa.visible = l * l + g * g < Math.pow(k.scale * k.i, 2);
                    if (null != c.Nd) {
                        Mp || (Mp = new Lp);
                        var n = Mp;
                        k = c.Nd + .003 * this.o;
                        g = l = 0;
                        var w =
                            Math.floor(k) & 255,
                            v = Math.floor(l) & 255,
                            A = Math.floor(g) & 255;
                        k -= Math.floor(k);
                        l -= Math.floor(l);
                        g -= Math.floor(g);
                        m = k * k * k * (k * (6 * k - 15) + 10);
                        const C = l * l * l * (l * (6 * l - 15) + 10);
                        n = n.g;
                        var p = n[w] + v;
                        const G = n[p] + A;
                        p = n[p + 1] + A;
                        v = n[w + 1] + v;
                        w = n[v] + A;
                        A = n[v + 1] + A;
                        v = 25 * h.i;
                        h.scale = (v + ((Ti(Ti(Ti(Np(n[G], k, l, g), Np(n[w], k - 1, l, g), m), Ti(Np(n[p], k, l - 1, g), Np(n[A], k - 1, l - 1, g), m), C), Ti(Ti(Np(n[G + 1], k, l, g - 1), Np(n[w + 1], k - 1, l, g - 1), m), Ti(Np(n[p + 1], k, l - 1, g - 1), Np(n[A + 1], k - 1, l - 1, g - 1), m), C), g * g * g * (g * (6 * g - 15) + 10)) + 1) / 2 * 20 - 10)) / v;
                        h.oa.scale.set(h.scale);
                        h.g.width = 2 * h.i * h.scale;
                        h.g.height = 2 * h.i * h.scale
                    }
                    c.Jd && d.getId()
                } else h.oa.visible = !1
            }
            this.g.scale.set(eu.g);
            this.g.position.set(vl(eu, 0), wl(eu, 0));
            this.j.render(this.g);
            a.save();
            a.globalCompositeOperation = "multiply";
            a.drawImage(this.j.view, 0, 0);
            a.restore()
        }
    };
    const ju = `30px ${Og}`;
    var ku = class {
        constructor() {
            var a = .6 * N.width;
            this.width = a;
            this.i = null;
            this.o = this.j = 0;
            this.g = new X({
                alphaCount: 0,
                alphaWidth: a / 2,
                bravoCount: 0,
                bravoWidth: a / 2
            }, {
                alphaCount: 0,
                alphaWidth: a / 2,
                bravoCount: 0,
                bravoWidth: a / 2
            }, 1)
        }
        update(a) {
            this.g.update(a)
        }
        render(a, b, c) {
            if (this.j !== b || this.o !== c) {
                this.j = b;
                this.o = c;
                var d = b + c,
                    e = this.width * (0 === d ? .5 : b / d);
                d = this.width * (0 === d ? .5 : c / d);
                const f = Ml(this.g);
                this.g = new X({
                    alphaCount: f.alphaCount,
                    alphaWidth: f.alphaWidth,
                    bravoCount: f.bravoCount,
                    bravoWidth: f.bravoWidth
                }, {
                    alphaCount: b,
                    alphaWidth: e,
                    bravoCount: c,
                    bravoWidth: d
                }, 250);
                this.g.start()
            }
            b = Ml(this.g);
            c = -this.width / 2;
            e = b.alphaWidth + c;
            a.save();
            this.i || (this.i = a.createLinearGradient(0, -4, 0, 20), this.i.addColorStop(0, "rgba(76,92,92,0.5)"), this.i.addColorStop(1, "rgba(136,136,136,0.5)"));
            a.fillStyle = this.i;
            a.beginPath();
            a.moveTo(c, -4);
            a.lineTo(c + this.width, -4);
            a.arc(c + this.width, 6, 10, -Math.PI / 2, Math.PI / 2);
            a.lineTo(c, 16);
            a.arc(c, 6, 10, Math.PI / 2, 3 * Math.PI / 2);
            a.fill();
            a.fillStyle = "rgb(50,255,100)";
            a.fillRect(c, 0, b.alphaWidth, 12);
            a.beginPath();
            a.arc(c, 6, 6, Math.PI / 2, 3 * Math.PI / 2);
            a.fill();
            a.fillStyle = "rgb(100,0,255)";
            a.fillRect(e, 0, b.bravoWidth, 12);
            a.beginPath();
            a.arc(c + this.width, 6, 6, -Math.PI / 2, Math.PI / 2);
            a.fill();
            a.fillStyle = "#fff";
            a.fillRect(-2, -4, 4, 20);
            a.font = ju;
            a.textAlign = "right";
            a.textBaseline = "middle";
            a.fillText(`${Math.floor(b.alphaCount)}`, c - 6 - 12, 6);
            a.textAlign = "left";
            a.fillText(`${Math.floor(b.bravoCount)}`, c + this.width + 18, 6);
            a.restore()
        }
    };

    function lu(a, b, c) {
        b.setTransform(1, 0, 0, 1, 0, 0);
        c.H || c.v || (b.save(), b.translate(b.canvas.width / 2, b.canvas.height / 4), a.H.render(b, c.vb), b.restore());
        !c.v && 6E3 > c.o && c.H && (b.save(), b.translate(b.canvas.width / 2, b.canvas.height / 4), a.O.render(b, Math.floor(c.o / 1E3)), b.restore());
        c.H && (b.save(), b.translate(b.canvas.width / 2, 70), a.v.render(b, c.Na, c.Xa), b.restore());
        b.save();
        var d = c.o;
        c.H && (b.font = `50px ${Og}`, b.globalAlpha = 1, b.fillStyle = "#fff", b.textAlign = "center", b.textBaseline = "middle", 0 >= d ? d = "0:00" : (c = Math.floor(d %
            6E4 / 1E3), d = `${Math.floor(d/6E4)}:${10>c?"0":""}${c}`), b.fillText(d, b.canvas.width / 2, 36));
        I() && a.gamepad && a.gamepad.render(b);
        b.restore()
    }
    var mu = class extends gi {
        constructor() {
            super();
            this.j = new iu;
            this.o = new mo;
            this.v = new ku;
            this.H = new Sp;
            this.O = new Ar;
            this.i = this.g = this.gamepad = null;
            this.u = 25;
            hi(this, ra(fi, this.j));
            hi(this, ra(fi, this.o))
        }
        update(a) {
            this.i && this.i.update(a);
            this.o.update(a);
            this.j.update(a);
            this.v.update(a)
        }
        render(a, b, c) {
            gl(b.canvas);
            b.fillStyle = "#000";
            b.fillRect(0, 0, b.canvas.width, b.canvas.height);
            if (null !== a) {
                b.save();
                var d = a.Ba,
                    e = a.g.g;
                if (e) {
                    var f = e.g,
                        g = Math.max(25 - hu(a, "zoom_out_per_collectible_held") * e.j.length,
                            12.5);
                    this.u !== g && (this.i = new X({
                        zoom: c.g
                    }, {
                        zoom: g
                    }, hu(a, "zoom_tween_time_ms")), this.i.start(), this.u = g);
                    ul(c, this.i ? Ml(this.i).zoom : this.u);
                    sl(c, f.x, f.y, V.left + V.width / 2, V.top + V.height / 2)
                }
                f = a.i;
                if (e && e.Ic() && ut(f.V)) {
                    const m = [],
                        n = new Map;
                    g = c.left;
                    var h = c.top,
                        k = N.width / c.g;
                    c = N.height / c.g;
                    for (var l of a.g.H.values()) {
                        const w = l.g;
                        w.x >= g - 1 && w.x < g + k + 1 && w.y >= h - 1 && w.y < h + c + 1 && (-1 === m.indexOf(l.Ea()) && (m.push(l.Ea()), n.set(l.Ea(), [])), n.get(l.Ea()).push(l))
                    }
                    m.sort((w, v) => w - v);
                    for (const w of m)
                        for (const v of n.get(w)) v.isVisible() &&
                            v.render(b);
                    hu(a, "render_map_layers_above_players") && vt(f, b);
                    1 > a.u && (b.fillStyle = `rgba(0, 0, 0, ${1-a.u})`, b.fillRect(0, 0, b.canvas.width, b.canvas.height), e.render(b), d && d.render(b, !0));
                    1 > a.u && (b.save(), b.globalAlpha = a.u);
                    hu(a, "render_fog") && 0 < a.u && this.o.render();
                    hu(a, "render_lighting") && (l = Ct ? [e, ...a.g.u.values()] : [...a.g.j.values(), ...a.g.v.values(), ...a.g.u.values()], this.j.render(b, e, l, a, !Ct));
                    d && d.render(b, !1);
                    1 > a.u && b.restore();
                    e && e.Ic() && Yt(e, b)
                }
                this.g || (K ? (this.g = b.createLinearGradient(0,
                    0, 0, b.canvas.height), d = V.top / b.canvas.height, e = (V.top + V.height) / b.canvas.height) : (this.g = b.createLinearGradient(0, 0, b.canvas.width, 0), d = V.left / b.canvas.width, e = (V.left + V.width) / b.canvas.width), this.g.addColorStop(0, "rgba(0,0,0,1)"), this.g.addColorStop(d, "rgba(0,0,0,0)"), this.g.addColorStop(e, "rgba(0,0,0,0)"), this.g.addColorStop(1, "rgba(0,0,0,1)"));
                b.fillStyle = this.g;
                b.fillRect(0, 0, b.canvas.width, b.canvas.height);
                b.restore();
                lu(this, b, a)
            }
        }
    };

    function nu(a, b) {
        if (a.i = b) a.g = Date.now()
    }
    var ou = class {
        constructor() {
            this.y = this.x = 0;
            this.i = !1;
            this.g = 0
        }
        render(a, b) {
            a.save();
            var c = 0;
            this.i && (c = .25 * Math.sin(.025 * (Date.now() - this.g)));
            const d = this.x;
            c = this.y + c;
            var e = ol();
            const f = vl(e, d);
            e = wl(e, c);
            a.strokeStyle = "#fff";
            a.beginPath();
            a.moveTo(f, 0);
            a.lineTo(f, e);
            a.stroke();
            (b = b ? vh : Sh) && Al(b, d, c, .5);
            a.restore()
        }
    };

    function pu(a, b, c) {
        for (let d = 0; d < a.settings.length; ++d) {
            const e = a.settings[d],
                f = e[0],
                g = b[f],
                h = e[1],
                k = typeof h;
            void 0 !== g ? qu(a, f, k, g, e[2], e[3]) : c && qu(a, f, k, h, e[2], e[3])
        }
    }

    function qu(a, b, c, d, e, f) {
        switch (c) {
            case "number":
                d = Number(d);
                void 0 !== e && (d = Math.max(d, e));
                void 0 !== f && (d = Math.min(d, f));
                break;
            case "boolean":
                d = !!d
        }
        a.state.set(b, d)
    }
    var ru = class {
        constructor() {
            var a = {};
            this.state = new Map;
            this.settings = [
                ["match_size", 8, 1, 8],
                ["num_players", 8, 1, 8],
                ["match_duration", 120],
                ["match_ends_when_time_expires", !0],
                ["match_ends_when_lobby_empties", !0],
                ["lobby_ttl_sec", 30],
                ["player_join_ttl_sec", 5],
                ["init_ttl_sec", 10],
                ["match_fps", 24],
                ["countdown_timer", 5],
                ["use_pathfinding", !1],
                ["render_paths", !1],
                ["render_fog", !0],
                ["fog_intensity", 170],
                ["fog_scale_x", .125],
                ["fog_scale_y", .25],
                ["fog_scale_t", 3.2E-4],
                ["render_lighting", !0],
                ["render_map_layers_above_players",
                    !0
                ],
                ["light_map_debug", !1],
                ["player_vision_radius", 10],
                ["player_base_speed", 15],
                ["powerup_speed_multiplier", 1.5],
                ["use_collectible_stealing", !0],
                ["max_collectibles_held", -1],
                ["collectible_trail_speed", 10],
                ["collectible_respawn", !0],
                ["collectible_respawn_timer_ms", 18E3],
                ["power_pellet_respawn_timer_ms", 3E4],
                ["magnet_attraction_radius", 15],
                ["magnet_sensor_radius", 10],
                ["magnet_inversion_rate", .15],
                ["all_seeing_lighting_multiplier", 2.2],
                ["use_dematerialization", !0],
                ["sonic_boom_timer_ms", 700],
                ["score_delta_timer_ms",
                    250
                ],
                ["powerup_threshold_1", 15],
                ["powerup_threshold_2", 45],
                ["powerup_threshold_3", 105],
                ["powerup_threshold_4", 225],
                ["repel_smaller_collectible_holder", !0],
                ["ai_step_size", 7],
                ["ai_random_arc_range", Math.PI / 4],
                ["ai_action_timer_ms", 500],
                ["ai_seek_timer_ms", 3E3],
                ["steals_for_cooldown", 3],
                ["steal_delay_timer_ms", 1E3],
                ["steal_cooldown_timer_ms", 0],
                ["steal_speed_boost_time_ms", 1750],
                ["steal_speed_boost", 1.5],
                ["speed_boost_trail_coefficient", .01],
                ["use_ally_candle_bonus", !0],
                ["ally_candle_bonus_value", 5],
                ["ally_candle_bonus_cooldown_ms", 3E3],
                ["ally_bonus_timer_ms", 3E3],
                ["mega_flame_spawn_interval", 3E4],
                ["mega_flames_per_spawn", 2],
                ["mega_flame_movement_timer", 1E3],
                ["mega_flame_speed", 5],
                ["mega_flame_collectible_value", 10],
                ["mega_flame_flee_timer", 2500],
                ["mega_flame_flee_radius", 10],
                ["mega_flame_flee_speed", 20],
                ["invincible_timer_ms", 9E3],
                ["return_to_base_duration_ms", 2E3],
                ["sync_dt_threshold", .2],
                ["sync_slip_time", .1],
                ["sync_epsilon", 1],
                ["sync_coefficient", .1],
                ["client_broadcast_timeout", 50],
                ["draw_debug_location",
                    !1
                ],
                ["notice_duration_ms", 2E3],
                ["notice_offset_x", 0],
                ["notice_offset_y", 0],
                ["time_warning_duration_ms", 2E3],
                ["zoom_out_per_collectible_held", .5],
                ["zoom_tween_time_ms", 1E3],
                ["verify_map_hash", !1],
                ["is_2018", !1]
            ];
            for (const [b, c] of Object.entries(a)) this.settings.push([`env_${b}`, c]);
            pu(this, {}, !0)
        }
        update(a) {
            pu(this, a, !1)
        }
        get(a) {
            return this.state.get(a)
        }
        set(a, b) {
            this.state.set(a, b)
        }
    };

    function su() {}
    su.prototype.Te = function() {};
    su.prototype.g = function() {};

    function tu() {
        this.g = Y(0, 0);
        this.i = Y(0, 0)
    }
    var uu = [];

    function vu() {
        if (0 < uu.length) {
            var a = uu.pop();
            a.g.set(0, 0);
            a.i.set(0, 0);
            return a
        }
        return new tu
    }
    tu.prototype.Zc = function() {
        return 0 > this.i.x - this.g.x || 0 > this.i.y - this.g.y ? !1 : this.g.Zc() && this.i.Zc()
    };
    tu.prototype.contains = function(a) {
        var b;
        return b = (b = (b = (b = this.g.x <= a.g.x) && this.g.y <= a.g.y) && a.i.x <= this.i.x) && a.i.y <= this.i.y
    };
    tu.prototype.rd = function(a) {
        return 0 < a.g.x - this.i.x || 0 < a.g.y - this.i.y || 0 < this.g.x - a.i.x ? !1 : 0 >= this.g.y - a.i.y
    };

    function wu(a, b, c) {
        a.g.x = Math.min(b.g.x, c.g.x);
        a.g.y = Math.min(b.g.y, c.g.y);
        a.i.x = Math.max(b.i.x, c.i.x);
        a.i.y = Math.max(b.i.y, c.i.y)
    };

    function xu() {
        this.Db = Y(0, 0);
        this.Ab = Y(0, 0);
        this.c = Y(0, 0);
        this.ub = this.a = this.Tb = null
    }
    xu.prototype.set = function(a) {
        this.Db.Ca(a.Db);
        this.Ab.Ca(a.Ab);
        this.c.Ca(a.c);
        this.Tb = a.Tb;
        this.a = a.a;
        this.ub = a.ub
    };

    function yu(a, b, c) {
        void 0 === c && (c = 0);
        b.position.x = (1 - c) * a.Ab.x + c * a.c.x;
        b.position.y = (1 - c) * a.Ab.y + c * a.c.y;
        b.R.set((1 - c) * a.Tb + c * a.a);
        c = b.R;
        b.position.x -= c.T.x * a.Db.x + c.U.x * a.Db.y;
        b.position.y -= c.T.y * a.Db.x + c.U.y * a.Db.y
    }
    xu.prototype.advance = function(a) {
        void 0 === a && (a = 0);
        if (this.ub < a && 1 - this.ub > Number.MIN_VALUE) {
            var b = (a - this.ub) / (1 - this.ub);
            this.Ab.x = (1 - b) * this.Ab.x + b * this.c.x;
            this.Ab.y = (1 - b) * this.Ab.y + b * this.c.y;
            this.Tb = (1 - b) * this.Tb + b * this.a;
            this.ub = a
        }
    };

    function zu(a) {
        this.rb = a;
        this.g = this.next = null
    }
    var Au = [];
    zu.prototype.zc = function(a) {
        this.g = a
    };
    zu.prototype.La = function() {
        return this.next
    };

    function Bu() {
        this.i = [];
        for (var a = 0; a <= Cu; a++) this.i[a] = null;
        this.j = [];
        for (a = 0; a <= Cu; a++) this.j[a] = null;
        this.g = {}
    }
    Bu.prototype.Pa = function(a) {
        return this.i[a]
    };

    function Du(a, b) {
        var c = b.i;
        if (null == a.g[c]) {
            a.g[c] = [];
            for (var d = 0; d <= Cu; d++) a.g[c][d] = null;
            Eu(a, b, c, Cu)
        }
    }

    function Fu(a, b, c, d) {
        c ? Eu(a, b, b.i, Gu) : Hu(a, b.i, Gu);
        d ? Eu(a, b, b.i, Iu) : Hu(a, b.i, Iu)
    }

    function Ju(a, b) {
        b = b.i;
        if (null != a.g[b]) {
            for (var c = 0; c <= Cu; c++) Hu(a, b, c);
            delete a.g[b]
        }
    }

    function Hu(a, b, c) {
        var d = a.g[b];
        if (null != d && (b = d[c], null != b)) {
            d[c] = null;
            d = b.g;
            var e = b.La();
            null == d ? a.i[c] = e : d.next = e;
            null == e ? a.j[c] = d : e.zc(d);
            Au.push(b)
        }
    }

    function Eu(a, b, c, d) {
        c = a.g[c];
        if (null == c[d]) {
            if (0 < Au.length) {
                var e = Au.pop();
                e.next = null;
                e.g = null;
                e.rb = b;
                b = e
            } else b = new zu(b);
            c[d] = b;
            b = a.j[d];
            null != b ? (b.next = c[d], c[d].zc(b)) : a.i[d] = c[d];
            a.j[d] = c[d]
        }
    }
    var Gu = 0,
        Iu = 1,
        Cu = 2;

    function Ku(a) {
        this.body = a;
        this.g = this.next = null
    }
    Ku.prototype.zc = function(a) {
        this.g = a
    };
    Ku.prototype.La = function() {
        return this.next
    };

    function Lu() {
        this.i = [];
        for (var a = 0; a <= Mu; a++) this.i[a] = null;
        this.j = [];
        for (a = 0; a <= Mu; a++) this.j[a] = null;
        this.g = {}
    }
    Lu.prototype.Pa = function(a) {
        return this.i[a]
    };

    function Nu(a, b) {
        var c = b.getType(),
            d = b.wa,
            e = b.bc(),
            f = b.isActive();
        2 == c ? Ou(a, b, d, Pu) : Qu(a, d, Pu);
        0 != c ? Ou(a, b, d, Ru) : Qu(a, d, Ru);
        0 != c && f && e ? Ou(a, b, d, Su) : Qu(a, d, Su);
        e ? Ou(a, b, d, Tu) : Qu(a, d, Tu);
        f ? Ou(a, b, d, Uu) : Qu(a, d, Uu)
    }

    function Qu(a, b, c) {
        var d = a.g[b];
        null != d && (b = d[c], null != b && (d[c] = null, d = b.g, b = b.La(), null == d ? a.i[c] = b : d.next = b, null == b ? a.j[c] = d : b.zc(d)))
    }

    function Ou(a, b, c, d) {
        var e = a.g[c];
        if (null == e) {
            e = [];
            for (var f = 0; f <= Mu; f++) e[f] = null;
            a.g[c] = e
        }
        null == e[d] && (e[d] = new Ku(b), b = a.j[d], null != b ? b.next = e[d] : a.i[d] = e[d], e[d].zc(b), a.j[d] = e[d])
    }
    var Pu = 0,
        Ru = 1,
        Uu = 2,
        Su = 3,
        Tu = 4,
        Mu = 5;

    function Vu() {}
    Vu.prototype.Pa = function() {
        return null
    };

    function Wu(a) {
        this.Ja = vu();
        this.parent = this.Zb = this.Gb = null;
        this.hb = a
    }
    var Xu = [];

    function Yu(a) {
        "undefined" == typeof a && (a = null);
        if (0 < Xu.length) {
            var b = Xu.pop();
            b.hb = a;
            a = b.Ja;
            a.g.set(0, 0);
            a.i.set(0, 0);
            return b
        }
        return new Wu(a)
    }
    Wu.prototype.destroy = function() {
        this.hb = this.parent = this.Zb = this.Gb = null;
        Xu.push(this)
    };

    function Zu(a, b) {
        this.H = "Fixture" + $u++;
        var c = b.filter,
            d = new $n;
        d.g = c.g;
        d.i = c.i;
        d.j = c.j;
        this.v = d;
        this.j = vu();
        this.O = vu();
        this.g = a;
        this.Sa = b.g.Zd();
        this.u = b.i;
        this.V = b.H;
        this.va = b.va;
        this.o = b.j;
        this.i = null
    }
    Zu.prototype.destroy = function() {
        var a = this.j;
        null != a && uu.push(a)
    };

    function av(a, b, c, d) {
        if (a.i) {
            a.Sa.Mc(a.j, c);
            a.Sa.Mc(a.O, d);
            wu(a.j, a.j, a.O);
            c = Bn(d.position, c.position);
            d = a.i;
            var e = b.u;
            a = a.j;
            Dn(null === d.Gb);
            if (d.Ja.contains(a)) e = !1;
            else {
                bv(e, d);
                var f = .1 + 2 * Math.abs(c.x),
                    g = .1 + 2 * Math.abs(c.y);
                d.Ja.g.x = a.g.x - f;
                d.Ja.g.y = a.g.y - g;
                d.Ja.i.x = a.i.x + f;
                d.Ja.i.y = a.i.y + g;
                cv(e, d);
                e = !0
            }
            e && b.i.push(d);
            Z(c)
        }
    }
    var $u = 0;

    function dv(a) {
        this.hb = a;
        this.g = this.next = null
    }
    dv.prototype.zc = function(a) {
        this.g = a
    };
    dv.prototype.La = function() {
        return this.next
    };

    function ev() {
        this.j = this.i = null;
        this.g = {}
    }
    ev.prototype.Pa = function() {
        return this.i
    };

    function fv(a, b) {
        var c = b.H;
        if (null == a.g[c]) {
            b = new dv(b);
            var d = a.j;
            null != d ? d.next = b : a.i = b;
            b.zc(d);
            a.j = b;
            a.g[c] = b
        }
    }

    function gv(a, b) {
        b = b.H;
        var c = a.g[b];
        if (null != c) {
            var d = c.g;
            c = c.La();
            null == d ? a.i = c : d.next = c;
            null == c ? a.j = d : c.zc(d);
            delete a.g[b]
        }
    };

    function hv(a, b) {
        this.wa = "Body" + iv++;
        this.ta = new Un;
        this.ta.position.Ca(a.position);
        this.ta.R.set(a.angle);
        this.ha = new xu;
        an(this.ha.Db);
        this.ha.ub = 1;
        this.ha.Tb = this.ha.a = a.angle;
        this.ha.c.x = this.ta.R.T.x * this.ha.Db.x + this.ta.R.U.x * this.ha.Db.y;
        this.ha.c.y = this.ta.R.T.y * this.ha.Db.x + this.ta.R.U.y * this.ha.Db.y;
        this.ha.c.x += this.ta.position.x;
        this.ha.c.y += this.ta.position.y;
        this.ha.Ab.Ca(this.ha.c);
        this.ka = dn(a.V);
        this.va = Y(0, 0);
        this.v = a.v;
        this.Ea = a.H;
        this.ya = a.i;
        this.V = a.u;
        this.u = a.active;
        this.g = b;
        this.Qb = null;
        this.tb = new Bu;
        this.Na = new Vu;
        this.Aa = a.o;
        this.Ia = a.O;
        this.Ba = a.j;
        this.O = this.Oa = 0;
        this.o = a.type;
        this.Kb = 2 == this.o ? 1 : 0;
        this.Ma = 2 == this.o ? 1 : 0;
        this.nb = this.j = 0;
        this.Qa = a.g;
        this.i = new ev;
        this.H = []
    }

    function co(a, b) {
        Dn(!a.g.i);
        b = new Zu(a, b);
        if (a.u) {
            var c = a.g.g.g;
            b.Sa.Mc(b.j, a.ta);
            b.i = jv(c, b.j, b)
        }
        fv(a.i, b);
        b.g = a;
        0 < b.u && kv(a);
        a.g.v = !0;
        return b
    }
    q = hv.prototype;
    q.destroy = function() {
        Z(this.ka);
        Z(this.va)
    };

    function Ut(a, b) {
        Dn(!a.g.i);
        gv(a.i, b);
        for (var c = a.tb.Pa(Cu); c; c = c.La()) b != c.rb.mb && b != c.rb.kb || a.g.g.destroy(c.rb);
        if (a.u && null != b.i) {
            c = a.g.g.g;
            var d = b.i;
            Wa(c.i, d);
            bv(c.u, d);
            d.destroy();
            b.i = null
        }
        b.destroy();
        kv(a)
    }

    function kn(a, b, c) {
        Dn(!a.g.i);
        a.ta.R.set(c);
        a.ta.position.Ca(b);
        b = a.ta.R;
        var d = a.ha.Db;
        a.ha.c.x = b.T.x * d.x + b.U.x * d.y;
        a.ha.c.y = b.T.y * d.x + b.U.y * d.y;
        a.ha.c.x += a.ta.position.x;
        a.ha.c.y += a.ta.position.y;
        a.ha.Ab.Ca(a.ha.c);
        a.ha.Tb = a.ha.a = c;
        c = a.g.g.g;
        for (b = a.i.Pa(); b; b = b.La()) av(b.hb, c, a.ta, a.ta);
        lv(a.g.g)
    }
    q.setTransform = function(a) {
        kn(this, a.position, Math.atan2(a.R.T.y, a.R.T.x))
    };

    function ln(a, b) {
        0 != a.o && a.ka.Ca(b)
    }
    q.split = function(a) {
        var b = dn(this.ka),
            c = this.Aa,
            d = this.ha.c,
            e = this.g,
            f = new Zn;
        f.type = this.getType();
        f.i = this.ya;
        f.angle = this.ha.a;
        f.j = this.Ba;
        f.o = this.Aa;
        f.H = this.Ea;
        f.v = this.v;
        f.active = this.u;
        f.u = this.V;
        f.O = this.Ia;
        f.V.Ca(this.ka);
        f.position.Ca(this.ta.position);
        e = bo(e, f);
        for (f = this.i.Pa(); f; f = f.La()) {
            var g = f.hb;
            a(g) && (gv(this.i, g), fv(e.i, g))
        }
        kv(this);
        kv(e);
        a = e.ha.c;
        g = Bn(this.ha.c, d);
        f = Y(-c * g.y, c * g.x);
        Z(g);
        g = Y(b.x + f.x, b.y + f.y);
        Z(f);
        ln(this, g);
        Z(g);
        a = Bn(a, d);
        d = Y(-c * a.y, c * a.x);
        Z(a);
        a = Y(b.x + d.x, b.y +
            d.y);
        Z(d);
        ln(e, a);
        Z(a);
        Z(b);
        0 != this.o && (this.Aa = c);
        0 != e.o && (e.Aa = c);
        mv(this);
        mv(e);
        return e
    };

    function kv(a) {
        a.Kb = 0;
        a.Ma = 0;
        a.j = 0;
        a.nb = 0;
        an(a.ha.Db);
        if (0 != a.o && 1 != a.o) {
            for (var b = Y(0, 0), c = a.i.Pa(); c; c = c.La()) {
                var d = c.hb;
                if (0 != d.u) {
                    var e = void 0;
                    0 < qn.length ? (e = qn.pop(), e.i = 0, an(e.g), e.I = 0) : e = new pn;
                    d.Sa.xe(e, d.u);
                    a.Kb += e.i;
                    b.x += e.g.x * e.i;
                    b.y += e.g.y * e.i;
                    a.j += e.I
                }
            }
            0 < a.Kb ? (a.Ma = 1 / a.Kb, b.x *= a.Ma, b.y *= a.Ma) : (a.Kb = 1, a.Ma = 1);
            0 < a.j && !a.Ea ? (a.j -= a.Kb * (b.x * b.x + b.y * b.y), a.j *= a.Qa, Dn(0 < a.j), a.nb = 1 / a.j) : (a.j = 0, a.nb = 0);
            c = dn(a.ha.c);
            a.ha.Db.Ca(b);
            a.ha.Ab.Ca(An(a.ta, a.ha.Db));
            a.ha.c.Ca(a.ha.Ab);
            a.ka.x += a.Aa *
                -(a.ha.c.y - c.y);
            a.ka.y += a.Aa * +(a.ha.c.x - c.x);
            Z(b);
            Z(c)
        }
    }
    q.getType = function() {
        return this.o
    };

    function nv(a, b) {
        if (a.V != b)
            for (a.V = b, a.O = 0, b || (an(a.ka), a.Aa = 0, an(a.va), a.Oa = 0), b = 0; b < a.H.length; b++) Nu(a.H[b], a)
    }
    q.bc = function() {
        return this.V
    };
    q.setActive = function(a) {
        var b;
        if (a != this.u) {
            if (a)
                for (this.u = !0, a = this.g.g.g, b = this.i.Pa(); b; b = b.La()) {
                    var c = b.hb,
                        d = a;
                    c.Sa.Mc(c.j, this.ta);
                    c.i = jv(d, c.j, c)
                } else {
                    this.u = !1;
                    a = this.g.g.g;
                    for (b = this.i.Pa(); b; b = b.La())
                        if (c = b.hb, null != c.i) {
                            d = a;
                            var e = c.i;
                            Wa(d.i, e);
                            bv(d.u, e);
                            e.destroy();
                            c.i = null
                        } for (a = this.tb.Pa(Cu); a; a = a.La()) this.g.g.destroy(a.rb)
                }
            for (a = 0; a < this.H.length; a++) Nu(this.H[a], this)
        }
    };
    q.isActive = function() {
        return this.u
    };

    function mv(a) {
        ov.R.set(a.ha.Tb);
        var b = ov.R,
            c = a.ha.Db;
        ov.position.x = a.ha.Ab.x - (b.T.x * c.x + b.U.x * c.y);
        ov.position.y = a.ha.Ab.y - (b.T.y * c.x + b.U.y * c.y);
        b = a.g.g.g;
        for (c = a.i.Pa(); c; c = c.La()) av(c.hb, b, ov, a.ta)
    }

    function pv(a) {
        a.ta.R.set(a.ha.a);
        var b = a.ta.R,
            c = a.ha.Db;
        a.ta.position.x = a.ha.c.x - (b.T.x * c.x + b.U.x * c.y);
        a.ta.position.y = a.ha.c.y - (b.T.y * c.x + b.U.y * c.y)
    }

    function qv(a, b) {
        if (2 != a.o && 2 != b.o) return !1;
        for (a = a.Qb; a; a = a.next)
            if (a.Wb == b && 0 == a.Cc.Qf) return !1;
        return !0
    }
    q.advance = function(a) {
        this.ha.advance(a);
        this.ha.c.Ca(this.ha.Ab);
        this.ha.a = this.ha.Tb;
        pv(this)
    };
    var iv = 0,
        ov = new Un;

    function rv() {
        this.j = this.i = this.o = this.g = 0
    }

    function sv(a, b) {
        a.g = b;
        a.o = a.g & 255;
        a.i = (a.g & 65280) >> 8 & 255;
        a.j = (a.g & 16711680) >> 16 & 255;
        a.u = (a.g & 4278190080) >> 24 & 255
    }
    rv.prototype.set = function(a) {
        sv(this, a.g)
    };

    function tv() {
        this.g = null
    }

    function cv(a, b) {
        if (null === a.g) a.g = b, a.g.parent = null;
        else {
            var c = b.Ja;
            c = Y((c.g.x + c.i.x) / 2, (c.g.y + c.i.y) / 2);
            for (var d = a.g; null !== d.Gb;) {
                var e = d.Gb;
                d = d.Zb;
                d = Math.abs((e.Ja.g.x + e.Ja.i.x) / 2 - c.x) + Math.abs((e.Ja.g.y + e.Ja.i.y) / 2 - c.y) < Math.abs((d.Ja.g.x + d.Ja.i.x) / 2 - c.x) + Math.abs((d.Ja.g.y + d.Ja.i.y) / 2 - c.y) ? e : d
            }
            Z(c);
            c = d;
            e = c.parent;
            d = Yu();
            d.parent = e;
            wu(d.Ja, b.Ja, c.Ja);
            if (e)
                for (c.parent.Gb == c ? e.Gb = d : e.Zb = d, d.Gb = c, d.Zb = b, c.parent = d, b.parent = d; e && !e.Ja.contains(d.Ja);) wu(e.Ja, e.Gb.Ja, e.Zb.Ja), d = e, e = e.parent;
            else d.Gb =
                c, d.Zb = b, c.parent = d, b.parent = d, a.g = d
        }
    }

    function bv(a, b) {
        if (b == a.g) a.g = null;
        else {
            var c = b.parent,
                d = c.parent;
            b = c.Gb == b ? c.Zb : c.Gb;
            if (d)
                for (d.Gb == c ? d.Gb = b : d.Zb = b, b.parent = d; d;) {
                    a = d.Ja;
                    wu(d.Ja, d.Gb.Ja, d.Zb.Ja);
                    if (a.contains(d.Ja)) break;
                    d = d.parent
                } else a.g = b, b.parent = null;
            c.destroy()
        }
    };

    function uv() {
        this.u = new tv;
        this.i = [];
        this.g = this.v = this.o = this.j = null
    }

    function jv(a, b, c) {
        var d = a.u;
        c = Yu(c);
        c.Ja.g.x = b.g.x - .1;
        c.Ja.g.y = b.g.y - .1;
        c.Ja.i.x = b.i.x + .1;
        c.Ja.i.y = b.i.y + .1;
        cv(d, c);
        a.i.push(c);
        return c
    }
    uv.prototype.rd = function(a, b) {
        return a.Ja.rd(b.Ja)
    };

    function vv(a, b) {
        a.j = null;
        a.o = null;
        for (a.v = b; 0 < a.i.length;) {
            a.g = a.i.pop();
            var c = a.u;
            b = a.H;
            var d = a.g.Ja,
                e = a;
            if (null !== c.g) {
                var f = [];
                for (f.push(c.g); 0 < f.length;)
                    if (c = f.pop(), c.Ja.rd(d))
                        if (null === c.Gb) {
                            if (!b.call(e, c.hb)) break
                        } else f.push(c.Gb), f.push(c.Zb)
            }
        }
        a.j = null;
        a.o = null;
        a.v = null;
        a.g = null
    }
    uv.prototype.H = function(a) {
        a == this.g.hb || this.g.hb == this.j && a == this.o || this.g.hb == this.o && a == this.j || (this.v(this.g.hb, a), this.j = this.g.hb, this.o = a);
        return !0
    };

    function wv(a, b) {
        a = a.v;
        b = b.v;
        return a.j == b.j && 0 != a.j ? 0 < a.j : 0 != (a.i & b.g) && 0 != (a.g & b.i)
    };

    function xv() {
        this.g = Y(0, 0);
        this.id = new rv
    }
    xv.prototype.set = function(a) {
        this.g.Ca(a.g);
        this.id.set(a.id)
    };

    function yv() {
        this.Ga = Y(0, 0);
        this.jc = new rv;
        this.xc = this.wc = 0
    }
    yv.prototype.reset = function() {
        an(this.Ga);
        this.xc = this.wc = 0;
        sv(this.jc, 0)
    };
    yv.prototype.set = function(a) {
        this.Ga.Ca(a.Ga);
        this.wc = a.wc;
        this.xc = a.xc;
        this.jc.set(a.jc)
    };

    function zv() {
        this.j = this.g = 0;
        this.Da = [];
        for (var a = 0; 2 > a; a++) this.Da[a] = new yv;
        this.i = Y(0, 0);
        this.Ga = Y(0, 0)
    }
    zv.prototype.reset = function() {
        for (var a = 0; 2 > a; a++) this.Da[a].reset();
        an(this.i);
        an(this.Ga);
        this.g = this.j = 0
    };
    zv.prototype.set = function(a) {
        this.g = a.g;
        for (var b = 0; 2 > b; b++) this.Da[b].set(a.Da[b]);
        this.i.Ca(a.i);
        this.Ga.Ca(a.Ga);
        this.j = a.j
    };

    function Av(a, b, c, d) {
        var e = 0,
            f = b[0].g,
            g = b[1].g,
            h = c.x * f.x + c.y * f.y - d;
        c = c.x * g.x + c.y * g.y - d;
        0 >= h && a[e++].set(b[0]);
        0 >= c && a[e++].set(b[1]);
        0 > h * c && (c = h / (h - c), d = a[e].g, d.x = f.x + c * (g.x - f.x), d.y = f.y + c * (g.y - f.y), a[e].id = 0 < h ? b[0].id : b[1].id, e++);
        return e
    }

    function Bv(a, b, c, d, e) {
        for (var f = b.R.T.x * a.i[c].x + b.R.U.x * a.i[c].y, g = b.R.T.y * a.i[c].x + b.R.U.y * a.i[c].y, h = e.R.T.x * f + e.R.T.y * g, k = e.R.U.x * f + e.R.U.y * g, l = 0, m = Number.MAX_VALUE, n = 0; n < d.o; n++) {
            var w = d.g[n].x * h + d.g[n].y * k;
            w < m && (m = w, l = n)
        }
        return (e.position.x + (e.R.T.x * d.g[l].x + e.R.U.x * d.g[l].y) - (b.position.x + (b.R.T.x * a.g[c].x + b.R.U.x * a.g[c].y))) * f + (e.position.y + (e.R.T.y * d.g[l].x + e.R.U.y * d.g[l].y) - (b.position.y + (b.R.T.y * a.g[c].x + b.R.U.y * a.g[c].y))) * g
    }

    function Cv(a, b, c, d) {
        var e = d.position.x + (d.R.T.x * c.u.x + d.R.U.x * c.u.y),
            f = d.position.y + (d.R.T.y * c.u.x + d.R.U.y * c.u.y);
        e -= b.position.x + (b.R.T.x * a.u.x + b.R.U.x * a.u.y);
        f -= b.position.y + (b.R.T.y * a.u.x + b.R.U.y * a.u.y);
        var g = e * b.R.T.x + f * b.R.T.y;
        f = e * b.R.U.x + f * b.R.U.y;
        e = 0;
        for (var h = -Number.MAX_VALUE, k = 0; k < a.o; ++k) {
            var l = a.i[k].x * g + a.i[k].y * f;
            l > h && (h = l, e = k)
        }
        g = Bv(a, b, e, c, d);
        k = e - 1;
        0 > k && (k = a.o - 1);
        f = Bv(a, b, k, c, d);
        l = e + 1;
        l >= a.o && (l = 0);
        h = Bv(a, b, l, c, d);
        if (f > g && f > h)
            for (;;)
                if (e = k - 1, 0 > e && (e = a.o - 1), g = Bv(a, b, e, c, d), g > f) k = e,
                    f = g;
                else break;
        else if (h > g)
            for (k = l, f = h;;)
                if (e = k + 1, e >= a.o && (e = 0), g = Bv(a, b, e, c, d), g > f) k = e, f = g;
                else break;
        else k = e, f = g;
        return {
            Ue: k,
            Pd: f
        }
    }
    var Dv = [new xv, new xv],
        Ev = [new xv, new xv],
        Fv = [new xv, new xv],
        Gv = Y(0, 0),
        Hv = Y(0, 0),
        Iv = Y(0, 0),
        Jv = Y(0, 0),
        Kv = Y(0, 0),
        Lv = Y(0, 0),
        Mv = Y(0, 0),
        Nv = Y(0, 0);

    function Ov() {
        this.Ga = Y(0, 0);
        this.g = Y(0, 0);
        this.j = this.i = null
    }
    Ov.prototype.evaluate = function(a, b) {
        var c = 0;
        switch (this.o) {
            case 1:
                var d = zn(a.R, this.g),
                    e = bn(this.g);
                c = zn(b.R, e);
                Z(e);
                var f = Rn(this.i, d);
                Z(d);
                d = Rn(this.j, c);
                Z(c);
                a = An(a, f);
                b = An(b, d);
                c = (b.x - a.x) * this.g.x + (b.y - a.y) * this.g.y;
                Z(a);
                Z(b);
                break;
            case 2:
                e = yn(a.R, this.g);
                f = bn(e);
                c = zn(b.R, f);
                Z(f);
                d = Rn(this.j, c);
                Z(c);
                a = An(a, this.Ga);
                b = An(b, d);
                c = (b.x - a.x) * e.x + (b.y - a.y) * e.y;
                Z(e);
                Z(a);
                Z(b);
                break;
            case 4:
                e = yn(b.R, this.g);
                f = bn(e);
                d = zn(a.R, f);
                Z(f);
                f = Rn(this.i, d);
                Z(d);
                a = An(a, f);
                b = An(b, this.Ga);
                c = (a.x - b.x) * e.x + (a.y - b.y) *
                    e.y;
                Z(e);
                Z(a);
                Z(b);
                break;
            default:
                Dn(!1)
        }
        return c
    };
    var Pv = 0,
        Qv = 0,
        Rv = 0,
        Sv = new Sn,
        Tv = new On,
        Uv = new Un,
        Vv = new Un,
        Wv = new Ov,
        Xv = new Pn;

    function Yv(a, b) {
        this.i = "Contact" + Zv++;
        this.g = new zv;
        this.u = new zv;
        this.o = !1;
        var c = a.g,
            d = b.g;
        this.ya = 2 != c.getType() || c.v || 2 != d.getType() || d.v;
        this.va = a.o || b.o;
        this.V = !1;
        this.mb = a;
        this.kb = b;
        this.Ec = null;
        this.v = !0;
        this.H = c.tb;
        this.O = d.tb;
        this.wa = d.g.tb;
        $v(this)
    }
    Yv.prototype.reset = function(a, b) {
        this.g.reset();
        this.u.reset();
        this.o = !1;
        var c = a.g,
            d = b.g;
        this.ya = 2 != c.getType() || c.v || 2 != d.getType() || d.v;
        this.va = a.o || b.o;
        this.V = !1;
        this.mb = a;
        this.kb = b;
        this.v = !0;
        this.H = c.tb;
        this.O = d.tb;
        this.wa = d.g.tb;
        $v(this)
    };

    function $v(a) {
        Du(a.H, a);
        Du(a.O, a);
        Du(a.wa, a);
        aw(a)
    }

    function aw(a) {
        var b = !1,
            c = !1;
        !a.va && a.v && (a.o && (b = !0), a.ya && (c = !0));
        Fu(a.H, a, b, c);
        Fu(a.O, a, b, c);
        Fu(a.wa, a, b, c)
    }

    function bw(a, b) {
        var c = a.mb.g;
        return c != b ? c : a.kb.g
    }
    Yv.prototype.update = function(a) {
        var b = this.u;
        this.u = this.g;
        this.g = b;
        this.v = !0;
        var c = !1;
        b = this.o;
        var d = this.mb.g,
            e = this.kb.g,
            f = this.mb.j.rd(this.kb.j);
        if (this.va) {
            if (f) {
                c = this.mb.Sa;
                d = d.ta;
                f = this.kb.Sa;
                var g = e.ta;
                e = new On;
                e.g = new Qn;
                e.g.set(c);
                e.i = new Qn;
                e.i.set(f);
                e.j = d;
                e.o = g;
                e.u = !0;
                d = new Sn;
                d.count = 0;
                c = new Pn;
                Ln(c, d, e);
                Z(c.g);
                Z(c.i);
                c = c.j < 10 * Number.MIN_VALUE
            }
            this.g.g = 0
        } else {
            this.ya = 2 != d.getType() || d.v || 2 != e.getType() || e.v;
            if (f)
                for (this.evaluate(), c = 0 < this.g.g, f = 0; f < this.g.g; f++) {
                    g = this.g.Da[f];
                    g.wc =
                        0;
                    for (var h = g.xc = 0; h < this.u.g; h++) {
                        var k = this.u.Da[h];
                        if (k.jc.g == g.jc.g) {
                            g.wc = k.wc;
                            g.xc = k.xc;
                            break
                        }
                    }
                } else this.g.g = 0;
            c != b && (nv(d, !0), nv(e, !0))
        }
        this.o = c;
        c != b && aw(this);
        !b && c && a.Te(this)
    };
    Yv.prototype.evaluate = function() {};
    var cw = new function() {
            this.g = new Qn;
            this.i = new Qn;
            this.j = new xu;
            this.o = new xu
        },
        Zv = 0;

    function dw(a, b) {
        Yv.call(this, a, b)
    }
    ta(dw, Yv);
    dw.prototype.reset = function(a, b) {
        dw.Rb.reset.call(this, a, b)
    };
    dw.prototype.evaluate = function() {
        var a = this.g,
            b = this.mb.Sa,
            c = this.mb.g.ta,
            d = this.kb.Sa,
            e = this.kb.g.ta;
        a.g = 0;
        var f = e.position.x + (e.R.T.x * d.g.x + e.R.U.x * d.g.y) - (c.position.x + (c.R.T.x * b.g.x + c.R.U.x * b.g.y));
        c = e.position.y + (e.R.T.y * d.g.x + e.R.U.y * d.g.y) - (c.position.y + (c.R.T.y * b.g.x + c.R.U.y * b.g.y));
        e = b.j + d.j;
        f * f + c * c > e * e || (a.j = 1, a.Ga.Ca(b.g), an(a.i), a.g = 1, a.Da[0].Ga.Ca(d.g), sv(a.Da[0].jc, 0))
    };

    function ew() {};

    function fw(a, b) {
        Yv.call(this, a, b)
    }
    ta(fw, Yv);
    fw.prototype.reset = function(a, b) {
        fw.Rb.reset.call(this, a, b)
    };
    fw.prototype.evaluate = function() {};

    function gw(a, b) {
        Dn(a.Sa instanceof Vn);
        Dn(b.Sa instanceof zt);
        Yv.call(this, a, b)
    }
    ta(gw, Yv);
    gw.prototype.reset = function(a, b) {
        Dn(a.Sa instanceof Vn);
        Dn(b.Sa instanceof zt);
        gw.Rb.reset.call(this, a, b)
    };
    gw.prototype.evaluate = function() {
        a: {
            var a = this.g,
                b = this.mb.Sa,
                c = this.mb.g.ta,
                d = this.kb.Sa,
                e = this.kb.g.ta;a.g = 0;
            var f = e.position.x + (e.R.T.x * d.g.x + e.R.U.x * d.g.y) - c.position.x,
                g = e.position.y + (e.R.T.y * d.g.x + e.R.U.y * d.g.y) - c.position.y;e = f * c.R.T.x + g * c.R.T.y;c = f * c.R.U.x + g * c.R.U.y;f = 0;g = -Number.MAX_VALUE;
            for (var h = b.j + d.j, k = 0; k < b.o; ++k) {
                var l = b.i[k].x * (e - b.g[k].x) + b.i[k].y * (c - b.g[k].y);
                if (l > h) break a;
                l > g && (g = l, f = k)
            }
            l = f + 1;l >= b.o && (l = 0);k = b.g[f];
            var m = b.g[l];
            if (g < Number.MIN_VALUE) a.g = 1,
            a.j = 2,
            a.i.Ca(b.i[f]),
            a.Ga.x = .5 * (k.x + m.x),
            a.Ga.y = .5 * (k.y + m.y);
            else if (0 >= (e - k.x) * (m.x - k.x) + (c - k.y) * (m.y - k.y)) {
                if ((e - k.x) * (e - k.x) + (c - k.y) * (c - k.y) > h * h) break a;
                a.g = 1;
                a.j = 2;
                a.i.x = e - k.x;
                a.i.y = c - k.y;
                gn(a.i);
                a.Ga.Ca(k)
            } else if (0 >= (e - m.x) * (k.x - m.x) + (c - m.y) * (k.y - m.y)) {
                if ((e - m.x) * (e - m.x) + (c - m.y) * (c - m.y) > h * h) break a;
                a.g = 1;
                a.j = 2;
                a.i.x = e - m.x;
                a.i.y = c - m.y;
                gn(a.i);
                a.Ga.Ca(m)
            } else {
                l = .5 * (k.x + m.x);
                k = .5 * (k.y + m.y);
                g = (e - l) * b.i[f].x + (c - k) * b.i[f].y;
                if (g > h) break a;
                a.g = 1;
                a.j = 2;
                a.i.x = b.i[f].x;
                a.i.y = b.i[f].y;
                gn(a.i);
                a.Ga.set(l, k)
            }
            a.Da[0].Ga.Ca(d.g);
            sv(a.Da[0].jc, 0)
        }
    };

    function hw(a, b) {
        Dn(a.Sa instanceof Vn);
        Dn(!1);
        Yv.call(this, a, b)
    }
    ta(hw, Yv);
    hw.prototype.reset = function(a, b) {
        Dn(a.Sa instanceof Vn);
        Dn(!1);
        hw.Rb.reset.call(this, a, b)
    };
    hw.prototype.evaluate = function() {};

    function iw(a, b) {
        Yv.call(this, a, b)
    }
    ta(iw, Yv);
    iw.prototype.reset = function(a, b) {
        iw.Rb.reset.call(this, a, b)
    };
    iw.prototype.evaluate = function() {
        var a = this.g,
            b = this.mb.Sa,
            c = this.mb.g.ta,
            d = this.kb.Sa,
            e = this.kb.g.ta;
        a.g = 0;
        var f = b.j + d.j,
            g = Cv(b, c, d, e);
        if (!(g.Pd > f)) {
            var h = Cv(d, e, b, c);
            if (!(h.Pd > f)) {
                var k = b,
                    l = d,
                    m = c,
                    n = e,
                    w = 0,
                    v = g.Ue;
                a.j = 2;
                h.Pd > .98 * g.Pd + .001 && (k = d, l = b, m = e, n = c, v = h.Ue, a.j = 4, w = 1);
                b = v;
                c = n;
                e = m.R.T.x * k.i[b].x + m.R.U.x * k.i[b].y;
                g = m.R.T.y * k.i[b].x + m.R.U.y * k.i[b].y;
                d = c.R.T.x * e + c.R.T.y * g;
                g = c.R.U.x * e + c.R.U.y * g;
                e = d;
                d = 0;
                h = Number.MAX_VALUE;
                for (var A = 0; A < l.o; A++) {
                    var p = e * l.i[A].x + g * l.i[A].y;
                    p < h && (h = p, d = A)
                }
                e = d + 1;
                e >= l.o &&
                    (e = 0);
                Dv[0].g.x = c.position.x + (c.R.T.x * l.g[d].x + c.R.U.x * l.g[d].y);
                Dv[0].g.y = c.position.y + (c.R.T.y * l.g[d].x + c.R.U.y * l.g[d].y);
                g = Dv[0].id;
                g.o = b;
                g.g = g.g & 4294967040 | g.o & 255;
                g = Dv[0].id;
                g.i = d;
                g.g = g.g & 4294902015 | g.i << 8 & 65280;
                d = Dv[0].id;
                d.j = 0;
                d.g = d.g & 4278255615 | d.j << 16 & 16711680;
                Dv[1].g.x = c.position.x + (c.R.T.x * l.g[e].x + c.R.U.x * l.g[e].y);
                Dv[1].g.y = c.position.y + (c.R.T.y * l.g[e].x + c.R.U.y * l.g[e].y);
                l = Dv[1].id;
                l.o = b;
                l.g = l.g & 4294967040 | l.o & 255;
                b = Dv[1].id;
                b.i = e;
                b.g = b.g & 4294902015 | b.i << 8 & 65280;
                b = Dv[1].id;
                b.j = 1;
                b.g =
                    b.g & 4278255615 | b.j << 16 & 16711680;
                b = k.g[v];
                k = v + 1 < k.o ? k.g[v + 1] : k.g[0];
                Gv.set(k.x - b.x, k.y - b.y);
                gn(Gv);
                Hv.x = Gv.y;
                Hv.y = -Gv.x;
                Iv.set(.5 * (b.x + k.x), .5 * (b.y + k.y));
                Kv.x = m.R.T.x * Gv.x + m.R.U.x * Gv.y;
                Kv.y = m.R.T.y * Gv.x + m.R.U.y * Gv.y;
                Lv.x = -Kv.x;
                Lv.y = -Kv.y;
                Jv.x = Kv.y;
                Jv.y = -Kv.x;
                Mv.x = m.position.x + (m.R.T.x * b.x + m.R.U.x * b.y);
                Mv.y = m.position.y + (m.R.T.y * b.x + m.R.U.y * b.y);
                Nv.x = m.position.x + (m.R.T.x * k.x + m.R.U.x * k.y);
                Nv.y = m.position.y + (m.R.T.y * k.x + m.R.U.y * k.y);
                if (!(2 > Av(Ev, Dv, Lv, -Kv.x * Mv.x - Kv.y * Mv.y + f) || 2 > Av(Fv, Ev, Kv, Kv.x * Nv.x +
                        Kv.y * Nv.y + f))) {
                    a.i.Ca(Hv);
                    a.Ga.Ca(Iv);
                    m = Jv.x * Mv.x + Jv.y * Mv.y;
                    for (v = k = 0; 2 > v; ++v) Jv.x * Fv[v].g.x + Jv.y * Fv[v].g.y - m <= f && (b = Fv[v].g.x - n.position.x, l = Fv[v].g.y - n.position.y, a.Da[k].Ga.x = b * n.R.T.x + l * n.R.T.y, a.Da[k].Ga.y = b * n.R.U.x + l * n.R.U.y, a.Da[k].jc.set(Fv[v].id), b = a.Da[k].jc, b.u = w, b.g = b.g & 16777215 | b.u << 24 & 4278190080, k++);
                    a.g = k
                }
            }
        }
    };

    function jw() {
        this.g = {};
        this.i = {};
        kw(this, dw, "CircleShape", "CircleShape");
        kw(this, gw, "PolygonShape", "CircleShape");
        kw(this, iw, "PolygonShape", "PolygonShape");
        kw(this, fw, "EdgeShape", "CircleShape");
        kw(this, hw, "PolygonShape", "EdgeShape")
    }

    function kw(a, b, c, d) {
        a.i[c] = a.i[c] || {};
        a.i[c][d] = a.i[c][d] || [];
        a.g[c] = a.g[c] || {};
        a.g[c][d] = new ew;
        a.g[c][d].qc = b;
        a.g[c][d].rf = !0;
        c != d && (a.g[d] = a.g[d] || {}, a.g[d][c] = new ew, a.g[d][c].qc = b, a.g[d][c].rf = !1)
    }
    jw.prototype.create = function(a, b) {
        var c = a.Sa.getTypeName(),
            d = b.Sa.getTypeName(),
            e = this.g[c][d],
            f = e.qc;
        return null != f ? e.rf ? 0 < this.i[c][d].length ? (c = this.i[c][d].pop(), c.reset(a, b), c) : new f(a, b) : 0 < this.i[d][c].length ? (c = this.i[d][c].pop(), c.reset(b, a), c) : new f(b, a) : null
    };
    jw.prototype.destroy = function(a) {
        var b = a.mb.Sa.getTypeName(),
            c = a.kb.Sa.getTypeName();
        this.i[b][c].push(a)
    };

    function lw(a) {
        this.o = a;
        this.i = new su;
        this.j = new jw;
        this.g = new uv
    }

    function lv(a) {
        vv(a.g, function(b, c) {
            a: {
                var d = b.g,
                    e = c.g;
                if (d != e && qv(e, d) && wv(b, c)) {
                    for (d = e.tb.Pa(Cu); d; d = d.La())
                        if (e = d.rb.mb, e == b) {
                            if (e = d.rb.kb, e == c) break a
                        } else if (e == c && (e = d.rb.kb, e == b)) break a;
                    a.j.create(b, c)
                }
            }
        })
    }
    lw.prototype.destroy = function(a) {
        var b = a.mb.g,
            c = a.kb.g;
        0 < a.g.g && (nv(b, !0), nv(c, !0));
        Ju(a.H, a);
        Ju(a.O, a);
        Ju(a.wa, a);
        this.j.destroy(a)
    };
    new function() {
        this.position = Y(0, 0);
        Y(0, 0);
        Y(0, 0);
        this.id = new rv
    };

    function mw() {
        this.u = Y(0, 0);
        this.i = Y(0, 0);
        this.j = Y(0, 0);
        this.o = this.g = 0
    }
    mw.prototype.reset = function() {
        this.u.set(0, 0);
        this.i.set(0, 0);
        this.j.set(0, 0);
        this.o = this.g = 0
    };

    function nw() {
        this.O = Y(0, 0);
        this.v = Y(0, 0);
        this.o = Y(0, 0);
        this.V = un();
        this.K = un();
        this.j = [];
        for (var a = 0; 2 > a; a++) this.j[a] = new mw
    };

    function ow() {
        this.g = Y(0, 0);
        this.i = [];
        this.Da = [];
        for (var a = 0; 2 > a; a++) this.Da[a] = Y(0, 0)
    }
    ow.prototype.j = function(a) {
        var b = a.g.ta.R,
            c = a.v,
            d = a.g.ta.position.x + (b.T.x * c.x + b.U.x * c.y),
            e = a.g.ta.position.y + (b.T.y * c.x + b.U.y * c.y);
        b = a.i.ta.R;
        c = a.j[0].u;
        var f = a.i.ta.position.x + (b.T.x * c.x + b.U.x * c.y);
        b = a.i.ta.position.y + (b.T.y * c.x + b.U.y * c.y);
        c = f - d;
        var g = b - e,
            h = c * c + g * g;
        h > Hn ? (h = Math.sqrt(h), this.g.x = c / h, this.g.y = g / h) : (this.g.x = 1, this.g.y = 0);
        this.Da[0].x = .5 * (d + f);
        this.Da[0].y = .5 * (e + b);
        this.i[0] = c * this.g.x + g * this.g.y - a.radius
    };
    ow.prototype.o = function(a) {
        this.g.x = a.g.ta.R.T.x * a.O.x + a.g.ta.R.U.x * a.O.y;
        this.g.y = a.g.ta.R.T.y * a.O.x + a.g.ta.R.U.y * a.O.y;
        for (var b = a.g.ta.position.x + (a.g.ta.R.T.x * a.v.x + a.g.ta.R.U.x * a.v.y), c = a.g.ta.position.y + (a.g.ta.R.T.y * a.v.x + a.g.ta.R.U.y * a.v.y), d = 0; d < a.u; d++) {
            var e = a.i.ta.position.x + (a.i.ta.R.T.x * a.j[d].u.x + a.i.ta.R.U.x * a.j[d].u.y),
                f = a.i.ta.position.y + (a.i.ta.R.T.y * a.j[d].u.x + a.i.ta.R.U.y * a.j[d].u.y);
            this.i[d] = (e - b) * this.g.x + (f - c) * this.g.y - a.radius;
            this.Da[d].x = e;
            this.Da[d].y = f
        }
    };
    ow.prototype.u = function(a) {
        this.g.x = a.i.ta.R.T.x * a.O.x + a.i.ta.R.U.x * a.O.y;
        this.g.y = a.i.ta.R.T.y * a.O.x + a.i.ta.R.U.y * a.O.y;
        for (var b = a.i.ta.position.x + (a.i.ta.R.T.x * a.v.x + a.i.ta.R.U.x * a.v.y), c = a.i.ta.position.y + (a.i.ta.R.T.y * a.v.x + a.i.ta.R.U.y * a.v.y), d = 0; d < a.u; d++) {
            var e = a.g.ta.position.x + (a.g.ta.R.T.x * a.j[d].u.x + a.g.ta.R.U.x * a.j[d].u.y),
                f = a.g.ta.position.y + (a.g.ta.R.T.y * a.j[d].u.x + a.g.ta.R.U.y * a.j[d].u.y);
            this.i[d] = (e - b) * this.g.x + (f - c) * this.g.y - a.radius;
            this.Da[d].set(e, f)
        }
        this.g.x *= -1;
        this.g.y *= -1
    };

    function pw() {
        this.reset(0, 0, 0, 0, !0)
    }
    pw.prototype.reset = function(a, b, c, d, e) {
        this.g = a;
        var f = 0;
        0 < a && (f = 1 / a);
        this.i = f;
        this.u = b;
        this.j = c;
        this.o = d;
        this.v = e
    };

    function qw() {
        this.g = [];
        this.i = 0
    }

    function rw(a, b, c) {
        for (a.i = c; a.g.length < a.i;) a.g[a.g.length] = new nw;
        for (var d = 0; d < c; d++) {
            var e = b[d],
                f = e.mb,
                g = e.kb,
                h = f.Sa.j,
                k = g.Sa.j,
                l = f.g,
                m = g.g;
            e = e.g;
            var n = Math.sqrt(f.V * g.V);
            f = f.va;
            g = g.va;
            var w = f > g ? f : g;
            g = l.ka.x;
            f = l.ka.y;
            var v = m.ka.x,
                A = m.ka.y,
                p = l.Aa,
                u = m.Aa;
            Dn(0 < e.g);
            var C = e,
                G = l.ta,
                y = h,
                M = m.ta,
                D = k,
                J = sw;
            if (0 != C.g) switch (C.j) {
                case 1:
                    var x = G.R;
                    var z = C.Ga;
                    var T = G.position.x + x.T.x * z.x + x.U.x * z.y;
                    G = G.position.y + x.T.y * z.x + x.U.y * z.y;
                    x = M.R;
                    z = C.Da[0].Ga;
                    C = M.position.x + x.T.x * z.x + x.U.x * z.y;
                    M = M.position.y + x.T.y * z.x + x.U.y * z.y;
                    x = C - T;
                    z = M - G;
                    var oa = x * x + z * z;
                    oa > Hn ? (oa = Math.sqrt(oa), J.g.x = x / oa, J.g.y = z / oa) :
                        (J.g.x = 1, J.g.y = 0);
                    x = G + y * J.g.y;
                    M -= D * J.g.y;
                    J.Da[0].x = .5 * (T + y * J.g.x + (C - D * J.g.x));
                    J.Da[0].y = .5 * (x + M);
                    break;
                case 2:
                    x = G.R;
                    z = C.i;
                    oa = x.T.x * z.x + x.U.x * z.y;
                    var $b = x.T.y * z.x + x.U.y * z.y;
                    x = G.R;
                    z = C.Ga;
                    var Re = G.position.x + x.T.x * z.x + x.U.x * z.y;
                    var Se = G.position.y + x.T.y * z.x + x.U.y * z.y;
                    J.g.x = oa;
                    J.g.y = $b;
                    for (T = 0; T < C.g; T++) {
                        x = M.R;
                        z = C.Da[T].Ga;
                        var Rc = M.position.x + x.T.x * z.x + x.U.x * z.y;
                        x = M.position.y + x.T.y * z.x + x.U.y * z.y;
                        J.Da[T].x = Rc + .5 * (y - (Rc - Re) * oa - (x - Se) * $b - D) * oa;
                        J.Da[T].y = x + .5 * (y - (Rc - Re) * oa - (x - Se) * $b - D) * $b
                    }
                    break;
                case 4:
                    for (x = M.R, z = C.i, oa = x.T.x * z.x + x.U.x * z.y,
                        $b = x.T.y * z.x + x.U.y * z.y, x = M.R, z = C.Ga,
                        Re = M.position.x + x.T.x * z.x + x.U.x * z.y,
                        Se = M.position.y + x.T.y * z.x + x.U.y * z.y, J.g.x = -oa, J.g.y = -$b,
                        T = 0; T < C.g; T++)
                        x = G.R, z = C.Da[T].Ga, Rc = G.position.x + x.T.x * z.x + x.U.x * z.y,
                        x = G.position.y + x.T.y * z.x + x.U.y * z.y,
                        J.Da[T].x = Rc + .5 * (D - (Rc - Re) * oa - (x - Se) * $b - y) * oa,
                        J.Da[T].y = x + .5 * (D - (Rc - Re) * oa - (x - Se) * $b - y) * $b
            }
            D = sw.g.x;
            J = sw.g.y;
            y = a.g[d];
            y.g = l;
            y.i = m;
            y.wa = e;
            y.o.x = D;
            y.o.y = J;
            y.u = e.g;
            y.H = n;
            y.va = w;
            y.O.x = e.i.x;
            y.O.y = e.i.y;
            y.v.x = e.Ga.x;
            y.v.y = e.Ga.y;
            y.radius = h + k;
            y.type = e.j;
            for (h = 0; h < y.u; ++h)
                n = e.Da[h], k = y.j[h], k.g = n.wc, k.o = n.xc, k.u.Ca(n.Ga),
                n = k.i.x = sw.Da[h].x - l.ha.c.x, w = k.i.y = sw.Da[h].y - l.ha.c.y,
                M = k.j.x = sw.Da[h].x - m.ha.c.x, T = k.j.y = sw.Da[h].y - m.ha.c.y,
                x = n * J - w * D, z = M * J - T * D, x *= x, z *= z,
                k.V = 1 / (l.Ma + m.Ma + l.nb * x + m.nb * z), C = l.Kb * l.Ma + m.Kb * m.Ma,
                C += l.Kb * l.nb * x + m.Kb * m.nb * z, k.H = 1 / C, z = J, C = -D,
                x = n * C - w * z, z = M * C - T * z, x *= x, z *= z,
                k.O = 1 / (l.Ma + m.Ma + l.nb * x + m.nb * z), k.v = 0,
                n = y.o.x * (v + -u * T - g - -p * w) + y.o.y * (A + u * M - f - p * n),
                -1 > n && (k.v += -y.va * n);
            2 == y.u &&
                (A = y.j[0], v = y.j[1], e = l.Ma, l = l.nb, g = m.Ma, m = m.nb,
                    f = A.i.x * J - A.i.y * D, A = A.j.x * J - A.j.y * D,
                    p = v.i.x * J - v.i.y * D, h = v.j.x * J - v.j.y * D,
                    v = e + g + l * f * f + m * A * A, u = e + g + l * p * p + m * h * h,
                    m = e + g + l * f * p + m * A * h,
                    v * v < 100 * (v * u - m * m) ?
                    (y.K.T.set(v, m), y.K.U.set(m, u), m = y.K, l = y.V,
                        e = m.T.x * m.U.y - m.U.x * m.T.y, 0 !== e && (e = 1 / e),
                        l.T.x = e * m.U.y, l.U.x = -e * m.U.x, l.T.y = -e * m.T.y,
                        l.U.y = e * m.T.x) :
                    y.u = 1)
        }
    }

    function tw(a) {
        for (var b = 0; b < a.i; b++) {
            for (var c = a.g[b], d = c.o.x, e = c.o.y, f = 0; f < c.u; f++) {
                var g = c,
                    h = c.j[f],
                    k = g.o.y,
                    l = -g.o.x,
                    m = g.H * h.g;
                m = Cn(h.o - h.O * ((g.i.ka.x - g.i.Aa * h.j.y - g.g.ka.x + g.g.Aa * h.i.y) * k + (g.i.ka.y + g.i.Aa * h.j.x - g.g.ka.y - g.g.Aa * h.i.x) * l), -m, m);
                var n = m - h.o;
                k *= n;
                l *= n;
                g.g.ka.x -= g.g.Ma * k;
                g.g.ka.y -= g.g.Ma * l;
                g.g.Aa -= g.g.nb * (h.i.x * l - h.i.y * k);
                g.i.ka.x += g.i.Ma * k;
                g.i.ka.y += g.i.Ma * l;
                g.i.Aa += g.i.nb * (h.j.x * l - h.j.y * k);
                h.o = m
            }
            if (1 == c.u) f = c.j[0], g = f.g - f.V * ((c.i.ka.x - c.i.Aa * f.j.y - c.g.ka.x + c.g.Aa * f.i.y) * d + (c.i.ka.y +
                c.i.Aa * f.j.x - c.g.ka.y - c.g.Aa * f.i.x) * e - f.v), g = 0 < g ? g : 0, h = g - f.g, d *= h, e *= h, c.g.ka.x -= c.g.Ma * d, c.g.ka.y -= c.g.Ma * e, c.g.Aa -= c.g.nb * (f.i.x * e - f.i.y * d), c.i.ka.x += c.i.Ma * d, c.i.ka.y += c.i.Ma * e, c.i.Aa += c.i.nb * (f.j.x * e - f.j.y * d), f.g = g;
            else
                for (f = c.j[0], g = c.j[1], h = f.g, l = g.g, m = (c.i.ka.x - c.i.Aa * f.j.y - c.g.ka.x + c.g.Aa * f.i.y) * d + (c.i.ka.y + c.i.Aa * f.j.x - c.g.ka.y - c.g.Aa * f.i.x) * e - f.v, e = (c.i.ka.x - c.i.Aa * g.j.y - c.g.ka.x + c.g.Aa * g.i.y) * d + (c.i.ka.y + c.i.Aa * g.j.x - c.g.ka.y - c.g.Aa * g.i.x) * e - g.v, m -= c.K.T.x * h + c.K.U.x * l, e -= c.K.T.y * h + c.K.U.y *
                    l;;) {
                    d = -(c.V.T.x * m + c.V.U.x * e);
                    if (0 <= d && (k = -(c.V.T.y * m + c.V.U.y * e), 0 <= k)) {
                        uw(c, f, g, d - h, k - l);
                        f.g = d;
                        g.g = k;
                        break
                    }
                    d = -f.V * m;
                    if (0 <= d && 0 <= c.K.T.y * d + e) {
                        uw(c, f, g, d - h, -l);
                        f.g = d;
                        g.g = 0;
                        break
                    }
                    d = -g.V * e;
                    if (0 <= d && 0 <= c.K.U.x * d + m) {
                        uw(c, f, g, -h, d - l);
                        f.g = 0;
                        g.g = d;
                        break
                    }
                    if (0 <= m && 0 <= e) {
                        uw(c, f, g, -h, -l);
                        f.g = 0;
                        g.g = 0;
                        break
                    }
                    break
                }
        }
    }

    function uw(a, b, c, d, e) {
        var f = d * a.o.x;
        d *= a.o.y;
        var g = e * a.o.x;
        e *= a.o.y;
        a.g.ka.x -= a.g.Ma * (f + g);
        a.g.ka.y -= a.g.Ma * (d + e);
        a.g.Aa -= a.g.nb * (b.i.x * d - b.i.y * f + c.i.x * e - c.i.y * g);
        a.i.ka.x += a.i.Ma * (f + g);
        a.i.ka.y += a.i.Ma * (d + e);
        a.i.Aa += a.i.nb * (b.j.x * d - b.j.y * f + c.j.x * e - c.j.y * g);
        b.g = 0;
        c.g = 0
    }

    function vw(a, b) {
        void 0 === b && (b = 0);
        for (var c = 0, d = 0; d < a.i; d++) {
            var e = a.g[d],
                f = e.g,
                g = e.i,
                h = f.Kb * f.Ma,
                k = f.Kb * f.nb,
                l = g.Kb * g.Ma,
                m = g.Kb * g.nb,
                n = e,
                w = ww;
            Dn(0 < n.u);
            switch (n.type) {
                case 1:
                    w.j(n);
                    break;
                case 2:
                    w.o(n);
                    break;
                case 4:
                    w.u(n)
            }
            n = ww.g;
            for (w = 0; w < e.u; w++) {
                var v = e.j[w],
                    A = ww.Da[w],
                    p = ww.i[w],
                    u = A.x - f.ha.c.x,
                    C = A.y - f.ha.c.y,
                    G = A.x - g.ha.c.x;
                A = A.y - g.ha.c.y;
                c = c < p ? c : p;
                p = -v.H * Cn(b * (p + .005), -.2, 0);
                v = p * n.x;
                p *= n.y;
                f.ha.c.x -= h * v;
                f.ha.c.y -= h * p;
                f.ha.a -= k * (u * p - C * v);
                pv(f);
                g.ha.c.x += l * v;
                g.ha.c.y += l * p;
                g.ha.a += m * (G * p - A * v);
                pv(g)
            }
        }
        return -.0075 <
            c
    }
    var sw = new function() {
            this.g = Y(0, 0);
            this.Da = [];
            for (var a = 0; 2 > a; a++) this.Da[a] = Y(0, 0)
        },
        ww = new ow;

    function xw() {
        this.g = [];
        this.i = []
    }
    xw.prototype.reset = function() {
        this.g = [];
        this.i = []
    };

    function yw(a, b) {
        this.O = a;
        this.o = b;
        this.j = [];
        this.v = [];
        this.u = [];
        this.i = [];
        this.g = [];
        this.H = new xw
    }
    q = yw.prototype;
    q.reset = function(a, b) {
        this.O = a;
        this.o = b
    };
    q.clear = function() {
        this.j = [];
        this.v = [];
        this.u = [];
        this.i = [];
        this.g = []
    };
    q.If = function(a, b) {
        for (var c = 0; c < this.v.length; c++) {
            var d = this.v[c];
            d.ka.x += a.g * (b.x + d.Ma * d.va.x);
            d.ka.y += a.g * (b.y + d.Ma * d.va.y);
            d.Aa += a.g * d.nb * d.Oa;
            en(d.ka, Cn(1 - a.g * d.Ia, 0, 1));
            d.Aa *= Cn(1 - a.g * d.Ba, 0, 1)
        }
    };
    q.Lf = function(a) {
        for (var b = this.o, c = 0; c < b.i; ++c) {
            var d = b.g[c],
                e = d.g,
                f = d.i,
                g = e.Ma,
                h = e.nb,
                k = f.Ma,
                l = f.nb,
                m = d.o.x,
                n = d.o.y,
                w = n,
                v = -m,
                A;
            if (a.v) {
                var p = d.u;
                for (A = 0; A < p; ++A) {
                    var u = d.j[A];
                    u.g *= a.u;
                    u.o *= a.u;
                    var C = u.g * m + u.o * w,
                        G = u.g * n + u.o * v;
                    e.Aa -= h * (u.i.x * G - u.i.y * C);
                    e.ka.x -= g * C;
                    e.ka.y -= g * G;
                    f.Aa += l * (u.j.x * G - u.j.y * C);
                    f.ka.x += k * C;
                    f.ka.y += k * G
                }
            } else
                for (p = d.u, A = 0; A < p; ++A) e = d.j[A], e.g = 0, e.o = 0
        }
        for (b = 0; b < this.g.length; b++) this.g[b].j(a);
        for (b = 0; b < a.o; b++) {
            for (c = 0; c < this.g.length; c++) this.g[c].u(a);
            tw(this.o)
        }
        for (a = 0; a <
            this.g.length; a++) this.g[a].v();
        a = this.o;
        for (b = 0; b < a.i; ++b)
            for (c = a.g[b], d = c.wa, A = 0; A < c.u; ++A) p = d.Da[A], e = c.j[A], p.wc = e.g, p.xc = e.o
    };
    q.Jf = function(a) {
        for (var b = 0; b < this.u.length; ++b) {
            var c = this.u[b],
                d = a.g * c.ka.x,
                e = a.g * c.ka.y;
            4 < d * d + e * e && (gn(c.ka), c.ka.x = 2 * c.ka.x * a.i, c.ka.y = 2 * c.ka.y * a.i);
            d = a.g * c.Aa;
            d * d > Fn && (c.Aa = 0 > c.Aa ? -En * a.i : En * a.i);
            c.ha.Ab.Ca(c.ha.c);
            c.ha.Tb = c.ha.a;
            c.ha.c.x += a.g * c.ka.x;
            c.ha.c.y += a.g * c.ka.y;
            c.ha.a += a.g * c.Aa;
            pv(c)
        }
    };
    q.Kf = function(a) {
        for (var b = 0; b < a.j; b++) {
            for (var c = vw(this.o, .2), d = !0, e = 0; e < this.g.length; e++) {
                var f = this.g[e].o(.2);
                d = d && f
            }
            if (c && d) break
        }
    };
    q.wg = function(a) {
        for (var b = Number.MAX_VALUE, c = 0; c < this.u.length; c++) {
            var d = this.u[c];
            !d.ya || Math.abs(d.Aa) > Gn || 1E-4 < vn(d.ka, d.ka) ? b = d.O = 0 : (d.O += a.g, b = Math.min(b, d.O))
        }
        if (.5 <= b)
            for (a = 0; a < this.j.length; a++) nv(this.j[a], !1)
    };
    q.report = function(a) {
        if (null != this.O)
            for (var b = 0; b < this.i.length; ++b) {
                var c = a[b];
                this.H.reset();
                for (var d = 0; d < c.u; ++d) this.H.g[d] = c.j[d].g, this.H.i[d] = c.j[d].o
            }
    };

    function zw(a, b) {
        a.j.push(b);
        0 != b.getType() && (a.u.push(b), 2 == b.getType() && a.v.push(b))
    };

    function Aw() {
        this.i = [];
        this.g = []
    }
    Aw.prototype.isEmpty = function() {
        return 0 === this.i.length && 0 === this.g.length
    };
    Aw.prototype.clear = function() {
        this.i = [];
        this.g = []
    };
    Aw.prototype.contains = function(a) {
        return 0 <= Ra(this.i, a) || 0 <= Ra(this.g, a)
    };
    Aw.prototype.Be = function() {
        for (var a = [], b = this.i.length - 1; 0 <= b; --b) a.push(this.i[b]);
        var c = this.g.length;
        for (b = 0; b < c; ++b) a.push(this.g[b]);
        return a
    };

    function Bw() {
        var a = Y(0, 0);
        this.g = new lw(this);
        this.u = new qw;
        this.v = this.i = !1;
        this.j = new Lu;
        this.tb = new Bu;
        this.Qb = null;
        this.va = new Vu;
        this.Ba = a;
        this.V = 0;
        bo(this, new Zn);
        this.o = new pw;
        this.O = new pw;
        this.H = new yw(this.g.i, this.u)
    }
    var Cw = 1 - 100 * Number.MIN_VALUE;

    function Dw(a, b) {
        a.g.i = b
    }

    function bo(a, b) {
        Dn(!a.i);
        b = new hv(b, a);
        a = a.j;
        var c = b.wa;
        null == a.g[c] && (Ou(a, b, c, Mu), Nu(a, b), b.H.push(a));
        return b
    }

    function nn(a, b) {
        Dn(!a.i);
        for (var c = b.Qb; c;) {
            var d = c;
            c = c.next;
            var e = a;
            d = d.Cc;
            var f = d.Qf;
            d.Ce && (d.Ce.Ec = d.Ec);
            d.Ec && (d.Ec.Ce = d.Ce);
            d == e.Qb && (e.Qb = d.Ec);
            e = d.H;
            var g = d.O;
            nv(e, !0);
            nv(g, !0);
            d.g.kc && (d.g.kc.next = d.g.next);
            d.g.next && (d.g.next.kc = d.g.kc);
            d.g == e.Qb && (e.Qb = d.g.next);
            d.g.kc = null;
            d.g.next = null;
            d.i.kc && (d.i.kc.next = d.i.next);
            d.i.next && (d.i.next.kc = d.i.kc);
            d.i == g.Qb && (g.Qb = d.i.next);
            d.i.kc = null;
            d.i.next = null;
            if (!f)
                for (d = g.tb.Pa(Cu); d; d = d.La()) bw(d.rb, g) == e && (d.rb.V = !0)
        }
        for (c = b.Na.Pa(); c; c = c.La()) c.g.g(b);
        for (c = b.tb.Pa(Cu); c; c = c.La()) a.g.destroy(c.rb);
        for (c = b.i.Pa(); c; c = c.La()) Ut(b, c.hb);
        b.destroy();
        a = a.j;
        c = b.wa;
        if (null != a.g[c]) {
            Wa(b.H, a);
            for (b = 0; b <= Mu; b++) Qu(a, c, b);
            delete a.g[c]
        }
    }

    function er(a) {
        a.v && (lv(a.g), a.v = !1);
        a.i = !0;
        a.o.reset(.016, .016 * a.V, 10, 10, !0);
        for (var b = a.g, c = b.o.tb.Pa(Cu); c; c = c.La()) {
            var d = c.rb,
                e = d.mb,
                f = d.kb,
                g = e.g,
                h = f.g;
            if (g.bc() || h.bc()) {
                if (d.V) {
                    if (!qv(h, g)) {
                        b.destroy(d);
                        continue
                    }
                    if (!wv(e, f)) {
                        b.destroy(d);
                        continue
                    }
                    d.V = !1
                }
                b.g.rd(e.i, f.i) ? d.update(b.i) : b.destroy(d)
            }
        }
        if (0 < a.o.g) {
            b = a.o;
            for (c = a.va.Pa(); c; c = c.La()) c.g.i(b);
            c = a.H;
            c.reset(a.g.i, a.u);
            for (d = a.j.Pa(Mu); d; d = d.La()) d.body.Ra = !1;
            for (f = a.tb.Pa(Cu); f; f = f.La()) f.rb.Ra = !1;
            for (d = a.Qb; d; d = d.Ec) d.Ra = !1;
            for (d = a.j.Pa(Su); d; d =
                d.La())
                if (f = d.body, !f.Ra) {
                    c.clear();
                    e = [];
                    e.push(f);
                    for (f.Ra = !0; 0 < e.length;)
                        if (g = e.pop(), zw(c, g), g.bc() || nv(g, !0), 0 != g.getType()) {
                            for (f = g.tb.Pa(Gu); f; f = f.La()) h = f.rb, h.Ra || (c.i.push(h), h.Ra = !0, h = bw(h, g), h.Ra || (e.push(h), h.Ra = !0));
                            for (f = g.Qb; f; f = f.next) !f.Cc.Ra && f.Wb.isActive() && (c.g.push(f.Cc), f.Cc.Ra = !0, f.Wb.Ra || (e.push(f.Wb), f.Wb.Ra = !0))
                        } e = c;
                    f = b;
                    e.If(f, a.Ba);
                    rw(e.o, e.i, e.i.length);
                    e.Lf(f);
                    e.Jf(f);
                    e.Kf(f);
                    e.report(e.o.g)
                } for (d = a.j.Pa(Su); d; d = d.La()) mv(d.body);
            lv(a.g);
            b = a.o;
            c = a.H;
            c.reset(a.g.i, a.u);
            for (d = a.j.Pa(Mu); d; d = d.La()) f = d.body, f.Ra = !1, f.ha.ub = 0;
            for (g = a.tb.Pa(Cu); g; g = g.La()) g.rb.Ra = !1, g.rb.j = null;
            for (d = a.Qb; d; d = d.Ec) d.Ra = !1;
            for (;;) {
                d = a.wa(b);
                e = d.Rf;
                d = d.Sf;
                if (null === e || Cw < d) break;
                g = e.mb.g;
                f = e.kb.g;
                Ew.set(g.ha);
                Fw.set(f.ha);
                g.advance(d);
                f.advance(d);
                e.update(a.g.i);
                e.j = null;
                if (e.va || !e.v) g.ha.set(Ew), f.ha.set(Fw), pv(g), pv(f);
                else if (e.o) {
                    2 != g.getType() && (g = f);
                    c.clear();
                    e = new Aw;
                    e.g.push(g);
                    for (g.Ra = !0; 0 < e.i.length + e.g.length;)
                        if (g = f = e, 0 === g.i.length && (g.i = g.g, g.i.reverse(), g.g = []), f = f.i.pop(),
                            zw(c, f), f.bc() || nv(f, !0), 2 == f.getType()) {
                            for (g = f.tb.Pa(Gu); g && 32 != c.i.length; g = g.La()) h = g.rb, h.Ra || (c.i.push(h), h.Ra = !0, h = bw(h, f), h.Ra || (0 != h.getType() && (h.advance(d), nv(h, !0), e.g.push(h)), h.Ra = !0));
                            for (f = f.Qb; f; f = f.next) 32 != c.g.length && !f.Cc.Ra && f.Wb.isActive() && (c.g.push(f.Cc), f.Cc.Ra = !0, f.Wb.Ra || (0 != f.Wb.getType() && (f.Wb.advance(d), nv(f.Wb, !0), e.g.push(f.Wb)), f.Wb.Ra = !0))
                        } a.O.reset((1 - d) * b.g, 0, b.o, b.j, !1);
                    e = c;
                    f = a.O;
                    rw(e.o, e.i, e.i.length);
                    g = e.o;
                    for (d = 0; d < e.g.length; ++d) e.g[d].j(f);
                    for (d = 0; d < f.o; ++d)
                        for (tw(g),
                            h = 0; h < e.g.length; ++h) e.g[h].u(f);
                    for (d = 0; d < e.u.length; ++d) {
                        h = e.u[d];
                        var k = f.g * h.ka.x,
                            l = f.g * h.ka.y;
                        4 < k * k + l * l && (gn(h.ka), h.ka.x = 2 * h.ka.x * f.i, h.ka.y = 2 * h.ka.y * f.i);
                        k = f.g * h.Aa;
                        k * k > Fn && (h.Aa = 0 > h.Aa ? -En * f.i : En * f.i);
                        h.ha.Ab.Ca(h.ha.c);
                        h.ha.Tb = h.ha.a;
                        h.ha.c.x += f.g * h.ka.x;
                        h.ha.c.y += f.g * h.ka.y;
                        h.ha.a += f.g * h.Aa;
                        pv(h)
                    }
                    for (d = 0; d < f.j; ++d) {
                        k = vw(g, .75);
                        l = !0;
                        for (h = 0; h < e.g.length; ++h) {
                            var m = e.g[h].o(.2);
                            l = l && m
                        }
                        if (k && l) break
                    }
                    e.report(g.g);
                    for (d = 0; d < c.j.length; d++)
                        if (c.j[d].Ra = !1, c.j[d].bc() && 2 == c.j[d].getType())
                            for (mv(c.j[d]),
                                g = c.j[d].tb.Pa(Cu); g; g = g.La()) g.rb.j = null;
                    for (d = 0; d < c.i.length; d++) c.i[d].Ra = !1, c.i[d].j = null;
                    for (d = 0; d < c.g.length; d++) c.g[d].Ra = !1;
                    lv(a.g)
                }
            }
            a.V = a.o.i
        }
        a.i = !1
    }
    Bw.prototype.wa = function(a) {
        for (var b = null, c = 1, d = this.tb.Pa(Iu); d; d = d.La()) {
            var e = d.rb;
            if (!this.ya(a, e)) {
                if (null != e.j) var f = e.j;
                else {
                    if (e.o) f = 1;
                    else {
                        var g = e.mb.g,
                            h = e.kb.g,
                            k = g.ha.ub;
                        g.ha.ub < h.ha.ub ? (k = h.ha.ub, g.ha.advance(k)) : h.ha.ub < g.ha.ub && (k = g.ha.ub, h.ha.advance(k));
                        f = e;
                        g = g.ha;
                        h = h.ha;
                        cw.g.set(f.mb.Sa);
                        cw.i.set(f.kb.Sa);
                        cw.j = g;
                        cw.o = h;
                        cw.u = .005;
                        var l = cw;
                        Pv++;
                        f = l.g;
                        h = l.i;
                        g = l.j;
                        var m = l.o;
                        Dn(g.ub == m.ub);
                        Dn(1 - g.ub > Number.MIN_VALUE);
                        var n = f.i + h.i;
                        l = l.u;
                        var w = 0,
                            v = 0,
                            A = 0;
                        Sv.count = 0;
                        for (Tv.u = !1;;) {
                            yu(g, Uv,
                                w);
                            yu(m, Vv, w);
                            Tv.g = f;
                            Tv.i = h;
                            Tv.j = Uv;
                            Tv.o = Vv;
                            Ln(Xv, Sv, Tv);
                            if (0 >= Xv.j) {
                                w = 1;
                                break
                            }
                            var p = h;
                            var u = Wv;
                            var C = Sv;
                            var G = Uv;
                            var y = Vv;
                            u.i = f;
                            u.j = p;
                            p = C.count;
                            Dn(0 < p && 3 > p);
                            if (1 == p) {
                                u.o = 1;
                                var M = Mn(u.i, C.Ya[0]);
                                C = Mn(u.j, C.Za[0]);
                                p = M;
                                var D = G.R;
                                M = G.position.x + (D.T.x * p.x + D.U.x * p.y);
                                G = G.position.y + (D.T.y * p.x + D.U.y * p.y);
                                p = C;
                                D = y.R;
                                C = y.position.x + (D.T.x * p.x + D.U.x * p.y);
                                y = y.position.y + (D.T.y * p.x + D.U.y * p.y);
                                u.g.x = C - M;
                                u.g.y = y - G;
                                gn(u.g)
                            } else if (C.Za[0] == C.Za[1]) {
                                u.o = 2;
                                var J = Mn(u.i, C.Ya[0]);
                                var x = Mn(u.i, C.Ya[1]);
                                C = Mn(u.j, C.Za[0]);
                                u.Ga.x = .5 * (J.x + x.x);
                                u.Ga.y = .5 * (J.y + x.y);
                                var z = Bn(x, J);
                                Z(u.g);
                                u.g = xn(z);
                                Z(z);
                                gn(u.g);
                                p = u.g;
                                D = G.R;
                                J = D.T.x * p.x + D.U.x * p.y;
                                x = D.T.y * p.x + D.U.y * p.y;
                                p = u.Ga;
                                D = G.R;
                                M = G.position.x + (D.T.x * p.x + D.U.x * p.y);
                                G = G.position.y + (D.T.y * p.x + D.U.y * p.y);
                                p = C;
                                D = y.R;
                                C = y.position.x + (D.T.x * p.x + D.U.x * p.y);
                                y = y.position.y + (D.T.y * p.x + D.U.y * p.y);
                                0 > (C - M) * J + (y - G) * x && cn(u.g)
                            } else if (C.Ya[0] == C.Ya[0]) u.o = 4, D = Mn(u.j, C.Za[0]), p = Mn(u.j, C.Za[1]), M = Mn(u.i, C.Ya[0]), u.Ga.x = .5 * (D.x + p.x), u.Ga.y = .5 * (D.y + p.y), z = Bn(p, D), Z(u.g), u.g = xn(z), Z(z), gn(u.g),
                                p = u.g, D = y.R, J = D.T.x * p.x + D.U.x * p.y, x = D.T.y * p.x + D.U.y * p.y, p = u.Ga, D = y.R, C = y.position.x + (D.T.x * p.x + D.U.x * p.y), y = y.position.y + (D.T.y * p.x + D.U.y * p.y), p = M, D = G.R, M = G.position.x + (D.T.x * p.x + D.U.x * p.y), G = G.position.y + (D.T.y * p.x + D.U.y * p.y), 0 > (M - C) * J + (G - y) * x && cn(u.g);
                            else {
                                J = Mn(u.i, C.Ya[0]);
                                x = Mn(u.i, C.Ya[1]);
                                D = Mn(u.j, C.Za[0]);
                                p = Mn(u.j, C.Za[1]);
                                z = Bn(x, J);
                                var T = yn(G.R, z);
                                Z(z);
                                z = Bn(p, D);
                                y = yn(y.R, z);
                                Z(z);
                                G = T.x * T.x + T.y * T.y;
                                M = y.x * y.x + y.y * y.y;
                                var oa = Bn(y, T);
                                C = T.x * oa.x + T.y * oa.y;
                                z = y.x * oa.x + y.y * oa.y;
                                Z(oa);
                                T = T.x * y.x + T.y * y.y;
                                oa = G * M - T * T;
                                y = 0;
                                0 != oa && (y = Cn((T * z - C * M) / oa, 0, 1));
                                0 > (T * y + z) / M && (y = Cn((T - C) / G, 0, 1));
                                M = Y(0, 0);
                                M.x = J.x + y * (x.x - J.x);
                                M.y = J.y + y * (x.y - J.y);
                                C = Y(0, 0);
                                C.x = D.x + y * (p.x - D.x);
                                C.y = D.y + y * (p.y - D.y);
                                0 == y || 1 == y ? (u.o = 4, z = Bn(p, D), Z(u.g), u.g = xn(z), Z(z), gn(u.g), u.Ga = C) : (u.o = 2, z = Bn(x, J), Z(u.g), u.g = xn(z), Z(z), u.Ga = M);
                                0 > y && cn(u.g);
                                Z(M);
                                Z(C)
                            }
                            x = Wv.evaluate(Uv, Vv);
                            if (0 >= x) {
                                w = 1;
                                break
                            }
                            0 == v && (A = x > n ? Math.max(n - l, .75 * n) : Math.max(x - l, .02 * n));
                            if (x - A < .5 * l) {
                                if (0 == v) {
                                    w = 1;
                                    break
                                }
                                break
                            }
                            p = u = w;
                            D = 1;
                            yu(g, Uv, D);
                            yu(m, Vv, D);
                            J = Wv.evaluate(Uv, Vv);
                            if (J >=
                                A) {
                                w = 1;
                                break
                            }
                            for (y = 0;;) {
                                G = y & 1 ? p + (A - x) * (D - p) / (J - x) : .5 * (p + D);
                                yu(g, Uv, G);
                                yu(m, Vv, G);
                                M = Wv.evaluate(Uv, Vv);
                                if (Math.abs(M - A) < .025 * l) {
                                    u = G;
                                    break
                                }
                                M > A ? (p = G, x = M) : (D = G, J = M);
                                y++;
                                Rv++;
                                if (50 == y) break
                            }
                            if (u < (1 + 100 * Number.MIN_VALUE) * w) break;
                            w = u;
                            v++;
                            Qv++;
                            if (1E3 == v) break
                        }
                        f = w;
                        Dn(0 <= f && 1 >= f);
                        0 < f && 1 > f && (f = (1 - f) * k + f)
                    }
                    e.j = f
                }
                Number.MIN_VALUE < f && f < c && (b = e, c = f)
            }
        }
        return {
            Rf: b,
            Sf: c
        }
    };
    Bw.prototype.ya = function(a, b) {
        a = b.mb.g;
        b = b.kb.g;
        return 2 == a.getType() && a.bc() || 2 == b.getType() && b.bc() ? !1 : !0
    };
    Bw.prototype.drawShape = function(a, b, c) {
        if (a instanceof zt) {
            var d = An(b, a.g);
            null.Jg(d, a.j, b.R.T, c);
            Z(d)
        } else if (a instanceof Vn) {
            d = a.o;
            var e = a.g,
                f = [];
            for (a = 0; a < d; a++) f[a] = An(b, e[a]);
            null.Kg(f, d, c);
            for (a = 0; a < d; a++) Z(f[a])
        }
    };
    new Un;
    var Ew = new xu,
        Fw = new xu;

    function Zq(a, b) {
        for (const c of a.Qa)
            if (Fc(c, 1) === b) return E(c, 2, 0);
        return 0
    }

    function hu(a, b) {
        a = a.settings.get(b);
        return "false" === a ? !1 : a
    }

    function Gw(a) {
        const b = new su;
        b.Te = c => {
            var d = c.mb.g,
                e = c.kb.g;
            c = d.qf || e.qf;
            var f = d.Se || e.Se,
                g = d.Xe || e.Xe;
            d = d.tf || e.tf;
            if (c && f && c.i) a.Lb && (rr(c), cs(a.ya), a.Eb());
            else if (c && g) a: {
                d = g.i && c && g.i.Wa === c.Wa;
                if (f = g.isVisible() && g.i !== c) {
                    if (f = jn(g, "use_ally_candle_bonus") && d) {
                        f = Number.MAX_VALUE;
                        e = c.g;
                        for (var h of c.vb.u.values())
                            if (h.Wa === c.Wa) {
                                var k = h.g,
                                    l = k.x - e.x;
                                k = k.y - e.y;
                                l = l * l + k * k;
                                l < f && (f = l)
                            } f = 400 <= f
                    }
                    f = !f && jn(g, "use_collectible_stealing") && Dc(g.state, 2) && !d
                }
                if (f && (h = +jn(g, "max_collectibles_held"), !(-1 !==
                        h && c.j.length >= h))) {
                    if (g.i) {
                        if (0 < g.i.Ia) break a;
                        h = g.i;
                        h = h.j.splice(h.j.indexOf(g), 1);
                        g = g.i;
                        St(g);
                        hr(g, -1);
                        qr(g, 2);
                        hr(c, 1);
                        qr(c, 1)
                    } else h = [g];
                    for (const m of h) m.Rc(c), g = c, h = m, 0 <= g.j.indexOf(h) ? console.error("adding a collectible that is already in the list") : Tt(g, 3) ? g.j.unshift(h) : g.j.push(h), g = m, h = c.Wa, 1 === h ? Op(g, 2) : 2 === h && Op(g, 3);
                    St(c)
                }
            }
            else c && d && a.Pb(c, d)
        };
        b.g = () => {};
        return b
    }

    function Hw(a) {
        return !!(a.i && a.i.wa && a.j && a.j.H.i)
    }

    function Iw(a, b, c, d, e) {
        const f = new rm;
        qm(f, a.g.Ba++);
        B(f, 2, d);
        B(f, 3, e.x);
        B(f, 4, e.y);
        e = new pm;
        B(e, 2, c);
        B(e, 3, b);
        B(e, 4, !1);
        yc(f, 6, e);
        b = new Cm;
        B(b, 2, d);
        d = new Bm;
        B(d, 1, 0);
        c = hu(a, "player_base_speed");
        B(d, 2, c);
        c = hu(a, "player_vision_radius");
        B(d, 3, c);
        B(d, 6, 0);
        B(d, 8, !0);
        yc(b, 3, d);
        d = new Vm;
        yc(d, 1, f);
        yc(d, 2, b);
        return pp(a, d)
    }

    function Jw(a) {
        const b = Iw(a, 1, 1, 1, a.i.v);
        var c = b.getId();
        np(a.g, c);
        return b
    }

    function Kw(a) {
        return Iw(a, 5, 2, 2, a.i.u)
    }

    function pp(a, b) {
        let c = qp(a.g, F(b, rm, 1).getId());
        c || (c = Lw(a, b)) && dr(a.g, c);
        var d = F(b, Cm, 2),
            e = c.getId();
        B(d, 1, e);
        b = F(b, Cm, 2);
        rp(a.g, b);
        return c
    }

    function Mw(a) {
        a.Ba = new ou;
        return a.Ba
    }

    function Nw(a, b) {
        a.i = new wt(a.O, a.g, a.settings, b, a.Ea, a.v);
        a.j = a.v || !a.i.map.g.properties.outside ? Q.Cd : Q.fe;
        a.j.H.preload();
        R.zd.preload();
        R.Tc.preload()
    }

    function sp(a, b) {
        for (const c of b) switch (b = Cc(c, 1), sc(c, Lm)) {
            case 2:
                a.settings.set(b, Cc(c, 2 === sc(c, Lm) ? 2 : -1));
                break;
            case 3:
                a.settings.set(b, Ec(c, 3 === sc(c, Lm) ? 3 : -1));
                break;
            case 4:
                a.settings.set(b, Dc(c, 4 === sc(c, Lm) ? 4 : -1))
        }
    }

    function Lw(a, b) {
        switch (E(F(b, rm, 1), 2, 0)) {
            case 1:
            case 2:
                return new Zt(a.O, a.settings, F(b, rm, 1), a.g, a.v);
            case 16:
                return new Rp(a.O, a.settings, F(b, rm, 1), a.g);
            case 4:
                return new fo(a.O, a.settings, F(b, rm, 1), a.g);
            case 32:
                return new Bt(a.O, a.settings, F(b, rm, 1), a.g);
            case 2048:
                return new bu(a.O, a.settings, F(b, rm, 1), a.g)
        }
    }

    function Ow(a, b) {
        if (!a.Ia)
            if (Hw(a)) a.Ia = !0, Io(a.onReady);
            else return;
        Ct || (a.Mb.H = self.performance.now());
        const c = a.o;
        a.V.update(b);
        a.g.wa(b);
        a.o -= b;
        if (!a.v && 21E3 >= a.o && a.H && !a.Nb) {
            if (b = a.g.g) {
                var d = V.width / 2 + V.left;
                const e = .3 * V.height + V.top;
                d = new Lt(U("time_warning"), jn(b, "time_warning_duration_ms"), d, e);
                ir(b, d);
                a.j.stop();
                a.j = Q.zd;
                a.j.play()
            }
            a.Nb = !0
        }!a.v && 1E3 > a.o && 1E3 <= c && a.H && Q.Le.play()
    }

    function Pw(a) {
        const b = () => {
            a.O.g();
            setTimeout(b, hu(a, "client_broadcast_timeout"))
        };
        b()
    }

    function Qw(a) {
        a.j && (a.v ? el(a.j, 14769) : a.i.map.g.properties.outside ? el(a.j, 3503) : el(a.j, 14769))
    }

    function Rw(a) {
        a.j && (a = a.j, Yj(a), a.i && a.g && (a.i.gain.setValueAtTime(a.i.gain.value, a.g.currentTime), a.i.gain.exponentialRampToValueAtTime(.01, a.g.currentTime + 3)))
    }
    var Sw = class extends gi {
        constructor(a, b, c, d, e, f) {
            super();
            this.O = a;
            this.ya = b;
            this.v = d;
            this.Eb = e;
            this.Pb = f;
            this.V = new mu;
            this.Ea = new Bw;
            this.Lb = !1;
            this.i = null;
            this.Xa = this.Na = 0;
            this.settings = new ru;
            this.vb = -1;
            this.o = 0;
            this.Hb = this.H = !1;
            this.Oa = null;
            this.Qa = [];
            this.Nb = !1;
            this.Ba = null;
            this.u = 1;
            this.j = null;
            this.Fb = !1;
            this.onReady = Go();
            this.Ia = !1;
            hi(this, ra(fi, this.V));
            cs(this.ya);
            d && Dw(this.Ea, Gw(this));
            this.g = new vr(this.Ea, b);
            ar(this.g, g => {
                fu(this.V.j, g)
            });
            this.Mb = new Dt(() => {
                if (this.V) {
                    var g = this.V.j;
                    for (const h of g.i.keys()) fu(g, h)
                }
            });
            c.reset();
            this.V.gamepad = c
        }
        Bb() {
            super.Bb();
            this.j && (this.j.stop(), Zj(this.j, 1));
            this.i = null
        }
        update(a) {
            Dc(a, 6) && !this.H && (bs(this.ya), this.H = !0, qk(15));
            this.o = 1E3 * Fc(a, 3);
            this.Na = Fc(a, 4);
            this.Xa = Fc(a, 5);
            Dc(a, 7) && !this.Hb && (qk(16), this.Hb = !0, this.Oa = E(a, 8, 0), this.Qa = xc(a, Pm, 10), this.Eb())
        }
        render(a, b) {
            this.V.render(this, a, b);
            a = this.Mb;
            if (!Ct) {
                b = self.performance.now() - a.H;
                var c = a.v++ % a.g;
                a.i -= a.j[c];
                a.i += b;
                a.j[c] = b;
                a.v < 3 * a.g || (b = a.i / a.g, b > a.o && (Ct = !0, il(`ENTERING LOW PERF MODE: ${b} > ${a.o}`),
                    S(104), a.u && a.u()))
            }
        }
        wake() {
            this.g.wake()
        }
    };

    function Tw(a) {
        a.g ? a.g = !1 : (requestAnimationFrame(() => Tw(a)), Uw(a))
    }

    function Vw(a) {
        a.i && (a.i = !1, a.g = !0)
    }

    function Uw(a) {
        var b = Date.now(),
            c = b - a.j;
        0 > c || (c = Math.min(c, 50), a.j = b, a.onLoop(c))
    }
    var Ww = class {
        constructor(a) {
            this.onLoop = a;
            this.j = 0;
            this.g = this.i = !1;
            this.onLoop = a
        }
        start() {
            this.j = Date.now();
            const a = !this.g && !this.i;
            this.g = !1;
            this.i = !0;
            a && Tw(this)
        }
    };

    function Xw(a) {
        return 3 * a * a - 2 * a * a * a
    };

    function Yw(a, b, c, d = () => {}) {
        r(function*() {
            yield Zw(a);
            window.parent.postMessage({
                cmd: "resizeDoodle",
                width: `${b}px`,
                height: `${c}px`,
                duration: "400ms",
                preserveAspectRatio: !0
            }, "*");
            a.g = !0;
            let e = !1;
            const f = () => {
                a.o && a.oa.classList.remove("ddl-expanderHide_");
                e = !0;
                d()
            };
            a.j = setTimeout(f, 500);
            window.addEventListener("message", g => {
                "resizeComplete" === g.data.We && (null !== a.j && (clearTimeout(a.j), a.j = null), e || f())
            })
        })
    }

    function $w(a, b, c, d = () => {}) {
        if (a.oa && gk() && !a.g) {
            var e = a.oa;
            if (If() || Hf()) Yw(a, b, c, d);
            else {
                document.getElementById("fkbx") && cg(e.parentElement, "width", "100%");
                var f = Math.min(b, e.parentElement.clientWidth),
                    g = self.performance.now(),
                    h = new gm({
                        height: e.offsetHeight,
                        width: e.offsetWidth
                    }, {
                        height: f / (b / c),
                        width: f
                    }, 400, Xw, () => g);
                h.start();
                a.g = !0;
                var k = new Ww(l => a.i(l));
                a.i = l => {
                    g = void 0 !== l ? g + l : self.performance.now();
                    l = Ml(h);
                    Ag(e, Math.round(l.width), Math.round(l.height));
                    a.u();
                    return Nl(h) ? (Vw(k), d(), a.oa.style.willChange =
                        "unset", a.i = () => !1, !1) : !0
                }
            }
        }
    }

    function Zw(a) {
        if (!a.o) return Promise.resolve();
        a.oa.classList.add("ddl-expanderHide_");
        return new Promise(b => {
            setTimeout(b, 200)
        })
    }
    var ax = class {
        constructor(a, b = () => {}) {
            this.u = b;
            this.g = !1;
            this.o = "1" === Cf.g.get("ntp");
            this.i = () => !1;
            this.j = null;
            this.oa = a;
            gk() && (this.oa.style.willChange = "width,height")
        }
        reset() {
            this.g && (cg(this.oa, "width", "", "height", ""), zg(0), this.oa.style.width = "", this.oa.style.height = "");
            this.g = !1
        }
        update(a) {
            this.i(a)
        }
    };
    var bx = class {
        constructor(a) {
            this.g = () => {
                N.style.background = "#000";
                a()
            };
            this.j = 2 === E(Bp().g, 1, 1);
            this.state = 1;
            this.i = new gm({
                alpha: 0
            }, {
                alpha: 1
            }, 400)
        }
        Qc(a) {
            S(a ? 102 : 101);
            Kg.removeAttribute("title");
            this.state = 2;
            this.i.start();
            this.g();
            window !== window.parent && window.focus()
        }
        render() {}
    };
    fh.Va();

    function cx(a, b) {
        window.clearTimeout(a.Ic);
        dx(a, !1);
        cs(a.nc);
        a.gamepad.alpha = 1;
        a.Uc(b)
    }

    function ex(a) {
        const b = a.match.i.g.get(1),
            c = a.match.i.g.get(2);
        a.match.u = 0;
        a.j.Qa = !0;
        a.actions.push(new Pl([new Ql([new W(new X({
                brightness: 0
            }, {
                brightness: 1
            }, 1E3, Zl), d => {
                a.Oa = d.brightness
            }), new W(new X({
                x: b.x,
                y: b.y
            }, {
                x: c.x,
                y: c.y
            }, 3500, Zl), d => {
                var e = a.i,
                    f = d.y;
                e.x = d.x;
                e.y = f
            })]), new Ol(700), new Ll(() => {
                nu(a.i, !0);
                a.g = new fx(Oh, U("tutorial_1"), 1);
                a.u.push(a.g);
                Q.Le.play()
            }), new Ol(3E3), new Ll(() => {
                a.g.o = !0;
                nu(a.i, !1);
                a.j.Qa = !1
            }), new W(new X({
                brightness: 0
            }, {
                brightness: 1
            }, 1E3, Zl), d => {
                a.match.u = d.brightness
            }),
            new Ol(1E3), new Ll(() => {
                nu(a.i, !0);
                a.g = new fx(Mh, U(I() ? "tutorial_2_mobile" : "tutorial_2_desktop"), 2);
                a.u.push(a.g)
            }), new Ol(750), new W(new X({
                alpha: 0
            }, {
                alpha: 1
            }, 250, Zl), d => {
                a.gamepad.alpha = d.alpha
            }), new Ll(() => {
                gx(a)
            })
        ]))
    }

    function gx(a) {
        a.Ea = !0;
        document.activeElement && document.activeElement.blur()
    }

    function hx(a, b, c) {
        const d = new Im;
        var e = a.getId();
        B(d, 1, e);
        B(d, 2, b);
        B(d, 3, c);
        B(d, 4, 0 !== b || 0 !== c);
        a.input = d
    }

    function ix(a) {
        const b = a.match.i.g.get(2),
            c = a.match.i.g.get(3);
        a.actions.push(new Pl([new Ll(() => {
            a.g.o = !0;
            nu(a.i, !1);
            a.Kc = !0
        }), new Ol(1250), new W(new X({
            alpha: 1
        }, {
            alpha: 0
        }, 250, am), d => {
            a.gamepad.alpha = d.alpha
        }), new Ll(() => {
            a.Ea = !1;
            hx(a.j, 0, 0);
            st(a.match.i, 1)
        }), new W(new X({
            x: b.x,
            y: b.y
        }, {
            x: c.x,
            y: c.y
        }, 333, Zl), d => {
            var e = a.i,
                f = d.y;
            e.x = d.x;
            e.y = f
        }), new Ll(() => {
            a.g = new fx(Jh, U("tutorial_3"), 1);
            a.u.push(a.g);
            nu(a.i, !0)
        }), new Ol(750), new W(new X({
            alpha: 0
        }, {
            alpha: 1
        }, 250, Zl), d => {
            a.gamepad.alpha = d.alpha
        }), new Ll(() => {
            gx(a)
        })]))
    }

    function jx(a) {
        const b = a.match.i.g.get(3),
            c = a.match.i.g.get(4);
        a.actions.push(new Pl([new Ll(() => {
            a.Jc = !0
        }), new W(new X({
            x: b.x,
            y: b.y
        }, {
            x: c.x,
            y: c.y
        }, 2E3, Zl), d => {
            var e = a.i,
                f = d.y;
            e.x = d.x;
            e.y = f
        })]))
    }

    function kx(a) {
        const b = a.match.i.g.get(4),
            c = a.match.i.g.get(5);
        a.actions.push(new Pl([new Ll(() => {
            a.Ea = !1;
            hx(a.j, 0, 0);
            a.g.o = !0;
            a.Qa = !0;
            a.j.Yb = !1;
            tt(a.match.i, 2)
        }), new Ql([new W(new X({
            alpha: 1
        }, {
            alpha: 0
        }, 250, am), d => {
            a.gamepad.alpha = d.alpha
        }), new W(new X({
            x: b.x,
            y: b.y
        }, {
            x: c.x,
            y: c.y
        }, 1E3, Zl), d => {
            var e = a.i,
                f = d.y;
            e.x = d.x;
            e.y = f
        })]), new Ll(() => {
            a.g = new fx(Nh, U("tutorial_4"), 1);
            a.u.push(a.g);
            nu(a.i, !0)
        }), new Ol(750), new W(new X({
            alpha: 0
        }, {
            alpha: 1
        }, 250, Zl), d => {
            a.gamepad.alpha = d.alpha
        }), new Ll(() => {
            gx(a)
        })]))
    }

    function lx(a) {
        const b = a.match.i.g.get(5),
            c = a.match.i.g.get(6);
        a.actions.push(new Pl([new Ll(() => {
            a.g.o = !0;
            nu(a.i, !1);
            a.vb = !0;
            a.j.Yb = !0;
            st(a.match.i, 2);
            a.match.Lb = !0
        }), new Ll(() => {
            a.g = new fx(Kh, U("tutorial_5"), 2);
            a.u.push(a.g);
            nu(a.i, !0)
        }), new W(new X({
            x: b.x,
            y: b.y
        }, {
            x: c.x,
            y: c.y
        }, 4E3, Zl), d => {
            var e = a.i,
                f = d.y;
            e.x = d.x;
            e.y = f
        })]))
    }

    function dx(a, b) {
        mx(a, b);
        nx(a, b)
    }

    function ox(a, b) {
        dx(a, !b);
        b ? (px(a, a.Pb, c => {
            "mouseup" === c && (ox(a, !1), S(106), cx(a, !0))
        }), px(a, a.Fb, c => {
            "mouseup" === c && ox(a, !1)
        }), px(a, a.Lb, c => {
            "mouseup" === c && ox(a, !1)
        })) : (Sq(a.v, a.Pb), Sq(a.v, a.Fb), Sq(a.v, a.Lb));
        a.Nb = b
    }

    function qx(a, b) {
        a.j.Qe = a.Ea && !a.Nb;
        Ow(a.match, b);
        if (Hw(a.match)) {
            a.Xa = Math.max(a.Xa, a.o.j.length);
            var c;
            if (c = !a.Kc) c = a.nc, c = c.H || c.o;
            c && tr(a.j) && ix(a);
            !a.Jc && !a.Qa && 0 < a.j.j.length && jx(a);
            !a.Qa && 0 < a.o.j.length && kx(a);
            !a.vb && a.o.j.length < a.Xa && 5 <= a.j.j.length && lx(a);
            a.H.update(b);
            a.vb && 0 === a.o.j.length && null === a.H.g && a.H.start();
            null !== a.H.g && (c = Ml(a.H).alpha, a.o.alpha = c);
            Nl(a.H) && a.o.va();
            if (a.Na) {
                if (0 <= a.V) {
                    c = 36 * Math.PI;
                    var d = 2 * hu(a.match, "player_base_speed");
                    a.V += b;
                    c = 2 * -(a.V / 1E3 / (c / d)) * Math.PI +
                        1.5 * Math.PI;
                    d = a.o.g;
                    hx(a.o, a.Na.x + 18 * Math.cos(c) - d.x, a.Na.y - 18 * Math.sin(c) - d.y)
                }
                if (a.mc) {
                    c = a.j;
                    const [g, h] = Xt(c);
                    d = g;
                    var e = h;
                    let k = !0;
                    .1 > d && .1 > e && (e = d = 0, k = !1);
                    const l = new Im;
                    var f = c.getId();
                    B(l, 1, f);
                    B(l, 2, d);
                    B(l, 3, e);
                    B(l, 4, k);
                    c.input = l
                }
                for (c = 0; c < a.u.length; c++) d = a.u[c], d.update(b), d.u() && a.u.splice(c--, 1);
                for (c = 0; c < a.actions.length; c++) d = a.actions[c], d.update(b), d.g() && a.actions.splice(c--, 1)
            }
        }
    }

    function px(a, b, c) {
        Pq(a.v, b, c);
        Qq(a.v, b)
    }

    function mx(a, b) {
        a.Lc && a.ya && (b ? px(a, a.ya, c => {
            "mouseup" === c && (S(105), ox(a, !0))
        }) : Sq(a.v, a.ya))
    }

    function nx(a, b) {
        a.Ia && (b ? px(a, a.Ia, c => {
            "mouseup" === c && (S(107), cx(a, !1))
        }) : Sq(a.v, a.Ia))
    }
    var rx = class extends gi {
        constructor(a, b, c, d, e) {
            super();
            this.nc = a;
            this.v = b;
            this.gamepad = c;
            this.Uc = e;
            this.Kc = !1;
            this.Eb = new Set;
            this.V = -1;
            this.Xa = 0;
            this.mc = this.vb = this.Qa = this.Jc = !1;
            this.u = [];
            this.actions = [];
            this.Ic = 0;
            this.O = this.Ia = this.Ba = this.ya = null;
            this.Nb = !1;
            this.Oa = 0;
            this.g = null;
            this.gamepad.alpha = 0;
            this.Lc = !Pg && 2 !== E(Bp().g, 1, 1);
            this.Vc = U("host_private_match");
            this.Wc = U("skip_tutorial");
            this.Mb = new cq("host_private_match_dialog", 36, .8 * Hh[3], 2);
            this.Mb.g = "#000";
            this.Yb = new cq("host_private_match_dialog_yes_button",
                36, .9 * Eh[3]);
            this.Yb.g = "#000";
            this.Hb = new cq("host_private_match_dialog_back_button", 36, .9 * Eh[3]);
            this.Hb.g = "#000";
            this.Pb = dq(0, 0, 223, 102);
            this.Fb = dq(0, 0, 223, 109);
            this.Lb = dq(0, 0, 106, 101);
            this.match = new Sw(new po, a, c, !0, () => {
                this.g.o = !0;
                this.actions.push(new W(new X({
                    alpha: 1
                }, {
                    alpha: 0
                }, 250, am), g => {
                    this.gamepad.alpha = g.alpha
                }));
                const f = new fx(Lh, U("tutorial_6"), 1);
                this.u.push(f);
                this.Ea = this.j.Yb = !1;
                this.mc = !0;
                qk(3);
                Rw(this.match);
                this.Ic = window.setTimeout(() => {
                    cx(this, !1)
                }, 3E3)
            }, (f, g) => {
                g = g.getId();
                if (!this.Eb.has(g)) switch (g) {
                    case 1:
                        f.i && (this.Eb.add(g), hx(this.o, 0, hu(this.match, "player_base_speed")));
                        break;
                    case 2:
                        f.i || (this.Eb.add(g), this.V = 0)
                }
            });
            Nw(this.match, d);
            tt(this.match.i, 1);
            st(this.match.i, 2);
            hi(this, ra(fi, this.match));
            this.j = Jw(this.match);
            this.o = Kw(this.match);
            this.i = Mw(this.match);
            this.H = new X({
                alpha: this.o.alpha
            }, {
                alpha: 0
            }, 1E3);
            this.Na = this.match.i.o;
            this.Ea = !1;
            ex(this);
            Qw(this.match);
            qk(2)
        }
        load() {
            return this.match.onReady.promise
        }
        wake() {
            this.match.wake()
        }
        render(a, b) {
            a.save();
            this.match.render(a, b);
            1 > this.Oa && (a.save(), a.fillStyle = `rgba(0, 0, 0, ${1-this.Oa}`, a.fillRect(0, 0, a.canvas.width, a.canvas.height), a.restore());
            a.textAlign = "center";
            a.textBaseline = "middle";
            var c = Rh[3],
                d = Rh[4],
                e = a.canvas.width - 20 - c / 2,
                f = K ? V.top + V.height : a.canvas.height - 20 - d / 2;
            b = e - c / 2;
            Bl(Rh, a, e, f);
            e = a.canvas.width - 20 - c + 74;
            this.O || (this.O = Hl(a, this.Wc, Og, 24, 12, 95, 2));
            const g = this.O.fontSize;
            Jl(a, this.O, e, f - g * (this.O.lines.length - 1) / 2, g);
            this.Ia || (this.Ia = dq(b, f - d / 2, c, d), nx(this, !0));
            this.Lc && (c = uh[3],
                d = uh[4], b = K ? 20 + c / 2 : b - 20 - c / 2, f = K ? V.top + V.height : a.canvas.height - 20 - d / 2, Bl(uh, a, b, f), this.Ba || (this.Ba = Hl(a, this.Vc, Og, this.O.fontSize, 12, c - 30, 2)), e = this.Ba.fontSize, Jl(a, this.Ba, b, f - e * (this.Ba.lines.length - 1) / 2, e), this.ya || (this.ya = dq(b - c / 2, f - d / 2, c, d), mx(this, !0)));
            for (var h of this.u) h.render(a, 0, 0);
            this.Nb && (El(a), h = a.canvas.width / 2, b = a.canvas.height / 2, Bl(Hh, a, h, b), h -= Hh[3] / 2, b -= Hh[4] / 2, c = L / 2, this.Mb.Ha(L / 2, b + 140), this.Mb.render(a), Bl(Eh, a, c, b + 260), this.Yb.Ha(c, b + 260), this.Yb.render(a), Bl(Eh, a, c,
                b + 378), this.Hb.Ha(c, b + 378), this.Hb.render(a), fq(this.Lb, h + Hh[3] - 118, b - 2), Bl(Ih, a, h + Hh[3] - 118 + Ih[3] / 2, b - 2 + Ih[4] / 2), fq(this.Pb, h + 114, b + 206), fq(this.Fb, h + 114, b + 324));
            a.restore()
        }
    };

    function Xp(a) {
        return new W(new X({
            scale: 0
        }, {
            scale: .8
        }, 250, bm), b => a.Ta(b))
    }

    function Yp(a) {
        return new W(new X({
            scale: .8
        }, {
            scale: 0
        }, 250, $l), b => a.Ta(b))
    }
    class fx extends Zp {
        constructor(a, b, c) {
            super(b);
            this.Ka = a;
            this.scale = 0;
            this.position = I() ? 2 : c;
            a = document.createElement("canvas");
            b = this.v();
            a.width = 1.5 * oh[3] + b[3] / 2;
            a.height = b[4] / 2;
            this.g = a;
            this.i = this.g.getContext("2d")
        }
        v() {
            return this.Ka
        }
        Ta(a) {
            this.scale = a.scale
        }
        render(a) {
            const b = 1.5 * oh[3],
                c = 1.5 * oh[4];
            var d = this.v();
            const e = d[3] / 2,
                f = d[4] / 2,
                g = V.width,
                h = V.left,
                k = (1 === this.position ? .25 : .7) * V.height + V.top;
            this.i.clearRect(0, 0, this.g.width, this.g.height);
            Bl(oh, this.i, (e + b) / 2, f / 2, b, c);
            Bl(d, this.i, e / 2,
                f / 2, e, f);
            this.i.textAlign = "center";
            this.i.textBaseline = "middle";
            this.i.fillStyle = "#000";
            d = Hl(this.i, this.text, Og, 36, 16, b - e / 2, 2);
            Jl(this.i, d, (1.2 * e + b) / 2, c / 2 + (10 - 16.25 * (d.lines.length - 1)), 1.25 * d.fontSize);
            a.save();
            a.translate(h + g / 2, k);
            a.translate(this.scale / 2 * -this.g.width, this.scale / 2 * -this.g.height);
            a.drawImage(this.g, 0, 0, this.g.width * this.scale, this.g.height * this.scale);
            a.restore()
        }
    };

    function sx(a, b = null) {
        return r(function*() {
            var c = Cc(a, 2);
            if (!Ap(c)) throw Error("W");
            c = yield ip(c);
            return new wp(c, {
                Yc: Cc(a, 2),
                Fc: Cc(a, 1)
            }, b)
        })
    };
    var tx = class extends H {
        constructor(a) {
            super(a)
        }
    };
    var ux = class extends H {
        constructor(a) {
            super(a)
        }
    };
    var vx = class extends H {
        constructor(a) {
            super(a)
        }
    };
    var wx = [1, 2],
        xx = [class extends H {
            constructor(a) {
                super(a)
            }
        }, 1, me, [ux, 1, ne, 2, he, 3, he, 4, ke, [tx, 1, de, 2, he, 3, he, 4, de]], wx, 2, me, [vx, 1, de, 2, he, 3, he, 4, fe, 5, he], wx];
    var zx = {
        Qd: a => Vd(a, yx),
        Ze: a => Ud(a, xx)
    };
    var Ax = class extends Error {
            constructor(a) {
                super(`MatchmakerServerError: {${a}}`);
                Object.setPrototypeOf(this, Ax.prototype)
            }
        },
        Bx = class extends Error {
            constructor(a) {
                super(`MatchmakerDisconnectedError: {${a}}`);
                Object.setPrototypeOf(this, Bx.prototype)
            }
        },
        Cx = class extends Error {
            constructor(a) {
                super(`MatchmakerWebSocketError: {${a}}`);
                Object.setPrototypeOf(this, Cx.prototype)
            }
        };
    var Ex = class extends H {
            constructor(a) {
                super(a, -1, Dx)
            }
        },
        Dx = [1];
    var Fx = [1];
    var Gx = class extends H {
            constructor(a) {
                super(a)
            }
        },
        Hx = [1, 2, 3, 4],
        yx = [Gx, 1, me, [Ex, 1, ie, 2, he], Hx, 2, me, [class extends H {
            constructor(a) {
                super(a, -1, Fx)
            }
        }, 1, ie], Hx, 3, me, [class extends H {
            constructor(a) {
                super(a)
            }
        }, 1, he], Hx, 4, me, [class extends H {
            constructor(a) {
                super(a)
            }
        }, 1, he], Hx];

    function Ix(a, b) {
        var c = [];
        return r(function*() {
            if (1 !== a.status) throw Error("X`" + a.clientId);
            c.push(`${"GAME_MODE"}:${b.name}`);
            a.status = 3;
            var d = a.g,
                e = new Ex,
                f = c;
            if (null == f) f = Wb;
            else {
                for (let g = 0; g < f.length; g++);
                Eb(f, 5)
            }
            B(e, 1, f);
            f = new Gx;
            Xb(f);
            null == e && (e = void 0);
            rc(f, 1, Hx, e);
            Wo(d, f);
            a.tc = Go();
            return a.tc.promise
        })
    }

    function Jx(a, b) {
        console.error("MatchmakerClient Error: {%o}", b);
        0 === a.status ? a.status = 5 : 2 === a.status ? (a.status = 5, Jo(a.u, b)) : (a.status = 5, a.tc ? Jo(a.tc, b) : console.error(`Unhandled Matchmaker error: ${b}`))
    }
    var Kx = class {
        constructor() {
            var a = Fo;
            this.status = 0;
            this.clientId = "unset";
            this.o = 0;
            this.v = null;
            this.H = () => {};
            this.g = new a({
                nd: zx
            });
            Xo(this.g, 0, this.j.bind(this));
            Xo(this.g, 2, this.i.bind(this));
            Xo(this.g, 3, this.onError.bind(this));
            Xo(this.g, 1, this.O.bind(this))
        }
        connect(a) {
            this.o = Date.now();
            return this.g.connect(a)
        }
        O(a) {
            switch (sc(a, wx)) {
                case 1:
                    a = F(a, ux, 1 === sc(a, wx) ? 1 : -1);
                    if (!a) break;
                    this.v = a;
                    if (1 === E(a, 1, 0) && null != jc(a, 2) && void 0 !== vc(a, tx, 4)) {
                        if (!this.tc) throw this.status = 5, Error("Y");
                        this.status = 4;
                        Io(this.tc, {
                            address: Cc(a, 2),
                            Fc: Cc(F(a, tx, 4), 2),
                            De: Fc(F(a, tx, 4), 1)
                        })
                    } else a = new Ax(Cc(a, 3) || "Unknown Error"), Jx(this, a);
                    this.g.close();
                    break;
                case 2:
                    if (a = F(a, vx, 2 === sc(a, wx) ? 2 : -1))
                        if (this.H(a), 2 === this.status) {
                            a = og(pg(qg(new rg, Cc(a, 3)), Cc(a, 2)), Cc(a, 5));
                            if (!this.u) throw this.status = 5, Error("Z");
                            this.status = 3;
                            this.tc = Go();
                            Io(this.u, {
                                Eg: a,
                                tc: this.tc.promise
                            })
                        }
            }
        }
        disconnect() {
            this.g.close()
        }
        j() {
            this.clientId = this.g.u.value.clientId;
            this.status = 1
        }
        i() {
            let a;
            console.log("(%s) Disconnected from Matchmaker (result: %s) after (%d)s.",
                this.clientId, (null == (a = this.v) ? 0 : Cc(a, 2).length) ? "success" : "fail", (Date.now() - this.o) / 1E3);
            4 === this.status || 5 === this.status || Jx(this, new Bx("Disconnected unexpectedly waiting for match."))
        }
        onError(a) {
            Jx(this, new Cx(`${this.clientId}: ${a}`))
        }
    };
    var Lx = class extends Kx {
        constructor(a = () => {}, b, c, d) {
            super();
            this.va = b;
            this.V = c;
            this.wa = d;
            this.H = a
        }
        j() {
            this.va();
            super.j()
        }
        onError(a) {
            this.V(a);
            super.onError(a)
        }
        i() {
            this.wa();
            super.i()
        }
    };

    function Mx(a, b = a.H) {
        return r(function*() {
            a.i || (a.i = Go(), yield a.g.connect(b), Io(a.i));
            return a.i.promise
        })
    }
    var Nx = class {
        constructor(a) {
            this.H = Hg;
            this.j = a;
            this.v = Go();
            this.g = new Lx(this.u.bind(this), () => {}, this.j, () => {})
        }
        hd(a) {
            const b = this;
            return r(function*() {
                yield Mx(b);
                const c = yield Ix(b.g, a);
                return {
                    Yc: `wss://${c.address}`,
                    Fc: c.Fc
                }
            })
        }
        reset() {
            this.i = void 0;
            this.v = Go();
            this.o = void 0;
            this.g.disconnect();
            this.g = new Lx(this.u.bind(this), () => {}, this.j, () => {})
        }
        u(a) {
            a = Cc(a, 3);
            this.o || Io(this.v);
            this.o = a
        }
    };
    const Ox = ol(),
        Px = Bp();

    function op(a, b) {
        r(function*() {
            sp(a.match, xc(b, Km, 2));
            const c = Cc(b, 3);
            if (c) try {
                const d = yield $k(c, Fc(b, 4) || void 0);
                Nw(a.match, d);
                qk(13)
            } catch (d) {
                dl(d), a.H()
            } else dl("Missing map filename, can't fetch map."), a.H()
        })
    }

    function Qx(a, b) {
        a.match = new Sw(new oo(b), a.V, a.gamepad, !1, () => {
            a.o = new $q(a.match, a.j);
            Rx(a, 5);
            so("halloween21.client.match_config", null)
        }, () => {})
    }

    function Sx(a) {
        const b = vo();
        b ? Tx(a, {
            Yc: b.url,
            Fc: b.match,
            Gc: {
                player: b.player,
                nonce: b.nonce
            }
        }) : Ux(a).then(() => {
            Vx(a)
        })
    }

    function Tx(a, b) {
        r(function*() {
            yield Promise.all([Wx(a), Ux(a)]);
            try {
                yield Xx(a, b)
            } catch (c) {
                Vx(a);
                return
            }
            yield a.match.onReady.promise;
            Rx(a, 4);
            Pw(a.match);
            Qw(a.match)
        })
    }

    function Ux(a) {
        return r(function*() {
            Yx(a);
            yield al();
            return fs(a.v)
        })
    }

    function Vx(a) {
        const b = Xk;
        b ? (a.i = new rx(a.V, a.j, a.gamepad, b, c => {
            Zx(a, c)
        }), a.i.load().then(() => {
            bl();
            Rx(a, 2);
            bs(a.V)
        })) : Zx(a, !1)
    }

    function Zx(a, b) {
        r(function*() {
            yield Wx(a);
            return b ? $x(a) : 2 === E(Px.g, 1, 1) ? ay(a) : a.hd()
        })
    }

    function Rx(a, b) {
        switch (a.state) {
            case 2:
                a.i.dispose();
                a.i = null;
                break;
            case 4:
                a.match.dispose();
                a.match = null;
                break;
            case 5:
                a.o.dispose();
                a.o = null;
                break;
            case 6:
                a.v = null
        }
        a.state = b
    }

    function Wx(a) {
        return r(function*() {
            Yx(a);
            yield bl();
            return fs(a.v)
        })
    }

    function $x(a, b = !1) {
        return r(function*() {
            var c = Er(a.ya, F(Px.g, rg, 2), b);
            a.g = new Ps(a.j, !0, !0, c, () => {
                a.u && (a.u.start(), S(108))
            }, b);
            Rx(a, 3);
            c = yield c;
            return by(a, 3, c)
        })
    }

    function ay(a, b = !1) {
        const c = F(Px.g, rg, 2);
        a.g = new Ps(a.j, !0, !1, Promise.resolve(c), () => {
            a.u && (a.u.start(), S(108))
        }, b);
        Rx(a, 3);
        return by(a, 2, c)
    }

    function by(a, b, c) {
        return r(function*() {
            Px.set(b, c);
            const d = (() => {
                if (1 === b) return () => r(function*() {
                    return {
                        connectionInfo: yield a.ya.hd(sg.Yd),
                        ob: void 0
                    }
                });
                if (!c) throw Error("$");
                return () => r(function*() {
                    a.u = yield sx(c, kl("Get hyped for Halloween 2021HAT", null));
                    const {
                        ob: e,
                        connectionInfo: f
                    } = yield a.u.join(g => {
                        let h;
                        null == (h = a.g) || Ks(h, g)
                    }, () => {
                        let g;
                        null != (g = a.g) && (g.Mb = !0, g.Ea || S(116), g.Ea = !0)
                    });
                    a.u = null;
                    return {
                        ob: e,
                        connectionInfo: f
                    }
                })
            })();
            try {
                const {
                    connectionInfo: e,
                    ob: f
                } = yield d();
                qk(10);
                il(`Joining game ${e.Fc}...`);
                yield Xx(a, e, f)
            } catch (e) {
                dl(e), a.H()
            } finally {
                a.ya.reset()
            }
        })
    }

    function Xx(a, b, c) {
        return r(function*() {
            const d = yield c ? lp(a, b, c) : jp(a, b);
            Qx(a, d);
            yield mp(d);
            il("Connected");
            qk(11)
        })
    }

    function Yx(a) {
        6 !== a.state && (Rx(a, 6), a.v = new gs)
    }
    var cy = class extends gi {
        constructor(a, b) {
            super();
            this.j = b;
            this.state = 1;
            this.u = this.O = this.i = this.o = this.v = this.match = this.g = null;
            this.title = new bx(() => {
                document.activeElement && document.activeElement.blur();
                a: {
                    var c = document.getElementsByTagName("INPUT");
                    for (const d of c)
                        if ("q" === d.name) {
                            c = d;
                            break a
                        } c = null
                }
                c && c.setAttribute("data-saf", "true");
                N.width = L;
                N.height = Ig;
                Jr(this.j);
                Sx(this)
            });
            this.gamepad = new Cr;
            this.V = new es(this.j, this.gamepad, a);
            this.ya = (() => new Nx(this.H.bind(this)))();
            sl(ol(), 0, 0)
        }
        Qc() {
            this.title.Qc(!1)
        }
        wake() {
            switch (this.state) {
                case 2:
                    this.i.wake();
                    break;
                case 4:
                    this.match.wake()
            }
        }
        hd() {
            this.g = new Ps(this.j, !1, !1);
            Rx(this, 3);
            return by(this, 1)
        }
        H() {
            3 === this.state && this.g ? Ns(this.g) : (Rx(this, 7), this.O || (this.O = new zr(this.j, () => {
                document.location.reload()
            })), yr(this.O))
        }
        update(a) {
            switch (this.state) {
                case 1:
                    a = this.title;
                    switch (a.state) {
                        case 1:
                            a.j && a.Qc(!0);
                            break;
                        case 2:
                            Nl(a.i) && a.g()
                    }
                    break;
                case 6:
                    var b = this.v;
                    b.j.update(a);
                    for (const c of b.i) c.update(a);
                    b.g += a;
                    this.i ? qx(this.i, a) : this.match && Ow(this.match, a);
                    break;
                case 2:
                    qx(this.i, a);
                    break;
                case 3:
                    0 ===
                        this.g.state && this.match && (b = this.match.g.g) && Ms(this.g, b.Na, b.Wa);
                    b = this.g;
                    b.i && b.i.update(a);
                    b.v += a;
                    b.Na.update(a);
                    b.u && b.u.update(a);
                    b.j && b.j.update(a);
                    b.ya && b.ya.update(a);
                    b.va && b.va.update(a);
                    b.Eb && b.Eb.update(a);
                    switch (b.state) {
                        case 7:
                            Nl(b.u) && (Ls(b, 1), fm(b.u));
                            break;
                        case 1:
                            1E3 <= b.v && Ls(b, 2);
                            break;
                        case 2:
                            Nl(b.j) && Ls(b, 3);
                            break;
                        case 3:
                            500 <= b.v && Ls(b, 4);
                            break;
                        case 4:
                            b.O.update(a), 3E3 <= b.v && Ls(b, 5)
                    }
                    b.H && b.H.update(a);
                    if (5 === this.g.state && Hw(this.match)) {
                        if (a = this.match.g.g) b = new Xm, B(b, 1, 14), B(b,
                            2, a.id), B(b, 3, !0), a.ya.Dd(b);
                        Rx(this, 4);
                        Pw(this.match);
                        Qw(this.match)
                    }
                    break;
                case 4:
                    Ow(this.match, a);
                    break;
                case 5:
                    b = this.o;
                    b.o += a;
                    switch (b.state) {
                        case 0:
                            3E3 <= b.o && Xq(b, 1)
                    }
                    if (3 === this.o.state) this.match = null, $x(this);
                    else if (4 === this.o.state) switch (this.match = null, E(Px.g, 1, 1)) {
                        case 3:
                            $x(this, !0);
                            break;
                        case 2:
                            ay(this, !0);
                            break;
                        case 1:
                            this.hd()
                    }
            }
        }
        render(a) {
            switch (this.state) {
                case 1:
                    this.title.render(a);
                    break;
                case 6:
                    this.v.render(a);
                    break;
                case 2:
                    this.i.render(a, Ox);
                    break;
                case 3:
                    this.g.render(a);
                    break;
                case 4:
                    this.match.render(a, Ox);
                    break;
                case 5:
                    this.o.render(a);
                    break;
                case 7:
                    this.O.render(a)
            }
        }
    };
    var dy = {};

    function ey() {
        throw Error("aa");
    }
    ey.prototype.g = null;
    ey.prototype.toString = function() {
        return this.Je
    };

    function fy() {
        ey.call(this)
    }
    ta(fy, ey);
    fy.prototype.Ye = dy;
    var gy = function(a) {
        function b(c) {
            this.Je = c
        }
        b.prototype = a.prototype;
        return function(c, d) {
            c = new b(String(c));
            void 0 !== d && (c.g = d);
            return c
        }
    }(fy);
    const hy = {
        "\x00": "&#0;",
        "\t": "&#9;",
        "\n": "&#10;",
        "\v": "&#11;",
        "\f": "&#12;",
        "\r": "&#13;",
        " ": "&#32;",
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#39;",
        "-": "&#45;",
        "/": "&#47;",
        "<": "&lt;",
        "=": "&#61;",
        ">": "&gt;",
        "`": "&#96;",
        "\u0085": "&#133;",
        "\u00a0": "&#160;",
        "\u2028": "&#8232;",
        "\u2029": "&#8233;"
    };

    function iy(a) {
        return hy[a]
    }
    const jy = /[\x00\x22\x26\x27\x3c\x3e]/g,
        ky = /[\x00\x22\x27\x3c\x3e]/g,
        ly = /^[a-zA-Z0-9+\/_-]+={0,2}$/,
        my = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
        ny = /</g;
    /*
     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    function oy() {
        var a = py,
            b = wa || (wa = new Zi);
        a = a(qy, void 0);
        if (ma(a))
            if (a instanceof ey) {
                if (a.Ye !== dy) throw Error('ba');
                a = Ve(a.toString())
            } else
                a = Ue('zSoyz');
        else
            a = Ue(String(a));
        b = b.g;
        var c = a;
        a = Yi(b, 'DIV');
        bb ? (c = Ye(Ze, c), af(a, c), a.removeChild(a.firstChild)) : af(a, c);
        if (1 == a.childNodes.length)
            b = a.removeChild(a.firstChild);
        else
            for (b = b.createDocumentFragment(); a.firstChild;) b.appendChild(a.firstChild);
        return b
    }
    const qy = {};

    function py(a, b) {
        (a = b && b.Ag) ?
        (a = String(a), a = ly.test(a) ? a : 'zSoyz',
            a = ' nonce="' +
            (null != a && a.Ye === dy ?
                String(String(a.Je).replace(my, '').replace(ny, '&lt;'))
                .replace(ky, iy) :
                String(a).replace(jy, iy)) +
            '"') :
        a = '';
        a = gy(
            '<style' + a +
            '>\n#hplogo{-webkit-transition:opacity 200ms;-o-transition:opacity 200ms;transition:opacity 200ms}#fpdoodle #hplogo.ddl-fpdoodleready_{opacity:1}#hpcanvas{background:none;pointer-events:all}#fpdoodle body,#sadoodle body{background:#000;-webkit-transition:background 200ms;-o-transition:background 200ms;transition:background 200ms}#fpdoodle .ddl-ntp_,#sadoodle .ddl-ntp_{background:transparent}.ddl-expanderHide_{opacity:0}.ddl-closeFullscreenBtn_{z-index:3000}.ddl-playButtonStatic18_{position:absolute;top:32%;left:50%;-webkit-transform:translate(-35%,-50%) scale(1);-ms-transform:translate(-35%,-50%) scale(1);-o-transform:translate(-35%,-50%) scale(1);transform:translate(-35%,-50%) scale(1)}.ddl-playButtonStatic_{position:absolute;left:0;top:0;height:100%;width:100%;background-image:url(/logos/2021/halloween21/r1024/Halloween21-CTAGreenButton.png);background-position:center;-webkit-background-size:contain;-o-background-size:contain;background-size:contain;background-repeat:no-repeat}.ddl-playButtonStatic18_.ddl-playButtonAnimated_{-webkit-animation:play18Animation 2s ease-in-out infinite;-o-animation:play18Animation 2s ease-in-out infinite;animation:play18Animation 2s ease-in-out infinite}.ddl-playButtonStatic_.ddl-playButtonAnimated_{-webkit-animation:playAnimation 2s ease-in-out infinite;-o-animation:playAnimation 2s ease-in-out infinite;animation:playAnimation 2s ease-in-out infinite}@keyframes playAnimation{0%{background-image:url(/logos/2021/halloween21/r1024/Halloween21-CTAGreenButton.png)}50%{background-image:url(/logos/2021/halloween21/r1024/Halloween21-CTAPurpleButton.png)}}@keyframes play18Animation{0%{-webkit-transform:translate(-35%,-50%) scale(1);-ms-transform:translate(-35%,-50%) scale(1);-o-transform:translate(-35%,-50%) scale(1);transform:translate(-35%,-50%) scale(1)}50%{-webkit-transform:translate(-35%,-50%) scale(1.4);-ms-transform:translate(-35%,-50%) scale(1.4);-o-transform:translate(-35%,-50%) scale(1.4);transform:translate(-35%,-50%) scale(1.4)}100%{-webkit-transform:translate(-35%,-50%) scale(1);-ms-transform:translate(-35%,-50%) scale(1);-o-transform:translate(-35%,-50%) scale(1);transform:translate(-35%,-50%) scale(1)}}.ddl-shareLinkContainer_{position:absolute;width:60%;height:36px;top:0;margin:0 auto;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:flex-start;justify-content:flex-start;word-wrap:break-word}.ddl-shareLink_{color:#000;background:none;overflow:hidden;width:100%;text-align:center;vertical-align:middle;-webkit-user-select:all;-moz-user-select:all;-ms-user-select:all;-webkit-user-select:all;-moz-user-select:all;-ms-user-select:all}.ddl-shareButton_{position:absolute;width:44px;height:44px;bottom:-22px;right:-22px;opacity:0.75;pointer-events:all;cursor:pointer}.ddl-shareLinkCopied_{color:#000;position:absolute;top:160px;left:50%;padding:10px 15px;-webkit-border-radius:30px;-moz-border-radius:30px;border-radius:30px;background-color:rgba(255,255,255,0.7);-webkit-transform:translate(-50%,-100%);-ms-transform:translate(-50%,-100%);-o-transform:translate(-50%,-100%);transform:translate(-50%,-100%);-webkit-transition:transform .2s ease-out,opacity .2s ease-out;-o-transition:transform .2s ease-out,opacity .2s ease-out;transition:transform .2s ease-out,opacity .2s ease-out;opacity:0}.ddl-shareLinkCopied_.ddl-visible_{-webkit-transform:translate(-50%,0%);-ms-transform:translate(-50%,0%);-o-transform:translate(-50%,0%);transform:translate(-50%,0%);opacity:1.0}.ddl-hplogocta_{width:100%;height:100%;-webkit-background-size:contain;-o-background-size:contain;background-size:contain;background-position:center;border:none;overflow:hidden;position:absolute;left:0;top:0;z-index:10;cursor:pointer;padding:0;-webkit-transition:opacity 500ms;-o-transition:opacity 500ms;transition:opacity 500ms;opacity:0;pointer-events:auto}.ddl-hplogocta_.ddl-showCta_{opacity:1}.ddl-hplogocta_.ddl-ctaHideDuringLightbox_{display:none}.ddl-closeFullscreenBtn_{pointer-events:all;cursor:pointer;position:absolute;top:5px;right:5px;z-index:3000}.ddl-domRootLightboxed_{left:0;top:0}.ddl-contentHide_{display:none}#ddlDomRoot{pointer-events:none}.ddl-lightboxMode_,#hplogo.ddl-lightboxMode_{position:absolute;top:0;left:0;height:100%;width:100%;z-index:1000;overflow:hidden}.ddl-lightboxContentContainer_{position:relative;height:100%;width:100%}.ddl-lightboxEnabled_ .ddl-lightboxContentContainer_{height:90%;width:90%}.ddl-lightboxContent_{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;-o-transform-origin:0 0;transform-origin:0 0}.ddl-lightboxContainer_{position:absolute;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;width:100%;height:100%}.ddl-lightboxBackground_{opacity:0;background-color:rgba(0,0,0,0.8)}.ddl-lightboxEnabled_{opacity:1;-webkit-transition:opacity 500ms;-o-transition:opacity 500ms;transition:opacity 500ms}\n</style>');
        return gy(a)
    };

    function ry() {
        const a = document.getElementById('hplogo'),
            b = document.getElementById('ddlDomRoot'),
            c = document.getElementById('ctaRoot'),
            d = document.getElementById('hpcanvas');
        if (null === a || null === b || null === c || null === d) throw Error('ca');
        return {
            scale: 1,
            orientation: 'landscape-primary',
            isFullscreen: !1,
            Ld: !1,
            width: 960,
            height: 540,
            oa: a,
            Ob: b,
            Ub: c,
            Ib: d
        }
    };
    var ty = class {
        constructor(a) {
            this.j = a;
            sy(a)
        }
    };

    function uy(a, b) {
        a.Ua.style.display = b ? 'block' : 'none'
    }
    var wy = class {
        constructor(a, b) {
            this.Ua = vy();
            this.Ua.style.top = "10px";
            this.Ua.style.right = "10px";
            this.Ua.style.width = "52px";
            this.Ua.style.height = "52px";
            this.Ua.style.cursor = "pointer";
            this.Ua.style.position = "absolute";
            this.Ua.style.pointerEvents = "all";
            this.Ua.style.background = "transparent";
            this.Ua.style.display = "none";
            this.Ua.setAttribute("role", "button");
            this.Ua.setAttribute("aria-label", "Close");
            this.Ua.tabIndex = 0;
            wi(this.Ua, "click", b);
            wi(this.Ua, "keydown", c => {
                32 !== c.keyCode && 13 !== c.keyCode || b()
            });
            a.appendChild(this.Ua)
        }
    };
    const vy = () => {
        var a = 52 * (window.devicePixelRatio || 1);
        const b = document.createElement("canvas");
        b.width = a;
        b.height = a;
        const c = b.getContext("2d");
        c.fillStyle = "rgba(0,0,0,.3)";
        c.arc(a / 2, a / 2, a / 2, 0, 2 * Math.PI);
        c.fill();
        c.strokeStyle = "#fff";
        c.lineWidth = a / 52 * 3.5;
        const d = a / 52 * 2;
        c.beginPath();
        c.moveTo(a / 4 + d, a / 4 + d);
        c.lineTo(3 * a / 4 - d, 3 * a / 4 - d);
        c.stroke();
        c.beginPath();
        c.moveTo(3 * a / 4 - d, a / 4 + d);
        c.lineTo(a / 4 + d, 3 * a / 4 - d);
        c.stroke();
        return b
    };

    function xy(a) {
        ik() ? setTimeout(() => {
            yy(a)
        }, 300) : (zy(a), Mf && Bf.includes("Safari") ? wi(a.Ub, "click", () => {
            yy(a)
        }, !0) : xi(a.Ub, "click", () => {
            yy(a)
        }, !0))
    }

    function zy(a) {
        (Kf() ? "1" === Cf.g.get("scta") : document.getElementById("fkbx") || If()) || (a.u.start(), a.i && a.j && a.i.classList.add(a.j))
    }

    function Ay(a) {
        a.i && a.j && a.i.classList.remove(a.j);
        Vw(a.u)
    }

    function By(a) {
        return r(function*() {
            if (a.o) return a.o;
            a.Ub.classList.remove(a.g.Me);
            a.o = Cy();
            yield a.o;
            a.i && a.i.remove();
            a.Ub.remove()
        })
    }

    function yy(a) {
        r(function*() {
            a.O && (yield By(a));
            a.H()
        })
    }

    function Cy() {
        return new Promise(a => {
            setTimeout(a, 500)
        })
    }

    function Dy(a) {
        0 !== a.Ac && a.Ub.classList.add(a.g.Ke)
    }
    var Ey = class {
        constructor(a, b, c, d, e, f = !0) {
            this.i = b;
            this.j = c;
            this.v = d;
            this.H = e;
            this.O = f;
            this.Ac = 1;
            this.o = null;
            this.g = {
                Ie: "ddl-hplogocta_",
                Me: "ddl-showCta_",
                Ke: "ddl-ctaHideDuringLightbox_"
            };
            this.Ub = a.Ub;
            this.Ub.classList.add(this.g.Ie);
            this.Ub.classList.add(this.g.Me);
            b && this.Ub.appendChild(b);
            this.u = new Ww(g => {
                this.v(g)
            });
            xy(this)
        }
    };
    const Fy = Ef() && Bf.includes("OS 12_");

    function Gy(a, b, c) {
        a.style.position = "absolute";
        a.style.top = "0";
        a.style.left = "0";
        a.style.width = "100%";
        a.style.height = "100%";
        a.style.direction = "ltr";
        a.dataset.width = b.toString();
        a.dataset.height = c.toString()
    }

    function Hy(a, b = !1) {
        const c = a.g.parentElement ? a.g.parentElement.offsetWidth : a.oa.offsetWidth,
            d = a.g.parentElement ? a.g.parentElement.offsetHeight : a.oa.offsetHeight;
        a.j && (0 === window.scrollX && 0 === window.scrollY || window.scrollTo(0, 0));
        if (c !== a.u || d !== a.o || a.i.isFullscreen !== a.v || b) {
            b = Number(a.g.dataset.width);
            var e = Number(a.g.dataset.height);
            if (Kf()) throw Error("N");
            var f = !hk() || !I() || Lf() || Ff() && Ef() || Df() ? !1 : b < e !== c < d;
            var g = (a.i.Ld = f) ? Math.min(c / e, d / b) : Math.min(c / b, d / e),
                h = g * b,
                k = g * e;
            a.i.scale = g;
            g = `scale(${g}, ${g})`;
            var l = (h - b) / 2;
            var m = (k - e) / 2;
            var n = f ? Math.abs(c - k) / 2 : Math.abs(c - h) / 2,
                w = f ? Math.abs(d - h) / 2 : Math.abs(d - k) / 2;
            f ? (f = (h - k) / 2, h = l - f + n, m = m + f + w, g += "rotate(90deg)") : (h = n + l, m += w);
            fg(a.g, "TransformOrigin", "center center");
            fg(a.g, "Transform", g);
            cg(a.g, "position", "absolute", "width", `${b}px`, "height", `${e}px`, "left", `${h}px`, "top", `${m}px`);
            Fy && a.j && (b = document.documentElement, e = b.getBoundingClientRect(), e.width === c && e.height === d || cg(b, "width", `${c}px`, "height", `${d}px`));
            a.j && !Bf.includes("CriOS") && 0 < c && document.body.clientWidth !==
                c && (document.body.clientWidth < document.body.scrollWidth && cg(document.body, "width", `${Math.min(document.body.scrollWidth,c)}px`), document.body.clientWidth > c && cg(document.body, "width", `${c}px`));
            a.j && cg(a.oa, "height", "100%", "width", "100%");
            a.u = c;
            a.o = d;
            a.v = a.i.isFullscreen
        }
    }
    var Iy = class {
        constructor(a) {
            this.i = a;
            this.o = this.u = 0;
            this.v = !1;
            this.oa = a.oa;
            this.g = document.querySelector("#uidsdoodle") ? a.oa : a.Ob;
            Gy(this.g, a.width, a.height);
            this.j = hk();
            Hy(this);
            window.addEventListener("resize", () => {
                Hy(this)
            })
        }
        setSize(a, b) {
            this.g.dataset.width = a.toString();
            this.g.dataset.height = b.toString()
        }
    };
    const Jy = document[hg(document, "exitFullscreen")],
        Ky = hg(document, "fullscreenElement"),
        Ly = hg(document, "fullscreenEnabled");

    function My(a) {
        a.i && window.screen.orientation && window.screen.orientation.lock && window.screen.orientation.lock(a.i).catch(() => {})
    }

    function Ny(a, b) {
        a.i = b;
        a.g.orientation = b;
        document[Ky] && My(a)
    }
    var Py = class {
        constructor(a) {
            this.g = a;
            this.i = null;
            this.oa = a.oa;
            a = hg(this.oa, "requestFullscreen");
            this.o = this.oa[a];
            a = !(!document[Ly] || !Jy);
            if (Kf()) throw Error("N");
            if (this.j = (Ef() ? !1 : Jf() && !(Ff() && Ef() || Ff() && !Ef()) || Hf() && I()) && a) cg(document.body, "margin", "0"), cg(this.oa, "overflow", "visible", "width", "100%", "height", "100%"), document.body.scrollLeft = 0, wi(window, "scroll", Oy, !0)
        }
        exitFullscreen() {
            Jy.call(document);
            this.g.isFullscreen = !!document[Ky]
        }
    };
    const Oy = a => {
        a.preventDefault();
        a.stopPropagation();
        return !1
    };
    const Qy = a => new Promise(b => {
        setTimeout(b, a)
    });

    function Ry(a, b) {
        const c = document.createElement("div");
        c.classList.add("ddl-lightboxContainer_");
        c.classList.add("ddl-lightboxBackground_");
        a.oa.appendChild(c);
        const d = document.createElement("div");
        d.classList.add("ddl-lightboxContentContainer_");
        c.appendChild(d);
        b.classList.add("ddl-lightboxContent_");
        cg(b, "position", "relative", "left", "50%", "top", "50%");
        d.appendChild(b);
        b = new wy(b, () => {
            Sy(a)
        });
        c.appendChild(b.Ua);
        window.addEventListener("resize", () => {
            a.i()
        });
        return {
            Ua: b,
            Dc: c,
            ye: d
        }
    }

    function Sy(a) {
        r(function*() {
            a.g && (Gi(a.j), a.oa.classList.remove("ddl-lightboxMode_"), a.Dc.classList.remove("ddl-lightboxBackground_"), a.Dc.classList.remove("ddl-lightboxEnabled_"), a.g = !1, a.u(), uy(a.Ua, !1), I() || !Bf.includes("Safari") || Bf.includes("Chrome") || (a.oa.style.display = "none", a.oa.offsetWidth, a.oa.style.display = "block"), yield Qy(0))
        })
    }

    function Ty(a) {
        return r(function*() {
            a.g || (yield Qy(0), a.oa.classList.add("ddl-lightboxMode_"), a.Dc.classList.add("ddl-lightboxBackground_"), a.Dc.getBoundingClientRect(), a.Dc.classList.add("ddl-lightboxEnabled_"), a.g = !0, a.i(), a.j = wi(document, "keydown", b => {
                27 === b.keyCode && Sy(a)
            }), uy(a.Ua, !0), yield Qy(500))
        })
    }
    var Uy = class {
        constructor(a, b, c, d, e = () => {}, f = () => {}) {
            this.oa = a;
            this.o = b;
            this.i = e;
            this.j = null;
            this.g = !1;
            this.i = e;
            this.u = f;
            const {
                Ua: g,
                Dc: h,
                ye: k
            } = Ry(this, b);
            this.Ua = g;
            this.Dc = h;
            this.ye = k;
            this.setSize(c, d)
        }
        setSize(a, b) {
            cg(this.ye, "maxWidth", `${a}px`, "maxHeight", `${b}px`);
            cg(this.o, "width", `${a}px`, "height", `${b}px`)
        }
    };
    var Vy = a => {
            if (Ef() && (Jf() || Hf()))
                for (const b of a) wi(b, "touchmove", c => {
                    1 !== c.scale && c.preventDefault()
                }, {
                    passive: !1
                })
        },
        Wy = a => {
            for (const b of a) wi(b, "contextmenu", c => {
                c.preventDefault()
            }, {
                passive: !1
            })
        };
    let Xy = null;

    function sy(a) {
        nq(a.O, a.Ob, ["mousedown", "mouseout", "touchstart"], b => {
            a.o.handleEvent(b)
        });
        nq(a.O, document, ["mouseup", "mousemove", "touchend", "touchmove", "contextmenu"], b => {
            a.o.handleEvent(b)
        })
    }

    function Yy() {
        var a = new URLSearchParams(window.location.search);
        const b = a.get("hl") || "en",
            c = a.get("gl") || "us";
        let d;
        switch (a.get("cta")) {
            case "a":
                d = 0;
                break;
            case "s":
                d = 1;
                break;
            default:
                d = 2
        }
        a = "1" === a.get("se") ? !0 : !1;
        return {
            hl: b,
            gl: c,
            Bg: d,
            qd: a
        }
    }

    function Zy(a) {
        if (Mf) Gg(a.i.Mf);
        else {
            a.H.start();
            a.ya = !0;
            a.Ea = !0;
            if (document.querySelector("#uidsdoodle")) {
                if (!a.Na.qd) return;
                window.parent.postMessage({
                    We: "resizeDoodle",
                    width: a.i.width,
                    height: a.i.height,
                    duration: 150,
                    preserveAspectRatio: !0
                }, "*");
                const b = new Promise(d => {
                        window.addEventListener("message", e => {
                            "resizeComplete" === e.data.We && d()
                        })
                    }),
                    c = new Promise(d => {
                        setTimeout(d, 1E3)
                    });
                Promise.race([b, c]).then(() => {
                    S(0);
                    Dy(a.j);
                    $y(a.V);
                    Hy(a.u, !0);
                    Jr(a.o)
                })
            } else az(a, () => {
                S(0);
                Hy(a.u, !0)
            });
            a.oa.removeAttribute("title");
            a.doodle.Qc()
        }
    }

    function bz(a) {
        Vy([document, a.oa, a.Ob, a.Ib]);
        Wy([a.oa, a.Ob, a.Ib]);
        nq(a.O, a.oa, "touchend", () => {
            var b = a.fullscreen;
            b.j && !document[Ky] && (b.o.call(b.oa), My(b), b.g.isFullscreen = !!document[Ky]);
            Sr(a.Ba)
        })
    }

    function az(a, b) {
        a.v ? cz(a, b) : gk() && a.i.qd ? (a.va = new ax(a.oa, () => {}), $w(a.va, a.i.width, a.i.height, b)) : (b(), Jr(a.o))
    }

    function cz(a, b) {
        r(function*() {
            a.wa = new Uy(a.oa, a.Ob, a.i.width, a.i.height, () => {
                Hy(a.u, !0);
                Jr(a.o)
            }, () => {
                a.kf()
            });
            yield dz(a);
            b();
            a.Ob.addEventListener("click", () => ez(a))
        })
    }

    function fz(a) {
        Jr(a.o);
        a.ya && a.Ea ? ((document.getElementById("fkbx") || If()) && Xy && (Gi(Xy), Xy = null), a.H.start()) : zy(a.j);
        a.doodle.Ee()
    }

    function dz(a) {
        return r(function*() {
            Dy(a.j);
            $y(a.V);
            let b, c;
            null == (b = a.Ia) || null == (c = b.Hg) || c.call(b);
            yield Ty(a.wa)
        })
    }

    function ez(a) {
        return r(function*() {
            yield dz(a);
            fz(a)
        })
    }
    var hz = class {
        constructor(a) {
            this.i = a;
            this.Ea = this.ya = !1;
            this.doodle = this.Ia = null;
            this.Na = Yy();
            this.g = ry();
            this.oa = this.g.oa;
            this.Oa = this.oa.title;
            this.Ib = this.g.Ib;
            this.Ob = this.g.Ob;
            this.g.width = this.i.width;
            this.g.height = this.i.height;
            (this.v = jk()) && !document.querySelector("#uidsdoodle") && this.Ob.classList.add("ddl-domRootLightboxed_");
            let b;
            this.Ba = new Vr(null != (b = a.Dg) ? b : 6E4, () => {
                Vw(this.H);
                Ay(this.j);
                Uj()
            }, () => {
                this.Ee()
            });
            this.O = new lq(this);
            this.o = new Lr(this.g);
            this.fullscreen = new Py(this.g);
            let c;
            Ny(this.fullscreen, null != (c = this.i.orientation) ? c : "landscape-primary");
            this.u = new Iy(this.g);
            this.Ua = new wy(this.Ob, () => {
                this.fullscreen.exitFullscreen()
            });
            this.Ua.Ua.classList.add("ddl-closeFullscreenBtn_");
            this.j = new Ey(this.g, this.i.Gd.Zf, this.i.Gd.Nf, () => {}, () => {
                Zy(this)
            }, !1 !== this.i.Gd.Ig && !this.v && !Mf);
            this.V = new gz(this.g.Ob, this.j.g.Ie, this.i.Gd.Ac);
            this.H = new Ww(d => {
                this.update(d)
            });
            bz(this);
            Hy(this.u)
        }
        setSize(a, b) {
            this.g.width = a;
            this.g.height = b;
            this.u.setSize(a, b);
            let c;
            null == (c = this.wa) ||
                c.setSize(a, b);
            Hy(this.u, !0)
        }
        Ee() {
            let a;
            !this.v || (null == (a = this.wa) ? 0 : a.g) ? fz(this) : zy(this.j)
        }
        update(a) {
            this.va && this.va.update(a);
            uy(this.Ua, !!document[Ky]);
            this.doodle.Ta(a)
        }
        qd() {
            return !this.v && gk()
        }
        kf() {
            Vw(this.H);
            Ay(this.j);
            Uj();
            this.oa.setAttribute("title", this.Oa);
            var a = this.j;
            0 !== a.Ac && (a.Ub.classList.remove(a.g.Ke), zy(a));
            a = this.V;
            if (0 !== a.Ac)
                for (const d of a.Ob.children) d.classList.contains(a.g) || d.classList.add("ddl-contentHide_");
            Hy(this.u, !0);
            let b, c;
            null == (b = this.Ia) || null == (c = b.kf) ||
                c.call(b)
        }
    };

    function $y(a) {
        if (0 !== a.Ac)
            for (const b of a.Ob.children) b.classList.contains(a.g) || b.classList.remove("ddl-contentHide_")
    }
    class gz {
        constructor(a, b, c) {
            this.Ob = a;
            this.g = b;
            this.Ac = c
        }
    };

    function iz(a) {
        const b = new XMLHttpRequest;
        b.open("GET", a);
        return new Promise((c, d) => {
            b.send();
            b.onreadystatechange = () => {
                if (4 == b.readyState)
                    if (200 == b.status && b.responseText) a: {
                        var e = b.responseText;e.startsWith(")]}'\n") && (e = e.substring(5));
                        let f = {};
                        try {
                            f = JSON.parse(e)
                        } catch (g) {
                            d(e);
                            break a
                        }
                        f.hasOwnProperty("ddllog") && (f = f.ddllog);f.hasOwnProperty("__err__") ? d(f.__err__) : c(f)
                    }
                else d(b)
            }
        })
    }

    function jz(a, b, c = () => {}, d = !1) {
        d = d ? "//www.google.com" : "";
        d = new gf("ddllog".startsWith("/") ? `${d}${"ddllog"}` : `${d}/async/${"ddllog"}`);
        kf(d, b);
        d = d.toString();
        a.g++;
        c(a.g);
        return iz(d).catch(e => 1 > a.g ? a.i(2E3 * Math.pow(2, a.g - 1)).then(() => jz(a, b, c)) : Promise.reject(e)).finally(() => a.g = 0)
    }
    class kz {
        constructor(a) {
            this.g = 0;
            this.i = a
        }
    };
    class lz extends kz {
        constructor() {
            super(a => new Promise(b => setTimeout(b, a)))
        }
    };
    var mz = class extends H {
        constructor(a) {
            super(a)
        }
    };
    var nz = () => {
        var a = ug;
        if (Fg() && Eg()) return Promise.resolve();
        a = `_fmt:jspb,doodle:${a},slot:0,` + "type:3,cta:1";
        (document.getElementById("fkbx") || If()) && (a += ",ntp:1");
        Fg() && (a += ",impr:0");
        const b = new mf;
        b.add("async", a);
        return jz(new lz, b, void 0, !1).then(c => {
            c = new mz(c);
            !Fg() && jc(c, 2) && (Bg = (new gf(jc(c, 2))).g.get("ved", ""));
            !Eg() && jc(c, 3) && (Dg = jc(c, 3))
        }).catch(() => Promise.resolve())
    };
    const ch = fh.Va(),
        Vj = ek.Va();

    function oz() {
        rk();
        const a = document.getElementById("hplogo");
        var b = document.getElementById("hpcanvas");
        if (a && b) {
            (document.getElementById("fkbx") || If()) && document.body.classList.add("ddl-ntp_");
            a.appendChild(oy());
            b.width = L;
            b.height = Ig;
            var c = b.getContext("2d");
            b = nz();
            Rj(ek.Va(), a);
            Promise.all([Zk(), b]).then(() => {
                var d = document.createElement("div");
                d.style.position = "absolute";
                d.style.userSelect = "none";
                d.style.MozUserSelect = "none";
                d.style.webkitUserSelect = "none";
                d.style.webkitUserSelect = "none";
                d.style.webkitTapHighlightColor =
                    "rgba(0,0,0,0)";
                d.unselectable = "on";
                var e = bh[3],
                    f = bh[4],
                    g = bh[5] || 1;
                g && 1 !== g && ch.i[Wg(bh)] && (e = Math.floor(e / g), f = Math.floor(f / g));
                d.style.width = `${e}px`;
                d.style.height = `${f}px`;
                e = bh;
                f = e[5] || 1;
                d = [d, `url(${ch.g[Wg(bh)].g}) ${`${-(1*e[1]/f)}px ${-(1*e[2]/f)}px`}/${ah(1)} no-repeat`, ah()];
                e = d[0];
                f = d[2];
                e.style.background = d[1];
                f && (e.style.backgroundSize = f);
                e.classList.add("ddl-playButtonStatic18_");
                f = {
                    width: L,
                    height: Ig,
                    Mf: ug,
                    orientation: K ? "portrait-primary" : "landscape-primary",
                    Gd: {
                        Zf: e,
                        Nf: "ddl-playButtonAnimated_",
                        Ac: 1
                    }
                };
                d = [c];
                e = pz;
                null != f.qd || (f.qd = !0);
                f = new hz(f);
                g = f.g.Ib;
                f.g.oa && g ? (d = new e(f, ...d), f.doodle = d) : console.error("Unable to render the Doodle. This is expected during unit tests but may be a cause for concern elsewhere.")
            })
        }
    }((a, b) => {
        window.google && google.doodle && (b && sa("google.doodle.cpDestroy", b), sa("google.doodle.cpInit", function() {
            b && b();
            a()
        }))
    })(oz, function() {
        for (const a of ch.g) a.j = []
    });
    oz();
    class pz extends ty {
        constructor(a, b) {
            super(a);
            Ny(a.fullscreen, "portrait-primary");
            a.g.oa.classList.add("ddl-fpdoodleready_");
            K || a.setSize(463, 200);
            this.g = new cy(a.Ba, a.o);
            this.i = b
        }
        Qc() {
            this.j.setSize(L, Ig);
            this.g.Qc()
        }
        Ta(a) {
            this.g.update(a);
            this.g.render(this.i)
        }
        Ee() {
            this.g.wake();
            var a = Vj;
            Promise.resolve();
            a.o && a.g && a.g.resume();
            a.o = !1
        }
    };
}).call(this);