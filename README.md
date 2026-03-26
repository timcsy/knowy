# Knowie

[繁體中文](README.zh-TW.md)

**Your AI reads your code. Knowie teaches it your thinking.**

---

## The Problem

You ask your AI to add a feature. It writes code that works — but violates your architecture. You ask it to fix a bug. It picks the approach you already tried and failed with last month.

**Your AI doesn't know what you know.** It doesn't know your principles, your roadmap, or the lessons you've learned the hard way.

## The Fix

Three files. That's it.

```
knowledge/
  principles.md    ← What you believe and why
  vision.md        ← Where you're going and how
  experience.md    ← What you've learned the hard way
```

Your AI reads them before every task. Now its suggestions align with your project — not just your code.

## 30 Seconds to Start

```bash
npx knowie init
```

Done. Knowie creates the files, detects your AI tools (25+ supported), and connects everything.

> Using an AI tool? It can do this for you: `npx knowie init --yes`

## What Changes

**Before Knowie:**
> "Add caching" → AI picks Redis because it's popular. You wanted in-memory because principle #2 says "no external dependencies for core features."

**After Knowie:**
> "Add caching" → AI reads your principles, picks in-memory, and notes the risk from experience.md where caching caused stale data in a similar context.

## How It Works

| File | Answers | Changes |
|------|---------|---------|
| `principles.md` | What rules guide us? | Rarely |
| `vision.md` | Where are we going? | After milestones |
| `experience.md` | What have we learned? | After surprises |

Three subdirectories hold the details:

| Directory | Contains | Distills into |
|-----------|----------|---------------|
| `research/` | Explorations, experiments | → principles.md |
| `design/` | Architecture decisions | → vision.md |
| `history/` | Event records | → experience.md |

## Skills

If your AI tool supports skills (e.g., Claude Code), Knowie gives you four commands:

| Skill | What it does |
|-------|-------------|
| `/knowie init` | Guided conversation to fill in your knowledge files |
| `/knowie update` | Check file structure and suggest improvements |
| `/knowie judge` | 17-point health check: consistency, coherence, alignment with actual code |
| `/knowie next` | Plan the next step, grounded in principles and informed by experience |

**`/knowie judge`** is the core loop. It catches when your vision contradicts your experience, when your principles don't match your code, or when your files have gone stale. 🟢 healthy, 🟡 tension, 🔴 conflict — with specific quotes and actions.

## Works With Your Tools

Knowie connects to **25+ AI tools and spec tools** — automatically:

**AI tools:** Claude Code, Cursor, Windsurf, GitHub Copilot, Codex, Gemini, Kiro, Amazon Q, Cline, Roo Code, Kilo Code, Aider, Continue, Augment, Amp, Devin, Warp, Zed, OpenCode, Qodo, JetBrains AI, Tabnine, Replit, Bolt.new

**Spec tools:** Speckit, OpenSpec, Kiro Specs

**Standard:** AGENTS.md (cross-tool standard, 60k+ repos)

`knowie init` detects what you have and injects a reference to your `knowledge/` files. No manual config.

## MCP Server

For AI tools that support MCP (Model Context Protocol):

```bash
npx knowie setup-mcp
```

This gives your AI direct access to `knowie_init`, `knowie_update`, `knowie_judge`, and `knowie_next` as native tools.

<details>
<summary>Manual MCP config</summary>

```json
{
  "mcpServers": {
    "knowie": {
      "command": "npx",
      "args": ["-y", "knowie", "--", "knowie-mcp"]
    }
  }
}
```
</details>

## Updating

```bash
npx knowie update
```

Updates skills and templates without touching your knowledge files. Catches new AI tools added since last run. Use `--yes` for automatic mode.

## Design Principles

- **Plain Markdown** — `knowledge/` works with any tool, or none. No proprietary format.
- **No npm dependencies** — only Node.js built-ins. Install is instant.
- **No lock-in** — Knowie connects to your tools, not the other way around.
- **AI-native** — `--yes` flag for zero-prompt operation. Your AI can install and update Knowie without leaving the conversation.

## Why Three Files?

The structure maps to the minimal unit of knowledge — a *judgment*:

- **Principles** = what is correct (the standard)
- **Vision** = what is being built (the construction)
- **Experience** = what context we're in (the situation)

Each only makes sense in relation to the other two. `/knowie judge` verifies they're aligned. `/knowie next` uses all three to plan coherent next steps.

Rooted in [triperspectivalism](https://en.wikipedia.org/wiki/Triperspectivalism) and type-theoretic judgments (Γ ⊢ t : A).

## License

MIT
