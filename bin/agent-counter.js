#!/usr/bin/env node

const fs = require("node:fs");

const args = process.argv.slice(2);
let text = "";
let phrase = null;
let json = false;

for (let i = 0; i < args.length; i += 1) {
  if (args[i] === "--text") {
    text = args[i + 1] || "";
    i += 1;
  } else if (args[i] === "--phrase") {
    phrase = args[i + 1] || "";
    i += 1;
  } else if (args[i] === "--file") {
    text = fs.readFileSync(args[i + 1], "utf8");
    i += 1;
  } else if (args[i] === "--json") {
    json = true;
  } else if (!args[i].startsWith("--")) {
    text = args[i];
  }
}

if (!text && !process.stdin.isTTY) {
  text = fs.readFileSync(0, "utf8");
}

const segmenter = typeof Intl.Segmenter === "function" ? Intl.Segmenter : null;
const graphemes = segmenter
  ? [...new segmenter(undefined, { granularity: "grapheme" }).segment(text)].length
  : [...text].length;
const words = segmenter
  ? [...new segmenter(undefined, { granularity: "word" }).segment(text)]
      .filter(({ isWordLike }) => isWordLike).length
  : (text.trim().match(/\S+/g) || []).length;
const sentences = text.trim()
  ? (text.match(/[^.!?\u2026]+[.!?\u2026]+|[^.!?\u2026]+$/g) || []).length
  : 0;
const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;
const lines = text ? text.split(/\n/).length : 0;
const nonEmptyLines = text.split(/\n/).filter((line) => line.trim()).length;

const report = {
  characters: [...text].length,
  characters_no_whitespace: text.replace(/\s/gu, "").length,
  graphemes,
  words,
  sentences,
  paragraphs,
  lines,
  non_empty_lines: nonEmptyLines,
  utf8_bytes: Buffer.byteLength(text, "utf8"),
};

if (phrase !== null) {
  let count = 0;
  let position = 0;
  while (phrase && (position = text.indexOf(phrase, position)) !== -1) {
    count += 1;
    position += 1;
  }
  report.phrase_occurrences = count;
}

if (json) {
  console.log(JSON.stringify(report, null, 2));
} else {
  const labels = {
    characters: "Characters",
    characters_no_whitespace: "Characters (no whitespace)",
    graphemes: "Graphemes",
    words: "Words",
    sentences: "Sentences",
    paragraphs: "Paragraphs",
    lines: "Lines",
    non_empty_lines: "Non-empty lines",
    utf8_bytes: "UTF-8 bytes",
    phrase_occurrences: "Phrase occurrences",
  };
  for (const [key, label] of Object.entries(labels)) {
    if (key in report) console.log(`${label}: ${report[key]}`);
  }
}
