function randomOper() {
  return Math.floor(10 * Math.random()) % 2 ? 1 : -1;
}

function rotateCanvas(t, e, n, a) {
  t.translate(n, a), t.rotate((Math.PI * e) / 180), t.translate(-n, -a);
}

function letterCanvas(t, e) {
  const n = document.createElement("canvas");
  (n.width = t), (n.height = e);
  const a = n.getContext("2d");
  if (a) return { canvas: n, context: a };
  console.error(
    "[utils::letterCanvas] failed to create canvas for the letter."
  );
}

function getCharSize(t, e, n = "sans-serif", a = "normal") {
  const { context: o } = letterCanvas(e, e);
  (o.font = `${a} ${e}px ${n}`), (o.textBaseline = "top"), o.fillText(t, 0, 0);
  let r = 0,
    l = -1,
    c = e,
    s = -1,
    i = e;
  const f = o.getImageData(0, 0, e, e).data;
  for (let t = 0; t < e && r < 4; ++t)
    for (let n = 0; n < e && r < 4; ++n) {
      const a = 4 * (t * e + n),
        o = 4 * (t + n * e);
      s < 0 && f[a + 3] && ((s = t), ++r),
        l < 0 && f[o + 3] && ((l = t), ++r),
        i == e && f[f.length - a - 1] && ((i = e - t), ++r),
        f[f.length - o - 1] && ((c = e - t), ++r);
    }
  return { top: s, left: l, width: c - l, height: i - s };
}
