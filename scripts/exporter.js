function exportCard() {
  console.log("[exporter::exportCard] Saving image...");
  let e = document.querySelector("#canvas-card"),
    a = document.querySelector("#canvas-text");
  redrawBg();
  let t = e.getContext("2d");
  t.save(), t.drawImage(a, 0, 0);
  const r = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream"),
    c = document.createElement("a");
  (c.href = r),
    (c.download = `p5cc_${Math.floor(1e6 * Math.random())}.png`),
    (c.target = "blank"),
    c.click(),
    t.restore();
}
