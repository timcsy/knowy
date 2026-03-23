---
name: knowy-update
description: Check knowledge file structure completeness and suggest improvements
user-invokable: true
argument-hint: "[specific file or area to check]"
---

# Knowy Update

Review existing knowledge files against the latest templates and suggest structural improvements.

## User Input

```text
$ARGUMENTS
```

## Workflow

### 1. Read current state

- Read `.knowledge/principles.md`, `.knowledge/vision.md`, `.knowledge/experience.md`
- Read `.knowledge/.templates/` for the latest recommended structure
- Scan `.knowledge/research/`, `.knowledge/design/`, `.knowledge/history/` for existing files

### 2. Structural check

Compare each core file against its template. Look for:

- **Missing sections**: template suggests a section that the file doesn't have
- **Empty sections**: section header exists but no content below it
- **Orphaned content**: content that doesn't fit any recommended section
- **Stale content**: references to things that may no longer exist (check cautiously)

### 3. Cross-file check

- Do principles reference concepts that aren't in the vision?
- Does experience mention lessons that should update the vision?
- Are there subdirectory files that are mature enough to distill into core files?

### 4. Report

Present findings in a clear format:

```
## Structure Check

### principles.md
🟢 Root Axiom — present
🟡 Derived Principles — only 1 principle listed, template suggests at least 2-3
🔴 Missing: no derivation chains shown

### vision.md
🟢 Problem Statement — present
🟢 Current State — present
🟡 Roadmap — has milestones but no success criteria

### experience.md
🟢 Structure follows template format
🟡 3 lessons recorded — consider if recent work has uncaptured lessons

### Subdirectories
🟡 design/auth-system.md looks mature enough to update vision.md

## Suggested Actions
1. Add derivation chains to principles.md
2. Add success criteria to roadmap milestones
3. Review recent work for new lessons
4. Distill design/auth-system.md into vision.md
```

### 5. Assist with changes

- If the user wants to act on a suggestion, help them make the change
- Show diffs before writing
- Never auto-modify files without confirmation

## Guidelines

- Use the user's language for all output
- Be constructive, not critical — the goal is to help, not to grade
- Prioritize suggestions by impact (what would help the AI most?)
- Don't suggest adding content the user may not have yet — only structural improvements
