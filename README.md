# Knowy

[繁體中文](README.zh-TW.md)

**Give your AI a structured project brain.**

Your AI assistant sees your code — but does it understand *why* you built it this way? What principles you won't compromise on? What you already tried and learned from?

Knowy gives your project three structured knowledge files that any AI tool can read, turning scattered context into a shared understanding.

## Quick Start

```bash
npx knowy-cli init
```

This creates a `.knowledge/` directory in your project and connects it to your AI tools. Then, in your AI tool (e.g., Claude Code):

```
/knowy init
```

This starts an interactive conversation to help you fill in your knowledge files.

## What It Creates

```
.knowledge/
  principles.md         ← Core beliefs and rules (rarely changes)
  vision.md             ← Goals, architecture, roadmap (evolves)
  experience.md         ← Distilled lessons (grows over time)
  research/             ← Exploratory notes → may become principles
  design/               ← Detailed designs → inform vision
  history/              ← Event records → distilled into experience
  .templates/           ← Reference templates (managed by Knowy)
```

## How It Works

Every project has knowledge that lives in people's heads — why certain decisions were made, what failed before, where things are headed. Knowy makes that knowledge explicit and structured:

- **Principles** answer "what rules guide us?" — your non-negotiable beliefs and the rules derived from them.
- **Vision** answers "where are we going?" — the problem you're solving, current state, and roadmap.
- **Experience** answers "what have we learned?" — patterns from development, especially where expectations met reality.

Your AI tools read these files automatically, so their suggestions align with your project's actual context — not just the code.

## Skills

Knowy installs four skills for Claude Code (under the `/knowy` namespace):

| Skill | What it does |
|-------|-------------|
| `/knowy init` | Interactive conversation to create or populate knowledge files |
| `/knowy update` | Check knowledge file structure against latest templates |
| `/knowy judge` | Cross-check the three files for consistency and coherence |
| `/knowy next` | Plan the next step based on your principles, vision, and experience |

### `/knowy judge` — Knowledge Health Check

Runs 17 checks across your knowledge files:

- **Self-consistency** (3): Are derivation chains intact? Is the structure sound?
- **Internal coherence** (3): Are there contradictions within each file?
- **Cross-references** (6): Do the files agree with each other? Checks all six directions (e.g., "Does experience support the vision?" is different from "Does vision address what experience found?")
- **Project alignment** (3): Do the files match the actual project state (code, dependencies, git history)?
- **Overall** (1): Synthesis — where should you focus?
- **Beyond scope** (1): Is there content that belongs elsewhere?

Results use traffic light indicators: 🟢 healthy (one-line summary), 🟡 tension (expanded with details), 🔴 conflict (expanded with suggested action).

## Supported Tools

Knowy detects and connects to 25+ AI and spec tools:

| Category | Tools |
|----------|-------|
| **AI Coding** | Claude Code, Cursor, Windsurf, GitHub Copilot, Codex CLI, Gemini CLI, Kiro, Amazon Q, Cline, Roo Code, Kilo Code, Aider, Continue.dev, Augment Code, Amp, Devin, Warp, Zed, OpenCode, Qodo, JetBrains AI, Tabnine, Replit Agent, Bolt.new |
| **Spec Tools** | Speckit, OpenSpec, Kiro Specs |
| **Standard** | AGENTS.md (cross-tool standard) |

`knowy init` auto-detects which tools you have and injects a reference to your `.knowledge/` files. `knowy update` catches tools added later.

## MCP Server

Knowy also works as an MCP (Model Context Protocol) server, so your AI tool can use Knowy directly without the CLI:

```bash
npx knowy-cli setup-mcp
```

This configures the MCP server for your AI tool (Claude Code, Claude Desktop, Cursor, etc.). Once set up, your AI can call `knowy_init`, `knowy_update`, `knowy_judge`, and `knowy_next` as native tools.

You can also configure it manually. Add to your AI tool's MCP settings:

```json
{
  "mcpServers": {
    "knowy": {
      "command": "npx",
      "args": ["-y", "knowy-cli", "--", "knowy-mcp"]
    }
  }
}
```

## Updating

When Knowy releases a new version with improved skills or templates:

```bash
npx knowy-cli update
```

This updates skills and templates (managed files) without touching your knowledge files. It also detects any new AI tools you've added since the last run.

## Design Principles

- **Tool-agnostic**: `.knowledge/` is plain Markdown — works with any tool, or none.
- **Zero dependencies**: No runtime, no server. Three Markdown files and a few skills.
- **No lock-in**: Knowy doesn't own your workflow. It connects to your existing tools, not the other way around.
- **Progressive adoption**: Use just the files, or add the skills, or both.

## The Theory (for the curious)

The three-file structure isn't arbitrary. It maps to the structure of a *judgment* — the minimal unit of knowledge:

- **Principles** = what is correct (the standard)
- **Vision** = what is being built (the construction)
- **Experience** = what context we're in (the situation)

These three perspectives are inseparable — each one only makes sense in relation to the other two. `/knowy judge` verifies that they're still in alignment, and `/knowy next` uses all three to plan coherent next steps.

This framework draws from [triperspectivalism](https://en.wikipedia.org/wiki/Triperspectivalism) and type-theoretic judgments (Γ ⊢ t : A). If you're curious, the research papers behind Knowy's design are in the project's `.knowledge/research/` directory.

## License

MIT
