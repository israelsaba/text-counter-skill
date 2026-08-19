const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const path = require("node:path");

const script = path.join(__dirname, "..", "bin", "agent-counter.js");
const output = execFileSync(process.execPath, [script, "--text", "One two.\n\n😊", "--phrase", "o"], { encoding: "utf8" });
const report = JSON.parse(execFileSync(process.execPath, [script, "--text", "One two.\n\n😊", "--phrase", "o", "--json"], { encoding: "utf8" }));

assert.match(output, /Characters: 11/);
assert.equal(report.words, 2);
assert.equal(report.paragraphs, 2);
assert.equal(report.lines, 3);
assert.equal(report.phrase_occurrences, 1);
console.log("counter tests passed");
