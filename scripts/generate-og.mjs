import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = join(__dirname, "../public/og/default.svg");
const pngPath = join(__dirname, "../public/og/default.png");

const svg = readFileSync(svgPath, "utf-8");

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();

writeFileSync(pngPath, pngBuffer);

console.log(`Generated ${pngPath} (${pngBuffer.length} bytes)`);
