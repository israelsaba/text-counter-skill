---
name: agent-counter
description: Use for exact counts of characters, words, phrases, sentences, paragraphs, lines, bytes, or other text units, especially when a limit or publishing constraint matters.
---

# Agent Counter

Use this skill when a user asks to count, compare, or fit text to a limit. Return the requested metric and state the method when the definition can change the result.

## Metrics

- `characters`: Unicode code points, including spaces, punctuation, and line breaks.
- `characters_no_whitespace`: Unicode code points after whitespace is removed.
- `graphemes`: User-perceived characters, useful for emoji and combined accents.
- `words`: Word-like tokens from `Intl.Segmenter`, with whitespace-token fallback.
- `sentences`: An automated count based on sentence-ending punctuation.
- `paragraphs`: Blocks separated by one or more blank lines.
- `lines` and `non_empty_lines`: Newline-delimited records and the useful subset.
- `utf8_bytes`: UTF-8 storage or transport size.
- `phrase_occurrences`: Exact, overlapping occurrences when `--phrase` is supplied.

Do not guess a phrase definition. Do not count Markdown fences unless they are submitted text. For a maximum limit, count the draft, revise it, and count again before reporting it.

## Command

```bash
node bin/agent-counter.js --text 'candidate text'
node bin/agent-counter.js --file README.md --phrase 'agent'
node bin/agent-counter.js --text 'candidate text' --json
```

The script has no runtime dependencies and works on macOS, Linux, and Windows with Node.js 18 or newer.
