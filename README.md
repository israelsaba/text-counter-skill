---
type: knowledge_bundle_index
title: Agent Counter
description: A portable text-counting skill and dependency-free CLI for AI agents, writers, developers, and SEO workflows.
tags: [agent-skill, character-counter, word-counter]
timestamp: 2026-08-19T00:00:00-03:00
---

# Agent Counter: An AI Agent Skill for Exact Text Counts

```text
  _            _                           _                  _    _ _ _
 | |          | |                         | |                | |  (_) | |
 | |_ _____  _| |_    ___ ___  _   _ _ __ | |_ ___ _ __   ___| | ___| | |
 | __/ _ \ \/ / __|  / __/ _ \| | | | '_ \| __/ _ \ '__| / __| |/ / | | |
 | ||  __/>  <| |_  | (_| (_) | |_| | | | | ||  __/ |    \__ \   <| | | |
  \__\___/_/\_\\__|  \___\___/ \__,_|_| |_|\__\___|_|    |___/_|\_\_|_|_|


```

Agent Counter is primarily an installable Agent Skills package for AI agents. Install the skill into OpenCode, Hermes, Claude Code, or Codex so the agent can apply consistent counting rules while writing and reviewing text. A small Node.js CLI is included as the skill's local counting helper, not as the main product.

The skill covers characters, words, phrases, sentences, paragraphs, lines, graphemes, non-whitespace characters, and UTF-8 bytes. It helps an AI agent check a limit instead of guessing.

## Start Here: Install the Agent Skill

This repository is meant to be installed as a skill directory. On macOS or Linux, clone it and choose the agent you use:

```bash
git clone --depth 1 https://github.com/israelsaba/text-counter-skill.git
cd text-counter-skill
./install.sh --agent opencode
```

Replace `opencode` with `hermes`, `claude`, or `codex`. To install the skill for all four agents, use `./install.sh --agent all`. On Windows, run `.\install.ps1` from PowerShell with the matching `-Agent` value. Start a new agent session after installation.

The installed result is a directory containing `SKILL.md`:

```text
~/.config/opencode/skills/agent-counter/SKILL.md
~/.hermes/skills/agent-counter/SKILL.md
~/.claude/skills/agent-counter/SKILL.md
~/.codex/skills/agent-counter/SKILL.md
```

If you only want the command-line helper, skip the agent installation and use the CLI section below.

## Security Model

This repository is an agent skill first. `SKILL.md` is instruction content that an agent will read and may use to decide what actions to take. Review the skill and installer before installing it, especially when using a fork, a downloaded ZIP, or a source you do not control. Do not pipe an unreviewed URL into a shell, and do not install skills into an agent with more filesystem or network access than the task requires.

For repeatable installs, use a reviewed tag or commit instead of an unpinned branch. After cloning, record the revision with `git rev-parse HEAD` and review changes before running the installer. The included installers copy local files only; they do not download or execute remote code.

## Optional CLI Helper

The CLI is bundled so the installed skill can perform reproducible local counts. It is useful by itself, but installing the CLI alone does not install the agent skill.

```bash
node bin/agent-counter.js --text 'Paste text here'
```

## What It Is

Agent Counter is an Agent Skills-compatible Markdown skill with a small Node.js CLI. The skill tells an agent which counting definition to use. The CLI makes the result reproducible in a shell, script, CI job, or editor workflow.

It is:

- Free and open source under the MIT license.
- Local-first: input is not uploaded anywhere.
- Dependency-free at runtime.
- Cross-platform on macOS, Linux, and Windows.
- Useful from a terminal or through an installed AI-agent skill.

It is not a browser analytics service, plagiarism checker, grammar checker, or a promise that every sentence count is linguistically perfect. Sentence counts are explicitly estimates when punctuation is ambiguous.

## Why Use This Skill

Language models are good at drafting but unreliable at exact limits. A response that claims to be 350 characters can be over the limit because it forgot spaces, Unicode characters, line breaks, or a final punctuation mark. Agent Counter gives the agent a repeatable local check and makes the counting method visible.

The default definitions are deliberately practical:

| Metric                        | Definition                                                         |
| ----------------------------- | ------------------------------------------------------------------ |
| Characters                    | Unicode code points, including spaces and punctuation              |
| Characters without whitespace | Code points after Unicode whitespace is removed                    |
| Graphemes                     | User-perceived characters, useful for emoji and combined accents   |
| Words                         | Word-like tokens from `Intl.Segmenter`, with a whitespace fallback |
| Phrases                       | Exact, overlapping occurrences of a supplied phrase                |
| Sentences                     | Automated units split around sentence-ending punctuation           |
| Paragraphs                    | Blocks separated by one or more blank lines                        |
| Lines                         | Newline-delimited records, including a final non-empty record      |
| UTF-8 bytes                   | Encoded storage or transport size                                  |

If a platform uses a different limit, name that rule. For example, an SMS provider may count Unicode differently from a social network, and a search result may be truncated by rendered pixels rather than characters.

## How It Works

The CLI accepts text as an argument, a file, or standard input. It reports human-readable lines by default and JSON with `--json`. It uses built-in Node.js APIs only.

```bash
node bin/agent-counter.js --text 'Hello, world!'
node bin/agent-counter.js --file README.md
printf '%s' 'exact phrase exact phrase' | node bin/agent-counter.js --phrase 'exact phrase'
node bin/agent-counter.js --text 'Hello 😊' --json
```

The skill adds judgment around the raw numbers: count before returning constrained copy, state the counting method, do not invent a phrase definition, and count again after revisions.

## Keywords And Search Intent

These keywords describe real user intent without hiding what the repository does:

- character counter, character count, count characters online, character counter tool
- word counter, word count, count words, text counter, writing counter
- sentence counter, paragraph counter, line counter, phrase counter
- Unicode character count, grapheme counter, UTF-8 byte counter
- SEO character counter, meta title length, meta description length, social media character limit
- AI agent skill, Agent Skills, OpenCode skill, Hermes skill, Claude Code skill, Codex skill

The README uses the primary terms in the title, first paragraph, headings, examples, and FAQ. That mirrors common counter-tool pages while keeping the copy useful rather than repeating keywords mechanically.

## Use Cases And Direct Answers

### SEO titles and meta descriptions

Ask an agent to count an SEO title, meta description, slug, or page snippet against a chosen limit. Character count is a planning aid; search engines can truncate by rendered width, so review the preview and the actual result too.

### Social media and ads

Check short posts, ad headlines, CTAs, bios, SMS messages, and notification copy. Include spaces and punctuation when the destination counts them.

### AI agent output limits

Ask OpenCode, Hermes, Claude Code, or Codex to draft copy and verify it locally before returning it. The skill is especially useful for exact character, word, line, or byte requirements in tickets and automation.

### Editorial and research work

Count words, sentences, paragraphs, lines, and reading material without sending text to an external site. Use JSON for downstream scripts.

### Developer and data workflows

Use `--file` for Markdown, source code, logs, prompts, and fixtures. Use UTF-8 bytes when an API, database field, or protocol has a byte limit.

## Detailed Skill Installation

The skill itself is Markdown and can be copied by a file manager. Node.js 18 or newer is only needed for the bundled counter command.

### Install for every supported agent

macOS and Linux:

```bash
git clone --depth 1 https://github.com/israelsaba/text-counter-skill.git
cd text-counter-skill
./install.sh --agent all
```

Windows PowerShell:

```powershell
git clone --depth 1 https://github.com/israelsaba/text-counter-skill.git
Set-Location text-counter-skill
.\install.ps1 -Agent all
```

Install only one agent with `--agent opencode`, `--agent hermes`, `--agent claude`, or `--agent codex`. The scripts copy `skills/agent-counter/` and do not modify application code.

### OpenCode: advanced public install

OpenCode searches global skills in `~/.config/opencode/skills/` and project skills in `.opencode/skills/`. The installer uses the global path:

```bash
./install.sh --agent opencode
```

For a project-only install:

```bash
mkdir -p .opencode/skills
cp -R skills/agent-counter .opencode/skills/agent-counter
```

For a shared skills directory, add the repository path to `skills.paths` in `opencode.json`. Restart OpenCode after installation so its skill catalog is refreshed.

### Hermes: advanced public install

Hermes stores skills in `~/.hermes/skills/` and supports direct GitHub skill paths. From the cloned repository, use:

```bash
./install.sh --agent hermes
```

After this repository is public, a Hermes installation can use the public source directly:

```text
hermes skills install israelsaba/text-counter-skill/skills/agent-counter
```

If the CLI version supports direct URLs, a raw URL can install only the Markdown entry point:

```text
hermes skills install https://raw.githubusercontent.com/israelsaba/text-counter-skill/main/skills/agent-counter/SKILL.md
```

Review the raw file before installing it. The GitHub directory form is preferred because it preserves the bundled command. Use a reviewed commit or tag when the Hermes CLI supports a ref. Start a new Hermes session after installing. Use `/agent-counter` or ask Hermes to use the skill.

### Claude Code: beginner install

Claude Code discovers user skills in `~/.claude/skills/`. Run one command from the cloned repository:

```bash
./install.sh --agent claude
```

On Windows:

```powershell
.\install.ps1 -Agent claude
```

Start a new Claude Code session, then ask: `Use the agent-counter skill to count this text.` The direct manual fallback is to copy `skills/agent-counter` into `~/.claude/skills/agent-counter`.

### Codex: beginner install

Codex discovers user skills in `~/.codex/skills/`. Run:

```bash
./install.sh --agent codex
```

On Windows:

```powershell
.\install.ps1 -Agent codex
```

Start a new Codex session and ask it to use `agent-counter`. The direct manual fallback is to copy `skills/agent-counter` into `~/.codex/skills/agent-counter`.

### Manual install for limited tools

If an agent cannot run the installer, use its file manager or GitHub download function:

1. Download this repository as a ZIP.
2. Extract the `skills/agent-counter` folder.
3. Copy that folder to the agent directory in the table below.
4. Confirm the folder contains an uppercase `SKILL.md`.
5. Start a new agent session.

| Agent       | User directory                            | Project directory                |
| ----------- | ----------------------------------------- | -------------------------------- |
| OpenCode    | `~/.config/opencode/skills/agent-counter` | `.opencode/skills/agent-counter` |
| Hermes      | `~/.hermes/skills/agent-counter`          | Not applicable                   |
| Claude Code | `~/.claude/skills/agent-counter`          | `.claude/skills/agent-counter`   |
| Codex       | `~/.codex/skills/agent-counter`           | `.agents/skills/agent-counter`   |

On Windows, `~` means `%USERPROFILE%`. In PowerShell, use `$env:USERPROFILE` when you need the full path.

## Troubleshooting

### The skill does not appear

Check that the destination is the correct user or project directory, the file is named exactly `SKILL.md`, and the frontmatter has both `name` and `description`. Restart the agent. For OpenCode, check its skill permission is not denied.

### The command is not found

Run it with Node from the repository: `node bin/agent-counter.js`. Node 18 or newer is required. A skill can still load without Node, but it cannot run the bundled counter until Node is installed.

### Counts differ from a website

Compare definitions. This tool reports Unicode code points, graphemes, word-like tokens, and UTF-8 bytes as separate metrics. A website may count UTF-16 units, visible glyphs, language-specific words, or platform-specific limits.

### A sentence count looks wrong

Sentence counting is punctuation-based and intentionally approximate. For abbreviations, quotations, headings, or multilingual text, inspect the text manually and report the ambiguity.

### Windows script is blocked

If the file was downloaded, right-click it and choose Properties, then select Unblock if that option is present. In PowerShell, run `Unblock-File .\install.ps1` and then `.\install.ps1 -Agent codex` if local policy permits it. Do not weaken execution policy just to run the installer. Alternatively copy the skill directory manually. The counter itself runs with `node`, not PowerShell.

### Hermes installed only `SKILL.md`

Use the GitHub directory installer or clone the repository and run `./install.sh --agent hermes`. A raw single-file installation may not include the optional CLI support file.

## FAQ

### Is this an online character counter?

No. It is a local character counter and text statistics tool for the command line and AI agents. Local input stays on your machine.

### How do I count characters?

Run `node bin/agent-counter.js --text 'your text'`. The default `characters` value counts Unicode code points, including spaces and punctuation.

### How do I count words and paragraphs?

Use the same command. The output includes `Words` and `Paragraphs` alongside characters, sentences, lines, graphemes, and UTF-8 bytes.

### Can it count an exact phrase?

Yes. Add `--phrase 'your phrase'`. It reports exact overlapping occurrences.

### Does it work for SEO?

Yes, as a local SEO writing aid for counting title tags, meta descriptions, URLs, snippets, ad copy, and social posts. It does not predict Google's rendered pixel truncation.

### Which agents support it?

The package includes installation paths for OpenCode, Hermes, Claude Code, and Codex. It uses the portable `SKILL.md` format and a Node.js CLI.

## Contributing

Contributions are welcome through pull requests. Keep changes focused, preserve the `SKILL.md` entry point, add tests when counting behavior changes, and describe the checks performed. Documentation fixes and clearer examples are welcome. Discuss larger changes in an issue before opening a PR.

Use issues for reproducible bugs, unclear guidance, installation problems, compatibility reports, and focused proposals. Include the skill version or commit, agent and version, operating system, expected behavior, actual behavior, and a minimal example when relevant. Include the Node version when the CLI is involved. Do not report security vulnerabilities, secrets, or private data in public issues; follow [SECURITY.md](SECURITY.md).

## Releases

Stable releases use `vMAJOR.MINOR.PATCH` tags and GitHub release notes. Install a reviewed release or commit when reproducibility matters.

## Evidence And Sources

This README uses current public documentation and comparable counter-tool pages as evidence for installation paths and discoverability patterns. Search-result snippets were used only to locate the pages; the linked pages are the sources to review.

| Source                                                                                               | Observable evidence                                                                       | Use in this README                          |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------- |
| [OpenCode skills documentation](https://opencode.ai/docs/skills/)                                    | Global and project `SKILL.md` locations, required frontmatter, restart/discovery guidance | OpenCode paths and troubleshooting          |
| [Hermes skills documentation](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills) | `~/.hermes/skills/`, GitHub and direct URL installation, new-session behavior             | Hermes paths and public install             |
| [WordCounter character counter](https://wordcounter.net/character-count)                             | Paste-or-type workflow, immediate character and word counts                               | Plain-language value proposition            |
| [CharacterCounter](https://charactercounter.com/)                                                    | Characters, words, spaces, letters, sentences, paragraphs, and pages                      | Metric coverage and use cases               |
| [CharacterCounter meta description tool](https://charactercounter.com/meta-description)              | Meta title, description, URL, character/pixel counts, and search preview                  | SEO use case and pixel-count caveat         |
| [WordCounter word counter](https://charactercounter.com/word-counter)                                | Words per sentence, syllables, unique words, pages, and character count                   | Related text-statistics positioning         |
| [OpenAI Codex CLI installation](https://developers.openai.com/codex/cli/installation)                | Public installation and CLI context for Codex                                             | Codex audience and troubleshooting boundary |

## Scope And Caveats

- Web search rankings, Google snippets, and platform limits change. This README does not promise a fixed SEO character limit.
- SEO keywords are descriptive, not a guarantee of traffic or ranking.
- The sentence counter is a heuristic, not a full natural-language parser.
- The installer copies files and does not validate that an agent is installed.
- Windows behavior requires a Windows or PowerShell Core simulation for full verification.

## License

MIT. See [LICENSE](LICENSE).
