class BoxText {
  chars = [];
  fontSize = 120;
  fontFamily = "sans-serif";
  gutter = 5;
  pendding = 30;
  constructor(t, e = {}) {
    if (e) {
      const { fontSize: t, fontFamily: o, gutter: i, pendding: a } = e;
      t && (this.fontSize = t),
        o && (this.fontFamily = o),
        i && (this.gutter = i),
        a && (this.pendding = a);
    }
    t || console.error("[text::anonymous] Must set text.");
    const o = t.split(""),
      i = new Array(o.length).fill(CHAR_MODE.WHITE);
    i[0] = CHAR_MODE.FIRST;
    for (let t = 1; t < o.length; t += 5)
      for (let e = t; e < t + 5 - 1 && e < o.length; ++e)
        if (10 * Math.random() > 6) {
          i[e] = CHAR_MODE.RED;
          break;
        }
    for (const [t, e] of o.entries())
      /^\s$/.test(e)
        ? this.chars.push(new BoxChar("", CHAR_MODE.SPACE))
        : this.chars.push(new BoxChar(e, i[t], this.fontSize, this.fontFamily));
  }
  draw(t) {
    const e = t.getContext("2d", { willReadFrequently: true });
    if (!e)
      return void console.error("[text::draw] Failed to load canvas");
    e.clearRect(0, 0, t.width, t.height);
    const o = this.pendding,
      i = this.gutter;
    let a = 2 * o,
      n = 0;
    for (const t of this.chars)
      if (t instanceof BoxChar) {
        const e = t.outterSize;
        (a += e.width + i), (n = Math.max(n, e.height));
      } else a += 2 * i;
    const s = document.querySelector("#text-align");
    let l = 0;
    "center" === s.value && (l = (t.width - a) / 2),
      "right" === s.value && (l = t.width - a);
    let r = o + l;
    (n += 2 * o),
      (e.fillStyle = COLORS.WHITE),
      (e.textBaseline = "top"),
      (e.textAlign = "left");
    for (const t of this.chars) {
      if (t.mode == CHAR_MODE.SPACE) {
        r += 2 * i;
        continue;
      }
      e.save();
      let {
        char: a,
        top: s,
        left: l,
        width: h,
        height: f,
        angle: c,
        mode: d,
        color: g,
      } = t;
      if (d == CHAR_MODE.FIRST) {
        const { width: d, height: S } = t.outterSize,
          C = r + d / 2,
          u = o + S / 2;
        rotateCanvas(e, c - 5, C, u),
          (e.fillStyle = COLORS.BLACK),
          e.fillRect(r, (n - S) / 2, d, S),
          rotateCanvas(e, c + 3, C, u);
        const R = 0.85,
          w = d * R,
          x = S * R,
          O = r + (d - w) / 2,
          m = (n - x) / 2;
        (e.fillStyle = COLORS.RED),
          e.fillRect(O, m, w, x),
          rotateCanvas(e, c + 2, C, u);
        const v = r + (d - h) / 2 - l,
          p = (n - f) / 2 - s;
        (e.fillStyle = g),
          (e.font = t.font),
          e.fillText(a, v, p),
          (r += t.outterSize.width + i);
      } else {
        const { width: d, height: S } = t.outterSize,
          C = r + d / 2,
          u = o + S / 2;
        rotateCanvas(e, c + 1, C, u),
          (e.fillStyle = COLORS.BLACK),
          e.fillRect(r, (n - S) / 2, d, S);
        const R = r + (d - h) / 2 - l,
          w = (n - f) / 2 - s;
        rotateCanvas(e, -1, C, u),
          (e.fillStyle = g),
          (e.font = t.font),
          e.fillText(a, R, w),
          (r += t.outterSize.width + i);
      }
      e.restore();
    }
    const h = e.getImageData(0, 0, 1770, 1300),
      f = e.createImageData(1770, 1300);
    if (textStroke) {
      const t = parseInt(textStrokeWidth),
        e = Math.floor(t / 2);
      for (let o = e; o < h.height - e; ++o)
        for (let i = e; i < h.width - e; ++i) {
          const e = o * h.width * 4 + 4 * i;
          if (!h.data[e + 3]) continue;
          const a = h.data[e + 3];
          for (let e = o - t + 1; e < o + t; ++e)
            for (let o = i - t + 1; o < i + t; ++o) {
              const t = e * h.width * 4 + 4 * o;
              (f.data[t] = 255),
                (f.data[t + 1] = 255),
                (f.data[t + 2] = 255),
                (f.data[t + 3] += a / 4);
            }
        }
    }
    const { canvas: c, context: d } = letterCanvas(1770, 1300);
    return (
      d.putImageData(f, 0, 0),
      e.save(),
      (e.globalCompositeOperation = "destination-over"),
      e.drawImage(c, 0, 0),
      e.restore(),
      n
    );
  }
}
