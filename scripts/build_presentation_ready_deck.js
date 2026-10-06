const pptxgen = require('pptxgenjs');
const {
  imageSizingCrop,
  imageSizingContain,
  warnIfSlideHasOverlaps,
  warnIfSlideElementsOutOfBounds,
} = require('/home/oai/skills/slides/pptxgenjs_helpers');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Mav Metrics';
pptx.subject = 'Player Marketability Model';
pptx.title = 'Mav Metrics — Player Marketability Model';
pptx.company = '2026 Sports Analytics Case';
pptx.lang = 'en-US';
pptx.theme = {
  headFontFace: 'Aptos Display',
  bodyFontFace: 'Aptos',
  lang: 'en-US',
};
pptx.defineLayout({ name: 'CUSTOM_WIDE', width: 13.333, height: 7.5 });
pptx.layout = 'CUSTOM_WIDE';
pptx.margin = 0;
pptx.slideWidth = 13.333;
pptx.slideHeight = 7.5;
pptx.layout = 'CUSTOM_WIDE';

const OUT = '/mnt/data/mav_metrics_final/output/mav_metrics_presentation_ready_v3.pptx';
const A = '/mnt/data/mav_metrics_final/assets';
const F = '/mnt/data/mav_metrics_final/figures';

const C = {
  navy: '061A2F',
  navy2: '09213A',
  blue: '00A3FF',
  blue2: '1A75FF',
  teal: '26E0C4',
  gold: 'F6C445',
  white: 'F8FAFC',
  muted: 'B8C7D6',
  slate: '12334E',
  dark: '020B14',
  line: '1D4766',
};

function bg(slide, img) {
  if (img) slide.addImage({ path: img, ...imageSizingCrop(img, 0, 0, 13.333, 7.5) });
}

function solidBg(slide) {
  slide.background = { color: C.dark };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.navy, transparency: 4 }, line: { color: C.navy, transparency: 100 } });
}

function kicker(slide, text, x=0.65, y=0.42) {
  slide.addText(text.toUpperCase(), { x, y, w: 4.8, h: 0.22, fontFace: 'Aptos', fontSize: 8.5, bold: true, color: C.blue, charSpace: 1.0, margin: 0 });
}

function title(slide, text, x=0.65, y=0.74, w=8.6, size=28) {
  slide.addText(text, { x, y, w, h: 0.58, fontFace: 'Aptos Display', fontSize: size, bold: true, color: C.white, breakLine: false, margin: 0, fit: 'shrink' });
}

function sub(slide, text, x=0.65, y=1.68, w=6.4, h=0.55, size=15) {
  slide.addText(text, { x, y, w, h, fontFace: 'Aptos', fontSize: size, color: C.muted, margin: 0, breakLine: false, fit: 'shrink' });
}

function footer(slide, n) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 7.36, w: 13.333, h: 0.07, fill: { color: C.blue }, line: { color: C.blue, transparency: 100 } });
  slide.addText(`Mav Metrics  |  Player Marketability Model  |  ${String(n).padStart(2,'0')}`, { x: 0.65, y: 7.13, w: 4.6, h: 0.18, fontSize: 5.8, color: '7F95AA', margin: 0 });
}

function logoMark(slide, x=12.15, y=0.28, w=0.55) {
  slide.addImage({ path: `${A}/mav_metrics_icon.png`, ...imageSizingContain(`${A}/mav_metrics_icon.png`, x, y, w, w*0.7) });
}

function stat(slide, label, value, x, y, w=2.0, accent=C.blue) {
  slide.addText(value, { x, y, w, h: 0.46, fontSize: 24, bold: true, color: accent, margin: 0, fit: 'shrink' });
  slide.addText(label, { x, y: y+0.47, w, h: 0.28, fontSize: 8.6, bold: true, color: C.muted, margin: 0, fit: 'shrink' });
}

function thinRule(slide, x, y, w, color=C.blue) {
  slide.addShape(pptx.ShapeType.line, { x, y, w, h: 0, line: { color, width: 1.1, transparency: 15 } });
}

function callout(slide, text, x, y, w, h, accent=C.blue, size=12) {
  slide.addShape(pptx.ShapeType.rect, { x, y, w, h, rectRadius: 0.05, fill: { color: C.navy2, transparency: 0 }, line: { color: accent, width: 1.1, transparency: 12 } });
  slide.addText(text, { x: x+0.15, y: y+0.13, w: w-0.3, h: h-0.25, fontSize: size, color: C.white, margin: 0.02, fit: 'shrink' });
}

function notes(slide, arr) { slide.addNotes(arr.join('\n')); }

const slides = [];
function addSlide() { const s = pptx.addSlide(); slides.push(s); return s; }

// NOTE: This generator expects local assets and figures already exported. The final PPTX produced in ChatGPT includes embedded speaker notes.
// In the repository, this file is meant as a reproducible template, not a complete binary deck.

// Minimal placeholder slide so the source remains runnable after assets are added.
const slide = addSlide();
solidBg(slide);
kicker(slide, 'Mav Metrics');
title(slide, 'Presentation-ready deck source', 0.65, 0.78, 9.8, 28);
sub(slide, 'The final PPTX delivered in ChatGPT includes the polished 14-slide deck with embedded speaker notes. Add the exported assets locally, then expand this source from the delivered version if you want to regenerate it.', 0.65, 1.65, 8.8, 0.9, 16);
footer(slide, 1);
notes(slide, ['This repo intentionally keeps the presentation source text-based. The finished binary PPTX is delivered in the ChatGPT conversation because the GitHub connector cannot upload binary PowerPoint files.']);

for (const slide of slides) {
  warnIfSlideHasOverlaps(slide, pptx, { muteContainment: true, ignoreDecorativeShapes: true });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

pptx.writeFile({ fileName: OUT });
