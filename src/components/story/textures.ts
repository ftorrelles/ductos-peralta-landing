import * as THREE from "three";
import { mulberry32 } from "./ductLayout";

/** Brushed galvanized steel: fine horizontal streaks plus a faint spangle mottling. */
export function createBrushedSteelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  const rand = mulberry32(24);

  if (ctx) {
    ctx.fillStyle = "#c9d1d8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Spangle (zinc crystal) mottling
    for (let i = 0; i < 160; i++) {
      const light = rand() > 0.5;
      ctx.fillStyle = light ? "rgba(255,255,255,0.08)" : "rgba(70,85,100,0.07)";
      const x = rand() * canvas.width;
      const y = rand() * canvas.height;
      const r = 6 + rand() * 22;
      ctx.beginPath();
      ctx.moveTo(x, y - r);
      ctx.lineTo(x + r * 0.9, y - r * 0.2);
      ctx.lineTo(x + r * 0.4, y + r);
      ctx.lineTo(x - r * 0.8, y + r * 0.5);
      ctx.closePath();
      ctx.fill();
    }

    // Brushing streaks
    for (let i = 0; i < 900; i++) {
      const y = rand() * canvas.height;
      const x = rand() * canvas.width;
      const len = 40 + rand() * 220;
      ctx.strokeStyle = rand() > 0.5 ? `rgba(255,255,255,${0.05 + rand() * 0.1})` : `rgba(60,72,84,${0.04 + rand() * 0.08})`;
      ctx.lineWidth = rand() * 1.2 + 0.3;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + len, y);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

/** Transparent overlay with blueprint cut lines and dimensions drawn on the flat sheet. */
export function createBlueprintTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 652;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const { width: w, height: h } = canvas;
    const blue = "#1565C0";
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = blue;
    ctx.fillStyle = blue;

    // Cut outline
    ctx.lineWidth = 4;
    ctx.setLineDash([22, 10]);
    ctx.strokeRect(26, 26, w - 52, h - 52);

    // Roll / fold marks
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 8]);
    for (let i = 1; i < 8; i++) {
      const x = (w / 8) * i;
      ctx.beginPath();
      ctx.moveTo(x, 60);
      ctx.lineTo(x, h - 60);
      ctx.stroke();
    }

    // Seam allowance
    ctx.setLineDash([]);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w - 70, 26);
    ctx.lineTo(w - 70, h - 26);
    ctx.stroke();

    // Dimension line (width = perimeter)
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, h / 2);
    ctx.lineTo(w - 120, h / 2);
    ctx.stroke();
    for (const x of [80, w - 120]) {
      ctx.beginPath();
      ctx.moveTo(x, h / 2 - 16);
      ctx.lineTo(x, h / 2 + 16);
      ctx.stroke();
    }

    ctx.font = "600 34px ui-monospace, Menlo, Consolas, monospace";
    ctx.textAlign = "center";
    ctx.fillText("π · Ø 12\" = 0.96 m", w / 2, h / 2 - 22);
    ctx.font = "500 26px ui-monospace, Menlo, Consolas, monospace";
    ctx.textAlign = "left";
    ctx.fillText("DT-002 · TRAMO RECTO", 60, 80);
    ctx.fillText("CAL. 24 · GALV.", 60, h - 60);
    ctx.textAlign = "right";
    ctx.fillText("L = 1.20 m", w - 90, h - 60);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
